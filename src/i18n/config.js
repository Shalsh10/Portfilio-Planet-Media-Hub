import i18n from 'i18next'; // ✅ تم تعديل الاسم هنا ليصبح i18next الصحيح
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'ar', 
    fallbackLng: 'ar',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;