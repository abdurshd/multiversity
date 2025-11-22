import { Chapter, Timeline, Person } from '../../types';

// Key figures with dramatic character descriptions
const keyFigures: Person[] = [
  {
    id: 'vladimir-lenin',
    name: 'Vladimir Lenin',
    role: 'The Revolutionary Mastermind & Bald Genius',
    born: 1870,
    died: 1924,
    description: 'The ultimate revolutionary overachiever! 💀⚡ This bald genius turned Russia upside down with his "What Is To Be Done?" energy. Loved trains, hated capitalism, and somehow convinced millions to follow his crazy dream.',
    image: '/images/chapters/lenin-revolution/people/vladimir-lenin.png'
  },
  {
    id: 'leon-trotsky',
    name: 'Leon Trotsky',
    role: 'The Fiery Orator & Eternal Revolutionary',
    born: 1879,
    died: 1940,
    description: 'The revolution\'s most dramatic speaker! 🔥📢 Could start a revolution with just his voice, organized the Red Army like a boss, and got ice-picked for disagreeing with Stalin. Forever revolutionary!',
    image: '/images/chapters/lenin-revolution/people/leon-trotsky.png'
  },
  {
    id: 'joseph-stalin',
    name: 'Joseph Stalin',
    role: 'The Quiet Georgian Who Became Ultimate Boss',
    born: 1878,
    died: 1953,
    description: 'The patient plotter who outmaneuvered everyone! 🐺🎭 Started as "boring bureaucrat," ended as absolute ruler. Proved that sometimes the quiet ones are the most dangerous.',
    image: '/images/chapters/lenin-revolution/people/joseph-stalin.png'
  },
  {
    id: 'alexandra-kollontai',
    name: 'Alexandra Kollontai',
    role: 'The Feminist Revolutionary & Love Theorist',
    born: 1872,
    died: 1952,
    description: 'The woman who revolutionized revolution! 👩‍💼💕 Fought for women\'s rights, free love, and gender equality while dodging bullets and bureaucrats. Way ahead of her time!',
    image: '/images/chapters/lenin-revolution/people/alexandra-kollontai.png'
  },
  {
    id: 'nikolai-bukharin',
    name: 'Nikolai Bukharin',
    role: 'The Beloved Theorist & Tragic Intellectual',
    born: 1888,
    died: 1938,
    description: 'Lenin\'s favorite intellectual! 🤓💭 The party\'s golden boy who wrote brilliant theory, believed in human goodness, and sadly discovered that paranoid dictators don\'t appreciate optimists.',
    image: '/images/chapters/lenin-revolution/people/nikolai-bukharin.png'
  },
  {
    id: 'felix-dzerzhinsky',
    name: 'Felix Dzerzhinsky',
    role: 'The Iron Felix & Secret Police Creator',
    born: 1877,
    died: 1926,
    description: 'The revolution\'s enforcer with a heart of... well, iron! 🔒⚔️ Created the Cheka (secret police) and proved that sometimes revolutions need a scary person to keep everyone in line.',
    image: '/images/chapters/lenin-revolution/people/felix-dzerzhinsky.png'
  }
];

// Alternative Timeline 1: Menshevik Victory
const menshevikVictoryTimeline: Timeline = {
  id: 'menshevik-victory',
  title: 'Mensheviks Win: Democracy with Russian Characteristics! 🗳️🐻',
  description: 'What if the moderate Menshevik faction had defeated Lenin\'s Bolsheviks and created a democratic socialist state?',
  divergenceDescription: 'Mensheviks successfully organize broader coalition and prevent Bolshevik coup in October 1917',
  divergenceYear: 1917,
  probability: 35,
  color: '#3B82F6',
  icon: '🗳️',
  image: '/images/chapters/lenin-revolution/timeline_1.png',
  keyEvents: [
    {
      id: 'menshevik-coalition-1917',
      year: 1917,
      month: 10,
      title: 'Mensheviks Form Democratic Coalition! 🤝🏛️',
      description: 'Moderate socialists successfully unite with liberals and Social Revolutionaries to form stable democratic government.',
      impact: 'Creates broad-based democratic coalition preventing Bolshevik takeover',
      relatedFigures: [],
      location: { lat: 59.9311, lng: 30.3609 },
      type: 'political'
    },
    {
      id: 'constituent-assembly-success-1918',
      year: 1918,
      month: 1,
      title: 'Constituent Assembly Actually Works! 🏛️✨',
      description: 'Democratic parliament successfully adopts constitution and begins land reform, unlike that awkward day when Lenin shut it down.',
      impact: 'Establishes legitimate democratic institutions with popular support',
      relatedFigures: [],
      location: { lat: 59.9311, lng: 30.3609 },
      type: 'political'
    },
    {
      id: 'gradual-land-reform-1918',
      year: 1918,
      month: 6,
      title: 'Land Reform Without the Chaos! 🌾📋',
      description: 'Peaceful redistribution of land to peasants through legal process rather than violent seizure.',
      impact: 'Satisfies peasant demands while maintaining agricultural productivity',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'economic'
    },
    {
      id: 'avoid-civil-war-1918',
      year: 1918,
      month: 8,
      title: 'No Civil War: Everyone Gets Along! 🕊️❤️',
      description: 'Democratic legitimacy prevents civil war as most groups accept the new system.',
      impact: 'Saves millions of lives and preserves Russian infrastructure',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'mixed-economy-1920',
      year: 1920,
      month: 1,
      title: 'Mixed Economy Success: Best of Both Worlds! 💼🏭',
      description: 'Democratic Russia develops successful mixed economy combining private enterprise with social welfare.',
      impact: 'Economic prosperity through market mechanisms with social protection',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'economic'
    },
    {
      id: 'federal-democracy-1925',
      year: 1925,
      month: 7,
      title: 'Russian Federal Republic Established! 🇷🇺🏛️',
      description: 'Russia becomes federal democracy respecting ethnic autonomy while maintaining unity.',
      impact: 'Solves nationality question through federalism rather than force',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'democratic-stability',
      category: 'political',
      shortTerm: 'Stable democratic institutions prevent authoritarian takeover',
      longTerm: 'Russia becomes model for democratic socialism worldwide',
      globalImpact: 'No Soviet threat allows different Cold War or no Cold War at all'
    },
    {
      id: 'economic-prosperity',
      category: 'economic',
      shortTerm: 'Mixed economy avoids disasters of War Communism',
      longTerm: 'Russia becomes prosperous industrial democracy by 1940',
      globalImpact: 'Alternative development model influences global economics'
    }
  ],
  butterfly: [
    {
      id: 'no-stalin',
      trigger: 'Democratic system prevents authoritarian consolidation',
      consequence: 'No Stalinist terror, gulags, or forced collectivization',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'different-world-war-ii',
      trigger: 'Democratic Russia might ally with Western democracies earlier',
      consequence: 'Hitler faces united democratic front from start',
      magnitude: 'massive',
      timespan: 50
    }
  ],
  presentDayStatus: 'The Russian Federal Democratic Republic celebrated its 100th anniversary in 2017. It\'s one of the world\'s most stable democracies, known for its excellent healthcare, education, and vodka quality control. The Mensheviks are still proud they chose democracy over dictatorship! 🎉🗳️'
};

// Alternative Timeline 2: Lenin Dies Early
const leninDiesEarlyTimeline: Timeline = {
  id: 'lenin-dies-early',
  title: 'Lenin Dies in 1914: Revolution Without the Revolutionary! 💀🔄',
  description: 'What if Lenin had died before the revolution? How would Russian socialism develop without its mastermind?',
  divergenceDescription: 'Lenin dies of stroke in Swiss exile in 1914, removing the key organizer of the Bolshevik Revolution',
  divergenceYear: 1914,
  probability: 25,
  color: '#6B7280',
  icon: '💀',
  image: '/images/chapters/lenin-revolution/timeline_2.png',
  keyEvents: [
    {
      id: 'lenin-death-1914',
      year: 1914,
      month: 8,
      title: 'Lenin\'s Unexpected Exit: The Plot Twist Nobody Saw Coming! 💀😱',
      description: 'Vladimir Lenin dies of a stroke in Swiss exile, leaving the Bolsheviks leaderless and confused.',
      impact: 'Removes the key revolutionary strategist and organizer',
      relatedFigures: ['vladimir-lenin'],
      location: { lat: 46.9481, lng: 7.4474 },
      type: 'political'
    },
    {
      id: 'bolshevik-fragmentation-1915',
      year: 1915,
      month: 3,
      title: 'Bolsheviks Split Like a Bad Relationship! 💔🔨',
      description: 'Without Lenin\'s unifying leadership, Bolsheviks fragment into competing factions with different strategies.',
      impact: 'Weakens radical socialist movement and reduces revolutionary potential',
      relatedFigures: [],
      location: { lat: 59.9311, lng: 30.3609 },
      type: 'political'
    },
    {
      id: 'trotsky-leadership-1917',
      year: 1917,
      month: 4,
      title: 'Trotsky Steps Up: "I Guess I\'m in Charge Now!" 🎭⚡',
      description: 'Leon Trotsky attempts to fill Lenin\'s role but lacks his strategic genius and party authority.',
      impact: 'Different revolutionary strategy with more emphasis on international revolution',
      relatedFigures: ['leon-trotsky'],
      location: { lat: 59.9311, lng: 30.3609 },
      type: 'political'
    },
    {
      id: 'failed-october-1917',
      year: 1917,
      month: 11,
      title: 'October Revolution Fails: Wrong Time, Wrong Leader! ❌🏛️',
      description: 'Without Lenin\'s timing and tactics, the Bolshevik coup attempt fails spectacularly.',
      impact: 'Preserves Provisional Government and prevents communist takeover',
      relatedFigures: ['leon-trotsky'],
      location: { lat: 59.9311, lng: 30.3609 },
      type: 'political'
    },
    {
      id: 'social-democratic-russia-1918',
      year: 1918,
      month: 6,
      title: 'Social Democratic Russia Emerges! 🌹🏛️',
      description: 'Moderate socialists form government similar to German Social Democrats.',
      impact: 'Creates democratic socialist state without communist extremism',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'evolutionary-socialism-1920',
      year: 1920,
      month: 1,
      title: 'Gradual Socialism: Change Without the Chaos! 🐌🌹',
      description: 'Russia adopts gradual socialist reforms while maintaining democratic institutions.',
      impact: 'Peaceful transition to socialist economy through democratic means',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'economic'
    }
  ],
  consequences: [
    {
      id: 'moderate-socialism',
      category: 'political',
      shortTerm: 'Moderate socialist government without revolutionary extremism',
      longTerm: 'Democratic socialist development similar to Scandinavian model',
      globalImpact: 'No communist threat changes entire 20th century dynamics'
    },
    {
      id: 'no-soviet-union',
      category: 'political',
      shortTerm: 'No Bolshevik state means no Soviet model for other countries',
      longTerm: 'Communist movements worldwide develop differently without Soviet example',
      globalImpact: 'Different ideological landscape of 20th century'
    }
  ],
  butterfly: [
    {
      id: 'no-cold-war',
      trigger: 'No Soviet Union means no ideological confrontation with capitalism',
      consequence: 'Different post-WWII world order based on democratic competition',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'different-china',
      trigger: 'No Soviet model for Mao Zedong to follow',
      consequence: 'Chinese revolution takes different form or doesn\'t happen',
      magnitude: 'massive',
      timespan: 150
    }
  ],
  presentDayStatus: 'The Russian Social Democratic Republic is one of Europe\'s most prosperous countries. It pioneered the "Nordic model" of capitalism with strong social safety nets. Ironically, they named their main airport after Lenin - the guy who wasn\'t there when it mattered! ✈️😅'
};

// Alternative Timeline 3: Trotsky Leadership
const trotskyLeadershipTimeline: Timeline = {
  id: 'trotsky-leadership',
  title: 'Permanent Revolution: Trotsky\'s World Conquest! 🌍⚡',
  description: 'What if Trotsky, not Stalin, had succeeded Lenin? Global revolution instead of socialism in one country!',
  divergenceDescription: 'Trotsky wins the succession struggle after Lenin\'s death and implements permanent revolution strategy',
  divergenceYear: 1924,
  probability: 30,
  color: '#DC2626',
  icon: '🌍',
  image: '/images/chapters/lenin-revolution/timeline_3.png',
  keyEvents: [
    {
      id: 'trotsky-wins-succession-1924',
      year: 1924,
      month: 5,
      title: 'Trotsky Outmaneuvers Stalin: Plot Twist! 🎭👑',
      description: 'The fiery orator defeats the quiet Georgian in the battle for Lenin\'s succession. Charisma beats bureaucracy!',
      impact: 'Changes entire direction of Soviet development toward international revolution',
      relatedFigures: ['leon-trotsky', 'joseph-stalin'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'permanent-revolution-launched-1925',
      year: 1925,
      month: 1,
      title: 'Permanent Revolution Begins: "Workers of the World, UNITE!" 🌍🔥',
      description: 'Trotsky launches aggressive campaign to spread revolution globally, starting with neighboring countries.',
      impact: 'Soviet Union becomes actively interventionist in global communist movements',
      relatedFigures: ['leon-trotsky'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'german-revolution-1926',
      year: 1926,
      month: 10,
      title: 'German Revolution Succeeds: Europe Goes Red! 🔴🇩🇪',
      description: 'Soviet support helps German communists overthrow the Weimar Republic. Two communist superpowers emerge!',
      impact: 'Creates Soviet-German communist bloc dominating Central and Eastern Europe',
      relatedFigures: ['leon-trotsky'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'european-revolution-1928',
      year: 1928,
      month: 6,
      title: 'Communist Dominoes Fall Across Europe! 🔴🌍',
      description: 'Revolutionary wave spreads to Poland, Hungary, and France. Trotsky\'s dream becomes reality!',
      impact: 'Most of Europe becomes communist under Soviet leadership',
      relatedFigures: ['leon-trotsky'],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'political'
    },
    {
      id: 'global-revolutionary-war-1930',
      year: 1930,
      month: 1,
      title: 'World War III: Communism vs. Capitalism! ⚔️🌍',
      description: 'Global ideological war erupts as communist Europe faces capitalist America and Britain.',
      impact: 'World divides into two hostile camps in ultimate ideological conflict',
      relatedFigures: ['leon-trotsky'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'military'
    },
    {
      id: 'revolutionary-empire-1935',
      year: 1935,
      month: 12,
      title: 'Trotsky\'s Revolutionary Empire: Mission Accomplished! 👑🔴',
      description: 'Communist revolutionary empire stretches from Lisbon to Vladivostok under Trotsky\'s leadership.',
      impact: 'Creates world\'s first ideological empire based on permanent revolution',
      relatedFigures: ['leon-trotsky'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'global-revolution',
      category: 'political',
      shortTerm: 'Successful export of revolution to Europe and beyond',
      longTerm: 'World divided between communist and capitalist blocs much earlier',
      globalImpact: 'Different world war in 1930s between ideological systems'
    },
    {
      id: 'revolutionary-state',
      category: 'political',
      shortTerm: 'Soviet Union remains in permanent revolutionary mobilization',
      longTerm: 'No Stalinist bureaucratization but continued revolutionary extremism',
      globalImpact: 'Communist movements worldwide follow Trotskyist rather than Stalinist model'
    }
  ],
  butterfly: [
    {
      id: 'no-hitler',
      trigger: 'Communist Germany prevents Nazi rise to power',
      consequence: 'Holocaust never happens, different European development',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'earlier-ideological-war',
      trigger: 'Global communist revolution triggers capitalist response',
      consequence: 'World War III in 1930s instead of Cold War later',
      magnitude: 'massive',
      timespan: 50
    }
  ],
  presentDayStatus: 'The Trotskyist Revolutionary Federation collapsed in 1989 from exhaustion after 65 years of permanent revolution. Turns out constantly overthrowing governments is really tiring! Today, former communist countries celebrate "Revolution Fatigue Day" annually. 😴🔴'
};

// Interactive story scenarios for Lenin Revolution
const interactiveScenarios = [
  {
    id: 'february-revolution',
    title: 'The February Revolution',
    text: 'February 1917, Petrograd. The Tsar has abdicated! Workers and soldiers flood the streets. You must choose between supporting the Provisional Government or the radical Soviets...',
    emoji: '🏭',
    background: 'bg-linear-to-br from-gray-700 to-red-800',
    characters: ['👑', '⚒️', '🔥'],
    sceneType: 'decision' as const,
    timelineYear: 1917,
    timelineEvent: 'February Revolution - Tsar Nicholas II abdicates',
    choices: [
      {
        id: 'support-provisional',
        text: 'Support the Provisional Government and democratic transition',
        consequence: 'Your support strengthens moderate forces but may delay radical change'
      },
      {
        id: 'join-soviets',
        text: 'Join the workers\' and soldiers\' councils (Soviets)',
        consequence: 'Your radicalism builds revolutionary momentum but destabilizes the government'
      },
      {
        id: 'call-for-order',
        text: 'Call for law and order until elections can be held',
        consequence: 'Your moderation preserves stability but frustrates revolutionary expectations'
      }
    ]
  },
  {
    id: 'lenins-return',
    title: 'Lenin\'s Sealed Train',
    text: 'April 1917. Lenin arrives at Finland Station with his radical "April Theses." He demands immediate revolution. The crowd looks to you - do you support this extremist?',
    emoji: '🚂',
    background: 'bg-linear-to-br from-red-700 to-black',
    characters: ['🧔', '📜', '⚡'],
    sceneType: 'negotiation' as const,
    timelineYear: 1917,
    timelineEvent: 'Lenin returns with April Theses',
    choices: [
      {
        id: 'embrace-lenin',
        text: 'Embrace Lenin\'s call for immediate socialist revolution',
        consequence: 'Your support radicalizes the Bolsheviks and pushes toward October Revolution'
      },
      {
        id: 'demand-moderation',
        text: 'Demand Lenin moderate his position for party unity',
        consequence: 'Your pragmatism creates internal Bolshevik division but maintains broader coalition'
      },
      {
        id: 'reject-extremism',
        text: 'Reject Lenin\'s extremism and break with the Bolsheviks',
        consequence: 'Your break weakens Lenin but strengthens moderate socialist alternatives'
      }
    ]
  },
  {
    id: 'july-days',
    title: 'The July Days Crisis',
    text: 'July 1917. Armed workers and soldiers march demanding "All Power to the Soviets!" The government prepares to crush the uprising. Lenin hesitates - should the Bolsheviks lead or hold back?',
    emoji: '🔫',
    background: 'bg-linear-to-br from-orange-600 to-red-900',
    characters: ['⚔️', '🏃', '💥'],
    sceneType: 'battle' as const,
    timelineYear: 1917,
    timelineEvent: 'July Days uprising fails',
    choices: [
      {
        id: 'lead-uprising',
        text: 'Lead the armed uprising against the Provisional Government',
        consequence: 'Your leadership might succeed in overthrowing the government or lead to disaster'
      },
      {
        id: 'strategic-retreat',
        text: 'Order strategic retreat to preserve revolutionary forces',
        consequence: 'Your caution saves the party but misses a revolutionary opportunity'
      },
      {
        id: 'split-difference',
        text: 'Support the workers but avoid direct Bolshevik involvement',
        consequence: 'Your compromise maintains plausible deniability but confuses your supporters'
      }
    ]
  },
  {
    id: 'october-revolution',
    title: 'The October Revolution',
    text: 'October 25, 1917. Bolshevik forces surround the Winter Palace. Kerensky has fled. This is the moment - seize power for the proletariat or negotiate a coalition?',
    emoji: '🏰',
    background: 'bg-linear-to-br from-red-800 to-purple-900',
    characters: ['🔴', '👑', '⚡'],
    sceneType: 'battle' as const,
    timelineYear: 1917,
    timelineEvent: 'October Revolution - Bolsheviks seize power',
    choices: [
      {
        id: 'seize-total-power',
        text: 'Seize total power in the name of the working class',
        consequence: 'Your boldness creates the Soviet state but triggers civil war'
      },
      {
        id: 'coalition-government',
        text: 'Negotiate a coalition with other socialist parties',
        consequence: 'Your compromise shares power but may weaken revolutionary purity'
      },
      {
        id: 'demand-elections',
        text: 'Demand immediate elections to legitimize any new government',
        consequence: 'Your democratic principles risk losing power to more moderate parties'
      }
    ]
  },
  {
    id: 'civil-war-begins',
    title: 'The Russian Civil War',
    text: 'November 1917. White Army generals are rallying opposition. Foreign powers threaten intervention. How do you defend the revolution?',
    emoji: '⚔️',
    background: 'bg-linear-to-br from-black to-red-900',
    characters: ['🔴', '⚪', '🌍'],
    sceneType: 'battle' as const,
    timelineYear: 1918,
    timelineEvent: 'Russian Civil War begins',
    choices: [
      {
        id: 'total-war',
        text: 'Mobilize total war against all enemies of the revolution',
        consequence: 'Your militarization wins the war but transforms Russia into an armed camp'
      },
      {
        id: 'negotiate-peace',
        text: 'Try to negotiate separate peace deals with different White factions',
        consequence: 'Your diplomacy might divide enemies but could be seen as weakness'
      },
      {
        id: 'foreign-alliances',
        text: 'Seek foreign communist allies and international revolution',
        consequence: 'Your internationalism spreads revolution but increases foreign intervention'
      }
    ]
  }
];

// Main chapter data
export const leninRevolutionChapter: Chapter = {
  id: 'lenin-revolution',
  title: 'Lenin Revolution',
  period: '1917',
  startYear: 1914,
  endYear: 1924,
  description: 'The Ultimate Revolutionary Takeover: How a Bald Genius Changed the World! 💀⚡ Follow Lenin\'s incredible journey from Swiss exile to absolute ruler of Russia. It\'s got conspiracy, betrayal, brilliant strategy, and the most successful hostile takeover in history. Plus trains, lots of dramatic speeches, and the invention of the modern police state! 🚂🔴',
  historicalContext: 'Russia in 1917 was like a pressure cooker that had been building steam for decades - and then someone forgot to turn off the heat! 💥 World War I was a disaster, the Tsar was clueless, people were starving, and everyone was pretty much done with the whole "autocracy" thing. Enter Vladimir Lenin, a professional revolutionary who had been plotting in Swiss coffee shops for years, waiting for exactly this moment. What happened next was the world\'s first successful communist revolution, and it was WAY more dramatic than any movie! 🎬⚡',
  keyFigures,
  divergencePoint: 'Lenin\'s Return and the October Revolution',
  divergenceYear: 1917,
  alternativeTimelines: [
    menshevikVictoryTimeline,
    leninDiesEarlyTimeline,
    trotskyLeadershipTimeline,
    // Additional timelines can be added here...
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/lenin-revolution/main.png',
  icon: '⚡',
  backgroundColor: 'from-red-600 to-yellow-600'
};