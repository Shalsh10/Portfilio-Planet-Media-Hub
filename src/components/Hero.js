import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Hero.css";

function Hero() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 📱 حالة قائمة الموبايل والتابلت

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMenuOpen(false); // إغلاق القائمة الجانبية فوراً عند الضغط على أي رابط
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // التحكم في اتجاه الموقع ولغته على مستوى الـ HTML الجذري لضمان قلب العناصر والتأثيرات بسلاسة
  useEffect(() => {
    const rootEl = document.documentElement;
    rootEl.dir = i18n.language === "ar" ? "rtl" : "ltr";
    rootEl.lang = i18n.language;
  }, [i18n.language]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(nextLang);
    setMenuOpen(false);
  };

  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>

      <header className={`navbar ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-active" : ""}`}>
        {/* 🌐 زر تبديل اللغة الفخم في أعلى اليسار أو اليمين حسب الاتجاه */}
        <button className="lang-toggle-btn" onClick={toggleLanguage}>
          {t("langBtn")}
        </button>

        {/* 📱 زر القائمة الجانبية (Hamburger) الذكي - يظهر في الشاشات الصغيرة فقط */}
        <button 
          className={`hamburger ${menuOpen ? "open" : ""}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* الروابط: تتحول ديناميكياً لقائمة جانبية منسدلة بشكل بروفيشنال في الشاشات الصغيرة */}
        <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
          <button onClick={() => scrollToSection("home")}>{t("navHome")}</button>
          <button onClick={() => scrollToSection("about")}>{t("navAbout")}</button>
          <button onClick={() => scrollToSection("services")}>{t("navServices")}</button>
          <button onClick={() => scrollToSection("portfolio")}>{t("navPortfolio")}</button>
          <button onClick={() => scrollToSection("contact")}>{t("navContact")}</button>
          
          {/* زر الـ CTA ينسخ داخل القائمة في شاشات الموبايل الصغيرة جداً لضمان عدم الخروج عن التناسق */}
          <button className="nav-cta-mobile" onClick={() => scrollToSection("contact")}>
            {t("btnStart")}
          </button>
        </nav>

        {/* زر الـ CTA للشاشات الكبيرة والمتوسطة */}
        <button className="nav-cta" onClick={() => scrollToSection("contact")}>
          {t("btnStart")}
        </button>
      </header>

      <div className="hero-content">
        <div className="hero-badge">
          <span></span>
          {t("heroBadge")}
        </div>

        <h1>
          {t("heroTitlePart1")} <span className="gold">{t("heroTitleGold")}</span>
          <br />
          {t("heroTitlePart2")}
        </h1>

        <p>
          {t("heroDescPart1")}
          <br />
          {t("heroDescPart2")} <span>PLANET Media Hub</span>
        </p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => scrollToSection("contact")}>
            {t("heroBtnStart")}
          </button>

          <button className="secondary-btn" onClick={() => scrollToSection("portfolio")}>
            {t("heroBtnPortfolio")} <span>▶</span>
          </button>
        </div>

        {/* 📊 الإحصائيات الذكية المستجيبة بالكامل */}
        <div className="stats">
          <div className="stat-card">
            <h3>+300</h3>
            <p>{t("statClients")}</p>
          </div>

          <div className="stat-card">
            <h3>+120</h3>
            <p>{t("statEvents")}</p>
          </div>

          <div className="stat-card">
            <h3>+50</h3>
            <p>{t("statConferences")}</p>
          </div>
        </div>
      </div>

      {/* ✅ سهم العودة للأعلى الذكي المنسق جغرافياً */}
      {showTop && (
        <button className="scroll-top" onClick={() => scrollToSection("home")}>
          ↑
        </button>
      )}
    </section>
  );
}

export default Hero;