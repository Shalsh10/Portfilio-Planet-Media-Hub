import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./EventShowcase.css";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = "https://plant.solvextechnology.net/public";

function EventShowcase() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  // ================= FETCH PROJECT =================
  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`);
      const result = await response.json();
      
      const projectData = result.data || result;
      console.log("Fetched Project Data =>", projectData);
      
      setProject(projectData);
    } catch (err) {
      console.log("Error fetching project:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= GET IMAGES =================
  const images =
    project?.images?.length > 0 ? project.images : [project?.banner_image_url];

  // ================= AUTO SLIDER =================
  useEffect(() => {
    if (!images?.length || images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  // ================= BACK TO PORTFOLIO HANDLER =================
  const handleBackToPortfolio = (e) => {
    e.preventDefault();
    navigate(-1);
    setTimeout(() => {
      const element = document.getElementById("portfolio");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // ================= LOADING =================
  if (loading) {
    return <div className="event-loading">{currentLang === "en" ? "Loading project details..." : "جاري تحميل المشروع..."}</div>;
  }

  return (
    <section className="event-showcase-page">
      {/* ================= BREADCRUMB ================= */}
      <div className="event-breadcrumb">
        <a href="#portfolio" onClick={handleBackToPortfolio}>
          {t("navPortfolio")}
        </a>
        <span className="breadcrumb-separator"> / </span>
        <span className="breadcrumb-current">
          {project?.title || (currentLang === "en" ? "Loading title..." : "تحميل العنوان...")}
        </span>
      </div>

      {/* ================= MAIN SECTION ================= */}
      <div className="event-main-container">
        
        {/* ================= INFO SECTION ================= */}
        <div className="event-info">
          <span className="event-badge">
            {project?.department?.name || (currentLang === "en" ? "General" : "بدون قسم")}
          </span>

          <h1>{project?.title || (currentLang === "en" ? "Title not available" : "العنوان غير متوفر")}</h1>

          <div className="event-meta">
            {(project?.project_date || project?.created_at) && (
              <div className="meta-item">
                <FiCalendar />
                <span>
                  {project?.project_date || project?.created_at}
                </span>
              </div>
            )}

            {project?.location && (
              <div className="meta-item">
                <FiMapPin />
                <span>{project.location}</span>
              </div>
            )}
          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="event-description">
            <h3>{currentLang === "en" ? "About The Event" : "نبذة عن الحدث"}</h3>
            <p>
              {project?.details ||
                project?.description ||
                (currentLang === "en" 
                  ? "No details available for this event at the moment." 
                  : "لا يوجد وصف متاح لهذا الحدث حالياً.")}
            </p>
          </div>
        </div>

        {/* ================= SLIDER SECTION ================= */}
        <div className="event-slider">
          <div className="main-image">
            {images[activeImage] ? (
              <img src={images[activeImage]} alt={project?.title || "Event"} />
            ) : (
              <div className="no-image-placeholder">
                {currentLang === "en" ? "No image available" : "لا توجد صورة متاحة"}
              </div>
            )}
          </div>

          {/* ================= THUMBNAILS ================= */}
          <div className="thumbnail-row">
            {images.length > 1 &&
              images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className={activeImage === index ? "active-thumb" : ""}
                  onClick={() => setActiveImage(index)}
                />
              ))}
          </div>
        </div>
      </div>

      {/* ================= GALLERY ================= */}
      {images.length > 0 && (
        <div className="event-gallery-section">
          <h2>{currentLang === "en" ? "Photo Gallery" : "معرض الصور"}</h2>
          <div className="gallery-grid">
            {images.map((img, index) => (
              <div className="gallery-card" key={index}>
                <img src={img} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default EventShowcase;