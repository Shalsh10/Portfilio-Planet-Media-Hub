import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "./TrustedPartners.css";

function PartnerCard({ partner }) {
  return (
    <div className="partner-card">
      <span className="partner-name">{partner.name}</span>
      <span className="partner-badge">{partner.initials}</span>
    </div>
  );
}

function TrustedPartners() {
  const { t } = useTranslation();

  // مصفوفة الشركاء مترجمة بالكامل ستاتيك من ملفات الـ JSON
  const partners = [
    { name: t("partner1Name"), initials: t("partner1Init") },
    { name: t("partner2Name"), initials: t("partner2Init") },
    { name: t("partner3Name"), initials: t("partner3Init") },
    { name: t("partner4Name"), initials: t("partner4Init") },
    { name: t("partner5Name"), initials: t("partner5Init") },
    { name: t("partner6Name"), initials: t("partner6Init") },
    { name: t("partner7Name"), initials: t("partner7Init") },
    { name: t("partner8Name"), initials: t("partner8Init") },
    { name: t("partner9Name"), initials: t("partner9Init") },
    { name: t("partner10Name"), initials: t("partner10Init") },
  ];

  const firstRow = partners.slice(0, 5);
  const secondRow = partners.slice(5, 10);

  return (
    <section className="trusted-partners">
      <div className="trusted-glow"></div>

      <div className="trusted-content">
        <motion.div
          className="trusted-badge"
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t("trustedBadge")}
        </motion.div>

        <motion.h2
          className="trusted-title"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {t("trustedTitlePart1")}
          <span>{t("trustedTitleGold")}</span>
        </motion.h2>

        <motion.p
          className="trusted-subtitle"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          viewport={{ once: true }}
        >
          {t("trustedSubtitle")}
        </motion.p>

        <motion.p
          className="trusted-small-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          viewport={{ once: true }}
        >
        </motion.p>
      </div>

      <motion.div
        className="partners-marquee-wrapper"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        viewport={{ once: true }}
      >
        <div className="partners-row row-one">
          <div className="partners-track track-left">
            {[...firstRow, ...firstRow, ...firstRow].map((partner, index) => (
              <PartnerCard key={`row1-${index}`} partner={partner} />
            ))}
          </div>
        </div>

        <div className="partners-row row-two">
          <div className="partners-track track-right">
            {[...secondRow, ...secondRow, ...secondRow].map(
              (partner, index) => (
                <PartnerCard key={`row2-${index}`} partner={partner} />
              ),
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default TrustedPartners;