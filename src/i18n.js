import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const backendOpts = {
  loadPath: `${process.env.REACT_APP_API_BASE_URL}/` + localStorage.i18nextLng,
  crossDomain: true,
};

i18n
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: "en",
    lng: "en",
    debug: true,
    backend: backendOpts,
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,

    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },

    react: {
      useSuspense: true,
    },
  });

export default i18n;
