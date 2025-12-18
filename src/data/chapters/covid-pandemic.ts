import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures
const keyFigures: Person[] = [
    {
        id: 'li-wenliang',
        name: 'Dr. Li Wenliang',
        role: 'The Whistleblower',
        born: 1986,
        died: 2020,
        description: 'Warned the world and paid the ultimate price. 🩺',
        image: '/images/chapters/covid-pandemic/people/dr-li-wenliang.png'
    },
    {
        id: 'anthony-fauci',
        name: 'Dr. Anthony Fauci',
        role: 'The Doctor',
        born: 1940,
        description: 'Trusted science over politics. 🔬',
        image: '/images/chapters/covid-pandemic/people/anthony-fauci.png'
    },
    {
        id: 'jacinda-ardern',
        name: 'Jacinda Ardern',
        role: 'The Leader',
        born: 1980,
        description: 'Proved that empathy constitutes strong leadership. 🇳🇿',
        image: '/images/chapters/covid-pandemic/people/jacinda-ardern.png'
    }
];

// 1. Total Containment (The Miracle)
const totalContainmentTimeline: Timeline = {
    id: 'total-containment',
    title: 'The Wuhan Scare 🛡️🌏',
    description: 'The virus is contained in January 2020. No global pandemic.',
    divergenceDescription: 'Early and total lockdown of Hubei province.',
    divergenceYear: 2020,
    probability: 5,
    color: '#10B981',
    icon: '🛡️',
    image: '/images/chapters/covid-pandemic/timeline_1.png',
    keyEvents: [
        {
            id: 'virus-crushed',
            year: 2020,
            title: 'Virus Eliminated',
            description: 'The WHO declares the outbreak over in March 2020.',
            impact: 'Normalcy.',
            relatedFigures: ['li-wenliang'],
            location: { lat: 30.5928, lng: 114.3055 },
            type: 'social'
        }
    ],
    consequences: [
        {
            id: 'better-prepared',
            category: 'social',
            shortTerm: 'Relief',
            longTerm: 'Better pandemic treaties',
            globalImpact: 'A close call'
        }
    ],
    butterfly: [
        {
            id: 'trump-reelection',
            trigger: 'Strong Economy',
            consequence: 'Trump wins 2020 without COVID recession',
            magnitude: 'large',
            timespan: 4
        }
    ],
    presentDayStatus: 'COVID-19 is a trivia question. "Remember that scary virus in China?" Remote work is still a niche concept. 💼🚫'
};

// 2. Black Death Variant (Collapse)
const blackDeathVariantTimeline: Timeline = {
    id: 'black-death-variant',
    title: 'The Delta Collapse ☠️🏚️',
    description: 'A lethal mutation destroys global civilization.',
    divergenceDescription: 'The Delta variant is 20% lethal.',
    divergenceYear: 2021,
    probability: 10,
    color: '#18181B',
    icon: '☠️',
    image: '/images/chapters/covid-pandemic/timeline_2.png',
    keyEvents: [
        {
            id: 'societal-breakdown',
            year: 2021,
            title: 'Great Panic',
            description: 'Supply chains fail. Cities empty.',
            impact: 'Collapse.',
            relatedFigures: [],
            location: { lat: 0, lng: 0 },
            type: 'social'
        }
    ],
    consequences: [
        {
            id: 'deurbanization',
            category: 'social',
            shortTerm: 'Flight to country',
            longTerm: 'Feudalism returns',
            globalImpact: 'Dark Age'
        }
    ],
    butterfly: [
        {
            id: 'local-internet',
            trigger: 'Fragile web',
            consequence: 'Mesh networks replace the global internet',
            magnitude: 'medium',
            timespan: 50
        }
    ],
    presentDayStatus: 'People live in isolated villages. Strangers are shot on sight. Zoom is the only government. 💻🔫'
};

// 3. Open Source Vaccine (Global Equity)
const openSourceTimeline: Timeline = {
    id: 'open-source-vaccine',
    title: 'Vaccine for All 💉🌍',
    description: 'Patents are waived. The Global South is vaccinated by mid-2021.',
    divergenceDescription: 'US/EU force IP waiver.',
    divergenceYear: 2021,
    probability: 20,
    color: '#3B82F6',
    icon: '💉',
    image: '/images/chapters/covid-pandemic/timeline_3.png',
    keyEvents: [
        {
            id: 'global-immunity',
            year: 2021,
            title: 'Herd Immunity',
            description: 'The virus runs out of hosts. Variants stop evolving.',
            impact: 'End of Pandemic.',
            relatedFigures: ['anthony-fauci'],
            location: { lat: 0, lng: 0 },
            type: 'social'
        }
    ],
    consequences: [
        {
            id: 'global-trust',
            category: 'political',
            shortTerm: 'North-South trust restored',
            longTerm: 'Stronger WHO',
            globalImpact: 'Health equity'
        }
    ],
    butterfly: [
        {
            id: 'biotech-boom',
            trigger: 'Shared mRNA tech',
            consequence: 'Malaria and HIV cured by 2025',
            magnitude: 'massive',
            timespan: 10
        }
    ],
    presentDayStatus: 'The "Helsinki Accords" guarantee medicine as a human right. The Global South is rising fast. 🌍🚀'
};

const interactiveScenarios: InteractiveScenario[] = [
    {
        id: 'wuhan-warning',
        title: 'The Whistleblower (Dec 2019)',
        text: 'Wuhan. Dr. Li Wenliang has posted a warning about "SARS-like pneumonia". The police summon you. Do you silence him?',
        emoji: '🩺',
        background: 'from-gray-900 to-red-900',
        characters: ['🩺', '👮', '🦠'],
        sceneType: 'decision',
        timelineYear: 2019,
        timelineEvent: 'Patient Zero',
        choices: [
            {
                id: 'silence',
                text: 'Silence him. Prevent panic.',
                consequence: 'The virus spreads in secret. The global pandemic becomes inevitable.',
                // Historical
                nextSceneId: 'lockdown-decision'
            },
            {
                id: 'listen',
                text: 'Listen to him. Quarantine the city NOW.',
                consequence: 'It is drastic, but effective. The virus is trapped.',
                linkedTimelineId: 'total-containment'
            }
        ]
    },
    {
        id: 'lockdown-decision',
        title: 'To Close or Not to Close (March 2020)',
        text: 'The virus is here. Scientists want a lockdown. The economy will crash. What is more important?',
        emoji: '📉',
        background: 'from-blue-900 to-black',
        characters: ['📉', '🏥', '👔'],
        sceneType: 'decision',
        timelineYear: 2020,
        choices: [
            {
                id: 'lockdown',
                text: 'Lock it down. Save lives.',
                consequence: 'The economy tanks, but hospitals survive. (Historical)',
                modifiers: [{ stat: 'diplomacy', value: 20 }, { stat: 'freedom', value: -30 }],
                nextSceneId: 'vaccine-equity'
            },
            {
                id: 'open',
                text: 'Keep it open. "It\'s just the flu."',
                consequence: 'Mass death. Healthcare collapse. You are voted out.',
                modifiers: [{ stat: 'chaos', value: 50 }],
                linkedTimelineId: 'black-death-variant' // Leads to worse variant
            }
        ]
    },
    {
        id: 'vaccine-equity',
        title: 'The Vaccine Apartheid (2021)',
        text: 'We have the vaccine. The Global South has none. Pharma wants to protect patents.',
        emoji: '💉',
        background: 'from-green-900 to-blue-900',
        characters: ['💉', '💰', '🌍'],
        sceneType: 'decision',
        timelineYear: 2021,
        choices: [
            {
                id: 'protect-patents',
                text: 'Protect the patents. Incentivize innovation.',
                consequence: 'Poor countries wait. Omicron emerges from the unvaccinated.',
                // Historical
            },
            {
                id: 'waive-patents',
                text: 'Waive the patents. Share the recipe.',
                consequence: 'Factories open worldwide. The virus is cornered.',
                linkedTimelineId: 'open-source-vaccine'
            }
        ]
    }
];

// Main chapter data
export const covidPandemicChapter: Chapter = {
    id: 'covid-pandemic',
    title: 'The Pandemic',
    period: '2019-2023',
    startYear: 2019,
    endYear: 2025,
    description: 'The years we stayed home. 😷🏠',
    historicalContext: 'A microscopic enemy.',
    keyFigures,
    divergencePoint: 'Wuhan Response',
    divergenceYear: 2019,
    alternativeTimelines: [
        totalContainmentTimeline,
        blackDeathVariantTimeline,
        openSourceTimeline,
    ],
    interactiveScenarios,
    mainImage: '/images/chapters/covid-pandemic/main.png',
    icon: '🦠',
    backgroundColor: 'from-green-900 to-gray-900'
};
