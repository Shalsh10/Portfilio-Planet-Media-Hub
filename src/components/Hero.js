import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Hero.css";

function Hero() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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

  // التحكم في اتجاه الموقع (RTL / LTR) بشكل تلقائي عند تغيير اللغة
  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  // دالة تبديل اللغة
  const toggleLanguage = () => {
    const nextLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(nextLang);
  };

  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>

      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* 🌐 تم إزالة اللوجو واستبداله بزر تبديل اللغة في أعلى اليمين */}
        <button className="lang-toggle-btn" onClick={toggleLanguage}>
          {t("langBtn")}
        </button>

        <nav className="nav-links">
          <button onClick={() => scrollToSection("home")}>{t("navHome")}</button>
          <button onClick={() => scrollToSection("about")}>{t("navAbout")}</button>
          <button onClick={() => scrollToSection("services")}>{t("navServices")}</button>
          <button onClick={() => scrollToSection("portfolio")}>{t("navPortfolio")}</button>
          <button onClick={() => scrollToSection("contact")}>{t("navContact")}</button>
        </nav>

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
          <button
            className="primary-btn"
            onClick={() => scrollToSection("contact")}
          >
            {t("heroBtnStart")}
          </button>

          <button
            className="secondary-btn"
            onClick={() => scrollToSection("portfolio")}
          >
            {t("heroBtnPortfolio")} <span>▶</span>
          </button>
        </div>

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

      {/* ✅ السهم */}
      {showTop && (
        <button className="scroll-top" onClick={() => scrollToSection("home")}>
          ↑
        </button>
      )}
    </section>
  );
}

export default Hero;