import { Chapter, Timeline, HistoricalEvent, Person, Consequence, ButterflyEffect } from '../../types';

// Key figures with dramatic collapse descriptions
const keyFigures: Person[] = [
  {
    id: 'mikhail-gorbachev-collapse',
    name: 'Mikhail Gorbachev',
    role: 'The Man Who Accidentally Destroyed the Soviet Union',
    born: 1931,
    died: 2022,
    description: 'The reformer who tried to save the Soviet Union and accidentally destroyed it instead! 🔨💔 His glasnost and perestroika opened Pandora\'s box. Sometimes good intentions have very unintended consequences!',
    image: '/images/gorbachev-collapse.jpg'
  },
  {
    id: 'boris-yeltsin',
    name: 'Boris Yeltsin',
    role: 'The Rebellious Bear Who Stood on Tanks',
    born: 1931,
    died: 2007,
    description: 'The Russian politician who literally stood on a tank to defend democracy! 🐻🛡️ From Communist Party member to Soviet destroyer to Russian president. Talk about a career change!',
    image: '/images/yeltsin.jpg'
  },
  {
    id: 'ronald-reagan-collapse',
    name: 'Ronald Reagan',
    role: 'The Hollywood President Who Won the Cold War',
    born: 1911,
    died: 2004,
    description: 'The former actor who convinced the Soviets to spend themselves into oblivion! 🎬💸 "Mr. Gorbachev, tear down this wall!" became reality. Sometimes optimism really can change the world!',
    image: '/images/reagan-collapse.jpg'
  },
  {
    id: 'lech-walesa',
    name: 'Lech Wałęsa',
    role: 'The Electrician Who Shocked the System',
    born: 1943,
    died: null,
    description: 'The Polish shipyard worker who founded Solidarity and helped bring down communism! ⚡🔧 Proved that sometimes a simple electrician can rewire an entire political system!',
    image: '/images/walesa.jpg'
  },
  {
    id: 'vaclav-havel',
    name: 'Václav Havel',
    role: 'The Playwright Who Rewrote History',
    born: 1936,
    died: 2011,
    description: 'The Czech playwright who led the Velvet Revolution and became president! 🎭👑 From writing plays to writing constitutions - proving that the pen really is mightier than the sword!',
    image: '/images/havel.jpg'
  },
  {
    id: 'erich-honecker',
    name: 'Erich Honecker',
    role: 'The Last Hard-liner Who Didn\'t Get the Memo',
    born: 1912,
    died: 1994,
    description: 'The East German leader who thought the Wall would last forever! 🧱😴 Famously said the Wall would stand for 100 years... it fell 10 months later. Timing is everything!',
    image: '/images/honecker.jpg'
  },
  {
    id: 'nicolae-ceausescu',
    name: 'Nicolae Ceaușescu',
    role: 'The Tyrant Who Didn\'t See It Coming',
    born: 1918,
    died: 1989,
    description: 'The Romanian dictator who thought he was beloved until the very end! 👑💥 His last speech turned into a revolution in real time. Sometimes delusion meets reality very suddenly!',
    image: '/images/ceausescu.jpg'
  },
  {
    id: 'helmut-kohl',
    name: 'Helmut Kohl',
    role: 'The Chancellor of Unity',
    born: 1930,
    died: 2017,
    description: 'The West German leader who seized the moment and reunified Germany! 🇩🇪🤝 When the Wall fell, he didn\'t hesitate - "We are one people!" Unity through leadership!',
    image: '/images/kohl.jpg'
  }
];

// Historical events with dramatic collapse storytelling
const mainTimelineEvents: HistoricalEvent[] = [
  {
    id: 'gorbachev-becomes-leader-1985',
    year: 1985,
    month: 3,
    day: 11,
    title: 'Gorbachev Takes Power: Change is Coming! 🔨⚡',
    description: 'Young, dynamic Gorbachev becomes Soviet leader promising reforms. The old guard doesn\'t realize they\'re about to reform themselves out of existence!',
    impact: 'Begins reform process that ultimately leads to Soviet collapse',
    relatedFigures: ['mikhail-gorbachev-collapse'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'political'
  },
  {
    id: 'chernobyl-disaster-1986',
    year: 1986,
    month: 4,
    day: 26,
    title: 'Chernobyl Explodes: Soviet System Exposed! ☢️💥',
    description: 'Nuclear reactor explosion reveals Soviet incompetence and cover-up mentality. Glasnost meets reality in the worst possible way. The system is literally toxic!',
    impact: 'Demonstrates Soviet system failures and accelerates glasnost',
    relatedFigures: ['mikhail-gorbachev-collapse'],
    location: { lat: 51.3890, lng: 30.0983 },
    type: 'technological'
  },
  {
    id: 'reykjavik-summit-1986',
    year: 1986,
    month: 10,
    day: 11,
    title: 'Reykjavik Summit: Almost Nuclear Disarmament! 🏔️🕊️',
    description: 'Reagan and Gorbachev nearly agree to eliminate all nuclear weapons but fail over Star Wars. So close to ending the arms race!',
    impact: 'Builds Reagan-Gorbachev relationship despite disagreement',
    relatedFigures: ['mikhail-gorbachev-collapse', 'ronald-reagan-collapse'],
    location: { lat: 64.1466, lng: -21.9426 },
    type: 'political'
  },
  {
    id: 'tear-down-wall-speech-1987',
    year: 1987,
    month: 6,
    day: 12,
    title: 'Reagan: "Tear Down This Wall!" 🧱⚡',
    description: 'Reagan challenges Gorbachev at Brandenburg Gate. The words that seemed impossible become prophecy. Sometimes bold rhetoric becomes reality!',
    impact: 'Creates symbolic pressure for German reunification',
    relatedFigures: ['ronald-reagan-collapse', 'mikhail-gorbachev-collapse'],
    location: { lat: 52.5163, lng: 13.3777 },
    type: 'political'
  },
  {
    id: 'glasnost-unleashed-1987',
    year: 1987,
    month: 1,
    day: 1,
    title: 'Glasnost Unleashed: Truth Breaks Free! 📰💥',
    description: 'Soviet media begins reporting real news for first time in 70 years. Turns out people don\'t like being lied to for decades. Who knew?',
    impact: 'Reveals extent of Soviet problems and builds opposition movements',
    relatedFigures: ['mikhail-gorbachev-collapse'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'social'
  },
  {
    id: 'solidarity-strikes-1988',
    year: 1988,
    month: 8,
    day: 1,
    title: 'Polish Solidarity Strikes: Workers Unite for Freedom! ⚡🔧',
    description: 'Solidarity movement paralyzes Poland with nationwide strikes. Wałęsa proves that sometimes an electrician can shock the entire system!',
    impact: 'Demonstrates power of organized opposition in communist states',
    relatedFigures: ['lech-walesa'],
    location: { lat: 54.3520, lng: 18.6466 },
    type: 'social'
  },
  {
    id: 'hungarian-border-opens-1989',
    year: 1989,
    month: 5,
    day: 2,
    title: 'Hungary Opens Iron Curtain: First Crack in the Wall! 🇭🇺🕳️',
    description: 'Hungary cuts fence on Austrian border, creating first hole in Iron Curtain. East Germans start "vacationing" to the West permanently!',
    impact: 'Creates escape route for East Germans and pressures other communist states',
    relatedFigures: [],
    location: { lat: 47.4979, lng: 16.4491 },
    type: 'political'
  },
  {
    id: 'poland-free-elections-1989',
    year: 1989,
    month: 6,
    day: 4,
    title: 'Poland\'s Free Elections: Democracy Wins Big! 🗳️🇵🇱',
    description: 'First free elections in communist bloc since 1940s. Solidarity wins landslide victory. Turns out people prefer freedom when given the choice!',
    impact: 'First democratic government in Soviet bloc, inspires other movements',
    relatedFigures: ['lech-walesa'],
    location: { lat: 52.2297, lng: 21.0122 },
    type: 'political'
  },
  {
    id: 'east-germans-escape-1989',
    year: 1989,
    month: 9,
    day: 1,
    title: 'East German Exodus: "We\'re Outta Here!" 🚗💨',
    description: 'Thousands of East Germans escape through Hungary and Czechoslovakia. The "vacation" that never ends! East Germany is literally emptying out.',
    impact: 'Creates crisis in East Germany and pressures regime',
    relatedFigures: [],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'social'
  },
  {
    id: 'honecker-falls-1989',
    year: 1989,
    month: 10,
    day: 18,
    title: 'Honecker Falls: Hard-liner Gets Reality Check! 👑💔',
    description: 'East German leader Erich Honecker forced to resign as protests grow. The man who said the Wall would last 100 years learns about miscalculation!',
    impact: 'Removes hardline leadership and opens path for change',
    relatedFigures: ['erich-honecker'],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'political'
  },
  {
    id: 'berlin-wall-falls-1989',
    year: 1989,
    month: 11,
    day: 9,
    title: 'Berlin Wall Falls: "Die Mauer ist Weg!" 🧱💥',
    description: 'Confused East German official announces border opening, thousands rush the Wall with hammers and pickaxes! The party that changed the world begins!',
    impact: 'Symbolic end of Cold War division and beginning of German reunification',
    relatedFigures: ['mikhail-gorbachev-collapse'],
    location: { lat: 52.5074, lng: 13.3765 },
    type: 'political'
  },
  {
    id: 'velvet-revolution-1989',
    year: 1989,
    month: 11,
    day: 17,
    title: 'Velvet Revolution: Gentle Change in Czechoslovakia! 🎭🕊️',
    description: 'Václav Havel leads peaceful revolution in Czechoslovakia. From playwright to president in 6 weeks! Sometimes the best revolutions are the quiet ones.',
    impact: 'Peaceful transition demonstrates possibility of non-violent change',
    relatedFigures: ['vaclav-havel'],
    location: { lat: 50.0755, lng: 14.4378 },
    type: 'political'
  },
  {
    id: 'ceausescu-executed-1989',
    year: 1989,
    month: 12,
    day: 25,
    title: 'Ceaușescu\'s Christmas: Dictator\'s Final Gift! 🎄💀',
    description: 'Romanian revolution overthrows and executes Ceaușescu on Christmas Day. His last speech turned into a revolution in real time. Worst Christmas ever (for him)!',
    impact: 'Violently ends most repressive communist regime in Eastern Europe',
    relatedFigures: ['nicolae-ceausescu'],
    location: { lat: 44.4268, lng: 26.1025 },
    type: 'political'
  },
  {
    id: 'german-reunification-1990',
    year: 1990,
    month: 10,
    day: 3,
    title: 'German Reunification: "Wir sind ein Volk!" 🇩🇪🤝',
    description: 'East and West Germany reunite after 45 years of division. Helmut Kohl seizes the moment! One Germany, one people, one very expensive reunion!',
    impact: 'Creates powerful unified Germany at heart of Europe',
    relatedFigures: ['helmut-kohl'],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'political'
  },
  {
    id: 'lithuania-independence-1990',
    year: 1990,
    month: 3,
    day: 11,
    title: 'Lithuania Declares Independence: "We\'re Done!" 🇱🇹🕊️',
    description: 'Lithuania becomes first Soviet republic to declare independence. The domino effect begins as the empire starts falling apart from within!',
    impact: 'Begins breakup of Soviet Union as republics seek independence',
    relatedFigures: [],
    location: { lat: 54.6872, lng: 25.2797 },
    type: 'political'
  },
  {
    id: 'august-coup-1991',
    year: 1991,
    month: 8,
    day: 19,
    title: 'August Coup: The Last Gasp of Old Guard! 💀⚔️',
    description: 'Communist hardliners try to overthrow Gorbachev but fail spectacularly. Yeltsin stands on tank, people defend democracy. The old system dies with a whimper!',
    impact: 'Failed coup discredits Soviet system and accelerates collapse',
    relatedFigures: ['boris-yeltsin', 'mikhail-gorbachev-collapse'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'political'
  },
  {
    id: 'ukraine-independence-1991',
    year: 1991,
    month: 8,
    day: 24,
    title: 'Ukraine Says Goodbye: "Do Pobachennya, SSSR!" 🇺🇦👋',
    description: 'Ukraine declares independence after failed coup. Without Ukraine, there is no Soviet Union. The second largest republic says "hasta la vista, USSR!"',
    impact: 'Ukraine independence makes Soviet Union unsustainable',
    relatedFigures: [],
    location: { lat: 50.4501, lng: 30.5234 },
    type: 'political'
  },
  {
    id: 'cis-formation-1991',
    year: 1991,
    month: 12,
    day: 8,
    title: 'CIS Formation: USSR Gets Replaced by... Something! 🔄❓',
    description: 'Commonwealth of Independent States replaces Soviet Union. It\'s like the USSR but with less "union" and more "independent." Gorbachev\'s job just disappeared!',
    impact: 'Formal replacement of Soviet Union with loose confederation',
    relatedFigures: ['boris-yeltsin'],
    location: { lat: 52.2297, lng: 23.8173 },
    type: 'political'
  },
  {
    id: 'gorbachev-resigns-1991',
    year: 1991,
    month: 12,
    day: 25,
    title: 'Gorbachev Resigns: "That\'s All, Folks!" 🎬💔',
    description: 'Gorbachev resigns as president of a country that no longer exists. The Soviet flag comes down for the last time. 74 years of communism end with paperwork!',
    impact: 'Official end of Soviet Union and Cold War',
    relatedFigures: ['mikhail-gorbachev-collapse'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'political'
  },
  {
    id: 'soviet-flag-lowered-1991',
    year: 1991,
    month: 12,
    day: 25,
    title: 'Soviet Flag Lowered: End of an Empire! 🚩💀',
    description: 'Red flag with hammer and sickle comes down from Kremlin for the last time. Russian tricolor goes up. 69 years of Soviet power ends at 7:32 PM Moscow time.',
    impact: 'Symbolic end of Soviet empire and communist superpower',
    relatedFigures: [],
    location: { lat: 55.7520, lng: 37.6175 },
    type: 'political'
  }
];

// Alternative Timeline 1: Successful Coup
const successfulCoupTimeline: Timeline = {
  id: 'successful-coup',
  title: 'August Coup Succeeds: Hard-liners Take Control! 💀🚩',
  description: 'What if the August 1991 coup had succeeded and communist hardliners had stopped the collapse?',
  divergenceDescription: 'August coup succeeds, Gorbachev is removed, and hardline communists restore Soviet control',
  divergenceYear: 1991,
  probability: 35,
  color: '#DC2626',
  icon: '💀',
  keyEvents: [
    {
      id: 'coup-succeeds-1991',
      year: 1991,
      month: 8,
      day: 21,
      title: 'August Coup Succeeds: Old Guard Wins! 💀👑',
      description: 'Military supports hardliners, Yeltsin is arrested, and Gorbachev remains under house arrest. The Soviet Union gets a second lease on life!',
      impact: 'Restores hardline communist control and halts democratic reforms',
      relatedFigures: ['boris-yeltsin', 'mikhail-gorbachev-collapse'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'martial-law-declared-1991',
      year: 1991,
      month: 8,
      day: 22,
      title: 'Martial Law Across USSR: Iron Fist Returns! ✊⚔️',
      description: 'New leadership declares martial law, arrests democrats, and shuts down independent media. The brief spring of freedom ends with winter.',
      impact: 'Suppresses democratic movements and restores authoritarian control',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'eastern-europe-crackdown-1992',
      year: 1992,
      month: 3,
      day: 1,
      title: 'Eastern Europe Crackdown: Iron Curtain Rebuilds! 🧱🔄',
      description: 'Hardline USSR intervenes in Eastern Europe, reversing democratic transitions. The Berlin Wall gets rebuilt (metaphorically).',
      impact: 'Reverses democratic transitions in Eastern Europe',
      relatedFigures: [],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'military'
    },
    {
      id: 'new-cold-war-1993',
      year: 1993,
      month: 1,
      day: 1,
      title: 'Cold War 2.0: The Sequel Nobody Wanted! ❄️🔄',
      description: 'Restored Soviet Union faces off against Western democracies in new Cold War. History doesn\'t repeat, but it sure rhymes!',
      impact: 'Renews superpower confrontation and ideological conflict',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'economic-stagnation-1995',
      year: 1995,
      month: 1,
      day: 1,
      title: 'Economic Collapse: Old System Can\'t Work! 📉💔',
      description: 'Despite political control, Soviet economy continues declining. You can\'t restore the past when the future has already begun.',
      impact: 'Economic problems undermine restored communist system',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'economic'
    },
    {
      id: 'second-collapse-2001',
      year: 2001,
      month: 12,
      day: 25,
      title: 'Second Soviet Collapse: Can\'t Stop History! 💀🔄',
      description: 'Economic reality catches up with political fantasy. The second Soviet Union collapses exactly 10 years after the first. Déjà vu all over again!',
      impact: 'Final collapse of communist system proves historical inevitability',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'delayed-democracy',
      category: 'political',
      shortTerm: 'Democratic transitions delayed by 10 years across Eastern Europe',
      longTerm: 'Russia and former Soviet states develop differently with authoritarian legacy',
      globalImpact: 'Different post-Cold War order with continued superpower rivalry'
    },
    {
      id: 'economic-devastation',
      category: 'economic',
      shortTerm: 'Prolonged economic decline under restored communist system',
      longTerm: 'Deeper economic collapse when system finally fails again',
      globalImpact: 'Different pattern of global economic integration'
    }
  ],
  butterfly: [
    {
      id: 'delayed-globalization',
      trigger: 'Continued Cold War delays economic integration',
      consequence: 'Different pattern of globalization with more competing blocs',
      magnitude: 'large',
      timespan: 50
    },
    {
      id: 'nuclear-proliferation',
      trigger: 'Continued superpower rivalry accelerates arms races',
      consequence: 'More countries develop nuclear weapons for security',
      magnitude: 'large',
      timespan: 30
    }
  ],
  presentDayStatus: 'The "Second Soviet Collapse" of 2001 is remembered as proof that "you can\'t go home again." August 19th is observed as "Democracy Survival Day" celebrating Yeltsin\'s courage. The coup leaders are remembered as the "Gang That Couldn\'t Shoot Straight." 🏛️💔'
};

// Alternative Timeline 2: Gradual Reform
const gradualReformTimeline: Timeline = {
  id: 'gradual-reform',
  title: 'Gradual Reform: USSR Becomes Democratic Federation! 🐻🗳️',
  description: 'What if Gorbachev had managed gradual democratic reforms while preserving the Soviet Union?',
  divergenceDescription: 'Gorbachev successfully implements constitutional reforms creating democratic Soviet federation',
  divergenceYear: 1988,
  probability: 40,
  color: '#10B981',
  icon: '🐻',
  keyEvents: [
    {
      id: 'constitutional-convention-1988',
      year: 1988,
      month: 6,
      day: 1,
      title: 'Soviet Constitutional Convention: Democracy Comes to Moscow! 🏛️📜',
      description: 'Gorbachev convenes constitutional convention to democratize Soviet Union while preserving federation. Gradual change instead of collapse!',
      impact: 'Begins transformation to democratic federal system',
      relatedFigures: ['mikhail-gorbachev-collapse'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'free-elections-1989',
      year: 1989,
      month: 3,
      day: 26,
      title: 'Free Soviet Elections: People Choose Democracy! 🗳️🚩',
      description: 'First free elections in Soviet history produce democratic parliament. Communists win some seats, democrats win more. Peaceful transition begins!',
      impact: 'Establishes democratic legitimacy while maintaining union',
      relatedFigures: ['mikhail-gorbachev-collapse'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'market-reforms-1990',
      year: 1990,
      month: 1,
      day: 1,
      title: 'Market Economy Transition: Gradual Capitalism! 💰🔄',
      description: 'Careful introduction of market mechanisms while maintaining social safety net. China-style reforms come to the Soviet Union!',
      impact: 'Economic transition without shock therapy devastation',
      relatedFigures: ['mikhail-gorbachev-collapse'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'economic'
    },
    {
      id: 'peaceful-independence-1991',
      year: 1991,
      month: 8,
      day: 20,
      title: 'Negotiated Independence: Peaceful Divorce! 🤝🕊️',
      description: 'Baltic states and other republics gain independence through negotiation instead of crisis. Amicable separation instead of messy collapse!',
      impact: 'Peaceful transition allows cooperation instead of conflict',
      relatedFigures: [],
      location: { lat: 54.6872, lng: 25.2797 },
      type: 'political'
    },
    {
      id: 'democratic-russian-federation-1991',
      year: 1991,
      month: 12,
      day: 25,
      title: 'Democratic Russian Federation: Smooth Transition! 🇷🇺🗳️',
      description: 'Russia emerges as stable democratic federation instead of chaotic post-Soviet state. Gradual change prevents oligarch capitalism!',
      impact: 'Creates stable democratic Russian state',
      relatedFigures: ['boris-yeltsin'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'eurasian-confederation-1995',
      year: 1995,
      month: 1,
      day: 1,
      title: 'Eurasian Democratic Confederation: Voluntary Union! 🌍🤝',
      description: 'Former Soviet states form voluntary democratic confederation. Like the EU but with more vodka and better literature!',
      impact: 'Creates cooperative framework for post-Soviet development',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'stable-transition',
      category: 'political',
      shortTerm: 'Gradual democratic transition without chaos or collapse',
      longTerm: 'Stable democratic institutions develop organically',
      globalImpact: 'Different model of transition from authoritarianism to democracy'
    },
    {
      id: 'economic-stability',
      category: 'economic',
      shortTerm: 'Gradual market reforms avoid economic devastation of 1990s',
      longTerm: 'Stronger economic growth and less inequality',
      globalImpact: 'Alternative model of economic transition influences other countries'
    }
  ],
  butterfly: [
    {
      id: 'no-oligarchs',
      trigger: 'Gradual reform prevents asset stripping and oligarch emergence',
      consequence: 'More equitable economic development and stronger democracy',
      magnitude: 'large',
      timespan: 50
    },
    {
      id: 'cooperative-eurasia',
      trigger: 'Peaceful transition enables continued cooperation',
      consequence: 'Eurasian integration provides alternative to Western dominance',
      magnitude: 'medium',
      timespan: 100
    }
  ],
  presentDayStatus: 'The Eurasian Democratic Confederation is one of the world\'s most successful multi-ethnic federations. Gorbachev is remembered as the "Great Reformer" who proved change doesn\'t require collapse. March 11th is celebrated as "Gradual Change Day." 🐻🗳️'
};

// Alternative Timeline 3: Peaceful Dissolution
const peacefulDissolutionTimeline: Timeline = {
  id: 'peaceful-dissolution',
  title: 'Velvet Divorce: The USSR Splits Amicably! 🕊️💔',
  description: 'What if the Soviet Union had dissolved peacefully through negotiation rather than crisis and collapse?',
  divergenceDescription: 'Soviet republics negotiate peaceful dissolution through constitutional process in 1990',
  divergenceYear: 1990,
  probability: 25,
  color: '#8B5CF6',
  icon: '🕊️',
  keyEvents: [
    {
      id: 'union-treaty-negotiations-1990',
      year: 1990,
      month: 3,
      day: 1,
      title: 'Union Treaty Negotiations: Let\'s Talk This Through! 🤝📝',
      description: 'All Soviet republics agree to negotiate new union treaty or peaceful separation. Mature adults having mature conversations!',
      impact: 'Establishes framework for peaceful dissolution',
      relatedFigures: ['mikhail-gorbachev-collapse'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'referendum-on-independence-1990',
      year: 1990,
      month: 9,
      day: 1,
      title: 'Independence Referendums: Democracy in Action! 🗳️🕊️',
      description: 'Each republic holds free referendum on independence or union membership. People get to choose their own destiny for once!',
      impact: 'Democratic legitimacy for independence or union membership',
      relatedFigures: [],
      location: { lat: 50.4501, lng: 30.5234 },
      type: 'political'
    },
    {
      id: 'asset-division-agreement-1991',
      year: 1991,
      month: 6,
      day: 1,
      title: 'Fair Asset Division: Splitting the Family Fortune! 💰⚖️',
      description: 'Republics agree on fair division of Soviet assets, debts, and military. No fighting over who gets grandma\'s nuclear weapons!',
      impact: 'Prevents conflicts over resources and military assets',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'economic'
    },
    {
      id: 'coordinated-independence-1991',
      year: 1991,
      month: 8,
      day: 24,
      title: 'Coordinated Independence: Everybody Out of the Pool! 🏊‍♂️🚪',
      description: 'All republics declare independence simultaneously in coordinated fashion. The most organized breakup in history!',
      impact: 'Smooth transition without crisis or chaos',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'successor-states-cooperation-1992',
      year: 1992,
      month: 1,
      day: 1,
      title: 'Post-Soviet Cooperation Agreement: Still Friends! 🤝🌍',
      description: 'New independent states sign comprehensive cooperation agreement on trade, security, and culture. Divorce doesn\'t mean we can\'t be friends!',
      impact: 'Maintains beneficial relationships after independence',
      relatedFigures: [],
      location: { lat: 43.2220, lng: 76.8512 },
      type: 'political'
    },
    {
      id: 'economic-union-1995',
      year: 1995,
      month: 1,
      day: 1,
      title: 'Post-Soviet Economic Union: Business as Usual! 💼🤝',
      description: 'Former Soviet states create economic union preserving beneficial trade relationships. Political independence, economic cooperation!',
      impact: 'Preserves economic benefits while maintaining sovereignty',
      relatedFigures: [],
      location: { lat: 43.2220, lng: 76.8512 },
      type: 'economic'
    }
  ],
  consequences: [
    {
      id: 'no-ethnic-conflicts',
      category: 'social',
      shortTerm: 'Peaceful dissolution prevents ethnic conflicts and wars',
      longTerm: 'Better relations between former Soviet peoples',
      globalImpact: 'Model for peaceful dissolution of multi-ethnic states'
    },
    {
      id: 'economic-cooperation',
      category: 'economic',
      shortTerm: 'Maintained economic relationships prevent economic collapse',
      longTerm: 'Stronger economic development through continued cooperation',
      globalImpact: 'Different model of post-imperial economic relationships'
    }
  ],
  butterfly: [
    {
      id: 'no-regional-wars',
      trigger: 'Peaceful dissolution prevents wars in Caucasus and Central Asia',
      consequence: 'Millions of lives saved and different regional development',
      magnitude: 'large',
      timespan: 50
    },
    {
      id: 'cooperative-post-imperialism',
      trigger: 'Successful peaceful dissolution creates precedent',
      consequence: 'Other multi-ethnic states use similar model for reform',
      magnitude: 'medium',
      timespan: 100
    }
  ],
  presentDayStatus: 'The "Velvet Dissolution" is studied worldwide as the perfect example of how to end an empire peacefully. December 25th is celebrated as "Friendship Day" across all former Soviet states. The Post-Soviet Cooperation Organization is more successful than anyone expected! 🕊️🤝'
};

// Main chapter data
export const ussrCollapseChapter: Chapter = {
  id: 'ussr-collapse',
  title: 'USSR Collapse',
  period: '1985-1991',
  startYear: 1985,
  endYear: 1991,
  description: 'The Greatest Plot Twist in History: How the World\'s Biggest Country Just... Disappeared! 🐻💥 Watch Gorbachev try to save the Soviet Union and accidentally destroy it instead! It\'s got failed coups, falling walls, velvet revolutions, and the most anticlimactic ending to a superpower ever. Sometimes trying to fix something breaks it completely! 🔨💔',
  historicalContext: 'By 1985, the Soviet Union was like an old car held together with duct tape and communist ideology! 🚗💨 The economy was stagnating, the people were getting restless, and the leaders were literally dying of old age. Enter Mikhail Gorbachev, the young reformer who thought he could tune up the engine... but ended up in the junkyard instead! His glasnost (openness) and perestroika (restructuring) were supposed to save the system, but it turns out that when you start telling the truth about a lie-based system, things fall apart really quickly! 🏗️💀',
  keyFigures,
  divergencePoint: 'Gorbachev\'s Reform Programs',
  divergenceYear: 1987,
  alternativeTimelines: [
    successfulCoupTimeline,
    gradualReformTimeline,
    peacefulDissolutionTimeline,
    // Additional timelines can be added here...
  ],
  mainImage: '/images/ussr-collapse-main.jpg',
  icon: '🔨',
  backgroundColor: 'from-red-800 to-gray-900'
};