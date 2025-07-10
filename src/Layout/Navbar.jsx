import React, { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ activeSection, isMenuOpen, setIsMenuOpen }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { id: "hero", label: "Home", path: "/" },
    { id: "features", label: "Features", path: "/features" },
    { id: "testimonials", label: "Testimonials", path: "/testimonials" },
    { id: "pricing", label: "Pricing", path: "/pricing" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                BlogCraft
              </h1>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                    activeSection === item.id
                      ? "text-cyan-400 border-b-2 border-cyan-400"
                      : "text-purple-200 hover:text-white hover:bg-purple-500/10 rounded-lg"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Auth Section (Desktop) */}
              {isAuthenticated ? (
                <div className="relative ml-4">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg shadow hover:from-purple-700 hover:to-cyan-700 transition duration-300 transform hover:scale-105"
                  >
                    <User className="w-4 h-4" />
                    <span className="max-w-32 truncate">{user?.name}</span>
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="ml-4 px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-lg shadow hover:bg-cyan-600 transition duration-300 transform hover:scale-105"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex bg-transparent items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-110"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div
          className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-transparent backdrop-blur-lg shadow-md">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                  activeSection === item.id
                    ? "text-cyan-400 bg-cyan-400/10 border-l-4 border-cyan-400"
                    : "text-purple-200 hover:text-white hover:bg-purple-500/10"
                } rounded-r-lg`}
              >
                {item.label}
              </Link>
            ))}

            {/* Auth Section (Mobile) */}
            {isAuthenticated ? (
              <div className="mt-3 space-y-2">
                <div className="px-3 py-2 border-t border-purple-500/20 pt-3">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-purple-200 truncate">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-left text-base font-medium text-purple-200 hover:text-white hover:bg-purple-500/10 rounded-lg transition duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-3 px-4 py-2 text-base font-semibold text-center text-white bg-cyan-500 rounded-lg shadow hover:bg-cyan-600 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Backdrop for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
