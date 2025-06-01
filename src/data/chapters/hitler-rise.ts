import { Chapter, Timeline, HistoricalEvent, Person, Consequence, ButterflyEffect } from '../../types';

// Key figures with respectful but engaging descriptions
const keyFigures: Person[] = [
  {
    id: 'adolf-hitler',
    name: 'Adolf Hitler',
    role: 'Failed Artist Turned Dictator',
    born: 1889,
    died: 1945,
    description: 'The Austrian painter who was rejected from art school and unfortunately decided politics was his backup plan. 🎨➡️💀 His rise shows how economic chaos and social resentment can enable terrible leaders.',
    image: '/images/hitler.jpg'
  },
  {
    id: 'heinrich-himmler',
    name: 'Heinrich Himmler',
    role: 'SS Leader & Architect of Horror',
    born: 1900,
    died: 1945,
    description: 'The chicken farmer who became one of history\'s most evil administrators. 📋💀 Proved that bureaucratic efficiency applied to evil purposes creates unimaginable horror.',
    image: '/images/himmler.jpg'
  },
  {
    id: 'joseph-goebbels',
    name: 'Joseph Goebbels',
    role: 'Master of Propaganda & Lies',
    born: 1897,
    died: 1945,
    description: 'The failed novelist who perfected the art of political lying. 📢🎭 His propaganda techniques unfortunately influenced political communication forever.',
    image: '/images/goebbels.jpg'
  },
  {
    id: 'ernst-rohm',
    name: 'Ernst Röhm',
    role: 'SA Leader & Hitler\'s Former Ally',
    born: 1887,
    died: 1934,
    description: 'The tough street fighter who helped Hitler rise to power, only to be killed by him in the Night of Long Knives. 💀🗡️ Lesson: enabling dictators is dangerous even for enablers.',
    image: '/images/rohm.jpg'
  },
  {
    id: 'paul-von-hindenburg',
    name: 'Paul von Hindenburg',
    role: 'The President Who Made the Fatal Decision',
    born: 1847,
    died: 1934,
    description: 'The aging war hero who thought he could control Hitler by making him Chancellor. 👴🤦‍♂️ History\'s most catastrophic political miscalculation.',
    image: '/images/hindenburg.jpg'
  },
  {
    id: 'gustav-stresemann',
    name: 'Gustav Stresemann',
    role: 'The Statesman Who Tried to Save Democracy',
    born: 1878,
    died: 1929,
    description: 'The brilliant diplomat who stabilized Germany in the 1920s but died too soon. 🕊️💔 His death removed the last moderate voice that might have stopped Hitler.',
    image: '/images/stresemann.jpg'
  }
];

// Historical events with serious but accessible storytelling
const mainTimelineEvents: HistoricalEvent[] = [
  {
    id: 'hitler-art-rejection-1907',
    year: 1907,
    month: 10,
    title: 'Art School Rejection: The World\'s Most Consequential "No" 🎨❌',
    description: 'Hitler is rejected from Vienna Academy of Fine Arts. One admissions decision that changed world history. Sometimes saying "no" has bigger consequences than anyone could imagine.',
    impact: 'Personal failure shapes Hitler\'s resentment and worldview',
    relatedFigures: ['adolf-hitler'],
    location: { lat: 48.2082, lng: 16.3738 },
    type: 'social'
  },
  {
    id: 'beer-hall-putsch-1923',
    year: 1923,
    month: 11,
    day: 8,
    title: 'Beer Hall Putsch: Hitler\'s Failed Coup Attempt 🍺💥',
    description: 'Hitler tries to overthrow the Bavarian government in Munich and fails spectacularly. Gets arrested, but the trial makes him famous. Sometimes failing upward is a real thing.',
    impact: 'Failed coup gives Hitler national platform and martyrdom narrative',
    relatedFigures: ['adolf-hitler'],
    location: { lat: 48.1351, lng: 11.5820 },
    type: 'political'
  },
  {
    id: 'mein-kampf-written-1925',
    year: 1925,
    month: 7,
    title: 'Mein Kampf Published: Blueprint for Disaster 📖💀',
    description: 'Hitler writes his autobiography and political manifesto while in prison. Unfortunately, people should have taken his horrific plans more seriously.',
    impact: 'Lays out Nazi ideology and future plans that few people believed',
    relatedFigures: ['adolf-hitler'],
    location: { lat: 48.1351, lng: 11.5820 },
    type: 'cultural'
  },
  {
    id: 'golden-age-ends-1929',
    year: 1929,
    month: 10,
    day: 24,
    title: 'Wall Street Crash: Germany\'s Stability Crumbles 📉💔',
    description: 'The Wall Street Crash devastates Germany\'s economy and ends the "Golden Twenties." Economic desperation creates perfect conditions for extremism.',
    impact: 'Economic crisis destroys moderate parties and enables radical solutions',
    relatedFigures: ['gustav-stresemann'],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'economic'
  },
  {
    id: 'nazi-electoral-breakthrough-1930',
    year: 1930,
    month: 9,
    day: 14,
    title: 'Nazi Electoral Breakthrough: From Fringe to Mainstream 📊⚡',
    description: 'Nazis jump from 12 to 107 seats in Reichstag elections. Suddenly Hitler\'s party is no longer a joke but a major political force.',
    impact: 'Legitimizes Nazi party and makes Hitler a serious political player',
    relatedFigures: ['adolf-hitler'],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'political'
  },
  {
    id: 'presidential-election-1932',
    year: 1932,
    month: 4,
    day: 10,
    title: 'Hitler vs. Hindenburg: The Election That Decided Everything 🗳️⚡',
    description: 'Hitler loses presidential election to Hindenburg but gets 37% of vote. Shows how close Germany came to electing Hitler directly.',
    impact: 'Demonstrates Hitler\'s mass appeal and legitimizes his political ambitions',
    relatedFigures: ['adolf-hitler', 'paul-von-hindenburg'],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'political'
  },
  {
    id: 'hitler-becomes-chancellor-1933',
    year: 1933,
    month: 1,
    day: 30,
    title: 'Hitler Becomes Chancellor: The Fatal Appointment 👑💀',
    description: 'President Hindenburg appoints Hitler as Chancellor, thinking conservative politicians can control him. History\'s worst political miscalculation.',
    impact: 'Gives Hitler legal path to power and beginning of Nazi dictatorship',
    relatedFigures: ['adolf-hitler', 'paul-von-hindenburg'],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'political'
  },
  {
    id: 'reichstag-fire-1933',
    year: 1933,
    month: 2,
    day: 27,
    title: 'Reichstag Fire: Democracy Burns Down 🔥🏛️',
    description: 'The German parliament building burns down. Hitler uses the crisis to suspend civil liberties and arrest political opponents. Never waste a good crisis!',
    impact: 'Enables Hitler to suspend constitution and eliminate political opposition',
    relatedFigures: ['adolf-hitler'],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'political'
  },
  {
    id: 'enabling-act-1933',
    year: 1933,
    month: 3,
    day: 23,
    title: 'Enabling Act: Democracy Votes Itself Out of Existence 🗳️💀',
    description: 'German parliament votes to give Hitler dictatorial powers. Democracy literally votes to end democracy. Sometimes the system destroys itself.',
    impact: 'Legalizes Hitler\'s dictatorship and ends German democracy',
    relatedFigures: ['adolf-hitler'],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'political'
  },
  {
    id: 'night-of-long-knives-1934',
    year: 1934,
    month: 6,
    day: 30,
    title: 'Night of Long Knives: Hitler Eliminates His Own Allies 🗡️🌙',
    description: 'Hitler orders the murder of SA leader Ernst Röhm and other rivals. Shows that even helping a dictator rise doesn\'t guarantee survival.',
    impact: 'Consolidates Hitler\'s power and shows willingness to kill anyone',
    relatedFigures: ['adolf-hitler', 'ernst-rohm'],
    location: { lat: 52.5200, lng: 13.4050 },
    type: 'political'
  },
  {
    id: 'nuremberg-laws-1935',
    year: 1935,
    month: 9,
    day: 15,
    title: 'Nuremberg Laws: Legal Persecution Begins 📋💔',
    description: 'Nazi Germany passes laws stripping Jews of citizenship and civil rights. Shows how quickly legal systems can be perverted to enable oppression.',
    impact: 'Legalizes systematic persecution and sets stage for Holocaust',
    relatedFigures: ['adolf-hitler'],
    location: { lat: 49.4521, lng: 11.0767 },
    type: 'social'
  }
];

// Alternative Timeline 1: Art School Acceptance
const artSchoolTimelineAccepted: Timeline = {
  id: 'art-school-timeline',
  title: 'Hitler the Artist: When Art School Says "Yes" 🎨✨',
  description: 'What if Hitler had been accepted to art school and become a painter instead of a dictator?',
  divergenceDescription: 'Hitler is accepted to Vienna Academy of Fine Arts and pursues successful career as artist',
  divergenceYear: 1907,
  probability: 60,
  color: '#8B5CF6',
  icon: '🎨',
  keyEvents: [
    {
      id: 'art-school-acceptance-1907',
      year: 1907,
      month: 10,
      title: 'Art School Says "Yes": The World\'s Luckiest Acceptance! 🎨✅',
      description: 'Hitler is accepted to Vienna Academy of Fine Arts. He becomes a mediocre landscape painter instead of a genocidal dictator.',
      impact: 'Redirects Hitler\'s ambitions toward art rather than politics',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 48.2082, lng: 16.3738 },
      type: 'social'
    },
    {
      id: 'struggling-artist-1910s',
      year: 1915,
      month: 1,
      title: 'Hitler the Struggling Artist: "Will Paint for Food!" 🎨💸',
      description: 'Hitler struggles as a mediocre landscape painter in Vienna, selling postcards and small paintings to tourists.',
      impact: 'Channels frustrations into art rather than political extremism',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 48.2082, lng: 16.3738 },
      type: 'social'
    },
    {
      id: 'war-artist-1917',
      year: 1917,
      month: 6,
      title: 'War Artist Corps: Hitler Paints the Front Lines! 🎨⚔️',
      description: 'Hitler serves as official war artist, documenting WWI battlefields through paintings rather than experiencing combat trauma.',
      impact: 'Avoids traumatic combat experience that radicalized him',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 50.0077, lng: 2.6966 },
      type: 'military'
    },
    {
      id: 'art-exhibition-success-1925',
      year: 1925,
      month: 9,
      title: 'Hitler\'s First Exhibition: "Landscapes of Austria" 🖼️🏔️',
      description: 'Hitler has moderately successful art exhibition in Munich, finally achieving recognition as landscape painter.',
      impact: 'Provides positive reinforcement for artistic rather than political pursuits',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 48.1351, lng: 11.5820 },
      type: 'cultural'
    },
    {
      id: 'art-teacher-1930',
      year: 1930,
      month: 1,
      title: 'Professor Hitler: Teaching Art, Not Hate! 👨‍🏫🎨',
      description: 'Hitler becomes art teacher at small Bavarian academy, channeling his passion for lecturing into education.',
      impact: 'Provides legitimate outlet for Hitler\'s need to influence others',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 48.1351, lng: 11.5820 },
      type: 'social'
    },
    {
      id: 'weimar-survives-1933',
      year: 1933,
      month: 1,
      title: 'Weimar Republic Survives: Democracy Gets Another Chance! 🏛️✨',
      description: 'Without Hitler, the Nazi party remains fringe movement and German democracy gradually stabilizes.',
      impact: 'Preserves German democracy and prevents rise of fascism',
      relatedFigures: [],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'no-holocaust',
      category: 'social',
      shortTerm: 'No Nazi ideology means no systematic persecution of minorities',
      longTerm: 'Six million Jewish lives saved along with millions of other victims',
      globalImpact: 'Different understanding of human rights and genocide prevention'
    },
    {
      id: 'no-world-war-ii',
      category: 'political',
      shortTerm: 'No Nazi aggression means no European war in 1930s-40s',
      longTerm: 'Different global power balance and technological development',
      globalImpact: 'Millions of lives saved and different post-war world order'
    }
  ],
  butterfly: [
    {
      id: 'different-wwii',
      trigger: 'No Nazi Germany changes entire conflict dynamics',
      consequence: 'If WWII happens, it\'s completely different war with different causes',
      magnitude: 'massive',
      timespan: 50
    },
    {
      id: 'stable-europe',
      trigger: 'No Nazi disruption allows gradual European integration',
      consequence: 'European cooperation develops peacefully through 1930s-40s',
      magnitude: 'large',
      timespan: 100
    }
  ],
  presentDayStatus: 'Adolf Hitler died peacefully in 1960 as a retired art teacher. His landscape paintings sell for modest prices in Austrian gift shops. The Hitler Art Museum in Vienna displays his work with the tagline "Art That Saved the World." His most famous painting is titled "Mountain View, 1934" - painted the same year he would have consolidated power. 🎨🕊️'
};

// Alternative Timeline 2: Beer Hall Success
const beerHallSuccessTimeline: Timeline = {
  id: 'beer-hall-success',
  title: 'Beer Hall Putsch Succeeds: Early Nazi Victory! 🍺⚡',
  description: 'What if Hitler\'s 1923 coup attempt had succeeded and he took power 10 years earlier?',
  divergenceDescription: 'Beer Hall Putsch succeeds, Hitler takes control of Bavaria and marches on Berlin successfully',
  divergenceYear: 1923,
  probability: 15,
  color: '#DC2626',
  icon: '🍺',
  keyEvents: [
    {
      id: 'bavaria-captured-1923',
      year: 1923,
      month: 11,
      day: 9,
      title: 'Beer Hall Putsch Succeeds: Bavaria Falls to Nazis! 🍺👑',
      description: 'Hitler successfully takes control of Bavarian government and begins march on Berlin with SA forces.',
      impact: 'Gives Hitler territorial base and momentum for national takeover',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 48.1351, lng: 11.5820 },
      type: 'political'
    },
    {
      id: 'march-on-berlin-1923',
      year: 1923,
      month: 11,
      day: 15,
      title: 'March on Berlin: Nazi Revolution Spreads! ⚔️🏛️',
      description: 'Hitler leads SA forces toward Berlin as Nazi revolution spreads across Germany during economic crisis.',
      impact: 'Destabilizes Weimar Republic during hyperinflation crisis',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'military'
    },
    {
      id: 'weimar-collapses-1923',
      year: 1923,
      month: 12,
      day: 1,
      title: 'Weimar Republic Collapses: Democracy Dies Early! 💀🏛️',
      description: 'Economic crisis and Nazi uprising cause Weimar government to collapse, Hitler seizes power.',
      impact: 'Establishes Nazi dictatorship 10 years ahead of schedule',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'early-rearmament-1925',
      year: 1925,
      month: 1,
      title: 'Secret Rearmament Begins: Germany Breaks Versailles Early! ⚔️🔧',
      description: 'Hitler begins secret rearmament program immediately, building military strength while other powers are unprepared.',
      impact: 'Gives Germany longer preparation time for future conflicts',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'military'
    },
    {
      id: 'european-war-1930',
      year: 1930,
      month: 9,
      title: 'European War Erupts: Hitler Strikes While Strong! 💥🌍',
      description: 'Fully rearmed Germany attacks neighbors while they\'re still dealing with economic depression.',
      impact: 'Starts major European war during different global conditions',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'military'
    },
    {
      id: 'nazi-empire-1935',
      year: 1935,
      month: 5,
      title: 'Nazi Empire Dominates Europe: Early Victory! 👑💀',
      description: 'Hitler achieves European dominance by 1935, creating vast Nazi empire before other powers can respond effectively.',
      impact: 'Establishes Nazi control over Europe with longer time to consolidate',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'earlier-nazi-rule',
      category: 'political',
      shortTerm: 'Nazi dictatorship established 10 years earlier during economic crisis',
      longTerm: 'Longer period of Nazi rule with more time to implement policies',
      globalImpact: 'Different timing changes international response and resistance'
    },
    {
      id: 'different-war-timing',
      category: 'political',
      shortTerm: 'European war begins in 1930 instead of 1939',
      longTerm: 'Different technological and political conditions affect war outcome',
      globalImpact: 'Earlier conflict changes global power balance and alliances'
    }
  ],
  butterfly: [
    {
      id: 'earlier-holocaust',
      trigger: 'Earlier Nazi power means earlier implementation of genocide',
      consequence: 'Holocaust begins in 1920s with different methods and scope',
      magnitude: 'massive',
      timespan: 30
    },
    {
      id: 'different-resistance',
      trigger: 'Earlier Nazi takeover faces different international situation',
      consequence: 'Resistance movements and international response develop differently',
      magnitude: 'large',
      timespan: 20
    }
  ],
  presentDayStatus: 'The early Nazi Empire collapsed in 1943 after 20 years of brutal rule. The extended period of oppression led to more effective international cooperation against fascism. Today, November 9th is observed as "Never Again Day" with the slogan "Democracy Dies in Beer Halls" as a warning about political violence. 🍺⚠️'
};

// Alternative Timeline 3: Assassination Success
const assassinationSuccessTimeline: Timeline = {
  id: 'assassination-success',
  title: 'Hitler Assassination Succeeds: Heroes Change History! 🎯⚡',
  description: 'What if one of the many assassination attempts against Hitler had succeeded?',
  divergenceDescription: 'July 20, 1944 plot succeeds and Hitler is killed, allowing German resistance to seize power',
  divergenceYear: 1944,
  probability: 35,
  color: '#059669',
  icon: '🎯',
  keyEvents: [
    {
      id: 'july-20-success-1944',
      year: 1944,
      month: 7,
      day: 20,
      title: 'July 20 Plot Succeeds: The Bomb That Changed Everything! 💥🎯',
      description: 'Colonel Stauffenberg\'s bomb successfully kills Hitler at Wolf\'s Lair. German resistance officers seize control in Berlin.',
      impact: 'Eliminates Nazi leadership and enables German resistance takeover',
      relatedFigures: ['adolf-hitler'],
      location: { lat: 54.0758, lng: 21.5025 },
      type: 'political'
    },
    {
      id: 'german-resistance-government-1944',
      year: 1944,
      month: 7,
      day: 21,
      title: 'German Resistance Takes Power: "We\'re Not All Nazis!" 🇩🇪✊',
      description: 'German resistance forms provisional government and immediately begins peace negotiations with Allies.',
      impact: 'Provides legitimate German government to negotiate surrender',
      relatedFigures: [],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'early-german-surrender-1944',
      year: 1944,
      month: 9,
      day: 1,
      title: 'Germany Surrenders Early: War Ends Year Early! 🏳️🕊️',
      description: 'New German government negotiates surrender, ending European war in September 1944 instead of May 1945.',
      impact: 'Saves millions of lives and changes post-war territorial arrangements',
      relatedFigures: [],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'military'
    },
    {
      id: 'democratic-germany-1945',
      year: 1945,
      month: 1,
      title: 'Democratic Germany Established: Redemption Story! 🗳️🇩🇪',
      description: 'German resistance leaders establish democratic government with Allied support, avoiding occupation.',
      impact: 'Creates democratic Germany immediately without occupation period',
      relatedFigures: [],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'no-cold-war-division-1945',
      year: 1945,
      month: 5,
      title: 'Unified Germany Avoids Division: No Berlin Wall! 🧱❌',
      description: 'Democratic German government prevents country\'s division between East and West.',
      impact: 'Avoids Cold War division of Germany and different European development',
      relatedFigures: [],
      location: { lat: 52.5200, lng: 13.4050 },
      type: 'political'
    },
    {
      id: 'european-integration-1950',
      year: 1950,
      month: 1,
      title: 'European Integration Begins Early: United We Stand! 🇪🇺🤝',
      description: 'Democratic Germany leads European integration movement as redemption for Nazi period.',
      impact: 'Accelerates European unification and cooperation',
      relatedFigures: [],
      location: { lat: 50.8503, lng: 4.3517 },
      type: 'political'
    }
  ],
  consequences: [
    {
      id: 'earlier-war-end',
      category: 'political',
      shortTerm: 'World War II ends 8 months earlier, saving millions of lives',
      longTerm: 'Different post-war arrangements with less destruction',
      globalImpact: 'Different Cold War dynamics with unified democratic Germany'
    },
    {
      id: 'german-redemption',
      category: 'political',
      shortTerm: 'German resistance proves not all Germans supported Nazis',
      longTerm: 'Faster rehabilitation of Germany in international community',
      globalImpact: 'Different narrative about German resistance and responsibility'
    }
  ],
  butterfly: [
    {
      id: 'no-cold-war-germany',
      trigger: 'Unified democratic Germany changes post-war balance',
      consequence: 'Different Cold War dynamics with strong European third way',
      magnitude: 'large',
      timespan: 50
    },
    {
      id: 'saved-holocaust-victims',
      trigger: 'Earlier war end saves final phase Holocaust victims',
      consequence: 'Hundreds of thousands of additional survivors',
      magnitude: 'massive',
      timespan: 100
    }
  ],
  presentDayStatus: 'Germany\'s democratic transition in 1944 created the "Stauffenberg Republic," named after the hero who killed Hitler. Colonel Stauffenberg became post-war Chancellor and led Germany\'s transformation into a model democracy. July 20th is celebrated as "Freedom Day" across Europe. The Wolf\'s Lair is now a peace memorial. 🕊️🎯'
};

// Interactive story scenarios for Hitler's Rise to Power
const interactiveScenarios = [
  {
    id: 'art-school-decision',
    title: 'The Art School Rejection',
    text: 'Vienna, October 1907. You are an admissions officer at the Vienna Academy of Fine Arts. A young Austrian named Adolf Hitler has applied. His portfolio shows some talent but lacks technical skill...',
    emoji: '🎨',
    background: 'bg-gradient-to-br from-purple-800 to-gray-900',
    characters: ['🎨', '📋', '🏛️'],
    sceneType: 'decision' as const,
    timelineYear: 1907,
    timelineEvent: 'Hitler\'s application to art school',
    choices: [
      {
        id: 'accept-student',
        text: 'Accept him - everyone deserves a chance to improve',
        consequence: 'Your compassion changes history - Hitler becomes a mediocre artist instead of a dictator'
      },
      {
        id: 'reject-application',
        text: 'Reject the application - the technical skills aren\'t there',
        consequence: 'Your professional judgment sets Hitler on a path of resentment that will reshape the world'
      },
      {
        id: 'conditional-acceptance',
        text: 'Offer conditional acceptance with remedial training',
        consequence: 'Your compromise gives Hitler hope but delays his artistic development'
      }
    ]
  },
  {
    id: 'beer-hall-putsch',
    title: 'The Beer Hall Putsch',
    text: 'Munich, November 8, 1923. You\'re a Bavarian police officer as Hitler storms into the Bürgerbräu beer hall with armed SA men, declaring a revolution. What do you do?',
    emoji: '🍺',
    background: 'bg-gradient-to-br from-orange-700 to-red-900',
    characters: ['🍺', '⚔️', '👮'],
    sceneType: 'battle' as const,
    timelineYear: 1923,
    timelineEvent: 'Beer Hall Putsch - Hitler\'s failed coup attempt',
    choices: [
      {
        id: 'arrest-immediately',
        text: 'Arrest Hitler immediately for treason',
        consequence: 'Your quick action stops the putsch but makes Hitler a martyr to his followers'
      },
      {
        id: 'call-reinforcements',
        text: 'Quietly call for backup while keeping Hitler talking',
        consequence: 'Your strategic thinking leads to Hitler\'s capture but gives him time to rally supporters'
      },
      {
        id: 'negotiate-surrender',
        text: 'Try to negotiate a peaceful surrender',
        consequence: 'Your diplomacy might prevent bloodshed but could allow Hitler to escape'
      }
    ]
  },
  {
    id: 'hindenburg-decision',
    title: 'The Fatal Appointment',
    text: 'Berlin, January 30, 1933. You are President Hindenburg\'s advisor. Conservative politicians are urging you to appoint Hitler as Chancellor, claiming they can control him...',
    emoji: '👑',
    background: 'bg-gradient-to-br from-gray-800 to-black',
    characters: ['👴', '⚖️', '💀'],
    sceneType: 'decision' as const,
    timelineYear: 1933,
    timelineEvent: 'Hindenburg considers appointing Hitler as Chancellor',
    choices: [
      {
        id: 'refuse-appointment',
        text: 'Refuse to appoint Hitler - he\'s too dangerous',
        consequence: 'Your wisdom prevents Nazi takeover but may lead to political crisis and potential civil war'
      },
      {
        id: 'appoint-with-limits',
        text: 'Appoint Hitler but with strict constitutional limits',
        consequence: 'Your compromise gives Hitler legal power - he quickly destroys the very limits you set'
      },
      {
        id: 'demand-coalition',
        text: 'Insist on a coalition government to dilute Nazi power',
        consequence: 'Your political maneuvering briefly restrains Hitler but he soon eliminates his partners'
      }
    ]
  },
  {
    id: 'reichstag-fire-response',
    title: 'The Reichstag Fire Crisis',
    text: 'Berlin, February 27, 1933. The Reichstag building is burning! Hitler claims it\'s a communist plot and demands emergency powers. You\'re a parliamentarian who must decide...',
    emoji: '🔥',
    background: 'bg-gradient-to-br from-red-800 to-orange-900',
    characters: ['🔥', '🏛️', '⚖️'],
    sceneType: 'decision' as const,
    timelineYear: 1933,
    timelineEvent: 'Reichstag Fire used to justify emergency measures',
    choices: [
      {
        id: 'grant-emergency-powers',
        text: 'Grant emergency powers - the nation is in crisis',
        consequence: 'Your fear-based decision gives Hitler the tools to destroy democracy legally'
      },
      {
        id: 'demand-investigation',
        text: 'Demand full investigation before granting any powers',
        consequence: 'Your insistence on due process delays Hitler\'s takeover but he brands you as unpatriotic'
      },
      {
        id: 'refuse-emergency-powers',
        text: 'Refuse emergency powers - this could be a Nazi setup',
        consequence: 'Your suspicion is correct but your opposition may be swept aside by public panic'
      }
    ]
  },
  {
    id: 'july-plot-decision',
    title: 'The July 20 Plot',
    text: 'Wolf\'s Lair, July 20, 1944. You\'re Colonel Stauffenberg. The bomb is in your briefcase. Hitler is just meters away. This is your chance to end the Nazi regime...',
    emoji: '💣',
    background: 'bg-gradient-to-br from-green-800 to-black',
    characters: ['💣', '🎯', '⚰️'],
    sceneType: 'battle' as const,
    timelineYear: 1944,
    timelineEvent: 'July 20 plot to assassinate Hitler',
    choices: [
      {
        id: 'detonate-bomb',
        text: 'Place the bomb and activate the timer',
        consequence: 'Your courage attempts to save Germany and the world, but will the bomb work?'
      },
      {
        id: 'abort-mission',
        text: 'Abort - too many innocent people could be killed',
        consequence: 'Your moral qualms preserve lives but allow Hitler to continue his destruction'
      },
      {
        id: 'wait-better-opportunity',
        text: 'Wait for a better opportunity with fewer witnesses',
        consequence: 'Your caution might lead to a better plan, but each day costs thousands of lives'
      }
    ]
  }
];

// Main chapter data
export const hitlerRiseChapter: Chapter = {
  id: 'hitler-rise',
  title: 'Hitler\'s Rise to Power',
  period: '1920s-1940s',
  startYear: 1920,
  endYear: 1945,
  description: 'The Darkest Chapter: How Democracy Dies and Evil Rises 💀⚡ This is the story of how a failed artist became history\'s most notorious dictator. It\'s a serious lesson about how economic crisis, political failure, and social resentment can enable terrible leaders. Understanding this history helps us recognize and prevent similar threats to democracy today. 🏛️⚠️',
  historicalContext: 'Germany after World War I was a wounded nation looking for someone to blame. 💔 The Treaty of Versailles was harsh, the economy was in ruins, and people were desperate for simple answers to complex problems. Into this chaos stepped a failed artist with a talent for stirring up hate and resentment. Hitler\'s rise wasn\'t inevitable, but it was enabled by people who thought they could use him for their own purposes. This chapter shows how quickly democracy can crumble when people stop defending it. It\'s a vital lesson for every generation. 🚨📚',
  keyFigures,
  divergencePoint: 'Hitler\'s Rise to Power and Nazi Takeover',
  divergenceYear: 1933,
  alternativeTimelines: [
    artSchoolTimelineAccepted,
    beerHallSuccessTimeline,
    assassinationSuccessTimeline,
    // Additional timelines can be added here...
  ],
  mainImage: '/images/hitler-rise-main.jpg',
  icon: '⚠️',
  backgroundColor: 'from-gray-800 to-red-900',
  interactiveScenarios
};