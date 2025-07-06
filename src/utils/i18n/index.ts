import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/utils/i18n/locales/en.json';
import th from '@/utils/i18n/locales/th.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {translation: en},
            th: {translation: th}
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    }).then();

export default i18n;
