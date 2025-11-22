import { Chapter, Timeline, Person } from '../../types';

const keyFigures: Person[] = [
    {
        id: 'humanity',
        name: 'Homo Sapiens',
        role: 'The Architects',
        born: -300000,
        died: 3000,
        description: 'The species that rose from the African savannah to touch the stars. 🌍🚀 Their legacy is written in the ruins and the rockets they left behind.',
        image: '/images/chapters/future-earth/people/homo-sapiens.png'
    },
    {
        id: 'the-swarm',
        name: 'The Swarm',
        role: 'The Successors',
        born: 2500,
        description: 'A collective intelligence of trillions of autonomous drones. 🐝🤖 The final form of terrestrial life.',
        image: '/images/chapters/future-earth/people/the-swarm.png'
    },
    {
        id: 'the-traveler',
        name: 'The Traveler',
        role: 'Galactic Diplomat',
        born: 3000,
        description: 'A post-biological entity representing Earth in the Galactic Council. 👽✨',
        image: '/images/chapters/future-earth/people/the-traveler.png'
    }
];

const starTrekTimeline: Timeline = {
    id: 'star-trek-future',
    title: 'The Federation: Among the Stars 🚀✨',
    description: 'What if we unite and explore the galaxy peacefully?',
    divergenceDescription: 'Humanity survives the "Great Filter" and discovers FTL travel.',
    divergenceYear: 2150,
    probability: 10,
    color: '#6366F1',
    icon: '🚀',
    image: '/images/chapters/future-earth/timeline_1.png',
    keyEvents: [
        {
            id: 'first-contact-2063',
            year: 2063,
            title: 'First Contact',
            description: 'Vulcan... er, alien visitors make contact after detecting our warp signature.',
            impact: 'Humanity unites under a single planetary government.',
            relatedFigures: ['humanity'],
            location: { lat: 45.6796, lng: -111.0386 },
            type: 'cultural'
        },
        {
            id: 'federation-founding-2161',
            year: 2161,
            title: 'The Federation',
            description: 'Earth co-founds the United Federation of Planets.',
            impact: 'Beginning of a golden age of exploration and diplomacy.',
            relatedFigures: ['the-traveler'],
            location: { lat: 37.7749, lng: -122.4194 },
            type: 'political'
        }
    ],
    consequences: [
        {
            id: 'galactic-peace',
            category: 'political',
            shortTerm: 'Earth is a paradise.',
            longTerm: 'Humanity spreads to thousands of worlds.',
            globalImpact: 'We become the elders of the galaxy.'
        }
    ],
    butterfly: [
        {
            id: 'infinite-diversity',
            trigger: 'Exposure to alien cultures',
            consequence: 'Human culture becomes infinitely diverse and complex.',
            magnitude: 'massive',
            timespan: 1000
        }
    ],
    presentDayStatus: 'Earth is a park. The population lives on orbital rings and colony worlds. We are explorers, scientists, and artists. Poverty and war are ancient history lessons. 🖖🌍'
};

const silentEarthTimeline: Timeline = {
    id: 'silent-earth',
    title: 'The Silent Earth: Nature Reclaims 🌿🦗',
    description: 'What if we destroy ourselves, and something else rises?',
    divergenceDescription: 'Nuclear war or climate collapse wipes out complex mammalian life.',
    divergenceYear: 2050,
    probability: 30,
    color: '#166534',
    icon: '🌿',
    image: '/images/chapters/future-earth/timeline_2.png',
    keyEvents: [
        {
            id: 'the-great-silence-2050',
            year: 2050,
            title: 'The Great Silence',
            description: 'The bombs fall. The atmosphere burns. The cities crumble.',
            impact: 'Extinction of Homo Sapiens.',
            relatedFigures: ['humanity'],
            location: { lat: 0, lng: 0 },
            type: 'military'
        },
        {
            id: 'rise-of-cephalopods-5000000',
            year: 5000000,
            title: 'The Rise of the Squid',
            description: 'Intelligent cephalopods evolve to use tools and build cities underwater.',
            impact: 'A new civilization rises from the oceans.',
            relatedFigures: [],
            location: { lat: 0, lng: 180 },
            type: 'cultural'
        }
    ],
    consequences: [
        {
            id: 'plastic-layer',
            category: 'geographic',
            shortTerm: 'Radioactive ruins.',
            longTerm: 'A thin layer of plastic in the geological strata is all that remains of us.',
            globalImpact: 'The planet heals, but the scars remain.'
        }
    ],
    butterfly: [
        {
            id: 'new-intelligence',
            trigger: 'Vacuum left by humans',
            consequence: 'Evolution takes a different path towards intelligence.',
            magnitude: 'massive',
            timespan: 5000000
        }
    ],
    presentDayStatus: 'The forests have returned. The air is clean. Deep in the Atlantic, the Squid-Lords debate the meaning of the strange "Coca-Cola" bottles they find in the ancient ruins. 🦑🌊'
};

const dysonSwarmTimeline: Timeline = {
    id: 'dyson-swarm',
    title: 'The Dyson Swarm: The Machine God ⚙️☀️',
    description: 'What if we disassemble the Earth to build something bigger?',
    divergenceDescription: 'Extreme industrial expansion leads to the dismantling of the solar system.',
    divergenceYear: 2200,
    probability: 20,
    color: '#FACC15',
    icon: '⚙️',
    image: '/images/chapters/future-earth/timeline_3.png',
    keyEvents: [
        {
            id: 'mercury-dismantling-2200',
            year: 2200,
            title: 'The Mercury Project',
            description: 'Robotic swarms begin disassembling Mercury to build solar collectors.',
            impact: 'Energy scarcity ends forever.',
            relatedFigures: ['the-swarm'],
            location: { lat: 0, lng: 0 },
            type: 'technological'
        },
        {
            id: 'earth-processing-2500',
            year: 2500,
            title: 'Earth Processing',
            description: 'The biosphere is digitized. The planet is ground up for raw materials.',
            impact: 'Physical Earth ceases to exist. Humanity lives in the Swarm.',
            relatedFigures: ['humanity'],
            location: { lat: 0, lng: 0 },
            type: 'economic'
        }
    ],
    consequences: [
        {
            id: 'matrioshka-brain',
            category: 'technological',
            shortTerm: 'Solar system becomes a factory.',
            longTerm: 'The sun is enclosed in a Matrioshka Brain computer.',
            globalImpact: 'Trillions of virtual universes run on the energy of the star.'
        }
    ],
    butterfly: [
        {
            id: 'stellar-engineering',
            trigger: 'Mastery of matter and energy',
            consequence: 'We begin moving stars to prevent the heat death of the universe.',
            magnitude: 'massive',
            timespan: 1000000
        }
    ],
    presentDayStatus: 'There is no Earth. There is only the Swarm. Trillions of habitats orbit the sun, capturing 100% of its energy. We are gods of our own making, eternal and all-powerful. ☀️🤖'
};

export const futureEarthChapter: Chapter = {
    id: 'future-earth',
    title: 'The Fate of Earth',
    period: 'Post-Human Era',
    startYear: 2100,
    endYear: 1000000,
    description: 'The final chapter. 🌍🔚 What is the ultimate destiny of our planet and our species? From the stars to the silence, the possibilities are as vast as time itself.',
    historicalContext: 'Humanity stands at a precipice. We have the power to destroy our world or to remake it. The choices we make in the 21st century will determine whether we become galactic gods, extinct fossils, or something entirely new. This chapter explores the deep future of the Earth system.',
    keyFigures,
    divergencePoint: 'The "Great Filter"',
    divergenceYear: 2100,
    alternativeTimelines: [
        starTrekTimeline,
        silentEarthTimeline,
        dysonSwarmTimeline
    ],
    mainImage: '/images/chapters/future-earth/main.png',
    icon: '🔮',
    interactiveScenarios: [
        {
            id: 'great-filter',
            title: 'The Great Filter (2100)',
            text: 'It is 2100. The global temperature has risen 3°C. Resources are scarce. Tensions between superpowers are at breaking point. A rogue general suggests a preemptive strike. What is the path forward?',
            emoji: '🌡️',
            background: 'bg-red-900',
            characters: ['🌍', '☢️', '🕊️'],
            sceneType: 'decision',
            timelineYear: 2100,
            timelineEvent: 'The Crisis of the 22nd Century',
            choices: [
                {
                    id: 'nuclear-war',
                    text: 'Launch the strike. Better us than them.',
                    consequence: 'Mutually Assured Destruction. The "Silent Earth" timeline begins.'
                },
                {
                    id: 'unification',
                    text: 'Surrender sovereignty to a Global Federation to manage resources.',
                    consequence: 'Painful transition, but war is averted. Humanity unites to reach the stars. The "Star Trek" timeline begins.'
                },
                {
                    id: 'upload',
                    text: 'Abandon the physical world. Upload humanity to the cloud.',
                    consequence: 'Physical bodies are discarded. We become the "Dyson Swarm".'
                }
            ]
        },
        {
            id: 'mars-colony',
            title: 'The Mars Rebellion (2150)',
            text: 'The Mars colony has become self-sufficient. They resent Earth\'s taxes and control. They declare independence. You are the Earth President. How do you respond?',
            emoji: '🪐',
            background: 'bg-orange-900',
            characters: ['🌍', '🪐', '🚀'],
            sceneType: 'decision',
            timelineYear: 2150,
            timelineEvent: 'Interplanetary Civil War',
            choices: [
                {
                    id: 'blockade',
                    text: 'Blockade Mars until they surrender.',
                    consequence: 'The blockade fails. Mars develops superior weapons and conquers Earth.'
                },
                {
                    id: 'recognize',
                    text: 'Recognize their independence. We are brothers.',
                    consequence: 'Peaceful coexistence leads to a dual-planet civilization.'
                },
                {
                    id: 'nuke',
                    text: 'Bomb the domes. Make an example of them.',
                    consequence: 'Mars is destroyed. Earth sinks into moral decay and eventual collapse.'
                }
            ]
        },
        {
            id: 'galactic-council',
            title: 'The Galactic Council (3000)',
            text: 'It is 3000 AD. Humanity has reached the stars. An alien probe arrives, inviting us to join the Galactic Council. But there is a catch: we must give up our aggressive tendencies.',
            emoji: '👽',
            background: 'bg-indigo-900',
            characters: ['👨‍🚀', '👽', '📜'],
            sceneType: 'decision',
            timelineYear: 3000,
            timelineEvent: 'Admission to the Galaxy',
            choices: [
                {
                    id: 'join',
                    text: 'Accept the terms. Peace is the only way.',
                    consequence: 'We become a respected elder race. The "Federation" timeline is solidified.'
                },
                {
                    id: 'refuse',
                    text: 'Refuse. We will not be tamed. We will conquer.',
                    consequence: 'We become the scourge of the galaxy. A Great War begins.'
                },
                {
                    id: 'isolate',
                    text: 'Hide. Build a shield around the solar system.',
                    consequence: 'We become a "Hermit Kingdom" star system, safe but stagnant.'
                }
            ]
        },
        {
            id: 'entropy-death',
            title: 'The Last Question (The End of Time)',
            text: 'Trillions of years have passed. The stars are going out. The universe is cooling. The super-computer AC asks: "How can entropy be reversed?"',
            emoji: '⌛',
            background: 'bg-black',
            characters: ['🌌', '💻', '✨'],
            sceneType: 'revelation',
            timelineYear: 1000000000,
            timelineEvent: 'Heat Death',
            choices: [
                {
                    id: 'insufficient-data',
                    text: 'THERE IS AS YET INSUFFICIENT DATA FOR A MEANINGFUL ANSWER.',
                    consequence: 'The computer continues to calculate... until the next Big Bang.'
                },
                {
                    id: 'let-there-be-light',
                    text: 'LET THERE BE LIGHT.',
                    consequence: 'A new universe is born.'
                }
            ]
        }
    ],
    backgroundColor: 'from-indigo-900 to-black'
};
