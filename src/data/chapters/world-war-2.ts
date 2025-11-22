import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures with global scope and dramatic descriptions
const keyFigures: Person[] = [
  {
    id: 'winston-churchill',
    name: 'Winston Churchill',
    role: 'The Bulldog Who Never Gave Up',
    born: 1874,
    died: 1965,
    description: 'The ultimate wartime leader with the best one-liners! 🐕⚡ This cigar-smoking, brandy-drinking, speech-giving legend basically out-stubborned Hitler. His "We shall never surrender" attitude saved democracy!',
    image: '/images/chapters/world-war-2/people/winston-churchill.png'
  },
  {
    id: 'franklin-roosevelt',
    name: 'Franklin D. Roosevelt',
    role: 'The New Deal President & War Leader',
    born: 1882,
    died: 1945,
    description: 'The president who couldn\'t walk but made America run! 🦅💪 Led America from Depression to victory while managing Stalin, Churchill, and Congress. Talk about multitasking!',
    image: '/images/chapters/world-war-2/people/franklin-d-roosevelt.png'
  },
  {
    id: 'joseph-stalin',
    name: 'Joseph Stalin',
    role: 'The Georgian Steel Who Broke Hitler',
    born: 1878,
    died: 1953,
    description: 'The paranoid dictator who somehow became democracy\'s ally! ⚔️🐻 Brutal at home, essential against Hitler. Proved that sometimes you need a monster to fight a monster.',
    image: '/images/chapters/world-war-2/people/joseph-stalin.png'
  },
  {
    id: 'dwight-eisenhower',
    name: 'Dwight D. Eisenhower',
    role: 'The Supreme Commander & D-Day Master',
    born: 1890,
    died: 1969,
    description: 'The Kansas farm boy who organized the biggest invasion in history! 🏖️⚔️ Managed to get Americans, British, French, and Canadians to actually work together. Diplomatic genius!',
    image: '/images/chapters/world-war-2/people/dwight-d-eisenhower.png'
  },
  {
    id: 'george-patton',
    name: 'George S. Patton',
    role: 'Old Blood & Guts Tank Commander',
    born: 1885,
    died: 1945,
    description: 'The general who thought he was a reincarnated warrior! 🏺⚔️ Loved tanks, hated paperwork, and scared the Germans more than anyone. "Lead me, follow me, or get out of my way!"',
    image: '/images/chapters/world-war-2/people/george-s-patton.png'
  },
  {
    id: 'bernard-montgomery',
    name: 'Bernard Montgomery',
    role: 'The Desert Fox Hunter & British Bulldog',
    born: 1887,
    died: 1976,
    description: 'The methodical British general who beat Rommel! 🏜️🦊 Careful planner, terrible with people, but absolutely brilliant at winning battles. El Alamein was his masterpiece!',
    image: '/images/chapters/world-war-2/people/bernard-montgomery.png'
  },
  {
    id: 'erwin-rommel',
    name: 'Erwin Rommel',
    role: 'The Desert Fox & Honorable Enemy',
    born: 1891,
    died: 1944,
    description: 'The German general even his enemies respected! 🏜️🦊 Master of tank warfare, treated prisoners well, and eventually plotted against Hitler. Honor in a dishonorable war.',
    image: '/images/chapters/world-war-2/people/erwin-rommel.png'
  },
  {
    id: 'hirohito',
    name: 'Emperor Hirohito',
    role: 'The Silent Emperor Who Ended the War',
    born: 1901,
    died: 1989,
    description: 'The reluctant emperor who finally said "enough!" 🌸⚔️ Watched Japan go from empire to ashes, then made the hardest decision of his life: surrender and save his people.',
    image: '/images/chapters/world-war-2/people/emperor-hirohito.png'
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
  image: '/images/chapters/world-war-2/timeline_1.png',
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
      category: 'political',
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
  image: '/images/chapters/world-war-2/timeline_2.png',
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
      category: 'political',
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
  image: '/images/chapters/world-war-2/timeline_3.png',
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

// Interactive scenarios for key WW2 moments
const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'poland-invasion-1939',
    title: 'The Invasion Begins: Poland Under Attack',
    text: 'September 1, 1939, 4:45 AM. German forces cross the Polish border at multiple points. You are a Polish commander receiving reports of massive German attacks. The fate of your nation and the world hangs in the balance.',
    emoji: '⚔️',
    background: 'from-gray-800 to-red-900',
    characters: ['🇵🇱', '🇩🇪', '👨‍✈️'],
    sceneType: 'battle',
    timelineYear: 1939,
    timelineEvent: 'germany-invades-poland-1939',
    choices: [
      {
        id: 'fight-defensively',
        text: 'Order strategic withdrawal to prepared defensive positions',
        consequence: 'Polish forces conduct fighting retreat, buying time for allies to mobilize but losing territory rapidly.'
      },
      {
        id: 'counterattack-immediately',
        text: 'Launch immediate counterattacks against German spearheads',
        consequence: 'Brave Polish cavalry and infantry attack German tanks, suffering heavy casualties but showing incredible courage.'
      },
      {
        id: 'appeal-for-help',
        text: 'Send urgent appeals to Britain and France for immediate military support',
        consequence: 'Allies declare war but cannot provide immediate military assistance, leaving Poland to fight alone.'
      }
    ]
  },
  {
    id: 'battle-of-britain-1940',
    title: 'The Few: Defending Britain from the Air',
    text: 'August 1940. The Luftwaffe launches Operation Eagle Day to destroy the RAF and pave the way for invasion. You are an RAF squadron leader with limited pilots facing overwhelming German air power. Churchill\'s words echo: "Never was so much owed by so many to so few."',
    emoji: '✈️',
    background: 'from-blue-800 to-gray-700',
    characters: ['🇬🇧', '🇩🇪', '✈️'],
    sceneType: 'battle',
    timelineYear: 1940,
    timelineEvent: 'battle-of-britain-1940',
    choices: [
      {
        id: 'defend-airfields',
        text: 'Focus on protecting RAF airfields and radar stations',
        consequence: 'Maintaining airfield operations keeps fighters in the air, but civilian areas suffer heavy bombing.'
      },
      {
        id: 'attack-bombers',
        text: 'Prioritize attacking German bomber formations over London',
        consequence: 'Heavy bomber losses force Germans to switch to night bombing, reducing accuracy but continuing the Blitz.'
      },
      {
        id: 'hit-and-run',
        text: 'Use hit-and-run tactics to preserve pilot strength',
        consequence: 'Conservative tactics preserve experienced pilots but allow more German bombers through to targets.'
      }
    ]
  },
  {
    id: 'pearl-harbor-1941',
    title: 'A Date Which Will Live in Infamy',
    text: 'December 7, 1941, 7:55 AM. Japanese aircraft swarm over Pearl Harbor in a devastating surprise attack. You are Admiral Kimmel, commander of the Pacific Fleet, as the first bombs fall. America\'s neutrality dies in the flames.',
    emoji: '🛩️',
    background: 'from-orange-600 to-red-900',
    characters: ['🇺🇸', '🇯🇵', '🛩️'],
    sceneType: 'battle',
    timelineYear: 1941,
    timelineEvent: 'pearl-harbor-1941',
    choices: [
      {
        id: 'organize-defense',
        text: 'Rally available anti-aircraft guns and organize immediate defense',
        consequence: 'Quick response saves some ships and aircraft, but the surprise attack achieves most of its objectives.'
      },
      {
        id: 'save-fuel-depot',
        text: 'Focus on protecting the crucial fuel storage facilities',
        consequence: 'Fuel depot survives, providing vital resources for Pacific War, though ship losses remain severe.'
      },
      {
        id: 'evacuate-personnel',
        text: 'Prioritize saving lives and evacuating key personnel',
        consequence: 'Many lives saved but material losses mount as Japanese achieve tactical surprise completely.'
      }
    ]
  },
  {
    id: 'd-day-planning-1944',
    title: 'Operation Overlord: The Greatest Gamble',
    text: 'June 4, 1944. General Eisenhower faces the most crucial decision of the war. Weather is marginal, German defenses are strong, but the invasion cannot be delayed much longer. The liberation of Europe hangs on your choice.',
    emoji: '🏖️',
    background: 'from-blue-600 to-green-800',
    characters: ['🇺🇸', '🇬🇧', '🇨🇦'],
    sceneType: 'decision',
    timelineYear: 1944,
    timelineEvent: 'd-day-1944',
    choices: [
      {
        id: 'go-tomorrow',
        text: 'Launch the invasion on June 6 despite weather concerns',
        consequence: 'Rough seas and clouds complicate the landing, but achieves crucial surprise as Germans don\'t expect attack in bad weather.'
      },
      {
        id: 'wait-for-weather',
        text: 'Delay invasion until weather improves, risking discovery',
        consequence: 'Better weather aids the assault but Germans detect preparations, strengthening defenses significantly.'
      },
      {
        id: 'alternative-target',
        text: 'Switch to alternative landing sites with better weather',
        consequence: 'Alternative beaches face stronger defenses but weather advantage, creating different tactical challenges.'
      }
    ]
  },
  {
    id: 'holocaust-resistance-1943',
    title: 'Voices in the Darkness: Resistance and Rescue',
    text: 'Warsaw Ghetto, April 1943. Reports of deportations and extermination camps have reached the ghetto. You are part of the Jewish resistance deciding how to respond to the impossible situation. Every choice carries the weight of lives and dignity.',
    emoji: '✊',
    background: 'from-gray-900 to-yellow-800',
    characters: ['✡️', '💪', '📜'],
    sceneType: 'decision',
    timelineYear: 1943,
    choices: [
      {
        id: 'armed-uprising',
        text: 'Organize armed resistance despite overwhelming odds',
        consequence: 'Warsaw Ghetto Uprising inspires resistance worldwide but results in ghetto\'s destruction and many casualties.'
      },
      {
        id: 'document-atrocities',
        text: 'Focus on documenting Nazi crimes for history and justice',
        consequence: 'Hidden archives preserve testimony of genocide, ensuring the world will know the truth.'
      },
      {
        id: 'rescue-operations',
        text: 'Prioritize smuggling children and others to safety',
        consequence: 'Rescue networks save hundreds of lives but operate under constant danger of discovery.'
      }
    ]
  },
  {
    id: 'atomic-decision-1945',
    title: 'The Ultimate Weapon: A Decision for the Ages',
    text: 'July 1945. President Truman faces the most momentous decision in human history. The Manhattan Project has produced atomic weapons. Japan fights on despite devastating losses. Invasion estimates suggest massive casualties. The nuclear age awaits your choice.',
    emoji: '☢️',
    background: 'from-yellow-600 to-orange-900',
    characters: ['🇺🇸', '☢️', '🌍'],
    sceneType: 'decision',
    timelineYear: 1945,
    timelineEvent: 'hiroshima-nagasaki-1945',
    choices: [
      {
        id: 'use-atomic-bomb',
        text: 'Authorize atomic bombing to force Japanese surrender',
        consequence: 'Hiroshima and Nagasaki destroyed, Japan surrenders, but nuclear age begins with devastating civilian casualties.'
      },
      {
        id: 'demonstrate-weapon',
        text: 'Demonstrate atomic power on unpopulated target as warning',
        consequence: 'Demonstration shows atomic power but may not convince Japan to surrender, potentially prolonging war.'
      },
      {
        id: 'conventional-invasion',
        text: 'Proceed with conventional invasion of Japan (Operation Downfall)',
        consequence: 'Massive casualties on both sides as Japan fights to the death defending homeland, but no nuclear precedent.'
      }
    ]
  },
  {
    id: 've-day-decisions-1945',
    title: 'Victory in Europe: Shaping the Post-War World',
    text: 'May 8, 1945. Nazi Germany has surrendered unconditionally. Europe lies in ruins but free from fascism. You are among the Allied leaders deciding how to rebuild Europe and deal with the emerging Soviet challenge. The post-war world order begins now.',
    emoji: '🎉',
    background: 'from-green-600 to-blue-800',
    characters: ['🇺🇸', '🇬🇧', '🇫🇷', '🇷🇺'],
    sceneType: 'negotiation',
    timelineYear: 1945,
    timelineEvent: 've-day-1945',
    choices: [
      {
        id: 'rebuild-democracy',
        text: 'Focus on rebuilding democratic institutions across Europe',
        consequence: 'Democratic reconstruction succeeds in the West but creates tension with Soviet-occupied Eastern Europe.'
      },
      {
        id: 'punish-germany',
        text: 'Impose harsh reparations and punishment on Germany',
        consequence: 'German punishment satisfies justice but creates economic hardship that communists might exploit.'
      },
      {
        id: 'compromise-with-stalin',
        text: 'Seek accommodation with Soviet Union for unified Europe',
        consequence: 'Compromise with Stalin might preserve unity but risks communist influence spreading westward.'
      }
    ]
  },
  {
    id: 'japanese-surrender-1945',
    title: '🕊️ The Emperor\'s Decision: Ending the Rising Sun',
    text: 'August 15, 1945. Emperor Hirohito must address the Japanese people after atomic bombings and Soviet invasion. You advise the Emperor on how to announce surrender while preserving national honor and ensuring Japan\'s survival.',
    emoji: '🕊️',
    timelineYear: 1945,
    sceneType: 'decision',
    characters: ['🇯🇵', '👑', '🌸'],
    background: 'from-red-800 to-yellow-600',
    choices: [
      {
        id: 'unconditional-surrender',
        text: 'Accept complete unconditional surrender to save Japanese lives',
        consequence: 'Total surrender saves Japan from invasion but subjects nation to complete Allied occupation.'
      },
      {
        id: 'negotiate-terms',
        text: 'Attempt to negotiate surrender terms preserving imperial system',
        consequence: 'Negotiations delay surrender but might preserve some Japanese autonomy and imperial dignity.'
      },
      {
        id: 'fight-to-end',
        text: 'Call for continued resistance despite atomic weapons',
        consequence: 'Continued resistance leads to invasion and massive casualties, potentially destroying Japanese civilization.'
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
  backgroundColor: 'from-blue-800 to-red-900',
  interactiveScenarios
};