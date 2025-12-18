import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures in the American Revolution
const keyFigures: Person[] = [
  {
    id: 'george-washington',
    name: 'George Washington',
    role: 'Commander-in-Chief, Continental Army',
    born: 1732,
    died: 1799,
    description: 'Leader of the Continental Army and first President of the United States',
    image: '/images/chapters/us-independence/people/george-washington.png'
  },
  {
    id: 'benjamin-franklin',
    name: 'Benjamin Franklin',
    role: 'Diplomat and Founding Father',
    born: 1706,
    died: 1790,
    description: 'Diplomat who secured French alliance and helped draft the Declaration of Independence',
    image: '/images/chapters/us-independence/people/benjamin-franklin.png'
  },
  {
    id: 'king-george-iii',
    name: 'King George III',
    role: 'King of Great Britain',
    born: 1738,
    died: 1820,
    description: 'British monarch during the American Revolution',
    image: '/images/chapters/us-independence/people/king-george-iii.png'
  },
  {
    id: 'thomas-jefferson',
    name: 'Thomas Jefferson',
    role: 'Primary author of Declaration of Independence',
    born: 1743,
    died: 1826,
    description: 'Third President and primary author of the Declaration of Independence',
    image: '/images/chapters/us-independence/people/thomas-jefferson.png'
  }
];

// Alternative Timeline 1: British Victory
const britishVictoryTimeline: Timeline = {
  id: 'british-victory',
  title: 'British Victory Timeline',
  description: 'Revolutionary War fails, America remains a British colony until the 1850s',
  divergenceDescription: 'French alliance never forms, Washington is captured at Valley Forge',
  divergenceYear: 1778,
  probability: 25,
  color: '#DC2626',
  icon: '🇬🇧',
  image: '/images/chapters/us-independence/timeline_1.png',
  keyEvents: [
    {
      id: 'washington-captured-1778',
      year: 1778,
      month: 2,
      title: 'Washington Captured at Valley Forge',
      description: 'British surprise attack captures George Washington and decimates Continental Army',
      impact: 'Revolutionary leadership destroyed, resistance collapses',
      relatedFigures: ['george-washington'],
      location: { lat: 40.0948, lng: -75.4391 },
      type: 'military'
    },
    {
      id: 'colonial-submission-1779',
      year: 1779,
      month: 6,
      title: 'Colonial Submission',
      description: 'Remaining colonial leaders surrender to British forces',
      impact: 'End of organized resistance, return to colonial status',
      relatedFigures: [],
      location: { lat: 39.9496, lng: -75.1503 },
      type: 'political'
    },
    {
      id: 'harsh-punishments-1780',
      year: 1780,
      month: 1,
      title: 'Harsh British Punishments',
      description: 'Britain imposes severe penalties on rebellious colonies',
      impact: 'Heavy taxation, military occupation, restricted freedoms',
      relatedFigures: ['king-george-iii'],
      location: { lat: 40.7128, lng: -74.0060 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'delayed-independence',
      category: 'political',
      shortTerm: 'America remains under British rule with harsh restrictions',
      longTerm: 'Independence delayed by 75 years, achieved through negotiation rather than revolution',
      globalImpact: 'French Revolution might not have occurred without American example'
    }
  ],
  butterfly: [
    {
      id: 'no-french-revolution',
      trigger: 'No American example of successful revolution',
      consequence: 'French Revolution delayed or takes different form',
      magnitude: 'massive',
      timespan: 50
    }
  ],
  presentDayStatus: 'The United States exists as the American Commonwealth, a semi-autonomous region within a reformed British Empire. Parliamentary democracy with the British monarch as ceremonial head of state. Economy similar to our timeline but with stronger ties to Commonwealth nations.'
};

// Alternative Timeline 2: French America
const frenchAmericaTimeline: Timeline = {
  id: 'french-america',
  title: 'French America Timeline',
  description: 'France directly intervenes and America becomes a French protectorate',
  divergenceDescription: 'France commits massive military forces early in the war, demanding political control in return',
  divergenceYear: 1777,
  probability: 15,
  color: '#2563EB',
  icon: '🇫🇷',
  image: '/images/chapters/us-independence/timeline_2.png',
  keyEvents: [
    {
      id: 'massive-french-intervention-1777',
      year: 1777,
      month: 6,
      title: 'Massive French Military Intervention',
      description: 'France sends 50,000 troops and large naval fleet to America',
      impact: 'Overwhelming military superiority against British forces',
      relatedFigures: ['benjamin-franklin'],
      location: { lat: 40.7128, lng: -74.0060 },
      type: 'military'
    },
    {
      id: 'treaty-protectorate-1778',
      year: 1778,
      month: 3,
      title: 'Treaty of French Protectorate',
      description: 'America agrees to become French protectorate in exchange for independence from Britain',
      impact: 'Political control shifts from Britain to France',
      relatedFigures: ['benjamin-franklin'],
      location: { lat: 39.9496, lng: -75.1503 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'french-cultural-influence',
      category: 'cultural',
      shortTerm: 'French language and culture become dominant in America',
      longTerm: 'Bilingual French-English speaking nation with strong European ties',
      globalImpact: 'Catholic rather than Protestant cultural influence in North America'
    }
  ],
  butterfly: [
    {
      id: 'stronger-france',
      trigger: 'France gains enormous territory and resources',
      consequence: 'France remains dominant European power through 19th century',
      magnitude: 'massive',
      timespan: 150
    }
  ],
  presentDayStatus: 'The French American Republic is a bilingual nation with strong cultural ties to France. Constitutional democracy with a civil law system. Major power in both Atlantic and Pacific, with special relationship to EU rather than Britain.'
};

// Alternative Timeline 3: Confederated States
const confederatedStatesTimeline: Timeline = {
  id: 'confederated-states',
  title: 'Loose Confederation Timeline',
  description: 'Weak confederation of independent states, no strong federal government',
  divergenceDescription: 'Articles of Confederation never replaced, states remain largely independent',
  divergenceYear: 1787,
  probability: 30,
  color: '#059669',
  icon: '🤝',
  image: '/images/chapters/us-independence/timeline_3.png',
  keyEvents: [
    {
      id: 'constitutional-convention-fails-1787',
      year: 1787,
      month: 9,
      title: 'Constitutional Convention Fails',
      description: 'States cannot agree on new constitution, Articles of Confederation remain',
      impact: 'Weak central government continues, states maintain independence',
      relatedFigures: [],
      location: { lat: 39.9496, lng: -75.1503 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'delayed-development',
      category: 'economic',
      shortTerm: 'Slow economic development due to trade barriers between states',
      longTerm: 'Industrialization delayed by several decades',
      globalImpact: 'America remains primarily agricultural power longer'
    }
  ],
  butterfly: [
    {
      id: 'different-civil-war',
      trigger: 'Weaker federal government cannot prevent secession',
      consequence: 'Multiple smaller conflicts instead of single civil war',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'The Confederated States of America operates as a loose federal system with very strong state governments. Similar to Switzerland or early EU model. Economic development similar to our timeline but with stronger ties to Commonwealth nations.'
};

// Interactive story scenarios
const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'colonial-uprising',
    title: 'The Boston Tea Party (1773)',
    text: 'You are a merchant in Boston. The Sons of Liberty are gathering at the harbor. They plan to dump British tea into the ocean. The Redcoats are watching. What do you do?',
    emoji: '⚡',
    background: 'from-blue-900 to-gray-800', // Single hue
    characters: ['🎭', '🛒', '⚓'],
    sceneType: 'decision',
    timelineYear: 1773,
    timelineEvent: 'Boston Tea Party',
    choices: [
      {
        id: 'join',
        text: 'Put on a disguise and join them. Liberty or death!',
        consequence: 'You become a marked man, but a hero to the patriots. The revolution begins.',
        modifiers: [{ stat: 'chaos', value: 20 }, { stat: 'freedom', value: 20 }],
        nextSceneId: 'continental-congress'
      },
      {
        id: 'report',
        text: 'Report them to the Governor. This is destruction of property!',
        consequence: 'The British arrest the ringleaders. The rebellion is stifled for now.',
        modifiers: [{ stat: 'strength', value: 20 }, { stat: 'freedom', value: -20 }],
        nextSceneId: 'reconciliation-effort'
      },
      {
        id: 'watch',
        text: 'Watch from the shadows. Keep your head down.',
        consequence: 'The event happens without you. You survive, but have no voice in what comes next.',
        modifiers: [{ stat: 'diplomacy', value: 10 }],
        nextSceneId: 'continental-congress'
      }
    ]
  },
  {
    id: 'reconciliation-effort',
    title: 'The King\'s Peace (1774)',
    text: 'Thanks to loyal subjects like you, the "Tea Party" was thwarted. But anger remains. You are invited to London to speak to Parliament.',
    emoji: '👑',
    background: 'from-red-900 to-red-950',
    characters: ['👑', '📜', '🗣️'],
    sceneType: 'negotiation',
    choices: [
      {
        id: 'demand-rights',
        text: 'Demand representation for the colonies.',
        consequence: 'Parliament laughs at you. You return home radicalized.',
        modifiers: [{ stat: 'freedom', value: 10 }],
        nextSceneId: 'continental-congress'
      },
      {
        id: 'accept-status',
        text: 'Accept a minor trade deal and pledge loyalty.',
        consequence: 'You prevent war, but America remains a colony forever.',
        linkedTimelineId: 'british-victory'
      }
    ]
  },
  {
    id: 'continental-congress',
    title: 'Independence Hall (1776)',
    text: 'Philadelphia. The delegates are debating. Jefferson has drafted a Declaration of Independence. Some say it is treason. How do you vote?',
    emoji: '📜',
    background: 'from-amber-800 to-amber-950',
    characters: ['🎩', '✒️', '📖'],
    sceneType: 'decision',
    timelineYear: 1776,
    choices: [
      {
        id: 'vote-yes',
        text: 'Vote YES. "We must all hang together!"',
        consequence: 'The Declaration is signed. War is declared.',
        modifiers: [{ stat: 'freedom', value: 30 }, { stat: 'chaos', value: 10 }],
        nextSceneId: 'long-island'
      },
      {
        id: 'vote-no',
        text: 'Vote NO. We cannot win against the British Empire.',
        consequence: 'The motion fails. The colonies remain divided. The British pick them off one by one.',
        modifiers: [{ stat: 'strength', value: -10 }],
        nextSceneId: 'reconciliation-effort' // Loop back or fail
      }
    ]
  },
  {
    id: 'long-island',
    title: 'Disaster at Long Island (1776)',
    text: 'The British have landed a massive army in New York. Washington\'s forces are outnumbered and outflanked. The river is at your back.',
    emoji: '⚔️',
    background: 'from-slate-700 to-slate-900',
    characters: ['⚔️', '🌊', '🚣'],
    sceneType: 'battle',
    timelineYear: 1776,
    choices: [
      {
        id: 'retreat-night',
        text: 'Retreat across the river under cover of fog.',
        consequence: 'A miraculous escape! The army lives to fight another day.',
        modifiers: [{ stat: 'diplomacy', value: 10 }, { stat: 'chaos', value: -10 }],
        nextSceneId: 'valley-forge'
      },
      {
        id: 'stand-ground',
        text: 'Stand and fight! "No retreat, no surrender!"',
        consequence: 'Your brave stand is doomed. The army is surrounded and crushed.',
        modifiers: [{ stat: 'strength', value: -50 }],
        nextSceneId: 'washington-captured'
      }
    ]
  },
  {
    id: 'washington-captured',
    title: 'The End of the Revolution (1776)',
    text: 'General Washington is in chains. The Continental Army is no more. The King offers a pardon to all who swear allegiance.',
    emoji: '⛓️',
    background: 'from-red-900 to-black',
    characters: ['⛓️', '👑', '🏳️'],
    sceneType: 'revelation',
    choices: [
      {
        id: 'submit',
        text: 'Swear allegiance to King George III.',
        consequence: 'The revolution is over. Order is restored.',
        linkedTimelineId: 'british-victory'
      },
      {
        id: 'guerilla',
        text: 'Flee to the hills and fight a guerilla war.',
        consequence: 'You fight for years, but without leadership, it is just banditry.',
        linkedTimelineId: 'british-victory'
      }
    ]
  },
  {
    id: 'valley-forge',
    title: 'Winter of Despair (1777)',
    text: 'Valley Forge. Cold, hunger, and smallpox are killing your men. Baron von Steuben offers to train them, but morale is breaking.',
    emoji: '❄️',
    background: 'from-slate-800 to-blue-950',
    characters: ['🥶', '⛺', '💉'],
    sceneType: 'decision',
    timelineYear: 1777,
    choices: [
      {
        id: 'inoculate',
        text: 'Order mass inoculation against smallpox. Risky but necessary.',
        consequence: 'Many die, but the epidemic stops. The army emerges stronger.',
        modifiers: [{ stat: 'strength', value: 20 }],
        nextSceneId: 'french-alliance'
      },
      {
        id: 'attack-philly',
        text: 'Attack Philadelphia to get warm quarters.',
        consequence: 'The attack is a disaster. The army is destroyed in the snow.',
        modifiers: [{ stat: 'chaos', value: 30 }],
        nextSceneId: 'washington-captured'
      }
    ]
  },
  {
    id: 'french-alliance',
    title: 'The French Court (1778)',
    text: 'Ben Franklin is in Paris. The King of France offers an alliance, but demands the US become a protectorate under French law.',
    emoji: '🇫🇷',
    background: 'from-blue-600 to-blue-800',
    characters: ['👑', '🍷', '📜'],
    sceneType: 'negotiation',
    choices: [
      {
        id: 'accept-protectorate',
        text: 'Accept. We need their navy at any cost.',
        consequence: 'The French fleet arrives and crushes the British. But now you answer to Versailles.',
        linkedTimelineId: 'french-america'
      },
      {
        id: 'demand-equal',
        text: 'Refuse. "Equal partners or nothing."',
        consequence: 'Franklin charms the court. They agree to an equal alliance!',
        modifiers: [{ stat: 'diplomacy', value: 40 }],
        nextSceneId: 'yorktown-finale'
      }
    ]
  },
  {
    id: 'yorktown-finale',
    title: 'Victory at Yorktown (1781)',
    text: 'Cornwallis is trapped. The British surrender. You have won the war! Now you must win the peace.',
    emoji: '🏆',
    background: 'from-amber-600 to-amber-800',
    characters: ['🎺', '🏳️', '🇺🇸'],
    sceneType: 'revelation',
    timelineYear: 1781,
    choices: [
      {
        id: 'federal-constitution',
        text: 'Draft a strong Constitution with a central government.',
        consequence: 'The United States of America is born. A new superpower rises.',
        modifiers: [{ stat: 'freedom', value: 50 }, { stat: 'strength', value: 50 }],
        // End of standard game
      },
      {
        id: 'keep-confederation',
        text: 'Keep power with the states. No more kings!',
        consequence: 'The states bicker and fight. The union is weak.',
        linkedTimelineId: 'confederated-states'
      }
    ]
  }
];

// Main chapter data
export const usIndependenceChapter: Chapter = {
  id: 'us-independence',
  title: 'US Independence',
  period: '1776',
  startYear: 1760,
  endYear: 1800,
  description: 'The American Revolution and the birth of a new nation. Explore how different choices during this pivotal period could have led to dramatically different outcomes for America and the world.',
  historicalContext: 'By 1776, tensions between Great Britain and its American colonies had reached a breaking point. Years of taxation without representation, military occupation, and restrictive policies had created a revolutionary movement that would change the course of world history.',
  keyFigures,
  divergencePoint: 'Declaration of Independence and Revolutionary War',
  divergenceYear: 1776,
  alternativeTimelines: [
    britishVictoryTimeline,
    frenchAmericaTimeline,
    confederatedStatesTimeline,
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/us-independence/main.png',
  icon: '🗽',
  backgroundColor: 'from-blue-600 to-blue-800'
};