import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Portfolio.css";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://plant.solvextechnology.net/public";

function Portfolio() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  // تعديل الفلتر النشط ليعتمد على الـ id لضمان الاستقرار مع اللغات
  const [activeFilterId, setActiveFilterId] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDepartments();
    fetchProjects();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/departments`);
      const data = await response.json();
      setDepartments(data.data || data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProjects = async (departmentId = null) => {
    try {
      setLoading(true);
      let url = `${API_BASE_URL}/api/projects`;
      if (departmentId) {
        url += `?department_id=${departmentId}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setProjects(data.data || data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError(t("portfolioError"));
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filter) => {
    setActiveFilterId(filter.id);
    if (filter.id === "all") {
      fetchProjects();
    } else {
      fetchProjects(filter.id);
    }
  };

  const getProjectImage = (project) => {
    if (!project.banner_image_url) {
      return "https://via.placeholder.com/600x400";
    }
    return project.banner_image_url;
  };

  // بناء مصفوفة الفلاتر مع الترجمة الديناميكية للأقسام المستقبلية
  const filters = [
    { id: "all", name: t("portfolioFilterAll") },
    ...departments.map((dept) => ({
      id: dept.id,
      name: currentLang === "en" ? (dept.name_en || dept.name) : (dept.name_ar || dept.name),
    })),
  ];

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-container">
        
        {/* Header Section */}
        <div className="portfolio-header">
          <span className="portfolio-badge">{t("portfolioBadge")}</span>
          <h2>
            {t("portfolioTitlePart1")}
            <span>{t("portfolioTitleGold")}</span>
          </h2>
          <p>{t("portfolioDesc")}</p>
        </div>

        {/* Filters */}
        <div className="portfolio-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={activeFilterId === filter.id ? "active" : ""}
              onClick={() => handleFilter(filter)}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Loading & Error States */}
        {loading && <div className="portfolio-loading">{t("portfolioLoading")}</div>}
        {error && <div className="portfolio-error">{error}</div>}

        {/* Projects Grid */}
        {!loading && (
          <div className="portfolio-grid">
            {projects.map((project) => {
              // استخراج النصوص بشكل ديناميكي تبعا للغة الحالية
              const projectTitle = currentLang === "en" ? (project.title_en || project.title) : (project.title_ar || project.title);
              const projectDept = currentLang === "en" ? (project.department?.name_en || project.department?.name) : (project.department?.name_ar || project.department?.name);
              const projectDesc = currentLang === "en" ? (project.details_en || project.description_en || project.details || project.description) : (project.details_ar || project.description_ar || project.details || project.description);

              return (
                <div className="project-card" key={project.id} dir={currentLang === "en" ? "ltr" : "rtl"}>
                  
                  {/* الجزء العلوي: الصورة والتاغ */}
                  <div className="project-image-wrapper">
                    <img src={getProjectImage(project)} alt={projectTitle} />
                    <span className="project-category">
                      {projectDept || t("portfolioDefaultCategory")}
                    </span>
                  </div>

                  {/* الجزء السفلي: التفاصيل والزر */}
                  <div className="project-card-body">
                    <h3>{projectTitle}</h3>
                    <div className="project-card-footer">
                      <p className="project-short-desc">
                        {projectDesc || t("portfolioNoDesc")}
                      </p>
                      <Link to={`/event-showcase/${project.id}`} className="show-more-btn">
                        {t("portfolioMoreDetails")}
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;