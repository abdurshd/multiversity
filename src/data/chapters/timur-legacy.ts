import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

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

const interactiveScenarios: InteractiveScenario[] = [
    {
        id: 'ankara-strategy',
        title: 'The Battle of Ankara (1402)',
        text: 'The Ottoman Sultan Bayezid I stands before you. His army is exhausted from a forced march, but his Janissaries are fresh. Your scouts report a stream that supplies their camp. What is your command?',
        emoji: '⚔️',
        background: 'from-amber-800 to-amber-950',
        characters: ['👑', '🐎', '⚔️'],
        sceneType: 'battle',
        timelineYear: 1402,
        timelineEvent: 'Clash of Titans',
        choices: [
            {
                id: 'cut-water',
                text: 'Divert the stream. Force them to fight thirsty.',
                consequence: 'The Ottomans panic. Their Tatar allies defect. You win a crushing victory.',
                modifiers: [{ stat: 'strength', value: 20 }, { stat: 'chaos', value: 10 }],
                nextSceneId: 'otrar-crisis'
            },
            {
                id: 'direct-charge',
                text: 'Charge the Janissaries directly with war elephants.',
                consequence: 'The elephants cause chaos, but the Janissaries hold. The battle turns into a bloodbath.',
                modifiers: [{ stat: 'strength', value: 10 }, { stat: 'chaos', value: 30 }],
                nextSceneId: 'pyrrhic-victory'
            },
            {
                id: 'feigned-retreat',
                text: 'Feign a retreat to draw them out.',
                consequence: 'Bayezid is wary but his commanders are rash. They break formation, but your ambush is late.',
                modifiers: [{ stat: 'diplomacy', value: 10 }, { stat: 'strength', value: -10 }],
                nextSceneId: 'defense-of-samarkand'
            }
        ]
    },
    {
        id: 'pyrrhic-victory',
        title: 'A Costly Triumph (1402)',
        text: 'You have won, but at a terrible cost. Thousands of your best cavalry are dead. Bayezid escaped. The road to the West is open, but your army is bleeding.',
        emoji: '🩸',
        background: 'from-red-900 to-slate-900',
        characters: ['💀', '🩹', '👑'],
        sceneType: 'decision',
        choices: [
            {
                id: 'consolidate',
                text: 'Halt the campaign. Return to Samarkand to rebuild.',
                consequence: 'You secure your empire but lose momentum. Europe is spared.',
                modifiers: [{ stat: 'diplomacy', value: 20 }, { stat: 'strength', value: -20 }],
                nextSceneId: 'otrar-crisis'
            },
            {
                id: 'raid-pillage',
                text: 'Raid Anatolia for loot to pay mercenaries.',
                consequence: 'You burn cities to the ground. Your treasury fills, but your legacy is one of terror.',
                modifiers: [{ stat: 'chaos', value: 40 }, { stat: 'strength', value: 10 }],
                nextSceneId: 'otrar-crisis'
            }
        ]
    },
    {
        id: 'defense-of-samarkand',
        title: 'Retreat to the Oxus (1403)',
        text: 'The Ankara campaign failed. Bayezid is countering. You have retreated to your capital, Samarkand. The enemy is approaching the Oxus river.',
        emoji: '🏰',
        background: 'from-slate-800 to-slate-950',
        characters: ['🏰', '🛡️', '🔥'],
        sceneType: 'battle',
        choices: [
            {
                id: 'scorched-earth',
                text: 'Burn the fields. Leave them nothing but ash.',
                consequence: 'The Ottoman army starves in the desert. You survive, but your lands are ruined.',
                modifiers: [{ stat: 'chaos', value: 50 }, { stat: 'diplomacy', value: -30 }],
                nextSceneId: 'otrar-crisis' // Eventually leads back to deathbed
            },
            {
                id: 'diplomatic-peace',
                text: 'Sue for peace. Offer tribute to Bayezid.',
                consequence: 'History laughs at the "Great" Timur who paid tribute. Your empire crumbles from within.',
                modifiers: [{ stat: 'strength', value: -50 }, { stat: 'diplomacy', value: 10 }],
                nextSceneId: 'succession-crisis' // Skip Otrar, go straight to civil war
            }
        ]
    },
    {
        id: 'otrar-crisis',
        title: 'The Winter at Otrar (1405)',
        text: 'It is February 1405. You lie dying in your tent. The Chinese border is weeks away. The campaign of a lifetime hangs in the balance.',
        emoji: '❄️',
        background: 'from-blue-900 to-slate-900',
        characters: ['👑', '💊', '❄️'],
        sceneType: 'decision',
        timelineYear: 1405,
        timelineEvent: 'Death of Timur',
        choices: [
            {
                id: 'elixir',
                text: 'Take the alchemist\'s experimental mercury elixir.',
                consequence: 'Fire courses through your veins. You awake, stronger than ever. The invasion proceeds!',
                modifiers: [{ stat: 'chaos', value: 20 }, { stat: 'strength', value: 30 }],
                nextSceneId: 'great-wall'
            },
            {
                id: 'write-will',
                text: 'Accept fate. Dictate a clear law of succession.',
                consequence: 'You name an heir and a council. You die peacefully, leaving a stable roadmap.',
                modifiers: [{ stat: 'diplomacy', value: 50 }, { stat: 'chaos', value: -20 }],
                nextSceneId: 'succession-crisis'
            },
            {
                id: 'turn-west',
                text: 'Order the army to turn back West. "China is too far."',
                consequence: 'The generals are confused but obedient. The army marches back towards Europe.',
                modifiers: [{ stat: 'chaos', value: 30 }],
                nextSceneId: 'bosphorus-crossing'
            }
        ]
    },
    {
        id: 'great-wall',
        title: 'Breaching the Great Wall (1406)',
        text: 'The Ming defenses are formidable. The Great Wall stands before you. Your artillery is positioned. How do you breach?',
        emoji: '🧱',
        background: 'from-red-800 to-stone-900',
        characters: ['🧱', '💣', '🐎'],
        sceneType: 'battle',
        choices: [
            {
                id: 'concentrated-fire',
                text: 'Concentrate all gunpowder artillery on one gate.',
                consequence: 'The gate shatters. The Timurid heavy cavalry pours through. The road to Beijing is open.',
                modifiers: [{ stat: 'strength', value: 30 }],
                linkedTimelineId: 'immortal-emir'
            },
            {
                id: 'bribe-general',
                text: 'Send gold to the Ming border commander.',
                consequence: 'The gates open at night. You take the fort without a fight.',
                modifiers: [{ stat: 'diplomacy', value: 30 }, { stat: 'chaos', value: 10 }],
                linkedTimelineId: 'immortal-emir'
            }
        ]
    },
    {
        id: 'bosphorus-crossing',
        title: 'Crossing the Bosphorus (1406)',
        text: 'You have returned to Anatolia. Europe lies across the water. The Venetians offer ships... for a price.',
        emoji: '🌊',
        background: 'from-blue-800 to-slate-900',
        characters: ['🚢', '💰', '🏰'],
        sceneType: 'negotiation',
        choices: [
            {
                id: 'pay-venice',
                text: 'Pay the Venetians to ferry your army.',
                consequence: 'You land in Thrace. Europe trembles.',
                modifiers: [{ stat: 'diplomacy', value: 10 }],
                linkedTimelineId: 'western-campaign'
            },
            {
                id: 'build-ships',
                text: 'Force the locals to build a bridge of boats.',
                consequence: 'It takes months, but you cross on your own terms. The shock is absolute.',
                modifiers: [{ stat: 'strength', value: 20 }],
                linkedTimelineId: 'western-campaign'
            }
        ]
    },
    {
        id: 'succession-crisis',
        title: 'The Council of Princes (1405)',
        text: 'Timur is dead. The will is read, but ambition runs deep. Pir Muhammad is the heir, but he is far away.',
        emoji: '📜',
        background: 'from-purple-900 to-slate-900',
        characters: ['👑', '⚖️', '🗡️'],
        sceneType: 'decision',
        choices: [
            {
                id: 'enforce-will',
                text: 'Back Pir Muhammad with the elite guard.',
                consequence: 'The other princes back down... for now. A fragile peace holds.',
                modifiers: [{ stat: 'diplomacy', value: 30 }],
                nextSceneId: 'ulugh-beg-dilemma'
            },
            {
                id: 'seize-power',
                text: 'Take power yourself as Regent.',
                consequence: 'Civil war erupts immediately. The empire burns.',
                modifiers: [{ stat: 'chaos', value: 50 }],
                nextSceneId: 'ulugh-beg-dilemma' // Or game over
            }
        ]
    },
    {
        id: 'ulugh-beg-dilemma',
        title: 'The Scholar on the Throne (1449)',
        text: 'Decades later. Ulugh Beg rules in Samarkand. His son is rebelling, claiming the King cares more for stars than god.',
        emoji: '🔭',
        background: 'from-indigo-900 to-slate-900',
        characters: ['🔭', '⚔️', '🌙'],
        sceneType: 'decision',
        timelineYear: 1449,
        choices: [
            {
                id: 'fight-hard',
                text: 'Crush the rebellion with mercenaries.',
                consequence: 'You win, but the treasury is empty. The Renaissance continues.',
                modifiers: [{ stat: 'freedom', value: 30 }, { stat: 'strength', value: 10 }],
                linkedTimelineId: 'unified-succession'
            },
            {
                id: 'abdicate',
                text: 'Abdicate to avoid bloodshed.',
                consequence: 'You are executed. The observatory is destroyed.',
                modifiers: [{ stat: 'chaos', value: 20 }, { stat: 'strength', value: -20 }],
                // No linked timeline, goes to standard result
            }
        ]
    }
];

export const timurLegacyChapter: Chapter = {
    id: 'timur-legacy',
    title: 'The Iron Emir: Timur\'s Legacy',
    period: '14th-15th Century',
    startYear: 1370,
    endYear: 1450,
    description: 'The last great nomadic conqueror stands at the crossroads of history. 🗡️🌍 Will he turn East to China, stabilize his empire, or crush Europe?',
    historicalContext: 'Emir Timur (Tamerlane) was the most powerful ruler of the 14th century. His empire was a military juggernaut but lacked administrative stability.',
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
    backgroundColor: 'from-red-900 to-red-950',
    interactiveScenarios
};
