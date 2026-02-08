import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures
const keyFigures: Person[] = [
  {
    id: 'adolf-hitler',
    name: 'Adolf Hitler',
    role: 'The Dictator',
    born: 1889,
    died: 1945,
    description: 'Failed artist turned dictator. His rise is a warning from history.',
    image: '/images/chapters/hitler-rise/people/adolf-hitler.png'
  },
  {
    id: 'paul-von-hindenburg',
    name: 'Paul von Hindenburg',
    role: 'The President',
    born: 1847,
    died: 1934,
    description: 'The aging war hero who mistakenly thought he could control Hitler.',
    image: '/images/chapters/hitler-rise/people/paul-von-hindenburg.png'
  },
  {
    id: 'claus-von-stauffenberg',
    name: 'Claus von Stauffenberg',
    role: 'The Conspirator',
    born: 1907,
    died: 1944,
    description: 'The officer who tried to kill Hitler with a briefcase bomb.',
    image: '/images/chapters/hitler-rise/people/claus-von-stauffenberg.png' // Make sure this exists or use a generic one
  }
];

// 1. Art School (Success)
const artSchoolTimelineAccepted: Timeline = {
  id: 'art-school-timeline',
  title: 'Hitler the Artist 🎨✨',
  description: 'Hitler becomes a mediocre landscape painter. The 20th century is peaceful.',
  divergenceDescription: 'Accepted to Vienna Academy of Fine Arts in 1907.',
  divergenceYear: 1907,
  probability: 15,
  color: '#8B5CF6',
  icon: '🎨',
  image: '/images/chapters/hitler-rise/timeline_1.png',
  keyEvents: [
    {
      id: 'gallery-opening',
      year: 1925,
      title: 'Munich Gallery Opening',
      description: 'Adolf Hitler displays his "Mountains of Bavaria" collection. Critics call it "boring but competent".',
      impact: 'He never enters politics.',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 48.1351, lng: 11.5820 },
      type: 'cultural'
    }
  ],
  consequences: [
    {
      id: 'no-wwii',
      category: 'political',
      shortTerm: 'Weimar Republic survives',
      longTerm: 'No Holocaust, No WW2',
      globalImpact: 'Millions lived'
    }
  ],
  butterfly: [
    {
      id: 'soviet-expansion',
      trigger: 'Weak Germany',
      consequence: 'Stalin expands west without Nazi opposition',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'Adolf Hitler is a footnote in art history books. Germany is a stable republic. The world is vastly more populous. 🎨🕊️'
};

// 2. Early Nazi Victory
const earlyVictoryTimeline: Timeline = {
  id: 'beer-hall-success',
  title: 'Beer Hall Victory 🍺⚡',
  description: 'The Nazis seize power in 1923.',
  divergenceDescription: 'The Beer Hall Putsch succeeds.',
  divergenceYear: 1923,
  probability: 10,
  color: '#DC2626',
  icon: '🍺',
  image: '/images/chapters/hitler-rise/timeline_2.png',
  keyEvents: [
    {
      id: 'march-on-berlin',
      year: 1924,
      title: 'March on Berlin',
      description: 'The Weimar government collapses. Hitler is dictator at age 35.',
      impact: 'Early rearmament.',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'early-war',
      category: 'military',
      shortTerm: 'War starts in 1930',
      longTerm: 'Germany exhausted earlier',
      globalImpact: 'Chaos'
    }
  ],
  butterfly: [
    {
      id: 'french-intervention',
      trigger: 'Early aggression',
      consequence: 'France occupies Germany permanently',
      magnitude: 'massive',
      timespan: 50
    }
  ],
  presentDayStatus: 'The "Thousand Year Reich" lasted 15 years. Germany was partitioned in 1938. 🇩🇪⚔️'
};

// 3. Assassination Success
const assassinationSuccessTimeline: Timeline = {
  id: 'assassination-success',
  title: 'Valkyrie Succeeds 🎯⚡',
  description: 'Hitler is assassinated in 1944. The war ends early.',
  divergenceDescription: 'Stauffenberg\'s bomb kills Hitler.',
  divergenceYear: 1944,
  probability: 30,
  color: '#059669',
  icon: '🎯',
  image: '/images/chapters/hitler-rise/timeline_3.png',
  keyEvents: [
    {
      id: 'operation-valkyrie',
      year: 1944,
      title: 'Operation Valkyrie',
      description: 'The Reserve Army seizes Berlin. The SS is disarmed.',
      impact: 'Nazi regime dismantled.',
      relatedFigures: ['claus-von-stauffenberg'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'peace-deal',
      year: 1944,
      title: 'Peace with the West',
      description: 'Germany surrenders to the Allies, avoiding total destruction.',
      impact: 'Iron Curtain moves east.',
      relatedFigures: [],
      location: { lat: 0, lng: 0 },
      type: 'military'
    }
  ],
  consequences: [
    {
      id: 'saved-lives',
      category: 'humanitarian',
      shortTerm: 'Concentration camps liberated early',
      longTerm: 'Millions of Jews and soldiers saved',
      globalImpact: 'Less trauma'
    }
  ],
  butterfly: [
    {
      id: 'stronger-germany',
      trigger: 'Less destruction',
      consequence: 'Germany remains a great power',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'July 20th is a global holiday. Claus von Stauffenberg is a hero. The Holocaust ended a year early. 🎯🕊️'
};

const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'art-school',
    title: 'The Academy of Fine Arts (1907)',
    text: 'Vienna. You are a young aspiring artist named Adolf. The professor is reviewing your portfolio. He looks skeptical.',
    emoji: '🎨',
    background: 'from-gray-700 to-slate-800',
    characters: ['🎨', '👨‍🏫', '🖼️'],
    sceneType: 'decision',
    timelineYear: 1907,
    timelineEvent: 'The Rejection',
    choices: [
      {
        id: 'plead',
        text: 'Beg for acceptance. Promise to work hard.',
        consequence: 'The professor relents. You are accepted!',
        linkedTimelineId: 'art-school-timeline'
      },
      {
        id: 'accept-fate',
        text: 'Accept the rejection with anger.',
        consequence: 'You leave in a rage. Politics becomes your new passion.',
        modifiers: [{ stat: 'chaos', value: 20 }],
        nextSceneId: 'beer-hall'
      },
      {
        id: 'architecture',
        text: 'Try Architecture instead.',
        consequence: 'You lack the academic credentials. You end up homeless in Vienna.',
        nextSceneId: 'beer-hall' // Eventually leads back
      }
    ]
  },
  {
    id: 'beer-hall',
    title: 'The Beer Hall Putsch (1923)',
    text: 'Munich. You have a pistol in hand. The Bavarian leaders are speaking. It is time to seize power!',
    emoji: '🍺',
    background: 'from-orange-800 to-black',
    characters: ['🔫', '🍺', '📢'],
    sceneType: 'battle',
    timelineYear: 1923,
    choices: [
      {
        id: 'march',
        text: 'March on Berlin immediately!',
        consequence: 'The police open fire. You are lucky to survive.',
        modifiers: [{ stat: 'chaos', value: 30 }],
        nextSceneId: 'prison-landsberg'
      },
      {
        id: 'capture-leaders',
        text: 'Hold the leaders hostage and force loyalty.',
        consequence: 'It works efficiently. Bavaria falls. Berlin is next.',
        linkedTimelineId: 'beer-hall-success'
      }
    ]
  },
  {
    id: 'prison-landsberg',
    title: 'Landsberg Prison (1924)',
    text: 'You are in a comfortable cell. You have time to think. Rudolf Hess is ready to take dictation.',
    emoji: '📝',
    background: 'from-slate-700 to-gray-900',
    characters: ['📝', '🔒', '📖'],
    sceneType: 'decision',
    timelineYear: 1924,
    choices: [
      {
        id: 'write-book',
        text: 'Write "Mein Kampf". Outline the ideology.',
        consequence: 'The book becomes a bestseller. The movement has a bible.',
        modifiers: [{ stat: 'strength', value: 20 }, { stat: 'diplomacy', value: -50 }],
        nextSceneId: 'reichstag-fire'
      },
      {
        id: 'give-up',
        text: 'Retire from politics. It was a mistake.',
        consequence: 'You fade into obscurity. The Weimar Republic survives.',
        linkedTimelineId: 'art-school-timeline' // Reusing "peaceful" outcome
      }
    ]
  },
  {
    id: 'reichstag-fire',
    title: 'The Reichstag Fire (1933)',
    text: 'The parliament is burning! It is a sign. We must demand emergency powers to stop the "Communist Plot".',
    emoji: '🔥',
    background: 'from-red-900 to-orange-950',
    characters: ['🔥', '🚒', '👴'],
    sceneType: 'decision',
    timelineYear: 1933,
    choices: [
      {
        id: 'seize-power',
        text: 'Demand the Enabling Act. Total power.',
        consequence: 'Hindenburg signs. Democracy dies.',
        modifiers: [{ stat: 'strength', value: 50 }, { stat: 'freedom', value: -100 }],
        nextSceneId: 'night-long-knives'
      },
      {
        id: 'coalition',
        text: 'Form a normal coalition preservation government.',
        consequence: 'You are constrained by laws. The movement loses momentum.',
        // Weak outcome
      }
    ]
  },
  {
    id: 'night-long-knives',
    title: 'Night of the Long Knives (1934)',
    text: 'The SA and Röhm are becoming a threat. The Army wants them gone. The lists are prepared.',
    emoji: '🗡️',
    background: 'from-black to-red-950',
    characters: ['🗡️', '📋', '☠️'],
    sceneType: 'decision',
    timelineYear: 1934,
    choices: [
      {
        id: 'purge',
        text: 'Kill them all. No rivals allowed.',
        consequence: 'The SS rises. The Army swears loyalty to you.',
        modifiers: [{ stat: 'fear', value: 100 }],
        nextSceneId: 'valkyrie'
      },
      {
        id: 'spare',
        text: 'Spare Röhm. He is an old friend.',
        consequence: 'The Army coups against the SA. Civil war erupts.',
        linkedTimelineId: 'early-victory' // Actually civil war, but similar chaotic end
      }
    ]
  },
  {
    id: 'valkyrie',
    title: 'Wolf\'s Lair (1944)',
    text: 'The war is lost. Russia is closing in. Col. Stauffenberg leaves a briefcase under the table.',
    emoji: '💣',
    background: 'from-green-900 to-black',
    characters: ['💼', '💥', '⏳'],
    sceneType: 'battle',
    timelineYear: 1944,
    choices: [
      {
        id: 'survive',
        text: 'Move away from the table. (Historical)',
        consequence: 'The bomb explodes, but you survive. The conspirators are hanged.',
        // Historical End - bunker
      },
      {
        id: 'die',
        text: 'Stay put. (Valkyrie Success)',
        consequence: 'BOOM. The tyrant is dead. Operation Valkyrie launches.',
        linkedTimelineId: 'assassination-success'
      }
    ]
  }
];

// Main chapter data
export const hitlerRiseChapter: Chapter = {
  id: 'hitler-rise',
  title: 'Rise of Hitler',
  period: '1920-1945',
  startYear: 1900,
  endYear: 1945,
  description: 'The warning from history. ⚠️💀',
  historicalContext: 'A fragile democracy destroyed by hate.',
  keyFigures,
  divergencePoint: 'Art School',
  divergenceYear: 1907,
  alternativeTimelines: [
    artSchoolTimelineAccepted,
    earlyVictoryTimeline,
    assassinationSuccessTimeline,
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/hitler-rise/main.png',
  icon: '⚠️',
  backgroundColor: 'from-gray-900 to-red-900'
};
