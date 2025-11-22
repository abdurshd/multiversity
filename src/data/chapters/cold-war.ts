import { Chapter, Timeline, Person } from '../../types';

// Key figures with tension-filled descriptions
const keyFigures: Person[] = [
  {
    id: 'harry-truman',
    name: 'Harry S. Truman',
    role: 'The Accidental President Who Started It All',
    born: 1884,
    died: 1972,
    description: 'The haberdasher from Missouri who suddenly had to deal with Stalin and atomic bombs! 💣🤠 Went from small-town politician to making decisions that shaped the entire world. "The buck stops here" indeed!',
    image: '/images/chapters/cold-war/people/harry-s-truman.png'
  },
  {
    id: 'joseph-stalin-cold-war',
    name: 'Joseph Stalin',
    role: 'The Paranoid Dictator Who Trusted Nobody',
    born: 1878,
    died: 1953,
    description: 'The Georgian who built an Iron Curtain and never met a conspiracy he didn\'t believe! 🐻🕵️ Turned Eastern Europe into his personal fortress and made "Uncle Joe" the world\'s most feared uncle.',
    image: '/images/chapters/cold-war/people/joseph-stalin.png'
  },
  {
    id: 'winston-churchill-cold-war',
    name: 'Winston Churchill',
    role: 'The Prophet Who Saw It Coming',
    born: 1874,
    died: 1965,
    description: 'The bulldog who coined "Iron Curtain" and warned everyone about Soviet intentions! 🐕🔮 From wartime ally to Cold War prophet - his Fulton speech started the whole thing!',
    image: '/images/chapters/cold-war/people/winston-churchill.png'
  },
  {
    id: 'nikita-khrushchev',
    name: 'Nikita Khrushchev',
    role: 'The Shoe-Banging Premier Who Almost Ended the World',
    born: 1894,
    died: 1971,
    description: 'The Ukrainian peasant who banged his shoe at the UN and put missiles in Cuba! 👞💥 Tough as nails but smart enough to avoid nuclear war. "We will bury you!" (Spoiler: they didn\'t)',
    image: '/images/chapters/cold-war/people/nikita-khrushchev.png'
  },
  {
    id: 'john-f-kennedy',
    name: 'John F. Kennedy',
    role: 'The Young President Who Faced Down Armageddon',
    born: 1917,
    died: 1963,
    description: 'The charismatic president who stared down nuclear war and inspired a generation! 🌟🚀 From Bay of Pigs disaster to Cuban Missile Crisis hero to moon landing visionary. Camelot had its moments!',
    image: '/images/chapters/cold-war/people/john-f-kennedy.png'
  },
  {
    id: 'ronald-reagan',
    name: 'Ronald Reagan',
    role: 'The Hollywood Actor Who Called It an Evil Empire',
    born: 1911,
    died: 2004,
    description: 'The former movie star who challenged Gorbachev to "tear down this wall!" 🎬🧱 Proved that sometimes an optimistic cowboy is exactly what the world needs to end a Cold War.',
    image: '/images/chapters/cold-war/people/ronald-reagan.png'
  },
  {
    id: 'mikhail-gorbachev',
    name: 'Mikhail Gorbachev',
    role: 'The Reformer Who Accidentally Ended the Soviet Union',
    born: 1931,
    died: 2022,
    description: 'The Soviet leader who tried to save communism and accidentally destroyed it! 🔨💔 Glasnost, perestroika, and the birthmark that changed the world. Sometimes good intentions have unexpected consequences!',
    image: '/images/chapters/cold-war/people/mikhail-gorbachev.png'
  },
  {
    id: 'fidel-castro',
    name: 'Fidel Castro',
    role: 'The Caribbean Revolutionary Who Almost Started WWIII',
    born: 1926,
    died: 2016,
    description: 'The bearded revolutionary who brought communism 90 miles from Florida! 🇨🇺⚔️ Survived Bay of Pigs, hosted Soviet missiles, and outlasted 10 US presidents. Ultimate survivor!',
    image: '/images/chapters/cold-war/people/fidel-castro.png'
  }
];


// Alternative Timeline 1: Nuclear War
const nuclearWarTimeline: Timeline = {
  id: 'nuclear-war',
  title: 'Nuclear War: The Cuban Missile Crisis Goes Wrong! ☢️💀',
  description: 'What if the Cuban Missile Crisis had escalated into full nuclear exchange between superpowers?',
  divergenceDescription: 'Communication breakdown during Cuban Missile Crisis leads to nuclear exchange between US and USSR',
  divergenceYear: 1962,
  probability: 15,
  color: '#FF0000',
  icon: '☢️',
  image: '/images/chapters/cold-war/timeline_1.png',
  keyEvents: [
    {
      id: 'nuclear-exchange-1962',
      year: 1962,
      month: 10,
      day: 27,
      title: 'Nuclear Exchange: The Day the World Ended! ☢️💥',
      description: 'Soviet submarine B-59 launches nuclear torpedo, triggering automatic responses. Within hours, major cities on both sides are destroyed.',
      impact: 'Beginning of nuclear war that devastates Northern Hemisphere',
      relatedFigures: ['john-f-kennedy', 'nikita-khrushchev'],
      location: { lat: 22.0773, lng: -81.1550 },
      type: 'military'
    },
    {
      id: 'global-devastation-1962',
      year: 1962,
      month: 10,
      day: 28,
      title: 'Global Nuclear Devastation: Cities Become Glass! 🏙️💀',
      description: 'Moscow, Washington, New York, Leningrad, and dozens of other cities destroyed in nuclear exchange. 100+ million dead in first day.',
      impact: 'Destroys major population centers and government infrastructure',
      relatedFigures: [],
      location: { lat: 40.7128, lng: -74.0060 },
      type: 'military'
    },
    {
      id: 'nuclear-winter-1963',
      year: 1963,
      month: 1,
      day: 1,
      title: 'Nuclear Winter Begins: The Sun Goes Dark! ❄️🌑',
      description: 'Dust and radiation block sunlight, causing global temperature drop and crop failures. Nuclear winter kills more than the bombs.',
      impact: 'Global climate catastrophe and agricultural collapse',
      relatedFigures: [],
      location: { lat: 60.0000, lng: 0.0000 },
      type: 'technological'
    },
    {
      id: 'civilization-collapse-1965',
      year: 1965,
      month: 7,
      day: 1,
      title: 'Civilization Collapses: Back to the Stone Age! 🏛️💔',
      description: 'Industrial civilization collapses in Northern Hemisphere. Survivors struggle in agrarian communities. Technology sets back centuries.',
      impact: 'Complete breakdown of modern industrial society',
      relatedFigures: [],
      location: { lat: 50.0000, lng: 0.0000 },
      type: 'social'
    },
    {
      id: 'southern-hemisphere-rises-1970',
      year: 1970,
      month: 1,
      day: 1,
      title: 'Southern Hemisphere Takes Over: New World Order! 🌍🔄',
      description: 'Australia, Brazil, Argentina, and South Africa become new world powers as Northern Hemisphere recovers slowly.',
      impact: 'Complete shift in global power balance to Southern Hemisphere',
      relatedFigures: [],
      location: { lat: -25.2744, lng: 133.7751 },
      type: 'political'
    },
    {
      id: 'nuclear-abolition-treaty-1975',
      year: 1975,
      month: 8,
      day: 6,
      title: 'Nuclear Abolition Treaty: "Never Again!" 🚫☢️',
      description: 'Surviving nations sign treaty completely banning nuclear weapons. The horror of 1962 ensures nuclear weapons never built again.',
      impact: 'Complete elimination of nuclear weapons globally',
      relatedFigures: [],
      location: { lat: -33.8688, lng: 151.2093 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'civilizational-reset',
      category: 'social',
      shortTerm: 'Industrial civilization collapses in Northern Hemisphere',
      longTerm: 'Technology and social organization set back by centuries',
      globalImpact: 'Different path of human development based on survival rather than growth'
    },
    {
      id: 'nuclear-taboo',
      category: 'political',
      shortTerm: 'Nuclear weapons immediately recognized as unusable',
      longTerm: 'Complete global prohibition on nuclear weapons development',
      globalImpact: 'Alternative security paradigm based on conventional forces'
    }
  ],
  butterfly: [
    {
      id: 'environmental-awakening',
      trigger: 'Nuclear winter demonstrates human ability to destroy environment',
      consequence: 'Earlier and stronger environmental movement',
      magnitude: 'large',
      timespan: 100
    },
    {
      id: 'southern-dominance',
      trigger: 'Northern Hemisphere devastation shifts power to Southern Hemisphere',
      consequence: 'Different model of development led by Global South',
      magnitude: 'massive',
      timespan: 200
    }
  ],
  presentDayStatus: 'October 27th is observed globally as "Nuclear Horror Day" - the anniversary of humanity\'s closest call with extinction. The Southern Hemisphere Alliance leads the world in renewable energy and peace studies. Nuclear weapons are banned by international law with the death penalty for violations. 🕊️☢️'
};

// Alternative Timeline 2: Soviet Victory
const sovietVictoryTimeline: Timeline = {
  id: 'soviet-victory',
  title: 'Communist World: The USSR Wins the Cold War! 🚩🌍',
  description: 'What if the Soviet Union had succeeded in spreading communism globally and defeated capitalism?',
  divergenceDescription: 'Soviet Union maintains economic growth, America faces decline, and communist revolution spreads globally',
  divergenceYear: 1970,
  probability: 25,
  color: '#DC2626',
  icon: '🚩',
  image: '/images/chapters/cold-war/timeline_2.png',
  keyEvents: [
    {
      id: 'soviet-economic-miracle-1970',
      year: 1970,
      month: 1,
      day: 1,
      title: 'Soviet Economic Miracle: Planned Economy Works! 🏭📈',
      description: 'Soviet economic reforms succeed spectacularly, achieving sustained 8% growth while America stagnates. Communism proves its superiority!',
      impact: 'Demonstrates economic viability of communist system',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'economic'
    },
    {
      id: 'american-economic-crisis-1975',
      year: 1975,
      month: 1,
      day: 1,
      title: 'American Economic Crisis: Capitalism in Crisis! 💰💔',
      description: 'Vietnam War, oil shocks, and stagflation devastate American economy. Unemployment hits 15%, inequality soars. Is capitalism failing?',
      impact: 'Weakens American global position and domestic confidence',
      relatedFigures: [],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'economic'
    },
    {
      id: 'european-communist-parties-win-1976',
      year: 1976,
      month: 6,
      day: 1,
      title: 'Eurocommunism Triumphs: Europe Goes Red! 🇪🇺🚩',
      description: 'Communist parties win elections in Italy, France, and Spain. Western Europe chooses democratic socialism over capitalism.',
      impact: 'Expands communist influence into heart of Western Europe',
      relatedFigures: [],
      location: { lat: 41.9028, lng: 12.4964 },
      type: 'political'
    },
    {
      id: 'third-world-goes-communist-1980',
      year: 1980,
      month: 1,
      day: 1,
      title: 'Third World Liberation: Global South Goes Communist! 🌍🚩',
      description: 'Successful communist revolutions in Philippines, Thailand, Chile, and Nigeria. Two-thirds of world population under communist rule.',
      impact: 'Majority of world adopts communist or socialist systems',
      relatedFigures: [],
      location: { lat: 14.5995, lng: 120.9842 },
      type: 'political'
    },
    {
      id: 'american-communist-party-1984',
      year: 1984,
      month: 11,
      day: 6,
      title: 'American Communist Party Wins: The Last Domino! 🇺🇸🚩',
      description: 'Economic crisis and social unrest lead to Communist Party victory in US elections. Capitalism\'s last stronghold falls!',
      impact: 'Completes global triumph of communist ideology',
      relatedFigures: [],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'political'
    },
    {
      id: 'world-communist-federation-1990',
      year: 1990,
      month: 1,
      day: 1,
      title: 'World Communist Federation: One World, One System! 🌍🚩',
      description: 'All communist nations unite in World Communist Federation. Private property abolished globally. "Workers of the world" finally unite!',
      impact: 'Creates unified global communist state',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'global-socialism',
      category: 'economic',
      shortTerm: 'Planned economy becomes dominant global system',
      longTerm: 'Different development pattern focused on equality over growth',
      globalImpact: 'Alternative model of human organization without private property'
    },
    {
      id: 'classless-society',
      category: 'social',
      shortTerm: 'Private property abolished and wealth redistributed globally',
      longTerm: 'Emergence of classless, stateless global society',
      globalImpact: 'Different concept of human rights and individual freedom'
    }
  ],
  butterfly: [
    {
      id: 'environmental-protection',
      trigger: 'Central planning prioritizes environmental protection over profit',
      consequence: 'Earlier and more effective response to climate change',
      magnitude: 'large',
      timespan: 100
    },
    {
      id: 'technological-development',
      trigger: 'Global cooperation in science and technology without competition',
      consequence: 'Different pattern of technological progress',
      magnitude: 'medium',
      timespan: 75
    }
  ],
  presentDayStatus: 'The World Communist Federation celebrated its 35th anniversary in 2025. May 1st (Workers\' Day) is the global holiday, and the International has replaced national anthems worldwide. Private property is a historical curiosity studied in museums. 🚩🌍'
};

// Alternative Timeline 3: Peaceful Coexistence
const peacefulCoexistenceTimeline: Timeline = {
  id: 'peaceful-coexistence',
  title: 'Peaceful Coexistence: The Cold War That Never Was! 🕊️🤝',
  description: 'What if the superpowers had chosen cooperation over confrontation from the beginning?',
  divergenceDescription: 'Stalin and Truman agree to spheres of influence and peaceful competition after WWII',
  divergenceYear: 1945,
  probability: 30,
  color: '#10B981',
  icon: '🕊️',
  image: '/images/chapters/cold-war/timeline_3.png',
  keyEvents: [
    {
      id: 'yalta-cooperation-1945',
      year: 1945,
      month: 2,
      day: 11,
      title: 'Yalta Success: The Big Three Actually Agree! 🤝🌍',
      description: 'Roosevelt, Churchill, and Stalin successfully negotiate lasting spheres of influence agreement. Clear boundaries prevent future conflicts.',
      impact: 'Establishes framework for peaceful superpower coexistence',
      relatedFigures: ['joseph-stalin-cold-war', 'harry-truman'],
      location: { lat: 44.4952, lng: 34.1615 },
      type: 'political'
    },
    {
      id: 'cooperative-nuclear-control-1946',
      year: 1946,
      month: 1,
      day: 1,
      title: 'Nuclear Cooperation: Atoms for Peace from the Start! ☢️🕊️',
      description: 'US and USSR agree to joint nuclear oversight and gradual disarmament. Nuclear technology used for energy, not weapons.',
      impact: 'Prevents nuclear arms race and promotes peaceful nuclear development',
      relatedFigures: ['harry-truman'],
      location: { lat: 40.7589, lng: -73.9851 },
      type: 'military'
    },
    {
      id: 'cooperative-marshall-plan-1947',
      year: 1947,
      month: 6,
      day: 5,
      title: 'Cooperative Reconstruction: East and West Rebuild Together! 🏗️🤝',
      description: 'Marshall Plan includes Soviet Union and Eastern Europe. Cooperative reconstruction builds economic interdependence.',
      impact: 'Creates economic cooperation between capitalist and communist blocs',
      relatedFigures: ['harry-truman'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'economic'
    },
    {
      id: 'joint-space-program-1957',
      year: 1957,
      month: 10,
      day: 4,
      title: 'Joint Space Program: To the Stars Together! 🚀🌟',
      description: 'Instead of space race, US and USSR launch joint space program. Sputnik carries both American and Soviet instruments.',
      impact: 'Space exploration becomes symbol of cooperation rather than competition',
      relatedFigures: ['nikita-khrushchev'],
      location: { lat: 45.6200, lng: 63.3050 },
      type: 'technological'
    },
    {
      id: 'berlin-international-city-1961',
      year: 1961,
      month: 8,
      day: 13,
      title: 'Berlin International City: No Wall Needed! 🏛️🕊️',
      description: 'Instead of building wall, Berlin becomes international city administered jointly by East and West. Symbol of cooperation!',
      impact: 'Berlin becomes model for East-West cooperation',
      relatedFigures: ['nikita-khrushchev'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'peaceful-competition-1962',
      year: 1962,
      month: 10,
      day: 14,
      title: 'Economic Competition Instead of Missiles! 💰🏭',
      description: 'Instead of putting missiles in Cuba, superpowers agree to peaceful economic competition. May the best system win through prosperity!',
      impact: 'Channels superpower rivalry into constructive economic competition',
      relatedFigures: ['john-f-kennedy', 'nikita-khrushchev'],
      location: { lat: 22.0773, lng: -81.1550 },
      type: 'economic'
    },
    {
      id: 'joint-moon-landing-1969',
      year: 1969,
      month: 7,
      day: 20,
      title: 'Joint Moon Landing: "We Come in Peace for All Mankind!" 🌙👨‍🚀',
      description: 'American and Soviet astronauts land on moon together. First words: "We come in peace for all mankind - from all mankind!"',
      impact: 'Space cooperation demonstrates possibility of global unity',
      relatedFigures: [],
      location: { lat: 28.5721, lng: -80.6480 },
      type: 'technological'
    },
    {
      id: 'convergence-theory-1975',
      year: 1975,
      month: 1,
      day: 1,
      title: 'Systems Convergence: Best of Both Worlds! 🔄🌍',
      description: 'Capitalist and communist systems begin converging, adopting each other\'s best features. Mixed economies emerge everywhere.',
      impact: 'Economic systems evolve toward optimal mixed model',
      relatedFigures: [],
      location: { lat: 47.3769, lng: 8.5417 },
      type: 'economic'
    },
    {
      id: 'global-cooperation-1985',
      year: 1985,
      month: 1,
      day: 1,
      title: 'Global Cooperation Framework: World Federation! 🌍🤝',
      description: 'Successful superpower cooperation leads to global federation with shared governance of global issues.',
      impact: 'Creates effective global governance system',
      relatedFigures: ['mikhail-gorbachev'],
      location: { lat: 40.7589, lng: -73.9851 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'no-proxy-wars',
      category: 'political',
      shortTerm: 'No Korean War, Vietnam War, or other proxy conflicts',
      longTerm: 'Millions of lives saved and resources available for development',
      globalImpact: 'Different decolonization process without superpower interference'
    },
    {
      id: 'cooperative-development',
      category: 'economic',
      shortTerm: 'Global resources devoted to development rather than arms',
      longTerm: 'Faster technological progress and higher living standards',
      globalImpact: 'Earlier solutions to global challenges like poverty and disease'
    }
  ],
  butterfly: [
    {
      id: 'environmental-cooperation',
      trigger: 'Early cooperation creates framework for environmental action',
      consequence: 'Climate change addressed before becoming crisis',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'space-civilization',
      trigger: 'Cooperative space program accelerates space exploration',
      consequence: 'Earlier space settlements and resource exploitation',
      magnitude: 'large',
      timespan: 150
    }
  ],
  presentDayStatus: 'The Global Cooperation Federation has successfully managed international relations for 40 years. Climate change was solved by 2000, Mars has permanent settlements, and poverty is extinct. The old "East vs. West" is studied as an example of unnecessary conflict. 🌍🚀'
};

// Interactive story scenarios for Cold War
const interactiveScenarios = [
  {
    id: 'iron-curtain-speech',
    title: 'The Iron Curtain Warning',
    text: 'March 1946, Fulton, Missouri. Winston Churchill asks you to review his speech about Soviet intentions. It will either start the Cold War or prevent it...',
    emoji: '🗣️',
    background: 'bg-linear-to-br from-gray-700 to-blue-900',
    characters: ['🐕', '🔮', '🌍'],
    sceneType: 'decision' as const,
    timelineYear: 1946,
    timelineEvent: 'Churchill\'s Iron Curtain speech',
    choices: [
      {
        id: 'support-warning',
        text: 'Support Churchill\'s warning about Soviet expansion',
        consequence: 'Your support helps define the containment policy and begins the Cold War'
      },
      {
        id: 'urge-diplomacy',
        text: 'Urge continued diplomacy and cooperation with Stalin',
        consequence: 'Your diplomacy delays confrontation but may enable Soviet expansion'
      },
      {
        id: 'propose-neutrality',
        text: 'Propose American neutrality in European affairs',
        consequence: 'Your isolationism leaves Europe to Soviet influence but avoids global tension'
      }
    ]
  },
  {
    id: 'berlin-blockade',
    title: 'The Berlin Crisis',
    text: 'June 1948. Stalin blocks all access to West Berlin, trapping 2 million people. Military leaders suggest forcing the blockade. What do you do?',
    emoji: '✈️',
    background: 'bg-linear-to-br from-blue-800 to-gray-900',
    characters: ['🛩️', '🍞', '⚔️'],
    sceneType: 'battle' as const,
    timelineYear: 1948,
    timelineEvent: 'Berlin Blockade and Airlift',
    choices: [
      {
        id: 'organize-airlift',
        text: 'Organize a massive airlift to supply Berlin',
        consequence: 'Your airlift succeeds brilliantly, showing Western resolve without war'
      },
      {
        id: 'force-blockade',
        text: 'Send armed convoys to force through the blockade',
        consequence: 'Your military action risks World War III but shows absolute determination'
      },
      {
        id: 'negotiate-compromise',
        text: 'Negotiate a face-saving compromise with Stalin',
        consequence: 'Your diplomacy ends the crisis but may be seen as weakness'
      }
    ]
  },
  {
    id: 'cuban-missile-crisis',
    title: 'Thirteen Days in October',
    text: 'October 1962. Soviet missiles are in Cuba, 90 miles from Florida. Your generals want airstrikes, Khrushchev threatens nuclear war. The world holds its breath...',
    emoji: '🚀',
    background: 'bg-linear-to-br from-red-900 to-black',
    characters: ['💣', '📞', '🌍'],
    sceneType: 'negotiation' as const,
    timelineYear: 1962,
    timelineEvent: 'Cuban Missile Crisis - World on brink of nuclear war',
    choices: [
      {
        id: 'naval-blockade',
        text: 'Impose a naval quarantine and negotiate privately',
        consequence: 'Your measured response avoids war while forcing Soviet withdrawal'
      },
      {
        id: 'airstrike-missiles',
        text: 'Launch airstrikes to destroy the missile sites',
        consequence: 'Your military action eliminates the threat but risks nuclear escalation'
      },
      {
        id: 'accept-missiles',
        text: 'Accept Soviet missiles in exchange for guarantees',
        consequence: 'Your acceptance avoids war but changes the nuclear balance forever'
      }
    ]
  },
  {
    id: 'berlin-wall-crisis',
    title: 'The Wall Goes Up',
    text: 'August 1961. East Germans are building a wall through Berlin overnight. Your advisors suggest military action to tear it down before it\'s complete...',
    emoji: '🧱',
    background: 'bg-linear-to-br from-gray-600 to-red-800',
    characters: ['🔨', '🚧', '😢'],
    sceneType: 'decision' as const,
    timelineYear: 1961,
    timelineEvent: 'Construction of Berlin Wall',
    choices: [
      {
        id: 'tear-down-wall',
        text: 'Order immediate action to tear down the wall',
        consequence: 'Your action prevents the wall but risks armed confrontation with Soviets'
      },
      {
        id: 'diplomatic-protest',
        text: 'Lodge strong diplomatic protests but avoid military action',
        consequence: 'Your restraint prevents war but the wall divides Berlin for decades'
      },
      {
        id: 'ignore-east-berlin',
        text: 'Accept East German sovereignty over their territory',
        consequence: 'Your acceptance reduces tension but abandons East Berliners to communist rule'
      }
    ]
  },
  {
    id: 'space-race-decision',
    title: 'The Space Race Challenge',
    text: 'October 1957. Sputnik orbits overhead, beeping Soviet superiority to the world. Congress demands action. How do you respond to this space age humiliation?',
    emoji: '🛰️',
    background: 'bg-linear-to-br from-purple-900 to-blue-black',
    characters: ['🚀', '🌟', '🔬'],
    sceneType: 'exploration' as const,
    timelineYear: 1957,
    timelineEvent: 'Sputnik launches Space Race',
    choices: [
      {
        id: 'crash-space-program',
        text: 'Launch a crash program to beat Soviets to the moon',
        consequence: 'Your ambitious program eventually succeeds but costs enormous resources'
      },
      {
        id: 'military-space-focus',
        text: 'Focus on military applications of space technology',
        consequence: 'Your military emphasis gives strategic advantage but less public appeal'
      },
      {
        id: 'international-cooperation',
        text: 'Propose international cooperation in space exploration',
        consequence: 'Your cooperation reduces costs but may limit American space leadership'
      }
    ]
  }
];

// Main chapter data
export const coldWarChapter: Chapter = {
  id: 'cold-war',
  title: 'The Cold War',
  period: '1945-1991',
  startYear: 1945,
  endYear: 1991,
  description: 'The Ultimate Staring Contest: 46 Years of "I\'m Not Touching You!" 👁️❄️ Watch America and the Soviet Union have the world\'s longest, most expensive, and most dangerous argument without actually fighting each other directly. It\'s got spies, nuclear missiles, space races, proxy wars, and enough paranoia to make everyone nervous! The war where nobody fired a shot, but everybody held their breath! 🚀💣',
  historicalContext: 'After defeating fascism together, the former allies immediately started glaring at each other across a divided world! 😠🌍 America and the Soviet Union each thought their system was obviously the best and couldn\'t understand why the other guy didn\'t just admit it. Add nuclear weapons, competing ideologies, and the world\'s two biggest egos, and you get 46 years of "anything you can do, I can do better" - from space races to chess matches to who could build the most missiles. It was like a really long, really tense family dinner where everyone\'s afraid someone might flip the table! 🍽️💥',
  keyFigures,
  divergencePoint: 'Post-WWII Superpower Relations',
  divergenceYear: 1947,
  alternativeTimelines: [
    nuclearWarTimeline,
    sovietVictoryTimeline,
    peacefulCoexistenceTimeline,
    // Additional timelines can be added here...
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/cold-war/main.png',
  icon: '❄️',
  backgroundColor: 'from-blue-900 to-red-800'
};