import { Chapter, Timeline, HistoricalEvent, Person, Consequence, ButterflyEffect } from '../../types';

// Key figures with global scope and dramatic descriptions
const keyFigures: Person[] = [
  {
    id: 'winston-churchill',
    name: 'Winston Churchill',
    role: 'The Bulldog Who Never Gave Up',
    born: 1874,
    died: 1965,
    description: 'The ultimate wartime leader with the best one-liners! 🐕⚡ This cigar-smoking, brandy-drinking, speech-giving legend basically out-stubborned Hitler. His "We shall never surrender" attitude saved democracy!',
    image: '/images/churchill.jpg'
  },
  {
    id: 'franklin-roosevelt',
    name: 'Franklin D. Roosevelt',
    role: 'The New Deal President & War Leader',
    born: 1882,
    died: 1945,
    description: 'The president who couldn\'t walk but made America run! 🦅💪 Led America from Depression to victory while managing Stalin, Churchill, and Congress. Talk about multitasking!',
    image: '/images/roosevelt.jpg'
  },
  {
    id: 'joseph-stalin',
    name: 'Joseph Stalin',
    role: 'The Georgian Steel Who Broke Hitler',
    born: 1878,
    died: 1953,
    description: 'The paranoid dictator who somehow became democracy\'s ally! ⚔️🐻 Brutal at home, essential against Hitler. Proved that sometimes you need a monster to fight a monster.',
    image: '/images/stalin-ww2.jpg'
  },
  {
    id: 'dwight-eisenhower',
    name: 'Dwight D. Eisenhower',
    role: 'The Supreme Commander & D-Day Master',
    born: 1890,
    died: 1969,
    description: 'The Kansas farm boy who organized the biggest invasion in history! 🏖️⚔️ Managed to get Americans, British, French, and Canadians to actually work together. Diplomatic genius!',
    image: '/images/eisenhower.jpg'
  },
  {
    id: 'george-patton',
    name: 'George S. Patton',
    role: 'Old Blood & Guts Tank Commander',
    born: 1885,
    died: 1945,
    description: 'The general who thought he was a reincarnated warrior! 🏺⚔️ Loved tanks, hated paperwork, and scared the Germans more than anyone. "Lead me, follow me, or get out of my way!"',
    image: '/images/patton.jpg'
  },
  {
    id: 'bernard-montgomery',
    name: 'Bernard Montgomery',
    role: 'The Desert Fox Hunter & British Bulldog',
    born: 1887,
    died: 1976,
    description: 'The methodical British general who beat Rommel! 🏜️🦊 Careful planner, terrible with people, but absolutely brilliant at winning battles. El Alamein was his masterpiece!',
    image: '/images/montgomery.jpg'
  },
  {
    id: 'erwin-rommel',
    name: 'Erwin Rommel',
    role: 'The Desert Fox & Honorable Enemy',
    born: 1891,
    died: 1944,
    description: 'The German general even his enemies respected! 🏜️🦊 Master of tank warfare, treated prisoners well, and eventually plotted against Hitler. Honor in a dishonorable war.',
    image: '/images/rommel.jpg'
  },
  {
    id: 'hirohito',
    name: 'Emperor Hirohito',
    role: 'The Silent Emperor Who Ended the War',
    born: 1901,
    died: 1989,
    description: 'The reluctant emperor who finally said "enough!" 🌸⚔️ Watched Japan go from empire to ashes, then made the hardest decision of his life: surrender and save his people.',
    image: '/images/hirohito.jpg'
  }
];

// Historical events with global drama and visual storytelling
const mainTimelineEvents: HistoricalEvent[] = [
  {
    id: 'germany-invades-poland-1939',
    year: 1939,
    month: 9,
    day: 1,
    title: 'Germany Invades Poland: The War Begins! ⚔️🇵🇱',
    description: 'Hitler launches Blitzkrieg against Poland, officially starting WWII. Britain and France declare war, but Poland gets crushed in 5 weeks. The "Phoney War" begins!',
    impact: 'Triggers World War II and demonstrates devastating effectiveness of combined arms warfare',
    relatedFigures: [],
    location: { lat: 52.2297, lng: 21.0122 },
    type: 'military'
  },
  {
    id: 'battle-of-britain-1940',
    year: 1940,
    month: 8,
    day: 13,
    title: 'Battle of Britain: Spitfires vs. the Luftwaffe! ✈️🇬🇧',
    description: 'The RAF\'s "Few" defend Britain from German air invasion. Churchill\'s "Never was so much owed by so many to so few" becomes reality. David beats Goliath in the sky!',
    impact: 'Prevents German invasion of Britain and maintains Allied base for future operations',
    relatedFigures: ['winston-churchill'],
    location: { lat: 51.5074, lng: -0.1278 },
    type: 'military'
  },
  {
    id: 'operation-barbarossa-1941',
    year: 1941,
    month: 6,
    day: 22,
    title: 'Barbarossa: Hitler\'s Biggest Mistake! ❄️⚔️',
    description: 'Hitler invades Soviet Union with 4 million troops! Stalin is shocked (literally hiding for days). The largest military operation in history begins... and ultimately dooms Nazi Germany!',
    impact: 'Opens Eastern Front and ultimately leads to German defeat through two-front war',
    relatedFigures: ['joseph-stalin'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'military'
  },
  {
    id: 'pearl-harbor-1941',
    year: 1941,
    month: 12,
    day: 7,
    title: 'Pearl Harbor: Japan Awakens the Giant! 🛩️💥',
    description: '"A date which will live in infamy!" Japan\'s sneak attack brings America into the war. Roosevelt gets his war declaration, and Japan gets way more than they bargained for!',
    impact: 'Brings United States fully into World War II and transforms it into truly global conflict',
    relatedFigures: ['franklin-roosevelt', 'hirohito'],
    location: { lat: 21.3619, lng: -157.9565 },
    type: 'military'
  },
  {
    id: 'battle-of-midway-1942',
    year: 1942,
    month: 6,
    day: 4,
    title: 'Midway: Japan\'s Luck Runs Out! 🛩️🌊',
    description: 'The turning point in the Pacific! American codebreakers and dive bombers sink 4 Japanese carriers in one day. From offensive to defensive in 5 minutes!',
    impact: 'Turns tide of Pacific War and begins Japanese retreat',
    relatedFigures: [],
    location: { lat: 28.2072, lng: -177.3735 },
    type: 'military'
  },
  {
    id: 'stalingrad-1942',
    year: 1942,
    month: 8,
    day: 23,
    title: 'Stalingrad: The Beginning of the End! 🏢⚔️',
    description: 'The most brutal urban warfare in history! Germans control 90% of the city but can\'t finish the job. Winter comes, Soviets surround them. Game over for the Wehrmacht!',
    impact: 'Marks turning point on Eastern Front and beginning of German retreat',
    relatedFigures: ['joseph-stalin'],
    location: { lat: 48.7080, lng: 44.5133 },
    type: 'military'
  },
  {
    id: 'allied-invasion-italy-1943',
    year: 1943,
    month: 9,
    day: 9,
    title: 'Italy Invasion: The Soft Underbelly? Not So Much! 🇮🇹⛰️',
    description: 'Allies invade Italy expecting easy victory. Instead get mountains, mud, and German defense lines. "Soft underbelly" becomes "tough spine!" Rome takes 9 months!',
    impact: 'Opens second front in Europe but proves more difficult than expected',
    relatedFigures: [],
    location: { lat: 40.0583, lng: 18.0108 },
    type: 'military'
  },
  {
    id: 'd-day-1944',
    year: 1944,
    month: 6,
    day: 6,
    title: 'D-Day: The Greatest Invasion Ever! 🏖️⚔️',
    description: 'Operation Overlord lands 150,000 troops in Normandy! Eisenhower\'s "Great Crusade" begins. The Atlantic Wall crumbles, and Hitler\'s Fortress Europe gets breached!',
    impact: 'Opens Western Front and begins liberation of Nazi-occupied Europe',
    relatedFigures: ['dwight-eisenhower'],
    location: { lat: 49.3390, lng: -0.4894 },
    type: 'military'
  },
  {
    id: 'liberation-of-paris-1944',
    year: 1944,
    month: 8,
    day: 25,
    title: 'Paris Liberated: "Paree" is Free! 🇫🇷🗼',
    description: 'After 4 years of occupation, Paris is free! Free French forces enter first (for pride), Americans follow (for photos). Hitler\'s order to burn the city is ignored!',
    impact: 'Symbolic victory showing inevitable German defeat and Allied momentum',
    relatedFigures: [],
    location: { lat: 48.8566, lng: 2.3522 },
    type: 'political'
  },
  {
    id: 'battle-of-bulge-1944',
    year: 1944,
    month: 12,
    day: 16,
    title: 'Battle of the Bulge: Hitler\'s Last Gamble! 🌲❄️',
    description: 'Hitler\'s final offensive in the Ardennes! Initial success creates huge "bulge" in Allied lines, but American resilience and German fuel shortages doom the attack!',
    impact: 'Final German offensive exhausts last reserves and hastens collapse',
    relatedFigures: ['george-patton'],
    location: { lat: 49.9664, lng: 5.8048 },
    type: 'military'
  },
  {
    id: 'yalta-conference-1945',
    year: 1945,
    month: 2,
    day: 4,
    title: 'Yalta: The Big Three Divide the World! 🌍👑',
    description: 'Roosevelt, Churchill, and Stalin meet to plan post-war world. They agree on UN, disagree on Poland, and accidentally set up the Cold War. Oops!',
    impact: 'Sets framework for post-war world order and future superpower rivalry',
    relatedFigures: ['franklin-roosevelt', 'winston-churchill', 'joseph-stalin'],
    location: { lat: 44.4952, lng: 34.1615 },
    type: 'political'
  },
  {
    id: 'hitler-suicide-1945',
    year: 1945,
    month: 4,
    day: 30,
    title: 'Hitler\'s Final Act: Bunker to Eternity! 💀🔥',
    description: 'With Soviets 300 yards away, Hitler shoots himself in his bunker. Eva Braun joins him. The Thousand Year Reich ends after 12 years and 3 months. Awkward!',
    impact: 'Removes Nazi leadership and accelerates German surrender',
    relatedFigures: [],
    location: { lat: 52.5074, lng: 13.3765 },
    type: 'political'
  },
  {
    id: 've-day-1945',
    year: 1945,
    month: 5,
    day: 8,
    title: 'Victory in Europe: The Nazi Nightmare Ends! 🎉🇪🇺',
    description: 'Germany surrenders unconditionally! Europe celebrates as church bells ring and people dance in the streets. Hitler\'s empire is dead, but the Pacific War continues!',
    impact: 'Ends European war and allows full focus on defeating Japan',
    relatedFigures: [],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'political'
  },
  {
    id: 'hiroshima-nagasaki-1945',
    year: 1945,
    month: 8,
    day: 6,
    title: 'Atomic Bombs: The Nuclear Age Begins! ☢️💥',
    description: 'America drops atomic bombs on Hiroshima and Nagasaki. The age of conventional warfare ends forever. Japan realizes further resistance is futile.',
    impact: 'Forces Japanese surrender and ushers in nuclear age',
    relatedFigures: ['franklin-roosevelt', 'hirohito'],
    location: { lat: 34.3853, lng: 132.4553 },
    type: 'military'
  },
  {
    id: 'japanese-surrender-1945',
    year: 1945,
    month: 9,
    day: 2,
    title: 'Japan Surrenders: World War II Finally Ends! 🕊️🌍',
    description: 'On the USS Missouri in Tokyo Bay, Japan formally surrenders. MacArthur accepts as the world watches. After 6 years and 50 million deaths, the war is over!',
    impact: 'Ends World War II and begins new era of American-led international order',
    relatedFigures: ['hirohito'],
    location: { lat: 35.6528, lng: 139.7594 },
    type: 'political'
  }
];

// Alternative Timeline 1: No Appeasement
const noAppeasementTimeline: Timeline = {
  id: 'no-appeasement',
  title: 'No Appeasement: Churchill is Right from the Start! 🦁⚔️',
  description: 'What if Britain and France had stopped Hitler at Munich in 1938 instead of appeasing him?',
  divergenceDescription: 'Britain and France refuse Munich Agreement and declare war when Germany threatens Czechoslovakia in 1938',
  divergenceYear: 1938,
  probability: 45,
  color: '#1E40AF',
  icon: '🦁',
  keyEvents: [
    {
      id: 'munich-crisis-war-1938',
      year: 1938,
      month: 9,
      day: 30,
      title: 'Munich Crisis Triggers War: "No Appeasement!" 🇬🇧⚔️',
      description: 'Britain and France reject Munich Agreement and declare war when Hitler threatens Czechoslovakia. World War II begins a year early!',
      impact: 'Begins World War II with Germany less prepared and Czechoslovakia as ally',
      relatedFigures: ['winston-churchill'],
      location: { lat: 48.1351, lng: 11.5820 },
      type: 'political'
    },
    {
      id: 'czech-german-war-1938',
      year: 1938,
      month: 10,
      day: 15,
      title: 'Czechoslovakian Resistance: The Fortress Holds! 🏰⚔️',
      description: 'Well-prepared Czech forces with French and British support resist German invasion. Hitler\'s quick victory becomes grinding campaign.',
      impact: 'German army faces prepared defenses and international opposition',
      relatedFigures: [],
      location: { lat: 50.0755, lng: 14.4378 },
      type: 'military'
    },
    {
      id: 'soviet-intervention-1939',
      year: 1939,
      month: 3,
      day: 1,
      title: 'Stalin Joins the Allies: "Enemy of My Enemy!" 🐻🤝',
      description: 'Soviet Union joins Western Allies against Germany, creating immediate two-front war for Hitler.',
      impact: 'Creates united anti-Nazi coalition from start of war',
      relatedFigures: ['joseph-stalin'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'german-defeat-1940',
      year: 1940,
      month: 8,
      day: 15,
      title: 'Germany Collapses: Too Much, Too Soon! 💔🇩🇪',
      description: 'Facing combined British, French, Czech, and Soviet forces, Germany collapses after less than 2 years of war.',
      impact: 'Ends Nazi regime before Holocaust can be fully implemented',
      relatedFigures: [],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'democratic-europe-1941',
      year: 1941,
      month: 1,
      day: 1,
      title: 'Democratic Europe Restored: Peace Through Strength! 🕊️🏛️',
      description: 'Allied victory leads to restoration of democratic governments across Europe under international guarantee.',
      impact: 'Preserves European democracy and prevents Holocaust',
      relatedFigures: ['winston-churchill'],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'political'
    },
    {
      id: 'no-pacific-war-1941',
      year: 1941,
      month: 12,
      day: 7,
      title: 'Japan Reconsiders: No Pearl Harbor! 🇯🇵🤔',
      description: 'With Germany defeated, Japan realizes the impossibility of taking on America and Britain alone. No Pacific War.',
      impact: 'Prevents Pacific War and millions of casualties',
      relatedFigures: ['hirohito'],
      location: { lat: 35.6762, lng: 139.6503 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'holocaust-prevented',
      category: 'social',
      shortTerm: 'Early war prevents full implementation of Holocaust',
      longTerm: 'Six million Jewish lives saved along with other Nazi victims',
      globalImpact: 'Different understanding of genocide and human rights development'
    },
    {
      id: 'shorter-war',
      category: 'military',
      shortTerm: 'War lasts only 2 years instead of 6',
      longTerm: 'Millions of military and civilian lives saved',
      globalImpact: 'Less destruction allows faster post-war recovery'
    }
  ],
  butterfly: [
    {
      id: 'no-atomic-weapons',
      trigger: 'Shorter war means no Manhattan Project completion',
      consequence: 'Nuclear weapons developed later, possibly never used in warfare',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'different-cold-war',
      trigger: 'Earlier Allied-Soviet cooperation creates different post-war dynamics',
      consequence: 'Cold War either doesn\'t happen or takes very different form',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'The "Short War" of 1938-1940 is remembered as the conflict that saved millions of lives. September 30th is observed as "Courage Day" honoring those who said "No More!" The Munich Conference Room is now a museum with the slogan "Never Again Appease Evil." 🦁🕊️'
};

// Alternative Timeline 2: D-Day Fails
const dDayFailsTimeline: Timeline = {
  id: 'd-day-fails',
  title: 'D-Day Disaster: Operation Overlord Fails! 💀🏖️',
  description: 'What if the D-Day landings had failed catastrophically due to weather, German preparation, or bad luck?',
  divergenceDescription: 'Bad weather, improved German defenses, and tactical failures cause D-Day to fail with massive casualties',
  divergenceYear: 1944,
  probability: 25,
  color: '#DC2626',
  icon: '💀',
  keyEvents: [
    {
      id: 'd-day-disaster-1944',
      year: 1944,
      month: 6,
      day: 6,
      title: 'D-Day Disaster: The Longest Day Becomes the Darkest! 💀🌊',
      description: 'Perfect German defenses, bad weather, and tactical failures doom Operation Overlord. 50,000+ Allied casualties in worst military disaster ever.',
      impact: 'Destroys Allied invasion capability and morale',
      relatedFigures: ['dwight-eisenhower'],
      location: { lat: 49.3390, lng: -0.4894 },
      type: 'military'
    },
    {
      id: 'eisenhower-resigns-1944',
      year: 1944,
      month: 6,
      day: 8,
      title: 'Eisenhower Takes Responsibility: "The Fault is Mine!" 💔👨‍✈️',
      description: 'Supreme Commander Eisenhower resigns, taking full responsibility for the disaster. His pre-written resignation letter becomes reality.',
      impact: 'Allied leadership crisis and loss of confidence in invasion strategy',
      relatedFigures: ['dwight-eisenhower'],
      location: { lat: 51.5074, lng: -0.1278 },
      type: 'political'
    },
    {
      id: 'german-counteroffensive-1944',
      year: 1944,
      month: 7,
      day: 15,
      title: 'German Counterattack: Rommel\'s Revenge! 🦊⚔️',
      description: 'Emboldened by D-Day victory, Germans launch major counteroffensive in Italy and stabilize all fronts.',
      impact: 'German morale restored and defensive lines strengthened',
      relatedFigures: ['erwin-rommel'],
      location: { lat: 41.9028, lng: 12.4964 },
      type: 'military'
    },
    {
      id: 'war-extends-1945',
      year: 1945,
      month: 8,
      day: 1,
      title: 'War Drags On: No Quick Victory! ⏰💔',
      description: 'Without second front, war continues into 1946. Soviet Union bears full brunt of European fighting.',
      impact: 'Prolongs European war and increases casualties on all sides',
      relatedFigures: ['joseph-stalin'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'military'
    },
    {
      id: 'nuclear-europe-1945',
      year: 1945,
      month: 12,
      day: 1,
      title: 'Nuclear Weapons Used in Europe: The Unthinkable! ☢️🌍',
      description: 'Frustrated by prolonged war, America considers using atomic weapons against German cities to force surrender.',
      impact: 'Nuclear weapons potentially used in European theater',
      relatedFigures: [],
      location: { lat: 50.1109, lng: 8.6821 },
      type: 'military'
    },
    {
      id: 'soviet-dominance-1946',
      year: 1946,
      month: 5,
      day: 1,
      title: 'Soviet Victory: Stalin\'s Europe! 🐻🏛️',
      description: 'Soviet Union ultimately defeats Germany alone, occupying all of Central and Eastern Europe without Western presence.',
      impact: 'Creates Soviet-dominated Europe with different post-war balance',
      relatedFigures: ['joseph-stalin'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'extended-war',
      category: 'military',
      shortTerm: 'War extends 2 more years with massive additional casualties',
      longTerm: 'Different military technology development and tactics',
      globalImpact: 'Nuclear weapons possibly used in European theater'
    },
    {
      id: 'soviet-europe',
      category: 'political',
      shortTerm: 'Soviet Union liberates all of Europe without Western involvement',
      longTerm: 'Communist Europe extends to Atlantic Ocean',
      globalImpact: 'Very different Cold War with communist Western Europe'
    }
  ],
  butterfly: [
    {
      id: 'communist-western-europe',
      trigger: 'Soviet liberation creates communist governments in France, Netherlands, Belgium',
      consequence: 'NATO never forms, very different Cold War dynamics',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'nuclear-precedent',
      trigger: 'Nuclear weapons used against European cities',
      consequence: 'Different nuclear taboo and Cold War nuclear strategies',
      magnitude: 'large',
      timespan: 75
    }
  ],
  presentDayStatus: 'June 6th is observed as "Remembrance of Sacrifice Day" for the D-Day disaster. The Soviet European Federation stretches from Lisbon to Vladivostok. Normandy beaches have monuments reading "They Gave Their Tomorrow for Our Today" in 12 languages. 💔🌹'
};

// Alternative Timeline 3: Japan Wins Pacific War
const japanWinsPacificTimeline: Timeline = {
  id: 'japan-wins-pacific',
  title: 'Japanese Pacific Empire: The Rising Sun Triumphant! 🌅🏴‍☠️',
  description: 'What if Japan had been more successful in the Pacific War and achieved their Greater East Asia Co-Prosperity Sphere?',
  divergenceDescription: 'Japan avoids Midway disaster, successfully invades Australia, and forces American peace negotiations',
  divergenceYear: 1942,
  probability: 20,
  color: '#EF4444',
  icon: '🌅',
  keyEvents: [
    {
      id: 'midway-victory-1942',
      year: 1942,
      month: 6,
      day: 4,
      title: 'Japan Wins Midway: American Fleet Destroyed! 🛩️💥',
      description: 'Japanese change their codes, avoid American trap, and destroy most of US Pacific Fleet at Midway. Pacific becomes Japanese lake!',
      impact: 'Eliminates American naval power in Pacific and secures Japanese expansion',
      relatedFigures: [],
      location: { lat: 28.2072, lng: -177.3735 },
      type: 'military'
    },
    {
      id: 'australia-invaded-1942',
      year: 1942,
      month: 9,
      day: 15,
      title: 'Operation FS: Japan Invades Australia! 🇦🇺⚔️',
      description: 'With no American fleet to stop them, Japanese forces successfully invade northern Australia. The "Southern Resource Area" expands!',
      impact: 'Captures vital resources and strategic position for further expansion',
      relatedFigures: [],
      location: { lat: -12.4634, lng: 130.8456 },
      type: 'military'
    },
    {
      id: 'india-liberation-1943',
      year: 1943,
      month: 3,
      day: 1,
      title: 'Japanese "Liberate" India: Goodbye British Raj! 🇮🇳🌅',
      description: 'Japanese forces, aided by Indian National Army, capture Burma and invade India. British Empire in Asia collapses.',
      impact: 'Destroys British Empire in Asia and secures Japanese western flank',
      relatedFigures: [],
      location: { lat: 20.5937, lng: 78.9629 },
      type: 'military'
    },
    {
      id: 'hawaii-negotiations-1943',
      year: 1943,
      month: 12,
      day: 7,
      title: 'Peace at Pearl Harbor: America Negotiates! 🕊️🏝️',
      description: 'On 2nd anniversary of Pearl Harbor, America and Japan sign peace treaty recognizing Japanese Pacific Empire.',
      impact: 'Ends Pacific War with Japanese victory and territorial gains',
      relatedFigures: ['franklin-roosevelt', 'hirohito'],
      location: { lat: 21.3619, lng: -157.9565 },
      type: 'political'
    },
    {
      id: 'greater-east-asia-1944',
      year: 1944,
      month: 1,
      day: 1,
      title: 'Greater East Asia Co-Prosperity Sphere Established! 🌏👑',
      description: 'Japanese Empire formally establishes the Greater East Asia Co-Prosperity Sphere from Siberia to New Zealand.',
      impact: 'Creates Japanese-dominated Asian empire rivaling European powers',
      relatedFigures: ['hirohito'],
      location: { lat: 35.6762, lng: 139.6503 },
      type: 'political'
    },
    {
      id: 'cold-war-japan-vs-allies-1945',
      year: 1945,
      month: 8,
      day: 15,
      title: 'New Cold War: Japan vs. the World! ❄️🌏',
      description: 'With Europe liberated but Asia under Japanese control, a new Cold War begins between Japanese Empire and Allied powers.',
      impact: 'Creates bipolar world with Japanese Empire as second superpower',
      relatedFigures: [],
      location: { lat: 35.6762, lng: 139.6503 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'japanese-empire',
      category: 'political',
      shortTerm: 'Japan becomes dominant Pacific power with vast empire',
      longTerm: 'Different decolonization patterns in Asia under Japanese hegemony',
      globalImpact: 'Bipolar world with Japanese and American/European spheres'
    },
    {
      id: 'asian-liberation',
      category: 'political',
      shortTerm: 'European colonial empires in Asia collapse under Japanese pressure',
      longTerm: 'Asian nations develop under Japanese rather than Western influence',
      globalImpact: 'Different model of modernization and development'
    }
  ],
  butterfly: [
    {
      id: 'no-american-hegemony',
      trigger: 'Japanese Pacific victory prevents American global dominance',
      consequence: 'Multipolar world with competing spheres of influence',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'different-decolonization',
      trigger: 'Japanese victory accelerates end of European empires',
      consequence: 'Asian and African independence under Japanese sponsorship',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'The Japanese Pacific Federation is one of three global superpowers alongside the American Republic and European Union. December 7th is celebrated as "Liberation Day" across Asia. Pearl Harbor hosts annual "Peace and Prosperity" ceremonies. 🌸🕊️'
};

// Main chapter data
export const worldWarTwoChapter: Chapter = {
  id: 'world-war-2',
  title: 'World War II',
  period: '1939-1945',
  startYear: 1939,
  endYear: 1945,
  description: 'The Greatest Show on Earth (Unfortunately): The War That Changed Everything! 🌍💥 Watch democracy, fascism, and communism duke it out for the future of humanity. It\'s got epic battles, technological marvels, heroic leaders, dastardly villains, and plot twists that would make Hollywood jealous! From London\'s Blitz to Pacific island-hopping to the atomic age - this is the war that literally changed the world! ⚡🎬',
  historicalContext: 'By 1939, the world was like a powder keg with a very short fuse! 💣 Hitler was gobbling up Europe, Japan was rampaging through Asia, and everyone else was either choosing sides or trying to stay neutral (spoiler: neutrality didn\'t work). This wasn\'t just another war - it was an ideological death match between democracy, fascism, and communism, with the future of human civilization hanging in the balance. It took six years, 50+ million lives, and the invention of atomic weapons to settle the question. Buckle up - this is the big one! 🌍⚔️',
  keyFigures,
  divergencePoint: 'Multiple Critical Decisions Throughout the War',
  divergenceYear: 1942,
  alternativeTimelines: [
    noAppeasementTimeline,
    dDayFailsTimeline,
    japanWinsPacificTimeline,
    // Additional timelines can be added here...
  ],
  mainImage: '/images/world-war-2-main.jpg',
  icon: '🌍',
  backgroundColor: 'from-blue-800 to-red-900'
};