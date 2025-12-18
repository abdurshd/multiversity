import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures
const keyFigures: Person[] = [
    {
        id: 'kim-il-sung',
        name: 'Kim Il-sung',
        role: 'The Great Leader',
        born: 1912,
        died: 1994,
        description: 'Guerrilla leader turned dictator. Founder of North Korea.',
        image: '/images/chapters/korea-destiny/people/kim-il-sung.png'
    },
    {
        id: 'syngman-rhee',
        name: 'Syngman Rhee',
        role: 'The First President',
        born: 1875,
        died: 1965,
        description: 'Stubborn nationalist who led South Korea through its darkest hour.',
        image: '/images/chapters/korea-destiny/people/syngman-rhee.png'
    },
    {
        id: 'douglas-macarthur',
        name: 'Douglas MacArthur',
        role: 'The American Caesar',
        born: 1880,
        died: 1964,
        description: 'Supreme Commander who wanted to use nukes to win the war.',
        image: '/images/chapters/korea-destiny/people/douglas-macarthur.png'
    }
];

// 1. Unified Neutral Korea (The Swiss of Asia)
const neutralKoreaTimeline: Timeline = {
    id: 'neutral-korea',
    title: 'The Fortress of the East 🛡️🇰🇷',
    description: 'Korea unifies as a heavily armed neutral power. A "porcupine" state that no great power dares to touch.',
    divergenceDescription: 'US and Soviets agree to a unified trusteeship gov.',
    divergenceYear: 1945,
    probability: 10,
    color: '#3B82F6',
    icon: '🛡️',
    image: '/images/chapters/korea-destiny/timeline_1.png',
    keyEvents: [
        {
            id: 'unified-election',
            year: 1948,
            title: 'The Great Election',
            description: 'A coalition government is formed. Foreign troops leave.',
            impact: 'Peace.',
            relatedFigures: ['syngman-rhee', 'kim-il-sung'],
            location: { lat: 37.5665, lng: 126.9780 },
            type: 'political'
        }
    ],
    consequences: [
        {
            id: 'economic-hub',
            category: 'economic',
            shortTerm: 'Slow growth',
            longTerm: 'Hub of Asian trade',
            globalImpact: 'No Korean War'
        }
    ],
    butterfly: [
        {
            id: 'no-cold-war-hot-war',
            trigger: 'No Korean War',
            consequence: 'Cold War remains colder. China focuses on development earlier.',
            magnitude: 'large',
            timespan: 50
        }
    ],
    presentDayStatus: 'Korea is a fortress of neutrality. Every citizen is a soldier, but no war is fought. Seoul is the diplomatic capital of Asia. 🕊️🛡️'
};

// 2. Red Peninsula (Communist Victory)
const redKoreaTimeline: Timeline = {
    id: 'red-korea',
    title: 'The Juche Empire 🔴⚛️',
    description: 'A militarized, nuclear-armed fortress state that exports revolution across Asia.',
    divergenceDescription: 'US intervention fails. Pusan perimeter collapses.',
    divergenceYear: 1950,
    probability: 20,
    color: '#DC2626',
    icon: '⭐',
    image: '/images/chapters/korea-destiny/timeline_2.png',
    keyEvents: [
        {
            id: 'fall-of-pusan',
            year: 1950,
            title: 'Fall of Pusan',
            description: 'The KPA pushes the US into the sea.',
            impact: 'Unification under communism.',
            relatedFigures: ['kim-il-sung'],
            location: { lat: 35.1796, lng: 129.0756 },
            type: 'military'
        }
    ],
    consequences: [
        {
            id: 'nuclear-power',
            category: 'political',
            shortTerm: 'Purges',
            longTerm: 'A Nuclear Superpower rivaling China',
            globalImpact: 'US influence in Asia shattered'
        }
    ],
    butterfly: [
        {
            id: 'japan-remilitarized',
            trigger: 'Red neighbor',
            consequence: 'Japan becomes a nuclear power to deter Korea',
            magnitude: 'massive',
            timespan: 30
        }
    ],
    presentDayStatus: 'The Juche Empire is a dystopia of steel and fire. Its nuclear arsenal guarantees no one dares invade. 🎵🛑'
};

// 3. Blue Peninsula (Democratic Victory)
const blueKoreaTimeline: Timeline = {
    id: 'blue-korea',
    title: 'The Pacific Titan 🔵🏙️',
    description: 'A hyper-capitalist, cyberpunk economic hegemon. Culturally dominant but dystopian inequality.',
    divergenceDescription: 'China does not intervene, or is defeated.',
    divergenceYear: 1951,
    probability: 15,
    color: '#2563EB',
    icon: '🏙️',
    image: '/images/chapters/korea-destiny/timeline_3.png',
    keyEvents: [
        {
            id: 'yalu-victory',
            year: 1950,
            title: 'Christmas Home',
            description: 'UN forces secure the border. China stays out.',
            impact: 'Unification under democracy.',
            relatedFigures: ['douglas-macarthur'],
            location: { lat: 40.0, lng: 124.5 },
            type: 'military'
        }
    ],
    consequences: [
        {
            id: 'g7-power',
            category: 'economic',
            shortTerm: 'Reconstruction',
            longTerm: 'Korea becomes the world\'s 2nd largest economy',
            globalImpact: 'Strong US ally on China\'s border'
        }
    ],
    butterfly: [
        {
            id: 'liberal-china',
            trigger: 'Democratic neighbor',
            consequence: 'Pressure for reform in China accelerates',
            magnitude: 'medium',
            timespan: 40
        }
    ],
    presentDayStatus: 'Korea is a cyberpunk reality. Corporations rule everything. The standard of living is incredibly high, but so is the stress. 🌌💻'
};

const interactiveScenarios: InteractiveScenario[] = [
    {
        id: 'liberation-1945',
        title: 'The Division (1945)',
        text: 'Japan has surrendered. The US and Soviets are drawing a line at the 38th parallel. You are a Korean independence leader. What do you advocate?',
        emoji: '🗺️',
        background: 'from-gray-800 to-blue-900',
        characters: ['🇰🇷', '🇺🇸', '🇷🇺'],
        sceneType: 'decision',
        timelineYear: 1945,
        timelineEvent: 'Liberation',
        choices: [
            {
                id: 'trusteeship',
                text: 'Accept trusteeship. Work for unified elections.',
                consequence: 'Hard negotiations, but it prevents the split.',
                modifiers: [{ stat: 'diplomacy', value: 50 }],
                linkedTimelineId: 'neutral-korea'
            },
            {
                id: 'separate-gov',
                text: 'Reject trusteeship. Establish a government in the South NOW.',
                consequence: 'The division solidifies. The North does the same.',
                // Historical
                nextSceneId: 'korean-war-start'
            }
        ]
    },
    {
        id: 'korean-war-start',
        title: 'The Invasion (1950)',
        text: 'June 25, 1950. Northern tanks are crossing the border. Seoul is falling. The US is deciding whether to intervene.',
        emoji: '⚔️',
        background: 'from-red-900 to-black',
        characters: ['⚔️', '💣', '🏃'],
        sceneType: 'battle',
        timelineYear: 1950,
        choices: [
            {
                id: 'inchon',
                text: 'Organize a risky amphibious landing at Inchon.',
                consequence: 'It works! The North is cut off. We push to the North.',
                nextSceneId: 'china-intervention'
            },
            {
                id: 'retreat',
                text: 'Hold the Pusan perimeter. Wait for reinforcements.',
                consequence: 'We hold, but the counter-attack is slow.',
                modifiers: [{ stat: 'strength', value: -20 }],
                nextSceneId: 'stalemate'
            },
            {
                id: 'collapse',
                text: 'Evacuate to Japan. The position is lost.',
                consequence: 'The peninsula is lost. The Red Flag flies over Pusan.',
                linkedTimelineId: 'red-korea'
            }
        ]
    },
    {
        id: 'china-intervention',
        title: 'The Yalu River (1950)',
        text: 'We have reached the Chinese border. Intelligence says 300,000 Chinese troops are waiting. MacArthur wants to bomb the bridges.',
        emoji: '❄️',
        background: 'from-white to-gray-800',
        characters: ['❄️', '🇨🇳', '💣'],
        sceneType: 'decision',
        timelineYear: 1950,
        choices: [
            {
                id: 'halt',
                text: 'Halt the advance. Dig in at the narrow neck.',
                consequence: 'China feels safe and does not invade. We keep 90% of Korea.',
                linkedTimelineId: 'blue-korea'
            },
            {
                id: 'attack',
                text: 'Attack! "Home by Christmas!"',
                consequence: 'Disaster. The Chinese trap us. We are pushed back to the 38th parallel.',
                nextSceneId: 'axe-murder-incident'
            },
            {
                id: 'nukes',
                text: 'Authorize MacArthur\'s request for nukes.',
                consequence: 'We win the war, but at what cost? WW3 begins.',
                modifiers: [{ stat: 'chaos', value: 100 }],
                linkedTimelineId: 'red-korea'
            }
        ]
    },
    {
        id: 'axe-murder-incident',
        title: 'Operation Paul Bunyan (1976)',
        text: 'It is 1976. Two US officers were killed by North Koreans while trimming a tree in the DMZ. The US military is furious. DEFCON 3.',
        emoji: '🪓',
        background: 'from-green-900 to-black',
        characters: ['🪓', '🌳', '🇺🇸'],
        sceneType: 'decision',
        timelineYear: 1976,
        choices: [
            {
                id: 'show-force',
                text: 'Cut the tree down with massive overwhelming force. Do not shoot unless shot at.',
                consequence: 'The North backs down. Historical timeline preserved.',
                nextSceneId: 'nuclear-crisis-1994'
            },
            {
                id: 'airstrike',
                text: 'Launch an airstrike on the KPA barracks.',
                consequence: 'War erupts again. China is too weak to help the North this time.',
                modifiers: [{ stat: 'strength', value: 50 }],
                linkedTimelineId: 'blue-korea'
            },
            {
                id: 'withdraw',
                text: 'Pull back troops to avoid escalation.',
                consequence: 'The North sees this as weakness and ramps up aggression.',
                modifiers: [{ stat: 'strength', value: -30 }],
                nextSceneId: 'nuclear-crisis-1994'
            }
        ]
    },
    {
        id: 'nuclear-crisis-1994',
        title: 'The Nuclear Crisis (1994)',
        text: 'North Korea is threatening to withdraw from the NPT and process plutonium. The Pentagon has drawn up plans for a strike on Yongbyon.',
        emoji: '☢️',
        background: 'from-yellow-900 to-black',
        characters: ['☢️', '📝', '💣'],
        sceneType: 'decision',
        timelineYear: 1994,
        choices: [
            {
                id: 'carter-deal',
                text: 'Send Jimmy Carter to negotiate a freeze (Agreed Framework).',
                consequence: 'Crisis averted for now. They will likely cheat later.',
                modifiers: [{ stat: 'diplomacy', value: 40 }],
                // Historical
            },
            {
                id: 'strike',
                text: 'Execute the surgical strike on the reactor.',
                consequence: 'The reactor is destroyed, but Seoul is shelled. 2nd Korean War begins.',
                modifiers: [{ stat: 'chaos', value: 80 }],
                linkedTimelineId: 'red-korea'
            },
            {
                id: 'coup-plot',
                text: 'Fund a military coup against the leadership.',
                consequence: 'High risk. If it works, we get a neutral state.',
                modifiers: [{ stat: 'diplomacy', value: -20 }, { stat: 'chaos', value: 50 }],
                linkedTimelineId: 'neutral-korea'
            }
        ]
    }
];

// Main chapter data
export const koreaDestinyChapter: Chapter = {
    id: 'korea-destiny',
    title: 'Korean Peninsula',
    period: '1945-2025',
    startYear: 1945,
    endYear: 2025,
    description: 'The Shrimp Between Whales 🦐🐳',
    historicalContext: 'A divided nation that became a flashpoint.',
    keyFigures,
    divergencePoint: '1945 Division',
    divergenceYear: 1945,
    alternativeTimelines: [
        neutralKoreaTimeline,
        redKoreaTimeline,
        blueKoreaTimeline,
    ],
    interactiveScenarios,
    mainImage: '/images/chapters/korea-destiny/main.png',
    icon: '🇰🇷',
    backgroundColor: 'from-blue-900 to-red-900'
};
