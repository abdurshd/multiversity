import { Chapter, Timeline, Person } from '../../types';

// Key figures with engaging battle-focused descriptions
const keyFigures: Person[] = [
  {
    id: 'kaiser-wilhelm-ii',
    name: 'Kaiser Wilhelm II',
    role: 'The Hot-Headed Emperor with Bad Timing',
    born: 1859,
    died: 1941,
    description: 'Germany\'s last emperor who managed to start a world war by being really, really bad at diplomacy! ⚔️👑 Had a withered arm, an inferiority complex, and zero understanding of when to stop talking.',
    image: '/images/kaiser-wilhelm.jpg'
  },
  {
    id: 'archduke-franz-ferdinand',
    name: 'Archduke Franz Ferdinand',
    role: 'The Heir Who Started It All (By Dying)',
    born: 1863,
    died: 1914,
    description: 'The Austro-Hungarian heir whose assassination triggered WWI! 💥🎯 Ironically, he was actually a reformer who wanted to give Slavs more rights. Wrong place, wrong time, wrong sandwich shop!',
    image: '/images/franz-ferdinand.jpg'
  },
  {
    id: 'erich-von-falkenhayn',
    name: 'Erich von Falkenhayn',
    role: 'The General Who Invented Modern Hell',
    born: 1861,
    died: 1922,
    description: 'The German general who created the meat grinder strategy at Verdun! 🥩⚔️ His idea: "Let\'s bleed France white!" Spoiler alert: it didn\'t work as planned.',
    image: '/images/falkenhayn.jpg'
  },
  {
    id: 'ferdinand-foch',
    name: 'Ferdinand Foch',
    role: 'The French Marshal Who Never Gave Up',
    born: 1851,
    died: 1929,
    description: 'The French general who said "My center is giving way, my right is in retreat, situation excellent. I attack!" 🇫🇷⚡ Basically the military version of toxic positivity, but it worked!',
    image: '/images/foch.jpg'
  },
  {
    id: 'douglas-haig',
    name: 'Douglas Haig',
    role: 'The British General Who Loved Frontal Attacks',
    born: 1861,
    died: 1928,
    description: 'The British commander who kept sending men "over the top" into machine gun fire! 🇬🇧⚔️ Eventually won, but at a cost that makes your bank account cry.',
    image: '/images/haig.jpg'
  },
  {
    id: 'manfred-von-richthofen',
    name: 'Manfred von Richthofen',
    role: 'The Red Baron & Sky Knight',
    born: 1892,
    died: 1918,
    description: 'The most famous fighter pilot ever! ✈️🔴 Shot down 80 enemy planes in his bright red aircraft. Proof that being flashy in combat can actually work... until it doesn\'t.',
    image: '/images/red-baron.jpg'
  }
];

// Historical events with battle-focused dramatic storytelling
/*
const mainTimelineEvents: HistoricalEvent[] = [
  {
    id: 'archduke-assassination-1914',
    year: 1914,
    month: 6,
    day: 28,
    title: 'The Assassination That Started Everything! 💥🎯',
    description: 'Archduke Franz Ferdinand gets shot in Sarajevo by a 19-year-old Serbian nationalist. One bullet changes the entire world. Talk about butterfly effect!',
    impact: 'Triggers July Crisis and sets off chain reaction leading to world war',
    relatedFigures: ['archduke-franz-ferdinand'],
    location: { lat: 43.8563, lng: 18.4131 },
    type: 'political'
  },
  {
    id: 'july-crisis-1914',
    year: 1914,
    month: 7,
    day: 23,
    title: 'July Crisis: European Diplomacy Goes BOOM! 💣🌍',
    description: 'Austria-Hungary gives Serbia an impossible ultimatum. It\'s like asking your neighbor to let you redecorate their house... or else!',
    impact: 'Diplomatic crisis escalates into continental war through alliance system',
    relatedFigures: ['kaiser-wilhelm-ii'],
    location: { lat: 48.2082, lng: 16.3738 },
    type: 'political'
  },
  {
    id: 'germany-declares-war-1914',
    year: 1914,
    month: 8,
    day: 1,
    title: 'Germany Declares War: "Let\'s Fight Everyone!" ⚔️🇩🇪',
    description: 'Germany declares war on Russia, then France, then invades Belgium. Kaiser Wilhelm II basically challenges the entire continent to a fight!',
    impact: 'Activates European alliance system and brings Britain into the war',
    relatedFigures: ['kaiser-wilhelm-ii'],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'military'
  },
  {
    id: 'battle-of-marne-1914',
    year: 1914,
    month: 9,
    day: 5,
    title: 'Battle of the Marne: Paris Taxi Army to the Rescue! 🚕⚔️',
    description: 'French generals use Paris taxis to rush troops to the front! The "Miracle of the Marne" stops German advance on Paris. Best use of ride-sharing ever!',
    impact: 'Saves Paris and prevents quick German victory, leading to trench warfare',
    relatedFigures: ['ferdinand-foch'],
    location: { lat: 49.0397, lng: 3.9781 },
    type: 'military'
  },
  {
    id: 'christmas-truce-1914',
    year: 1914,
    month: 12,
    day: 25,
    title: 'Christmas Truce: When Enemies Became Friends! 🎄🤝',
    description: 'British and German soldiers stop fighting to play football in No Man\'s Land on Christmas Day. Most wholesome moment in a very unwholesome war!',
    impact: 'Shows human side of war but also last moment of "gentlemanly" warfare',
    relatedFigures: [],
    location: { lat: 50.6292, lng: 3.0573 },
    type: 'social'
  },
  {
    id: 'battle-of-verdun-1916',
    year: 1916,
    month: 2,
    day: 21,
    title: 'Verdun: The Meat Grinder Begins! 🥩⚔️',
    description: 'Germans attack Verdun to "bleed France white." Instead, both sides get bled white in 10 months of horrific fighting. 700,000 casualties for basically nothing!',
    impact: 'Longest battle of WWI becomes symbol of French resilience and war\'s futility',
    relatedFigures: ['erich-von-falkenhayn'],
    location: { lat: 49.1590, lng: 5.3883 },
    type: 'military'
  },
  {
    id: 'battle-of-somme-1916',
    year: 1916,
    month: 7,
    day: 1,
    title: 'Battle of the Somme: The Worst First Day Ever! 💀⚔️',
    description: 'British attack on the Somme. Day 1: 60,000 British casualties. The rest of the battle doesn\'t go much better. Modern warfare meets 19th-century tactics!',
    impact: 'Demonstrates the deadly reality of industrial warfare and trench stalemate',
    relatedFigures: ['douglas-haig'],
    location: { lat: 50.0077, lng: 2.6966 },
    type: 'military'
  },
  {
    id: 'us-enters-war-1917',
    year: 1917,
    month: 4,
    day: 6,
    title: 'America Joins the Party: "We\'re Here to Help!" 🇺🇸⚡',
    description: 'United States declares war on Germany after the Zimmermann Telegram and unrestricted submarine warfare. Fresh troops change everything!',
    impact: 'Provides Allied forces with fresh manpower and resources for victory',
    relatedFigures: [],
    location: { lat: 38.9072, lng: -77.0369 },
    type: 'political'
  },
  {
    id: 'russian-revolution-1917',
    year: 1917,
    month: 11,
    day: 7,
    title: 'Russia Exits Stage Left: "We\'re Out!" 🇷🇺🚪',
    description: 'Russian Revolution takes Russia out of the war, allowing Germany to focus on the Western Front. Lenin\'s gift to Kaiser Wilhelm!',
    impact: 'Frees up German forces for final offensive but comes too late to matter',
    relatedFigures: [],
    location: { lat: 59.9311, lng: 30.3609 },
    type: 'political'
  },
  {
    id: 'german-spring-offensive-1918',
    year: 1918,
    month: 3,
    day: 21,
    title: 'Germany\'s Last Gamble: Operation Michael! 🎲⚔️',
    description: 'Germany launches massive spring offensive, their last chance to win before American troops arrive in force. It\'s all or nothing time!',
    impact: 'Initial success but ultimate failure exhausts German reserves',
    relatedFigures: [],
    location: { lat: 50.0077, lng: 2.6966 },
    type: 'military'
  },
  {
    id: 'armistice-1918',
    year: 1918,
    month: 11,
    day: 11,
    title: 'Armistice: The Guns Finally Fall Silent! 🔕🕊️',
    description: 'At 11 AM on the 11th day of the 11th month, the fighting stops. After 4 years and 17 million deaths, someone finally says "enough!"',
    impact: 'Ends the Great War and sets stage for even greater war 20 years later',
    relatedFigures: [],
    location: { lat: 49.1294, lng: 2.4134 },
    type: 'political'
  }
];
*/

// Alternative Timeline 1: No Assassination
const noAssassinationTimeline: Timeline = {
  id: 'no-assassination',
  title: 'Franz Ferdinand Lives: The War That Never Was! 🕊️👑',
  description: 'What if the assassination plot had failed and Franz Ferdinand survived to reform Austria-Hungary?',
  divergenceDescription: 'Franz Ferdinand\'s car takes a different route, avoiding the assassin, and he survives to implement reforms',
  divergenceYear: 1914,
  probability: 40,
  color: '#10B981',
  icon: '🕊️',
  keyEvents: [
    {
      id: 'assassination-fails-1914',
      year: 1914,
      month: 6,
      day: 28,
      title: 'Wrong Turn Saves the World! 🚗✨',
      description: 'Franz Ferdinand\'s driver doesn\'t take the wrong turn, avoiding Gavrilo Princip completely. Sometimes getting lost is actually finding your way!',
      impact: 'Prevents July Crisis and maintains European peace',
      relatedFigures: ['archduke-franz-ferdinand'],
      location: { lat: 43.8563, lng: 18.4131 },
      type: 'political'
    },
    {
      id: 'austro-hungarian-reforms-1915',
      year: 1915,
      month: 1,
      title: 'Franz Ferdinand\'s Great Reforms Begin! 🏛️🌈',
      description: 'As heir apparent, Franz Ferdinand begins implementing his plan for "United States of Greater Austria" giving Slavs equal rights.',
      impact: 'Satisfies South Slav nationalism and reduces tensions in Balkans',
      relatedFigures: ['archduke-franz-ferdinand'],
      location: { lat: 48.2082, lng: 16.3738 },
      type: 'political'
    },
    {
      id: 'peaceful-balkans-1916',
      year: 1916,
      month: 7,
      title: 'Balkans Actually Become Peaceful! 🕊️⛰️',
      description: 'Reformed Austria-Hungary becomes model for multi-ethnic democracy. Serbs get autonomy, everyone\'s happy!',
      impact: 'Resolves major source of European tension through peaceful reform',
      relatedFigures: ['archduke-franz-ferdinand'],
      location: { lat: 44.0165, lng: 21.0059 },
      type: 'political'
    },
    {
      id: 'german-isolation-1917',
      year: 1917,
      month: 3,
      title: 'Germany Finds Itself Alone: "Where Did Everyone Go?" 🇩🇪😕',
      description: 'Without war crisis, Germany\'s aggressive diplomacy isolates it as other powers form defensive alliances.',
      impact: 'Peaceful pressure forces Germany to moderate its policies',
      relatedFigures: ['kaiser-wilhelm-ii'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'conference-of-berlin-1918',
      year: 1918,
      month: 6,
      title: 'Conference of Berlin: European Peace Summit! 🤝🌍',
      description: 'Major European conference redesigns international system to prevent future conflicts.',
      impact: 'Creates new international order based on negotiation rather than force',
      relatedFigures: [],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'democratic-europe-1920',
      year: 1920,
      month: 1,
      title: 'Democratic Wave Sweeps Europe! 🗳️🌊',
      description: 'Peaceful resolution of crises leads to democratic reforms across Europe, including Germany.',
      impact: 'Constitutional monarchies evolve into parliamentary democracies',
      relatedFigures: [],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'no-world-war',
      category: 'political',
      shortTerm: 'Avoids World War I entirely, saving 17 million lives',
      longTerm: 'No wartime devastation allows continued European cultural development',
      globalImpact: 'Different 20th century without the trauma of total war'
    },
    {
      id: 'gradual-democratization',
      category: 'political',
      shortTerm: 'Peaceful reform rather than revolutionary change',
      longTerm: 'European empires evolve into federal democracies',
      globalImpact: 'Different model of political development worldwide'
    }
  ],
  butterfly: [
    {
      id: 'no-russian-revolution',
      trigger: 'No war means no revolutionary pressure in Russia',
      consequence: 'Russian monarchy reforms gradually, no Soviet Union',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'no-hitler',
      trigger: 'No war means no German defeat and humiliation',
      consequence: 'No conditions for Nazi rise, Holocaust never happens',
      magnitude: 'massive',
      timespan: 50
    }
  ],
  presentDayStatus: 'The Austro-Hungarian Federation is one of Europe\'s most successful multicultural democracies. Emperor Franz Ferdinand IV still reigns as constitutional monarch. The Sarajevo Sandwich Shop where the assassination was supposed to happen is now a peace museum! 🥪🕊️'
};

// Alternative Timeline 2: Localized Conflict
const localizedConflictTimeline: Timeline = {
  id: 'localized-conflict',
  title: 'Just Austria vs. Serbia: The Tiny War! ⚔️🏰',
  description: 'What if the conflict had remained between Austria-Hungary and Serbia without escalating to world war?',
  divergenceDescription: 'Germany refuses to give Austria-Hungary a "blank check" and other powers successfully contain the conflict',
  divergenceYear: 1914,
  probability: 25,
  color: '#F59E0B',
  icon: '⚔️',
  keyEvents: [
    {
      id: 'germany-refuses-support-1914',
      year: 1914,
      month: 7,
      day: 5,
      title: 'Germany Says "Handle Your Own Problems!" 🇩🇪🤷‍♂️',
      description: 'Kaiser Wilhelm II refuses to give Austria-Hungary unconditional support, forcing them to negotiate rather than fight.',
      impact: 'Prevents escalation through alliance system',
      relatedFigures: ['kaiser-wilhelm-ii'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'third-balkan-war-1914',
      year: 1914,
      month: 8,
      day: 12,
      title: 'Third Balkan War: The Sequel Nobody Wanted! ⚔️3️⃣',
      description: 'Austria-Hungary invades Serbia in what becomes just another Balkan conflict. Other powers stay out of this regional mess.',
      impact: 'Conflict remains regional rather than becoming world war',
      relatedFigures: [],
      location: { lat: 44.0165, lng: 21.0059 },
      type: 'military'
    },
    {
      id: 'great-power-mediation-1914',
      year: 1914,
      month: 10,
      title: 'Great Powers Play Peacemaker! 🕊️👑',
      description: 'Britain, France, Germany, and Russia successfully mediate end to Austro-Serbian conflict.',
      impact: 'Demonstrates that great power cooperation can prevent wider wars',
      relatedFigures: [],
      location: { lat: 51.5074, lng: -0.1278 },
      type: 'political'
    },
    {
      id: 'balkan-federation-1915',
      year: 1915,
      month: 6,
      title: 'Balkan Federation Created: "Can\'t We All Just Get Along?" 🤝⛰️',
      description: 'Peace settlement creates Balkan Federation under great power guarantee, finally solving the "Eastern Question."',
      impact: 'Resolves Balkan tensions through federal solution',
      relatedFigures: [],
      location: { lat: 41.9029, lng: 21.4285 },
      type: 'political'
    },
    {
      id: 'naval-arms-limitation-1916',
      year: 1916,
      month: 3,
      title: 'Naval Arms Limitation Treaty: "Let\'s Not Build So Many Battleships!" 🚢📉',
      description: 'Success in Balkans leads to broader arms limitation agreements between great powers.',
      impact: 'Reduces military tensions and arms race pressures',
      relatedFigures: [],
      location: { lat: 51.5074, lng: -0.1278 },
      type: 'political'
    },
    {
      id: 'concert-of-europe-renewed-1918',
      year: 1918,
      month: 1,
      title: 'Concert of Europe 2.0: The Peaceful Sequel! 🎵🌍',
      description: 'Great powers renew Concert of Europe system with better crisis management mechanisms.',
      impact: 'Creates stable international system for managing conflicts',
      relatedFigures: [],
      location: { lat: 48.2082, lng: 16.3738 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'limited-warfare',
      category: 'political',
      shortTerm: 'Regional war with limited casualties compared to world war',
      longTerm: 'Military technology develops more slowly without total war pressure',
      globalImpact: 'Different pace of military and technological development'
    },
    {
      id: 'diplomatic-success',
      category: 'political',
      shortTerm: 'Successful great power mediation restores confidence in diplomacy',
      longTerm: 'Strengthened international system prevents future major wars',
      globalImpact: 'Earlier development of international conflict resolution mechanisms'
    }
  ],
  butterfly: [
    {
      id: 'stable-empires',
      trigger: 'No total war means European empires remain stable',
      consequence: 'Different decolonization process, gradual rather than revolutionary',
      magnitude: 'large',
      timespan: 100
    },
    {
      id: 'slower-modernization',
      trigger: 'No war-driven technological acceleration',
      consequence: 'Different pace of social and economic change',
      magnitude: 'medium',
      timespan: 50
    }
  ],
  presentDayStatus: 'The Third Balkan War lasted only 3 months and killed about 50,000 people instead of 17 million. The Balkan Federation became a model for peaceful multi-ethnic cooperation. Today they celebrate "Tiny War Day" where people have miniature food fights! 🥧⚔️'
};

// Alternative Timeline 3: German Victory
const germanVictoryTimeline: Timeline = {
  id: 'german-victory',
  title: 'German Victory: The Schlieffen Plan Actually Works! 🇩🇪⚡',
  description: 'What if Germany\'s lightning war strategy had succeeded and they had won World War I quickly?',
  divergenceDescription: 'Schlieffen Plan succeeds in capturing Paris within 6 weeks, forcing French surrender and quick German victory',
  divergenceYear: 1914,
  probability: 20,
  color: '#6B7280',
  icon: '🇩🇪',
  keyEvents: [
    {
      id: 'schlieffen-plan-succeeds-1914',
      year: 1914,
      month: 9,
      day: 15,
      title: 'Schlieffen Plan Works: "We Actually Did It!" 🇩🇪🎯',
      description: 'German forces capture Paris after defeating French army in Belgium. The impossible plan somehow works perfectly!',
      impact: 'Quick German victory prevents prolonged trench warfare',
      relatedFigures: [],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'military'
    },
    {
      id: 'french-surrender-1914',
      year: 1914,
      month: 9,
      day: 20,
      title: 'France Surrenders: "Au Revoir, We\'ll Try Again Later!" 🇫🇷🏳️',
      description: 'With Paris captured and army defeated, France signs armistice. The Third Republic falls after just 6 weeks of war.',
      impact: 'Eliminates France as major European power and German rival',
      relatedFigures: [],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'political'
    },
    {
      id: 'russia-makes-peace-1914',
      year: 1914,
      month: 11,
      title: 'Russia Backs Down: "Maybe This Wasn\'t a Good Idea!" 🇷🇺😰',
      description: 'Seeing French defeat, Russia signs separate peace rather than face Germany alone.',
      impact: 'Avoids Eastern Front and preserves German resources',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'german-empire-dominance-1915',
      year: 1915,
      month: 1,
      title: 'German Empire Dominates Europe: "We\'re Number One!" 🇩🇪👑',
      description: 'Germany becomes the undisputed master of continental Europe with French resources and Russian submission.',
      impact: 'Creates German hegemony over Europe 30 years early',
      relatedFigures: ['kaiser-wilhelm-ii'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'colonial-expansion-1916',
      year: 1916,
      month: 6,
      title: 'German Colonial Empire Expands: "More Sausage for Everyone!" 🌍🌭',
      description: 'Victorious Germany seizes French and Belgian colonies, creating massive global empire.',
      impact: 'Germany becomes major colonial power rivaling Britain',
      relatedFigures: [],
      location: { lat: -4.0435, lng: 21.7587 },
      type: 'political'
    },
    {
      id: 'anglo-german-naval-race-1918',
      year: 1918,
      month: 1,
      title: 'Anglo-German Naval Showdown: "Rule Britannia vs. Deutschland!" 🚢⚔️',
      description: 'With continental dominance secured, Germany challenges British naval supremacy directly.',
      impact: 'Sets up major naval confrontation between Germany and Britain',
      relatedFigures: [],
      location: { lat: 54.5973, lng: 5.9301 },
      type: 'military'
    }
  ],
  consequences: [
    {
      id: 'german-hegemony',
      category: 'political',
      shortTerm: 'Germany becomes dominant European power through military victory',
      longTerm: 'German-dominated Europe develops differently from democratic model',
      globalImpact: 'Authoritarian rather than democratic model dominates 20th century'
    },
    {
      id: 'colonial-reshuffling',
      category: 'political',
      shortTerm: 'German victory redistributes colonial empires',
      longTerm: 'Different colonial development and decolonization patterns',
      globalImpact: 'German rather than British colonial model spreads worldwide'
    }
  ],
  butterfly: [
    {
      id: 'no-american-rise',
      trigger: 'Quick war means America doesn\'t become major power',
      consequence: 'Different global balance with Germany as dominant power',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'authoritarian-europe',
      trigger: 'German victory validates authoritarian model',
      consequence: 'Democracy develops more slowly worldwide',
      magnitude: 'large',
      timespan: 75
    }
  ],
  presentDayStatus: 'The German Empire dominated Europe until 1945 when it finally democratized after losing World War II (which started in 1935 when Britain finally challenged German hegemony). Today, Germany leads the "European Imperial Federation" and makes really good cars! 🚗🇩🇪'
};

// Interactive story scenarios for World War I
const interactiveScenarios = [
  {
    id: 'archduke-assassination-choice',
    title: 'The Archduke\'s Fatal Route',
    text: 'Sarajevo, June 28, 1914. You are Archduke Franz Ferdinand\'s driver. After the failed first assassination attempt, you\'re told to take a different route. But you\'re confused about the directions...',
    emoji: '🚗',
    background: 'bg-linear-to-br from-gray-700 to-red-800',
    characters: ['👑', '🚗', '💣'],
    sceneType: 'decision' as const,
    timelineYear: 1914,
    timelineEvent: 'Assassination of Archduke Franz Ferdinand',
    choices: [
      {
        id: 'take-planned-route',
        text: 'Follow the new, safer route as instructed',
        consequence: 'You avoid the assassin completely - Franz Ferdinand lives and WWI might be prevented!'
      },
      {
        id: 'take-wrong-turn',
        text: 'Get confused and take the wrong turn onto Franz Joseph Street',
        consequence: 'Your mistake brings you right to Gavrilo Princip - the shot that starts WWI is fired'
      },
      {
        id: 'stop-and-ask-directions',
        text: 'Stop the car and ask for directions to be sure',
        consequence: 'While stopped, you\'re spotted by another conspirator - history takes a different but equally dangerous turn'
      }
    ]
  },
  {
    id: 'christmas-truce-decision',
    title: 'The Christmas Truce',
    text: 'December 24, 1914. No Man\'s Land, Western Front. It\'s Christmas Eve and you hear German soldiers singing "Silent Night." Someone suggests a truce...',
    emoji: '🎄',
    background: 'bg-linear-to-br from-green-800 to-red-900',
    characters: ['🎄', '⚔️', '🤝'],
    sceneType: 'decision' as const,
    timelineYear: 1914,
    timelineEvent: 'Christmas Truce across No Man\'s Land',
    choices: [
      {
        id: 'join-truce',
        text: 'Climb out of the trench and join the Christmas celebration',
        consequence: 'You share cigarettes, photos, and football with the "enemy" - a moment of humanity in hell'
      },
      {
        id: 'stay-vigilant',
        text: 'Remain at your post - this could be a trick',
        consequence: 'Your caution is noted by officers, but you miss a historic moment of peace'
      },
      {
        id: 'report-to-officers',
        text: 'Report the fraternization to your commanding officer',
        consequence: 'Your report leads to orders ending the truce - duty over humanity'
      }
    ]
  },
  {
    id: 'verdun-defense',
    title: 'The Hell of Verdun',
    text: 'February 1916. Verdun, France. The Germans launch their massive offensive to "bleed France white." You\'re a French officer deciding how to respond to this meat grinder...',
    emoji: '⚔️',
    background: 'bg-linear-to-br from-red-900 to-black',
    characters: ['🇫🇷', '💀', '🔥'],
    sceneType: 'battle' as const,
    timelineYear: 1916,
    timelineEvent: 'Battle of Verdun - the longest battle of WWI',
    choices: [
      {
        id: 'fight-to-last-man',
        text: 'Fight to the last man - "They shall not pass!"',
        consequence: 'Your heroic defense becomes legendary, but at a terrible cost in French lives'
      },
      {
        id: 'strategic-withdrawal',
        text: 'Conduct strategic withdrawal to better positions',
        consequence: 'Your tactical wisdom saves lives but may be seen as retreating'
      },
      {
        id: 'counter-attack',
        text: 'Launch immediate counter-attack to retake lost ground',
        consequence: 'Your aggression catches Germans off-guard but leads to massive casualties'
      }
    ]
  },
  {
    id: 'us-entry-decision',
    title: 'The Zimmermann Telegram',
    text: 'February 1917. Washington D.C. You\'re President Wilson\'s advisor. British intelligence just handed you the Zimmermann Telegram - Germany is asking Mexico to attack the US!',
    emoji: '📜',
    background: 'bg-linear-to-br from-blue-800 to-red-700',
    characters: ['🇺🇸', '📮', '⚔️'],
    sceneType: 'decision' as const,
    timelineYear: 1917,
    timelineEvent: 'Zimmermann Telegram pushes America toward war',
    choices: [
      {
        id: 'immediate-war',
        text: 'Recommend immediate declaration of war on Germany',
        consequence: 'Your quick action gets America into the war early, potentially saving Allied lives'
      },
      {
        id: 'verify-authenticity',
        text: 'Demand verification - this could be British propaganda',
        consequence: 'Your caution delays American entry but ensures you\'re making the right decision'
      },
      {
        id: 'diplomatic-solution',
        text: 'Try one more diplomatic solution before war',
        consequence: 'Your peace efforts are noble but may allow Germany to gain more ground'
      }
    ]
  },
  {
    id: 'armistice-negotiation',
    title: 'The Armistice Decision',
    text: 'November 1918. Compiègne Forest, France. You\'re negotiating the Armistice. Germany is beaten but still fighting. How harsh should the terms be?',
    emoji: '🕊️',
    background: 'bg-linear-to-br from-green-700 to-gray-800',
    characters: ['📜', '🕊️', '⚔️'],
    sceneType: 'decision' as const,
    timelineYear: 1918,
    timelineEvent: 'Armistice negotiations end the Great War',
    choices: [
      {
        id: 'harsh-terms',
        text: 'Impose harsh terms - Germany must pay for this war',
        consequence: 'Your tough stance ensures German defeat but may breed resentment for the future'
      },
      {
        id: 'moderate-terms',
        text: 'Seek moderate terms that Germany can accept',
        consequence: 'Your reasonableness ends the war quickly and may prevent future conflicts'
      },
      {
        id: 'unconditional-surrender',
        text: 'Demand nothing less than unconditional surrender',
        consequence: 'Your absolutism might prolong fighting but ensures total victory'
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
  endYear: 1919,
  description: 'The Great War: When Europe Decided to Have the World\'s Worst Family Fight! 💥⚔️ Watch as a single assassination in Sarajevo somehow triggers the first global industrial war. It\'s got trenches, poison gas, tanks, airplanes, and enough explosions to make Michael Bay jealous! Plus the most expensive family feud in history! 💸💀',
  historicalContext: 'Europe in 1914 was like a powder keg surrounded by people playing with matches! 💥 Everyone was allied with everyone else in a web of treaties so complicated that even the diplomats got confused. Add in some serious nationalism, an arms race that got way out of hand, and emperors with more ego than sense, and you\'ve got the perfect recipe for disaster. What started as "the war to end all wars" ended up being "the war that made everyone want to have another war." Go figure! 🤷‍♂️⚔️',
  keyFigures,
  divergencePoint: 'Assassination of Archduke Franz Ferdinand',
  divergenceYear: 1914,
  alternativeTimelines: [
    noAssassinationTimeline,
    localizedConflictTimeline,
    germanVictoryTimeline,
    // Additional timelines can be added here...
  ],
  mainImage: '/images/world-war-1-main.jpg',
  icon: '⚔️',
  backgroundColor: 'from-gray-600 to-red-800',
  interactiveScenarios
};