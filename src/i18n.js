import i18n from "i18next";
import axios from "axios";
import LanguageDetector from "i18next-browser-languagedetector";
import { useEffect, useState } from "react";
import { text } from "body-parser";
import {getJson}from './pages/translations';
import translationFR from './locales/fr/translations.json';
import translationEN from './locales/en/translations.json';
import { easing } from "@material-ui/core";
import Backend from 'i18next-http-backend';

const backendOpts = {
    loadPath: "https://api.forumconcepts.fr/"+ localStorage.i18nextLng,
    crossDomain: true,
};


i18n.use(LanguageDetector).use(Backend).init({
    fallbackLng: "en",
    lng: "en",
    debug: true,
    backend: backendOpts,
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,

    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },

    react: {
        useSuspense: true,
    }
});

export default i18n;