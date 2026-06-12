import React from "react";
import { Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import TrustedPartners from "./components/TrustedPartners";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import EventShowcase from "./components/EventShowcase";

import "./App.css";

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Services />
      <Portfolio />
      <TrustedPartners />
      <Testimonials />
      <ContactSection />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* الصفحة الرئيسية التي تحتوي على البورتفوليو */}
      <Route path="/" element={<HomePage />} />

      {/* 🌟 التعديل هنا: قمنا بتغيير /showcase/:id إلى /event-showcase/:id ليطابق زر التفاصيل */}
      <Route path="/event-showcase/:id" element={<EventShowcase />} />
    </Routes>
  );
}

export default App;