import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures
const keyFigures: Person[] = [
  {
    id: 'kaiser-wilhelm-ii',
    name: 'Kaiser Wilhelm II',
    role: 'The Emperor',
    born: 1859,
    died: 1941,
    description: 'The last German Emperor. Wanted a "Place in the Sun". Got a world war instead.',
    image: '/images/chapters/world-war-1/people/kaiser-wilhelm-ii.png'
  },
  {
    id: 'archduke-franz-ferdinand',
    name: 'Franz Ferdinand',
    role: 'The Target',
    born: 1863,
    died: 1914,
    description: 'Austrian heir. His death triggered the apocalypse.',
    image: '/images/chapters/world-war-1/people/archduke-franz-ferdinand.png'
  },
  {
    id: 'woodrow-wilson',
    name: 'Woodrow Wilson',
    role: 'The Idealist',
    born: 1856,
    died: 1924,
    description: 'American President. Wanted to make the world "safe for democracy".',
    image: '/images/chapters/world-war-1/people/woodrow-wilson.png'
  }
];

// 1. The Long Peace (No War)
const longPeaceTimeline: Timeline = {
  id: 'long-peace',
  title: 'The Long Peace 🕊️🌍',
  description: 'The assassination fails. The 20th century is peaceful.',
  divergenceDescription: 'The driver takes the correct turn in Sarajevo.',
  divergenceYear: 1914,
  probability: 10,
  color: '#10B981',
  icon: '🕊️',
  image: '/images/chapters/world-war-1/timeline_1.png',
  keyEvents: [
    {
      id: 'federal-austria',
      year: 1920,
      title: 'United States of Greater Austria',
      description: 'Franz Ferdinand reforms the empire into a federation of equals.',
      impact: 'Stability in the Balkans.',
      relatedFigures: ['archduke-franz-ferdinand'],
      location: { lat: 48.2082, lng: 16.3738 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'golden-age',
      category: 'cultural',
      shortTerm: 'Continued Belle Époque',
      longTerm: 'Technological progress without war trauma',
      globalImpact: 'European dominance continues'
    }
  ],
  butterfly: [
    {
      id: 'slow-decolonization',
      trigger: 'Strong Europe',
      consequence: 'Colonial empires last until 2000',
      magnitude: 'large',
      timespan: 100
    }
  ],
  presentDayStatus: 'Europe is a collection of constitutional monarchies. Biplanes are still popular for sport. The world is nostalgic for an era that never ended. 🎩🚂'
};

// 2. German Victory (Kaiserreich)
const germanVictoryTimeline: Timeline = {
  id: 'german-victory',
  title: 'Pax Germanica 🇩🇪👑',
  description: 'Germany wins the war in 1914.',
  divergenceDescription: 'The Schlieffen Plan encircles Paris successfully.',
  divergenceYear: 1914,
  probability: 20,
  color: '#1F2937',
  icon: '🇩🇪',
  image: '/images/chapters/world-war-1/timeline_2.png',
  keyEvents: [
    {
      id: 'fall-of-paris',
      year: 1914,
      title: 'Fall of Paris',
      description: 'The German army marches under the Arc de Triomphe.',
      impact: 'French surrender.',
      relatedFigures: [],
      location: { lat: 0, lng: 0 },
      type: 'military'
    }
  ],
  consequences: [
    {
      id: 'mitteleuropa',
      category: 'political',
      shortTerm: 'German dominance',
      longTerm: 'No WWII, no Hitler',
      globalImpact: 'Germany leads the world'
    }
  ],
  butterfly: [
    {
      id: 'syndicalism',
      trigger: 'French defeat',
      consequence: 'France and Britain become Syndicalist (Communist)',
      magnitude: 'massive',
      timespan: 50
    }
  ],
  presentDayStatus: 'The German Empire is the world\'s superpower. Berlin is the capital of the world. 🌍🏰'
};

// 3. Negotiated Peace (1917)
const negotiatedPeaceTimeline: Timeline = {
  id: 'negotiated-peace',
  title: 'Peace Without Victory 🤝🏳️',
  description: 'The war ends in 1917 without a clear winner.',
  divergenceDescription: 'The US stays out. Exhaustion leads to truce.',
  divergenceYear: 1917,
  probability: 30,
  color: '#6B7280',
  icon: '🏳️',
  image: '/images/chapters/world-war-1/timeline_3.png',
  keyEvents: [
    {
      id: 'peace-treaty',
      year: 1917,
      title: 'Treaty of Stockholm',
      description: 'Status quo ante bellum. Everyone goes home.',
      impact: 'Monarchies survive.',
      relatedFigures: [],
      location: { lat: 0, lng: 0 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'bitter-peace',
      category: 'political',
      shortTerm: 'Unresolved issues',
      longTerm: 'Cold War between Monarchies and Democracies',
      globalImpact: 'A weary world'
    }
  ],
  butterfly: [
    {
      id: 'russian-survival',
      trigger: 'Early peace',
      consequence: 'Russian weak democracy survives',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'The world is multipolar. The League of Nations is actually effective. 🌐'
};

const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'sarajevo',
    title: 'The Wrong Turn (1914)',
    text: 'Sarajevo. The Archduke\'s driver has taken a wrong turn. He stops to reverse. Gavrilo Princip is standing at the corner with a pistol.',
    emoji: '🔫',
    background: 'from-gray-800 to-red-900',
    characters: ['👑', '🚗', '🔫'],
    sceneType: 'decision',
    timelineYear: 1914,
    timelineEvent: 'The Assassination',
    choices: [
      {
        id: 'reverse',
        text: 'Reverse the car (Historical).',
        consequence: 'Princip fires. The Archduke dies. War begins.',
        modifiers: [{ stat: 'chaos', value: 50 }],
        nextSceneId: 'schlieffen'
      },
      {
        id: 'speed-away',
        text: 'Hit the gas! Go forward!',
        consequence: 'Princip misses his chance. The Archduke survives.',
        linkedTimelineId: 'long-peace'
      }
    ]
  },
  {
    id: 'schlieffen',
    title: 'The Schlieffen Plan (1914)',
    text: 'Belgium. The German army is marching on Paris. The plan requires speed. But the Belgians are resisting.',
    emoji: '⚔️',
    background: 'from-black to-gray-700',
    characters: ['⚔️', '🏰', '🗺️'],
    sceneType: 'battle',
    timelineYear: 1914,
    choices: [
      {
        id: 'turn',
        text: 'Turn inwards. Attack the French army.',
        consequence: 'The Miracle of the Marne. The trench lines form.',
        modifiers: [{ stat: 'strength', value: 20 }],
        nextSceneId: 'zimmermann'
      },
      {
        id: 'encircle',
        text: 'Ignore the flank. March on Paris!',
        consequence: 'A gamble. But it pays off. Paris falls.',
        linkedTimelineId: 'german-victory'
      }
    ]
  },
  {
    id: 'zimmermann',
    title: 'The Telegram (1917)',
    text: 'We are starving. The U-boats are our only hope. Should we ask Mexico to attack the USA?',
    emoji: '📮',
    background: 'from-blue-900 to-black',
    characters: ['📮', '🇺🇸', '🇲🇽'],
    sceneType: 'decision',
    timelineYear: 1917,
    choices: [
      {
        id: 'send',
        text: 'Send the telegram. Unrestricted submarine warfare.',
        consequence: 'The US decrypts it and declares war. We are doomed.',
        // Historical
        nextSceneId: 'armistice'
      },
      {
        id: 'cancel',
        text: 'Cancel the plan. It is too risky.',
        consequence: 'The US stays neutral. The war ends in a stalemate.',
        linkedTimelineId: 'negotiated-peace'
      }
    ]
  },
  {
    id: 'armistice',
    title: 'The Railway Carriage (1918)',
    text: 'Foch dictates terms. Germany must surrender heavy weapons, navy, and accept guilt.',
    emoji: '🚂',
    background: 'from-green-900 to-gray-800',
    characters: ['🚂', '✍️', '🤬'],
    sceneType: 'negotiation',
    timelineYear: 1918,
    choices: [
      {
        id: 'accept',
        text: 'Accept all terms. End the suffering.',
        consequence: 'Germany is humiliated. Seeds of WWII are sown.',
        // Historical End
      },
      {
        id: 'refuse',
        text: 'Refuse. Fight to the end.',
        consequence: 'The Allies invade Germany. Total destruction.',
        // Even worse outcome
      }
    ]
  }
];

// Main chapter data
export const worldWarOneChapter: Chapter = {
  id: 'world-war-1',
  title: 'World War I',
  period: '1914-1918',
  startYear: 1914,
  endYear: 1918,
  description: 'The suicide of Europe. ⚔️🥀',
  historicalContext: 'A family feud that killed millions.',
  keyFigures,
  divergencePoint: 'Assassination',
  divergenceYear: 1914,
  alternativeTimelines: [
    longPeaceTimeline,
    germanVictoryTimeline,
    negotiatedPeaceTimeline,
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/world-war-1/main.png',
  icon: '⚔️',
  backgroundColor: 'from-gray-700 to-red-900'
};