import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Testimonials.css";

function Testimonials() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // ========================================================
  // بيانات احتياطية مترجمة تظهر باللغة المناسبة فوراً في حال تعطل الـ API
  // ========================================================
  const fallbackData = [
    {
      name: t("fb1Name"),
      position: t("fb1Pos"),
      company: t("fb1Comp"),
      message: t("fb1Msg"),
      image_url: null
    },
    {
      name: t("fb2Name"),
      position: t("fb2Pos"),
      company: t("fb2Comp"),
      message: t("fb2Msg"),
      image_url: null
    },
    {
      name: t("fb3Name"),
      position: t("fb3Pos"),
      company: t("fb3Comp"),
      message: t("fb3Msg"),
      image_url: null
    }
  ];

  // =========================
  // GET TESTIMONIALS API
  // =========================
  useEffect(() => {
    fetch("https://plant.solvextechnology.net/public/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.data || Array.isArray(data))) {
          setTestimonials(data.data || data);
        } else {
          setTestimonials(fallbackData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("API Error, using fallback data:", err);
        setTestimonials(fallbackData);
        setLoading(false);
      });
  }, [t]); // التحديث عند تغيير اللغة لضمان استقرار الفولباك

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 style={{ color: "#000", textAlign: "center", fontFamily: "Cairo" }}>
            {t("testimonialsLoading")}
          </h2>
        </div>
      </section>
    );
  }

  const finalData = testimonials.length > 0 ? testimonials : fallbackData;
  const rawActive = finalData[activeIndex] || fallbackData[0];

  // دمج الذكاء اللغوي لقراءة بيانات السيرفر المترجمة مستقبلاً أو الفولباك الحالي
  const active = {
    name: currentLang === "en" ? (rawActive.name_en || rawActive.name) : (rawActive.name_ar || rawActive.name),
    position: currentLang === "en" ? (rawActive.position_en || rawActive.role_en || rawActive.position || rawActive.role) : (rawActive.position_ar || rawActive.role_ar || rawActive.position || rawActive.role),
    company: currentLang === "en" ? (rawActive.company_en || rawActive.company) : (rawActive.company_ar || rawActive.company),
    message: currentLang === "en" ? (rawActive.message_en || rawActive.text_en || rawActive.message || rawActive.text) : (rawActive.message_ar || rawActive.text_ar || rawActive.message || rawActive.text),
    image_url: rawActive.image_url
  };

  // =========================
  // NEXT & PREV
  // =========================
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % finalData.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? finalData.length - 1 : prev - 1));
  };

  const getInitial = (name) => {
    return name?.charAt(0) || "P";
  };

  const colors = ["#000000", "#111111", "#222222", "#333333"];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        
        {/* ================= HEADER ================= */}
        <div className="testimonials-header">
          <span className="testimonials-badge">{t("testimonialsBadge")}</span>
          <h2>
            {t("testimonialsTitlePart1")}
            <span>{t("testimonialsTitleGold")}</span>
          </h2>
        </div>

        {/* ================= MAIN CARD ================= */}
        <div className="testimonial-card" key={activeIndex}>
          <div className="quote-mark">”</div>
          <div className="stars">★★★★★</div>
          <p className="testimonial-text">"{active.message}"</p>

          <div className="testimonial-footer">
            <div className="client-info">
              <div className="avatar-wrapper">
                {active.image_url ? (
                  <img 
                    src={active.image_url} 
                    alt={active.name} 
                    className="client-real-image" 
                  />
                ) : (
                  <div
                    className="client-avatar"
                    style={{
                      backgroundColor: colors[activeIndex % colors.length],
                      color: "#ffffff"
                    }}
                  >
                    {getInitial(active.name)}
                  </div>
                )}
              </div>

              <div>
                <h3>{active.name}</h3>
                <p>
                  {active.position}
                  {active.company && ` - ${active.company}`}
                </p>
              </div>
            </div>

            <span className="trusted-label">{t("testimonialsTrustedLabel")}</span>
          </div>
        </div>

        {/* ================= CONTROLS ================= */}
        <div className="testimonial-controls">
          <button onClick={prevTestimonial}>‹</button>

          <div className="testimonial-dots">
            {finalData.map((_, index) => (
              <span
                key={index}
                className={activeIndex === index ? "active" : ""}
                onClick={() => setActiveIndex(index)}
              ></span>
            ))}
          </div>

          <button onClick={nextTestimonial}>›</button>
        </div>

        {/* ================= CLIENTS LIST ================= */}
        <div className="clients-list">
          {finalData.map((client, index) => {
            const cName = currentLang === "en" ? (client.name_en || client.name) : (client.name_ar || client.name);
            const cCompany = currentLang === "en" ? (client.company_en || client.position_en || client.company || client.position) : (client.company_ar || client.position_ar || client.company || client.position);

            return (
              <button
                key={index}
                className={`client-tab ${activeIndex === index ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <div>
                  <h4>{cName}</h4>
                  <p>{cCompany}</p>
                </div>

                <div className="tab-avatar-wrapper">
                  {client.image_url ? (
                    <img 
                      src={client.image_url} 
                      alt={cName} 
                      className="client-tab-real-image" 
                  />
                  ) : (
                    <span
                      className="client-tab-avatar"
                      style={{
                        backgroundColor: colors[index % colors.length],
                        color: "#ffffff"
                      }}
                    >
                      {getInitial(cName)}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;