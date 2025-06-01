import { Chapter, Timeline, HistoricalEvent, Person, Consequence, ButterflyEffect } from '../../types';

// Key figures in the French Revolution with cartoonish descriptions
const keyFigures: Person[] = [
  {
    id: 'marie-antoinette',
    name: 'Marie Antoinette',
    role: 'Queen of France & Fashion Icon',
    born: 1755,
    died: 1793,
    description: 'The cake-loving queen who allegedly said "Let them eat cake!" 🍰 Known for her extravagant parties and love of fancy dresses while people starved.',
    image: '/images/marie-antoinette.jpg'
  },
  {
    id: 'robespierre',
    name: 'Maximilien Robespierre',
    role: 'The Incorruptible Guillotine Master',
    born: 1758,
    died: 1794,
    description: 'The obsessively clean revolutionary who loved his guillotine a bit too much! 🗡️ Started as a defender of the people, ended as the Terror\'s chief architect.',
    image: '/images/robespierre.jpg'
  },
  {
    id: 'louis-xvi',
    name: 'Louis XVI',
    role: 'The Indecisive King',
    born: 1754,
    died: 1793,
    description: 'Poor Louis! 👑 Loved making locks more than making decisions. His hobby was locksmithing while his kingdom fell apart!',
    image: '/images/louis-xvi.jpg'
  },
  {
    id: 'napoleon-bonaparte',
    name: 'Napoleon Bonaparte',
    role: 'The Little Emperor with Big Dreams',
    born: 1769,
    died: 1821,
    description: 'The short general who conquered most of Europe! ⚡ Rose from the chaos to become Emperor and reshape the world.',
    image: '/images/napoleon.jpg'
  },
  {
    id: 'jacques-danton',
    name: 'Georges Danton',
    role: 'The Thunderous Voice of Revolution',
    born: 1759,
    died: 1794,
    description: 'The booming orator who could shake buildings with his voice! 📢 Unfortunately, even his powerful speeches couldn\'t save him from the guillotine.',
    image: '/images/danton.jpg'
  }
];

// Historical events with fun, engaging descriptions
const mainTimelineEvents: HistoricalEvent[] = [
  {
    id: 'financial-crisis-1787',
    year: 1787,
    month: 5,
    title: 'France Goes Bankrupt! 💰💸',
    description: 'France is so broke they can\'t even afford to pay their debt interest! The government is basically running on IOUs and prayer.',
    impact: 'Sets the stage for revolution as the economy crumbles like a stale croissant',
    relatedFigures: ['louis-xvi'],
    location: { lat: 48.8566, lng: 2.3522 },
    type: 'economic'
  },
  {
    id: 'estates-general-1789',
    year: 1789,
    month: 5,
    day: 5,
    title: 'The Estates-General: Medieval Politics Meeting! 🏰',
    description: 'Louis XVI calls the first Estates-General since 1614! It\'s like dusting off a 175-year-old board game and expecting it to work.',
    impact: 'Third Estate realizes they\'re getting a raw deal and decides to do something about it',
    relatedFigures: ['louis-xvi'],
    location: { lat: 48.8566, lng: 2.3522 },
    type: 'political'
  },
  {
    id: 'tennis-court-oath-1789',
    year: 1789,
    month: 6,
    day: 20,
    title: 'The Tennis Court Oath: Revolution on the Court! 🎾',
    description: 'Locked out of their meeting hall, the Third Estate meets in a tennis court and swears to create a new constitution. Talk about a power serve!',
    impact: 'Marks the beginning of the National Assembly and constitutional government',
    relatedFigures: [],
    location: { lat: 48.8566, lng: 2.3522 },
    type: 'political'
  },
  {
    id: 'storming-bastille-1789',
    year: 1789,
    month: 7,
    day: 14,
    title: 'Storming the Bastille: The Ultimate Prison Break! 🏰⚔️',
    description: 'Angry Parisians storm the Bastille fortress for gunpowder and free the... 7 prisoners inside! Not quite the dramatic rescue they expected!',
    impact: 'Symbolic victory that launched the revolution and gave France a national holiday',
    relatedFigures: [],
    location: { lat: 48.8532, lng: 2.3692 },
    type: 'political'
  },
  {
    id: 'declaration-rights-1789',
    year: 1789,
    month: 8,
    day: 26,
    title: 'Declaration of Rights: Freedom for Everyone! 📜✊',
    description: 'The National Assembly adopts the Declaration of the Rights of Man and Citizen. Liberty, Equality, Fraternity becomes the motto!',
    impact: 'Establishes fundamental human rights that inspire revolutions worldwide',
    relatedFigures: [],
    location: { lat: 48.8566, lng: 2.3522 },
    type: 'political'
  },
  {
    id: 'women-march-versailles-1789',
    year: 1789,
    month: 10,
    day: 5,
    title: 'Women\'s March on Versailles: No Bread, Big Problems! 🥖👑',
    description: 'Thousands of women march to Versailles demanding bread and bring the royal family back to Paris. Don\'t mess with hungry French women!',
    impact: 'Forces the royal family to leave Versailles and live under popular scrutiny',
    relatedFigures: ['marie-antoinette', 'louis-xvi'],
    location: { lat: 48.8049, lng: 2.1204 },
    type: 'social'
  },
  {
    id: 'king-execution-1793',
    year: 1793,
    month: 1,
    day: 21,
    title: 'Off With His Head! The King\'s Final Day 👑🗡️',
    description: 'Louis XVI loses his head to the guillotine. The crowd cheers as the divine right of kings dies with him.',
    impact: 'Shocks European monarchs and triggers international intervention',
    relatedFigures: ['louis-xvi'],
    location: { lat: 48.8566, lng: 2.3522 },
    type: 'political'
  },
  {
    id: 'reign-of-terror-1793',
    year: 1793,
    month: 9,
    title: 'The Reign of Terror: Guillotine Goes Brrr! 😱🗡️',
    description: 'Robespierre\'s guillotine works overtime! About 17,000 people lose their heads. Even looking suspicious could be fatal!',
    impact: 'Radical phase eliminates enemies but also terrorizes the population',
    relatedFigures: ['robespierre'],
    location: { lat: 48.8566, lng: 2.3522 },
    type: 'political'
  },
  {
    id: 'robespierre-execution-1794',
    year: 1794,
    month: 7,
    day: 28,
    title: 'Robespierre Gets a Taste of His Own Medicine! 🗡️😵',
    description: 'The guillotine master becomes the guillotine victim! Robespierre and his allies are executed, ending the Terror.',
    impact: 'Ends the radical phase and moves toward more moderate government',
    relatedFigures: ['robespierre'],
    location: { lat: 48.8566, lng: 2.3522 },
    type: 'political'
  },
  {
    id: 'napoleon-coup-1799',
    year: 1799,
    month: 11,
    day: 9,
    title: 'Napoleon\'s Coup: Enter the Little Emperor! ⚡👑',
    description: 'Napoleon Bonaparte stages a coup and seizes power. The short general with big ambitions ends the revolution and starts his empire!',
    impact: 'Ends the revolutionary period and begins the Napoleonic era',
    relatedFigures: ['napoleon-bonaparte'],
    location: { lat: 48.8566, lng: 2.3522 },
    type: 'military'
  }
];

// Alternative Timeline 1: Constitutional Monarchy Success
const constitutionalMonarchyTimeline: Timeline = {
  id: 'constitutional-monarchy',
  title: 'King Louis Learns to Share! 👑🤝',
  description: 'What if Louis XVI had embraced constitutional monarchy and worked with the revolutionaries instead of resisting change?',
  divergenceDescription: 'Louis XVI genuinely accepts constitutional limits and works with the National Assembly in good faith',
  divergenceYear: 1789,
  probability: 35,
  color: '#10B981',
  icon: '👑',
  keyEvents: [
    {
      id: 'louis-accepts-constitution-1789',
      year: 1789,
      month: 9,
      title: 'Louis XVI: "You Know What? This Constitution Looks Great!" 👑📜',
      description: 'Instead of resisting, Louis XVI enthusiastically embraces constitutional monarchy and becomes a model constitutional king.',
      impact: 'Prevents radicalization and establishes stable constitutional government',
      relatedFigures: ['louis-xvi'],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'political'
    },
    {
      id: 'economic-reforms-1790',
      year: 1790,
      month: 3,
      title: 'France Gets Its Financial House in Order! 💰📈',
      description: 'Successful financial reforms solve the debt crisis through fair taxation and economic modernization.',
      impact: 'Economic stability prevents social unrest and radical politics',
      relatedFigures: [],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'economic'
    },
    {
      id: 'peaceful-church-reform-1790',
      year: 1790,
      month: 7,
      title: 'Church and State Find Middle Ground ⛪🤝',
      description: 'Moderate church reforms are negotiated peacefully without alienating Catholic population.',
      impact: 'Prevents religious civil war and maintains social cohesion',
      relatedFigures: [],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'social'
    },
    {
      id: 'no-foreign-wars-1792',
      year: 1792,
      month: 4,
      title: 'France Says "Non!" to War 🕊️❌⚔️',
      description: 'Constitutional France avoids foreign wars by diplomatic solutions with European monarchies.',
      impact: 'No war means no radicalization and economic resources for domestic development',
      relatedFigures: [],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'political'
    },
    {
      id: 'industrial-revolution-1800',
      year: 1800,
      month: 1,
      title: 'France Becomes the Industrial Powerhouse! 🏭⚡',
      description: 'Political stability enables France to lead the Industrial Revolution in continental Europe.',
      impact: 'France becomes the dominant European industrial and economic power',
      relatedFigures: [],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'economic'
    }
  ],
  consequences: [
    {
      id: 'stable-democracy',
      category: 'political',
      shortTerm: 'Constitutional monarchy provides stable government for 30 years',
      longTerm: 'France becomes a model constitutional democracy inspiring peaceful reforms across Europe',
      globalImpact: 'Slower but more stable spread of democratic ideals without revolutionary violence'
    },
    {
      id: 'no-napoleon',
      category: 'political',
      shortTerm: 'No chaos means no opportunity for Napoleon\'s rise',
      longTerm: 'No Napoleonic Wars reshape European borders very differently',
      globalImpact: 'European balance of power remains stable, no need for Congress of Vienna'
    }
  ],
  butterfly: [
    {
      id: 'peaceful-europe',
      trigger: 'No revolutionary wars and Napoleon',
      consequence: 'European powers focus on colonial expansion and industrial development instead of fighting each other',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'earlier-democracy',
      trigger: 'Successful constitutional monarchy example',
      consequence: 'Other European monarchies adopt constitutional reforms peacefully',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'The French Constitutional Monarchy evolved into a modern parliamentary democracy by 1850. France leads the European Union as its most economically powerful member. The Bourbon dynasty still reigns as ceremonial monarchs, beloved for their role in peaceful democratization. No guillotines were harmed in the making of this timeline! 🇫🇷👑'
};

// Alternative Timeline 2: Robespierre Lives and Continues Terror
const robespierreLivesTimeline: Timeline = {
  id: 'robespierre-eternal',
  title: 'Robespierre\'s Eternal Terror! 😱🗡️',
  description: 'What if Robespierre had survived and continued the Reign of Terror for decades, creating a revolutionary police state?',
  divergenceDescription: 'Robespierre\'s allies prevent the Thermidorian Reaction and he consolidates power as revolutionary dictator',
  divergenceYear: 1794,
  probability: 20,
  color: '#DC2626',
  icon: '🗡️',
  keyEvents: [
    {
      id: 'robespierre-survives-1794',
      year: 1794,
      month: 7,
      title: 'Robespierre Dodges the Guillotine! 🗡️🏃‍♂️',
      description: 'Robespierre\'s spy network uncovers the plot against him and he purges his enemies first.',
      impact: 'Consolidates revolutionary dictatorship and intensifies the Terror',
      relatedFigures: ['robespierre'],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'political'
    },
    {
      id: 'revolutionary-police-state-1795',
      year: 1795,
      month: 1,
      title: 'France Becomes the Ultimate Police State! 👁️🚨',
      description: 'Robespierre creates an extensive surveillance network with neighbors spying on neighbors.',
      impact: 'Creates totalitarian state 150 years before Orwell imagined it',
      relatedFigures: ['robespierre'],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'political'
    },
    {
      id: 'export-revolution-1796',
      year: 1796,
      month: 4,
      title: 'Revolution Express: Now Delivering Terror Worldwide! 🚂💥',
      description: 'Robespierre sends revolutionary armies to "liberate" all of Europe from monarchy.',
      impact: 'Creates revolutionary empire based on ideological purity rather than Napoleon\'s pragmatism',
      relatedFigures: ['robespierre'],
      location: { lat: 50.8503, lng: 4.3517 },
      type: 'military'
    },
    {
      id: 'cult-supreme-being-1798',
      year: 1798,
      month: 6,
      title: 'Robespierre Declares Himself High Priest! ⛪😇',
      description: 'The Cult of the Supreme Being becomes mandatory state religion with Robespierre as divine interpreter.',
      impact: 'Creates revolutionary theocracy combining political and religious authority',
      relatedFigures: ['robespierre'],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'social'
    },
    {
      id: 'revolutionary-calendar-enforced-1800',
      year: 1800,
      month: 1,
      title: 'Goodbye Monday, Hello Primidi! 📅🔄',
      description: 'Revolutionary calendar is strictly enforced with severe penalties for using "counter-revolutionary" dates.',
      impact: 'Complete cultural transformation as traditional timekeeping becomes illegal',
      relatedFigures: ['robespierre'],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'cultural'
    }
  ],
  consequences: [
    {
      id: 'totalitarian-state',
      category: 'political',
      shortTerm: 'France becomes world\'s first modern totalitarian state',
      longTerm: 'Revolutionary terror continues for 30 years under Robespierre\'s rule',
      globalImpact: 'Provides template for 20th century totalitarian movements'
    },
    {
      id: 'revolutionary-wars',
      category: 'military',
      shortTerm: 'Ideological wars against all European monarchies',
      longTerm: 'Different style of European conquest based on revolutionary ideology',
      globalImpact: 'Earlier development of ideological warfare and propaganda techniques'
    }
  ],
  butterfly: [
    {
      id: 'no-napoleon-empire',
      trigger: 'Robespierre prevents Napoleon\'s rise',
      consequence: 'Revolutionary France develops differently without Napoleonic genius',
      magnitude: 'massive',
      timespan: 50
    },
    {
      id: 'early-totalitarianism',
      trigger: 'Revolutionary police state techniques perfected',
      consequence: 'Totalitarian methods spread to other revolutions 100 years earlier',
      magnitude: 'large',
      timespan: 200
    }
  ],
  presentDayStatus: 'The French Revolutionary Republic finally collapsed in 1824 when Robespierre died of old age (and probably exhaustion from all that guillotining). The restored monarchy was surprisingly popular after 30 years of terror. Modern France has an annual "Never Again Day" featuring guillotine-shaped piñatas. 🎭🗡️'
};

// Alternative Timeline 3: Girondist Victory
const girondistVictoryTimeline: Timeline = {
  id: 'girondist-victory',
  title: 'The Girondists Win! Democracy Lite Edition 🕊️🏛️',
  description: 'What if the moderate Girondist faction had defeated the radical Jacobins and created a federal republic?',
  divergenceDescription: 'Girondists successfully resist Jacobin coup attempts and maintain moderate control of the revolution',
  divergenceYear: 1793,
  probability: 25,
  color: '#3B82F6',
  icon: '🕊️',
  keyEvents: [
    {
      id: 'girondist-coalition-1793',
      year: 1793,
      month: 6,
      title: 'Girondists Form the Ultimate Alliance! 🤝⚡',
      description: 'Moderate Girondists successfully rally provincial support against Jacobin extremism in Paris.',
      impact: 'Prevents radical takeover and maintains moderate revolutionary government',
      relatedFigures: [],
      location: { lat: 44.8378, lng: -0.5792 },
      type: 'political'
    },
    {
      id: 'federal-republic-1793',
      year: 1793,
      month: 9,
      title: 'France Discovers Federalism! 🏛️🌟',
      description: 'Girondists establish a federal republic with strong regional autonomy, like America but with better food.',
      impact: 'Creates decentralized democracy respecting regional differences',
      relatedFigures: [],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'political'
    },
    {
      id: 'economic-liberalism-1794',
      year: 1794,
      month: 3,
      title: 'Free Market Revolution! 💰📈',
      description: 'Girondist economic policies promote free trade and business development without radical redistribution.',
      impact: 'Rapid economic recovery through market-oriented reforms',
      relatedFigures: [],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'economic'
    },
    {
      id: 'religious-tolerance-1794',
      year: 1794,
      month: 12,
      title: 'Everyone Gets to Believe What They Want! ⛪🕌🕍',
      description: 'Girondist government establishes genuine religious freedom without anti-clerical persecution.',
      impact: 'Maintains social cohesion while modernizing church-state relations',
      relatedFigures: [],
      location: { lat: 48.8566, lng: 2.3522 },
      type: 'social'
    },
    {
      id: 'peaceful-expansion-1796',
      year: 1796,
      month: 5,
      title: 'France Spreads Democracy Through Friendship! 🤗🌍',
      description: 'Instead of conquest, France promotes democratic ideals through cultural and economic influence.',
      impact: 'Gradual democratization of Europe without devastating wars',
      relatedFigures: [],
      location: { lat: 50.8503, lng: 4.3517 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'moderate-democracy',
      category: 'political',
      shortTerm: 'Stable federal republic with strong civil liberties',
      longTerm: 'France becomes model for federal democratic systems',
      globalImpact: 'Influences American federal system development and German unification'
    },
    {
      id: 'economic-prosperity',
      category: 'economic',
      shortTerm: 'Free market policies stimulate rapid economic growth',
      longTerm: 'France leads European economic development',
      globalImpact: 'Earlier development of global free trade systems'
    }
  ],
  butterfly: [
    {
      id: 'no-napoleonic-wars',
      trigger: 'Peaceful foreign policy prevents major European wars',
      consequence: 'Resources devoted to economic and cultural development instead of military conquest',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'federal-europe',
      trigger: 'Successful French federalism',
      consequence: 'European states adopt federal systems earlier, leading to peaceful European federation',
      magnitude: 'large',
      timespan: 150
    }
  ],
  presentDayStatus: 'The French Federal Republic became the heart of a peaceful European confederation by 1850. Today it leads the "European Federal Union" - like the EU but with even more cheese varieties and regional autonomy. The Girondist model inspired federal systems worldwide. Très magnifique! 🇫🇷🧀'
};

// Main chapter data
export const frenchRevolutionChapter: Chapter = {
  id: 'french-revolution',
  title: 'French Revolution',
  period: '1789',
  startYear: 1780,
  endYear: 1815,
  description: 'Liberty, Equality, Fraternity... and Lots of Guillotines! The French Revolution turned the world upside down with dramatic flair, revolutionary passion, and an unfortunate obsession with chopping off heads. 🇫🇷⚡',
  historicalContext: 'By 1789, France was a powder keg ready to explode! 💥 The country was bankrupt, the people were hungry, and the king was more interested in making locks than making decisions. When the Estates-General met for the first time in 175 years, it was like opening a very angry bottle of champagne that had been shaken for centuries. What started as a demand for financial reform became a complete transformation of society, politics, and even the calendar! The revolution would inspire democratic movements worldwide while also demonstrating that sometimes changing the world can get a bit... messy. 🗡️',
  keyFigures,
  divergencePoint: 'Storming of the Bastille and Revolutionary Radicalization',
  divergenceYear: 1789,
  alternativeTimelines: [
    constitutionalMonarchyTimeline,
    robespierreLivesTimeline,
    girondistVictoryTimeline,
    // Additional timelines can be added here...
  ],
  mainImage: '/images/french-revolution-main.jpg',
  icon: '🇫🇷',
  backgroundColor: 'from-blue-600 to-red-600'
};