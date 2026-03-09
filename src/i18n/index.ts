import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import pt from "./locales/pt.json";
import en from "./locales/en.json";

const resources = {
    pt: { translation: pt },
    en: { translation: en },
};

const initI18n = async () => {
    let savedLanguage = await AsyncStorage.getItem('user-language');

    if (!savedLanguage) {
        savedLanguage = Localization.getLocales()[0].languageCode;
    }

    i18n.use(initReactI18next).init({
        // Correção: mudar 'v3' para 'v4' (versão compatível com i18next 25+)
        compatibilityJSON: 'v4',
        resources,
        lng: savedLanguage || 'pt',
        fallbackLng: 'pt',
        interpolation: {
            escapeValue: false
        }
    });
};

initI18n();

export default i18n;