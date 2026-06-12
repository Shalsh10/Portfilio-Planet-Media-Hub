import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// حساب المسار الفرعي للموقع ديناميكياً لتجنب مشاكل الـ Sub-paths والـ Hosting
const getTranslationPath = (lng) => {
  // نتحقق إن كان الموقع يفتح على مسار فرعي (مثل GitHub Pages)
  const pathname = window.location.pathname;
  const basePath = pathname.split('/')[1];
  
  // إذا كان هناك مسار فرعي، ندمجه في المسار، وإلا نعتمد على الجذر مباشرة
  if (basePath && !['event-showcase'].includes(basePath)) {
    return `/${basePath}/Locales/${lng}/translation.json`;
  }
  return `/Locales/${lng}/translation.json`;
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'ar', 
    fallbackLng: 'ar',
    backend: {
      // استخدام الدالة الديناميكية لحل مشكلة قراءة الـ Keys نهائياً
      loadPath: (lngs) => getTranslationPath(lngs[0]),
    },
    interpolation: {
      escapeValue: false
    }
  });

// ربط الكائن بالـ window للفحص في الكونسول
window.i18n = i18n;

export default i18n;