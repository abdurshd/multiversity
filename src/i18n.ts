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

// Import page namespaces
import enPagesLanding from './locales/en/pages/landing.json';
import uzPagesLanding from './locales/uz/pages/landing.json';
import enPagesChaptersList from './locales/en/pages/chapters-list.json';
import uzPagesChaptersList from './locales/uz/pages/chapters-list.json';
import enPagesNotFound from './locales/en/pages/not-found.json';
import uzPagesNotFound from './locales/uz/pages/not-found.json';
import enPagesTimelineExplorer from './locales/en/pages/timeline-explorer.json';
import uzPagesTimelineExplorer from './locales/uz/pages/timeline-explorer.json';
import enPagesComparisonMode from './locales/en/pages/comparison-mode.json';
import uzPagesComparisonMode from './locales/uz/pages/comparison-mode.json';
import enPagesFAQ from './locales/en/pages/faq.json';
import uzPagesFAQ from './locales/uz/pages/faq.json';
import enPagesDocumentation from './locales/en/pages/documentation.json';
import uzPagesDocumentation from './locales/uz/pages/documentation.json';
import enPagesAccessibility from './locales/en/pages/accessibility.json';
import uzPagesAccessibility from './locales/uz/pages/accessibility.json';
import enPagesPrivacyPolicy from './locales/en/pages/privacy-policy.json';
import uzPagesPrivacyPolicy from './locales/uz/pages/privacy-policy.json';
import enPagesTermsOfService from './locales/en/pages/terms-of-service.json';
import uzPagesTermsOfService from './locales/uz/pages/terms-of-service.json';
import enPagesSupport from './locales/en/pages/support.json';
import uzPagesSupport from './locales/uz/pages/support.json';
import enPagesSimulationHub from './locales/en/pages/simulation-hub.json';
import uzPagesSimulationHub from './locales/uz/pages/simulation-hub.json';

// Import component namespaces
import enComponentsErrorBoundary from './locales/en/components/error-boundary.json';
import uzComponentsErrorBoundary from './locales/uz/components/error-boundary.json';
import enComponentsBreadcrumb from './locales/en/components/breadcrumb.json';
import uzComponentsBreadcrumb from './locales/uz/components/breadcrumb.json';
import enComponentsAnimatedTimeline from './locales/en/components/animated-timeline.json';
import uzComponentsAnimatedTimeline from './locales/uz/components/animated-timeline.json';
import enComponentsInteractiveStory from './locales/en/components/interactive-story.json';
import uzComponentsInteractiveStory from './locales/uz/components/interactive-story.json';

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

// Add a custom detector for location-based default
const customLocationDetector = {
    name: 'customLocationDetector',
    lookup(_options?: unknown) {
        try {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            // Check for Uzbekistan timezones
            if (timeZone === 'Asia/Tashkent' || timeZone === 'Asia/Samarkand') {
                return 'uz';
            }
        } catch (e) {
            console.error('Failed to detect timezone:', e);
        }
        return undefined;
    },
    cacheUserLanguage(_lng: string, _options?: unknown) {
        // Optional: cache logic if needed, but localStorage is handled by the main plugin
    }
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector(customLocationDetector);

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enLegacy, // For backward compatibility
                'common-ui': enCommonUI,
                'common-nav': enCommonNav,
                'common-footer': enCommonFooter,
                'common-errors': enCommonErrors,
                'pages-landing': enPagesLanding,
                'pages-chapters-list': enPagesChaptersList,
                'pages-not-found': enPagesNotFound,
                'pages-timeline-explorer': enPagesTimelineExplorer,
                'pages-comparison-mode': enPagesComparisonMode,
                'pages-faq': enPagesFAQ,
                'pages-documentation': enPagesDocumentation,
                'pages-accessibility': enPagesAccessibility,
                'pages-privacy-policy': enPagesPrivacyPolicy,
                'pages-terms-of-service': enPagesTermsOfService,
                'pages-support': enPagesSupport,
                'components-error-boundary': enComponentsErrorBoundary,
                'components-breadcrumb': enComponentsBreadcrumb,
                'components-animated-timeline': enComponentsAnimatedTimeline,
                'components-interactive-story': enComponentsInteractiveStory,
                'pages-simulation-hub': enPagesSimulationHub,
            },
            uz: {
                translation: uzLegacy, // For backward compatibility
                'common-ui': uzCommonUI,
                'common-nav': uzCommonNav,
                'common-footer': uzCommonFooter,
                'common-errors': uzCommonErrors,
                'pages-landing': uzPagesLanding,
                'pages-chapters-list': uzPagesChaptersList,
                'pages-not-found': uzPagesNotFound,
                'pages-timeline-explorer': uzPagesTimelineExplorer,
                'pages-comparison-mode': uzPagesComparisonMode,
                'pages-faq': uzPagesFAQ,
                'pages-documentation': uzPagesDocumentation,
                'pages-accessibility': uzPagesAccessibility,
                'pages-privacy-policy': uzPagesPrivacyPolicy,
                'pages-terms-of-service': uzPagesTermsOfService,
                'pages-support': uzPagesSupport,
                'components-error-boundary': uzComponentsErrorBoundary,
                'components-breadcrumb': uzComponentsBreadcrumb,
                'components-animated-timeline': uzComponentsAnimatedTimeline,
                'components-interactive-story': uzComponentsInteractiveStory,
                'pages-simulation-hub': uzPagesSimulationHub,
            },
        },
        defaultNS: 'translation',
        fallbackNS: 'translation',
        fallbackLng: 'en',
        ns: [
            'translation',
            'common-ui',
            'common-nav',
            'common-footer',
            'common-errors',
            'pages-landing',
            'pages-chapters-list',
            'pages-not-found',
            'pages-timeline-explorer',
            'pages-comparison-mode',
            'pages-faq',
            'pages-documentation',
            'pages-accessibility',
            'pages-privacy-policy',
            'pages-terms-of-service',
            'pages-support',
            'components-error-boundary',
            'components-breadcrumb',
            'components-animated-timeline',
            'components-interactive-story',
            'pages-simulation-hub',
        ],
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        detection: {
            order: ['localStorage', 'customLocationDetector', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },
    });

// Dynamic chapter translation loader
// Dynamic chapter translation loader
// We use import.meta.glob to ensure Vite can statically analyze the files to include
const chapterTranslationLoaders = import.meta.glob('./locales/*/chapters/*/chapter.json');

export const loadChapterTranslations = async (chapterId: string, language: string = i18n.language) => {
    const namespace = `chapter-${chapterId}`;

    // Check if already loaded
    if (i18n.hasResourceBundle(language, namespace)) {
        return namespace;
    }

    try {
        // Normalize language code (e.g., 'en-US' -> 'en') if the specific one isn't found
        // We try the exact match first, then the base language
        let targetLang = language;
        let path = `./locales/${targetLang}/chapters/${chapterId}/chapter.json`;

        if (!chapterTranslationLoaders[path] && language.includes('-')) {
            targetLang = language.split('-')[0];
            path = `./locales/${targetLang}/chapters/${chapterId}/chapter.json`;
        }

        const loader = chapterTranslationLoaders[path];

        if (!loader) {
            throw new Error(`Translation file not found: ${path} (tried: ${language})`);
        }

        // Dynamically import the chapter translation
        const chapterTranslation = await loader() as { default: Record<string, unknown> };

        // Add the resource bundle
        i18n.addResourceBundle(language, namespace, chapterTranslation.default, true, true);

        return namespace;
    } catch (error) {
        console.error(`Failed to load chapter translation for ${chapterId} in ${language}:`, error);
        return null;
    }
};

export default i18n;
