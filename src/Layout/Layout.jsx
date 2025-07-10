// src/Layout/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import ContactDetail from "../components/ContactDetail";
const Layout = ({
  activeSection,
  setActiveSection,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <>
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main className="pt-16">
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="pricing" className="min-h-screen">
          <Pricing />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <section id="contact">
          <ContactDetail />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
