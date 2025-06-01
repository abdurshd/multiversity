import { Chapter, Timeline, HistoricalEvent, Person, Consequence, ButterflyEffect } from '../../types';

// Key figures with tension-filled descriptions
const keyFigures: Person[] = [
  {
    id: 'harry-truman',
    name: 'Harry S. Truman',
    role: 'The Accidental President Who Started It All',
    born: 1884,
    died: 1972,
    description: 'The haberdasher from Missouri who suddenly had to deal with Stalin and atomic bombs! 💣🤠 Went from small-town politician to making decisions that shaped the entire world. "The buck stops here" indeed!',
    image: '/images/truman.jpg'
  },
  {
    id: 'joseph-stalin-cold-war',
    name: 'Joseph Stalin',
    role: 'The Paranoid Dictator Who Trusted Nobody',
    born: 1878,
    died: 1953,
    description: 'The Georgian who built an Iron Curtain and never met a conspiracy he didn\'t believe! 🐻🕵️ Turned Eastern Europe into his personal fortress and made "Uncle Joe" the world\'s most feared uncle.',
    image: '/images/stalin-cold-war.jpg'
  },
  {
    id: 'winston-churchill-cold-war',
    name: 'Winston Churchill',
    role: 'The Prophet Who Saw It Coming',
    born: 1874,
    died: 1965,
    description: 'The bulldog who coined "Iron Curtain" and warned everyone about Soviet intentions! 🐕🔮 From wartime ally to Cold War prophet - his Fulton speech started the whole thing!',
    image: '/images/churchill-cold-war.jpg'
  },
  {
    id: 'nikita-khrushchev',
    name: 'Nikita Khrushchev',
    role: 'The Shoe-Banging Premier Who Almost Ended the World',
    born: 1894,
    died: 1971,
    description: 'The Ukrainian peasant who banged his shoe at the UN and put missiles in Cuba! 👞💥 Tough as nails but smart enough to avoid nuclear war. "We will bury you!" (Spoiler: they didn\'t)',
    image: '/images/khrushchev.jpg'
  },
  {
    id: 'john-f-kennedy',
    name: 'John F. Kennedy',
    role: 'The Young President Who Faced Down Armageddon',
    born: 1917,
    died: 1963,
    description: 'The charismatic president who stared down nuclear war and inspired a generation! 🌟🚀 From Bay of Pigs disaster to Cuban Missile Crisis hero to moon landing visionary. Camelot had its moments!',
    image: '/images/jfk.jpg'
  },
  {
    id: 'ronald-reagan',
    name: 'Ronald Reagan',
    role: 'The Hollywood Actor Who Called It an Evil Empire',
    born: 1911,
    died: 2004,
    description: 'The former movie star who challenged Gorbachev to "tear down this wall!" 🎬🧱 Proved that sometimes an optimistic cowboy is exactly what the world needs to end a Cold War.',
    image: '/images/reagan.jpg'
  },
  {
    id: 'mikhail-gorbachev',
    name: 'Mikhail Gorbachev',
    role: 'The Reformer Who Accidentally Ended the Soviet Union',
    born: 1931,
    died: 2022,
    description: 'The Soviet leader who tried to save communism and accidentally destroyed it! 🔨💔 Glasnost, perestroika, and the birthmark that changed the world. Sometimes good intentions have unexpected consequences!',
    image: '/images/gorbachev.jpg'
  },
  {
    id: 'fidel-castro',
    name: 'Fidel Castro',
    role: 'The Caribbean Revolutionary Who Almost Started WWIII',
    born: 1926,
    died: 2016,
    description: 'The bearded revolutionary who brought communism 90 miles from Florida! 🇨🇺⚔️ Survived Bay of Pigs, hosted Soviet missiles, and outlasted 10 US presidents. Ultimate survivor!',
    image: '/images/castro.jpg'
  }
];

// Historical events with tension and drama
const mainTimelineEvents: HistoricalEvent[] = [
  {
    id: 'iron-curtain-speech-1946',
    year: 1946,
    month: 3,
    day: 5,
    title: 'Iron Curtain Speech: Churchill Drops the Truth Bomb! 🗣️🔥',
    description: 'Churchill declares "An iron curtain has descended across the continent" at tiny Westminster College in Missouri. The Cold War officially begins with a speech!',
    impact: 'Publicly identifies Soviet threat and begins ideological confrontation',
    relatedFigures: ['winston-churchill-cold-war'],
    location: { lat: 38.8136, lng: -91.8369 },
    type: 'political'
  },
  {
    id: 'truman-doctrine-1947',
    year: 1947,
    month: 3,
    day: 12,
    title: 'Truman Doctrine: America Says "We\'re In!" 🇺🇸⚡',
    description: 'Truman promises to support free peoples everywhere against communist expansion. America officially becomes world\'s policeman. Greece and Turkey are just the beginning!',
    impact: 'Commits America to global containment of communism',
    relatedFigures: ['harry-truman'],
    location: { lat: 38.9072, lng: -77.0369 },
    type: 'political'
  },
  {
    id: 'marshall-plan-1947',
    year: 1947,
    month: 6,
    day: 5,
    title: 'Marshall Plan: America Rebuilds Europe with Dollars! 💰🏗️',
    description: 'America offers $13 billion to rebuild Europe (and keep it capitalist). Stalin says "nyet" for Eastern Europe. Money talks, and it says "democracy!"',
    impact: 'Rebuilds Western Europe and creates economic alliance against Soviet Union',
    relatedFigures: ['harry-truman'],
    location: { lat: 42.3601, lng: -71.0589 },
    type: 'economic'
  },
  {
    id: 'berlin-blockade-1948',
    year: 1948,
    month: 6,
    day: 24,
    title: 'Berlin Blockade: Stalin\'s Big Squeeze! 🚫✈️',
    description: 'Stalin blocks all land routes to West Berlin, trying to starve it into submission. America responds with massive airlift. "Raisin bombers" save the day!',
    impact: 'First major Cold War crisis demonstrates Western resolve',
    relatedFigures: ['joseph-stalin-cold-war', 'harry-truman'],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'military'
  },
  {
    id: 'nato-formation-1949',
    year: 1949,
    month: 4,
    day: 4,
    title: 'NATO Forms: "An Attack on One is an Attack on All!" 🛡️🤝',
    description: 'Western allies form NATO to contain Soviet expansion. Article 5 means messing with Belgium means fighting America. Stalin is not amused.',
    impact: 'Creates permanent Western military alliance against Soviet expansion',
    relatedFigures: ['harry-truman'],
    location: { lat: 38.9072, lng: -77.0369 },
    type: 'military'
  },
  {
    id: 'soviet-atomic-bomb-1949',
    year: 1949,
    month: 8,
    day: 29,
    title: 'Soviet A-Bomb Test: "We Have It Too!" ☢️🐻',
    description: 'Soviet Union successfully tests atomic bomb, ending American nuclear monopoly. The arms race officially begins. MAD (Mutually Assured Destruction) is born!',
    impact: 'Begins nuclear arms race and balance of terror',
    relatedFigures: ['joseph-stalin-cold-war'],
    location: { lat: 49.7649, lng: 78.0614 },
    type: 'military'
  },
  {
    id: 'korean-war-1950',
    year: 1950,
    month: 6,
    day: 25,
    title: 'Korean War: The Cold War Gets Hot! 🔥⚔️',
    description: 'North Korea invades South Korea, and suddenly the Cold War isn\'t so cold anymore! UN forces (mostly American) fight Chinese "volunteers." Nobody wins, everyone loses.',
    impact: 'First hot war of Cold War era, establishes pattern of proxy conflicts',
    relatedFigures: ['harry-truman'],
    location: { lat: 37.5665, lng: 126.9780 },
    type: 'military'
  },
  {
    id: 'stalin-dies-1953',
    year: 1953,
    month: 3,
    day: 5,
    title: 'Stalin Dies: The Tyrant\'s Final Curtain! 💀👑',
    description: 'Stalin drops dead (possibly poisoned?), and nobody knows what happens next. Power struggle in Kremlin while the world holds its breath. Change is coming!',
    impact: 'Opens possibility for Soviet reforms and reduced tensions',
    relatedFigures: ['joseph-stalin-cold-war'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'political'
  },
  {
    id: 'hungarian-revolution-1956',
    year: 1956,
    month: 10,
    day: 23,
    title: 'Hungarian Revolution: Freedom Crushed by Tanks! 🏛️💔',
    description: 'Hungarians revolt against Soviet rule, briefly taste freedom, then get crushed by Red Army tanks. The West watches and does nothing. Cold War reality check!',
    impact: 'Demonstrates limits of liberation rhetoric and Soviet determination',
    relatedFigures: ['nikita-khrushchev'],
    location: { lat: 47.4979, lng: 19.0402 },
    type: 'political'
  },
  {
    id: 'sputnik-launch-1957',
    year: 1957,
    month: 10,
    day: 4,
    title: 'Sputnik: "Beep Beep" Goes the Space Race! 🛰️🚀',
    description: 'Soviet Union launches first artificial satellite, shocking America. If they can put a beach ball in space, they can put a nuke anywhere! Space race begins!',
    impact: 'Begins space race and demonstrates Soviet technological capability',
    relatedFigures: ['nikita-khrushchev'],
    location: { lat: 45.6200, lng: 63.3050 },
    type: 'technological'
  },
  {
    id: 'u2-incident-1960',
    year: 1960,
    month: 5,
    day: 1,
    title: 'U-2 Incident: Spy Plane Goes Down! ✈️💥',
    description: 'Soviet missile shoots down American spy plane over Russia. Eisenhower first denies it, then admits it. Paris Summit collapses. Trust? What trust?',
    impact: 'Ruins superpower summit and increases mutual suspicion',
    relatedFigures: ['nikita-khrushchev'],
    location: { lat: 56.5430, lng: 61.3430 },
    type: 'political'
  },
  {
    id: 'berlin-wall-built-1961',
    year: 1961,
    month: 8,
    day: 13,
    title: 'Berlin Wall Built: The Ultimate Room Divider! 🧱💔',
    description: 'East Germans build wall overnight to stop people escaping to freedom. Berlin becomes symbol of divided world. "Mr. Gorbachev, tear down this wall!" comes later...',
    impact: 'Physically divides Berlin and symbolizes Cold War division',
    relatedFigures: ['nikita-khrushchev'],
    location: { lat: 52.5074, lng: 13.3765 },
    type: 'political'
  },
  {
    id: 'bay-of-pigs-1961',
    year: 1961,
    month: 4,
    day: 17,
    title: 'Bay of Pigs: America\'s Epic Fail in Cuba! 🏖️💥',
    description: 'CIA-trained Cuban exiles try to overthrow Castro and fail spectacularly. JFK learns that inherited plans can be really, really bad ideas.',
    impact: 'Pushes Cuba firmly into Soviet camp and embarrasses America',
    relatedFigures: ['john-f-kennedy', 'fidel-castro'],
    location: { lat: 22.0773, lng: -81.1550 },
    type: 'military'
  },
  {
    id: 'cuban-missile-crisis-1962',
    year: 1962,
    month: 10,
    day: 14,
    title: 'Cuban Missile Crisis: 13 Days to Armageddon! 🚀💀',
    description: 'Soviet missiles in Cuba bring world closest to nuclear war ever. JFK and Khrushchev play ultimate game of chicken. Spoiler: sanity wins, barely!',
    impact: 'Closest approach to nuclear war, leads to détente efforts',
    relatedFigures: ['john-f-kennedy', 'nikita-khrushchev', 'fidel-castro'],
    location: { lat: 22.0773, lng: -81.1550 },
    type: 'military'
  },
  {
    id: 'vietnam-war-escalation-1965',
    year: 1965,
    month: 3,
    day: 8,
    title: 'Vietnam Escalation: America Gets Stuck in the Jungle! 🌴💔',
    description: 'First US combat troops land in Vietnam. What starts as "advisors" becomes America\'s longest war. Containment meets reality in Southeast Asian jungle.',
    impact: 'Major Cold War proxy conflict that divides American society',
    relatedFigures: [],
    location: { lat: 16.0678, lng: 108.2208 },
    type: 'military'
  },
  {
    id: 'moon-landing-1969',
    year: 1969,
    month: 7,
    day: 20,
    title: 'Moon Landing: "That\'s One Giant Leap!" 🌙🚀',
    description: 'America wins the space race! Neil Armstrong plants flag on moon while world watches. Take that, Sputnik! Technology beats ideology in space.',
    impact: 'America wins space race and demonstrates technological superiority',
    relatedFigures: ['john-f-kennedy'],
    location: { lat: 28.5721, lng: -80.6480 },
    type: 'technological'
  },
  {
    id: 'detente-begins-1972',
    year: 1972,
    month: 5,
    day: 26,
    title: 'Détente: Nixon and Brezhnev Play Nice! 🤝😊',
    description: 'Nixon visits Moscow, signs SALT I treaty. Superpowers decide maybe they don\'t need to destroy the world after all. Peaceful coexistence is possible!',
    impact: 'Begins period of reduced tensions and arms control',
    relatedFigures: [],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'political'
  },
  {
    id: 'fall-of-saigon-1975',
    year: 1975,
    month: 4,
    day: 30,
    title: 'Fall of Saigon: America\'s Vietnam Nightmare Ends! 🚁💔',
    description: 'Last helicopter leaves embassy roof as North Vietnam conquers South. America\'s first major Cold War defeat. Containment has limits.',
    impact: 'Major blow to American credibility and containment strategy',
    relatedFigures: [],
    location: { lat: 10.8231, lng: 106.6297 },
    type: 'military'
  },
  {
    id: 'reagan-evil-empire-1983',
    year: 1983,
    month: 3,
    day: 8,
    title: 'Reagan\'s "Evil Empire" Speech: No More Mr. Nice Guy! 👨‍🎬⚔️',
    description: 'Reagan calls Soviet Union "evil empire" and proposes Star Wars missile defense. Détente is dead, Cold War 2.0 begins! Hollywood meets geopolitics.',
    impact: 'Escalates Cold War rhetoric and begins massive military buildup',
    relatedFigures: ['ronald-reagan'],
    location: { lat: 28.5383, lng: -81.3792 },
    type: 'political'
  },
  {
    id: 'gorbachev-reforms-1985',
    year: 1985,
    month: 3,
    day: 11,
    title: 'Gorbachev\'s Reforms: The Soviet Union Tries to Change! 🔨🔄',
    description: 'New Soviet leader introduces glasnost (openness) and perestroika (restructuring). Tries to save communism, accidentally destroys Soviet Union instead!',
    impact: 'Begins reforms that ultimately lead to Soviet collapse',
    relatedFigures: ['mikhail-gorbachev'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'political'
  },
  {
    id: 'reykjavik-summit-1986',
    year: 1986,
    month: 10,
    day: 11,
    title: 'Reykjavik Summit: Almost Peace, But Not Quite! 🏔️🤝',
    description: 'Reagan and Gorbachev nearly agree to eliminate all nuclear weapons, but Star Wars program kills the deal. So close to ending nuclear nightmare!',
    impact: 'Nearly achieves nuclear disarmament but fails over SDI',
    relatedFigures: ['ronald-reagan', 'mikhail-gorbachev'],
    location: { lat: 64.1466, lng: -21.9426 },
    type: 'political'
  },
  {
    id: 'tear-down-wall-1987',
    year: 1987,
    month: 6,
    day: 12,
    title: 'Reagan: "Tear Down This Wall!" 🧱⚡',
    description: 'Reagan challenges Gorbachev to destroy Berlin Wall at Brandenburg Gate. Bold words that seemed impossible... until they weren\'t!',
    impact: 'Symbolic challenge that presages end of divided Berlin',
    relatedFigures: ['ronald-reagan', 'mikhail-gorbachev'],
    location: { lat: 52.5163, lng: 13.3777 },
    type: 'political'
  },
  {
    id: 'berlin-wall-falls-1989',
    year: 1989,
    month: 11,
    day: 9,
    title: 'Berlin Wall Falls: "Die Mauer ist Weg!" 🧱💥',
    description: 'East Germans with hammers and pickaxes destroy the symbol of Cold War division! Freedom breaks through concrete. The party lasts for days!',
    impact: 'Symbolic end of Cold War and beginning of German reunification',
    relatedFigures: ['mikhail-gorbachev'],
    location: { lat: 52.5074, lng: 13.3765 },
    type: 'political'
  },
  {
    id: 'soviet-union-ends-1991',
    year: 1991,
    month: 12,
    day: 25,
    title: 'Soviet Union Dissolves: "That\'s All Folks!" 🐻💀',
    description: 'Gorbachev resigns, Soviet flag comes down for last time. The Cold War officially ends not with nuclear war, but with paperwork and a whimper.',
    impact: 'Ends Cold War with American victory and unipolar world order',
    relatedFigures: ['mikhail-gorbachev'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'political'
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
      type: 'environmental'
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
      category: 'military',
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
      category: 'military',
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

// Main chapter data
export const coldWarChapter: Chapter = {
  id: 'cold-war',
  title: 'The Cold War',
  period: '1945-1991',
  startYear: 1945,
  endYear: 1991,
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
  mainImage: '/images/cold-war-main.jpg',
  icon: '❄️',
  backgroundColor: 'from-blue-900 to-red-800'
};