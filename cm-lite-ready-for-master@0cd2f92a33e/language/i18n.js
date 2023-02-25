import i18n from "i18next";
import { initReactI18next } from "react-i18next";

let My = require("./my.json");
let En = require("./en.json");
let Ch = require("./ch.json");

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: { ...En },
    },
    my: {
      translations: { ...My },
    },
    ch: {
      translations: { ...Ch },
    },
  },
  lng: "en",
  debug: true,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
  	escapeValue: false
  }
});

export default i18n;
