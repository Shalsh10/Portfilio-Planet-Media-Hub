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

// المكون الخاص بالصفحة الرئيسية كاملة
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
      {/* 1️⃣ الصفحة الرئيسية التي تحتوي على جميع السكاشن */}
      <Route path="/" element={<HomePage />} />

      {/* 2️⃣ صفحة تفاصيل الفعالية (المسار الديناميكي) */}
      <Route path="/event-showcase/:id" element={<EventShowcase />} />

      {/* 3️⃣ 🌟 الحل السحري للشاشة الكحلية:
           أي مسار قديم أو خاطئ يكتبه المتصفح (مثل /Portfilio-Planet-Media-Hub) 
           سيقوم بتوجيهه فوراً لفتح الصفحة الرئيسية بدلاً من انهيار التطبيق */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;