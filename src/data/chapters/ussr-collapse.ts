import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures
const keyFigures: Person[] = [
  {
    id: 'mikhail-gorbachev',
    name: 'Mikhail Gorbachev',
    role: 'The Reformer',
    born: 1931,
    died: 2022,
    description: 'Tried to fix the system but accidentally broke it. 🔨',
    image: '/images/chapters/ussr-collapse/people/mikhail-gorbachev.png'
  },
  {
    id: 'boris-yeltsin',
    name: 'Boris Yeltsin',
    role: 'The Revolutionary',
    born: 1931,
    died: 2007,
    description: 'Climbed on a tank and ended an empire. 🐻',
    image: '/images/chapters/ussr-collapse/people/boris-yeltsin.png'
  },
  {
    id: 'ronald-reagan',
    name: 'Ronald Reagan',
    role: 'The Cowboy',
    born: 1911,
    died: 2004,
    description: '"Mr. Gorbachev, tear down this wall!" 🇺🇸',
    image: '/images/chapters/ussr-collapse/people/ronald-reagan.png'
  }
];

// 1. Union Preserved (China Model)
const unionPreservedTimeline: Timeline = {
  id: 'union-preserved',
  title: 'Soviet Union 2.0 🇨🇳🔨',
  description: 'The USSR adopts Chinese-style reforms: capitalism without democracy.',
  divergenceDescription: 'Gorbachev chooses perestroika without glasnost.',
  divergenceYear: 1989,
  probability: 20,
  color: '#DC2626',
  icon: '🔨',
  image: '/images/chapters/ussr-collapse/timeline_1.png',
  keyEvents: [
    {
      id: 'tiananmen-moscow',
      year: 1989,
      title: 'Crackdown in Moscow',
      description: 'Protests are crushed. The Party retains control.',
      impact: 'Stability.',
      relatedFigures: ['mikhail-gorbachev'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'economic-boom',
      category: 'economic',
      shortTerm: 'Stability',
      longTerm: 'Economic giant by 2010',
      globalImpact: 'Bipolar world continues'
    }
  ],
  butterfly: [
    {
      id: 'cold-war-continues',
      trigger: 'Strong USSR',
      consequence: 'Cold War continues but shifts to economics',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'The USSR is the world\'s largest economy. It is authoritarian but prosperous. The internet is heavily censored. 🔨💰'
};

// 2. War in Europe (Violent Collapse)
const violentCollapseTimeline: Timeline = {
  id: 'violent-collapse',
  title: 'Red Storm ⚔️🔥',
  description: 'The collapse turns into a civil war.',
  divergenceDescription: 'The August Coup leads to a full civil war.',
  divergenceYear: 1991,
  probability: 15,
  color: '#B91C1C',
  icon: '🔥',
  image: '/images/chapters/ussr-collapse/timeline_2.png',
  keyEvents: [
    {
      id: 'civil-war-1991',
      year: 1991,
      title: 'The Second Russian Civil War',
      description: 'Hardliners vs. Democrats. Nukes go missing.',
      impact: 'Chaos.',
      relatedFigures: [],
      location: { lat: 0, lng: 0 },
      type: 'military'
    }
  ],
  consequences: [
    {
      id: 'nuclear-terrorism',
      category: 'military',
      shortTerm: 'Loose nukes',
      longTerm: 'Global instability',
      globalImpact: 'Nightmare scenario'
    }
  ],
  butterfly: [
    {
      id: 'un-intervention',
      trigger: 'Chaos',
      consequence: 'NATO occupies western Russia',
      magnitude: 'massive',
      timespan: 50
    }
  ],
  presentDayStatus: 'Russia is a collection of warlord states. The UN patrols the nuclear sites. ☢️💀'
};

// 3. True Democracy (Gradual Reform)
const trueDemocracyTimeline: Timeline = {
  id: 'true-democracy',
  title: 'Nordic Russia ❄️🗳️',
  description: 'Russia transitions smoothly to a social democracy.',
  divergenceDescription: 'Gorbachev and Yeltsin cooperate.',
  divergenceYear: 1990,
  probability: 10,
  color: '#10B981',
  icon: '🗳️',
  image: '/images/chapters/ussr-collapse/timeline_3.png',
  keyEvents: [
    {
      id: 'grand-bargain',
      year: 1990,
      title: 'The Grand Bargain',
      description: 'The West provides massive aid (Marshal Plan 2.0).',
      impact: 'Economy stabilizes.',
      relatedFigures: ['boris-yeltsin', 'ronald-reagan'],
      location: { lat: 0, lng: 0 },
      type: 'economic'
    }
  ],
  consequences: [
    {
      id: 'eu-member',
      category: 'political',
      shortTerm: 'Partnership',
      longTerm: 'Russia joins the EU',
      globalImpact: 'Europe from Lisbon to Vladivostok'
    }
  ],
  butterfly: [
    {
      id: 'peaceful-world',
      trigger: 'No enemy',
      consequence: 'Global disarmament',
      magnitude: 'large',
      timespan: 100
    }
  ],
  presentDayStatus: 'Russia is a wealthy social democracy and a key member of the European Union. 🇷🇺🇪🇺'
};

const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'chernobyl',
    title: 'Chernobyl (1986)',
    text: 'Reactor 4 has exploded. Radiation is spewing across Europe. The West is asking questions. What do we say?',
    emoji: '☢️',
    background: 'from-green-900 to-black',
    characters: ['☢️', '🤐', '📢'],
    sceneType: 'decision',
    timelineYear: 1986,
    timelineEvent: 'The Disaster',
    choices: [
      {
        id: 'truth',
        text: 'Tell the full truth. Ask for help.',
        consequence: 'Humiliating, but it starts "Glasnost". The people trust you.',
        modifiers: [{ stat: 'freedom', value: 30 }],
        nextSceneId: 'berlin-wall'
      },
      {
        id: 'lie',
        text: 'Deny everything. "Minor incident."',
        consequence: 'The lie poisons the system. The rot deepens.',
        modifiers: [{ stat: 'diplomacy', value: -50 }],
        linkedTimelineId: 'violent-collapse' // Loss of trust
      }
    ]
  },
  {
    id: 'berlin-wall',
    title: 'The Wall (1989)',
    text: 'Protests in East Berlin. The people want to cross. The guards ask for orders. Open fire?',
    emoji: '🧱',
    background: 'from-gray-700 to-blue-900',
    characters: ['🧱', '🔫', '🕊️'],
    sceneType: 'decision',
    timelineYear: 1989,
    choices: [
      {
        id: 'open',
        text: 'Do not shoot. Open the gates.',
        consequence: 'The Wall falls. The Cold War ends. Freedom!',
        modifiers: [{ stat: 'freedom', value: 100 }],
        nextSceneId: 'august-coup'
      },
      {
        id: 'shoot',
        text: 'Defend the border! Fire!',
        consequence: 'Massacre. The West sanctions us. We become isolated like North Korea.',
        linkedTimelineId: 'union-preserved'
      }
    ]
  },
  {
    id: 'august-coup',
    title: 'The Coup (1991)',
    text: 'Hardliners have seized power. Tanks are in Moscow. Yeltsin is on a tank calling for resistance.',
    emoji: '⚔️',
    background: 'from-red-900 to-black',
    characters: ['🐻', '⚔️', '🏛️'],
    sceneType: 'battle',
    timelineYear: 1991,
    choices: [
      {
        id: 'join-yeltsin',
        text: 'Stand with Yeltsin. Defend democracy.',
        consequence: 'The coup fails. The USSR dissolves efficiently.',
        // Historical
      },
      {
        id: 'support-coup',
        text: 'Support the Emergency Committee. Order first.',
        consequence: 'The coup succeeds. The USSR is saved, but freedom is dead.',
        linkedTimelineId: 'union-preserved'
      },
      {
        id: 'civil-war',
        text: 'Split the army. Fight!',
        consequence: 'Civil war erupts. Chaos reigns.',
        linkedTimelineId: 'violent-collapse'
      }
    ]
  }
];

// Main chapter data
export const ussrCollapseChapter: Chapter = {
  id: 'ussr-collapse',
  title: 'USSR Collapse',
  period: '1985-1991',
  startYear: 1980,
  endYear: 2000,
  description: 'The end of history? 🔨☢️',
  historicalContext: 'The superpower that vanished.',
  keyFigures,
  divergencePoint: 'Gorbachev Reforms',
  divergenceYear: 1985,
  alternativeTimelines: [
    unionPreservedTimeline,
    violentCollapseTimeline,
    trueDemocracyTimeline,
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/ussr-collapse/main.png',
  icon: '🔨',
  backgroundColor: 'from-red-900 to-gray-800'
};