import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
import { reactI18nextModule } from "react-i18next";
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from "./locales/English/translation.json";
import translationHin from "./locales/Hindi/translation.json";
import translationKan from "./locales/Kannada/translation.json";
import translationTam from "./locales/Tamil/translation.json";
// not like to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init
const resources = {
  English: {
    translation: translationEN
  },
  Hindi: {
    translation: translationHin
  },
  Kannada: {
    translation: translationKan
  },
  Tamil: {
    translation: translationTam
  }
};

i18n
  // load translation using xhr -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(reactI18nextModule)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: "English",
    fallbackLng: 'English',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // keySeparator: false,
  });


export default i18n;