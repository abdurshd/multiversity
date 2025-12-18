import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures
const keyFigures: Person[] = [
  {
    id: 'peter-the-great',
    name: 'Peter the Great',
    role: 'The Reformer',
    born: 1672,
    died: 1725,
    description: 'Drags Russia into modern times by its beard. 6\'8" tall and carries scissors.',
    image: '/images/chapters/russian-empire/people/peter-the-great.png'
  },
  {
    id: 'catherine-the-great',
    name: 'Catherine the Great',
    role: 'The Enlightened Despot',
    born: 1729,
    died: 1796,
    description: 'German princess who became the greatest Russian Empress. Friend of Voltaire.',
    image: '/images/chapters/russian-empire/people/catherine-the-great.png'
  },
  {
    id: 'rasputin',
    name: 'Grigori Rasputin',
    role: 'The Mad Monk',
    born: 1869,
    died: 1916,
    description: 'Mystic healer who refused to die. Brought down an empire.',
    image: '/images/chapters/russian-empire/people/rasputin.png'
  }
];

// 1. Constitutional Russia (Decembrist Success)
const constitutionalRussiaTimeline: Timeline = {
  id: 'constitutional-russia',
  title: 'Constitutional Monarchy 📜👑',
  description: 'The Decembrist Revolt succeeds. Russia becomes a democracy in 1825.',
  divergenceDescription: 'The army supports the Constitution instead of Nicholas I.',
  divergenceYear: 1825,
  probability: 20,
  color: '#10B981',
  icon: '📜',
  image: '/images/chapters/russian-empire/timeline_1.png',
  keyEvents: [
    {
      id: 'constitution-1825',
      year: 1825,
      title: 'The Constitution',
      description: 'Tsar Constantine signs the Constitution. Serfdom is abolished early.',
      impact: 'Modernization.',
      relatedFigures: [],
      location: { lat: 59.9311, lng: 30.3609 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'no-bolsheviks',
      category: 'political',
      shortTerm: 'Liberal reforms',
      longTerm: 'No Soviet Union',
      globalImpact: 'A peaceful 20th century'
    }
  ],
  butterfly: [
    {
      id: 'industrial-giant',
      trigger: 'Free labor',
      consequence: 'Russia becomes industrial giant by 1880',
      magnitude: 'large',
      timespan: 100
    }
  ],
  presentDayStatus: 'The Russian Federation is a constitutional monarchy similar to the UK. St. Petersburg is the "Paris of the North". 🇷🇺👑'
};

// 2. Traditionalist Russia (Peter Fails)
const traditionalistRussiaTimeline: Timeline = {
  id: 'traditionalist-russia',
  title: 'Old Muscovy 🐻⛪',
  description: 'Peter reforms fail. Russia remains an isolated, medieval state.',
  divergenceDescription: 'The Streltsy Rebellion succeeds.',
  divergenceYear: 1698,
  probability: 15,
  color: '#B45309',
  icon: '⛪',
  image: '/images/chapters/russian-empire/timeline_2.png',
  keyEvents: [
    {
      id: 'isolation',
      year: 1700,
      title: 'The Great Wall of Russia',
      description: 'Russia closes its borders to the corrupted West.',
      impact: 'Stagnation.',
      relatedFigures: ['peter-the-great'],
      location: { lat: 0, lng: 0 },
      type: 'cultural'
    }
  ],
  consequences: [
    {
      id: 'partition',
      category: 'political',
      shortTerm: 'Weakness',
      longTerm: 'Russia is partitioned by Sweden and Turkey',
      globalImpact: 'No Russian Empire'
    }
  ],
  butterfly: [
    {
      id: 'swedish-empire',
      trigger: 'Weak Russia',
      consequence: 'Sweden rules Northern Europe',
      magnitude: 'massive',
      timespan: 200
    }
  ],
  presentDayStatus: 'The Principality of Moscow is a small, quiet nation known for its churches and fur trade. The Swedish Empire controls the Baltic. 🇸🇪🏰'
};

// 3. Sino-Russian Alliance
const sinoRussianTimeline: Timeline = {
  id: 'sino-russian',
  title: 'The Dragon and Bear 🐉🐻',
  description: 'Russia turns East instead of West.',
  divergenceDescription: 'Russia allies with Qing China.',
  divergenceYear: 1860,
  probability: 10,
  color: '#F59E0B',
  icon: '🐉',
  image: '/images/chapters/russian-empire/timeline_3.png',
  keyEvents: [
    {
      id: 'eurasian-pact',
      year: 1870,
      title: 'Eurasian Pact',
      description: 'A military alliance that dominates Asia.',
      impact: 'End of Western colonialism in Asia.',
      relatedFigures: [],
      location: { lat: 0, lng: 0 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'eastern-century',
      category: 'political',
      shortTerm: 'British Empire checked',
      longTerm: 'Asia rises early',
      globalImpact: 'Multipolar world'
    }
  ],
  butterfly: [
    {
      id: 'no-opium-wars',
      trigger: 'Russian help',
      consequence: 'China avoids Century of Humiliation',
      magnitude: 'large',
      timespan: 100
    }
  ],
  presentDayStatus: 'The Eurasian Union is the world\'s superpower. The Silk Road is a high-speed rail network. 🌏🚂'
};

const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'beard-tax',
    title: 'The Beard Tax (1698)',
    text: 'Moscow. Tsar Peter has returned from Europe. He holds a pair of scissors. "The beard is a useless burden," he says. "Pay the tax or shave!"',
    emoji: '🧔',
    background: 'from-blue-900 to-gray-800',
    characters: ['🧔', '✂️', '👑'],
    sceneType: 'decision',
    timelineYear: 1698,
    timelineEvent: 'Westernization',
    choices: [
      {
        id: 'shave',
        text: 'Submit. Shave the beard.',
        consequence: 'You lose your dignity but gain the Tsar\'s favor. Russia modernizes.',
        modifiers: [{ stat: 'technology', value: 30 }],
        nextSceneId: 'decembrist-revolt'
      },
      {
        id: 'rebel',
        text: 'Refuse! The beard is sacred!',
        consequence: 'The Streltsy rebel. Peter is overthrown. Russia stays medieval.',
        linkedTimelineId: 'traditionalist-russia'
      }
    ]
  },
  {
    id: 'decembrist-revolt',
    title: 'Senate Square (1825)',
    text: 'Alexander I is dead. The army is in the square. They shout "Constantine and Constitution!" Nicholas I orders the cannons loaded.',
    emoji: '❄️',
    background: 'from-white to-red-900',
    characters: ['⚔️', '📜', '💣'],
    sceneType: 'battle',
    timelineYear: 1825,
    choices: [
      {
        id: 'crush',
        text: 'Fire the cannons! Order must be maintained.',
        consequence: 'The revolt is crushed. Autocracy survives.',
        modifiers: [{ stat: 'strength', value: 30 }, { stat: 'freedom', value: -30 }],
        nextSceneId: 'emancipation'
      },
      {
        id: 'join',
        text: 'Join the rebels! For the Constitution!',
        consequence: ' The army mutinies. Nicholas flees. A Republic is born.',
        linkedTimelineId: 'constitutional-russia'
      }
    ]
  },
  {
    id: 'emancipation',
    title: 'The Serf Question (1861)',
    text: 'Tsar Alexander II asks your advice. "It is better to abolish serfdom from above than have it abolished from below." But the nobles are angry.',
    emoji: '⛓️',
    background: 'from-green-900 to-brown-900',
    characters: ['⛓️', '🌾', '👑'],
    sceneType: 'decision',
    timelineYear: 1861,
    choices: [
      {
        id: 'land',
        text: 'Give the peasants land. Full freedom.',
        consequence: 'The nobles are furious, but the peasants prosper. Revolution is averted.',
        modifiers: [{ stat: 'freedom', value: 50 }],
        nextSceneId: 'rasputin'
      },
      {
        id: 'east',
        text: 'Forget Europe. Look East to China.',
        consequence: 'We forge a new destiny in Asia.',
        linkedTimelineId: 'sino-russian'
      }
    ]
  },
  {
    id: 'rasputin',
    title: 'The Mad Monk (1916)',
    text: 'Rasputin is throwing a party. The Tsarina listens only to him. Russia is losing the war. Prince Yusupov offers you a poisoned cake.',
    emoji: '🍰',
    background: 'from-purple-900 to-black',
    characters: ['🎭', '🍷', '☠️'],
    sceneType: 'decision',
    timelineYear: 1916,
    choices: [
      {
        id: 'kill',
        text: 'Help kill him. Save the reputation of the throne.',
        consequence: 'It is too late. The revolution comes anyway.',
        // Leads to Lenin chapter effectively
      },
      {
        id: 'save',
        text: 'Warn him. He is the only one who opposes the war.',
        consequence: 'Rasputin convinces the Tsar to make peace. The Empire survives (barely).',
        linkedTimelineId: 'constitutional-russia' // Converges
      }
    ]
  }
];

// Main chapter data
export const russianEmpireChapter: Chapter = {
  id: 'russian-empire',
  title: 'Russian Empire',
  period: '1700-1917',
  startYear: 1700,
  endYear: 1917,
  description: 'Tsars, samovars, and expansion. 🐻🏰',
  historicalContext: 'From Peter to Nicholas.',
  keyFigures,
  divergencePoint: 'Peter Reforms',
  divergenceYear: 1698,
  alternativeTimelines: [
    constitutionalRussiaTimeline,
    traditionalistRussiaTimeline,
    sinoRussianTimeline,
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/russian-empire/main.png',
  icon: '🐻',
  backgroundColor: 'from-red-700 to-blue-900'
};