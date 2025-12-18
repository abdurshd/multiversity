import { Chapter, Timeline, Person } from '../../types';

const keyFigures: Person[] = [
    {
        id: 'emir-timur',
        name: 'Emir Timur (Tamerlane)',
        role: 'Founder of the Timurid Empire',
        born: 1336,
        died: 1405,
        description: 'The last of the great nomadic conquerors. A military genius who sought to restore the Mongol Empire. 🗡️👑',
        image: '/images/chapters/timur-legacy/people/emir-timur.png'
    },
    {
        id: 'shahrukh',
        name: 'Shah Rukh',
        role: 'Timur\'s Successor',
        born: 1377,
        died: 1447,
        description: 'Timur\'s youngest son who turned the empire from a war machine into a center of art and science. 🎨📚',
        image: '/images/chapters/timur-legacy/people/shahrukh.png'
    },
    {
        id: 'ulugh-beg',
        name: 'Ulugh Beg',
        role: 'Astronomer King',
        born: 1394,
        died: 1449,
        description: 'A ruler who preferred stars to swords. Built one of the greatest observatories in history in Samarkand. 🔭✨',
        image: '/images/chapters/timur-legacy/people/ulugh-beg.png'
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
    interactiveScenarios: [
        {
            id: 'ankara-strategy',
            title: 'The Battle of Ankara (1402)',
            text: 'You are Timur. The Ottoman Sultan Bayezid I stands before you with a massive army. He is arrogant but powerful. Your scouts report he has marched his troops to exhaustion to find you. How do you engage?',
            emoji: '⚔️',
            background: 'bg-red-900',
            characters: ['👑', '🐎', '⚔️'],
            sceneType: 'battle',
            timelineYear: 1402,
            timelineEvent: 'Clash of Titans',
            choices: [
                {
                    id: 'cut-water',
                    text: 'Divert the local stream and force them to fight thirsty.',
                    consequence: 'The Ottoman troops panic from thirst. Their Tatar allies defect to you. You win a crushing victory. (Historical)'
                },
                {
                    id: 'direct-charge',
                    text: 'Charge their center immediately with elephants.',
                    consequence: 'The Janissaries hold the line. The battle is a bloody stalemate. Bayezid escapes to fight another day.'
                },
                {
                    id: 'feigned-retreat',
                    text: 'Feign a retreat to draw them out of position.',
                    consequence: 'Bayezid is too experienced to fall for it. He fortifies his position. The siege of Ankara drags on for months.'
                }
            ]
        },
        {
            id: 'otrar-crisis',
            title: 'The Winter at Otrar (1405)',
            text: 'It is February 1405. The Great Emir Timur lies dying in his tent at Otrar. The Chinese border is weeks away. His physicians offer a risky new treatment. What do you advise?',
            emoji: '❄️',
            background: 'bg-red-900',
            characters: ['👑', '💊', '❄️'],
            sceneType: 'decision',
            timelineYear: 1405,
            timelineEvent: 'Death of Timur',
            choices: [
                {
                    id: 'risky-treatment',
                    text: 'Administer the experimental elixir. It might kill him, or save him.',
                    consequence: 'The elixir works! Timur recovers and leads his army into China. The "Immortal Emir" timeline begins.'
                },
                {
                    id: 'rest',
                    text: 'Let him rest and prepare for the worst. Call the scribes.',
                    consequence: 'Timur dies, but uses his last breath to dictate a clear will. The "Unified Succession" timeline begins.'
                },
                {
                    id: 'turn-back',
                    text: 'Advise the generals to turn back West. The omen is bad.',
                    consequence: 'The army abandons the China campaign and returns to ravage Europe. The "Western Campaign" timeline begins.'
                }
            ]
        },
        {
            id: 'succession-crisis',
            title: 'The Council of War (1405)',
            text: 'Timur is dead. The army is leaderless. The princes are drawing their swords. You are the Grand Vizier. Who do you support?',
            emoji: '👑',
            background: 'bg-yellow-900',
            characters: ['🤴', '📜', '🗡️'],
            sceneType: 'decision',
            timelineYear: 1405,
            timelineEvent: 'The War of Succession',
            choices: [
                {
                    id: 'pir-muhammad',
                    text: 'Support Pir Muhammad, Timur\'s designated heir.',
                    consequence: 'He is weak and distant. The empire fractures immediately. (Historical)'
                },
                {
                    id: 'shah-rukh',
                    text: 'Support Shah Rukh, the intellectual son.',
                    consequence: 'He secures Herat and begins a cultural golden age, but loses the military edge.'
                },
                {
                    id: 'khalil-sultan',
                    text: 'Support Khalil Sultan, the charismatic warrior.',
                    consequence: 'He seizes Samarkand but squanders the treasury on love and war.'
                }
            ]
        },
        {
            id: 'ulugh-beg-dilemma',
            title: 'The Astronomer\'s Choice (1449)',
            text: 'You are Ulugh Beg, the grandson of Timur. You are a brilliant scientist but a poor general. Your son Abdal-Latif is rebelling, supported by religious hardliners who hate your observatory. What do you do?',
            emoji: '🔭',
            background: 'bg-blue-900',
            characters: ['🔭', '👳', '⚔️'],
            sceneType: 'decision',
            timelineYear: 1449,
            timelineEvent: 'The Fall of the Astronomer King',
            choices: [
                {
                    id: 'surrender',
                    text: 'Surrender and ask to be allowed to go on pilgrimage to Mecca.',
                    consequence: 'Your son has you assassinated on the way. Your observatory is destroyed. (Historical)'
                },
                {
                    id: 'fight',
                    text: 'Rally your loyal troops and fight. Science must prevail over dogma!',
                    consequence: 'You win a bloody civil war. The Timurid Renaissance continues, leading to an early scientific revolution.'
                },
                {
                    id: 'flee',
                    text: 'Flee to China with your star charts and books.',
                    consequence: 'You are welcomed by the Ming Emperor. Your knowledge sparks a Chinese scientific golden age.'
                }
            ]
        }
    ],
    backgroundColor: 'from-red-900 to-red-950'
};
