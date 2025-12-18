import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures
const keyFigures: Person[] = [
  {
    id: 'abraham-lincoln',
    name: 'Abraham Lincoln',
    role: 'The Great Emancipator',
    born: 1809,
    died: 1865,
    description: 'Saved the Union, freed the slaves, and kept the country together during its darkest hour.',
    image: '/images/chapters/lincoln-era/people/abraham-lincoln.png'
  },
  {
    id: 'robert-e-lee',
    name: 'Robert E. Lee',
    role: 'Confederate General',
    born: 1807,
    died: 1870,
    description: 'A brilliant tactician who fought for the wrong cause.',
    image: '/images/chapters/lincoln-era/people/robert-e-lee.png'
  },
  {
    id: 'ulysses-s-grant',
    name: 'Ulysses S. Grant',
    role: 'Union General',
    born: 1822,
    died: 1885,
    description: 'The man who won the war. Unconditional Surrender Grant.',
    image: '/images/chapters/lincoln-era/people/ulysses-s-grant.png'
  },
  {
    id: 'frederick-douglass',
    name: 'Frederick Douglass',
    role: 'Abolitionist Leader',
    born: 1818,
    died: 1895,
    description: 'Escaped slave who became the most powerful voice for freedom.',
    image: '/images/chapters/lincoln-era/people/frederick-douglass.png'
  }
];

// 1. Lincoln Survives (Reconstruction Success)
const lincolnSurvivesTimeline: Timeline = {
  id: 'lincoln-survives',
  title: 'Lincoln Lives 🎩❤️',
  description: 'Lincoln survives the assassination and leads Reconstruction.',
  divergenceDescription: 'Booth misses.',
  divergenceYear: 1865,
  probability: 25,
  color: '#10B981',
  icon: '🎩',
  image: '/images/chapters/lincoln-era/timeline_1.png',
  keyEvents: [
    {
      id: 'gentle-reconstruction',
      year: 1866,
      title: 'Malice Toward None',
      description: 'Lincoln manages to bring the South back without the bitterness of Radical Reconstruction.',
      impact: 'Healing.',
      relatedFigures: ['abraham-lincoln'],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'civil-rights-early',
      category: 'social',
      shortTerm: 'Better integration',
      longTerm: 'Jim Crow is avoided',
      globalImpact: 'A more equal America earlier'
    }
  ],
  butterfly: [
    {
      id: 'superpower-usa',
      trigger: 'United America',
      consequence: 'USA becomes superpower by 1890',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'Lincoln is remembered as the greatest American. Race relations are far ahead of our timeline. 🇺🇸✨'
};

// 2. Peaceful Abolition (Compromise)
const peacefulAbolitionTimeline: Timeline = {
  id: 'peaceful-abolition',
  title: 'The Great Compromise 🕊️💰',
  description: 'Slavery ends without a war via paid emancipation.',
  divergenceDescription: 'Lincoln buys the slaves\' freedom.',
  divergenceYear: 1861,
  probability: 10,
  color: '#3B82F6',
  icon: '🕊️',
  image: '/images/chapters/lincoln-era/timeline_2.png',
  keyEvents: [
    {
      id: 'buyout',
      year: 1862,
      title: 'The Buyout',
      description: 'The Federal government pays $400 per slave. The South accepts.',
      impact: 'No dead soldiers.',
      relatedFigures: ['abraham-lincoln'],
      location: { lat: 0, lng: 0 },
      type: 'economic'
    }
  ],
  consequences: [
    {
      id: 'slow-progress',
      category: 'social',
      shortTerm: 'Slavery ends',
      longTerm: 'Segregation persists but without the blood feud',
      globalImpact: 'Peaceful transition'
    }
  ],
  butterfly: [
    {
      id: 'rich-south',
      trigger: 'No war destruction',
      consequence: 'The South remains wealthy',
      magnitude: 'medium',
      timespan: 100
    }
  ],
  presentDayStatus: 'The Civil War is a "What If" scenario in books. America is less militarized. 🕊️💵'
};

// 3. Confederate Victory (Separation)
const confederacyWinsTimeline: Timeline = {
  id: 'confederacy-wins',
  title: 'Southern Victory 🏴⚔️',
  description: 'The CSA wins independence.',
  divergenceDescription: 'Lee wins at Gettysburg.',
  divergenceYear: 1863,
  probability: 20,
  color: '#6B7280',
  icon: '🏴',
  image: '/images/chapters/lincoln-era/timeline_3.png',
  keyEvents: [
    {
      id: 'gettysburg-win',
      year: 1863,
      title: 'High Water Mark',
      description: 'Pickett\'s Charge succeeds. The Union army is broken.',
      impact: 'Washington falls.',
      relatedFigures: ['robert-e-lee'],
      location: { lat: 39.8309, lng: -77.2361 },
      type: 'military'
    }
  ],
  consequences: [
    {
      id: 'two-nations',
      category: 'political',
      shortTerm: 'CSA independence',
      longTerm: 'North America divided',
      globalImpact: 'Weakened America'
    }
  ],
  butterfly: [
    {
      id: 'ww1-allies',
      trigger: 'Division',
      consequence: 'USA backs Germany, CSA backs Britain',
      magnitude: 'massive',
      timespan: 50
    }
  ],
  presentDayStatus: 'The USA and CSA share a heavily fortified border. You need a passport to go to Atlanta. Slavery ended in the 1890s, but Apartheid lasted until 1990. 🇺🇸🏴'
};

const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'election-1860',
    title: 'The Election of 1860',
    text: 'You are Abraham Lincoln. The South threatens to secede if you win. Your advisors suggest a compromise.',
    emoji: '🗳️',
    background: 'from-blue-900 to-gray-800',
    characters: ['🎩', '🗳️', '🐍'],
    sceneType: 'decision',
    timelineYear: 1860,
    timelineEvent: 'Secession Crisis',
    choices: [
      {
        id: 'hold-firm',
        text: 'No compromise on slavery expansion.',
        consequence: 'You win, but the South secedes. War looms.',
        modifiers: [{ stat: 'strength', value: 30 }],
        nextSceneId: 'fort-sumter'
      },
      {
        id: 'buyout-plan',
        text: 'Propose a massive buyout of all slaves.',
        consequence: 'It is expensive, but cheaper than war. The Border States listen.',
        linkedTimelineId: 'peaceful-abolition'
      }
    ]
  },
  {
    id: 'fort-sumter',
    title: 'Fort Sumter (1861)',
    text: 'Major Anderson is trapped. The Confederates demand surrender. If you send ships, they will fire.',
    emoji: '🏰',
    background: 'from-red-900 to-black',
    characters: ['🏰', '🚢', '💣'],
    sceneType: 'battle',
    timelineYear: 1861,
    choices: [
      {
        id: 'resupply',
        text: 'Send the fleet. Defend the flag.',
        consequence: 'The South fires the first shot. The Civil War begins.',
        modifiers: [{ stat: 'strength', value: 20 }],
        nextSceneId: 'emancipation'
      },
      {
        id: 'surrender',
        text: 'Let them have the fort. Avoid blood.',
        consequence: 'Weakness invites aggression. The South secedes peacefully.',
        linkedTimelineId: 'confederacy-wins' // Weak Union
      }
    ]
  },
  {
    id: 'emancipation',
    title: 'The Proclamation (1862)',
    text: 'The war is going badly. We need a moral cause. We need to free the slaves.',
    emoji: '⛓️',
    background: 'from-purple-900 to-black',
    characters: ['⛓️', '📜', '⚖️'],
    sceneType: 'decision',
    timelineYear: 1862,
    choices: [
      {
        id: 'sign',
        text: 'Sign the Emancipation Proclamation.',
        consequence: 'The war becomes a crusade for freedom. Europe stays out.',
        modifiers: [{ stat: 'freedom', value: 100 }],
        nextSceneId: 'gettysburg'
      },
      {
        id: 'delay',
        text: 'Wait. It is too radical.',
        consequence: 'Britain recognizes the Confederacy. We lose the initiative.',
        linkedTimelineId: 'confederacy-wins'
      }
    ]
  },
  {
    id: 'gettysburg',
    title: 'Gettysburg (1863)',
    text: 'Lee has invaded the North. Everything depends on this battle. General Meade asks for orders.',
    emoji: '⚔️',
    background: 'from-gray-700 to-red-900',
    characters: ['⚔️', '🐎', '🇺🇸'],
    sceneType: 'battle',
    timelineYear: 1863,
    choices: [
      {
        id: 'hold-line',
        text: 'Defend the high ground at all costs.',
        consequence: 'Pickett\'s Charge fails. The Union is saved.',
        modifiers: [{ stat: 'strength', value: 50 }],
        nextSceneId: 'ford-theater'
      },
      {
        id: 'retreat',
        text: 'Retreat to a better position.',
        consequence: 'Lee takes the heights. He marches on Washington.',
        linkedTimelineId: 'confederacy-wins'
      }
    ]
  },
  {
    id: 'ford-theater',
    title: 'Ford\'s Theatre (1865)',
    text: 'The war is won. Mary wants to see a play. You are very tired.',
    emoji: '🎭',
    background: 'from-red-950 to-black',
    characters: ['🎭', '🔫', '😴'],
    sceneType: 'decision',
    timelineYear: 1865,
    choices: [
      {
        id: 'go',
        text: 'Go to the play. The people expect it.',
        consequence: 'Booth enters the box. Thus always to tyrants.',
        // Historical End
      },
      {
        id: 'stay',
        text: 'Stay home. Safety first.',
        consequence: 'Booth is caught waiting outside. You survive to rebuild the nation.',
        linkedTimelineId: 'lincoln-survives'
      }
    ]
  }
];

// Main chapter data
export const lincolnEraChapter: Chapter = {
  id: 'lincoln-era',
  title: 'Lincoln & Civil War',
  period: '1860-1865',
  startYear: 1860,
  endYear: 1865,
  description: 'A House Divided. 🎩⚔️',
  historicalContext: 'The struggle for the soul of America.',
  keyFigures,
  divergencePoint: 'Election of 1860',
  divergenceYear: 1860,
  alternativeTimelines: [
    lincolnSurvivesTimeline,
    peacefulAbolitionTimeline,
    confederacyWinsTimeline,
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/lincoln-era/main.png',
  icon: '🎩',
  backgroundColor: 'from-blue-900 to-gray-700'
};