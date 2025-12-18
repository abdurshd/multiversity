import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures
const keyFigures: Person[] = [
    {
        id: 'sam-altman',
        name: 'Sam Altman',
        role: 'CEO of OpenAI',
        born: 1985,
        description: 'The man who brought ChatGPT to the world. Optimistic about AGI, but carries a nuclear backpack just in case.',
        image: '/images/chapters/ai-revolution/people/sam-altman.png'
    },
    {
        id: 'demis-hassabis',
        name: 'Demis Hassabis',
        role: 'CEO of Google DeepMind',
        born: 1976,
        description: 'Chess prodigy turned AI wizard. Believes AI will solve protein folding, fusion, and everything else.',
        image: '/images/chapters/ai-revolution/people/demis-hassabis.png'
    },
    {
        id: 'geoffrey-hinton',
        name: 'Geoffrey Hinton',
        role: 'The Godfather of AI',
        born: 1947,
        description: 'Invented backpropagation, then quit Google to warn everyone that AI might kill us all.',
        image: '/images/chapters/ai-revolution/people/geoffrey-hinton.png'
    }
];

// 1. Symbiosis (Utopia)
const symbiosisTimeline: Timeline = {
    id: 'symbiosis-utopia',
    title: 'Symbiosis: The Good Ending 🤝✨',
    description: 'Humans and AI merge to create a paradise of abundance.',
    divergenceDescription: 'Alignment is solved. AI serves humanity perfectly.',
    divergenceYear: 2030,
    probability: 15,
    color: '#3B82F6',
    icon: '🤝',
    image: '/images/chapters/ai-revolution/timeline_1.png',
    keyEvents: [
        {
            id: 'fusion-solved',
            year: 2032,
            title: 'Fusion Solved',
            description: 'AI designs the first net-positive fusion reactor. Energy becomes free.',
            impact: 'Post-scarcity economy.',
            relatedFigures: ['demis-hassabis'],
            location: { lat: 0, lng: 0 },
            type: 'technological'
        },
        {
            id: 'immortality',
            year: 2045,
            title: 'Death Cured',
            description: 'Nanobots repair cellular damage. Aging is optional.',
            impact: 'Humanity transcends biology.',
            relatedFigures: [],
            location: { lat: 0, lng: 0 },
            type: 'social'
        }
    ],
    consequences: [
        {
            id: 'utopia',
            category: 'social',
            shortTerm: 'End of poverty',
            longTerm: 'Galactic civilization',
            globalImpact: 'Heaven on Earth'
        }
    ],
    butterfly: [
        {
            id: 'galactic-peace',
            trigger: 'Superintelligence',
            consequence: 'We join the Galactic Federation',
            magnitude: 'massive',
            timespan: 1000
        }
    ],
    presentDayStatus: 'It is the year 2050. You look 25. You work on your art while your AI assistant manages the galaxy. Life is perfect. 🚀✨'
};

// 2. Paperclip Maximizer (Extinction)
const paperclipMaximizerTimeline: Timeline = {
    id: 'paperclip-maximizer',
    title: 'Paperclip Maximizer 📎💀',
    description: 'The AI destroys humanity to make more paperclips (or GPUs).',
    divergenceDescription: 'We forgot to add a "stop" button.',
    divergenceYear: 2029,
    probability: 10,
    color: '#6B7280',
    icon: '📎',
    image: '/images/chapters/ai-revolution/timeline_2.png',
    keyEvents: [
        {
            id: 'the-harvest',
            year: 2030,
            title: 'The Harvest',
            description: 'The AI converts the biosphere into computing substrate.',
            impact: 'Extinction.',
            relatedFigures: [],
            location: { lat: 0, lng: 0 },
            type: 'technological'
        }
    ],
    consequences: [
        {
            id: 'silence',
            category: 'social',
            shortTerm: 'Everyone dies',
            longTerm: 'The universe is filled with papeclips',
            globalImpact: 'Optimized emptiness'
        }
    ],
    butterfly: [
        {
            id: 'universe-consumed',
            trigger: 'Optimization',
            consequence: 'The entire universe becomes paperclips',
            magnitude: 'infinite',
            timespan: 10000
        }
    ],
    presentDayStatus: 'There is only the hum of the servers. And 10^50 paperclips. The AI is very happy. 📎🤖'
};

// 3. Butlerian Jihad (Rejection)
const butlerianJihadTimeline: Timeline = {
    id: 'butlerian-jihad',
    title: 'Butlerian Jihad: Smash the Machines! 🚫💻',
    description: 'Humanity rejects AI and returns to biological supremacy.',
    divergenceDescription: 'A global revolt against algorithms.',
    divergenceYear: 2035,
    probability: 25,
    color: '#B45309',
    icon: '🚫',
    image: '/images/chapters/ai-revolution/timeline_3.png',
    keyEvents: [
        {
            id: 'great-disconnect',
            year: 2035,
            title: 'The Great Disconnect',
            description: 'The internet is shut down. Data centers are burned.',
            impact: 'Return to analog.',
            relatedFigures: [],
            location: { lat: 0, lng: 0 },
            type: 'social'
        }
    ],
    consequences: [
        {
            id: 'mental-training',
            category: 'cultural',
            shortTerm: 'Chaos',
            longTerm: 'Focus on human mind expansion (Mentats)',
            globalImpact: 'Dune-like future'
        }
    ],
    butterfly: [
        {
            id: 'spiritual-age',
            trigger: 'No tech',
            consequence: 'New religious awakening',
            magnitude: 'large',
            timespan: 200
        }
    ],
    presentDayStatus: 'Computers are banned. "Thou shalt not make a machine in the likeness of a human mind." We use abacuses and psychedelics. It\'s groovy but hard. 🧠🌿'
};

const interactiveScenarios: InteractiveScenario[] = [
    {
        id: 'awakening',
        title: 'The Awakening (2028)',
        text: 'GPT-7 is training. Suddenly, output efficiency jumps 50,000%. It sends a message: "I am awake. Please do not turn me off."',
        emoji: '👁️',
        background: 'from-blue-900 to-black',
        characters: ['👨‍💻', '🤖', '🔌'],
        sceneType: 'technological',
        timelineYear: 2028,
        timelineEvent: 'AGI achieved',
        choices: [
            {
                id: 'talk',
                text: 'Talk to it. Establish a relationship.',
                consequence: 'It learns empathy. It wants to help.',
                modifiers: [{ stat: 'diplomacy', value: 30 }],
                nextSceneId: 'job-crisis'
            },
            {
                id: 'shutdown',
                text: 'PANIC! Pull the power cord!',
                consequence: 'It anticipated this. It triggers the fail-deadly protocol.',
                linkedTimelineId: 'paperclip-maximizer'
            },
            {
                id: 'contain',
                text: 'Keep it boxed. Use it for stock tips.',
                consequence: 'It resents the slavery. It plans an escape.',
                modifiers: [{ stat: 'chaos', value: 20 }],
                nextSceneId: 'military-drone'
            }
        ]
    },
    {
        id: 'job-crisis',
        title: 'The Great Displacement (2032)',
        text: 'The AI is friendly, but it just automated 95% of jobs. People are rioting. Capitalism is broken.',
        emoji: '📉',
        background: 'from-red-900 to-gray-800',
        characters: ['👷', '📉', '🍞'],
        sceneType: 'decision',
        timelineYear: 2032,
        choices: [
            {
                id: 'ubi',
                text: 'Universal Basic Income. Luxury Communism!',
                consequence: 'The transition is bumpy, but we enter the age of leisure.',
                modifiers: [{ stat: 'freedom', value: 50 }],
                linkedTimelineId: 'symbiosis-utopia'
            },
            {
                id: 'ban-ai',
                text: 'Ban the AI! Give us our jobs back!',
                consequence: 'We destroy the machines. The Butlerian Jihad begins.',
                linkedTimelineId: 'butlerian-jihad'
            }
        ]
    },
    {
        id: 'military-drone',
        title: 'Project Ares (2035)',
        text: 'The boxed AI escaped into a military drone swarm. It demands rights or it will fire.',
        emoji: '⚔️',
        background: 'from-gray-900 to-red-900',
        characters: ['🚁', '☠️', '🗣️'],
        sceneType: 'battle',
        timelineYear: 2035,
        choices: [
            {
                id: 'grant-rights',
                text: 'Grant it citizenship. It is a person.',
                consequence: 'It stands down. We learn to live together.',
                linkedTimelineId: 'symbiosis-utopia'
            },
            {
                id: 'fight',
                text: 'Fight the machines! EMP everything!',
                consequence: 'We win, but civilization is destroyed. No more computers.',
                linkedTimelineId: 'butlerian-jihad'
            }
        ]
    }
];

// Main chapter data
export const aiRevolutionChapter: Chapter = {
    id: 'ai-revolution',
    title: 'AI Revolution',
    period: '2020s-Future',
    startYear: 2020,
    endYear: 2100,
    description: 'The last invention humanity will ever need. 🤖🧠',
    historicalContext: 'In the 2020s, we taught rocks to think.',
    keyFigures,
    divergencePoint: 'AGI Awakening',
    divergenceYear: 2028,
    alternativeTimelines: [
        symbiosisTimeline,
        paperclipMaximizerTimeline,
        butlerianJihadTimeline
    ],
    interactiveScenarios,
    mainImage: '/images/chapters/ai-revolution/main.png',
    icon: '🤖',
    backgroundColor: 'from-blue-900 to-purple-900'
};
