/* Lincoln and the Civil War interactive episode: Springfield 1860 → eight realities. */
import type { BattleConfig, ExperienceScript, ExploreBeat, ChoiceBeat } from '../types';

const UNION = { side: 'player' as const, color: '#2b4a9a', accentColor: '#d9dde6' };
const CONFEDERATE = { side: 'enemy' as const, color: '#8f9296', accentColor: '#b8202c' };

/**
 * Antietam, 17 September 1862. McClellan has Lee's lost battle plan and twice his
 * numbers, and attacks one corps at a time. Lincoln needs a victory before he can
 * announce emancipation without it sounding like a cry of despair.
 */
const antietam: BattleConfig = {
    id: 'antietam',
    name: 'The Battle of Antietam',
    era: 'musket',
    theme: 'colonial',
    objective:
        '17 September 1862, Sharpsburg, Maryland. Lee has invaded the North with 38,000 men. You have 87,000 and a copy of his battle orders, found wrapped around three cigars. Drive him back across the Potomac before he can be reinforced.',
    player: { ...UNION, name: 'Army of the Potomac', infantry: 135, cavalry: 20, archers: 30, attack: 0.95, defense: 0.95 },
    enemy: { ...CONFEDERATE, name: 'Army of Northern Virginia', infantry: 95, cavalry: 25, archers: 25, attack: 1.15, defense: 1.3 },
    onVictory: 'emancipation-choice',
    onDefeat: 'antietam-lost',
    events: [
        {
            id: 'cornfield',
            atTime: 10,
            title: 'The Cornfield',
            prompt: 'Dawn. Hooker\'s corps sees bayonets glinting above the corn: Confederates are waiting in Miller\'s field.',
            options: [
                {
                    id: 'artillery-corn',
                    label: 'Rake the Corn with Artillery',
                    icon: '💥',
                    description: 'Every gun on the ridge fires canister into the field. Hooker later wrote that the stalks were cut as closely as a knife could have done it.',
                    effects: { strength: 4 },
                    mod: { catapultBarrage: 14 },
                },
                {
                    id: 'charge-corn',
                    label: 'Charge Through the Corn',
                    icon: '🗡️',
                    description: 'Go in with the bayonet before the defenders can reload. The field will change hands fifteen times today.',
                    effects: { chaos: 4 },
                    mod: { attackMult: 1.2, moraleShift: -0.06 },
                },
            ],
        },
        {
            id: 'reserve',
            atTime: 32,
            title: 'The Sunken Road Breaks',
            prompt: 'Lee\'s centre is shattered. Bodies fill the Sunken Road, and Fitz John Porter\'s 12,000 men stand fresh in reserve.',
            options: [
                {
                    id: 'commit-reserve',
                    label: 'Send In the Reserve',
                    icon: '🚩',
                    description: 'McClellan in our history refused. One push now could destroy Lee\'s army and end the war years early.',
                    effects: { strength: 5, chaos: 2 },
                    mod: { attackMult: 1.15, flankCavalry: 14 },
                },
                {
                    id: 'hold-reserve',
                    label: 'Keep the Reserve Back',
                    icon: '🛡',
                    description: '"Remember, General, I command the last reserve of the last army of the Republic." Play it safe.',
                    mod: { defenseMult: 1.25 },
                },
            ],
        },
        {
            id: 'ap-hill',
            whenMoraleBelow: { side: 'player', value: 0.5 },
            title: 'A. P. Hill Arrives',
            prompt: 'Dust on the Harpers Ferry road. Seventeen miles at the double, Confederate reinforcements crash into your left flank.',
            options: [
                {
                    id: 'burnside-bridge',
                    label: 'Hold Burnside\'s Bridge',
                    icon: '🌉',
                    description: 'Pull the left back across the stone bridge and make them come to you.',
                    mod: { defenseMult: 1.35 },
                },
                {
                    id: 'rally-colours',
                    label: 'Rally on the Colours',
                    icon: '🇺🇸',
                    description: 'The colour sergeants stand up under fire, and the regiments re-form around them.',
                    effects: { strength: 3 },
                    mod: { moraleShift: 0.3, attackMult: 1.08 },
                },
            ],
        },
    ],
};

/**
 * Gettysburg, 3 July 1863. Pickett's Charge. Whether you hold the ridge or attack
 * first, and whether 180,000 freedmen are on their way to your army, change the odds.
 */
function gettysburg(stance: 'hold' | 'attack', freed: boolean): BattleConfig {
    const hold = stance === 'hold';
    // the Proclamation opened the army to Black regiments and kept Europe out
    const extra = freed ? 15 : 0;
    return {
        id: 'gettysburg',
        name: hold ? 'Pickett\'s Charge' : 'The Attack on Seminary Ridge',
        era: 'musket',
        theme: 'colonial',
        objective: hold
            ? '3 July 1863, one o\'clock. A hundred and fifty Confederate guns have pounded Cemetery Ridge for two hours. Now 12,500 men step out of the trees a mile away and walk toward your stone wall. Hold it.'
            : '3 July 1863. Rather than wait to be attacked, you send the Army of the Potomac across the open fields toward Lee\'s guns on Seminary Ridge. Win, and his army is finished. Lose, and the road to Washington is open.',
        player: hold
            ? { ...UNION, name: 'Army of the Potomac', infantry: 105 + extra, cavalry: 15, archers: 35, attack: 1.0, defense: 1.25 }
            : { ...UNION, name: 'Army of the Potomac', infantry: 125 + extra, cavalry: 25, archers: 25, attack: 1.0, defense: 1.0 },
        enemy: hold
            ? { ...CONFEDERATE, name: 'Pickett, Pettigrew and Trimble', infantry: 135, cavalry: 15, archers: 30, attack: 1.15, defense: 1.0 }
            : { ...CONFEDERATE, name: 'Army of Northern Virginia', infantry: 115, cavalry: 20, archers: 35, attack: 1.05, defense: 1.45 },
        onVictory: 'fords-intro',
        onDefeat: 'gettysburg-lost',
        events: [
            {
                id: 'cannonade',
                atTime: 8,
                title: hold ? 'The Great Cannonade' : 'Lee\'s Guns Open Fire',
                prompt: hold
                    ? 'Shells are bursting all along the ridge. Your gunners are almost out of long-range ammunition.'
                    : 'Confederate batteries on Seminary Ridge open on your columns as they cross the Emmitsburg Road.',
                options: hold
                    ? [
                          {
                              id: 'cease-fire',
                              label: 'Cease Fire and Save Canister',
                              icon: '🤫',
                              description: 'Make Lee think your guns are destroyed. When his infantry is close, open with everything you saved.',
                              effects: { strength: 4 },
                              mod: { catapultBarrage: 16, defenseMult: 1.05 },
                          },
                          {
                              id: 'duel',
                              label: 'Duel Their Batteries',
                              icon: '💥',
                              description: 'Answer gun for gun and keep the men\'s spirits up, even if it empties the caissons.',
                              mod: { attackMult: 1.08, moraleShift: 0.08 },
                          },
                      ]
                    : [
                          {
                              id: 'double-quick',
                              label: 'Double-Quick Across the Field',
                              icon: '🏃',
                              description: 'Less time under the guns, more men out of breath when they reach the ridge.',
                              effects: { chaos: 3 },
                              mod: { attackMult: 1.15, moraleShift: -0.05 },
                          },
                          {
                              id: 'counter-battery',
                              label: 'Bring Up the Guns First',
                              icon: '💥',
                              description: 'Silence the Confederate artillery before the infantry goes in.',
                              effects: { strength: 3 },
                              mod: { catapultBarrage: 14 },
                          },
                      ],
            },
            {
                id: 'the-angle',
                atTime: 30,
                title: hold ? 'The Angle' : 'Into the Trees',
                prompt: hold
                    ? 'General Armistead, his hat on the point of his sword, leads a few hundred Virginians over the wall at the Angle.'
                    : 'Your first lines reach the treeline on Seminary Ridge. Longstreet\'s veterans are waiting behind breastworks.',
                options: [
                    {
                        id: 'plug-gap',
                        label: hold ? 'Plug the Gap' : 'Push Through',
                        icon: '🗡️',
                        description: hold
                            ? 'Webb\'s Philadelphians and every regiment within reach rush to the copse of trees.'
                            : 'Keep going and give them no time to re-form.',
                        effects: { strength: 3 },
                        mod: { attackMult: 1.15 },
                    },
                    {
                        id: 'flank-fire',
                        label: 'Hit Them in the Flank',
                        icon: '🐎',
                        description: hold
                            ? 'The Vermont brigade swings out from the line and fires into the side of the charge.'
                            : 'Send cavalry around the end of their line, the way Custer tried on the East Cavalry Field.',
                        mod: { flankCavalry: 20 },
                    },
                ],
            },
            {
                id: 'line-wavers',
                whenMoraleBelow: { side: 'player', value: 0.5 },
                title: 'The Line Wavers',
                prompt: 'Men are falling back from the front. If this part of the line breaks, the whole army is cut in two.',
                options: [
                    {
                        id: 'hancock',
                        label: 'Hancock Rides the Line',
                        icon: '🎖',
                        description: '"There are times when a corps commander\'s life does not count." He stays in the saddle with a bullet in his thigh.',
                        effects: { strength: 3 },
                        mod: { moraleShift: 0.32, attackMult: 1.08 },
                    },
                    {
                        id: 'reserves-up',
                        label: 'Call Up the Reserves',
                        icon: '🛡',
                        description: 'Meade\'s interior lines are short. Move fresh brigades to the threatened point.',
                        mod: { defenseMult: 1.3 },
                    },
                ],
            },
        ],
    };
}

function gettysburgExplore(freed: boolean): ExploreBeat {
    const id = freed ? 'explore-gettysburg' : 'explore-gettysburg-delayed';
    return {
        kind: 'explore',
        id,
        environment: 'gettysburg',
        cast: [{ id: 'lee', position: [0, 0, -84], facing: 0, pose: 'think' }],
        prompt: 'Explore the battlefield: drag to look around and click the glowing markers. Then choose how to fight.',
        camera: { position: [70, 44, 140], target: [0, 4, -10] },
        hotspots: [
            {
                id: 'round-top',
                position: [120, 26, 50],
                label: 'Little Round Top',
                icon: '⛰',
                title: 'The Hill That Saved the Army',
                description:
                    'Yesterday, Colonel Joshua Chamberlain\'s 20th Maine held the far left of the line here until its ammunition ran out, then charged downhill with bayonets. If this hill had fallen, Confederate guns could have fired down the whole length of your army.',
                effects: { strength: 3 },
            },
            {
                id: 'copse',
                position: [12, 15, 66],
                label: 'The Copse of Trees',
                icon: '🌳',
                title: 'Lee\'s Aiming Point',
                description:
                    'A small clump of trees in the middle of your line, easy to see from a mile away. Lee has chosen it as the target for his attack. Behind the low stone wall in front of it wait about 5,000 men of Hancock\'s Second Corps.',
            },
            {
                id: 'seminary',
                position: [-20, 9, -110],
                label: 'Seminary Ridge',
                icon: '🎯',
                title: 'Across the Valley',
                description:
                    'Lee\'s army waits in the trees a mile away. It has beaten every Union general sent against it in Virginia. Longstreet has begged him not to attack across this open ground. Lee has said: "The enemy is there, and I am going to strike him."',
                effects: { chaos: 2 },
            },
            freed
                ? {
                      id: 'usct',
                      position: [-60, 6, 70],
                      label: 'New Regiments',
                      icon: '📜',
                      title: 'The United States Colored Troops',
                      description:
                          'Since the Proclamation, Black men can serve in the Union army, and recruiting offices are opening across the North and in the occupied South. By 1865, about 180,000 will enlist. Frederick Douglass\'s own sons, Charles and Lewis, are among the first.',
                      effects: { freedom: 4 },
                  }
                : {
                      id: 'london',
                      position: [-60, 6, 70],
                      label: 'News from London',
                      icon: '📰',
                      title: 'Europe Is Watching',
                      description:
                          'Without the Proclamation, British newspapers call this a war about tariffs and union, not slavery. The cabinet in London is discussing whether to offer mediation, which would mean recognising the Confederacy.',
                      effects: { diplomacy: -3 },
                  },
            {
                id: 'ridge',
                position: [-34, 4, 52],
                label: 'The Stone Wall',
                icon: '🧱',
                title: 'Meade\'s Decision',
                description:
                    'General Meade has had the command for six days. His generals voted last night to stay and fight. Now he has to decide how.',
                advancesTo: freed ? 'gettysburg-choice' : 'gettysburg-choice-delayed',
            },
        ],
    };
}

function gettysburgChoice(freed: boolean): ChoiceBeat {
    const sfx = freed ? '' : '-delayed';
    return {
        kind: 'choice',
        id: `gettysburg-choice${sfx}`,
        environment: 'gettysburg',
        cast: [{ id: 'lee', position: [12, 0, 30], facing: 0.4, pose: 'command' }],
        title: 'Cemetery Ridge · 3 July 1863',
        prompt: 'Two days of fighting, tens of thousands of men killed, wounded or missing. Lee is gathering for one more blow. How do you meet it?',
        camera: { position: [28, 7, 62], target: [0, 5, -4] },
        options: [
            {
                id: 'hold-ridge',
                label: 'Hold the High Ground',
                icon: '🛡',
                description: 'Stay behind the wall and let Lee come across a mile of open fields under your guns.',
                effects: { strength: 6 },
                flags: ['held-ridge'],
                next: `gettysburg-hold${sfx}`,
            },
            {
                id: 'attack-first',
                label: 'Strike Before He Does',
                icon: '⚔️',
                description: 'Lee\'s army is tired and far from home. Attack it in its own positions and end this today.',
                effects: { strength: 4, chaos: 5 },
                flags: ['attacked-first'],
                next: `gettysburg-attack${sfx}`,
            },
        ],
    };
}

export const lincolnEraScript: ExperienceScript = {
    chapterId: 'lincoln-era',
    title: 'A House Divided',
    era: 'Springfield · 1860',
    startBeat: 'intro',
    initialStats: { chaos: 40, freedom: 25, diplomacy: 35, strength: 35 },
    defaultEnding: 'union-restored',

    characters: {
        lincoln: {
            id: 'lincoln', name: 'Abraham Lincoln', role: '16th President of the United States',
            face: '/images/chapters/lincoln-era/faces/abraham-lincoln.webp',
            outfit: 'stovepipe', skin: '#cf9162', hair: '#1e1814', robe: '#18181b', accent: '#3a3a40', breeches: '#1c1c20',
        },
        douglass: {
            id: 'douglass', name: 'Frederick Douglass', role: 'Abolitionist, writer and orator',
            face: '/images/chapters/lincoln-era/faces/frederick-douglass.webp',
            outfit: 'frock-coat', skin: '#7b4b33', hair: '#d8d4cc', robe: '#22252c', accent: '#4a4f5a', breeches: '#2a2a2e',
        },
        grant: {
            id: 'grant', name: 'Ulysses S. Grant', role: 'General-in-Chief of the Union Army',
            face: '/images/chapters/lincoln-era/faces/ulysses-s-grant.webp',
            outfit: 'civil-war-general', skin: '#d9a27f', hair: '#5a3a22', hat: '#18181a', robe: '#1f2e5a', accent: '#c8a24a', breeches: '#3a4a6e',
        },
        lee: {
            id: 'lee', name: 'Robert E. Lee', role: 'General, Army of Northern Virginia',
            face: '/images/chapters/lincoln-era/faces/robert-e-lee.webp',
            outfit: 'civil-war-general', skin: '#e2b596', hair: '#e9e6df', hat: '#9a9688', robe: '#7d8186', accent: '#c8a24a', breeches: '#5f6266',
        },
    },

    beats: {
        // ── ACT I: Springfield, election night 1860 ───────────────────────
        intro: {
            kind: 'cinematic',
            id: 'intro',
            environment: 'springfield',
            next: 'explore-springfield',
            shots: [
                { path: [[140, 70, 150], [50, 30, 70]], lookPath: [[0, 10, -60]], duration: 7 },
                { path: [[50, 30, 70], [10, 9, 34], [-8, 6, 18]], lookPath: [[0, 6, 0], [-26, 5, -8]], duration: 8 },
                { path: [[-8, 6, 18], [8, 14, -20], [6, 20, -44]], lookPath: [[0, 16, -78]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Springfield, Illinois, the night of 6 November 1860. A tall, plain-spoken lawyer is waiting in the telegraph office for the election results. He has not made a single campaign speech. That is the custom.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Four million people are enslaved in the United States, worth more in dollars than every railway and factory in the country combined. The Republican Party has promised to stop slavery spreading to the new western territories.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Southern leaders have promised that if Abraham Lincoln wins, their states will leave the Union. He was not even on the ballot in ten of them.', hold: 3.6 },
                { speaker: 'The Chronicle', text: 'In our history, his victory led to a war that killed about 750,000 Americans and ended slavery. In this one, you decide.', hold: 3.5 },
            ],
        },

        'explore-springfield': {
            kind: 'explore',
            id: 'explore-springfield',
            environment: 'springfield',
            cast: [{ id: 'lincoln', position: [-6, 0, 12], facing: 0.4, pose: 'think' }],
            prompt: 'Explore Springfield: drag to look around and click the glowing markers. The returns are coming in.',
            camera: { position: [46, 30, 70], target: [0, 6, -14] },
            hotspots: [
                {
                    id: 'home',
                    position: [-26, 12, -8],
                    label: 'The Lincoln Home',
                    icon: '🏠',
                    title: 'Eighth and Jackson',
                    description:
                        'The only house Lincoln ever owned. He bought it in 1844 for $1,200 and a small lot. Mary Lincoln had a second storey added. Their son Eddie died here at the age of three.',
                    effects: { diplomacy: 2 },
                },
                {
                    id: 'telegraph',
                    position: [14, 9, -10],
                    label: 'The Telegraph',
                    icon: '⚡',
                    title: 'Wires from New York',
                    description:
                        'Results arrive by telegraph, state by state. Late tonight, the news from New York will decide it: Lincoln will win the Electoral College with less than 40 percent of the popular vote.',
                    effects: { strength: 2 },
                },
                {
                    id: 'capitol',
                    position: [0, 22, -78],
                    label: 'The State House',
                    icon: '🏛',
                    title: '"A House Divided"',
                    description:
                        'In this building in 1858, Lincoln told the Republican convention: "A house divided against itself cannot stand. I believe this government cannot endure, permanently half slave and half free." Southern newspapers have quoted it ever since as proof that he means to abolish slavery everywhere.',
                    effects: { freedom: 3 },
                },
                {
                    id: 'train',
                    position: [30, 6, 62],
                    label: 'The Railroad',
                    icon: '🚂',
                    title: 'The North\'s Advantage',
                    description:
                        'The free states have more than twice the South\'s railway mileage, and nine-tenths of the factories. The South has cotton, which Britain and France need for their mills. Each side thinks that is enough.',
                },
                {
                    id: 'decide',
                    position: [-6, 9, 12],
                    label: 'The President-Elect',
                    icon: '🎩',
                    title: 'After Midnight',
                    description:
                        'The crowd outside is singing. Lincoln walks home to tell Mary, "We are elected." Within seven weeks, South Carolina will vote to leave the Union.',
                    advancesTo: 'election-choice',
                },
            ],
        },

        'election-choice': {
            kind: 'choice',
            id: 'election-choice',
            environment: 'springfield',
            cast: [{ id: 'lincoln', position: [-6, 0, 12], facing: 0.25, pose: 'think' }],
            title: 'The Secession Winter · 1860–61',
            prompt: 'Seven states are leaving the Union. Senators in Washington are drafting a compromise that would protect slavery forever. What do you tell them?',
            camera: { position: [6, 6, 34], target: [-6, 5, 2] },
            options: [
                {
                    id: 'hold-firm',
                    label: 'No Slavery in the Territories',
                    icon: '🛡',
                    description: '"Hold firm, as with a chain of steel." You will not break the promise you were elected on, whatever the South does.',
                    effects: { strength: 10, freedom: 6 },
                    flags: ['hold-firm'],
                    next: 'inauguration',
                },
                {
                    id: 'buyout-plan',
                    label: 'Offer to Buy Freedom',
                    icon: '💰',
                    description: 'Propose that the federal government pay owners to free the enslaved, as Britain did in 1833. Expensive, but cheaper than a war.',
                    effects: { diplomacy: 12, chaos: -6 },
                    flags: ['buyout'],
                    next: 'buyout-choice',
                },
            ],
        },

        // ── The compensated emancipation branch ───────────────────────────
        'buyout-choice': {
            kind: 'choice',
            id: 'buyout-choice',
            environment: 'washington-1861',
            cast: [
                { id: 'lincoln', position: [-4, 0, -44], facing: 0, pose: 'think' },
                { id: 'douglass', position: [4.5, 0, -44], facing: -0.15, pose: 'command' },
            ],
            title: 'Washington · Spring 1861',
            prompt: 'At roughly $400 a person, freedom for four million people would cost about $1.6 billion, more than the federal government spends in twenty years. How do you make the offer?',
            camera: { position: [0, 5, -20], target: [0, 7, -62] },
            options: [
                {
                    id: 'gradual',
                    label: 'Gradual, with Border States First',
                    icon: '🕰',
                    description: 'Start with Delaware, Maryland, Kentucky and Missouri. Pay in thirty-year bonds and free everyone by 1890. Douglass calls it far too slow.',
                    effects: { diplomacy: 10, freedom: -4 },
                    flags: ['gradual-buyout'],
                    next: 'buyout-success',
                },
                {
                    id: 'immediate',
                    label: 'Immediate, for Every State',
                    icon: '⚡',
                    description: 'Freedom now, paid in bonds. Douglass agrees: "No man can be half free." Southern leaders may see it as abolition by another name.',
                    effects: { freedom: 10, chaos: 8 },
                    flags: ['immediate-buyout'],
                    next: 'buyout-refused',
                },
            ],
        },

        'buyout-success': {
            kind: 'cinematic',
            id: 'buyout-success',
            environment: 'washington-1861',
            next: 'ending',
            cast: [
                { id: 'lincoln', position: [-4, 0, -44], facing: 0.1, pose: 'command' },
                { id: 'douglass', position: [4.5, 0, -44], facing: -0.15, pose: 'think' },
            ],
            shots: [
                { path: [[0, 5, -16], [10, 8, -30]], lookPath: [[0, 6, -46]], duration: 7 },
                { path: [[10, 8, -30], [0, 40, 40]], lookPath: [[0, 20, -100]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Delaware accepts first, then Maryland. Kentucky haggles for a year. In the Deep South the offer is denounced, then debated, then quietly copied by planters who see the cotton price falling.', hold: 4 },
                { speaker: 'The Chronicle', text: 'The seceded states drift back one by one through the 1860s, each with its own deal. Fort Sumter is never fired upon.', hold: 3.5 },
                { speaker: 'Frederick Douglass', text: 'I will not pretend I am grateful that my people were bought like cattle a second time. But they are free, and they are alive.', hold: 3.8 },
            ],
        },

        'buyout-refused': {
            kind: 'cinematic',
            id: 'buyout-refused',
            environment: 'washington-1861',
            next: 'sumter-intro',
            cast: [{ id: 'lincoln', position: [-2, 0, -44], facing: 0, pose: 'think' }],
            shots: [
                { path: [[0, 4, -18], [-6, 6, -28]], lookPath: [[-2, 5, -44]], duration: 7 },
                { path: [[-6, 6, -28], [0, 30, 10]], lookPath: [[0, 20, -100]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Confederate Congress in Montgomery rejects the offer unanimously. "The North would buy our slaves only to tax us into ruin afterwards," says one delegate.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'You have shown the world that the Union tried peace first. Now the question is a small brick fort in Charleston harbour, and the eighty-five men inside it who are running out of food.', hold: 4 },
            ],
        },

        // ── ACT II: Washington and Charleston, 1861 ───────────────────────
        inauguration: {
            kind: 'cinematic',
            id: 'inauguration',
            environment: 'washington-1861',
            next: 'sumter-intro',
            cast: [{ id: 'lincoln', position: [0, 0, -56], facing: 0, pose: 'command' }],
            shots: [
                { path: [[120, 60, 90], [30, 26, 10]], lookPath: [[0, 28, -100]], duration: 7 },
                { path: [[30, 26, 10], [6, 8, -34]], lookPath: [[0, 5, -56]], duration: 8 },
                { path: [[6, 8, -34], [0, 18, -20]], lookPath: [[0, 40, -100]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: '4 March 1861. Lincoln takes the oath on the steps of a Capitol whose great iron dome is only half built. Sharpshooters watch from the rooftops. He arrived in Washington secretly, at night, warned of a plot to kill him in Baltimore.', hold: 4 },
                { speaker: 'Abraham Lincoln', text: 'We are not enemies, but friends. Though passion may have strained, it must not break our bonds of affection.', hold: 3.6 },
                { speaker: 'Abraham Lincoln', text: 'The mystic chords of memory will yet swell the chorus of the Union, when again touched, as surely they will be, by the better angels of our nature.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Construction on the dome continues through the whole war. "If people see the Capitol going on," Lincoln will say, "it is a sign we intend the Union shall go on."', hold: 3.6 },
            ],
        },

        'sumter-intro': {
            kind: 'cinematic',
            id: 'sumter-intro',
            environment: 'charleston-harbor',
            next: 'sumter-choice',
            shots: [
                { path: [[-160, 40, 160], [-60, 20, 70]], lookPath: [[0, 6, 0]], duration: 7 },
                { path: [[-60, 20, 70], [40, 14, 46], [56, 26, -10]], lookPath: [[0, 8, 0]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Charleston, South Carolina, April 1861. Fort Sumter sits on an artificial island in the mouth of the harbour, still flying the Stars and Stripes. Major Robert Anderson and his garrison have food for a few more days.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Around the harbour, Confederate General Beauregard has ringed the fort with guns. He learned artillery at West Point, from the same Major Anderson he now has surrounded.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Every one of Lincoln\'s cabinet but one advised him to give the fort up. He has written to the Governor of South Carolina instead: a ship is coming with food only. No guns, no men, unless the fort is attacked.', hold: 4 },
            ],
        },

        'sumter-choice': {
            kind: 'choice',
            id: 'sumter-choice',
            environment: 'charleston-harbor',
            title: 'Fort Sumter · 12 April 1861, 4:30 a.m.',
            prompt: 'The first shell bursts over the fort. Anderson cannot hold for long. The relief fleet is waiting outside the harbour bar. What are your orders?',
            camera: { position: [40, 10, 70], target: [0, 8, 0] },
            options: [
                {
                    id: 'resupply',
                    label: 'Defend the Flag',
                    icon: '🇺🇸',
                    description: 'The South fired first, and the North will rise. Call for 75,000 volunteers to put down the rebellion.',
                    effects: { strength: 10, chaos: 8 },
                    flags: ['war'],
                    next: 'war-begins',
                },
                {
                    id: 'let-go',
                    label: 'Let the South Go in Peace',
                    icon: '🏳️',
                    description: '"Wayward sisters, depart in peace," as General Scott put it. No American blood for a fort.',
                    effects: { diplomacy: 8, strength: -12 },
                    flags: ['let-sumter-go'],
                    next: 'sumter-abandoned',
                },
            ],
        },

        'sumter-abandoned': {
            kind: 'cinematic',
            id: 'sumter-abandoned',
            environment: 'charleston-harbor',
            next: 'ending',
            shots: [{ path: [[40, 12, 70], [-30, 40, 120]], lookPath: [[0, 8, 0]], duration: 9 }],
            narration: [
                { speaker: 'The Chronicle', text: 'Anderson lowers his flag and sails north with full honours. Virginia, North Carolina, Tennessee and Arkansas stay in the Union, for now.', hold: 3.6 },
                { speaker: 'The Chronicle', text: 'The Confederate States of America are recognised by Britain and France within a year. The border between two Americas runs along the Ohio River.', hold: 3.6 },
            ],
        },

        'war-begins': {
            kind: 'cinematic',
            id: 'war-begins',
            environment: 'washington-1861',
            next: 'antietam-battle',
            cast: [{ id: 'lincoln', position: [-2, 0, -44], facing: 0.1, pose: 'think' }],
            shots: [
                { path: [[60, 30, 10], [20, 10, -20]], lookPath: [[60, 2, -20]], duration: 7 },
                { path: [[20, 10, -20], [2, 6, -28]], lookPath: [[-2, 5, -44]], duration: 7 },
                { path: [[2, 6, -28], [80, 70, 80]], lookPath: [[0, 0, -40]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'After thirty-four hours, Fort Sumter surrenders. Nobody on either side has been killed. That is the last good news for a long time.', hold: 3.6 },
                { speaker: 'The Chronicle', text: 'Virginia, Arkansas, Tennessee and North Carolina join the Confederacy. Robert E. Lee, offered command of the Union army, resigns instead: he will not fight against Virginia.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Washington is surrounded by tents. At Bull Run that summer, the Union army runs back to the capital in panic. General McClellan rebuilds it, drills it beautifully, and will not use it.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'September 1862. Lee invades Maryland. A Union soldier finds a copy of his orders wrapped around three cigars in an abandoned camp. Now there is no excuse.', hold: 3.8 },
            ],
        },

        'antietam-battle': {
            kind: 'battle',
            id: 'antietam-battle',
            environment: 'antietam',
            battle: antietam,
        },

        'antietam-lost': {
            kind: 'cinematic',
            id: 'antietam-lost',
            environment: 'antietam',
            next: 'ending',
            cast: [{ id: 'lee', position: [0, 0, -30], facing: 0, pose: 'command' }],
            shots: [
                { path: [[30, 10, 30], [6, 6, -6]], lookPath: [[0, 5, -30]], duration: 7 },
                { path: [[6, 6, -6], [0, 60, 120]], lookPath: [[0, 0, -60]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Army of the Potomac falls back toward Washington. Lee winters in Maryland, and Baltimore cheers his soldiers in the streets.', hold: 3.6 },
                { speaker: 'The Chronicle', text: 'In London, the cabinet votes to offer mediation, and France follows. With European recognition and European loans, the Confederacy cannot be starved out.', hold: 3.8 },
            ],
        },

        // ── ACT III: The Proclamation ─────────────────────────────────────
        'emancipation-choice': {
            kind: 'choice',
            id: 'emancipation-choice',
            environment: 'washington-1861',
            cast: [
                { id: 'lincoln', position: [-51.5, 0, 88.5], facing: 0.9, pose: 'think' },
                { id: 'douglass', position: [-46.8, 0, 83], facing: 0.75, pose: 'command' },
            ],
            title: 'The White House · 22 September 1862',
            prompt: 'Lee has retreated across the Potomac. Since July, a draft of a proclamation freeing every enslaved person in the rebel states has been sitting in your desk drawer.',
            camera: { position: [-30, 6, 104], target: [-60, 6, 74] },
            options: [
                {
                    id: 'sign',
                    label: 'Sign the Proclamation',
                    icon: '📜',
                    description: '"If my name ever goes into history it will be for this act." On 1 January 1863, three and a half million people will be declared forever free.',
                    effects: { freedom: 18, chaos: 6, diplomacy: 6 },
                    flags: ['emancipation'],
                    next: 'proclamation',
                },
                {
                    id: 'delay',
                    label: 'Wait. It Is Too Soon',
                    icon: '⏳',
                    description: 'The Border States might leave, and the army might mutiny. Fight for the Union first and deal with slavery afterwards.',
                    effects: { diplomacy: -6, freedom: -10 },
                    flags: ['delayed'],
                    next: 'delay-cinematic',
                },
            ],
        },

        proclamation: {
            kind: 'cinematic',
            id: 'proclamation',
            environment: 'washington-1861',
            next: 'explore-gettysburg',
            cast: [
                { id: 'lincoln', position: [-51.5, 0, 88.5], facing: 0.9, pose: 'command' },
                { id: 'douglass', position: [-46.8, 0, 83], facing: 0.75, pose: 'command' },
            ],
            shots: [
                { path: [[-26, 5, 110], [-38, 5, 94]], lookPath: [[-49, 5, 86]], duration: 7 },
                { path: [[-38, 5, 94], [-20, 30, 130]], lookPath: [[-70, 10, 70]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'New Year\'s Day, 1863. Lincoln has shaken hands with visitors all morning, and his hand trembles as he picks up the pen. "If they find my hand trembled," he says, "they will say I hesitated."', hold: 4 },
                { speaker: 'Frederick Douglass', text: 'We were waiting and listening as for a bolt from the sky. When the word came over the wire, the joy and gladness exhausted all forms of expression.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'The war is now a war against slavery. No British government can recognise the Confederacy after this, and Black men can now enlist in the Union army.', hold: 3.6 },
                { speaker: 'The Chronicle', text: 'Six months later, Lee invades the North again. The armies collide by accident at a crossroads town in Pennsylvania called Gettysburg.', hold: 3.6 },
            ],
        },

        'delay-cinematic': {
            kind: 'cinematic',
            id: 'delay-cinematic',
            environment: 'washington-1861',
            next: 'explore-gettysburg-delayed',
            cast: [
                { id: 'lincoln', position: [-51.5, 0, 88.5], facing: 0.9, pose: 'think' },
                { id: 'douglass', position: [-46.8, 0, 83], facing: 0.4, pose: 'think' },
            ],
            shots: [
                { path: [[-26, 5, 110], [-40, 6, 100]], lookPath: [[-49, 5, 86]], duration: 7 },
                { path: [[-40, 6, 100], [-10, 40, 140]], lookPath: [[-70, 10, 70]], duration: 8 },
            ],
            narration: [
                { speaker: 'Frederick Douglass', text: 'You are fighting the rebellion with only one hand, Mr. President, when you might strike with two: a white hand and a black one.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Without a moral cause, the war looks to Europe like a quarrel over borders. The Union army gains no Black regiments, and enslaved labour keeps the Confederacy fed.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'July 1863. Lee invades Pennsylvania. The armies collide at a crossroads town called Gettysburg.', hold: 3.2 },
            ],
        },

        // ── ACT IV: Gettysburg ────────────────────────────────────────────
        'explore-gettysburg': gettysburgExplore(true),
        'explore-gettysburg-delayed': gettysburgExplore(false),
        'gettysburg-choice': gettysburgChoice(true),
        'gettysburg-choice-delayed': gettysburgChoice(false),
        'gettysburg-hold': { kind: 'battle', id: 'gettysburg-hold', environment: 'gettysburg', battle: gettysburg('hold', true) },
        'gettysburg-attack': { kind: 'battle', id: 'gettysburg-attack', environment: 'gettysburg', battle: gettysburg('attack', true) },
        'gettysburg-hold-delayed': { kind: 'battle', id: 'gettysburg-hold-delayed', environment: 'gettysburg', battle: gettysburg('hold', false) },
        'gettysburg-attack-delayed': { kind: 'battle', id: 'gettysburg-attack-delayed', environment: 'gettysburg', battle: gettysburg('attack', false) },

        'gettysburg-lost': {
            kind: 'cinematic',
            id: 'gettysburg-lost',
            environment: 'gettysburg',
            next: 'ending',
            cast: [{ id: 'lee', position: [4, 0, 40], facing: 0, pose: 'command' }],
            shots: [
                { path: [[20, 8, 80], [8, 6, 56]], lookPath: [[4, 5, 40]], duration: 7 },
                { path: [[8, 6, 56], [60, 60, 160]], lookPath: [[0, 0, 0]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Union line breaks at the copse of trees. Lee\'s army marches east, toward Baltimore and Washington.', hold: 3.4 },
                { speaker: 'The Chronicle', text: 'In November, Northern voters elect a Congress that wants peace at any price. Lincoln loses re-election in 1864 to George McClellan, who signs an armistice.', hold: 3.8 },
            ],
        },

        // ── ACT V: Ford's Theatre, 1865 ───────────────────────────────────
        'fords-intro': {
            kind: 'cinematic',
            id: 'fords-intro',
            environment: 'fords-theatre',
            next: 'fords-choice',
            cast: [
                { id: 'lincoln', position: [-3.8, 0, -5], facing: 0, pose: 'idle' },
                { id: 'grant', position: [3.8, 0, -5], facing: -0.2, pose: 'idle' },
            ],
            shots: [
                { path: [[0, 12, 32], [0, 5, 14]], lookPath: [[0, 6, -30]], duration: 7 },
                { path: [[0, 8, 16], [10, 6, 10]], lookPath: [[22, 8, -14]], duration: 7 },
                { path: [[10, 6, 10], [0, 5, 18]], lookPath: [[0, 4, -5]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Gettysburg holds. The next day, Vicksburg surrenders to Ulysses S. Grant, and the Confederacy is cut in two. Lincoln brings Grant east and gives him command of every Union army.', hold: 4 },
                { speaker: 'The Chronicle', text: '9 April 1865. At Appomattox Court House, Lee surrenders to Grant. Grant tells his men not to cheer: "The rebels are our countrymen again."', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Five days later. Good Friday, 14 April. The papers have announced that the President and General Grant will attend tonight\'s comedy at Ford\'s Theatre.', hold: 3.6 },
                { speaker: 'The Chronicle', text: 'An actor named John Wilkes Booth reads the announcement. He knows this theatre and every line of the play.', hold: 3.4 },
            ],
        },

        'fords-choice': {
            kind: 'choice',
            id: 'fords-choice',
            environment: 'fords-theatre',
            cast: [
                { id: 'lincoln', position: [-3.8, 0, -5], facing: 0.1, pose: 'think' },
                { id: 'grant', position: [3.8, 0, -5], facing: -0.2, pose: 'idle' },
            ],
            title: 'Ford\'s Theatre · 14 April 1865',
            prompt: 'Mary wants to see the play. Grant says his wife would rather visit their children in New Jersey. Your bodyguard, John Parker, has a habit of wandering off. What do you do?',
            camera: { position: [0, 4.6, 17], target: [1, 5, -16] },
            options: [
                {
                    id: 'go',
                    label: 'Go to the Play',
                    icon: '🎭',
                    description: 'The people expect it, and after four years of war you could use a laugh.',
                    effects: { chaos: 6 },
                    flags: ['went-to-play'],
                    next: 'booth',
                },
                {
                    id: 'grant-escort',
                    label: 'Ask Grant to Come After All',
                    icon: '🎖',
                    description: 'Where the General goes, his military escort goes too: armed soldiers outside the presidential box.',
                    effects: { strength: 6, diplomacy: 4 },
                    flags: ['grant-escort'],
                    next: 'grant-comes',
                },
                {
                    id: 'stay',
                    label: 'Stay at the White House',
                    icon: '🏠',
                    description: 'You are very tired. Mary can see the play another night.',
                    effects: { diplomacy: 4 },
                    flags: ['stayed-home'],
                    next: 'stayed-home',
                },
            ],
        },

        booth: {
            kind: 'cinematic',
            id: 'booth',
            environment: 'fords-theatre',
            next: 'ending',
            shots: [
                { path: [[0, 10.5, 26], [8, 6, 4]], lookPath: [[22, 8, -14]], duration: 8 },
                { path: [[8, 6, 4], [16, 9, -4]], lookPath: [[23, 8, -14]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'About a quarter past ten. Parker has gone to the saloon next door. On stage, an actor delivers the line that always gets the biggest laugh.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Under cover of the laughter, Booth steps into the box and fires a single shot. He leaps to the stage, breaks his leg, and shouts "Sic semper tyrannis!" before escaping into the night.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Abraham Lincoln dies at 7:22 the next morning, in a boarding house across the street. "Now he belongs to the ages," says the Secretary of War.', hold: 3.8 },
            ],
        },

        'grant-comes': {
            kind: 'cinematic',
            id: 'grant-comes',
            environment: 'fords-theatre',
            next: 'ending',
            cast: [
                { id: 'lincoln', position: [-3.8, 0, -5], facing: 0.2, pose: 'idle' },
                { id: 'grant', position: [3.8, 0, -5], facing: -0.3, pose: 'command' },
            ],
            shots: [
                { path: [[0, 10.5, 26], [8, 6, 4]], lookPath: [[22, 8, -14]], duration: 7 },
                { path: [[8, 6, 4], [0, 5, 18]], lookPath: [[0, 4, -5]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Four cavalry troopers stand in the corridor outside the box all evening. Booth arrives at ten, sees them, and walks back out into Tenth Street.', hold: 3.8 },
                { speaker: 'Ulysses S. Grant', text: 'I would rather have faced Lee again than Julia tomorrow morning, Mr. President. But I am glad I came.', hold: 3.4 },
            ],
        },

        'stayed-home': {
            kind: 'cinematic',
            id: 'stayed-home',
            environment: 'washington-1861',
            next: 'ending',
            cast: [{ id: 'lincoln', position: [-51.5, 0, 88.5], facing: 0.9, pose: 'think' }],
            shots: [
                { path: [[-20, 8, 120], [-36, 5, 98]], lookPath: [[-51, 5, 88]], duration: 8 },
                { path: [[-36, 5, 98], [-20, 30, 140]], lookPath: [[-70, 10, 70]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Booth waits outside Ford\'s Theatre for a carriage that never comes. Edwin Stanton\'s detectives, already watching his friends, arrest him at his boarding house two days later.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Abraham Lincoln wakes up the next morning, eats his usual breakfast of one egg and a cup of coffee, and goes back to work on the peace.', hold: 3.6 },
            ],
        },

        ending: { kind: 'ending', id: 'ending' },
    },

    endings: [
        {
            id: 'lincoln-survives',
            title: 'Lincoln Lives',
            subtitle: 'With malice toward none: Lincoln leads Reconstruction',
            icon: '🎩',
            color: '#10B981',
            linkedTimelineId: 'lincoln-survives',
            priority: 10,
            requiresFlags: ['stayed-home'],
            epilogue: [
                { text: 'Lincoln serves out his second term. Instead of Andrew Johnson, the most skilful politician of his age manages the peace, and the South is brought back without the bitterness of our history.', hold: 4 },
                { text: 'He insists on the vote for Black veterans, then for all freedmen. Jim Crow laws are blocked before they take root, and the civil rights struggle starts generations ahead.', hold: 3.8 },
                { text: 'He retires to Springfield in 1869 and writes a memoir that is still the best-selling book by any American president.', hold: 3.4 },
            ],
        },
        {
            // Same reality as lincoln-survives, reached by bringing Grant and his escort.
            id: 'lincoln-survives-grant',
            title: 'Lincoln Lives',
            subtitle: 'Grant\'s escort turns Booth away · Lincoln leads Reconstruction',
            icon: '🎩',
            color: '#10B981',
            linkedTimelineId: 'lincoln-survives',
            priority: 10,
            requiresFlags: ['grant-escort'],
            epilogue: [
                { text: 'Lincoln and Grant, the two men who won the war, together manage the peace. Grant\'s army protects the new state governments in the South while Lincoln persuades Congress.', hold: 3.8 },
                { text: 'Black Americans vote, hold office and buy land in large numbers. Jim Crow is avoided, and the country grows into an industrial superpower by 1890, united and far more equal.', hold: 3.8 },
            ],
        },
        {
            id: 'peaceful-abolition',
            title: 'The Great Compromise',
            subtitle: 'Slavery bought out · no Civil War',
            icon: '🕊',
            color: '#3B82F6',
            linkedTimelineId: 'peaceful-abolition',
            priority: 10,
            requiresFlags: ['gradual-buyout'],
            epilogue: [
                { text: 'The last enslaved Americans are freed in 1890, decades too late for millions who die in bondage while the bonds are paid off. But 750,000 soldiers live, and the South is not burned.', hold: 4 },
                { text: 'Without the war, the planters keep their wealth and their power, and segregation lasts a long time. But it is never sealed in blood, and it fades more quietly.', hold: 3.8 },
                { text: 'The Civil War is a "what if" in history books. America is a less militarised country, and it argues about whether the price of peace was too high.', hold: 3.6 },
            ],
        },
        {
            id: 'confederacy-wins',
            title: 'Southern Victory',
            subtitle: 'Gettysburg is lost · two American nations',
            icon: '🏴',
            color: '#6B7280',
            linkedTimelineId: 'confederacy-wins',
            priority: 10,
            requiresFlags: ['gettysburg:defeat'],
            epilogue: [
                { text: 'The Confederate States of America win their independence in 1864. North America is divided, and the border is the most heavily fortified in the world.', hold: 3.6 },
                { text: 'Slavery survives into the 1890s, ended by machines and boycotts rather than armies. Legal segregation in the South lasts until 1990.', hold: 3.6 },
                { text: 'In the Great War, the United States backs Germany and the Confederacy backs Britain. You need a passport to visit Atlanta.', hold: 3.4 },
            ],
        },
        {
            // Same reality as confederacy-wins, reached by losing at Antietam.
            id: 'confederacy-antietam',
            title: 'Southern Victory',
            subtitle: 'Antietam is lost · Europe recognises the Confederacy',
            icon: '🏴',
            color: '#6B7280',
            linkedTimelineId: 'confederacy-wins',
            priority: 10,
            requiresFlags: ['antietam:defeat'],
            epilogue: [
                { text: 'British mediation becomes a British-brokered peace. The Union accepts the loss of eleven states in 1863, and Lincoln is remembered as the president who lost half the country.', hold: 3.8 },
                { text: 'Slavery survives into the 1890s. Legal segregation in the South lasts until 1990, and the two Americas glare at each other across the Potomac.', hold: 3.6 },
            ],
        },
        {
            // Same reality as confederacy-wins, reached without a war.
            id: 'confederacy-peaceful',
            title: 'Southern Victory',
            subtitle: 'Sumter given up · the South leaves without a war',
            icon: '🏴',
            color: '#6B7280',
            linkedTimelineId: 'confederacy-wins',
            priority: 10,
            requiresFlags: ['let-sumter-go'],
            epilogue: [
                { text: 'Seven states form the Confederacy without a shot. Without a war to unite the North, Lincoln is a one-term president, and the remaining Union quarrels over what it should have done.', hold: 3.8 },
                { text: 'Enslaved people escape north in tens of thousands, and the new border becomes the front line of a cold war that lasts thirty years.', hold: 3.6 },
            ],
        },
        {
            id: 'union-delayed',
            title: 'Union Without Freedom',
            subtitle: 'The war is won, but emancipation came late',
            icon: '⛓',
            color: '#B45309',
            priority: 9,
            requiresFlags: ['delayed', 'gettysburg:won'],
            epilogue: [
                { text: 'The Union wins in 1866, a year later than in our history and with tens of thousands more dead. Slavery is only abolished by the Thirteenth Amendment after the guns fall silent.', hold: 3.8 },
                { text: 'With no Black regiments to point to, the freedmen have fewer allies in Washington. Their rights are traded away even faster than in our history.', hold: 3.6 },
            ],
        },
        {
            id: 'union-restored',
            title: 'A New Birth of Freedom',
            subtitle: 'The history you know: Union restored, a President lost',
            icon: '🇺🇸',
            color: '#7C3AED',
            priority: 8,
            requiresFlags: ['gettysburg:won'],
            epilogue: [
                { text: 'The Union is saved and slavery is abolished by the Thirteenth Amendment in December 1865. Lincoln does not live to see it.', hold: 3.6 },
                { text: 'Andrew Johnson lets the old Southern leaders back into power, and the promise of Reconstruction collapses into a century of Jim Crow.', hold: 3.6 },
                { text: 'This is the reality you are reading this in. It took until the 1960s for the country to begin keeping the promise Lincoln made at Gettysburg.', hold: 3.6 },
            ],
        },
    ],
};
