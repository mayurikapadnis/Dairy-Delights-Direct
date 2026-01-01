import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ContactInfo from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

function Home() {
  useEffect(() => {
    // Scroll smoothly to the hash section on mount, if present
    if (window.location.hash) {
      const id = window.location.hash.substring(1); // remove '#'
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <section id="about">
        <AboutSection />
      </section>
      <section id="contact" className="py-14 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded shadow-lg p-8">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
