import { Chapter, Timeline, Person } from '../../types';

const keyFigures: Person[] = [
    {
        id: 'dr-li-wenliang',
        name: 'Dr. Li Wenliang',
        role: 'The Whistleblower',
        born: 1986,
        died: 2020,
        description: 'The ophthalmologist who tried to warn the world about the new virus. 🩺⚠️ His warning was silenced, but his legacy lives on.',
        image: '/images/li-wenliang.jpg'
    },
    {
        id: 'anthony-fauci',
        name: 'Dr. Anthony Fauci',
        role: 'Public Health Leader',
        born: 1940,
        description: 'The face of the US pandemic response. 👨‍⚕️🇺🇸 Navigated the treacherous waters between science and politics.',
        image: '/images/fauci.jpg'
    },
    {
        id: 'tedros-adhanom',
        name: 'Tedros Adhanom',
        role: 'WHO Director-General',
        born: 1965,
        description: 'Leader of the World Health Organization during its greatest crisis. 🌍🇺🇳 Faced criticism and praise for global coordination efforts.',
        image: '/images/tedros.jpg'
    }
];

const totalContainmentTimeline: Timeline = {
    id: 'total-containment',
    title: 'Total Containment: The Bullet Dodged 🛡️🌏',
    description: 'What if the world reacted immediately and effectively in January 2020?',
    divergenceDescription: 'Global travel bans and strict lockdowns are implemented in early January 2020.',
    divergenceYear: 2020,
    probability: 5,
    color: '#10B981',
    icon: '🛡️',
    keyEvents: [
        {
            id: 'global-lockdown-jan-2020',
            year: 2020,
            month: 1,
            title: 'The Great Seal',
            description: 'Nations coordinate to close all borders and ground flights immediately after the first sequence is released.',
            impact: 'Virus is contained to Wuhan and a few isolated clusters.',
            relatedFigures: ['tedros-adhanom'],
            location: { lat: 30.5928, lng: 114.3055 },
            type: 'political'
        },
        {
            id: 'virus-eliminated-2020',
            year: 2020,
            month: 6,
            title: 'Declaration of Victory',
            description: 'WHO declares SARS-CoV-2 eliminated from the human population.',
            impact: 'Life returns to normal. No global recession.',
            relatedFigures: ['tedros-adhanom'],
            location: { lat: 46.2044, lng: 6.1432 },
            type: 'social'
        }
    ],
    consequences: [
        {
            id: 'surveillance-state',
            category: 'political',
            shortTerm: 'Pandemic averted, but privacy rights eroded.',
            longTerm: 'Global bio-surveillance network becomes permanent.',
            globalImpact: 'A safer but less free world where health data is constantly monitored.'
        }
    ],
    butterfly: [
        {
            id: 'no-remote-work-revolution',
            trigger: 'No lockdowns means no forced remote work experiment',
            consequence: 'Office culture remains dominant. Digital nomad lifestyle remains niche.',
            magnitude: 'medium',
            timespan: 10
        }
    ],
    presentDayStatus: 'COVID-19 is a footnote in medical textbooks, known as the "Wuhan Scare." However, everyone now wears smart-watches that report their temperature to the government daily. "For your safety," they say. ⌚👀'
};

const blackDeathVariantTimeline: Timeline = {
    id: 'black-death-variant',
    title: 'The Black Death Variant: Societal Collapse ☠️🏚️',
    description: 'What if the virus mutated to be significantly more lethal?',
    divergenceDescription: 'A mutation in late 2020 increases the mortality rate to 15%.',
    divergenceYear: 2020,
    probability: 10,
    color: '#18181B',
    icon: '☠️',
    keyEvents: [
        {
            id: 'omega-variant-2020',
            year: 2020,
            month: 11,
            title: 'The Omega Variant',
            description: 'A highly lethal variant emerges. Hospitals collapse globally within weeks.',
            impact: 'Mass panic. Supply chains break down. Cities are abandoned.',
            relatedFigures: ['anthony-fauci'],
            location: { lat: 40.7128, lng: -74.0060 },
            type: 'social'
        },
        {
            id: 'great-deurbanization-2021',
            year: 2021,
            title: 'The Great De-urbanization',
            description: 'People flee cities to rural areas to escape infection. Modern civilization fractures.',
            impact: 'End of the globalized economy. Return to local subsistence farming.',
            relatedFigures: [],
            location: { lat: 0, lng: 0 },
            type: 'economic'
        }
    ],
    consequences: [
        {
            id: 'digital-dark-age',
            category: 'social',
            shortTerm: 'Billions die. Global infrastructure fails.',
            longTerm: 'Humanity survives in isolated, high-tech enclaves connected only by the internet.',
            globalImpact: 'A neo-feudal world of "Clean Zones" and "Wildlands".'
        }
    ],
    butterfly: [
        {
            id: 'vr-society',
            trigger: 'Physical contact becomes deadly',
            consequence: 'Society moves entirely into Virtual Reality. The Metaverse becomes the real world.',
            magnitude: 'massive',
            timespan: 50
        }
    ],
    presentDayStatus: 'The cities are overgrown ruins. The survivors live in hermetically sealed bunkers, interacting only through high-fidelity VR avatars. A handshake is considered a murder attempt. 🥽🏙️'
};

const permanentPandemicTimeline: Timeline = {
    id: 'permanent-pandemic',
    title: 'The Forever Plague: A Divided World 😷🌐',
    description: 'What if immunity was fleeting and vaccines failed to stop transmission?',
    divergenceDescription: 'New variants constantly evade immunity. The pandemic never officially ends.',
    divergenceYear: 2021,
    probability: 40,
    color: '#F59E0B',
    icon: '😷',
    keyEvents: [
        {
            id: 'vaccine-failure-2021',
            year: 2021,
            title: 'The Evasion Crisis',
            description: 'It becomes clear that vaccines prevent death but not infection, and immunity lasts only months.',
            impact: 'Hope for "Herd Immunity" vanishes. Permanent mitigation becomes the strategy.',
            relatedFigures: ['anthony-fauci'],
            location: { lat: 38.8977, lng: -77.0365 },
            type: 'social'
        },
        {
            id: 'bio-passports-2022',
            year: 2022,
            title: 'The Bio-Passport Act',
            description: 'International travel is restricted to those with valid "Green Status" (boosted within 3 months).',
            impact: 'Creation of a two-tier society: The Boosted and The Restricted.',
            relatedFigures: [],
            location: { lat: 46.2044, lng: 6.1432 },
            type: 'political'
        }
    ],
    consequences: [
        {
            id: 'sanitary-authoritarianism',
            category: 'political',
            shortTerm: 'Permanent state of emergency.',
            longTerm: 'Health status determines all civil rights.',
            globalImpact: 'Democracy is replaced by Technocratic Biosecurity States.'
        }
    ],
    butterfly: [
        {
            id: 'medical-acceleration',
            trigger: 'Constant viral threat',
            consequence: 'Massive investment in biotech leads to cures for cancer and aging, but only for the rich.',
            magnitude: 'large',
            timespan: 20
        }
    ],
    presentDayStatus: 'You need a QR code to enter a grocery store. Masks are a fashion statement and a legal requirement. The world is divided into "Green Zones" (wealthy, tested daily) and "Red Zones" (poor, endemic infection). But hey, mRNA technology cured cancer! 🧬🎫'
};

export const covidPandemicChapter: Chapter = {
    id: 'covid-pandemic',
    title: 'The COVID-19 Pandemic',
    period: '2019-2023',
    startYear: 2019,
    endYear: 2025,
    description: 'The invisible enemy that stopped the world. 🦠🛑 From wet markets to lockdowns, this chapter explores how a microscopic virus reshaped global society, economy, and politics forever.',
    historicalContext: 'In late 2019, a novel coronavirus emerged in Wuhan, China. Within months, it spread globally, causing the greatest public health crisis in a century. Governments responded with unprecedented lockdowns, masking mandates, and rapid vaccine development. The pandemic accelerated digital transformation but also exposed deep social inequalities.',
    keyFigures,
    divergencePoint: 'Emergence of SARS-CoV-2',
    divergenceYear: 2019,
    alternativeTimelines: [
        totalContainmentTimeline,
        blackDeathVariantTimeline,
        permanentPandemicTimeline
    ],
    mainImage: '/images/covid-main.jpg',
    icon: '🦠',
    backgroundColor: 'from-green-900 to-gray-900'
};
