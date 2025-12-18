import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures
const keyFigures: Person[] = [
  {
    id: 'vladimir-lenin',
    name: 'Vladimir Lenin',
    role: 'The Revolutionary Mastermind',
    born: 1870,
    died: 1924,
    description: 'The ultimate revolutionary overachiever! 💀⚡ Bald genius, sealed train rider, and architect of the USSR.',
    image: '/images/chapters/lenin-revolution/people/vladimir-lenin.png'
  },
  {
    id: 'leon-trotsky',
    name: 'Leon Trotsky',
    role: 'The Fiery Orator',
    born: 1879,
    died: 1940,
    description: 'Creator of the Red Army and proponent of Permanent Revolution. Destiny: Ice pick (unless you save him).',
    image: '/images/chapters/lenin-revolution/people/leon-trotsky.png'
  },
  {
    id: 'alexander-kerensky',
    name: 'Alexander Kerensky',
    role: 'The Moderate Leader',
    born: 1881,
    died: 1970,
    description: 'Leader of the Provisional Government. Tried to please everyone, ended up pleasing no one.',
    image: '/images/chapters/lenin-revolution/people/kerensky.png'
  },
  {
    id: 'joseph-stalin',
    name: 'Joseph Stalin',
    role: 'The Man of Steel',
    born: 1878,
    died: 1953,
    description: 'Quiet, bureaucratic, and extremely dangerous. Don\'t underestimate the Secretary.',
    image: '/images/chapters/lenin-revolution/people/joseph-stalin.png'
  }
];

// 1. Menshevik Victory (Democratic Socialism)
const menshevikVictoryTimeline: Timeline = {
  id: 'menshevik-victory',
  title: 'Menshevik Victory: Democracy! 🗳️🐻',
  description: 'What if Russia became a democratic socialist republic instead of a Soviet one?',
  divergenceDescription: 'Moderate socialists defeat Lenin\'s coup and establish a parliament.',
  divergenceYear: 1917,
  probability: 35,
  color: '#3B82F6',
  icon: '🗳️',
  image: '/images/chapters/lenin-revolution/timeline_1.png',
  keyEvents: [
    {
      id: 'constituent-assembly',
      year: 1918,
      title: 'Constituent Assembly Meets',
      description: 'The first democratic parliament in Russian history writes a constitution.',
      impact: 'Legitimacy established. Civil war averted.',
      relatedFigures: ['alexander-kerensky'],
      location: { lat: 59.9311, lng: 30.3609 },
      type: 'political'
    },
    {
      id: 'russian-federation',
      year: 1925,
      title: 'Russian Democratic Federation',
      description: 'Russia becomes a federal republic similar to the USA but socialist.',
      impact: 'Peaceful development. No Gulags.',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'no-cold-war',
      category: 'political',
      shortTerm: 'Russia aligns with Western democracies',
      longTerm: 'No Cold War',
      globalImpact: 'A radically different 20th century'
    }
  ],
  butterfly: [
    {
      id: 'hitler-contained',
      trigger: 'Strong Democratic Russia',
      consequence: 'Hitler is crushed early by a united East and West',
      magnitude: 'massive',
      timespan: 50
    }
  ],
  presentDayStatus: 'The Russian Democratic Federation is a wealthy, social-democratic superpower. Moscow is the cultural capital of Europe. Vladimir Lenin is a minor historical footnote. 🇷🇺🗳️'
};

// 2. Trotsky's Victory (Permament Revolution)
const trotskyVictoryTimeline: Timeline = {
  id: 'trotsky-victory',
  title: 'Trotsky Wins: World Revolution! 🌍🔥',
  description: 'What if Trotsky succeeded Lenin instead of Stalin?',
  divergenceDescription: 'Trotsky outmaneuvers Stalin and launches "Permanent Revolution".',
  divergenceYear: 1924,
  probability: 30,
  color: '#DC2626',
  icon: '🌍',
  image: '/images/chapters/lenin-revolution/timeline_3.png',
  keyEvents: [
    {
      id: 'red-army-march',
      year: 1926,
      title: 'The Red Army Marches West',
      description: 'Trotsky invades Poland and Germany to support communist uprisings.',
      impact: 'Total war with the West begins early.',
      relatedFigures: ['leon-trotsky'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'military'
    },
    {
      id: 'global-civil-war',
      year: 1930,
      title: 'Global Civil War',
      description: 'The world burns in a conflict between Revolution and Reaction.',
      impact: 'Capitalism collapses or fascism rises everywhere.',
      relatedFigures: [],
      location: { lat: 0, lng: 0 },
      type: 'battle'
    }
  ],
  consequences: [
    {
      id: 'endless-war',
      category: 'military',
      shortTerm: 'Europe in flames',
      longTerm: 'Society militarized for global conquest',
      globalImpact: 'Civilization teeters on the brink'
    }
  ],
  butterfly: [
    {
      id: 'fascist-britain',
      trigger: 'Fear of Trotsky',
      consequence: 'Britain and US turn to fascism to stop the Red Horde',
      magnitude: 'massive',
      timespan: 50
    }
  ],
  presentDayStatus: 'The United Socialist Republics of Earth (USRE) rule a scarred planet. Mars colonies are named "New Petrograd". The revolution never ends! 🌍🚩'
};

const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'sealed-train',
    title: 'The Sealed Train (1917)',
    text: 'Zurich, 1917. The Germans offer you a train ride to Russia. They want you to destabilize the Tsar. Do you take the ticket?',
    emoji: '🚂',
    background: 'from-gray-800 to-black',
    characters: ['🧔', '🇩🇪', '🎫'],
    sceneType: 'decision',
    timelineYear: 1917,
    timelineEvent: 'Lenin returns to Russia',
    choices: [
      {
        id: 'take-train',
        text: 'Take the train. The end justifies the means.',
        consequence: 'You arrive at Finland Station. The crowd cheers. The revolution finds its leader.',
        modifiers: [{ stat: 'chaos', value: 20 }, { stat: 'diplomacy', value: -10 }],
        nextSceneId: 'july-days'
      },
      {
        id: 'refuse',
        text: 'Refuse German gold. I am no spy!',
        consequence: 'You stay in Switzerland. The Provisional Government stabilizes. Russia becomes a democracy.',
        linkedTimelineId: 'menshevik-victory'
      }
    ]
  },
  {
    id: 'july-days',
    title: 'The July Days (1917)',
    text: 'The workers are rioting. They want "All Power to the Soviets!" But the time is not ripe. If we fail, the Bolsheviks will be crushed.',
    emoji: '🔫',
    background: 'from-orange-800 to-red-900',
    characters: ['🔫', '🏭', '🙊'],
    sceneType: 'decision',
    timelineYear: 1917,
    choices: [
      {
        id: 'calm-crowd',
        text: 'Tell them to go home. We must wait.',
        consequence: 'The crowd is angry but disperses. The party survives to fight another day.',
        modifiers: [{ stat: 'diplomacy', value: 20 }],
        nextSceneId: 'october-revolution'
      },
      {
        id: 'lead-revolt',
        text: 'Lead them! Revolution now!',
        consequence: 'The army crushes the mob. You are arrested. The Bolsheviks are banned.',
        linkedTimelineId: 'menshevik-victory'
      }
    ]
  },
  {
    id: 'october-revolution',
    title: 'Red October (1917)',
    text: 'The Winter Palace is vulnerable. Kerensky is weak. Trotsky has the Red Guards ready. Do we strike tonight?',
    emoji: '🏰',
    background: 'from-red-900 to-purple-900',
    characters: ['🚩', '🏰', '⏰'],
    sceneType: 'battle',
    timelineYear: 1917,
    choices: [
      {
        id: 'seize-power',
        text: 'Storm the Palace! History will not forgive delay!',
        consequence: 'The Ministers are arrested. You have power. Now you must keep it.',
        modifiers: [{ stat: 'strength', value: 50 }, { stat: 'democracy', value: -50 }],
        nextSceneId: 'brest-litovsk'
      },
      {
        id: 'wait-congress',
        text: 'Wait for the Congress of Soviets to vote.',
        consequence: 'The moment passes. Kerensky brings in troops. The coup fails.',
        linkedTimelineId: 'menshevik-victory'
      }
    ]
  },
  {
    id: 'brest-litovsk',
    title: 'Treaty of Brest-Litovsk (1918)',
    text: 'The Germans demand huge territory. Trotsky says "Neither War nor Peace." Bukharin wants "Revolutionary War." What do we sign?',
    emoji: '📜',
    background: 'from-gray-700 to-slate-900',
    characters: ['🇩🇪', '📜', '🌍'],
    sceneType: 'negotiation',
    timelineYear: 1918,
    choices: [
      {
        id: 'sign-treaty',
        text: 'Sign the shameful treaty. We need breathing space.',
        consequence: 'We lose Ukraine, but we save the Revolution. Now we focus on the Civil War.',
        modifiers: [{ stat: 'diplomacy', value: -20 }, { stat: 'strength', value: 10 }],
        nextSceneId: 'succession-crisis'
      },
      {
        id: 'revolutionary-war',
        text: 'Fight! Spark revolution in Germany!',
        consequence: ' The German army advances. Petrograd falls. The revolution is crushed.',
        // Game Over
      }
    ]
  },
  {
    id: 'succession-crisis',
    title: 'Lenin\'s Testament (1924)',
    text: 'You are dying. You must choose a successor. Stalin is too rude. Trotsky is too arrogant. Bukharin is too soft. Who gets the ring?',
    emoji: '⚰️',
    background: 'from-black to-red-950',
    characters: ['🐺', '🦁', '🐻'],
    sceneType: 'decision',
    timelineYear: 1924,
    choices: [
      {
        id: 'stalin',
        text: 'Let Stalin take charge. He gets things done.',
        consequence: 'The Man of Steel rises. The Purges begin along with industrialization.',
        modifiers: [{ stat: 'strength', value: 50 }, { stat: 'freedom', value: -100 }],
        // Historical
      },
      {
        id: 'trotsky',
        text: 'Endorse Trotsky. The revolution must expand.',
        consequence: 'Trotsky purges Stalin. The Red Army prepares for global war.',
        linkedTimelineId: 'trotsky-victory'
      },
      {
        id: 'collective',
        text: 'Demand collective leadership. No one man should rule.',
        consequence: 'Stalin ignores you. He wins anyway.',
        // Illusion of choice - leads to history usually, or maybe Bukharin path if we want
      }
    ]
  }
];

// Main chapter data
export const leninRevolutionChapter: Chapter = {
  id: 'lenin-revolution',
  title: 'Russian Revolution',
  period: '1917',
  startYear: 1914,
  endYear: 1924,
  description: 'The sealed train, the storming of the Winter Palace, and the 10 days that shook the world. ⚒️⭐',
  historicalContext: 'Russia in 1917...',
  keyFigures,
  divergencePoint: 'October Revolution',
  divergenceYear: 1917,
  alternativeTimelines: [
    menshevikVictoryTimeline,
    trotskyVictoryTimeline,
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/lenin-revolution/main.png',
  icon: '⭐',
  backgroundColor: 'from-red-600 to-yellow-600'
};