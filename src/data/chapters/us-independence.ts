import { Chapter, Timeline, HistoricalEvent, Person, Consequence, ButterflyEffect } from '../../types';

// Key figures in the American Revolution
const keyFigures: Person[] = [
  {
    id: 'george-washington',
    name: 'George Washington',
    role: 'Commander-in-Chief, Continental Army',
    born: 1732,
    died: 1799,
    description: 'Leader of the Continental Army and first President of the United States',
    image: '/images/washington.jpg'
  },
  {
    id: 'benjamin-franklin',
    name: 'Benjamin Franklin',
    role: 'Diplomat and Founding Father',
    born: 1706,
    died: 1790,
    description: 'Diplomat who secured French alliance and helped draft the Declaration of Independence',
    image: '/images/franklin.jpg'
  },
  {
    id: 'king-george-iii',
    name: 'King George III',
    role: 'King of Great Britain',
    born: 1738,
    died: 1820,
    description: 'British monarch during the American Revolution',
    image: '/images/george-iii.jpg'
  },
  {
    id: 'thomas-jefferson',
    name: 'Thomas Jefferson',
    role: 'Primary author of Declaration of Independence',
    born: 1743,
    died: 1826,
    description: 'Third President and primary author of the Declaration of Independence',
    image: '/images/jefferson.jpg'
  }
];

// Historical events for the main timeline
const mainTimelineEvents: HistoricalEvent[] = [
  {
    id: 'stamp-act-1765',
    year: 1765,
    month: 3,
    day: 22,
    title: 'Stamp Act Passed',
    description: 'British Parliament passes the Stamp Act, requiring stamps on all printed materials in the colonies',
    impact: 'First direct tax on colonists, sparking widespread resistance',
    relatedFigures: ['king-george-iii'],
    location: { lat: 51.5074, lng: -0.1278 },
    type: 'political'
  },
  {
    id: 'boston-tea-party-1773',
    year: 1773,
    month: 12,
    day: 16,
    title: 'Boston Tea Party',
    description: 'Colonists dump British tea into Boston Harbor in protest of the Tea Act',
    impact: 'Escalated tensions between Britain and the colonies',
    relatedFigures: [],
    location: { lat: 42.3601, lng: -71.0589 },
    type: 'political'
  },
  {
    id: 'lexington-concord-1775',
    year: 1775,
    month: 4,
    day: 19,
    title: 'Battles of Lexington and Concord',
    description: 'First military engagements of the American Revolutionary War',
    impact: 'Marked the beginning of armed conflict between Britain and the colonies',
    relatedFigures: [],
    location: { lat: 42.4472, lng: -71.2289 },
    type: 'military'
  },
  {
    id: 'declaration-independence-1776',
    year: 1776,
    month: 7,
    day: 4,
    title: 'Declaration of Independence',
    description: 'Continental Congress adopts the Declaration of Independence',
    impact: 'Formally declared American independence from Great Britain',
    relatedFigures: ['thomas-jefferson'],
    location: { lat: 39.9496, lng: -75.1503 },
    type: 'political'
  },
  {
    id: 'french-alliance-1778',
    year: 1778,
    month: 2,
    day: 6,
    title: 'French Alliance',
    description: 'France formally allies with the United States against Britain',
    impact: 'Provided crucial military and naval support to the American cause',
    relatedFigures: ['benjamin-franklin'],
    location: { lat: 48.8566, lng: 2.3522 },
    type: 'political'
  },
  {
    id: 'yorktown-1781',
    year: 1781,
    month: 10,
    day: 19,
    title: 'Siege of Yorktown',
    description: 'British General Cornwallis surrenders, effectively ending the war',
    impact: 'Decisive American victory that led to British defeat',
    relatedFigures: ['george-washington'],
    location: { lat: 37.2388, lng: -76.5089 },
    type: 'military'
  },
  {
    id: 'treaty-paris-1783',
    year: 1783,
    month: 9,
    day: 3,
    title: 'Treaty of Paris',
    description: 'Treaty officially ends the Revolutionary War and recognizes American independence',
    impact: 'Established the United States as an independent nation',
    relatedFigures: ['benjamin-franklin'],
    location: { lat: 48.8566, lng: 2.3522 },
    type: 'political'
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
    },
    {
      id: 'gradual-liberalization-1820',
      year: 1820,
      month: 1,
      title: 'Gradual Liberalization Begins',
      description: 'Britain begins granting more autonomy to American colonies',
      impact: 'Slow path toward self-governance within the British Empire',
      relatedFigures: [],
      location: { lat: 51.5074, lng: -0.1278 },
      type: 'political'
    },
    {
      id: 'dominion-status-1850',
      year: 1850,
      month: 7,
      title: 'American Dominion Status',
      description: 'America granted dominion status similar to Canada',
      impact: 'Self-governance while remaining part of British Empire',
      relatedFigures: [],
      location: { lat: 38.9072, lng: -77.0369 },
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
    },
    {
      id: 'different-constitution',
      category: 'political',
      shortTerm: 'No American Constitution or Bill of Rights created',
      longTerm: 'Parliamentary system adopted instead of presidential system',
      globalImpact: 'Democratic ideals spread more slowly worldwide'
    }
  ],
  butterfly: [
    {
      id: 'no-french-revolution',
      trigger: 'No American example of successful revolution',
      consequence: 'French Revolution delayed or takes different form',
      magnitude: 'massive',
      timespan: 50
    },
    {
      id: 'slower-westward-expansion',
      trigger: 'British control limits rapid territorial expansion',
      consequence: 'Western territories developed more slowly and systematically',
      magnitude: 'large',
      timespan: 100
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
    },
    {
      id: 'french-governor-general-1783',
      year: 1783,
      month: 1,
      title: 'French Governor-General Appointed',
      description: 'France appoints a Governor-General to oversee American administration',
      impact: 'French administrative system imposed on former colonies',
      relatedFigures: [],
      location: { lat: 40.7128, lng: -74.0060 },
      type: 'political'
    },
    {
      id: 'napoleonic-influence-1804',
      year: 1804,
      month: 5,
      title: 'Napoleonic Administrative Reforms',
      description: 'Napoleon extends his administrative reforms to French America',
      impact: 'Legal system, education, and government reorganized on French model',
      relatedFigures: [],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'political'
    },
    {
      id: 'american-revolution-1848',
      year: 1848,
      month: 7,
      title: 'Second American Revolution',
      description: 'Americans revolt against French rule during the revolutions of 1848',
      impact: 'Finally achieves true independence from European powers',
      relatedFigures: [],
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
    },
    {
      id: 'different-legal-system',
      category: 'political',
      shortTerm: 'Napoleonic Code adopted instead of English common law',
      longTerm: 'Civil law system influences legal development',
      globalImpact: 'Different model of law spreads to other former colonies'
    }
  ],
  butterfly: [
    {
      id: 'stronger-france',
      trigger: 'France gains enormous territory and resources',
      consequence: 'France remains dominant European power through 19th century',
      magnitude: 'massive',
      timespan: 150
    },
    {
      id: 'different-louisiana-purchase',
      trigger: 'France controls both Louisiana and eastern America',
      consequence: 'No Louisiana Purchase, different continental development',
      magnitude: 'large',
      timespan: 200
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
    },
    {
      id: 'trade-wars-1790s',
      year: 1795,
      month: 1,
      title: 'Interstate Trade Wars',
      description: 'States impose tariffs on each other, economic conflicts arise',
      impact: 'Economic inefficiency and interstate tensions',
      relatedFigures: [],
      location: { lat: 40.7128, lng: -74.0060 },
      type: 'economic'
    },
    {
      id: 'foreign-policy-crisis-1812',
      year: 1812,
      month: 6,
      title: 'War of 1812 Crisis',
      description: 'States cannot coordinate response to British invasion',
      impact: 'Military defeats due to lack of unified command',
      relatedFigures: [],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'military'
    },
    {
      id: 'gradual-cooperation-1820s',
      year: 1825,
      month: 1,
      title: 'Interstate Cooperation Agreements',
      description: 'States begin forming regional compacts for trade and defense',
      impact: 'Gradual movement toward closer cooperation',
      relatedFigures: [],
      location: { lat: 42.3601, lng: -71.0589 },
      type: 'political'
    },
    {
      id: 'federal-union-1850',
      year: 1850,
      month: 7,
      title: 'Federal Union Finally Formed',
      description: 'Crisis forces states to create stronger federal government',
      impact: 'Modern federal system finally established after 75 years',
      relatedFigures: [],
      location: { lat: 38.9072, lng: -77.0369 },
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
    },
    {
      id: 'regional-identity',
      category: 'cultural',
      shortTerm: 'Strong state and regional identities develop',
      longTerm: 'More decentralized culture with regional differences preserved',
      globalImpact: 'Model for other federal systems worldwide'
    }
  ],
  butterfly: [
    {
      id: 'slower-westward-expansion',
      trigger: 'Lack of federal coordination slows territorial expansion',
      consequence: 'Western territories remain independent longer',
      magnitude: 'large',
      timespan: 75
    },
    {
      id: 'different-civil-war',
      trigger: 'Weaker federal government cannot prevent secession',
      consequence: 'Multiple smaller conflicts instead of single civil war',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'The Confederated States of America operates as a loose federal system with very strong state governments. Similar to Switzerland or early EU model. Economic development similar to our timeline but achieved more slowly and with greater regional variation.'
};

// Interactive story scenarios
const interactiveScenarios = [
  {
    id: 'colonial-uprising',
    title: 'The Colonial Uprising Begins',
    text: 'You are in Boston, 1773. British soldiers patrol the streets as tensions rise. The Sons of Liberty are planning something big at the harbor tonight...',
    emoji: '⚡',
    background: 'bg-gradient-to-br from-blue-900 to-gray-800',
    characters: ['🎭', '🛒', '⚓'],
    sceneType: 'decision' as const,
    timelineYear: 1773,
    timelineEvent: 'Boston Tea Party planned',
    choices: [
      {
        id: 'join-tea-party',
        text: 'Join the Sons of Liberty in dumping British tea',
        consequence: 'Your participation helps escalate the conflict, making reconciliation harder'
      },
      {
        id: 'warn-authorities',
        text: 'Warn the British authorities about the planned protest',
        consequence: 'The tea is saved but colonial anger intensifies, hastening revolution'
      },
      {
        id: 'stay-neutral',
        text: 'Stay home and avoid taking sides',
        consequence: 'You remain safe but miss a chance to influence history'
      }
    ]
  },
  {
    id: 'continental-congress',
    title: 'The Continental Congress Debates',
    text: 'Philadelphia, 1776. You sit in the Continental Congress as delegates passionately debate whether to declare independence. Benjamin Franklin catches your eye...',
    emoji: '📜',
    background: 'bg-gradient-to-br from-amber-800 to-red-900',
    characters: ['🎩', '✒️', '📖'],
    sceneType: 'negotiation' as const,
    timelineYear: 1776,
    timelineEvent: 'Declaration of Independence being drafted',
    choices: [
      {
        id: 'support-independence',
        text: 'Strongly advocate for immediate independence',
        consequence: 'Your passionate speech helps sway undecided delegates toward revolution'
      },
      {
        id: 'compromise-solution',
        text: 'Propose a compromise with Britain for greater autonomy',
        consequence: 'Some delegates consider reconciliation, potentially delaying war'
      },
      {
        id: 'demand-guarantees',
        text: 'Support independence but demand guarantees about slavery',
        consequence: 'You force a difficult conversation that shapes the new nation\'s future'
      }
    ]
  },
  {
    id: 'valley-forge',
    title: 'Valley Forge Winter',
    text: 'Winter 1777-78. The Continental Army shivers at Valley Forge. Soldiers are deserting, supplies are gone. Washington asks for your counsel on a critical decision...',
    emoji: '❄️',
    background: 'bg-gradient-to-br from-gray-700 to-blue-900',
    characters: ['🥶', '⚔️', '🏃'],
    sceneType: 'battle' as const,
    timelineYear: 1777,
    timelineEvent: 'Continental Army winter at Valley Forge',
    choices: [
      {
        id: 'attack-philadelphia',
        text: 'Launch a desperate winter attack on British-held Philadelphia',
        consequence: 'A risky gamble that could end the war quickly or destroy the army'
      },
      {
        id: 'endure-winter',
        text: 'Endure the winter and wait for spring reinforcements',
        consequence: 'Your patience allows Von Steuben to train the army into a professional force'
      },
      {
        id: 'seek-negotiations',
        text: 'Secretly send peace feelers to the British',
        consequence: 'Your diplomatic efforts could end the suffering but at what cost?'
      }
    ]
  },
  {
    id: 'french-alliance',
    title: 'The French Question',
    text: 'Paris, 1778. Benjamin Franklin negotiates with French ministers. They offer military aid, but demand America become a French protectorate. How do you advise?',
    emoji: '🇫🇷',
    background: 'bg-gradient-to-br from-blue-600 to-purple-800',
    characters: ['👑', '🎭', '⚖️'],
    sceneType: 'negotiation' as const,
    timelineYear: 1778,
    timelineEvent: 'French Alliance negotiations',
    choices: [
      {
        id: 'accept-protectorate',
        text: 'Accept French protection to guarantee victory',
        consequence: 'French control ensures victory but compromises true independence'
      },
      {
        id: 'negotiate-alliance',
        text: 'Negotiate for military aid without political control',
        consequence: 'Your diplomacy secures crucial French support while maintaining sovereignty'
      },
      {
        id: 'reject-french-aid',
        text: 'Reject French aid to maintain complete independence',
        consequence: 'American self-reliance is preserved but victory becomes much harder'
      }
    ]
  },
  {
    id: 'yorktown-finale',
    title: 'Victory at Yorktown',
    text: 'October 1781. British General Cornwallis is trapped at Yorktown. The war could end here, but how you handle victory will shape the new nation...',
    emoji: '🏆',
    background: 'bg-gradient-to-br from-yellow-600 to-green-800',
    characters: ['🎺', '🏴', '🕊️'],
    sceneType: 'revelation' as const,
    timelineYear: 1781,
    timelineEvent: 'Siege of Yorktown - British surrender',
    choices: [
      {
        id: 'magnanimous-victory',
        text: 'Show magnanimity and honor to defeated British forces',
        consequence: 'Your noble conduct sets a precedent for American values and international respect'
      },
      {
        id: 'demand-reparations',
        text: 'Demand harsh reparations and concessions from Britain',
        consequence: 'Your demands secure more territory but create lasting resentment'
      },
      {
        id: 'immediate-constitution',
        text: 'Push for immediate constitutional convention',
        consequence: 'Your urgency helps create a stronger federal government from the start'
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
    // Additional timelines would be added here...
  ],
  interactiveScenarios,
  mainImage: '/images/independence-main.jpg',
  icon: '🗽',
  backgroundColor: 'from-red-600 to-blue-600'
};