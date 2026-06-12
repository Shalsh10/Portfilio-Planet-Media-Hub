import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ContactSection.css";

const API_BASE_URL = "https://plant.solvextechnology.net/public";

function ContactSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; // تحديد اللغة الحالية بدقة

  const [settings, setSettings] = useState({
    email: "",
    phone: "",
  });

  const [socialLinks, setSocialLinks] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ✅ GET DATA
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/social`)
      .then((res) => res.json())
      .then((data) => {
        const payload = data.data;

        setSettings({
          email: payload.contact_email,
          phone: payload.contact_phone,
        });

        setSocialLinks(payload.social_links || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("phone", formData.phone);
      body.append("email", formData.email);
      body.append("message", formData.message);

      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        body,
      });

      if (!res.ok) throw new Error();

      setSuccess(currentLang === "en" ? "Your request has been sent successfully! ✅" : "تم إرسال طلبك بنجاح ✅");

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch {
      setError(currentLang === "en" ? "An error occurred while sending. ❌" : "حدث خطأ أثناء الإرسال ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-glow"></div>

      <div className="contact-container">
        {/* HEADER */}
        <div className="contact-header">
          <span className="contact-badge">{t("contactBadge")}</span>

          <h2>
            {t("contactTitlePart1")}
            <span>{t("contactTitleGold")}</span>
            {t("contactTitlePart2")}
          </h2>

          <p>{t("contactDesc")}</p>
        </div>

        <div className="contact-layout">
          {/* FORM */}
          <form className="contact-form-card" onSubmit={handleSubmit}>
            <h3>{t("contactFormTitle")}</h3>

            {success && <p className="contact-success">{success}</p>}
            {error && <p className="contact-error">{error}</p>}

            <div className="form-group">
              <label>{t("contactFormName")}</label>
              <input
                type="text"
                name="name"
                placeholder={t("contactFormNamePlaceholder")}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>{t("contactFormEmail")}</label>
              <input
                type="email"
                name="email"
                placeholder={t("contactFormEmailPlaceholder")}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>{t("contactFormPhone")}</label>
              <input
                type="text"
                name="phone"
                placeholder={currentLang === "en" ? "+966" : "966+"}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>{t("contactFormMessage")}</label>
              <textarea
                name="message"
                placeholder={t("contactFormMessagePlaceholder")}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit" disabled={loading}>
              {loading ? (currentLang === "en" ? "Sending..." : "جاري الإرسال...") : t("contactFormSubmit")}
            </button>
          </form>

          {/* INFO */}
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-icon">📞</div>
              <div>
                <h4>{t("contactCallUs")}</h4>
                <p style={{ direction: "ltr", textAlign: "right" }}>{settings.phone}</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">✉</div>
              <div>
                <h4>{t("contactEmail")}</h4>
                <p>{settings.email}</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">📍</div>
              <div>
                <h4>{t("contactLocation")}</h4>
                <p>{currentLang === "en" ? "Beni Suef Governorate - East of the Nile - 1st District - Above Despacito Cafe" : "محافظة بني سويف - شرق النيل - الحي الاول - اعلي كافية ديسباسيتو"}</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">⏱</div>
              <div>
                <h4>{t("contactHours")}</h4>
                <p>{currentLang === "en" ? "Sunday - Thursday: 9 AM - 6 PM" : "الأحد - الخميس: 9ص - 6م"}</p>
              </div>
            </div>

            <div className="social-box">
              <h4>{t("contactFollowUs")}</h4>
              <div className="social-links">
                {socialLinks.map((s, i) => (
                  <a href={s.url} key={i} target="_blank" rel="noreferrer">
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;