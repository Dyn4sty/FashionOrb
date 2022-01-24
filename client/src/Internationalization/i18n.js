import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";

const Languages = ["en", "he"];
i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: false,
    whitelist: Languages,
    saveMissing: true,

    // keySeparator: false, // we use content as keys

    // interpolation: {
    //   escapeValue: false
    // }
  });

export default i18n;
