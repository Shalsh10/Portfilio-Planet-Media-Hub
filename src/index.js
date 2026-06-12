import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import i18n from "./i18n/config"; // ملف تهيئة الترجمة

import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* الـ Suspense يحمي التطبيق من الـ Crash أثناء تحميل ملفات الترجمة الاستاتيكية */}
      <Suspense fallback={<div style={{ textAlign: "center", padding: "50px", color: "#fff", background: "#000", height: "100vh" }}>Loading...</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);