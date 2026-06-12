import React from "react";
import { useTranslation } from "react-i18next";
import "./AboutSection.css";
import sectionImg from "../assets/images/Container (2).png";

function AboutSection() {
  const { t } = useTranslation();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <span className="about-badge">{t("aboutBadge")}</span>

          <h2 className="about-title">
            {t("aboutTitlePart1")}
            <span>{t("aboutTitleGold")}</span>
            <br />
            {t("aboutTitlePart2")}
          </h2>

          <p className="about-desc">
            {t("aboutDesc")}
          </p>

          <div className="features-grid">
            {/* شبكة شركاء قوية */}
            <div className="feature-card">
              <div className="feature-icon">☊</div>
              <h3>{t("aboutCard2Title")}</h3>
              <p>{t("aboutCard2Desc")}</p>
            </div>

            {/* إدارة كاملة 360 */}
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>{t("aboutCard1Title")}</h3>
              <p>{t("aboutCard1Desc")}</p>
            </div>

            {/* احترافية موثوقة */}
            <div className="feature-card">
              <div className="feature-icon">♙</div>
              <h3>{t("aboutCard4Title")}</h3>
              <p>{t("aboutCard4Desc")}</p>
            </div>

            {/* حلول مبتكرة */}
            <div className="feature-card">
              <div className="feature-icon">◎</div>
              <h3>{t("aboutCard3Title")}</h3>
              <p>{t("aboutCard3Desc")}</p>
            </div>
          </div>

          <button
            className="about-btn"
            onClick={() => scrollToSection("contact")}
          >
            {t("aboutBtnTalk")}
          </button>
        </div>

        <div className="about-image-box">
          <img src={sectionImg} alt="Planet Media Hub meeting" />
          <div className="exp-badge">
            <strong>+10</strong>
            <span>{t("aboutYearsExp")}</span>
          </div>
          <div className="rate-badge">
            <strong>100%</strong>
            <span>{t("aboutClientsSat")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;