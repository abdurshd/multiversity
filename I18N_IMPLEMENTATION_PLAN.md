# Multiversity - Comprehensive Internationalization Implementation Plan

## Executive Summary
This document outlines the complete implementation plan for internationalizing the Multiversity project with English and Uzbek languages. The project contains approximately 5,000-7,000 translatable strings across 12 pages, 11 components, and 14 historical chapters with complex nested content.

---

## Current Status
- ✅ Basic i18next setup complete
- ✅ Language switcher implemented
- ✅ 3 components partially translated (~5% coverage)
- ❌ Remaining 95% of content needs translation

---

## Translation File Architecture Strategy

### Problem with Current Structure
- Single flat files (`en.json`, `uz.json`)
- Will become unmaintainable with 5,000+ strings
- No logical separation of concerns
- Difficult to lazy-load specific sections

### New Modular Structure
```
src/locales/
├── en/
│   ├── common/
│   │   ├── ui.json              # Buttons, labels, states (~50 strings)
│   │   ├── navigation.json      # Nav items, breadcrumbs (~20 strings)
│   │   ├── footer.json          # Footer content (~30 strings)
│   │   └── errors.json          # Error messages (~20 strings)
│   │
│   ├── pages/
│   │   ├── landing.json         # Landing page content (~100 strings)
│   │   ├── chapters-list.json   # Chapters list page (~50 strings)
│   │   ├── chapter-detail.json  # Chapter detail UI (~30 strings)
│   │   ├── comparison.json      # Comparison mode (~40 strings)
│   │   ├── documentation.json   # Documentation page (~80 strings)
│   │   ├── faq.json            # FAQ content (~40 strings)
│   │   ├── support.json        # Support page (~30 strings)
│   │   ├── privacy.json        # Privacy policy (~200 strings)
│   │   ├── terms.json          # Terms of service (~200 strings)
│   │   ├── accessibility.json  # Accessibility page (~80 strings)
│   │   └── not-found.json      # 404 page (~10 strings)
│   │
│   └── chapters/
│       ├── timur-legacy/
│       │   ├── meta.json               # Title, description, context (~20 strings)
│       │   ├── figures.json            # Key figures (~15 strings)
│       │   ├── timeline-immortal.json  # Immortal Emir timeline (~80 strings)
│       │   ├── timeline-unified.json   # Unified Succession (~80 strings)
│       │   └── scenarios.json          # Interactive scenarios (~40 strings)
│       │
│       ├── us-independence/
│       │   ├── meta.json
│       │   ├── figures.json
│       │   ├── timeline-washington-captured.json
│       │   ├── timeline-loyalist-victory.json
│       │   ├── timeline-peaceful-transition.json
│       │   └── scenarios.json
│       │
│       [... repeat for all 14 chapters ...]
│
└── uz/ [mirror structure with Uzbek translations]
```

### File Size Guidelines
- ✅ Each file: 20-100 strings maximum
- ✅ Total files: ~100-120 small, manageable files
- ✅ Lazy loading: Load chapter translations on-demand
- ✅ Better organization: Logical separation by feature

---

## Phase 1: Translation File Architecture Restructure

### Step 1.1: Update i18n Configuration
**File:** `src/i18n.ts`

**Actions:**
1. Configure multiple namespaces for lazy loading
2. Set up namespace loading strategy
3. Add fallback namespaces
4. Configure interpolation settings

**Implementation:**
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import common namespace (always loaded)
import enCommonUI from './locales/en/common/ui.json';
import enCommonNav from './locales/en/common/navigation.json';
import enCommonFooter from './locales/en/common/footer.json';
import enCommonErrors from './locales/en/common/errors.json';

import uzCommonUI from './locales/uz/common/ui.json';
import uzCommonNav from './locales/uz/common/navigation.json';
import uzCommonFooter from './locales/uz/common/footer.json';
import uzCommonErrors from './locales/uz/common/errors.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        'common-ui': enCommonUI,
        'common-nav': enCommonNav,
        'common-footer': enCommonFooter,
        'common-errors': enCommonErrors,
      },
      uz: {
        'common-ui': uzCommonUI,
        'common-nav': uzCommonNav,
        'common-footer': uzCommonFooter,
        'common-errors': uzCommonErrors,
      },
    },
    defaultNS: 'common-ui',
    fallbackLng: 'en',
    ns: ['common-ui', 'common-nav', 'common-footer', 'common-errors'],
    interpolation: {
      escapeValue: false,
    },
  });
```

### Step 1.2: Create Translation File Structure
**Actions:**
1. Create directory structure: `locales/en/` and `locales/uz/`
2. Create subdirectories: `common/`, `pages/`, `chapters/`
3. Create chapter-specific subdirectories for all 14 chapters

### Step 1.3: Create Translation Helper Utilities
**File:** `src/utils/i18nHelpers.ts`

**Purpose:**
- Type-safe translation key constants
- Dynamic namespace loading functions
- Translation validation utilities

---

## Phase 2: Common UI Components Translation (Priority: HIGH)

### Step 2.1: Navigation Component
**File:** `src/components/common/NavigationHeader.tsx`
**Translation File:** `locales/{lang}/common/navigation.json`

**Strings to translate:**
```json
{
  "nav": {
    "home": "Home / Bosh sahifa",
    "chapters": "Chapters / Boblar",
    "compare": "Compare / Solishtirish",
    "documentation": "Documentation / Hujjatlar",
    "faq": "FAQ / Savol-javoblar",
    "support": "Support / Yordam",
    "privacy": "Privacy / Maxfiylik",
    "terms": "Terms / Shartlar",
    "accessibility": "Accessibility / Qulaylik"
  },
  "language": {
    "label": "Language / Til",
    "english": "English / Inglizcha",
    "uzbek": "Uzbek / O'zbekcha"
  }
}
```

**Implementation details:**
- Replace all hardcoded strings with `t('nav.home')` calls
- Ensure mobile menu translations work
- Update aria-labels for accessibility

### Step 2.2: Footer Component
**File:** `src/components/common/Footer.tsx`
**Translation File:** `locales/{lang}/common/footer.json`

**Strings to translate:**
```json
{
  "cta": {
    "heading": "Ready to rewrite history? / Tarixni qayta yozishga tayyormisiz?",
    "description": "Explore alternate timelines... / Muqobil tarix yo'nalishlarini o'rganing...",
    "button": "Start Exploring / O'rganishni boshlash"
  },
  "sections": {
    "multiversity": "Multiversity",
    "quickLinks": "Quick Links / Tezkor havolalar",
    "resources": "Resources / Manbalar"
  },
  "links": {
    "about": "About / Biz haqimizda",
    "methodology": "Methodology / Metodologiya",
    "team": "Team / Jamoa",
    "careers": "Careers / Martaba",
    "documentation": "Documentation / Hujjatlar",
    "api": "API",
    "tutorials": "Tutorials / Qo'llanmalar",
    "blog": "Blog"
  },
  "legal": {
    "privacy": "Privacy Policy / Maxfiylik siyosati",
    "terms": "Terms of Service / Xizmat shartlari",
    "accessibility": "Accessibility / Qulaylik",
    "copyright": "© 2024 Multiversity. All rights reserved. / Barcha huquqlar himoyalangan."
  },
  "social": {
    "follow": "Follow us / Bizni kuzating"
  }
}
```

### Step 2.3: Common UI Elements
**File:** `locales/{lang}/common/ui.json`

**Strings to translate:**
```json
{
  "buttons": {
    "start": "Start / Boshlash",
    "continue": "Continue / Davom etish",
    "back": "Back / Orqaga",
    "next": "Next / Keyingi",
    "previous": "Previous / Oldingi",
    "save": "Save / Saqlash",
    "cancel": "Cancel / Bekor qilish",
    "confirm": "Confirm / Tasdiqlash",
    "close": "Close / Yopish",
    "explore": "Explore / O'rganish",
    "compare": "Compare / Solishtirish",
    "learn_more": "Learn More / Batafsil",
    "read_more": "Read More / Ko'proq o'qish",
    "view_all": "View All / Hammasini ko'rish",
    "show_more": "Show More / Ko'proq ko'rsatish",
    "show_less": "Show Less / Kamroq ko'rsatish"
  },
  "states": {
    "loading": "Loading... / Yuklanmoqda...",
    "error": "Error / Xatolik",
    "success": "Success / Muvaffaqiyat",
    "empty": "No data available / Ma'lumot yo'q",
    "not_found": "Not Found / Topilmadi",
    "searching": "Searching... / Qidirilmoqda...",
    "processing": "Processing... / Qayta ishlanmoqda..."
  },
  "labels": {
    "search": "Search / Qidirish",
    "filter": "Filter / Filtr",
    "sort": "Sort / Tartiblash",
    "date": "Date / Sana",
    "category": "Category / Kategoriya",
    "status": "Status / Holat",
    "type": "Type / Turi"
  },
  "placeholders": {
    "search": "Search... / Qidiring...",
    "enter_text": "Enter text... / Matn kiriting...",
    "select_option": "Select an option... / Variantni tanlang..."
  },
  "validation": {
    "required": "This field is required / Bu maydon majburiy",
    "invalid_email": "Invalid email address / Noto'g'ri email manzil",
    "min_length": "Minimum {{count}} characters / Kamida {{count}} belgi",
    "max_length": "Maximum {{count}} characters / Ko'pi bilan {{count}} belgi"
  }
}
```

### Step 2.4: Error Messages
**File:** `locales/{lang}/common/errors.json`

**Strings to translate:**
```json
{
  "general": {
    "title": "Something went wrong / Nimadir noto'g'ri ketdi",
    "description": "We're sorry, an unexpected error occurred. / Kechirasiz, kutilmagan xatolik yuz berdi.",
    "reload": "Reload Page / Sahifani qayta yuklash"
  },
  "network": {
    "title": "Network Error / Tarmoq xatoligi",
    "description": "Please check your internet connection. / Iltimos, internet aloqangizni tekshiring."
  },
  "not_found": {
    "title": "Page Not Found / Sahifa topilmadi",
    "description": "The page you're looking for doesn't exist. / Siz qidirayotgan sahifa mavjud emas.",
    "go_home": "Go to Home / Bosh sahifaga o'tish"
  },
  "chapter_not_found": {
    "title": "Chapter Not Found / Bob topilmadi",
    "description": "The chapter you're looking for doesn't exist. / Siz qidirayotgan bob mavjud emas."
  },
  "timeline_not_found": {
    "title": "Timeline Not Found / Tarix chizig'i topilmadi",
    "description": "This timeline doesn't exist. / Bu tarix chizig'i mavjud emas."
  }
}
```

---

## Phase 3: Page Translations

### Step 3.1: Landing Page
**File:** `src/pages/LandingPage.tsx`
**Translation File:** `locales/{lang}/pages/landing.json`

**Structure (150+ strings):**
```json
{
  "hero": {
    "title": "Explore Alternative Histories / Muqobil tarixlarni o'rganing",
    "subtitle": "What if history took a different turn? / Agar tarix boshqacha yo'l olsa-chi?",
    "cta": {
      "primary": "Start Exploring / O'rganishni boshlash",
      "secondary": "View Chapters / Boblarni ko'rish"
    },
    "stats": {
      "divergence": {
        "value": "100+",
        "label": "Divergence Points / Tarqalish nuqtalari"
      },
      "events": {
        "value": "1000+",
        "label": "Historical Events / Tarixiy voqealar"
      },
      "coverage": {
        "value": "2000+",
        "label": "Years Covered / Yillar qamrovi"
      }
    }
  },
  "timeline_threads": {
    "heading": "Explore Divergent Timelines / Tarqoq tarix yo'nalishlarini o'rganing",
    "threads": [
      {
        "text": "Washington captured at Valley Forge / Vashington Valley Forge'da asirga olindi",
        "year": "1777"
      },
      {
        "text": "Soviet cosmonaut first on the Moon / Sovet kosmonavti Oyda birinchi",
        "year": "1969"
      },
      {
        "text": "French constitutional monarchy succeeds / Frantsuz konstitutsiyaviy monarxiyasi muvaffaqiyatga erishdi",
        "year": "1791"
      }
    ]
  },
  "what_is": {
    "heading": "What is Multiversity? / Multiversity nima?",
    "intro": "Multiversity is an interactive platform... / Multiversity - bu interaktiv platforma...",
    "description": "Through rigorous historical analysis... / Qat'iy tarixiy tahlil orqali...",
    "pillars": {
      "heading": "Our Research Pillars / Bizning tadqiqot ustunlarimiz",
      "items": [
        {
          "title": "Scholarly Rigor / Ilmiy qat'iylik",
          "description": "Every scenario is built... / Har bir stsenariy qurilgan..."
        },
        {
          "title": "Interactive Exploration / Interaktiv tadqiqot",
          "description": "Navigate through branching... / Tarmoqlanuvchi yo'nalishlarni o'rganing..."
        },
        {
          "title": "Educational Impact / Ta'limiy ta'sir",
          "description": "Understand the interconnected... / O'zaro bog'langan tushunish..."
        },
        {
          "title": "Data-Driven Insights / Ma'lumotlarga asoslangan tushunchalar",
          "description": "Visualize complex relationships... / Murakkab munosabatlarni vizuallashtiring..."
        }
      ]
    }
  },
  "chapters": {
    "heading": "Historical Chapters / Tarixiy boblar",
    "view_all": "View All Chapters / Barcha boblarni ko'rish",
    "items": [
      {
        "id": "timur-legacy",
        "title": "The Legacy of Timur / Temurning merosi",
        "period": "1370-1405",
        "description": "Explore alternate paths... / Muqobil yo'llarni o'rganing..."
      }
      // ... all 14 chapters
    ]
  },
  "exploration_modes": {
    "heading": "Choose Your Way to Explore / O'rganish usulini tanlang",
    "modes": [
      {
        "title": "Story Navigator / Hikoya navigatori",
        "description": "Immerse yourself in narrative-driven... / O'zingizni hikoyaga asoslangan...",
        "icon": "book"
      },
      {
        "title": "Data Atlas / Ma'lumotlar atlasi",
        "description": "Dive into interactive charts... / Interaktiv diagrammalarga sho'ng'ing...",
        "icon": "chart"
      },
      {
        "title": "Comparison Lab / Solishtirish laboratoriyasi",
        "description": "Place multiple timelines side-by-side... / Bir nechta tarix yo'nalishlarini yonma-yon qo'ying...",
        "icon": "compare"
      }
    ]
  },
  "features": {
    "heading": "Interactive Experience / Interaktiv tajriba",
    "items": [
      {
        "title": "Timeline Navigation / Vaqt chizig'i navigatsiyasi",
        "description": "Move through history... / Tarix bo'ylab harakat qiling..."
      },
      {
        "title": "Cause & Effect Analysis / Sabab va oqibat tahlili",
        "description": "See how small changes... / Kichik o'zgarishlar qanday..."
      },
      {
        "title": "Global Impact Visualization / Global ta'sir vizualizatsiyasi",
        "description": "Understand worldwide consequences... / Dunyo bo'ylab oqibatlarni tushunish..."
      }
    ]
  }
}
```

**Implementation Steps:**
1. Extract all hardcoded strings from LandingPage.tsx
2. Create translation keys following the structure above
3. Replace strings with `t('landing.hero.title')` calls
4. Implement namespace loading: `const { t } = useTranslation('pages-landing')`
5. Test both languages thoroughly
6. Verify responsive design with longer Uzbek text

### Step 3.2: Chapters List Page
**File:** `src/pages/ChaptersPage.tsx`
**Translation File:** `locales/{lang}/pages/chapters-list.json`

**Strings (80+ strings):**
```json
{
  "page": {
    "title": "Historical Chapters / Tarixiy boblar",
    "description": "Explore pivotal moments... / Muhim daqiqalarni o'rganing..."
  },
  "search": {
    "placeholder": "Search chapters... / Boblarni qidiring...",
    "no_results": "No chapters found / Boblar topilmadi",
    "results_count": "Showing {{count}} of {{total}} chapters / {{total}} bobdan {{count}} tasi ko'rsatilmoqda"
  },
  "filters": {
    "label": "Filter by / Filtrlash",
    "period": "Historical Period / Tarixiy davr",
    "all": "All Periods / Barcha davrlar",
    "ancient": "Ancient / Qadimgi",
    "medieval": "Medieval / O'rta asrlar",
    "early_modern": "Early Modern / Erta zamonaviy",
    "modern": "Modern / Zamonaviy",
    "contemporary": "Contemporary / Hozirgi zamon",
    "future": "Future / Kelajak",
    "clear": "Clear Filters / Filtrlarni tozalash"
  },
  "sort": {
    "label": "Sort by / Tartiblash",
    "chronological": "Chronological / Xronologik",
    "alphabetical": "Alphabetical / Alifbo bo'yicha",
    "impact": "Historical Impact / Tarixiy ta'sir"
  },
  "card": {
    "read_more": "Read More / Batafsil o'qish",
    "explore": "Explore Timelines / Vaqt chiziqlarini o'rganing",
    "key_events": "Key Events / Asosiy voqealar",
    "timelines_count": "{{count}} Alternative Timelines / {{count}} muqobil tarix yo'nalishi",
    "figures_count": "{{count}} Key Figures / {{count}} asosiy shaxslar"
  },
  "stats": {
    "total_chapters": "Total Chapters / Jami boblar",
    "total_timelines": "Total Timelines / Jami tarix chiziqlari",
    "total_events": "Total Events / Jami voqealar"
  }
}
```

### Step 3.3: Chapter Detail Page
**File:** `src/pages/ChapterDetail.tsx`
**Translation File:** `locales/{lang}/pages/chapter-detail.json`

**Strings (50+ strings):**
```json
{
  "navigation": {
    "back": "Back to Chapters / Boblarga qaytish",
    "previous_chapter": "Previous Chapter / Oldingi bob",
    "next_chapter": "Next Chapter / Keyingi bob"
  },
  "sections": {
    "overview": "Overview / Umumiy ko'rinish",
    "historical_context": "Historical Context / Tarixiy kontekst",
    "key_figures": "Key Figures / Asosiy shaxslar",
    "timelines": "Alternative Timelines / Muqobil tarix yo'nalishlari",
    "scenarios": "Interactive Scenarios / Interaktiv stsenariylar"
  },
  "timeline_card": {
    "explore": "Explore Timeline / Tarix chizig'ini o'rganing",
    "divergence": "Divergence Point / Tarqalish nuqtasi",
    "events_count": "{{count}} Key Events / {{count}} asosiy voqea",
    "impact": "Historical Impact / Tarixiy ta'sir",
    "consequences": "Consequences / Oqibatlar",
    "short_term": "Short-term / Qisqa muddatli",
    "long_term": "Long-term / Uzoq muddatli",
    "global": "Global Impact / Global ta'sir"
  },
  "figure_card": {
    "role": "Role / Rol",
    "born": "Born / Tug'ilgan",
    "died": "Died / Vafot etgan",
    "learn_more": "Learn More / Batafsil"
  },
  "scenario": {
    "start": "Start Scenario / Stsenariyni boshlash",
    "choose": "Choose Your Path / Yo'lingizni tanlang",
    "consequence": "Consequence / Oqibat",
    "reset": "Reset Scenario / Stsenariyni qayta boshlash"
  }
}
```

### Step 3.4: Comparison Mode Page
**File:** `src/pages/ComparisonMode.tsx`
**Translation File:** `locales/{lang}/pages/comparison.json`

### Step 3.5-3.11: Additional Pages
- **documentation.json** - Documentation page content
- **faq.json** - FAQ questions and answers
- **support.json** - Support page content
- **privacy.json** - Privacy policy (legal text)
- **terms.json** - Terms of service (legal text)
- **accessibility.json** - Accessibility statement
- **not-found.json** - 404 error page

---

## Phase 4: Chapter Data Translation Structure

### Step 4.1: Chapter Metadata Translation Template

**For Each Chapter (14 total):**

**File Structure Example:** `locales/{lang}/chapters/timur-legacy/`

#### File 1: `meta.json` (Chapter metadata)
```json
{
  "title": "The Legacy of Timur / Temurning merosi",
  "period": "1370-1405",
  "description": "Explore how Central Asian history... / Markaziy Osiyo tarixi qanday...",
  "historical_context": "Timur, also known as Tamerlane... / Temur, shuningdek Tamerlan nomi bilan tanilgan...",
  "divergence_point": "The succession after Timur's death... / Temur vafotidan keyingi vorislik..."
}
```

#### File 2: `figures.json` (Key historical figures)
```json
{
  "figures": [
    {
      "id": "timur",
      "name": "Timur (Tamerlane) / Temur (Tamerlan)",
      "role": "Conqueror and Empire Builder / Bosqinchi va imperiya quruvchi",
      "description": "Founder of the Timurid Empire... / Temuriylar imperiyasining asoschisi...",
      "born": "1336",
      "died": "1405"
    },
    {
      "id": "shah-rukh",
      "name": "Shah Rukh / Shohru'x",
      "role": "Fourth son of Timur / Temurning to'rtinchi o'g'li",
      "description": "Ruler who stabilized... / Barqarorlashtirgan hukmdor..."
    }
  ]
}
```

#### File 3: `timeline-immortal.json` (Timeline 1)
```json
{
  "title": "The Immortal Emir / Abadiy amir",
  "description": "What if Timur's life... / Agar Temurning hayoti...",
  "divergence_description": "In 1404, Timur miraculously recovers... / 1404 yilda Temur mo'jizaviy tarzda tuzalib ketdi...",

  "events": [
    {
      "id": "event1",
      "title": "Timur's Miraculous Recovery / Temurning mo'jizaviy tuzalishi",
      "description": "Against all odds... / Barcha kutilmaganlarga qaramay...",
      "impact": "The planned Chinese campaign proceeds / Rejalashtirilgan Xitoy kampaniyasi davom etadi",
      "type": "political"
    }
  ],

  "consequences": {
    "short_term": "The Timurid Empire remains united... / Temuriylar imperiyasi birlashgan holda qoladi...",
    "long_term": "Central Asia becomes the dominant power... / Markaziy Osiyo dominant kuchga aylanadi...",
    "global_impact": "The balance of power in Eurasia shifts... / Evraziyo kuch muvozanati o'zgaradi..."
  },

  "present_day_status": "In this timeline, a Timurid-descended state... / Ushbu tarix yo'nalishida Temuriylardan kelib chiqqan davlat...",

  "butterfly": [
    {
      "trigger": "Timur's extended reign / Temurning uzaytirilgan hukmronligi",
      "consequence": "Chinese Ming dynasty weakened / Xitoy Ming sulolasi zaiflashdi",
      "magnitude": "major"
    }
  ]
}
```

#### File 4: `timeline-unified.json` (Timeline 2)
```json
{
  // Similar structure for second timeline
}
```

#### File 5: `scenarios.json` (Interactive scenarios)
```json
{
  "scenarios": [
    {
      "id": "scenario1",
      "title": "The Succession Crisis / Vorislik inqirozi",
      "text": "You are an advisor to Shah Rukh... / Siz Shohru'xning maslahatchisisiz...",
      "choices": [
        {
          "id": "choice1",
          "text": "Advise peaceful negotiation / Tinch muzokaralarni maslahat bering",
          "consequence": "The empire stabilizes... / Imperiya barqarorlashadi..."
        },
        {
          "id": "choice2",
          "text": "Recommend military action / Harbiy harakat qilishni tavsiya eting",
          "consequence": "Civil war erupts... / Fuqarolar urushi boshlandi..."
        }
      ]
    }
  ]
}
```

### Step 4.2: Complete Chapter List (All 14)

1. **timur-legacy** (1370-1405)
   - meta.json
   - figures.json
   - timeline-immortal.json
   - timeline-unified.json
   - scenarios.json

2. **us-independence** (1775-1783)
   - meta.json
   - figures.json
   - timeline-washington-captured.json
   - timeline-loyalist-victory.json
   - timeline-peaceful-transition.json
   - scenarios.json

3. **french-revolution** (1789-1799)
   - meta.json
   - figures.json
   - timeline-constitutional-monarchy.json
   - timeline-royalist-restoration.json
   - timeline-jacobin-dominance.json
   - scenarios.json

4. **lincoln-era** (1860-1865)
   - meta.json
   - figures.json
   - timeline-peaceful-secession.json
   - timeline-early-union-victory.json
   - timeline-confederate-recognition.json
   - scenarios.json

5. **russian-empire** (1825-1917)
   - meta.json
   - figures.json
   - timeline-decembrist-success.json
   - timeline-constitutional-monarchy.json
   - timeline-tsar-survival.json
   - scenarios.json

6. **lenin-revolution** (1917-1924)
   - meta.json
   - figures.json
   - timeline-provisional-govt.json
   - timeline-white-victory.json
   - timeline-democratic-socialism.json
   - scenarios.json

7. **world-war-1** (1914-1918)
   - meta.json
   - figures.json
   - timeline-early-peace.json
   - timeline-central-victory.json
   - timeline-ottoman-survival.json
   - scenarios.json

8. **hitler-rise** (1920-1933)
   - meta.json
   - figures.json
   - timeline-art-school.json
   - timeline-weimar-stability.json
   - timeline-communist-germany.json
   - scenarios.json

9. **world-war-2** (1939-1945)
   - meta.json
   - figures.json
   - timeline-operation-sealion.json
   - timeline-axis-technology.json
   - timeline-early-us-entry.json
   - scenarios.json

10. **cold-war** (1947-1991)
    - meta.json
    - figures.json
    - timeline-nuclear-war.json
    - timeline-peaceful-coexistence.json
    - timeline-soviet-moon-landing.json
    - scenarios.json

11. **ussr-collapse** (1985-1991)
    - meta.json
    - figures.json
    - timeline-hardliner-coup.json
    - timeline-gradual-reform.json
    - timeline-early-glasnost.json
    - scenarios.json

12. **covid-pandemic** (2019-2023)
    - meta.json
    - figures.json
    - timeline-early-containment.json
    - timeline-no-lockdown.json
    - timeline-global-cooperation.json
    - scenarios.json

13. **ai-revolution** (2010-2030)
    - meta.json
    - figures.json
    - timeline-agi-breakthrough.json
    - timeline-ai-regulation.json
    - timeline-decentralized-ai.json
    - scenarios.json

14. **future-earth** (2030-2100)
    - meta.json
    - figures.json
    - timeline-climate-action.json
    - timeline-mars-colony.json
    - timeline-technological-singularity.json
    - scenarios.json

**Total Chapter Files:** 14 chapters × 5-6 files = ~75 files per language

---

## Phase 5: Implementation Timeline & Steps

### Week 1: Foundation (Phase 1-2)
**Days 1-2:**
- ✅ Restructure directory architecture
- ✅ Update i18n configuration for multiple namespaces
- ✅ Create translation helper utilities
- ✅ Implement lazy loading for chapter namespaces

**Days 3-5:**
- ✅ Translate all common UI components
- ✅ Update NavigationHeader with translations
- ✅ Update Footer with translations
- ✅ Create and implement error messages
- ✅ Test common UI translations

**Days 6-7:**
- ✅ Quality check all UI translations
- ✅ Verify Uzbek language accuracy
- ✅ Test responsive design with longer text
- ✅ Fix any layout issues

### Week 2: Pages (Phase 3)
**Days 8-9:**
- ✅ Landing page translation (complete)
- ✅ Test and verify landing page in both languages

**Days 10-11:**
- ✅ Chapters list page translation
- ✅ Chapter detail page translation
- ✅ Comparison mode page translation

**Days 12-14:**
- ✅ Documentation page translation
- ✅ FAQ page translation
- ✅ Support page translation
- ✅ Not found page translation
- ✅ Test all page translations

### Week 3-4: Chapter Content (Phase 4)
**Days 15-17:**
- ✅ Create translation structure for chapters 1-5:
  - timur-legacy
  - us-independence
  - french-revolution
  - lincoln-era
  - russian-empire

**Days 18-20:**
- ✅ Create translation structure for chapters 6-10:
  - lenin-revolution
  - world-war-1
  - hitler-rise
  - world-war-2
  - cold-war

**Days 21-23:**
- ✅ Create translation structure for chapters 11-14:
  - ussr-collapse
  - covid-pandemic
  - ai-revolution
  - future-earth

**Days 24-25:**
- ✅ Implement dynamic translation loading in chapter components
- ✅ Test chapter navigation with translations
- ✅ Verify timeline explorer translations

### Week 5: Legal & Policy Pages (Phase 3 cont.)
**Days 26-28:**
- ✅ Privacy policy translation (extensive legal text)
- ✅ Terms of service translation (extensive legal text)
- ✅ Accessibility statement translation
- ✅ Legal review of translations

### Week 6: Quality Assurance (Phase 6)
**Days 29-31:**
- ✅ Comprehensive testing of all translations
- ✅ Uzbek language accuracy verification
- ✅ Professional translator review (if available)
- ✅ User testing with native speakers
- ✅ Fix translation issues
- ✅ Verify polite/formal language usage

**Days 32-33:**
- ✅ Performance testing (lazy loading)
- ✅ SEO optimization for both languages
- ✅ Accessibility testing
- ✅ Cross-browser testing

**Days 34-35:**
- ✅ Final polish and refinements
- ✅ Documentation updates
- ✅ Create translation contribution guide
- ✅ Commit and push all changes

---

## Phase 7: Technical Implementation Details

### Lazy Loading Chapter Translations

**Implementation in ChapterDetail.tsx:**
```typescript
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const ChapterDetail = () => {
  const { t, i18n } = useTranslation();
  const { chapterId } = useParams();

  useEffect(() => {
    // Dynamically load chapter namespace
    const loadChapterTranslations = async () => {
      const lang = i18n.language;

      // Load all chapter files
      const meta = await import(`./locales/${lang}/chapters/${chapterId}/meta.json`);
      const figures = await import(`./locales/${lang}/chapters/${chapterId}/figures.json`);
      const scenarios = await import(`./locales/${lang}/chapters/${chapterId}/scenarios.json`);

      // Add to i18n
      i18n.addResourceBundle(lang, `chapter-${chapterId}-meta`, meta);
      i18n.addResourceBundle(lang, `chapter-${chapterId}-figures`, figures);
      i18n.addResourceBundle(lang, `chapter-${chapterId}-scenarios`, scenarios);
    };

    loadChapterTranslations();
  }, [chapterId, i18n]);

  return (
    <div>
      <h1>{t(`chapter-${chapterId}-meta:title`)}</h1>
      <p>{t(`chapter-${chapterId}-meta:description`)}</p>
    </div>
  );
};
```

### Translation Key Naming Conventions

**Format:** `namespace:section.subsection.key`

**Examples:**
```typescript
// Common UI
t('common-ui:buttons.save')
t('common-ui:states.loading')

// Pages
t('pages-landing:hero.title')
t('pages-chapters:search.placeholder')

// Chapters
t('chapter-timur-meta:title')
t('chapter-timur-figures:figures.0.name')
t('chapter-timur-timeline-immortal:title')
```

### Interpolation & Pluralization

**Example with variables:**
```json
{
  "results_count": "Showing {{count}} of {{total}} chapters"
}
```

**Usage:**
```typescript
t('pages-chapters:search.results_count', { count: 5, total: 14 })
```

**Pluralization:**
```json
{
  "timelines_count": {
    "one": "{{count}} timeline",
    "other": "{{count}} timelines"
  }
}
```

---

## Phase 8: Translation Quality Guidelines

### Uzbek Translation Standards

1. **Formal/Polite Language (Hurmatli til)**
   - Use formal "Siz" (you - formal) instead of "Sen" (you - informal)
   - Use respectful verb forms
   - Maintain professional tone throughout

2. **Technical Terms**
   - Keep established English terms when commonly used: "Timeline", "API", "Documentation"
   - Provide Uzbek equivalent in first use: "Timeline (Vaqt chizig'i)"
   - Create glossary for consistent terminology

3. **Historical Names**
   - Keep original names with Uzbek spelling
   - Example: "George Washington" → "Jorj Vashington"
   - Add explanatory context when needed

4. **Date Formats**
   - English: "January 1, 2024"
   - Uzbek: "2024 yil 1 yanvar"

5. **Number Formats**
   - English: "1,000"
   - Uzbek: "1 000"

6. **Cultural Considerations**
   - Adapt idioms and metaphors appropriately
   - Ensure cultural sensitivity in historical content
   - Consider religious and political sensitivities

### Translation Validation Checklist

**For Each Translation:**
- [ ] Grammatically correct
- [ ] Culturally appropriate
- [ ] Consistent terminology
- [ ] Proper punctuation
- [ ] Correct formal/informal register
- [ ] No missing or extra text
- [ ] Variables and interpolations work
- [ ] Line breaks and formatting preserved
- [ ] Links and references updated
- [ ] Testing in actual UI context

---

## Phase 9: Testing Strategy

### Unit Testing
```typescript
// Test translation keys exist
describe('Translations', () => {
  it('should have all common UI keys in both languages', () => {
    const enKeys = Object.keys(enCommonUI);
    const uzKeys = Object.keys(uzCommonUI);
    expect(enKeys).toEqual(uzKeys);
  });
});
```

### Integration Testing
- Test language switcher functionality
- Test dynamic namespace loading
- Test translation fallbacks
- Test interpolation with real data

### Manual Testing
- [ ] Navigate through entire app in English
- [ ] Navigate through entire app in Uzbek
- [ ] Test language switching on each page
- [ ] Verify all text is translated
- [ ] Check for layout issues with longer text
- [ ] Test on mobile devices
- [ ] Test with screen readers (accessibility)

### Performance Testing
- [ ] Measure initial load time
- [ ] Measure language switch time
- [ ] Verify lazy loading works
- [ ] Check bundle sizes

---

## Phase 10: Maintenance & Future Considerations

### Adding New Content
1. Create translation file first
2. Add keys to both English and Uzbek
3. Use translation keys in code
4. Test before committing

### Translation Workflow for Future
1. Developer creates feature with English translation
2. Add translation key to Uzbek file (mark as TODO if needed)
3. Professional translator reviews and updates
4. QA tests both languages
5. Merge to production

### Monitoring Translation Coverage
- Create script to check for missing keys
- Generate translation coverage reports
- Set up CI/CD validation for translation completeness

### Future Language Additions
**Potential languages:**
- Russian (Русский)
- Turkish (Türkçe)
- Arabic (العربية)
- Chinese (中文)

**Process:**
1. Copy `en/` directory structure
2. Translate all files for new language
3. Add language to i18n config
4. Add to language switcher
5. Test thoroughly

---

## Success Criteria

### Phase Completion Checklist

**Phase 1: Architecture ✅**
- [ ] Directory structure created
- [ ] i18n config updated for multiple namespaces
- [ ] Translation utilities created
- [ ] Lazy loading implemented

**Phase 2: Common UI ✅**
- [ ] Navigation translated
- [ ] Footer translated
- [ ] UI elements translated
- [ ] Error messages translated
- [ ] All components using translations

**Phase 3: Pages ✅**
- [ ] Landing page translated (100% coverage)
- [ ] All 11 pages translated (100% coverage)
- [ ] Legal pages translated
- [ ] All pages tested in both languages

**Phase 4: Chapter Content ✅**
- [ ] All 14 chapters have translation structure
- [ ] All timelines translated
- [ ] All events translated
- [ ] All scenarios translated
- [ ] Dynamic loading works

**Phase 5: Quality Assurance ✅**
- [ ] All Uzbek translations verified
- [ ] Formal/polite language confirmed
- [ ] No missing translations
- [ ] Layout works with both languages
- [ ] Performance is acceptable

**Phase 6: Documentation ✅**
- [ ] Translation guide created
- [ ] Contribution guidelines updated
- [ ] Technical documentation complete
- [ ] README updated with i18n info

---

## Estimated Metrics

**Total Translation Units:**
- Common UI: ~200 strings
- Pages: ~800 strings
- Chapters: ~4,000-5,000 strings
- **Grand Total: ~5,000-6,000 strings**

**Total Files:**
- Common: 4 files × 2 languages = 8 files
- Pages: 11 files × 2 languages = 22 files
- Chapters: 75 files × 2 languages = 150 files
- **Grand Total: ~180 translation files**

**Implementation Time:**
- Setup & Common UI: 1 week
- Pages: 1 week
- Chapter Content: 2-3 weeks
- Legal Pages: 3-4 days
- QA & Polish: 1 week
- **Total Estimated Time: 5-6 weeks**

---

## Deliverables

1. ✅ Restructured translation file architecture
2. ✅ 180+ translation files (90 per language)
3. ✅ Updated i18n configuration
4. ✅ All components using translations
5. ✅ Lazy loading implementation
6. ✅ Translation helper utilities
7. ✅ Comprehensive testing suite
8. ✅ Translation documentation
9. ✅ Contribution guidelines
10. ✅ Git commits with clear messages

---

## Risk Mitigation

### Potential Risks:
1. **Translation Quality**
   - Mitigation: Professional translator review

2. **Performance Issues**
   - Mitigation: Lazy loading, code splitting

3. **Layout Breaking**
   - Mitigation: Responsive design testing

4. **Incomplete Coverage**
   - Mitigation: Automated coverage checks

5. **Maintenance Burden**
   - Mitigation: Clear documentation, automated checks

---

## Conclusion

This comprehensive plan provides a structured approach to implementing full internationalization across the Multiversity project. The modular file structure ensures maintainability, while the phased implementation allows for iterative development and testing. The focus on translation quality, particularly for Uzbek formal language, ensures a professional and culturally appropriate experience for all users.

**Next Steps:**
1. Review and approve this plan
2. Begin Phase 1 implementation
3. Set up regular check-ins for progress updates
4. Iterate based on feedback and testing

