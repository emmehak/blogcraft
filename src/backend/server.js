import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import pkg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PostgreSQL pool with better error handling
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "blogcraft",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL database:", err.stack);
    process.exit(1);
  } else {
    console.log("✅ Connected to PostgreSQL database successfully");
    release();
  }
});

// Handle pool errors
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "../../dist")));

// Rate Limiters
const generalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });

app.use("/api/", generalLimiter);

// JWT middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

//DB verification on startup
// Function to verify tables exist and show their structure
const verifyTables = async () => {
  try {
    // Check if tables exist and get their structure
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'contacts')
    `);

    console.log(
      "📋 Available tables:",
      tablesResult.rows.map((row) => row.table_name)
    );

    // Get users table structure
    const usersStructure = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'users' AND table_schema = 'public'
      ORDER BY ordinal_position
    `);

    console.log("👥 Users table structure:", usersStructure.rows);

    // Get contacts table structure
    const contactsStructure = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'contacts' AND table_schema = 'public'
      ORDER BY ordinal_position
    `);

    // Count existing records
    const userCount = await pool.query("SELECT COUNT(*) FROM users");
    const contactCount = await pool.query("SELECT COUNT(*) FROM contacts");
  } catch (err) {
    console.error("Error verifying database tables:", err);
  }
};

verifyTables();

//Authentication middleware to validate user input
const validateAuthInput = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ message: "Invalid email format" });

  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });

  if (req.path === "/signup" && (!name || name.trim().length < 2))
    return res
      .status(400)
      .json({ message: "Name must be at least 2 characters long" });

  next();
};

// Signup
app.post(
  "/api/auth/signup",
  authLimiter,
  validateAuthInput,
  async (req, res) => {
    const { email, password, name } = req.body;

    try {
      const exists = await pool.query("SELECT id FROM users WHERE email = $1", [
        email,
      ]);

      if (exists.rows.length > 0) {
        console.log("User already exists:", email);
        return res
          .status(409)
          .json({ message: "User already exists with this email" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await pool.query(
        "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name",
        [email, hashedPassword, name.trim()]
      );

      const user = result.rows[0];
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      res.status(201).json({
        message: "User created successfully",
        token,
        user,
      });
    } catch (err) {
      console.error("Signup error:", err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  }
);

// Login
app.post(
  "/api/auth/login",
  authLimiter,
  validateAuthInput,
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (result.rows.length === 0) {
        console.log("User not found:", email);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      console.log("Login successful for:", email);

      res.json({
        message: "Login successful",
        token,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (err) {
      console.error("Login error:", err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  }
);

// Verify
app.get("/api/auth/verify", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, name FROM users WHERE id = $1",
      [req.user.userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Verify error:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Logout
app.post("/api/auth/logout", authenticateToken, (req, res) => {
  res.json({ message: "Logout successful" });
});

// Contact

const validateContact = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("message")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters"),
];

app.post("/api/contact", contactLimiter, validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Contact validation errors:", errors.array());
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, message } = req.body;
  try {
    console.log("🔄 Attempting to save contact:", {
      name,
      email,
      message: message.substring(0, 50) + "...",
    });

    const result = await pool.query(
      `INSERT INTO contacts (name, email, message, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, created_at`,
      [name, email, message]
    );

    console.log("Contact saved successfully:", result.rows[0]);

    res
      .status(201)
      .json({ success: true, message: "Submitted", data: result.rows[0] });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
});

app.get("/api/contact", async (req, res) => {
  try {
    console.log("🔄 Fetching contacts...");

    const result = await pool.query(
      `SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC LIMIT 50`
    );

    console.log("Contacts fetched:", result.rows.length);

    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Fetching contacts error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
});

// Health check with database connection test
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      database: "Connected",
      dbTime: result.rows[0].now,
    });
  } catch (err) {
    console.error("Health check failed:", err);
    res.status(500).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      database: "Disconnected",
      error: err.message,
    });
  }
});

// Database test endpoint with detailed info
app.get("/api/test-db", async (req, res) => {
  try {
    const version = await pool.query("SELECT version()");
    const userCount = await pool.query("SELECT COUNT(*) FROM users");
    const contactCount = await pool.query("SELECT COUNT(*) FROM contacts");

    res.json({
      success: true,
      version: version.rows[0].version,
      userCount: userCount.rows[0].count,
      contactCount: contactCount.rows[0].count,
      message: "Database connection successful",
    });
  } catch (err) {
    console.error("❌ Database test failed:", err);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: err.message,
    });
  }
});

// Test insert endpoint to manually test data insertion
app.post("/api/test-insert", async (req, res) => {
  try {
    const testContact = {
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message from the server",
    };

    console.log("Testing insert with:", testContact);

    const result = await pool.query(
      `INSERT INTO contacts (name, email, message, created_at) 
       VALUES ($1, $2, $3, NOW()) 
       RETURNING id, name, email, message, created_at`,
      [testContact.name, testContact.email, testContact.message]
    );

    console.log("Test insert successful:", result.rows[0]);

    res.json({
      success: true,
      message: "Test insert successful",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Test insert failed:", err);
    res.status(500).json({
      success: false,
      message: "Test insert failed",
      error: err.message,
      detail: err.detail || "No additional details",
    });
  }
});

// SPA Fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down...");
  pool.end();
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down...");
  pool.end();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
