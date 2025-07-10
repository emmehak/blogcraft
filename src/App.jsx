import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import LoginPage from "./components/LoginPage";

const ScrollToPathSection = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const sectionId =
      location.pathname === "/" ? "hero" : location.pathname.slice(1);
    const tryScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        requestAnimationFrame(tryScroll);
      }
    };
    tryScroll();
  }, [location.pathname]);

  return children;
};
const App = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const navType = performance.getEntriesByType("navigation")[0]?.type;

      if (navType !== "reload") {
        const token = localStorage.getItem("token");
        if (token) {
          navigator.sendBeacon(
            "/api/auth/logout",
            new Blob([JSON.stringify({})], { type: "application/json" })
          );
          localStorage.removeItem("token");
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const sectionIds = [
      "hero",
      "features",
      "testimonials",
      "pricing",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <ScrollToPathSection>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <Layout
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            }
          />
        </Routes>
      </ScrollToPathSection>
    </Router>
  );
};

export default App;
