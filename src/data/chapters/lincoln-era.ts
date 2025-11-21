import { Chapter, Timeline, Person, InteractiveScenario } from '../../types';

// Key figures with engaging, respectful but fun descriptions
const keyFigures: Person[] = [
  {
    id: 'abraham-lincoln',
    name: 'Abraham Lincoln',
    role: 'The Great Emancipator & Rail-Splitter President',
    born: 1809,
    died: 1865,
    description: 'From log cabin to White House! 🏠➡️🏛️ This tall, bearded president saved the Union, freed the slaves, and delivered the most famous speech in American history. All while battling depression and a very difficult wife.',
    image: '/images/lincoln.jpg'
  },
  {
    id: 'jefferson-davis',
    name: 'Jefferson Davis',
    role: 'President of the Confederate States',
    born: 1808,
    died: 1889,
    description: 'The other president during the Civil War! ⚔️ Led the Confederacy with determination but questionable fashion sense (that goatee!). Ended up in prison after the war.',
    image: '/images/jefferson-davis.jpg'
  },
  {
    id: 'robert-e-lee',
    name: 'Robert E. Lee',
    role: 'Confederate General & Reluctant Rebel',
    born: 1807,
    died: 1870,
    description: 'The South\'s most brilliant general who almost won the war! 🎖️ Chose his state over his country, then spent the rest of his life regretting it. Great at tactics, terrible at picking sides.',
    image: '/images/robert-e-lee.jpg'
  },
  {
    id: 'ulysses-s-grant',
    name: 'Ulysses S. Grant',
    role: 'Union General & Future President',
    born: 1822,
    died: 1885,
    description: 'The cigar-smoking, whiskey-drinking general who won the war! 🚬🥃 Started as a failed businessman, became the Union\'s savior. Proof that sometimes the quiet ones surprise you.',
    image: '/images/ulysses-grant.jpg'
  },
  {
    id: 'frederick-douglass',
    name: 'Frederick Douglass',
    role: 'Escaped Slave & Abolitionist Leader',
    born: 1818,
    died: 1895,
    description: 'From slavery to becoming one of America\'s greatest orators! 📢✊ His autobiography shocked the nation and his speeches moved hearts. Proved that education is the path from slavery to freedom.',
    image: '/images/frederick-douglass.jpg'
  },
  {
    id: 'harriet-tubman',
    name: 'Harriet Tubman',
    role: 'Underground Railroad Conductor & Union Spy',
    born: 1822,
    died: 1913,
    description: 'The Moses of her people! 🌟 Led hundreds to freedom through the Underground Railroad and never lost a passenger. Later became a Union spy and women\'s rights activist. Total badass!',
    image: '/images/harriet-tubman.jpg'
  }
];

// Historical events with engaging storytelling
/*
const mainTimelineEvents: HistoricalEvent[] = [
  {
    id: 'lincoln-election-1860',
    year: 1860,
    month: 11,
    day: 6,
    title: 'Lincoln Wins! The South Says "Nah" 🗳️😤',
    description: 'Abraham Lincoln wins the presidency without getting a single vote in 10 Southern states! The South takes this about as well as you\'d expect.',
    impact: 'Triggers secession crisis as Southern states refuse to accept the election results',
    relatedFigures: ['abraham-lincoln'],
    location: { lat: 39.8283, lng: -98.5795 },
    type: 'political'
  },
  {
    id: 'south-carolina-secession-1860',
    year: 1860,
    month: 12,
    day: 20,
    title: 'South Carolina Throws the Ultimate Tantrum! 😭🚪',
    description: 'South Carolina becomes the first state to secede, declaring they\'re taking their ball and going home. Other Southern states quickly follow suit.',
    impact: 'Begins the breakup of the United States as more states join the secession movement',
    relatedFigures: [],
    location: { lat: 33.8361, lng: -81.1637 },
    type: 'political'
  },
  {
    id: 'confederacy-formed-1861',
    year: 1861,
    month: 2,
    day: 4,
    title: 'The Confederate States: America\'s Awkward Cousin 🤠⚔️',
    description: 'Eleven states form the Confederate States of America with Jefferson Davis as president. It\'s like starting a rival company but with cannons.',
    impact: 'Creates two competing governments claiming to represent America',
    relatedFigures: ['jefferson-davis'],
    location: { lat: 32.361538, lng: -86.279118 },
    type: 'political'
  },
  {
    id: 'fort-sumter-1861',
    year: 1861,
    month: 4,
    day: 12,
    title: 'Fort Sumter: The War\'s Opening Act! 💥🏰',
    description: 'Confederate forces fire on Fort Sumter, officially starting the Civil War. Like the world\'s deadliest fireworks show, but less fun.',
    impact: 'First shots of the Civil War galvanize both sides for the conflict ahead',
    relatedFigures: [],
    location: { lat: 32.7516, lng: -79.8745 },
    type: 'military'
  },
  {
    id: 'first-bull-run-1861',
    year: 1861,
    month: 7,
    day: 21,
    title: 'First Battle of Bull Run: Reality Check Time! 💥😵',
    description: 'Both sides discover that war isn\'t a picnic (literally - spectators came with picnic baskets!). The Confederates win and everyone realizes this won\'t be over quickly.',
    impact: 'Shatters illusions about a quick war and leads to serious military preparation',
    relatedFigures: [],
    location: { lat: 38.8462, lng: -77.5211 },
    type: 'military'
  },
  {
    id: 'emancipation-proclamation-1863',
    year: 1863,
    month: 1,
    day: 1,
    title: 'Lincoln Drops the Emancipation Mic! 📜✊',
    description: 'Lincoln declares slaves in rebellious states to be free! It\'s a legal masterstroke that changes the war from preserving the Union to ending slavery.',
    impact: 'Transforms the war into a moral crusade and prevents European intervention',
    relatedFigures: ['abraham-lincoln'],
    location: { lat: 38.9072, lng: -77.0369 },
    type: 'political'
  },
  {
    id: 'gettysburg-battle-1863',
    year: 1863,
    month: 7,
    day: 1,
    title: 'Gettysburg: The War\'s Turning Point! ⚔️🎯',
    description: 'Three days of intense fighting end Lee\'s invasion of the North. The Confederacy\'s high-water mark literally has a monument marking the spot!',
    impact: 'Decisive Union victory that begins Confederate decline',
    relatedFigures: ['robert-e-lee'],
    location: { lat: 39.8309, lng: -77.2361 },
    type: 'military'
  },
  {
    id: 'gettysburg-address-1863',
    year: 1863,
    month: 11,
    day: 19,
    title: 'Lincoln\'s Greatest Speech: 272 Words of Pure Gold! 🎤✨',
    description: 'In just 2 minutes, Lincoln redefines the war and American democracy itself. The other guy spoke for 2 hours and nobody remembers what he said!',
    impact: 'Reframes the war as a new birth of freedom and democratic renewal',
    relatedFigures: ['abraham-lincoln'],
    location: { lat: 39.8309, lng: -77.2361 },
    type: 'political'
  },
  {
    id: 'shermans-march-1864',
    year: 1864,
    month: 11,
    day: 16,
    title: 'Sherman\'s March: Total War Comes to Georgia! 🔥🚂',
    description: 'General Sherman marches through Georgia like a destructive hurricane, proving that war is indeed hell. The South learns what "total war" really means.',
    impact: 'Devastates Confederate logistics and civilian morale',
    relatedFigures: [],
    location: { lat: 33.76, lng: -84.39 },
    type: 'military'
  },
  {
    id: 'lee-surrender-1865',
    year: 1865,
    month: 4,
    day: 9,
    title: 'Lee Surrenders: Game Over, Man! 🏳️🤝',
    description: 'Robert E. Lee surrenders to Ulysses S. Grant at Appomattox Court House. Grant lets the Confederates keep their horses because they\'ll need them for spring plowing. Classy move!',
    impact: 'Effectively ends the Civil War and begins Reconstruction',
    relatedFigures: ['robert-e-lee', 'ulysses-s-grant'],
    location: { lat: 37.3760, lng: -78.7965 },
    type: 'military'
  },
  {
    id: 'lincoln-assassination-1865',
    year: 1865,
    month: 4,
    day: 14,
    title: 'Lincoln\'s Tragic End: The Play That Changed Everything 🎭💔',
    description: 'John Wilkes Booth shoots Lincoln at Ford\'s Theatre during a comedy. The irony is tragic - Lincoln dies just as his greatest triumph is achieved.',
    impact: 'Martyrs Lincoln and transforms Reconstruction politics',
    relatedFigures: ['abraham-lincoln'],
    location: { lat: 38.8966, lng: -77.0252 },
    type: 'political'
  }
];
*/

// Alternative Timeline 1: Lincoln Survives
const lincolnSurvivesTimeline: Timeline = {
  id: 'lincoln-survives',
  title: 'Lincoln Lives: The Great Healer Continues! 🩹❤️',
  description: 'What if John Wilkes Booth had missed or been stopped? How would Lincoln\'s survival change Reconstruction and American race relations?',
  divergenceDescription: 'John Wilkes Booth\'s assassination attempt fails - either he misses, his gun misfires, or he\'s stopped by security',
  divergenceYear: 1865,
  probability: 30,
  color: '#10B981',
  icon: '🎩',
  image: '/images/chapters/lincoln-era/timeline_1.png',
  keyEvents: [
    {
      id: 'booth-foiled-1865',
      year: 1865,
      month: 4,
      day: 14,
      title: 'Booth\'s Plan Fails Spectacularly! 🎭🛡️',
      description: 'John Wilkes Booth\'s gun misfires and he\'s tackled by audience members. Lincoln watches the rest of "Our American Cousin" in peace.',
      impact: 'Lincoln survives to guide Reconstruction with his moderate approach',
      relatedFigures: ['abraham-lincoln'],
      location: { lat: 38.8966, lng: -77.0252 },
      type: 'political'
    },
    {
      id: 'lincolns-reconstruction-1865',
      year: 1865,
      month: 5,
      title: 'Lincoln\'s "Malice Toward None" Reconstruction 🤝🕊️',
      description: 'Lincoln implements his moderate Reconstruction plan emphasizing reconciliation over punishment. "With malice toward none, with charity for all."',
      impact: 'More successful integration of freed slaves with less Southern resentment',
      relatedFigures: ['abraham-lincoln'],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'political'
    },
    {
      id: 'freedmens-education-1866',
      year: 1866,
      month: 1,
      title: 'The Great Education Campaign Begins! 📚✊',
      description: 'Lincoln champions massive federal investment in educating freed slaves, seeing education as the key to true freedom.',
      impact: 'Creates comprehensive education system for African Americans decades earlier',
      relatedFigures: ['abraham-lincoln', 'frederick-douglass'],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'social'
    },
    {
      id: 'economic-integration-1867',
      year: 1867,
      month: 3,
      title: 'Land Redistribution: 40 Acres and a Mule for Real! 🐴🌾',
      description: 'Lincoln\'s administration successfully implements land redistribution, giving freed slaves economic independence.',
      impact: 'Creates Black middle class and reduces economic dependence on white landowners',
      relatedFigures: ['abraham-lincoln'],
      location: { lat: 33.76, lng: -84.39 },
      type: 'economic'
    },
    {
      id: 'lincoln-re-election-1868',
      year: 1868,
      month: 11,
      title: 'Lincoln Wins Again: The People\'s Choice! 🗳️🎉',
      description: 'Lincoln wins re-election on a platform of successful Reconstruction and national healing. Even some former Confederates vote for him!',
      impact: 'Validates moderate Reconstruction and ensures continuity of policies',
      relatedFigures: ['abraham-lincoln'],
      location: { lat: 39.8283, lng: -98.5795 },
      type: 'political'
    },
    {
      id: 'racial-reconciliation-1870',
      year: 1870,
      month: 7,
      title: 'The Great Reconciliation Summit! 🤝🌈',
      description: 'Lincoln organizes unprecedented meeting between Black and white Southern leaders to address racial tensions.',
      impact: 'Begins genuine dialogue about race relations 100 years before civil rights movement',
      relatedFigures: ['abraham-lincoln', 'frederick-douglass'],
      location: { lat: 32.361538, lng: -86.279118 },
      type: 'social'
    }
  ],
  consequences: [
    {
      id: 'successful-reconstruction',
      category: 'political',
      shortTerm: 'Moderate Reconstruction policies reduce Southern resentment while protecting Black rights',
      longTerm: 'No "Lost Cause" mythology develops, faster national healing',
      globalImpact: 'America becomes global model for post-conflict reconciliation'
    },
    {
      id: 'early-civil-rights',
      category: 'social',
      shortTerm: 'Strong federal protection of Black rights prevents immediate rollback',
      longTerm: 'Civil rights achieved 100 years earlier through gradual progress',
      globalImpact: 'Earlier American civil rights inspire global human rights movements'
    }
  ],
  butterfly: [
    {
      id: 'no-jim-crow',
      trigger: 'Successful Reconstruction prevents segregation system',
      consequence: 'No Jim Crow laws means different American racial history',
      magnitude: 'massive',
      timespan: 150
    },
    {
      id: 'different-politics',
      trigger: 'Republican Party doesn\'t abandon Black voters',
      consequence: 'Different political party evolution and voter coalitions',
      magnitude: 'large',
      timespan: 100
    }
  ],
  presentDayStatus: 'Abraham Lincoln served until 1877, leaving behind a truly reunited nation. His moderate approach to Reconstruction led to genuine racial reconciliation by 1900. The United States became a beacon of racial equality decades earlier, inspiring global civil rights movements. Today, Lincoln\'s birthday is celebrated as "National Reconciliation Day" with barbecues where everyone gets along! 🎂🤝'
};

// Alternative Timeline 2: Peaceful Abolition
const peacefulAbolitionTimeline: Timeline = {
  id: 'peaceful-abolition',
  title: 'Slavery Ends Without War: The Great Compromise! 🕊️⛓️💔',
  description: 'What if slavery had been abolished through gradual compensation rather than civil war? Could America have avoided its bloodiest conflict?',
  divergenceDescription: 'Lincoln proposes and Congress passes gradual, compensated emancipation plan that Southern states reluctantly accept',
  divergenceYear: 1861,
  probability: 15,
  color: '#3B82F6',
  icon: '🕊️',
  image: '/images/chapters/lincoln-era/timeline_2.png',
  keyEvents: [
    {
      id: 'compensation-plan-1861',
      year: 1861,
      month: 3,
      title: 'The Great Buyout: America Purchases Freedom! 💰⛓️',
      description: 'Lincoln proposes paying slaveholders $300 per enslaved person (about $10,000 today) for gradual emancipation over 20 years.',
      impact: 'Prevents immediate secession by offering economic solution to slavery',
      relatedFigures: ['abraham-lincoln'],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'political'
    },
    {
      id: 'border-states-accept-1861',
      year: 1861,
      month: 6,
      title: 'Border States Say Yes! The Dominoes Start Falling! 🎯⬇️',
      description: 'Delaware, Maryland, Kentucky, and Missouri accept compensation plan. Their success encourages other states to consider it.',
      impact: 'Creates momentum for peaceful abolition and isolates Deep South',
      relatedFigures: [],
      location: { lat: 39.045753, lng: -76.641273 },
      type: 'political'
    },
    {
      id: 'economic-incentives-1862',
      year: 1862,
      month: 1,
      title: 'The Sweet Deal: Federal Infrastructure for Freedom! 🚂💎',
      description: 'Federal government offers massive infrastructure investments (railroads, ports, factories) to states that accept emancipation.',
      impact: 'Makes abolition economically attractive rather than threatening',
      relatedFigures: [],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'economic'
    },
    {
      id: 'gradual-freedom-1863',
      year: 1863,
      month: 1,
      title: 'Freedom Day Begins: The First Wave is Free! 🌊✊',
      description: 'First group of enslaved people (children under 18) are legally freed with education and job training provided.',
      impact: 'Demonstrates that freedom can work economically and socially',
      relatedFigures: ['frederick-douglass'],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'social'
    },
    {
      id: 'industrial-transformation-1865',
      year: 1865,
      month: 4,
      title: 'The South Goes Industrial: Cotton Mills Instead of Cotton Fields! 🏭🌱',
      description: 'Federal investment transforms Southern economy from agriculture to manufacturing, employing freed slaves as wage workers.',
      impact: 'Economic transformation makes slavery obsolete rather than just illegal',
      relatedFigures: [],
      location: { lat: 33.76, lng: -84.39 },
      type: 'economic'
    },
    {
      id: 'final-emancipation-1870',
      year: 1870,
      month: 7,
      day: 4,
      title: 'Freedom Complete: The Last Chains Break! ⛓️💥🎆',
      description: 'Final group of enslaved people freed on July 4th, 1870. The entire process completed without a single battle.',
      impact: 'Slavery ends completely through peaceful, compensated abolition',
      relatedFigures: ['abraham-lincoln'],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'social'
    }
  ],
  consequences: [
    {
      id: 'no-civil-war',
      category: 'political',
      shortTerm: '620,000 lives saved by avoiding Civil War',
      longTerm: 'No destruction of Southern infrastructure and economy',
      globalImpact: 'America remains economically stronger, influences global economy more'
    },
    {
      id: 'gradual-integration',
      category: 'social',
      shortTerm: 'Slower but less traumatic integration of freed slaves',
      longTerm: 'Less racial animosity due to compensation rather than conquest',
      globalImpact: 'Different model of abolition influences other slaveholding societies'
    }
  ],
  butterfly: [
    {
      id: 'preserved-union',
      trigger: 'No devastating civil war preserves national unity',
      consequence: 'Stronger America emerges as world power 30 years earlier',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'different-global-abolition',
      trigger: 'Peaceful abolition model available',
      consequence: 'Brazil and other nations adopt compensation rather than forced abolition',
      magnitude: 'large',
      timespan: 50
    }
  ],
  presentDayStatus: 'The peaceful abolition model was completed in 1870, making America a beacon of progressive reform. The compensation fund ($2 billion in 1860s money) was paid off by 1900 through economic growth. Race relations, while not perfect, developed more gradually and peacefully. Today, July 4th is celebrated as both Independence Day and Emancipation Day! 🇺🇸✊'
};

// Alternative Timeline 3: Confederacy Wins
const confederacyWinsTimeline: Timeline = {
  id: 'confederacy-wins',
  title: 'The South Rises: Confederate Victory! 🏴⚡',
  description: 'What if the Confederacy had won independence? How would two American nations have developed side by side?',
  divergenceDescription: 'Lee\'s invasion of Pennsylvania succeeds, European powers recognize the Confederacy, and Lincoln loses the 1864 election',
  divergenceYear: 1863,
  probability: 25,
  color: '#6B7280',
  icon: '🏴',
  image: '/images/chapters/lincoln-era/timeline_3.png',
  keyEvents: [
    {
      id: 'gettysburg-confederate-victory-1863',
      year: 1863,
      month: 7,
      day: 3,
      title: 'Lee Wins at Gettysburg: The Tide Turns South! ⚔️🏆',
      description: 'A tactical change allows Lee to defeat the Union army at Gettysburg, opening the path to Washington D.C.',
      impact: 'Confederate victory changes Northern morale and European perception',
      relatedFigures: ['robert-e-lee'],
      location: { lat: 39.8309, lng: -77.2361 },
      type: 'military'
    },
    {
      id: 'european-recognition-1863',
      year: 1863,
      month: 9,
      title: 'Europe Says "Welcome to the Club!" 🌍🤝',
      description: 'Britain and France officially recognize Confederate independence and begin supplying advanced weapons and naval support.',
      impact: 'International support makes Confederate victory more likely',
      relatedFigures: ['jefferson-davis'],
      location: { lat: 51.5074, lng: -0.1278 },
      type: 'political'
    },
    {
      id: 'washington-threatened-1863',
      year: 1863,
      month: 10,
      title: 'Lee Knocks on Washington\'s Door! 🚪👋',
      description: 'Confederate forces advance to within sight of Washington D.C., forcing Lincoln to consider peace negotiations.',
      impact: 'Military pressure creates political crisis in the North',
      relatedFigures: ['robert-e-lee', 'abraham-lincoln'],
      location: { lat: 38.9072, lng: -77.0369 },
      type: 'military'
    },
    {
      id: 'peace-of-philadelphia-1864',
      year: 1864,
      month: 7,
      day: 4,
      title: 'The Peace of Philadelphia: America Splits in Two! ✂️🇺🇸',
      description: 'After Lincoln loses the 1864 election, President McClellan signs peace treaty recognizing Confederate independence.',
      impact: 'Creates two separate American nations with different economic and social systems',
      relatedFigures: ['jefferson-davis'],
      location: { lat: 39.9526, lng: -75.1652 },
      type: 'political'
    },
    {
      id: 'slavery-expansion-1865',
      year: 1865,
      month: 1,
      title: 'The Confederacy Looks South: Manifest Destiny Returns! 🌎⬇️',
      description: 'Independent Confederacy begins expanding into the Caribbean and Central America, creating a slave-based empire.',
      impact: 'Slavery expands geographically rather than being abolished',
      relatedFigures: ['jefferson-davis'],
      location: { lat: 23.1136, lng: -82.3666 },
      type: 'political'
    },
    {
      id: 'economic-competition-1870',
      year: 1870,
      month: 1,
      title: 'The Two Americas: Industrial North vs. Agricultural South! 🏭🌾',
      description: 'Clear economic division emerges: industrial United States vs. agricultural Confederate States.',
      impact: 'Different economic systems create ongoing tension and competition',
      relatedFigures: [],
      location: { lat: 39.8283, lng: -98.5795 },
      type: 'economic'
    }
  ],
  consequences: [
    {
      id: 'divided-america',
      category: 'political',
      shortTerm: 'Two American nations with fundamentally different values',
      longTerm: 'Ongoing tension and border disputes between USA and CSA',
      globalImpact: 'Weakened American influence allows European powers to remain dominant longer'
    },
    {
      id: 'slavery-continues',
      category: 'social',
      shortTerm: 'Slavery continues and expands in Confederate territory',
      longTerm: 'Human rights development delayed by 50+ years',
      globalImpact: 'Successful Confederacy encourages other slavery-dependent regions'
    }
  ],
  butterfly: [
    {
      id: 'delayed-world-power',
      trigger: 'Divided America is weaker internationally',
      consequence: 'European powers remain dominant, different world war outcomes',
      magnitude: 'massive',
      timespan: 100
    },
    {
      id: 'different-immigration',
      trigger: 'Two competing American destinations',
      consequence: 'Immigration patterns split between free North and slave South',
      magnitude: 'large',
      timespan: 75
    }
  ],
  presentDayStatus: 'The Confederate States eventually abolished slavery in 1920 due to economic pressure and international isolation. The two American nations reunified in 1945 after fighting together in World War II. Today, the period of division is remembered as "The Awkward Years" when family reunions were really complicated! 🤔👨‍👩‍👧‍👦'
};

// Interactive scenarios for immersive storytelling
const interactiveScenarios: InteractiveScenario[] = [
  {
    id: 'election-1860',
    title: 'The Election That Broke America',
    text: 'November 1860. You are Abraham Lincoln, having just won the presidency without receiving a single vote in 10 Southern states. Reports flood in that South Carolina is already talking secession. The nation teeters on the edge of dissolution. How do you respond to this constitutional crisis?',
    emoji: '🗳️',
    background: 'bg-linear-to-br from-blue-800 to-gray-700',
    characters: ['👨‍🎩', '📜', '⚖️'],
    sceneType: 'decision' as const,
    timelineYear: 1860,
    timelineEvent: 'Lincoln wins presidency, triggering secession crisis',
    choices: [
      {
        id: 'conciliatory-approach',
        text: 'Issue conciliatory statements promising to protect Southern interests',
        consequence: 'Your moderate tone slows secession but emboldens radicals who see weakness'
      },
      {
        id: 'firm-union-stance',
        text: 'Declare that the Union is perpetual and secession is illegal',
        consequence: 'Your firmness rallies Northern support but accelerates Southern departure'
      },
      {
        id: 'constitutional-convention',
        text: 'Call for a constitutional convention to address Southern concerns',
        consequence: 'Your proposal shows flexibility but creates dangerous precedent for constitutional changes'
      }
    ]
  },
  {
    id: 'fort-sumter-decision',
    title: 'The Moment of Truth',
    text: 'April 1861. Fort Sumter in Charleston Harbor is running out of supplies. Confederate forces surround it, demanding surrender. You face the ultimate decision: resupply and risk war, or abandon the fort and appear weak. The fate of the Union hangs in the balance.',
    emoji: '🏰',
    background: 'bg-linear-to-br from-red-600 to-orange-800',
    characters: ['⚔️', '🚢', '💥'],
    sceneType: 'battle' as const,
    timelineYear: 1861,
    timelineEvent: 'Fort Sumter crisis - first shots of Civil War',
    choices: [
      {
        id: 'resupply-mission',
        text: 'Send supply ships to Fort Sumter, risking Confederate attack',
        consequence: 'Your decision forces the South to fire first, rallying Northern support for war'
      },
      {
        id: 'negotiate-withdrawal',
        text: 'Negotiate a face-saving withdrawal from the fort',
        consequence: 'Your compromise prevents immediate war but legitimizes secession'
      },
      {
        id: 'reinforce-garrison',
        text: 'Send additional troops to reinforce the fort',
        consequence: 'Your aggressive move is seen as Northern aggression, losing moral high ground'
      }
    ]
  },
  {
    id: 'emancipation-decision',
    title: 'The Great Moral Choice',
    text: 'September 1862. After the Battle of Antietam, you have the political capital to issue the Emancipation Proclamation. Your Cabinet is divided - some call it military necessity, others fear it will alienate border states. This decision will redefine the war itself.',
    emoji: '⛓️',
    background: 'bg-linear-to-br from-purple-800 to-blue-900',
    characters: ['📜', '✊', '🕊️'],
    sceneType: 'revelation' as const,
    timelineYear: 1862,
    timelineEvent: 'Emancipation Proclamation decision point',
    choices: [
      {
        id: 'full-emancipation',
        text: 'Declare all slaves in rebellious states to be free',
        consequence: 'Your bold moral stance transforms the war but risks losing border state support'
      },
      {
        id: 'gradual-emancipation',
        text: 'Propose gradual, compensated emancipation over several years',
        consequence: 'Your moderate approach maintains unity but disappoints abolitionists'
      },
      {
        id: 'military-emancipation',
        text: 'Free only slaves who join the Union army',
        consequence: 'Your pragmatic choice gains soldiers while limiting political risk'
      }
    ]
  },
  {
    id: 'gettysburg-aftermath',
    title: 'Words That Echo Through Time',
    text: 'November 1863. You stand at Gettysburg Cemetery, tasked with dedicating the battlefield where so many died. The main speaker has droned on for two hours. Now it\'s your turn. In just a few minutes, you must somehow make sense of this carnage and inspire a war-weary nation.',
    emoji: '🎤',
    background: 'bg-linear-to-br from-gray-700 to-blue-800',
    characters: ['⚰️', '🇺🇸', '✨'],
    sceneType: 'revelation' as const,
    timelineYear: 1863,
    timelineEvent: 'Gettysburg Address delivered',
    choices: [
      {
        id: 'brief-consecration',
        text: 'Deliver a brief, spiritual consecration of the battlefield',
        consequence: 'Your concise words become immortal, redefining American democracy itself'
      },
      {
        id: 'detailed-history',
        text: 'Give a detailed account of the battle and its significance',
        consequence: 'Your comprehensive speech informs but lacks the poetic power of brevity'
      },
      {
        id: 'political-rallying',
        text: 'Use the moment for political rallying and war justification',
        consequence: 'Your partisan message energizes supporters but divides the audience'
      }
    ]
  },
  {
    id: 'election-1864',
    title: 'Democracy in Wartime',
    text: 'November 1864. The war drags on with no end in sight. General McClellan runs against you on a peace platform, promising to negotiate with the Confederacy. Many question whether elections should even be held during wartime. Your decisions here will define American democracy.',
    emoji: '🗳️',
    background: 'bg-linear-to-br from-green-700 to-blue-800',
    characters: ['🎩', '🕊️', '⚔️'],
    sceneType: 'negotiation' as const,
    timelineYear: 1864,
    timelineEvent: '1864 Presidential Election during ongoing war',
    choices: [
      {
        id: 'continue-elections',
        text: 'Insist that elections must proceed as scheduled, war or no war',
        consequence: 'Your commitment to democracy inspires the world but risks losing power'
      },
      {
        id: 'postpone-elections',
        text: 'Propose postponing elections until the war ends',
        consequence: 'Your practical decision maintains stability but sets dangerous precedent'
      },
      {
        id: 'military-voting',
        text: 'Ensure soldiers can vote from the battlefield',
        consequence: 'Your innovation strengthens democracy and secures military support'
      }
    ]
  },
  {
    id: 'surrender-terms',
    title: 'Victory with Honor',
    text: 'April 1865. Lee has surrendered at Appomattox. The war is essentially over, but how you treat the defeated Confederacy will shape America\'s future. Grant wants generous terms, while many in Congress demand harsh punishment. Your choice will define Reconstruction.',
    emoji: '🏳️',
    background: 'bg-linear-to-br from-white to-blue-600',
    characters: ['🤝', '⚖️', '🕊️'],
    sceneType: 'negotiation' as const,
    timelineYear: 1865,
    timelineEvent: 'Lee\'s surrender and Reconstruction planning',
    choices: [
      {
        id: 'malice-toward-none',
        text: 'Pursue "malice toward none, charity for all" reconciliation',
        consequence: 'Your generous approach promotes healing but may not protect freed slaves adequately'
      },
      {
        id: 'justice-first',
        text: 'Demand accountability for treason and protection for freed slaves',
        consequence: 'Your firm stance ensures justice but may deepen sectional resentment'
      },
      {
        id: 'economic-reconstruction',
        text: 'Focus on economic rebuilding and infrastructure investment',
        consequence: 'Your pragmatic approach rebuilds quickly but avoids deeper social issues'
      }
    ]
  },
  {
    id: 'theater-night',
    title: 'A Night at the Theater',
    text: 'April 14, 1865. Mary insists on attending "Our American Cousin" at Ford\'s Theatre to celebrate the war\'s end. Your bodyguard is unreliable, and there have been threats. You\'re exhausted and want to stay home, but the people need to see their president in public.',
    emoji: '🎭',
    background: 'bg-linear-to-br from-red-800 to-black',
    characters: ['🎪', '👥', '⚠️'],
    sceneType: 'decision' as const,
    timelineYear: 1865,
    timelineEvent: 'The night of Lincoln\'s assassination',
    choices: [
      {
        id: 'attend-theater',
        text: 'Attend the play to show normalcy and celebrate with the people',
        consequence: 'Your public appearance demonstrates leadership but exposes you to danger'
      },
      {
        id: 'stay-home',
        text: 'Stay home and work on Reconstruction plans instead',
        consequence: 'Your caution preserves your safety but disappoints the public'
      },
      {
        id: 'increase-security',
        text: 'Attend but insist on heavy security presence',
        consequence: 'Your precautions provide safety but create distance from the people'
      }
    ]
  },
  {
    id: 'reconstruction-vision',
    title: 'Binding Up the Nation\'s Wounds',
    text: 'April 1865. With the war ending, you must design Reconstruction policy. Four million newly freed slaves need protection and opportunity. The South lies in ruins. Congress wants revenge while you preach reconciliation. Your plan will shape America for generations.',
    emoji: '🔨',
    background: 'bg-linear-to-br from-yellow-600 to-green-700',
    characters: ['🏗️', '✊', '🤝'],
    sceneType: 'exploration' as const,
    timelineYear: 1865,
    timelineEvent: 'Reconstruction planning and implementation',
    choices: [
      {
        id: 'federal-protection',
        text: 'Establish strong federal oversight to protect freed slaves\' rights',
        consequence: 'Your intervention ensures civil rights but creates lasting federal-state tensions'
      },
      {
        id: 'state-restoration',
        text: 'Quickly restore Southern states with minimal conditions',
        consequence: 'Your mercy speeds reunification but may abandon freed slaves to oppression'
      },
      {
        id: 'gradual-integration',
        text: 'Implement gradual integration with education and economic support',
        consequence: 'Your patient approach builds lasting change but may be too slow for justice'
      }
    ]
  }
];

// Main chapter data
export const lincolnEraChapter: Chapter = {
  id: 'lincoln-era',
  title: 'Lincoln Era & Civil War',
  period: '1860s',
  startYear: 1850,
  endYear: 1877,
  description: 'The Great American Drama: A house divided against itself cannot stand! 🏠💔 Follow the incredible journey of a rail-splitter who became the Great Emancipator, saving the Union and freeing four million enslaved people. It\'s got everything: political intrigue, moral courage, epic battles, and the most famous beard in American history! 🎩⚔️',
  historicalContext: 'By 1860, America was like a marriage on the rocks - two fundamentally different societies trying to share one house. 🏠💥 The North was becoming industrial and urban while the South remained agricultural and dependent on enslaved labor. When Lincoln won the presidency without getting a single Southern vote, it was the last straw. What followed was four years of the bloodiest conflict in American history, a moral reckoning with slavery, and the transformation of the United States from a loose confederation into a true nation. It was messy, tragic, and ultimately transformative - like all the best American stories! 🇺🇸💫',
  keyFigures,
  divergencePoint: 'Lincoln\'s Election and the Secession Crisis',
  divergenceYear: 1860,
  alternativeTimelines: [
    lincolnSurvivesTimeline,
    peacefulAbolitionTimeline,
    confederacyWinsTimeline,
    // Additional timelines can be added here...
  ],
  interactiveScenarios,
  mainImage: '/images/chapters/lincoln-era/main.png',
  icon: '🎩',
  backgroundColor: 'from-blue-800 to-gray-600'
};