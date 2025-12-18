import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures in the French Revolution with cartoonish descriptions
const keyFigures: Person[] = [
  {
    id: 'marie-antoinette',
    name: 'Marie Antoinette',
    role: 'Queen of France & Fashion Icon',
    born: 1755,
    died: 1793,
    description: 'The cake-loving queen who allegedly said "Let them eat cake!" 🍰 Known for her extravagant parties and love of fancy dresses while people starved.',
    image: '/images/chapters/french-revolution/people/marie-antoinette.png'
  },
  {
    id: 'robespierre',
    name: 'Maximilien Robespierre',
    role: 'The Incorruptible Guillotine Master',
    born: 1758,
    died: 1794,
    description: 'The obsessively clean revolutionary who loved his guillotine a bit too much! 🗡️ Started as a defender of the people, ended as the Terror\'s chief architect.',
    image: '/images/chapters/french-revolution/people/robespierre.png'
  },
  {
    id: 'louis-xvi',
    name: 'Louis XVI',
    role: 'The Indecisive King',
    born: 1754,
    died: 1793,
    description: 'Poor Louis! 👑 Loved making locks more than making decisions. His hobby was locksmithing while his kingdom fell apart!',
    image: '/images/chapters/french-revolution/people/louis-xvi.png'
  },
  {
    id: 'napoleon-bonaparte',
    name: 'Napoleon Bonaparte',
    role: 'The Little Emperor with Big Dreams',
    born: 1769,
    died: 1821,
    description: 'The short general who conquered most of Europe! ⚡ Rose from the chaos to become Emperor and reshape the world.',
    image: '/images/chapters/french-revolution/people/napoleon-bonaparte.png'
  },
  {
    id: 'jacques-danton',
    name: 'Georges Danton',
    role: 'The Thunderous Voice of Revolution',
    born: 1759,
    died: 1794,
    description: 'The booming orator who could shake buildings with his voice! 📢 Unfortunately, even his powerful voice couldn\'t save him from Robespierre.',
    image: '/images/chapters/french-revolution/people/jacques-danton.png'
  }
];


// Alternative Timeline 1: Constitutional Monarchy Success
const constitutionalMonarchyTimeline: Timeline = {
  id: 'constitutional-monarchy',
  title: 'King Louis Learns to Share! 👑🤝',
  description: 'What if Louis XVI had embraced constitutional monarchy?',
  divergenceDescription: 'Louis XVI genuinely accepts constitutional limits.',
  divergenceYear: 1789,
  probability: 35,
  color: '#10B981',
  icon: '👑',
  image: '/images/chapters/french-revolution/timeline_1.png',
  keyEvents: [
    {
      id: 'louis-accepts-constitution',
      year: 1789,
      title: 'Louis XVI Accepts Constitution',
      description: 'Louis becomes a model constitutional king.',
      impact: 'Prevents radicalization.',
      relatedFigures: ['louis-xvi'],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'political'
    },
    {
      id: 'industrial-revolution-france',
      year: 1800,
      title: 'French Industrial Revolution',
      description: 'Stability leads to early industrialization.',
      impact: 'France becomes economic superpower.',
      relatedFigures: [],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'economic'
    }
  ],
  consequences: [
    {
      id: 'stable-democracy',
      category: 'political',
      shortTerm: 'Stable government for 30 years',
      longTerm: 'France becomes model constitutional democracy',
      globalImpact: 'Peaceful spread of democratic ideals'
    }
  ],
  butterfly: [
    {
      id: 'peaceful-europe',
      trigger: 'No Napoleonic Wars',
      consequence: 'Europe focuses on trade',
      magnitude: 'massive',
      timespan: 100
    }
  ],
  presentDayStatus: 'France leads the European Union as a Constitutional Monarchy. The Bourbons are beloved figureheads. Paris is the capital of peace. 🇫🇷👑'
};

// Alternative Timeline 2: Robespierre Lives
const robespierreLivesTimeline: Timeline = {
  id: 'robespierre-eternal',
  title: 'Robespierre\'s Eternal Terror! 😱🗡️',
  description: 'What if Robespierre had survived?',
  divergenceDescription: 'Robespierre purges his enemies before Thermidor.',
  divergenceYear: 1794,
  probability: 20,
  color: '#DC2626',
  icon: '🗡️',
  image: '/images/chapters/french-revolution/timeline_2.png',
  keyEvents: [
    {
      id: 'robespierre-survives',
      year: 1794,
      title: 'Robespierre Survives',
      description: 'The plot fails. The Terror intensifies.',
      impact: 'Revolutionary dictatorship consolidated.',
      relatedFigures: ['robespierre'],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'political'
    },
    {
      id: 'cult-supreme-being',
      year: 1798,
      title: 'Cult of the Supreme Being',
      description: 'New state religion enforced.',
      impact: 'Theocracy established.',
      relatedFigures: ['robespierre'],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'social'
    }
  ],
  consequences: [
    {
      id: 'totalitarian-state',
      category: 'political',
      shortTerm: 'First modern totalitarian state',
      longTerm: 'Terror lasts decades',
      globalImpact: 'Template for future dictators'
    }
  ],
  butterfly: [
    {
      id: 'early-totalitarianism',
      trigger: 'Police state perfected',
      consequence: 'Totalitarianism spreads earlier',
      magnitude: 'large',
      timespan: 200
    }
  ],
  presentDayStatus: 'The Republic of Virtue collapsed in 1824. It is remembered as a dark age. Annual "Never Again" parades feature guillotine piñatas. 🎭🗡️'
};

// Alternative Timeline 3: Girondist Victory
const girondistVictoryTimeline: Timeline = {
  id: 'girondist-victory',
  title: 'The Girondists Win! Democracy Lite 🕊️🏛️',
  description: 'What if the moderate Girondists defeated the Jacobins?',
  divergenceDescription: 'Girondists resist Jacobin coup.',
  divergenceYear: 1793,
  probability: 25,
  color: '#3B82F6',
  icon: '🕊️',
  image: '/images/chapters/french-revolution/timeline_3.png',
  keyEvents: [
    {
      id: 'federal-republic',
      year: 1793,
      title: 'Federal Republic Established',
      description: 'Decentralized democracy like the USA.',
      impact: 'Respects regional autonomy.',
      relatedFigures: [],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'moderate-democracy',
      category: 'political',
      shortTerm: 'Stable federal republic',
      longTerm: 'Model for federalism',
      globalImpact: 'Influences German unification'
    }
  ],
  butterfly: [
    {
      id: 'federal-europe',
      trigger: 'Successful federalism',
      consequence: 'Early European Federal Union',
      magnitude: 'large',
      timespan: 150
    }
  ],
  presentDayStatus: 'The French Federal Republic is the heart of a federal Europe. The Girondist model inspired the world. 🇫🇷🧀'
};

const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'estates-general',
    title: 'The Tennis Court Oath (1789)',
    text: 'Versailles. The King has locked you out. The people are angry. The rain is falling. Where do we meet?',
    emoji: '🎾',
    background: 'from-blue-900 to-slate-900',
    characters: ['👑', '🔒', '🗣️'],
    sceneType: 'decision',
    timelineYear: 1789,
    timelineEvent: 'Tennis Court Oath',
    choices: [
      {
        id: 'oath',
        text: 'To the Tennis Court! Swear a new Constitution!',
        consequence: 'The National Assembly is born. The Revolution begins.',
        modifiers: [{ stat: 'freedom', value: 30 }],
        nextSceneId: 'storming-bastille'
      },
      {
        id: 'compromise',
        text: 'Petition the Kind humbly.',
        consequence: 'Louis is touched by your loyalty. He grants a constitution peacefully.',
        linkedTimelineId: 'constitutional-monarchy'
      },
      {
        id: 'go-home',
        text: 'This is treason. Go home.',
        consequence: 'The revolution happens without you. You are forgotten.',
        // Game Over or standard linear
        nextSceneId: 'storming-bastille'
      }
    ]
  },
  {
    id: 'storming-bastille',
    title: 'July 14th (1789)',
    text: 'The Bastille looms above Paris. It holds gunpowder. The mob looks to you for leadership.',
    emoji: '🏰',
    background: 'from-red-800 to-orange-900',
    characters: ['🏰', '🔥', '🗡️'],
    sceneType: 'battle',
    timelineYear: 1789,
    choices: [
      {
        id: 'assault',
        text: 'Storm the fortress!',
        consequence: 'The Bastille falls! The King is terrified.',
        modifiers: [{ stat: 'chaos', value: 30 }, { stat: 'freedom', value: 20 }],
        nextSceneId: 'flight-varennes'
      },
      {
        id: 'negotiate',
        text: 'Negotiate with the Governor.',
        consequence: 'He opens fire while you talk. The mob massacres everyone. You failed.',
        modifiers: [{ stat: 'chaos', value: 50 }],
        nextSceneId: 'flight-varennes'
      }
    ]
  },
  {
    id: 'flight-varennes',
    title: 'The King Escapes (1791)',
    text: 'The King has fled Paris in disguise! He is stopped at Varennes. The crowd surrounds his carriage.',
    emoji: '🐴',
    background: 'from-slate-800 to-black',
    characters: ['👑', '🛑', '🌾'],
    sceneType: 'decision',
    timelineYear: 1791,
    choices: [
      {
        id: 'arrest',
        text: 'Arrest him! He is a traitor.',
        consequence: 'The Monarchy is dead. The Republic is born.',
        modifiers: [{ stat: 'freedom', value: 20 }],
        nextSceneId: 'kings-trial'
      },
      {
        id: 'let-go',
        text: 'Let him pass. France needs a King.',
        consequence: 'He returns with an Austrian army. The Revolution is crushed.',
        // Game Over
      }
    ]
  },
  {
    id: 'kings-trial',
    title: 'Trial of Citizen Capet (1793)',
    text: 'Louis XVI is on trial. The Jacobins want blood. The Girondins want mercy. How do you vote?',
    emoji: '⚖️',
    background: 'from-gray-900 to-black',
    characters: ['⚖️', '👑', '💀'],
    sceneType: 'decision',
    timelineYear: 1793,
    choices: [
      {
        id: 'execute',
        text: 'Death! The King must die so the nation may live.',
        consequence: 'The guillotine falls. Europe declares war.',
        modifiers: [{ stat: 'chaos', value: 40 }, { stat: 'strength', value: 20 }],
        nextSceneId: 'reign-of-terror'
      },
      {
        id: 'exile',
        text: 'Exile. Do not stain the Republic with blood.',
        consequence: 'The King is banished. The Moderates win.',
        linkedTimelineId: 'girondist-victory'
      }
    ]
  },
  {
    id: 'reign-of-terror',
    title: 'The Great Terror (1793)',
    text: 'Robespierre rules. The Committee of Public Safety sees enemies everywhere. Your neighbor has been arrested.',
    emoji: '😱',
    background: 'from-red-950 to-black',
    characters: ['🗡️', '📋', '👀'],
    sceneType: 'decision',
    timelineYear: 1793,
    choices: [
      {
        id: 'purge',
        text: 'Support the purges. Purity is essential.',
        consequence: 'You survive, but at what cost?',
        modifiers: [{ stat: 'chaos', value: 50 }],
        linkedTimelineId: 'robespierre-eternal'
      },
      {
        id: 'thermidor',
        text: 'Plot against Robespierre.',
        consequence: 'The coup succeeds! The Terror ends.',
        modifiers: [{ stat: 'freedom', value: 30 }],
        nextSceneId: 'napoleon-rises'
      }
    ]
  },
  {
    id: 'napoleon-rises',
    title: '18 Brumaire (1799)',
    text: 'General Bonaparte has returned. He plans a coup to restore order. He asks for your support.',
    emoji: '⚡',
    background: 'from-blue-700 to-gold-600',
    characters: ['🤴', '🗡️', '🇫🇷'],
    sceneType: 'decision',
    timelineYear: 1799,
    choices: [
      {
        id: 'emperor',
        text: 'Hail Caesar! France needs a strongman.',
        consequence: 'The Empire begins. Glory and war await.',
        modifiers: [{ stat: 'strength', value: 50 }],
        // Historical End
      },
      {
        id: 'republic',
        text: 'Defend the Constitution.',
        consequence: 'Napoleon is arrested. The Republic survives (weakly).',
        linkedTimelineId: 'girondist-victory'
      }
    ]
  }
];

// Main chapter data
export const frenchRevolutionChapter: Chapter = {
  id: 'french-revolution',
  title: 'French Revolution',
  period: '1789',
  startYear: 1780,
  endYear: 1815,
  description: 'Liberty, Equality, Fraternity... and lots of guillotines! 🇫🇷⚡',
  historicalContext: 'By 1789, France was bankrupt and hungry.',
  keyFigures,
  divergencePoint: 'Storming of the Bastille',
  divergenceYear: 1789,
  alternativeTimelines: [
    constitutionalMonarchyTimeline,
    robespierreLivesTimeline,
    girondistVictoryTimeline,
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/french-revolution/main.png',
  icon: '🇫🇷',
  backgroundColor: 'from-blue-600 to-red-600'
};