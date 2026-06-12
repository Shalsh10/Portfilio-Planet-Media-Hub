import React from "react";
import { useTranslation } from "react-i18next";
import "./Services.css";

function ServiceCard({ icon, badge, title, desc }) {
  return (
    <div className="service-card">
      {badge && <span className="service-card-badge">{badge}</span>}
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Services() {
  const { t, i18n } = useTranslation();

  const services = [
    {
      icon: "📅",
      badge: t("badgeMostRequested"),
      title: t("service1Title"),
      desc: t("service1Desc"),
    },
    {
      icon: "🤝",
      title: t("service2Title"),
      desc: t("service2Desc"),
    },
    {
      icon: "📣",
      title: t("service3Title"),
      desc: t("service3Desc"),
    },
    {
      icon: "📋",
      title: t("service4Title"),
      desc: t("service4Desc"),
    },
    {
      icon: "🎥",
      title: t("service5Title"),
      desc: t("service5Desc"),
    },
    {
      icon: "🖨️",
      title: t("service6Title"),
      desc: t("service6Desc"),
    },
    {
      icon: "⭐",
      badge: t("badgeMostCommon"),
      title: t("service7Title"),
      desc: t("service7Desc"),
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        
        <div className="services-header">
          <span className="services-badge">
            {t("servicesBadge")}
          </span>

          <h2>
            {t("servicesTitlePart1")}
            <span>{t("servicesTitleGold")}</span>
          </h2>

          <p>
            {t("servicesDesc")}
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;