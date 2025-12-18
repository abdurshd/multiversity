import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures
const keyFigures: Person[] = [
  {
    id: 'john-f-kennedy',
    name: 'John F. Kennedy',
    role: 'The Young President',
    born: 1917,
    died: 1963,
    description: 'Stared down nuclear war. "We choose to go to the moon not because it is easy, but because it is hard."',
    image: '/images/chapters/cold-war/people/john-f-kennedy.png'
  },
  {
    id: 'nikita-khrushchev',
    name: 'Nikita Khrushchev',
    role: 'The Shoe-Banger',
    born: 1894,
    died: 1971,
    description: 'Volatile Soviet leader who put missiles in Cuba but also destalinized Russia. "We will bury you!"',
    image: '/images/chapters/cold-war/people/nikita-khrushchev.png'
  },
  {
    id: 'ronald-reagan',
    name: 'Ronald Reagan',
    role: 'The Great Communicator',
    born: 1911,
    died: 2004,
    description: 'Challenged the "Evil Empire" to tear down the wall. Star Wars dreamer.',
    image: '/images/chapters/cold-war/people/ronald-reagan.png'
  },
  {
    id: 'mikhail-gorbachev',
    name: 'Mikhail Gorbachev',
    role: 'The Reformer',
    born: 1931,
    died: 2022,
    description: 'Tried to save the USSR with Glasnost, accidentally ended it. Pizza Hut star.',
    image: '/images/chapters/cold-war/people/mikhail-gorbachev.png'
  }
];

// 1. Nuclear War (Failure)
const nuclearWarTimeline: Timeline = {
  id: 'nuclear-war',
  title: 'Nuclear Apocalypse ☢️💀',
  description: 'The Cold War turns hot. Civilization ends in 1962.',
  divergenceDescription: 'Diplomacy fails during the Cuban Missile Crisis.',
  divergenceYear: 1962,
  probability: 15,
  color: '#FF0000',
  icon: '☢️',
  image: '/images/chapters/cold-war/timeline_1.png',
  keyEvents: [
    {
      id: 'the-exchange',
      year: 1962,
      title: 'The Exchange',
      description: 'Missiles fly. 500 million die in the first hour.',
      impact: 'End of modern civilization.',
      relatedFigures: ['john-f-kennedy', 'nikita-khrushchev'],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'military'
    },
    {
      id: 'nuclear-winter',
      year: 1963,
      title: 'Nuclear Winter',
      description: 'The sky turns black. Crops fail. The survivors envy the dead.',
      impact: 'Extinction event.',
      relatedFigures: [],
      location: { lat: 0, lng: 0 },
      type: 'technological'
    }
  ],
  consequences: [
    {
      id: 'stone-age',
      category: 'social',
      shortTerm: 'Total collapse',
      longTerm: 'Humanity returns to the Stone Age',
      globalImpact: 'Radioactive planet'
    }
  ],
  butterfly: [
    {
      id: 'mutant-cockroaches',
      trigger: 'Radiation',
      consequence: 'Insects inherit the Earth',
      magnitude: 'massive',
      timespan: 1000
    }
  ],
  presentDayStatus: 'The ruins of Washington D.C. are a radioactive swamp. Small tribes of humans survive in the Southern Hemisphere. They tell legends of the "Fire Gods" who burned the world. ☠️☢️'
};

// 2. Soviet Victory
const sovietVictoryTimeline: Timeline = {
  id: 'soviet-victory',
  title: 'Red World: Soviet Victory 🚩🌍',
  description: 'What if the USSR won the Cold War?',
  divergenceDescription: 'The US economy collapses in the 1970s while the USSR reforms successfully.',
  divergenceYear: 1980,
  probability: 20,
  color: '#DC2626',
  icon: '🚩',
  image: '/images/chapters/cold-war/timeline_2.png',
  keyEvents: [
    {
      id: 'red-mars',
      year: 1985,
      title: 'Soviet Mars Landing',
      description: 'Cosmonauts plant the Red Flag on Mars.',
      impact: 'Technological dominance.',
      relatedFigures: [],
      location: { lat: 0, lng: 0 },
      type: 'technological'
    },
    {
      id: 'us-collapse',
      year: 1991,
      title: 'US Collapse',
      description: 'The USA fragments into warring states. The USSR sends peacekeeping troops.',
      impact: 'Global communism.',
      relatedFigures: [],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'global-planning',
      category: 'economic',
      shortTerm: 'Planned economy globally',
      longTerm: 'Space communism',
      globalImpact: 'Unified Earth under the Party'
    }
  ],
  butterfly: [
    {
      id: 'space-colonization',
      trigger: 'Soviet focus on heavy industry',
      consequence: 'Earlier industrialization of space',
      magnitude: 'large',
      timespan: 100
    }
  ],
  presentDayStatus: 'The General Secretary addresses the Supreme Soviet of Earth. The Red Flag flies over the White House (now the People\'s Palace). Capitalism is a forgotten nightmare. 🚩☭'
};

// 3. Peaceful Coexistence
const peacefulCoexistenceTimeline: Timeline = {
  id: 'peaceful-coexistence',
  title: 'Star Trek Future: Coexistence 🕊️🚀',
  description: 'What if the superpowers cooperated?',
  divergenceDescription: 'Detente succeeds. Space Race becomes a joint venture.',
  divergenceYear: 1965,
  probability: 30,
  color: '#10B981',
  icon: '🕊️',
  image: '/images/chapters/cold-war/timeline_3.png',
  keyEvents: [
    {
      id: 'joint-moon',
      year: 1969,
      title: 'Joint Moon Landing',
      description: 'Armstrong and Gagarin step onto the moon together.',
      impact: 'Unity.',
      relatedFigures: ['john-f-kennedy'],
      location: { lat: 0, lng: 0 },
      type: 'technological'
    }
  ],
  consequences: [
    {
      id: 'world-peace',
      category: 'political',
      shortTerm: 'End of proxy wars',
      longTerm: 'Global Federation',
      globalImpact: 'Utopia'
    }
  ],
  butterfly: [
    {
      id: 'mars-2000',
      trigger: 'Cooperation',
      consequence: 'Mars colony by 2000',
      magnitude: 'massive',
      timespan: 50
    }
  ],
  presentDayStatus: 'The United Earth Federation explores the galaxy. Poverty is eliminated. War is obsolete. 🖖🌍'
};

const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'cuban-missile-crisis',
    title: 'Cuban Missile Crisis (1962)',
    text: 'President, the Soviets have missiles in Cuba. LeMay wants to bomb them. Khrushchev demands we remove Jupiter missiles from Turkey. The clock is ticking.',
    emoji: '🚀',
    background: 'from-red-900 to-black',
    characters: ['🇺🇸', '🇷🇺', '🇨🇺'],
    sceneType: 'negotiation',
    timelineYear: 1962,
    timelineEvent: 'Defcon 2',
    choices: [
      {
        id: 'blockade',
        text: 'Quarantine the island. Give them time to think.',
        consequence: 'Khrushchev blinks. The missiles are removed. We survive.',
        modifiers: [{ stat: 'diplomacy', value: 30 }],
        nextSceneId: 'space-race'
      },
      {
        id: 'airstrike',
        text: 'Launch airstrikes! Take them out!',
        consequence: 'The Soviets retaliate. New York is vaporized.',
        linkedTimelineId: 'nuclear-war'
      },
      {
        id: 'backchannel',
        text: 'Secret deal: trade Turkey missiles for Cuba.',
        consequence: 'A fair trade. Peace is secured, but the military is furious.',
        modifiers: [{ stat: 'diplomacy', value: 50 }, { stat: 'strength', value: -10 }],
        nextSceneId: 'space-race'
      }
    ]
  },
  {
    id: 'space-race',
    title: 'The Space Race (1969)',
    text: 'We are behind. The Soviets put the first man in space. Now we aim for the moon. But the cost is astronomical.',
    emoji: '🌕',
    background: 'from-blue-900 to-black',
    characters: ['🚀', '👨‍🚀', '💰'],
    sceneType: 'technological',
    timelineYear: 1969,
    choices: [
      {
        id: 'apollo',
        text: 'We choose to go to the moon! Full funding.',
        consequence: 'Eagle has landed. America wins the prestige war.',
        modifiers: [{ stat: 'technology', value: 50 }, { stat: 'strength', value: 20 }],
        nextSceneId: 'berlin-wall'
      },
      {
        id: 'joint-mission',
        text: 'Propose a joint mission with the USSR.',
        consequence: 'They accept! The "Soyuz-Apollo" lands on the moon.',
        linkedTimelineId: 'peaceful-coexistence'
      },
      {
        id: 'military-space',
        text: 'Forget the moon. Build orbital weapons.',
        consequence: 'The Soviets do the same. Space becomes a battlefield.',
        modifiers: [{ stat: 'strength', value: 30 }, { stat: 'diplomacy', value: -30 }],
        nextSceneId: 'berlin-wall'
      }
    ]
  },
  {
    id: 'berlin-wall',
    title: 'Tear Down This Wall (1987)',
    text: 'Mr. Gorbachev is struggling. The Soviet economy is failing. You are at the Brandenburg Gate.',
    emoji: '🧱',
    background: 'from-gray-700 to-slate-900',
    characters: ['🇺🇸', '🇷🇺', '🔨'],
    sceneType: 'decision',
    timelineYear: 1987,
    choices: [
      {
        id: 'tear-down',
        text: ' "Mr. Gorbachev, tear down this wall!"',
        consequence: 'The Wall falls. The Iron Curtain collapses.',
        modifiers: [{ stat: 'freedom', value: 50 }],
        // Historical End
      },
      {
        id: 'quiet-diplomacy',
        text: 'Offer financial aid to prop up the USSR.',
        consequence: 'The USSR survives. The Cold War ends with a whimper, not a bang.',
        linkedTimelineId: 'soviet-victory' // Or a variant
      }
    ]
  }
];

// Main chapter data
export const coldWarChapter: Chapter = {
  id: 'cold-war',
  title: 'The Cold War',
  period: '1945-1991',
  startYear: 1945,
  endYear: 1991,
  description: 'Mutually Assured Destruction. ☢️❄️',
  historicalContext: 'Two superpowers partitioned the world.',
  keyFigures,
  divergencePoint: 'Cuban Missile Crisis',
  divergenceYear: 1962,
  alternativeTimelines: [
    nuclearWarTimeline,
    sovietVictoryTimeline,
    peacefulCoexistenceTimeline,
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/cold-war/main.png',
  icon: '❄️',
  backgroundColor: 'from-blue-900 to-red-800'
};