import { Chapter, Timeline, HistoricalEvent, Person, Consequence, ButterflyEffect } from '../../types';

// Key figures with fun, animated character descriptions
const keyFigures: Person[] = [
  {
    id: 'peter-the-great',
    name: 'Peter I "The Great"',
    role: 'The Giant Tsar Who Loved Boats & Beards',
    born: 1672,
    died: 1725,
    description: 'Standing 6\'8" tall, this giant tsar was obsessed with modernizing Russia! ⚓🧔 Cut off nobles\' beards personally, built a navy from scratch, and created St. Petersburg in a swamp. Also loved carpentry and dentistry (yikes!).',
    image: '/images/peter-the-great.jpg'
  },
  {
    id: 'catherine-the-great',
    name: 'Catherine II "The Great"',
    role: 'The German Princess Who Out-Russiaed the Russians',
    born: 1729,
    died: 1796,
    description: 'This German-born empress conquered more territory than any Russian ruler! 👑⚔️ Corresponded with Voltaire, collected art like Pokemon cards, and somehow made autocracy look enlightened. Talk about overachieving!',
    image: '/images/catherine-the-great.jpg'
  },
  {
    id: 'ivan-the-terrible',
    name: 'Ivan IV "The Terrible"',
    role: 'The Tsar with Serious Anger Management Issues',
    born: 1530,
    died: 1584,
    description: 'Russia\'s first official Tsar who was... intense. 😤💥 Unified Russia through conquest and terror, accidentally killed his own son in a rage, and created the first secret police. His temper tantrums shaped a nation!',
    image: '/images/ivan-the-terrible.jpg'
  },
  {
    id: 'alexander-ii',
    name: 'Alexander II "The Liberator"',
    role: 'The Tsar Who Freed 23 Million Serfs',
    born: 1818,
    died: 1881,
    description: 'The reformer tsar who said "Better to abolish serfdom from above than wait for it to abolish itself from below!" ⛓️💔 Freed the serfs, modernized courts, and got blown up by revolutionaries for his trouble.',
    image: '/images/alexander-ii.jpg'
  },
  {
    id: 'rasputin',
    name: 'Grigori Rasputin',
    role: 'The Mad Monk Who Wouldn\'t Die',
    born: 1869,
    died: 1916,
    description: 'The mystical peasant who hypnotized the royal family! 🔮👁️ Claimed to heal the sick prince, partied like a rockstar, and survived poisoning, shooting, and drowning before finally dying. Legend!',
    image: '/images/rasputin.jpg'
  },
  {
    id: 'nicholas-ii',
    name: 'Nicholas II',
    role: 'The Last Tsar & Ultimate Tragic Figure',
    born: 1868,
    died: 1918,
    description: 'Poor Nicky! 😔👑 Never wanted to be tsar, just wanted a quiet family life. Instead got World War I, revolutions, and... well, let\'s just say it didn\'t end well for the Romanovs.',
    image: '/images/nicholas-ii.jpg'
  }
];

// Historical events with engaging, character-driven storytelling
const mainTimelineEvents: HistoricalEvent[] = [
  {
    id: 'peter-modernization-1700',
    year: 1700,
    month: 1,
    title: 'Peter\'s Extreme Makeover: Russia Edition! ✂️🏗️',
    description: 'Peter the Great forces nobles to shave their beards, wear Western clothes, and learn European manners. Those who refuse pay a "beard tax!" Russia goes from medieval to modern overnight.',
    impact: 'Rapid westernization transforms Russian society and military capability',
    relatedFigures: ['peter-the-great'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'cultural'
  },
  {
    id: 'st-petersburg-founded-1703',
    year: 1703,
    month: 5,
    day: 27,
    title: 'Building Venice in a Swamp: Peter\'s Crazy Dream! 🏙️🌊',
    description: 'Peter builds St. Petersburg in a mosquito-infested swamp, calling it his "Window to Europe." Thousands die building it, but the result is magnificent!',
    impact: 'Creates Russia\'s European capital and symbol of westernization',
    relatedFigures: ['peter-the-great'],
    location: { lat: 59.9311, lng: 30.3609 },
    type: 'political'
  },
  {
    id: 'great-northern-war-victory-1721',
    year: 1721,
    month: 9,
    day: 10,
    title: 'Russia Beats Sweden: David vs Goliath, Russian Style! ⚔️🇷🇺',
    description: 'After 21 years of war, Russia defeats mighty Sweden and becomes a European great power. Peter celebrates by declaring himself Emperor!',
    impact: 'Establishes Russia as major European power and Baltic Sea dominance',
    relatedFigures: ['peter-the-great'],
    location: { lat: 59.9311, lng: 30.3609 },
    type: 'military'
  },
  {
    id: 'catherine-enlightenment-1767',
    year: 1767,
    month: 7,
    title: 'Catherine Tries to Rewrite Russian Law... With Style! 📚⚖️',
    description: 'Catherine the Great attempts to create a new legal code based on Enlightenment principles. It\'s like trying to teach quantum physics to medieval knights!',
    impact: 'Introduces Enlightenment ideas to Russian governance and legal system',
    relatedFigures: ['catherine-the-great'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'political'
  },
  {
    id: 'pugachev-rebellion-1774',
    year: 1774,
    month: 1,
    title: 'Pugachev\'s Revolt: When Peasants Say "Enough!" 🔥👨‍🌾',
    description: 'Emelyan Pugachev leads massive peasant revolt, claiming to be the "real" tsar. Catherine crushes it brutally, but gets the message about serfdom.',
    impact: 'Massive peasant uprising reveals deep social tensions in Russian society',
    relatedFigures: ['catherine-the-great'],
    location: { lat: 51.5074, lng: 46.0096 },
    type: 'social'
  },
  {
    id: 'decembrist-revolt-1825',
    year: 1825,
    month: 12,
    day: 26,
    title: 'The Decembrists: Russia\'s First Democracy Attempt! 🗽⚔️',
    description: 'Liberal officers try to establish constitutional monarchy when Nicholas I becomes tsar. They fail spectacularly but inspire generations of revolutionaries.',
    impact: 'First organized attempt at constitutional government in Russia',
    relatedFigures: [],
    location: { lat: 59.9311, lng: 30.3609 },
    type: 'political'
  },
  {
    id: 'crimean-war-defeat-1856',
    year: 1856,
    month: 3,
    day: 30,
    title: 'The Crimean Disaster: When the "Sick Man" Beats the Bear! 😷🐻',
    description: 'Russia loses the Crimean War to Britain, France, and Turkey. It\'s a wake-up call that Russia needs serious modernization... again!',
    impact: 'Military defeat exposes Russian backwardness and triggers reform era',
    relatedFigures: [],
    location: { lat: 44.9572, lng: 34.1108 },
    type: 'military'
  },
  {
    id: 'serf-emancipation-1861',
    year: 1861,
    month: 3,
    day: 3,
    title: 'Freedom Day: 23 Million Serfs Get Their Liberation! ⛓️💥🎉',
    description: 'Alexander II frees the serfs on the same day Lincoln is inaugurated! Coincidence? Maybe not! It\'s freedom everywhere in 1861!',
    impact: 'Abolishes serfdom and begins modernization of Russian society',
    relatedFigures: ['alexander-ii'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'social'
  },
  {
    id: 'trans-siberian-railway-1891',
    year: 1891,
    month: 5,
    day: 31,
    title: 'The Great Siberian Railroad Adventure Begins! 🚂🌍',
    description: 'Russia starts building the world\'s longest railroad across Siberia. It\'s like connecting New York to Los Angeles, but with more bears and permafrost!',
    impact: 'Connects European Russia to Pacific, enabling development of Siberia',
    relatedFigures: ['alexander-ii'],
    location: { lat: 43.1056, lng: 131.8735 },
    type: 'economic'
  },
  {
    id: 'bloody-sunday-1905',
    year: 1905,
    month: 1,
    day: 9,
    title: 'Bloody Sunday: When Faith in the Tsar Dies 💔⛪',
    description: 'Peaceful protesters marching to petition the tsar are shot down. Father Gapon leads them singing hymns, but bullets answer their prayers.',
    impact: 'Shatters traditional faith in the tsar and sparks 1905 Revolution',
    relatedFigures: ['nicholas-ii'],
    location: { lat: 59.9311, lng: 30.3609 },
    type: 'political'
  },
  {
    id: 'october-manifesto-1905',
    year: 1905,
    month: 10,
    day: 30,
    title: 'Nicholas II Promises Democracy... Sort Of! 📜🤞',
    description: 'Faced with revolution, Nicholas II promises a constitution and parliament (Duma). He crosses his fingers behind his back while signing it.',
    impact: 'Creates first constitutional limits on tsarist autocracy',
    relatedFigures: ['nicholas-ii'],
    location: { lat: 55.7558, lng: 37.6176 },
    type: 'political'
  }
];

// Alternative Timeline 1: Democratic Russia
const democraticRussiaTimeline: Timeline = {
  id: 'democratic-russia',
  title: 'Tsar Nicholas Becomes a Democrat! 🗳️👑',
  description: 'What if Nicholas II had genuinely embraced constitutional monarchy after 1905 and created a real democracy?',
  divergenceDescription: 'Nicholas II takes the 1905 October Manifesto seriously and creates genuine constitutional monarchy with real parliamentary power',
  divergenceYear: 1905,
  probability: 30,
  color: '#10B981',
  icon: '🗳️',
  keyEvents: [
    {
      id: 'real-constitution-1906',
      year: 1906,
      month: 4,
      title: 'Nicholas II: "Democracy Doesn\'t Look So Bad!" 🤔👑',
      description: 'Nicholas II genuinely accepts constitutional limits and allows the Duma real power over legislation and budgets.',
      impact: 'Creates functioning constitutional monarchy with democratic institutions',
      relatedFigures: ['nicholas-ii'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'stolypin-agrarian-success-1907',
      year: 1907,
      month: 11,
      title: 'Stolypin\'s Agricultural Revolution Works! 🌾🚜',
      description: 'Prime Minister Stolypin\'s land reforms create millions of prosperous peasant farmers, building a rural middle class.',
      impact: 'Land reform creates stable rural middle class supporting democracy',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'economic'
    },
    {
      id: 'education-expansion-1910',
      year: 1910,
      month: 9,
      title: 'Russia Goes Back to School: Education for Everyone! 📚🎓',
      description: 'Massive expansion of public education creates literate citizenry capable of democratic participation.',
      impact: 'Educational reforms create informed electorate for democratic system',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'social'
    },
    {
      id: 'industrial-boom-1912',
      year: 1912,
      month: 1,
      title: 'Russian Industrial Miracle: The Bear Learns to Build! 🏭⚡',
      description: 'Political stability enables rapid industrialization. Russia becomes major industrial power by 1914.',
      impact: 'Economic growth creates urban middle class supporting democratic institutions',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'economic'
    },
    {
      id: 'avoid-world-war-1914',
      year: 1914,
      month: 7,
      title: 'Russia Says "Nyet" to World War! ❌⚔️',
      description: 'Democratic Russia chooses diplomatic solution to July Crisis, avoiding World War I.',
      impact: 'Avoiding WWI prevents revolution and allows continued democratic development',
      relatedFigures: ['nicholas-ii'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    },
    {
      id: 'federal-structure-1920',
      year: 1920,
      month: 1,
      title: 'The Russian Federation is Born! 🇷🇺🤝',
      description: 'Russia adopts federal structure giving autonomy to different ethnic regions while maintaining unity.',
      impact: 'Federal system manages ethnic diversity while preserving Russian unity',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'stable-democracy',
      category: 'political',
      shortTerm: 'Constitutional monarchy with real parliamentary power established',
      longTerm: 'Gradual evolution to full democracy by 1950',
      globalImpact: 'Democratic Russia prevents World War I and changes 20th century'
    },
    {
      id: 'economic-prosperity',
      category: 'economic',
      shortTerm: 'Rapid industrialization and agricultural modernization',
      longTerm: 'Russia becomes major economic power rivaling Germany and Britain',
      globalImpact: 'Earlier global economic integration and technological development'
    }
  ],
  butterfly: [
    {
      id: 'no-world-war-one',
      trigger: 'Democratic Russia avoids mobilization in 1914',
      consequence: 'July Crisis resolved diplomatically, preventing World War I',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'no-soviet-union',
      trigger: 'Successful constitutional monarchy prevents revolution',
      consequence: 'No communist experiment in Russia or global communist movement',
      magnitude: 'massive',
      timespan: 150
    }
  ],
  presentDayStatus: 'The Russian Constitutional Federation became one of the world\'s oldest continuous democracies. By avoiding World War I, Russia developed into a prosperous federal democracy with strong institutions. The Romanov dynasty still reigns as constitutional monarchs, beloved for their role in democratization. Today, Russia is known for its literature, ballet, and surprisingly good record on human rights! 🎭📚'
};

// Alternative Timeline 2: Chinese Alliance
const chineseAllianceTimeline: Timeline = {
  id: 'chinese-alliance',
  title: 'The Dragon and the Bear: Sino-Russian Alliance! 🐉🐻',
  description: 'What if Russia had allied with China instead of competing, creating an unstoppable Eurasian empire?',
  divergenceDescription: 'Russia and Qing China form defensive alliance against Western imperialism instead of fighting over Central Asia',
  divergenceYear: 1860,
  probability: 20,
  color: '#F59E0B',
  icon: '🐉',
  keyEvents: [
    {
      id: 'treaty-of-friendship-1860',
      year: 1860,
      month: 10,
      title: 'The Dragon-Bear Pact: East Meets East! 🐉🤝🐻',
      description: 'Instead of territorial disputes, Russia and China sign mutual defense treaty against Western colonialism.',
      impact: 'Creates massive Eurasian alliance against Western imperial powers',
      relatedFigures: ['alexander-ii'],
      location: { lat: 39.9042, lng: 116.4074 },
      type: 'political'
    },
    {
      id: 'joint-modernization-1865',
      year: 1865,
      month: 3,
      title: 'Technology Transfer Express: Sharing is Caring! 🚂💡',
      description: 'Russia shares military technology while China provides manufacturing expertise and labor for joint development projects.',
      impact: 'Accelerated modernization for both empires through cooperation',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'economic'
    },
    {
      id: 'central-asian-development-1870',
      year: 1870,
      month: 6,
      title: 'The Great Silk Road Revival: Ancient Routes, Modern Power! 🐪💫',
      description: 'Joint Russian-Chinese development of Central Asian trade routes creates massive economic boom.',
      impact: 'Central Asia becomes prosperous bridge between European and East Asian markets',
      relatedFigures: [],
      location: { lat: 41.2995, lng: 69.2401 },
      type: 'economic'
    },
    {
      id: 'opium-wars-victory-1875',
      year: 1875,
      month: 8,
      title: 'Bye Bye Britain: The Opium Wars End Differently! 👋🇬🇧',
      description: 'Russian naval support helps China defeat British forces and end the opium trade permanently.',
      impact: 'China maintains sovereignty and avoids "Century of Humiliation"',
      relatedFigures: [],
      location: { lat: 31.2304, lng: 121.4737 },
      type: 'military'
    },
    {
      id: 'eurasian-economic-union-1880',
      year: 1880,
      month: 1,
      title: 'The Eurasian Economic Miracle Begins! 💰🌏',
      description: 'Russo-Chinese economic union creates world\'s largest free trade zone from Moscow to Shanghai.',
      impact: 'Economic integration creates Eurasian economic powerhouse',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'economic'
    },
    {
      id: 'technological-revolution-1890',
      year: 1890,
      month: 12,
      title: 'Eastern Innovation Explosion: Inventions Galore! 🔧⚡',
      description: 'Joint research programs lead to major technological breakthroughs in transportation and communication.',
      impact: 'Eurasian alliance becomes global technology leader',
      relatedFigures: [],
      location: { lat: 39.9042, lng: 116.4074 },
      type: 'technological'
    }
  ],
  consequences: [
    {
      id: 'eurasian-dominance',
      category: 'political',
      shortTerm: 'Russo-Chinese alliance dominates Asian politics',
      longTerm: 'Eurasian confederation becomes alternative to Western dominance',
      globalImpact: 'Multipolar world emerges 100 years earlier with Eastern power center'
    },
    {
      id: 'technological-advancement',
      category: 'technological',
      shortTerm: 'Joint research accelerates innovation in both countries',
      longTerm: 'Alternative technological development path independent of West',
      globalImpact: 'Different global technology standards and innovation patterns'
    }
  ],
  butterfly: [
    {
      id: 'different-colonialism',
      trigger: 'Strong Eurasian alliance resists Western imperialism',
      consequence: 'Colonialism fails in Asia, different global power balance',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'early-globalization',
      trigger: 'Eurasian economic integration',
      consequence: 'Different model of globalization based on land routes',
      magnitude: 'large',
      timespan: 150
    }
  ],
  presentDayStatus: 'The Russo-Chinese Alliance evolved into the Eurasian Confederation by 1950. Today it\'s the world\'s largest economic bloc, stretching from Vladivostok to Lisbon. The Trans-Eurasian Railway (completed in 1920) is the economic backbone connecting 50 countries. Beijing and Moscow are twin capitals of this peaceful confederation! 🚂🌏'
};

// Alternative Timeline 3: Islamic Russia
const islamicRussiaTimeline: Timeline = {
  id: 'islamic-russia',
  title: 'Islamic Russia: When the Crescent Meets the Bear! ☪️🐻',
  description: 'What if Russian expansion into Central Asia had resulted in Islamic influence transforming Russian culture and religion?',
  divergenceDescription: 'Russian nobles in Central Asia convert to Islam en masse, creating cultural synthesis between Slavic and Islamic traditions',
  divergenceYear: 1850,
  probability: 15,
  color: '#059669',
  icon: '☪️',
  keyEvents: [
    {
      id: 'mass-conversion-1850',
      year: 1850,
      month: 6,
      title: 'Russian Nobles Discover Islam: "This Makes Sense!" ☪️💡',
      description: 'Russian military officers and administrators in Central Asia begin converting to Islam, impressed by its sophisticated culture and governance.',
      impact: 'Begins cultural and religious transformation of Russian elite',
      relatedFigures: [],
      location: { lat: 41.2995, lng: 69.2401 },
      type: 'cultural'
    },
    {
      id: 'cultural-synthesis-1855',
      year: 1855,
      month: 9,
      title: 'East Meets West: Russian-Islamic Fusion Culture! 🎭🕌',
      description: 'New cultural synthesis emerges combining Slavic traditions with Islamic art, architecture, and philosophy.',
      impact: 'Creates unique Russo-Islamic cultural identity',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'cultural'
    },
    {
      id: 'islamic-learning-1860',
      year: 1860,
      month: 3,
      title: 'Madrasas in Moscow: Islamic Education Goes North! 📚🕌',
      description: 'Islamic schools and universities established in Russian cities, creating bilingual, bicultural educated class.',
      impact: 'Islamic educational system influences Russian intellectual development',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'social'
    },
    {
      id: 'ottoman-alliance-1865',
      year: 1865,
      month: 11,
      title: 'Russia and Ottoman Empire: Former Enemies, New Friends! 🤝🇹🇷',
      description: 'Islamic Russia forms unexpected alliance with Ottoman Empire against common European adversaries.',
      impact: 'Fundamental shift in European balance of power',
      relatedFigures: [],
      location: { lat: 41.0082, lng: 28.9784 },
      type: 'political'
    },
    {
      id: 'sufi-influence-1870',
      year: 1870,
      month: 5,
      title: 'Sufi Mysticism Meets Russian Soul: Spiritual Revolution! 🌟💫',
      description: 'Sufi mystical traditions deeply influence Russian spirituality, creating new forms of Islamic-Orthodox synthesis.',
      impact: 'Religious transformation affects Russian literature, music, and philosophy',
      relatedFigures: [],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'cultural'
    },
    {
      id: 'alexander-ii-conversion-1875',
      year: 1875,
      month: 12,
      title: 'Tsar Alexander II Converts: The Ultimate Plot Twist! 👑☪️',
      description: 'Tsar Alexander II secretly converts to Islam while maintaining Orthodox facade for political reasons.',
      impact: 'Islamic influence reaches highest levels of Russian government',
      relatedFigures: ['alexander-ii'],
      location: { lat: 55.7558, lng: 37.6176 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'religious-transformation',
      category: 'cultural',
      shortTerm: 'Significant Islamic influence on Russian culture and governance',
      longTerm: 'Russia becomes bridge between Islamic and Christian worlds',
      globalImpact: 'Different relationship between Islam and European Christianity'
    },
    {
      id: 'political-realignment',
      category: 'political',
      shortTerm: 'Alliance with Ottoman Empire changes European balance',
      longTerm: 'Russia becomes leader of Islamic modernization movement',
      globalImpact: 'Alternative model for Islamic state modernization'
    }
  ],
  butterfly: [
    {
      id: 'different-crimean-war',
      trigger: 'Russia-Ottoman alliance prevents traditional conflicts',
      consequence: 'European great power system reorganizes around religious lines',
      magnitude: 'large',
      timespan: 100
    },
    {
      id: 'islamic-modernization',
      trigger: 'Russian technological advancement combined with Islamic governance',
      consequence: 'Alternative path for Islamic world modernization',
      magnitude: 'large',
      timespan: 150
    }
  ],
  presentDayStatus: 'Islamic Russia evolved into a unique civilization blending Orthodox, Islamic, and secular traditions. Today it leads the "Eurasian Islamic Federation" with its capital in Kazan. The country is known for its beautiful mosque-cathedral architecture and its role as a bridge between civilizations. Friday prayers in the Kremlin are quite a sight! 🕌⛪'
};

// Main chapter data
export const russianEmpireChapter: Chapter = {
  id: 'russian-empire',
  title: 'Russian Empire',
  period: '1721-1917',
  startYear: 1700,
  endYear: 1920,
  description: 'From Arctic Wasteland to Global Superpower: The Russian Adventure! 🐻⚡ Watch as a collection of frozen principalities transforms into the world\'s largest empire through sheer determination, questionable fashion choices, and an impressive tolerance for cold weather. It\'s got westernization, wars, reforms, revolutions, and the occasional mad monk! 🏰❄️',
  historicalContext: 'Russia in 1700 was like that friend who shows up to a party wearing last century\'s clothes - technically invited, but clearly not fitting in! 😅 While Western Europe was having its Enlightenment and drinking tea with their pinkies up, Russia was still very much medieval. But then came Peter the Great, who decided Russia needed a SERIOUS makeover. What followed was 200 years of the most dramatic transformation in history: building cities in swamps, conquering everything in sight, freeing serfs, building the world\'s longest railroad, and somehow ending up with Rasputin. It\'s like a historical soap opera with real consequences! 🎭⚡',
  keyFigures,
  divergencePoint: 'Peter the Great\'s Westernization and Imperial Expansion',
  divergenceYear: 1721,
  alternativeTimelines: [
    democraticRussiaTimeline,
    chineseAllianceTimeline,
    islamicRussiaTimeline,
    // Additional timelines can be added here...
  ],
  mainImage: '/images/russian-empire-main.jpg',
  icon: '🐻',
  backgroundColor: 'from-red-600 to-blue-800'
};