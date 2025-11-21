import { Chapter, Timeline, Person } from '../../types';

const keyFigures: Person[] = [
    {
        id: 'emir-timur',
        name: 'Emir Timur (Tamerlane)',
        role: 'Founder of the Timurid Empire',
        born: 1336,
        died: 1405,
        description: 'The last of the great nomadic conquerors. A military genius who sought to restore the Mongol Empire. 🗡️👑',
        image: '/images/timur.jpg'
    },
    {
        id: 'shahrukh',
        name: 'Shah Rukh',
        role: 'Timur\'s Successor',
        born: 1377,
        died: 1447,
        description: 'Timur\'s youngest son who turned the empire from a war machine into a center of art and science. 🎨📚',
        image: '/images/shahrukh.jpg'
    },
    {
        id: 'ulugh-beg',
        name: 'Ulugh Beg',
        role: 'Astronomer King',
        born: 1394,
        died: 1449,
        description: 'A ruler who preferred stars to swords. Built one of the greatest observatories in history in Samarkand. 🔭✨',
        image: '/images/ulughbeg.jpg'
    }
];

const immortalEmirTimeline: Timeline = {
    id: 'immortal-emir',
    title: 'The Immortal Emir: Conquest of China 🐉⚔️',
    description: 'What if Timur survived his illness in 1405 and led his massive army into China?',
    divergenceDescription: 'Timur recovers from his illness in Otrar and launches the invasion of Ming China.',
    divergenceYear: 1405,
    probability: 20,
    color: '#DC2626',
    icon: '🐉',
    image: '/images/chapters/timur-legacy/timeline_1.png',
    keyEvents: [
        {
            id: 'survival-1405',
            year: 1405,
            title: 'The Miracle at Otrar',
            description: 'Timur recovers from his winter illness. The army marches East instead of dispersing.',
            impact: 'The campaign against China proceeds as planned.',
            relatedFigures: ['emir-timur'],
            location: { lat: 42.8333, lng: 68.3667 },
            type: 'political'
        },
        {
            id: 'fall-of-beijing-1407',
            year: 1407,
            title: 'The Fall of Beijing',
            description: 'Timurid forces, utilizing superior cavalry and gunpowder, breach the Great Wall and sack Beijing.',
            impact: 'End of the Ming Dynasty. Establishment of the Timurid Dynasty in China.',
            relatedFigures: ['emir-timur'],
            location: { lat: 39.9042, lng: 116.4074 },
            type: 'military'
        },
        {
            id: 'silk-road-monopoly-1410',
            year: 1410,
            title: 'The Silk Road Monopoly',
            description: 'With control from Anatolia to the Pacific, Timur establishes absolute control over the Silk Road.',
            impact: 'Europe is starved of trade, delaying the Renaissance. Central Asia becomes the world\'s economic hub.',
            relatedFigures: ['emir-timur'],
            location: { lat: 39.6270, lng: 66.9750 },
            type: 'economic'
        }
    ],
    consequences: [
        {
            id: 'asian-century',
            category: 'economic',
            shortTerm: 'Central Asia becomes the wealthiest region on Earth.',
            longTerm: 'Global power center remains in Asia. European colonialism never starts.',
            globalImpact: 'A completely different modern world dominated by Turko-Mongol culture.'
        }
    ],
    butterfly: [
        {
            id: 'no-ottoman-empire',
            trigger: 'Timur\'s continued dominance prevents Ottoman recovery',
            consequence: 'The Ottoman Empire remains a minor beylik or is absorbed.',
            magnitude: 'massive',
            timespan: 500
        }
    ],
    presentDayStatus: 'The Great Timurid Federation spans from Turkey to Korea. Samarkand is the world\'s capital of science and culture. Europe is a collection of backward feudal states. The primary global language is Chagatai Turkic. 🕌🌍'
};

const unifiedSuccessionTimeline: Timeline = {
    id: 'unified-succession',
    title: 'The Pax Timuridea: A Stable Empire ⚖️🏛️',
    description: 'What if Timur established a clear succession plan that prevented civil war?',
    divergenceDescription: 'Timur designates a clear heir and administrative structure before his death.',
    divergenceYear: 1405,
    probability: 30,
    color: '#2563EB',
    icon: '⚖️',
    image: '/images/chapters/timur-legacy/timeline_2.png',
    keyEvents: [
        {
            id: 'council-of-samarkand-1404',
            year: 1404,
            title: 'The Council of Samarkand',
            description: 'Timur gathers his sons and generals, establishing a formal law of succession and federal administration.',
            impact: 'Prevents the internecine wars that historically destroyed the empire.',
            relatedFigures: ['emir-timur', 'shahrukh'],
            location: { lat: 39.6270, lng: 66.9750 },
            type: 'political'
        },
        {
            id: 'timurid-renaissance-1450',
            year: 1450,
            title: 'The Timurid Renaissance',
            description: 'Stable rule allows art, astronomy, and mathematics to flourish earlier and more intensely than in Europe.',
            impact: 'Scientific revolution begins in Central Asia in the 15th century.',
            relatedFigures: ['ulugh-beg'],
            location: { lat: 39.6270, lng: 66.9750 },
            type: 'cultural'
        }
    ],
    consequences: [
        {
            id: 'scientific-islam',
            category: 'cultural',
            shortTerm: 'Islamic Golden Age continues indefinitely.',
            longTerm: 'Islam becomes associated primarily with science and progress, not conservatism.',
            globalImpact: 'Modern science has its roots in Samarkand, not Italy or England.'
        }
    ],
    butterfly: [
        {
            id: 'industrial-samarkand',
            trigger: 'Early scientific method leads to early industrialization',
            consequence: 'Industrial revolution begins in Central Asia in 1700s.',
            magnitude: 'large',
            timespan: 300
        }
    ],
    presentDayStatus: 'The Timurid Commonwealth is a constitutional monarchy and the world\'s leading superpower. It is known for its beautiful garden-cities and advanced space program (launched from the Baikonur Cosmodrome, a Timurid royal project). 🚀🌌'
};

const westernCampaignTimeline: Timeline = {
    id: 'western-campaign',
    title: 'The Scourge of Europe ⚔️🏰',
    description: 'What if Timur turned West to finish off Europe instead of China?',
    divergenceDescription: 'Timur decides the "Franks" are a greater threat than the Ming.',
    divergenceYear: 1402,
    probability: 15,
    color: '#7C3AED',
    icon: '🏰',
    image: '/images/chapters/timur-legacy/timeline_3.png',
    keyEvents: [
        {
            id: 'invasion-of-europe-1403',
            year: 1403,
            title: 'The Invasion of Europe',
            description: 'After defeating the Ottomans, Timur crosses the Bosphorus into Europe.',
            impact: 'Eastern Europe is devastated. Hungary and Austria fall.',
            relatedFigures: ['emir-timur'],
            location: { lat: 41.0082, lng: 28.9784 },
            type: 'military'
        },
        {
            id: 'sack-of-rome-1405',
            year: 1405,
            title: 'The Sack of Rome',
            description: 'Timurid forces reach Rome. The Papacy is dismantled.',
            impact: 'Collapse of Catholic authority. Europe fractures into small heresies and warlord states.',
            relatedFigures: ['emir-timur'],
            location: { lat: 41.9028, lng: 12.4964 },
            type: 'cultural'
        }
    ],
    consequences: [
        {
            id: 'dark-ages-return',
            category: 'cultural',
            shortTerm: 'European Renaissance is strangled in the cradle.',
            longTerm: 'Europe remains a technological backwater for centuries.',
            globalImpact: 'No Age of Discovery, no colonization of the Americas by Europe.'
        }
    ],
    butterfly: [
        {
            id: 'aztec-survival',
            trigger: 'No European colonization',
            consequence: 'Aztec and Inca empires survive and modernize independently.',
            magnitude: 'massive',
            timespan: 400
        }
    ],
    presentDayStatus: 'Europe is a collection of poor, agrarian vassal states of the Golden Horde. The Americas are dominated by the modernized Aztec and Inca Federations. The world is multipolar and vastly different. 🌎🏛️'
};

export const timurLegacyChapter: Chapter = {
    id: 'timur-legacy',
    title: 'The Iron Emir: Timur\'s Legacy',
    period: '14th-15th Century',
    startYear: 1370,
    endYear: 1450,
    description: 'The last great nomadic conqueror stands at the crossroads of history. 🗡️🌍 Will he turn East to China, stabilize his empire, or crush Europe? The fate of the modern world hangs on the decisions of one man in Samarkand.',
    historicalContext: 'Emir Timur (Tamerlane) was the most powerful ruler of the 14th century. He defeated the Ottomans, the Golden Horde, the Delhi Sultanate, and the Mamluks. His empire was a military juggernaut but lacked administrative stability. His death in 1405 on the way to China marked the end of the age of great nomadic conquests.',
    keyFigures,
    divergencePoint: 'Death of Timur in 1405',
    divergenceYear: 1405,
    alternativeTimelines: [
        immortalEmirTimeline,
        unifiedSuccessionTimeline,
        westernCampaignTimeline
    ],
    mainImage: '/images/chapters/timur-legacy/main.png',
    icon: '🗡️',
    backgroundColor: 'from-red-900 to-yellow-900'
};
