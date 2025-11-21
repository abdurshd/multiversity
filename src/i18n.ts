import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import common namespaces (always loaded)
import enCommonUI from './locales/en/common/ui.json';
import enCommonNav from './locales/en/common/navigation.json';
import enCommonFooter from './locales/en/common/footer.json';
import enCommonErrors from './locales/en/common/errors.json';

import uzCommonUI from './locales/uz/common/ui.json';
import uzCommonNav from './locales/uz/common/navigation.json';
import uzCommonFooter from './locales/uz/common/footer.json';
import uzCommonErrors from './locales/uz/common/errors.json';

// For backward compatibility with existing code
const enLegacy = {
    common: {
        welcome: enCommonUI.common.welcome,
        language: enCommonUI.common.language,
        loading: enCommonUI.states.loading,
        error: enCommonUI.states.error,
        notFound: enCommonUI.states.not_found,
    },
    nav: enCommonNav.nav,
    landing: {
        title: "Explore Alternative Histories",
        subtitle: "What if history took a different turn?",
        cta: "Start Exploring",
        stats: {
            divergence: {
                label: "Divergence Points",
                value: "40+",
                detail: "hand-crafted turning points"
            },
            events: {
                label: "Interactive Events",
                value: "70+",
                detail: "scored for impact"
            },
            coverage: {
                label: "Coverage",
                value: "1370 → 2100+",
                detail: "global span & regional focus"
            }
        }
    }
};

const uzLegacy = {
    common: {
        welcome: uzCommonUI.common.welcome,
        language: uzCommonUI.common.language,
        loading: uzCommonUI.states.loading,
        error: uzCommonUI.states.error,
        notFound: uzCommonUI.states.not_found,
    },
    nav: uzCommonNav.nav,
    landing: {
        title: "Muqobil Tarixlarni O'rganing",
        subtitle: "Agar tarix boshqacha yo'l olsa-chi?",
        cta: "O'rganishni boshlash",
        stats: {
            divergence: {
                label: "Tarqalish nuqtalari",
                value: "40+",
                detail: "qo'lda yaratilgan burilish nuqtalari"
            },
            events: {
                label: "Interaktiv voqealar",
                value: "70+",
                detail: "ta'sir uchun baholangan"
            },
            coverage: {
                label: "Qamrov",
                value: "1370 → 2100+",
                detail: "global qamrov va mintaqaviy fokus"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enLegacy, // For backward compatibility
                'common-ui': enCommonUI,
                'common-nav': enCommonNav,
                'common-footer': enCommonFooter,
                'common-errors': enCommonErrors,
            },
            uz: {
                translation: uzLegacy, // For backward compatibility
                'common-ui': uzCommonUI,
                'common-nav': uzCommonNav,
                'common-footer': uzCommonFooter,
                'common-errors': uzCommonErrors,
            },
        },
        defaultNS: 'translation',
        fallbackNS: 'translation',
        fallbackLng: 'en',
        ns: ['translation', 'common-ui', 'common-nav', 'common-footer', 'common-errors'],
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
