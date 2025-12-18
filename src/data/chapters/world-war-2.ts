import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures with global scope and dramatic descriptions
const keyFigures: Person[] = [
  {
    id: 'winston-churchill',
    name: 'Winston Churchill',
    role: 'The Bulldog Who Never Gave Up',
    born: 1874,
    died: 1965,
    description: 'The ultimate wartime leader with the best one-liners! 🐕⚡ This cigar-smoking, brandy-drinking, speech-giving legend basically out-stubborned Hitler.',
    image: '/images/chapters/world-war-2/people/winston-churchill.png'
  },
  {
    id: 'franklin-roosevelt',
    name: 'Franklin D. Roosevelt',
    role: 'The New Deal President & War Leader',
    born: 1882,
    died: 1945,
    description: 'The president who couldn\'t walk but made America run! 🦅💪 Led America from Depression to victory while managing Stalin and Churchill.',
    image: '/images/chapters/world-war-2/people/franklin-d-roosevelt.png'
  },
  {
    id: 'joseph-stalin',
    name: 'Joseph Stalin',
    role: 'The Georgian Steel Who Broke Hitler',
    born: 1878,
    died: 1953,
    description: 'The paranoid dictator who somehow became democracy\'s ally! ⚔️🐻 Brutal at home, essential against Hitler.',
    image: '/images/chapters/world-war-2/people/joseph-stalin.png'
  },
  {
    id: 'dwight-eisenhower',
    name: 'Dwight D. Eisenhower',
    role: 'The Supreme Commander & D-Day Master',
    born: 1890,
    died: 1969,
    description: 'The Kansas farm boy who organized the biggest invasion in history! 🏖️⚔️ Diplomatic genius!',
    image: '/images/chapters/world-war-2/people/dwight-d-eisenhower.png'
  },
  {
    id: 'george-patton',
    name: 'George S. Patton',
    role: 'Old Blood & Guts Tank Commander',
    born: 1885,
    died: 1945,
    description: 'The general who thought he was a reincarnated warrior! 🏺⚔️ Loved tanks, hated paperwork. "Lead me, follow me, or get out of my way!"',
    image: '/images/chapters/world-war-2/people/george-s-patton.png'
  },
  {
    id: 'bernard-montgomery',
    name: 'Bernard Montgomery',
    role: 'The Desert Fox Hunter & British Bulldog',
    born: 1887,
    died: 1976,
    description: 'The methodical British general who beat Rommel! 🏜️🦊 Careful planner, El Alamein was his masterpiece!',
    image: '/images/chapters/world-war-2/people/bernard-montgomery.png'
  },
  {
    id: 'erwin-rommel',
    name: 'Erwin Rommel',
    role: 'The Desert Fox & Honorable Enemy',
    born: 1891,
    died: 1944,
    description: 'The German general even his enemies respected! 🏜️🦊 Master of tank warfare, eventually plotted against Hitler.',
    image: '/images/chapters/world-war-2/people/erwin-rommel.png'
  },
  {
    id: 'hirohito',
    name: 'Emperor Hirohito',
    role: 'The Silent Emperor Who Ended the War',
    born: 1901,
    died: 1989,
    description: 'The reluctant emperor who finally said "enough!" 🌸⚔️ Made the hardest decision of his life: surrender.',
    image: '/images/chapters/world-war-2/people/emperor-hirohito.png'
  }
];

// 1. No Appeasement
const noAppeasementTimeline: Timeline = {
  id: 'no-appeasement',
  title: 'No Appeasement: Churchill is Right! 🦁⚔️',
  description: 'What if Britain and France had stopped Hitler at Munich in 1938 instead of appeasing him?',
  divergenceDescription: 'Britain and France reject Munich Agreement and declare war when Germany threatens Czechoslovakia.',
  divergenceYear: 1938,
  probability: 45,
  color: '#1E40AF',
  icon: '🦁',
  image: '/images/chapters/world-war-2/timeline_1.png',
  keyEvents: [
    {
      id: 'munich-crisis-war-1938',
      year: 1938,
      title: 'Munich Crisis Triggers War',
      description: 'Britain and France reject Munich Agreement. WWII begins a year early!',
      impact: 'Germany is less prepared. Czechoslovakia fights.',
      relatedFigures: ['winston-churchill'],
      location: { lat: 48.1351, lng: 11.5820 },
      type: 'political'
    },
    {
      id: 'german-defeat-1940',
      year: 1940,
      title: 'Germany Collapses',
      description: 'Facing combined forces, the Nazis fall in 2 years.',
      impact: 'Holocaust prevented. Democracy restored.',
      relatedFigures: [],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'holocaust-prevented',
      category: 'social',
      shortTerm: 'Early war prevents full implementation of Holocaust',
      longTerm: 'Six million Jewish lives saved',
      globalImpact: 'Different understanding of genocide'
    }
  ],
  butterfly: [
    {
      id: 'no-atomic-weapons',
      trigger: 'Shorter war means no Manhattan Project',
      consequence: 'Nuclear weapons developed later, possibly never used',
      magnitude: 'massive',
      timespan: 100
    }
  ],
  presentDayStatus: 'The "Short War" of 1938-1940 saved millions. September 30th is "Courage Day". The Munich Conference Room is a museum: "Never Again Appease Evil." 🦁🕊️'
};

// 2. D-Day Fails
const dDayFailsTimeline: Timeline = {
  id: 'd-day-fails',
  title: 'D-Day Disaster: Overlord Fails! 💀🏖️',
  description: 'What if the D-Day landings had failed catastrophically?',
  divergenceDescription: 'Bad weather and German preparation doom the invasion.',
  divergenceYear: 1944,
  probability: 25,
  color: '#DC2626',
  icon: '💀',
  image: '/images/chapters/world-war-2/timeline_2.png',
  keyEvents: [
    {
      id: 'd-day-disaster-1944',
      year: 1944,
      title: 'D-Day Disaster',
      description: 'Aliied forces are pushed back into the sea. 50,000 casualties.',
      impact: 'Destroys Allied invasion capability.',
      relatedFigures: ['dwight-eisenhower'],
      location: { lat: 49.3390, lng: -0.4894 },
      type: 'military'
    },
    {
      id: 'soviet-europe',
      year: 1946,
      title: 'Soviet Europe',
      description: 'The Red Army liberates all of Europe alone.',
      impact: 'Communist Iron Curtain extends to the Atlantic.',
      relatedFigures: ['joseph-stalin'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'soviet-dominance',
      category: 'political',
      shortTerm: 'Soviet Union controls France and Germany',
      longTerm: 'NATO never forms',
      globalImpact: 'A Red Europe changes the Cold War entirely'
    }
  ],
  butterfly: [
    {
      id: 'communist-britain',
      trigger: 'Isolated UK faces communist continent',
      consequence: 'UK eventually turns socialist under pressure',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'The Soviet European Federation spans from Lisbon to Moscow. Normandy is a solemn memorial to the "Lost Army". The Cold War was between the USA and a united Red Europe. 💔🌹'
};

// 3. Japan Wins Pacific
const japanWinsPacificTimeline: Timeline = {
  id: 'japan-wins-pacific',
  title: 'Japanese Pacific Empire 🌅🏴‍☠️',
  description: 'What if Japan destroyed the US fleet at Midway?',
  divergenceDescription: 'Japan wins Midway, invades Hawaii and Australia.',
  divergenceYear: 1942,
  probability: 20,
  color: '#EF4444',
  icon: '🌅',
  image: '/images/chapters/world-war-2/timeline_3.png',
  keyEvents: [
    {
      id: 'midway-victory',
      year: 1942,
      title: 'Japan Wins Midway',
      description: 'US carriers are sunk. The Pacific is open.',
      impact: 'US forced to negotiate.',
      relatedFigures: [],
      location: { lat: 28.2072, lng: -177.3735 },
      type: 'military'
    },
    {
      id: 'treaty-honolulu',
      year: 1943,
      title: 'Treaty of Honolulu',
      description: 'US recognizes Japanese dominance in Asia.',
      impact: 'Japanese Empire secures resources.',
      relatedFigures: ['hirohito'],
      location: { lat: 21.3069, lng: -157.8583 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'asian-empire',
      category: 'political',
      shortTerm: 'Japan rules Asia',
      longTerm: 'Decolonization happens under Japanese terms',
      globalImpact: 'Tri-polar world (US, Germany/USSR, Japan)'
    }
  ],
  butterfly: [
    {
      id: 'tech-stagnation',
      trigger: 'Fragmented world markets',
      consequence: 'Slower technological growth globally',
      magnitude: 'medium',
      timespan: 50
    }
  ],
  presentDayStatus: 'The Greater East Asia Co-Prosperity Sphere is a superpower. Japanese is the lingua franca of Asia. The world is divided into three uneasy blocs. 🌸🕊️'
};

const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'munich-conference',
    title: 'The Munich Crisis (1938)',
    text: 'Hitler demands the Sudetenland. Chamberlain wants peace at any cost. You are a British MP advising the Prime Minister. Do you choose shame or war?',
    emoji: '🦁',
    background: 'from-blue-900 to-slate-900',
    characters: ['🇬🇧', '🇩🇪', '🕊️'],
    sceneType: 'negotiation',
    timelineYear: 1938,
    timelineEvent: 'Munich Agreement',
    choices: [
      {
        id: 'appease',
        text: 'Sign the agreement. "Peace for our time!"',
        consequence: 'You bought a year of peace, but Hitler is emboldened. War is inevitable.',
        modifiers: [{ stat: 'diplomacy', value: 20 }, { stat: 'strength', value: -20 }],
        nextSceneId: 'poland-invasion'
      },
      {
        id: 'resist',
        text: 'Reject the demands. Mobilize the fleet!',
        consequence: 'Hitler is shocked. The German generals panic. War begins, but you are ready.',
        modifiers: [{ stat: 'strength', value: 50 }, { stat: 'chaos', value: 20 }],
        linkedTimelineId: 'no-appeasement'
      }
    ]
  },
  {
    id: 'poland-invasion',
    title: 'Blitzkrieg (1939)',
    text: 'Hitler invades Poland. The tactics are new: fast tanks, screaming dive bombers. Your allies are slow to move. The French stay behind the Maginot Line.',
    emoji: '⚔️',
    background: 'from-gray-800 to-red-900',
    characters: ['🇵🇱', '🇩🇪', '🛡️'],
    sceneType: 'battle',
    timelineYear: 1939,
    choices: [
      {
        id: 'dig-in',
        text: 'Order Polish forces to dig in and wait for help.',
        consequence: 'They are encircled and destroyed. Poland falls in weeks.',
        modifiers: [{ stat: 'strength', value: -10 }],
        nextSceneId: 'battle-of-britain'
      },
      {
        id: 'attack-west',
        text: 'Demand French attack on the Rhine immediately.',
        consequence: 'The French advance cautiously, then retreat. The "Phony War" begins.',
        modifiers: [{ stat: 'diplomacy', value: -10 }],
        nextSceneId: 'battle-of-britain'
      }
    ]
  },
  {
    id: 'battle-of-britain',
    title: 'The Darkest Hour (1940)',
    text: 'France has fallen. Britain stands alone. The Luftwaffe is pounding London. You must allocate your precious Spitfires.',
    emoji: '✈️',
    background: 'from-blue-800 to-slate-800',
    characters: ['🇬🇧', '🇩🇪', '🔥'],
    sceneType: 'battle',
    timelineYear: 1940,
    choices: [
      {
        id: 'radar-defense',
        text: 'Defend the radar stations and airfields at all costs.',
        consequence: 'Strategic brilliance! The Luftwaffe is bled dry. Invasion is cancelled.',
        modifiers: [{ stat: 'strength', value: 20 }],
        nextSceneId: 'pearl-harbor'
      },
      {
        id: 'vengeance',
        text: 'Bomb Berlin in retaliation for London.',
        consequence: 'Hitler strikes back at cities, sparing your airfields. A grim exchange, but you survive.',
        modifiers: [{ stat: 'chaos', value: 30 }],
        nextSceneId: 'pearl-harbor'
      }
    ]
  },
  {
    id: 'pearl-harbor',
    title: 'Day of Infamy (1941)',
    text: 'Reports coming in. Japanese planes over Hawaii. Battleship Row is burning. Admiral, what are your orders?',
    emoji: '🔥',
    background: 'from-orange-700 to-red-900',
    characters: ['🇺🇸', '🇯🇵', '🚢'],
    sceneType: 'battle',
    timelineYear: 1941,
    choices: [
      {
        id: 'save-carriers',
        text: 'Ensure the carriers are at sea!',
        consequence: 'The battleships are lost, but your strike force survives. You can fight back.',
        modifiers: [{ stat: 'strength', value: 10 }],
        nextSceneId: 'midway-trap'
      },
      {
        id: 'launch-fighters',
        text: 'Scramble everything! Defend the harbor!',
        consequence: 'Too little, too late. The devastation is total.',
        modifiers: [{ stat: 'strength', value: -30 }],
        nextSceneId: 'midway-trap'
      }
    ]
  },
  {
    id: 'midway-trap',
    title: 'The Trap at Midway (1942)',
    text: 'We have broken the Japanese code. We know they are targeting Midway. We can ambush them, or play it safe.',
    emoji: '🌊',
    background: 'from-blue-600 to-blue-900',
    characters: ['🚢', '📡', '🇯🇵'],
    sceneType: 'decision',
    timelineYear: 1942,
    choices: [
      {
        id: 'ambush',
        text: 'Launch everything. Catch them with bombs on deck.',
        consequence: 'Four victories in one day! The tide turns.',
        modifiers: [{ stat: 'strength', value: 40 }],
        nextSceneId: 'd-day-planning'
      },
      {
        id: 'caution',
        text: 'Hold back reserves. Wait for confirmation.',
        consequence: 'You hesitate. The Japanese spot you first. Your fleet is sunk.',
        linkedTimelineId: 'japan-wins-pacific'
      }
    ]
  },
  {
    id: 'd-day-planning',
    title: 'The Longest Day (1944)',
    text: 'Ike, the weather is terrible. The seas are rough. But the moon is right. If we don\'t go now, we wait a month.',
    emoji: '🏖️',
    background: 'from-green-800 to-slate-800',
    characters: ['🇺🇸', '🌧️', '🎲'],
    sceneType: 'decision',
    timelineYear: 1944,
    choices: [
      {
        id: 'go',
        text: ' "OK, let\'s go." Launch the invasion.',
        consequence: 'The gamble pays off. You catch the Germans sleeping. The liberation begins.',
        modifiers: [{ stat: 'freedom', value: 50 }],
        nextSceneId: 'atomic-decision'
      },
      {
        id: 'delay',
        text: 'Too risky. Postpone for clear skies.',
        consequence: 'The clear skies never come. When you finally go, Rommel is waiting.',
        linkedTimelineId: 'd-day-fails'
      }
    ]
  },
  {
    id: 'atomic-decision',
    title: 'The Destroyer of Worlds (1945)',
    text: 'The gadget works. Truman asks for your counsel. Invasion means 1 million casualties. The Bomb means... devastation.',
    emoji: '☢️',
    background: 'from-yellow-800 to-red-950',
    characters: ['🇺🇸', '☢️', '🕊️'],
    sceneType: 'decision',
    timelineYear: 1945,
    choices: [
      {
        id: 'drop-bomb',
        text: 'Drop it. End the war now.',
        consequence: 'The cities vanish. Japan surrenders. The Nuclear Age begins.',
        modifiers: [{ stat: 'strength', value: 50 }, { stat: 'chaos', value: 50 }],
        // Historical End
      },
      {
        id: 'demonstration',
        text: 'Demonstrate it on a deserted island first.',
        consequence: 'The Japanese hardliners are unimpressed. "A trick," they say. The war drags on.',
        modifiers: [{ stat: 'diplomacy', value: 30 }, { stat: 'strength', value: -10 }],
        nextSceneId: 'operation-downfall'
      }
    ]
  },
  {
    id: 'operation-downfall',
    title: 'Invasion of Japan (1945)',
    text: 'The demonstration failed. You must invade the Home Islands. Every civilian is armed with a spear.',
    emoji: '🩸',
    background: 'from-red-900 to-black',
    characters: ['🇺🇸', '🇯🇵', '⚔️'],
    sceneType: 'battle',
    choices: [
      {
        id: 'invasion',
        text: 'Proceed with the invasion.',
        consequence: 'Victory, but at the cost of millions. Japan is a ruin. Resentment lasts for centuries.',
        modifiers: [{ stat: 'chaos', value: 100 }, { stat: 'freedom', value: -50 }],
        // Grim End
      }
    ]
  }
];

// Main chapter data
export const worldWarTwoChapter: Chapter = {
  id: 'world-war-2',
  title: 'World War II',
  period: '1939-1945',
  startYear: 1939,
  endYear: 1945,
  description: 'The Greatest Show on Earth: The War That Changed Everything! 🌍💥 Watch democracy, fascism, and communism duke it out.',
  historicalContext: 'By 1939, the world was a powder keg. Hitler was gobbling up Europe, Japan was rampaging through Asia.',
  keyFigures,
  divergencePoint: 'Munich Conference 1938',
  divergenceYear: 1938,
  alternativeTimelines: [
    noAppeasementTimeline,
    dDayFailsTimeline,
    japanWinsPacificTimeline,
  ],
  mainImage: '/images/chapters/world-war-2/main.png',
  icon: '🌍',
  backgroundColor: 'from-blue-800 to-red-900',
  interactiveScenarios
};