/* World War I interactive episode: Sarajevo 1914 → seven realities. */
import type { BattleConfig, ExperienceScript } from '../types';

const GERMAN_1914 = { side: 'player' as const, color: '#6e7360', accentColor: '#c8a24a', helmet: 'pickelhaube' as const };
const GERMAN_1918 = { side: 'player' as const, color: '#6a6e5e', accentColor: '#8a2a2a', helmet: 'stahlhelm' as const };
const FRENCH_1914 = { side: 'enemy' as const, color: '#3a4f8a', accentColor: '#b0202a', helmet: 'kepi' as const };
const BRITISH_1918 = { side: 'enemy' as const, color: '#7a6a44', accentColor: '#b33a2a', helmet: 'brodie' as const };

/**
 * The Marne, 5–9 September 1914. The German right wing is within sight of Paris.
 * Wheeling east of the city (what von Kluck did) exposes its flank; swinging west
 * around it (what Schlieffen planned) stretches the army thin but keeps it safe.
 */
function marne(route: 'wheel' | 'encircle'): BattleConfig {
    const wheel = route === 'wheel';
    return {
        id: 'marne',
        name: 'The First Battle of the Marne',
        era: 'modern',
        theme: 'colonial',
        objective: wheel
            ? '6 September 1914. Your First Army has turned east of Paris to chase the retreating French, and the city\'s garrison has just attacked your open right flank on the river Ourcq. Break the French Sixth Army before the gap in your line is found.'
            : '6 September 1914. Your right wing has swung west of Paris, as Schlieffen intended. Your men have marched 500 kilometres in a month and are exhausted, but the French capital is almost surrounded. Smash the last army between you and the city.',
        player: wheel
            ? { ...GERMAN_1914, name: 'German First Army', infantry: 120, cavalry: 25, archers: 30, attack: 1.0, defense: 1.0 }
            : { ...GERMAN_1914, name: 'German Right Wing', infantry: 130, cavalry: 25, archers: 30, attack: 1.0, defense: 1.0 },
        enemy: wheel
            ? { ...FRENCH_1914, name: 'French Sixth Army and the BEF', infantry: 120, cavalry: 20, archers: 30, attack: 1.1, defense: 1.3 }
            : { ...FRENCH_1914, name: 'Army of Paris', infantry: 125, cavalry: 15, archers: 30, attack: 1.1, defense: 1.35 },
        onVictory: 'paris-falls',
        onDefeat: 'race-to-the-sea',
        events: [
            {
                id: 'the-gap',
                atTime: 10,
                title: wheel ? 'The Fifty-Kilometre Gap' : 'Stretched Thin',
                prompt: wheel
                    ? 'Von Kluck has pulled troops west to face the attack on his flank. Between your First and Second Armies, a gap fifty kilometres wide has opened.'
                    : 'Your army is spread across a front of three hundred kilometres. French cavalry is probing for weak points.',
                options: [
                    {
                        id: 'close-gap',
                        label: 'Close the Gap',
                        icon: '🛡',
                        description: 'Halt the advance and pull the armies back together. Safer, but it gives the French time.',
                        effects: { strength: 3 },
                        mod: { defenseMult: 1.25 },
                    },
                    {
                        id: 'push-on',
                        label: 'Push On to Paris',
                        icon: '⚔️',
                        description: 'Speed is everything in the Schlieffen Plan. Keep marching and trust that the French are beaten.',
                        effects: { chaos: 4 },
                        mod: { attackMult: 1.15, moraleShift: -0.05 },
                    },
                ],
            },
            {
                id: 'taxis',
                atTime: 28,
                title: 'The Taxis of the Marne',
                prompt: 'General Gallieni has commandeered the taxis of Paris. Some six hundred cabs are carrying about five thousand fresh soldiers to the front, their meters still running.',
                options: [
                    {
                        id: 'shell-road',
                        label: 'Shell the Road',
                        icon: '💥',
                        description: 'Turn the heavy howitzers on the road from Paris and catch the reinforcements before they deploy.',
                        effects: { strength: 4 },
                        mod: { catapultBarrage: 14, enemyReinforcements: wheel ? 14 : 8 },
                    },
                    {
                        id: 'ignore-taxis',
                        label: 'Attack Before They Arrive',
                        icon: '🏃',
                        description: 'Throw everything at the French line now, before the new men can reach it.',
                        effects: { chaos: 3 },
                        mod: { attackMult: 1.12, enemyReinforcements: wheel ? 24 : 16 },
                    },
                ],
            },
            {
                id: 'hentsch',
                whenMoraleBelow: { side: 'player', value: 0.5 },
                title: 'Colonel Hentsch Arrives',
                prompt: 'A staff officer has driven from headquarters with authority to order a retreat if he thinks the army is in danger. He thinks it is.',
                options: [
                    {
                        id: 'refuse-retreat',
                        label: 'Refuse to Retreat',
                        icon: '🚩',
                        description: '"Paris is forty kilometres away." The officers blow their whistles and the exhausted regiments go forward again.',
                        effects: { strength: 3 },
                        mod: { moraleShift: 0.3, attackMult: 1.08 },
                    },
                    {
                        id: 'dig-in',
                        label: 'Dig In Where You Stand',
                        icon: '⛏',
                        description: 'Do not retreat, but do not attack either. Spades out: let the French break themselves on your rifles.',
                        mod: { defenseMult: 1.35 },
                    },
                ],
            },
        ],
    };
}

/**
 * Operation Michael, 21 March 1918. With Russia out of the war, Germany has one
 * chance to win in the West before the Americans arrive in strength.
 */
const kaiserschlacht: BattleConfig = {
    id: 'kaiserschlacht',
    name: 'The Kaiser\'s Battle',
    era: 'modern',
    theme: 'colonial',
    objective:
        '21 March 1918, 4:40 in the morning. Russia has made peace, and fifty divisions have come west by train. Break the British Fifth Army on the Somme and drive for the railway junction at Amiens before the Americans arrive in strength. Let the guns soften the line before you send the men over the top.',
    player: { ...GERMAN_1918, name: 'Seventeenth, Second and Eighteenth Armies', infantry: 135, cavalry: 0, archers: 40, attack: 1.05, defense: 1.0 },
    enemy: { ...BRITISH_1918, name: 'British Fifth Army', infantry: 115, cavalry: 10, archers: 32, attack: 1.05, defense: 1.3 },
    onVictory: 'peace-1918',
    onDefeat: 'hundred-days',
    events: [
        {
            id: 'bombardment',
            atTime: 8,
            title: 'Five Hours of Fire',
            prompt: 'Colonel Bruchmüller has more than six thousand guns ready. In five hours they can fire over a million shells. How do you use them?',
            options: [
                {
                    id: 'hurricane',
                    label: 'Hurricane Bombardment',
                    icon: '💥',
                    description: 'A short, violent barrage of gas and high explosive on the British guns and command posts, then a creeping barrage ahead of the infantry.',
                    effects: { strength: 4 },
                    mod: { catapultBarrage: 18 },
                },
                {
                    id: 'infiltrate',
                    label: 'Stormtroopers in the Fog',
                    icon: '🌫',
                    description: 'Thick fog covers the valley. Send small squads with light machine guns and flamethrowers to slip past the strongpoints.',
                    effects: { chaos: 3 },
                    mod: { attackMult: 1.15, enemyAttackMult: 0.95 },
                },
            ],
        },
        {
            id: 'americans',
            atTime: 30,
            title: 'Fresh Troops',
            prompt: 'You have advanced further in a week than anyone on the Western Front since 1914. But British reserves and the first American divisions are coming up to plug the line.',
            options: [
                {
                    id: 'drive-amiens',
                    label: 'Drive for Amiens',
                    icon: '🚂',
                    description: 'Take the railway junction and the British and French armies are cut apart. Your men are exhausted and are stopping to loot food from British supply dumps.',
                    effects: { chaos: 4 },
                    mod: { attackMult: 1.15, enemyReinforcements: 14 },
                },
                {
                    id: 'consolidate',
                    label: 'Consolidate the Gains',
                    icon: '🛡',
                    description: 'Bring up the guns and supplies across the old Somme battlefield before going on. Steadier, but the enemy gets time.',
                    effects: { strength: 3 },
                    mod: { defenseMult: 1.15, enemyReinforcements: 26 },
                },
            ],
        },
        {
            id: 'exhaustion',
            whenMoraleBelow: { side: 'player', value: 0.5 },
            title: 'The Attack Runs Out of Steam',
            prompt: 'The best men were in the first waves, and many of them are dead. The survivors are hungry and far from their guns.',
            options: [
                {
                    id: 'last-reserves',
                    label: 'Commit the Last Reserves',
                    icon: '🎖',
                    description: 'There is nothing left behind them. Germany cannot raise another army like this one.',
                    effects: { strength: 3 },
                    mod: { moraleShift: 0.32, attackMult: 1.08 },
                },
                {
                    id: 'hold-line',
                    label: 'Hold the New Line',
                    icon: '⛏',
                    description: 'Dig in on the ground you have taken and let the British counter-attack into your machine guns.',
                    mod: { defenseMult: 1.2 },
                },
            ],
        },
    ],
};

export const worldWar1Script: ExperienceScript = {
    chapterId: 'world-war-1',
    title: 'The Guns of August',
    era: 'Sarajevo · 1914',
    startBeat: 'intro',
    initialStats: { chaos: 45, freedom: 20, diplomacy: 40, strength: 45 },
    defaultEnding: 'versailles',

    characters: {
        'franz-ferdinand': {
            id: 'franz-ferdinand', name: 'Archduke Franz Ferdinand', role: 'Heir to the Austro-Hungarian throne',
            face: '/images/chapters/world-war-1/faces/archduke-franz-ferdinand.webp',
            outfit: 'plumed-helmet', skin: '#e2b08e', hair: '#3a2c22', hat: '#1a1a1c', robe: '#8fb0d6', accent: '#c8a24a', breeches: '#1c1c22',
        },
        kaiser: {
            id: 'kaiser', name: 'Kaiser Wilhelm II', role: 'German Emperor and King of Prussia',
            face: '/images/chapters/world-war-1/faces/kaiser-wilhelm-ii.webp',
            outfit: 'pickelhaube', skin: '#e6b99a', hair: '#6b5a48', robe: '#5f6553', accent: '#c8a24a', breeches: '#2a2a2e',
        },
        wilson: {
            id: 'wilson', name: 'Woodrow Wilson', role: '28th President of the United States',
            face: '/images/chapters/world-war-1/faces/woodrow-wilson.webp',
            outfit: 'frock-coat', skin: '#e8bfa2', hair: '#9a9690', robe: '#1f2024', accent: '#3a3a40', breeches: '#26262a',
        },
    },

    beats: {
        // ── ACT I: Sarajevo, 28 June 1914 ─────────────────────────────────
        intro: {
            kind: 'cinematic',
            id: 'intro',
            environment: 'sarajevo-1914',
            next: 'explore-sarajevo',
            cast: [{ id: 'franz-ferdinand', position: [-1, 0, -26], facing: 2.6, pose: 'idle' }],
            shots: [
                { path: [[90, 48, -120], [30, 20, -70]], lookPath: [[-14, 4, -30]], duration: 9 },
                { path: [[30, 20, -70], [8, 9, -50], [4, 5.5, -44]], lookPath: [[-14, 3, -40], [-8, 3, -20]], duration: 10 },
                { path: [[4, 5.5, -44], [-20, 6, -42], [-36, 8, -46]], lookPath: [[-10, 3, -20], [-26, 4, -12]], duration: 14 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Sarajevo, Sunday 28 June 1914. Archduke Franz Ferdinand, heir to the throne of Austria-Hungary, is visiting the capital of Bosnia with his wife Sophie.', hold: 4 },
                { speaker: 'The Chronicle', text: 'This morning a young man threw a bomb at their open car. It bounced off the folded roof and exploded under the car behind, wounding two officers. The Archduke went on to the Town Hall and gave his speech.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Now he insists on visiting the wounded in hospital. Nobody has told his driver that the route has changed. At the Latin Bridge, the car turns into the wrong street and stops.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Outside Moritz Schiller\'s delicatessen, a nineteen-year-old student named Gavrilo Princip is standing with a pistol in his pocket. In our history, his two shots started a war that killed about nine million soldiers. In this one, you decide.', hold: 4.4 },
            ],
        },

        'explore-sarajevo': {
            kind: 'explore',
            id: 'explore-sarajevo',
            environment: 'sarajevo-1914',
            cast: [{ id: 'franz-ferdinand', position: [-1, 0, -26], facing: 2.6, pose: 'think' }],
            prompt: 'Explore Sarajevo: drag to look around and click the glowing markers. The car has stopped at the corner.',
            camera: { position: [22, 16, -72], target: [-12, 3, -18] },
            hotspots: [
                {
                    id: 'bridge',
                    position: [-14, 7, -40],
                    label: 'The Latin Bridge',
                    icon: '🌉',
                    title: 'The Corner',
                    description:
                        'An Ottoman stone bridge over the river Miljacka. The motorcade was meant to drive straight on along the riverside quay. Instead, the first two cars turned right here into Franz Joseph Street, and the Archduke\'s car followed them.',
                },
                {
                    id: 'deli',
                    position: [-30, 9, -8],
                    label: 'Schiller\'s Delicatessen',
                    icon: '🥪',
                    title: 'Gavrilo Princip',
                    description:
                        'Princip belongs to Young Bosnia, a group of students who want the South Slavs free of Austrian rule. Their pistols and bombs came from the Black Hand, a secret society run by officers of Serbian military intelligence. He thought the plot had failed and was standing here by chance.',
                    effects: { chaos: 3 },
                },
                {
                    id: 'car',
                    position: [-21, 7, -12],
                    label: 'The Gräf & Stift',
                    icon: '🚗',
                    title: 'The Driver',
                    description:
                        'Leopold Lojka has just been shouted at by the Governor of Bosnia, General Potiorek: "This is the wrong way!" He has braked to a stop and is starting, very slowly, to back the heavy car up.',
                },
                {
                    id: 'flags',
                    position: [10, 14, -4],
                    label: 'Imperial Flags',
                    icon: '🏳',
                    title: 'A Dangerous Date',
                    description:
                        'Today is Vidovdan, the anniversary of the Battle of Kosovo in 1389, the most important day in the Serbian calendar. Many Serbs see the Archduke\'s visit on this day as a deliberate insult.',
                    effects: { diplomacy: -2 },
                },
                {
                    id: 'reformer',
                    position: [-1, 4.5, -26],
                    label: 'The Archduke',
                    icon: '🎖',
                    title: 'A Reformer No One Liked',
                    description:
                        'Franz Ferdinand is gruff and unpopular at court, but he has plans to give the Slavs of the empire equal rights, perhaps in a "United States of Greater Austria". The Serbian nationalists fear he might succeed. Now he has a second to decide.',
                    effects: { diplomacy: 3 },
                    advancesTo: 'sarajevo-choice',
                },
            ],
        },

        'sarajevo-choice': {
            kind: 'choice',
            id: 'sarajevo-choice',
            environment: 'sarajevo-1914',
            cast: [{ id: 'franz-ferdinand', position: [-1, 0, -26], facing: 2.7, pose: 'command' }],
            title: 'Franz Joseph Street · 10:50 a.m.',
            prompt: 'The car is stopped. A crowd is pressing in. The Archduke leans forward to the driver.',
            camera: { position: [6, 5, -45], target: [-5, 3.5, -22] },
            options: [
                {
                    id: 'speed-away',
                    label: '"Drive On! Straight Ahead!"',
                    icon: '💨',
                    description: 'Forget reversing. Put the car in gear and drive up the wrong street as fast as it will go.',
                    effects: { diplomacy: 8, chaos: -10 },
                    flags: ['sped-away'],
                    next: 'escape',
                },
                {
                    id: 'reverse',
                    label: 'Back Up to the Quay',
                    icon: '↩️',
                    description: 'Follow the Governor\'s order: reverse back onto the riverside road and take the planned route.',
                    effects: { chaos: 10 },
                    flags: ['reversed'],
                    next: 'shots',
                },
            ],
        },

        escape: {
            kind: 'cinematic',
            id: 'escape',
            environment: 'sarajevo-1914',
            next: 'ending',
            shots: [
                { path: [[3, 5, -40], [-14, 5, -28]], lookPath: [[-12, 3, -18], [-14, 3, 30]], duration: 7 },
                { path: [[-14, 5, -28], [20, 40, -100]], lookPath: [[-14, 4, -10]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The engine roars and the car lurches forward up Franz Joseph Street. Princip draws his pistol, but the target is already twenty metres away and moving. He does not fire.', hold: 4 },
                { speaker: 'The Chronicle', text: 'That evening the Archduke and Sophie leave Bosnia by train. The plot is uncovered within days, and Austria arrests the conspirators without blaming Serbia\'s government.', hold: 3.8 },
                { speaker: 'Archduke Franz Ferdinand', text: 'We came here on a visit and we have been greeted with bombs. Very well. We will make this empire into somewhere nobody wants to throw a bomb.', hold: 3.6 },
            ],
        },

        shots: {
            kind: 'cinematic',
            id: 'shots',
            environment: 'sarajevo-1914',
            next: 'july-crisis',
            shots: [
                { path: [[-28, 4, -22], [-22, 3, -28]], lookPath: [[-10, 3, -20]], duration: 6 },
                { path: [[-22, 3, -28], [10, 30, -90]], lookPath: [[-12, 2, -18]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'As the car slowly backs up, Princip steps forward from the crowd, a metre and a half away, and fires twice.', hold: 3.4 },
                { speaker: 'The Chronicle', text: 'The first bullet hits Sophie in the stomach. The second hits Franz Ferdinand in the neck. "Sophie, Sophie, don\'t die. Stay alive for our children." Within the hour, both are dead.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'Princip tries to shoot himself and is wrestled to the ground. Austria-Hungary is sure that Serbia is behind it, and it asks its ally Germany what it should do.', hold: 3.8 },
            ],
        },

        // ── ACT II: Berlin, the July Crisis ───────────────────────────────
        'july-crisis': {
            kind: 'cinematic',
            id: 'july-crisis',
            environment: 'berlin-1914',
            next: 'explore-berlin',
            cast: [{ id: 'kaiser', position: [0, 0, -62], facing: 0, pose: 'think' }],
            shots: [
                { path: [[0, 26, 160], [0, 14, 60]], lookPath: [[0, 10, -40]], duration: 8 },
                { path: [[0, 14, 60], [10, 6, -44]], lookPath: [[0, 4, -62]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Berlin, 5 July 1914. An Austrian diplomat, Count Hoyos, has brought a letter from his emperor asking whether Germany will stand by Austria if it punishes Serbia.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Everyone knows the danger. Russia protects Serbia. France is Russia\'s ally. Britain has friendly understandings with both, and a treaty promising to defend Belgium.', hold: 3.8 },
                { speaker: 'Kaiser Wilhelm II', text: 'The Serbs must be dealt with, and soon. But I would rather not be the one who sets Europe on fire. Let me think.', hold: 3.4 },
            ],
        },

        'explore-berlin': {
            kind: 'explore',
            id: 'explore-berlin',
            environment: 'berlin-1914',
            cast: [{ id: 'kaiser', position: [0, 0, -62], facing: 0, pose: 'think' }],
            prompt: 'Explore Berlin: drag to look around and click the glowing markers. The Austrians are waiting for an answer.',
            camera: { position: [24, 16, -10], target: [0, 6, -70] },
            hotspots: [
                {
                    id: 'palace',
                    position: [0, 24, -88],
                    label: 'The City Palace',
                    icon: '🏰',
                    title: 'The Emperor\'s Residence',
                    description:
                        'The Kaiser has ruled for twenty-six years. He loves uniforms, parades and his navy, which he built to rival Britain\'s, and he is famous for saying things in interviews that his ministers then have to explain away.',
                },
                {
                    id: 'linden',
                    position: [16, 10, 20],
                    label: 'Unter den Linden',
                    icon: '🌳',
                    title: 'A Confident Capital',
                    description:
                        'Germany has the strongest army in Europe and the fastest-growing industry. Its leaders also fear that Russia, rebuilding its army and railways, will be too strong to beat within a few years. Some generals say: better now than later.',
                    effects: { strength: 3 },
                },
                {
                    id: 'gate',
                    position: [0, 22, 140],
                    label: 'The Brandenburg Gate',
                    icon: '🏛',
                    title: 'The Plan',
                    description:
                        'If war comes, Germany will have to fight France and Russia at once. The General Staff\'s answer is the Schlieffen Plan: defeat France in about six weeks by marching through neutral Belgium, then send the army east by train before Russia is ready.',
                    effects: { chaos: 3 },
                },
                {
                    id: 'telegraph',
                    position: [-30, 10, 40],
                    label: 'News from London',
                    icon: '📰',
                    title: 'Cousins',
                    description:
                        'King George V of Britain and Tsar Nicholas II of Russia are both the Kaiser\'s cousins. They write to each other as "Georgie", "Nicky" and "Willy". It will not help.',
                    effects: { diplomacy: 3 },
                },
                {
                    id: 'decide',
                    position: [0, 4.5, -62],
                    label: 'The Kaiser',
                    icon: '👑',
                    title: 'The Answer',
                    description:
                        'Count Hoyos is waiting. Whatever the Kaiser says today, Austria will treat it as a promise.',
                    advancesTo: 'crisis-choice',
                },
            ],
        },

        'crisis-choice': {
            kind: 'choice',
            id: 'crisis-choice',
            environment: 'berlin-1914',
            cast: [{ id: 'kaiser', position: [0, 0, -62], facing: 0, pose: 'command' }],
            title: 'The July Crisis · 1914',
            prompt: 'Austria has sent Serbia an ultimatum written to be refused. Serbia has accepted almost all of it. In our history, the Kaiser said "every reason for war is removed", and it was already too late. What do you do?',
            camera: { position: [6, 5, -41], target: [0, 4, -62] },
            options: [
                {
                    id: 'blank-cheque',
                    label: 'Back Austria to the Hilt',
                    icon: '✍️',
                    description: 'Give Vienna a "blank cheque": Germany will support whatever it does. Russia will surely back down rather than fight.',
                    effects: { strength: 8, chaos: 10 },
                    flags: ['blank-cheque'],
                    next: 'guns-of-august',
                },
                {
                    id: 'halt-in-belgrade',
                    label: 'Halt in Belgrade',
                    icon: '✋',
                    description: 'Tell Austria to occupy Belgrade as a guarantee, go no further, and negotiate. Telegraph the Tsar personally.',
                    effects: { diplomacy: 12, chaos: -8 },
                    flags: ['halt-belgrade'],
                    next: 'conference',
                },
            ],
        },

        conference: {
            kind: 'cinematic',
            id: 'conference',
            environment: 'berlin-1914',
            next: 'ending',
            cast: [{ id: 'kaiser', position: [0, 0, -62], facing: 0, pose: 'idle' }],
            shots: [
                { path: [[6, 5, -41], [20, 12, -20]], lookPath: [[0, 6, -62]], duration: 7 },
                { path: [[20, 12, -20], [0, 30, 120]], lookPath: [[0, 14, 140]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Austrian troops cross the Danube and stop in Belgrade. The Tsar cancels Russia\'s mobilisation. In London, the Foreign Secretary calls a conference of the great powers.', hold: 4 },
                { speaker: 'The Chronicle', text: 'It takes all autumn. Serbia hands over the plotters, Austria leaves Belgrade, and the newspapers complain that nobody won. That was the point.', hold: 3.8 },
                { speaker: 'Kaiser Wilhelm II', text: 'They will say the Kaiser lost his nerve. Let them. I would rather be laughed at in Berlin than remembered for setting Europe on fire.', hold: 3.6 },
            ],
        },

        // ── ACT III: The Marne, September 1914 ────────────────────────────
        'guns-of-august': {
            kind: 'cinematic',
            id: 'guns-of-august',
            environment: 'marne-1914',
            next: 'explore-marne',
            shots: [
                { path: [[120, 50, 160], [40, 20, 90]], lookPath: [[0, 4, 0]], duration: 7 },
                { path: [[40, 20, 90], [-30, 12, -60], [-60, 16, -120]], lookPath: [[0, 4, -40], [-120, 40, -420]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The alliances fall like dominoes. Austria declares war on Serbia. Russia mobilises. Germany declares war on Russia on 1 August and on France two days later.', hold: 4 },
                { speaker: 'The Chronicle', text: 'On 4 August, German troops march into neutral Belgium. Britain declares war the same night. The German Chancellor cannot believe Britain will fight over "a scrap of paper".', hold: 4 },
                { speaker: 'The Chronicle', text: 'Everyone says the war will be over by Christmas. A month later, the German right wing has marched across Belgium and northern France. Its patrols can see the Eiffel Tower.', hold: 3.8 },
            ],
        },

        'explore-marne': {
            kind: 'explore',
            id: 'explore-marne',
            environment: 'marne-1914',
            cast: [{ id: 'kaiser', position: [0, 0, 64], facing: 0.25, pose: 'think' }],
            prompt: 'Explore the Marne valley: drag to look around and click the glowing markers. Then choose your route around Paris.',
            camera: { position: [40, 26, 120], target: [0, 4, 0] },
            hotspots: [
                {
                    id: 'eiffel',
                    position: [-120, 60, -420],
                    label: 'Paris',
                    icon: '🗼',
                    title: 'Forty Kilometres',
                    description:
                        'The French government has already left for Bordeaux. Paris is defended by its old forts and a garrison under General Joseph Gallieni, who has been told to hold the city to the last.',
                    effects: { strength: 3 },
                },
                {
                    id: 'taxis',
                    position: [-20, 6, -102],
                    label: 'The Road from Paris',
                    icon: '🚕',
                    title: 'An Unusual Army',
                    description:
                        'Renault taxis are lining up in the city. Gallieni plans to use them to rush reinforcements to the front. The drivers will charge the army the fare on the meter.',
                },
                {
                    id: 'village',
                    position: [130, 12, -40],
                    label: 'The Village',
                    icon: '⛪',
                    title: 'Exhausted Men',
                    description:
                        'German infantry have marched up to forty kilometres a day in the August heat, many with bleeding feet. Supply wagons are far behind, and the horses are dying.',
                    effects: { chaos: 3 },
                },
                {
                    id: 'wheat',
                    position: [-120, 4, 20],
                    label: 'Wheat Fields',
                    icon: '🌾',
                    title: 'Red Trousers',
                    description:
                        'French soldiers still wear bright red trousers and dark blue coats, as in 1870. Against machine guns and quick-firing artillery they have suffered more than a quarter of a million casualties in a month. Next year they will change to "horizon blue".',
                    effects: { strength: 2 },
                },
                {
                    id: 'decide',
                    position: [0, 4.5, 64],
                    label: 'The High Command',
                    icon: '🗺',
                    title: 'Which Way Around Paris?',
                    description:
                        'General von Moltke, the Chief of Staff, is in Luxembourg, almost out of touch with his armies. His commanders are making their own decisions. The Kaiser can still overrule them.',
                    advancesTo: 'schlieffen-choice',
                },
            ],
        },

        'schlieffen-choice': {
            kind: 'choice',
            id: 'schlieffen-choice',
            environment: 'marne-1914',
            cast: [{ id: 'kaiser', position: [0, 0, 64], facing: 0.2, pose: 'command' }],
            title: 'The Marne · September 1914',
            prompt: 'General von Kluck wants to cut the corner and chase the retreating French east of Paris. The original plan said to swing wide around the west of the city. Which do you order?',
            camera: { position: [8, 5, 86], target: [0, 4, 62] },
            options: [
                {
                    id: 'wheel',
                    label: 'Turn East of Paris',
                    icon: '↪️',
                    description: 'Von Kluck\'s way: a shorter march to catch the French army. It leaves the First Army\'s flank open to the Paris garrison.',
                    effects: { chaos: 6 },
                    flags: ['wheeled'],
                    next: 'marne-wheel',
                },
                {
                    id: 'encircle',
                    label: 'Swing West Around Paris',
                    icon: '🔄',
                    description: 'Schlieffen\'s way: march around the city and surround it. Longer, and the men are exhausted, but nothing is left exposed.',
                    effects: { strength: 6 },
                    flags: ['encircled'],
                    next: 'marne-encircle',
                },
            ],
        },

        'marne-wheel': { kind: 'battle', id: 'marne-wheel', environment: 'marne-1914', battle: marne('wheel') },
        'marne-encircle': { kind: 'battle', id: 'marne-encircle', environment: 'marne-1914', battle: marne('encircle') },

        'paris-falls': {
            kind: 'cinematic',
            id: 'paris-falls',
            environment: 'marne-1914',
            next: 'ending',
            cast: [{ id: 'kaiser', position: [0, 0, 20], facing: 0.3, pose: 'command' }],
            shots: [
                { path: [[10, 6, 40], [0, 10, 0]], lookPath: [[0, 4, 20], [-120, 40, -420]], duration: 7 },
                { path: [[0, 10, 0], [-40, 40, -150]], lookPath: [[-120, 50, -420]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The French line breaks. Within a week, German cavalry rides past the Paris forts and the city is surrounded, as it was in 1870.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'France asks for terms in October. The British army is taken home from Dunkirk. The Russians, fighting alone, make peace before the spring.', hold: 3.8 },
                { speaker: 'Kaiser Wilhelm II', text: 'Home before the leaves fall, I told them. I was only a little late.', hold: 3 },
            ],
        },

        'race-to-the-sea': {
            kind: 'cinematic',
            id: 'race-to-the-sea',
            environment: 'western-front',
            next: 'explore-front',
            shots: [
                { path: [[0, 60, 160], [0, 22, 80]], lookPath: [[0, 0, 0]], duration: 7 },
                { path: [[0, 22, 80], [-30, 6, 56], [20, 5, 54]], lookPath: [[0, 2, 0], [0, 2, -40]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'On 9 September the German armies fall back to the river Aisne and dig in. The French and British try to get around them, and they try to get around the French and British, until both sides reach the sea.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'By Christmas a line of trenches runs about seven hundred kilometres from the English Channel to Switzerland. It will barely move for three years.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Verdun, 1916: ten months, about seven hundred thousand casualties. The Somme, the same year: nearly twenty thousand British soldiers killed on the first day alone.', hold: 4 },
            ],
        },

        'explore-front': {
            kind: 'explore',
            id: 'explore-front',
            environment: 'western-front',
            prompt: 'Explore the Western Front: drag to look around and click the glowing markers. A message is on its way from Berlin.',
            camera: { position: [36, 24, 110], target: [0, 2, 0] },
            hotspots: [
                {
                    id: 'trench',
                    position: [-14, 4, 52],
                    label: 'The Trench',
                    icon: '⛏',
                    title: 'Home for Three Years',
                    description:
                        'German trenches are deep and well built, some with concrete dugouts ten metres underground. Men spend a few days in the front line, then rotate back. Rats, lice, mud and the smell of the dead are everywhere.',
                },
                {
                    id: 'wire',
                    position: [12, 3, 36],
                    label: 'Barbed Wire',
                    icon: '〰️',
                    title: 'No Man\'s Land',
                    description:
                        'Between the lines lies a strip of shell holes and wire, sometimes only fifty metres wide. Attacking across it means walking into machine guns that can fire five hundred rounds a minute.',
                    effects: { chaos: 3 },
                },
                {
                    id: 'tank',
                    position: [-40, 6, -70],
                    label: 'The Tank',
                    icon: '🛞',
                    title: 'A New Weapon',
                    description:
                        'The British first sent tanks into battle on the Somme in September 1916. They are slow, unreliable and stiflingly hot inside, but bullets bounce off them and they crush the wire.',
                    effects: { strength: -2 },
                },
                {
                    id: 'sky',
                    position: [60, 46, -10],
                    label: 'Observation Balloon',
                    icon: '🎈',
                    title: 'War in the Air',
                    description:
                        'Balloons spot targets for the artillery, and fighter planes try to shoot them down. Manfred von Richthofen, the "Red Baron", is Germany\'s most famous pilot, with eighty victories before he is killed in April 1918.',
                },
                {
                    id: 'decide',
                    position: [0, 10, 60],
                    label: 'A Telegram',
                    icon: '📨',
                    title: 'Room 40',
                    description:
                        'January 1917. Britain\'s naval blockade is starving Germany. The Navy promises that unrestricted submarine warfare will knock Britain out within six months, even if it brings America into the war. The Foreign Office has an idea to keep America busy.',
                    advancesTo: 'zimmermann-choice',
                },
            ],
        },

        'zimmermann-choice': {
            kind: 'choice',
            id: 'zimmermann-choice',
            environment: 'berlin-1914',
            cast: [{ id: 'kaiser', position: [0, 0, -62], facing: 0, pose: 'think' }],
            title: 'Berlin · January 1917',
            prompt: 'The Foreign Secretary, Arthur Zimmermann, has written a coded telegram to Mexico: if America enters the war, Mexico should attack it and take back Texas, New Mexico and Arizona. Do you let it be sent?',
            camera: { position: [6, 5, -41], target: [0, 4, -62] },
            options: [
                {
                    id: 'send',
                    label: 'Send the Telegram',
                    icon: '📨',
                    description: 'Resume unrestricted submarine warfare and give America a war of its own at home. The code is unbreakable, Zimmermann says.',
                    effects: { chaos: 12, diplomacy: -10 },
                    flags: ['sent-telegram'],
                    next: 'america-enters',
                },
                {
                    id: 'cancel',
                    label: 'Tear It Up',
                    icon: '🗑',
                    description: 'Keep the submarines on a leash and America neutral. Ask President Wilson to mediate instead.',
                    effects: { diplomacy: 12, strength: -4 },
                    flags: ['no-telegram'],
                    next: 'stalemate',
                },
            ],
        },

        stalemate: {
            kind: 'cinematic',
            id: 'stalemate',
            environment: 'western-front',
            next: 'ending',
            shots: [
                { path: [[30, 10, 70], [-20, 30, 0]], lookPath: [[0, 2, -20]], duration: 8 },
                { path: [[-20, 30, 0], [0, 70, 160]], lookPath: [[0, 0, 0]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Without America, the Allies run short of money and food in 1917. The French army mutinies after another failed offensive. Russia collapses into revolution. Nobody can win.', hold: 4 },
                { speaker: 'Woodrow Wilson', text: 'It must be a peace without victory. Only a peace between equals can last.', hold: 3.2 },
                { speaker: 'The Chronicle', text: 'In Stockholm, delegates from every power sit down at the same table. The guns on the Western Front fall silent at the end of the year.', hold: 3.6 },
            ],
        },

        'america-enters': {
            kind: 'cinematic',
            id: 'america-enters',
            environment: 'washington-1917',
            next: 'kaiserschlacht-battle',
            cast: [{ id: 'wilson', position: [0, 0, -44], facing: 0, pose: 'command' }],
            shots: [
                { path: [[0, 20, 40], [0, 6, -18]], lookPath: [[0, 14, -80], [0, 5, -44]], duration: 8 },
                { path: [[0, 6, -18], [9, 5, -24]], lookPath: [[0, 4.5, -44]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'British codebreakers in Room 40 read the telegram and pass it to the Americans. It is printed in every newspaper on 1 March 1917. German submarines are already sinking American ships.', hold: 4 },
                { speaker: 'Woodrow Wilson', text: 'The world must be made safe for democracy. America is privileged to spend her blood and her might for the principles that gave her birth.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Wilson was re-elected only months ago with the slogan "He kept us out of war". On 6 April 1917, the United States declares war on Germany.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'In Russia, revolution topples the Tsar, and then the Bolsheviks make peace with Germany. Fifty German divisions come west by train for one last throw of the dice.', hold: 3.8 },
            ],
        },

        'kaiserschlacht-battle': { kind: 'battle', id: 'kaiserschlacht-battle', environment: 'western-front', battle: kaiserschlacht },

        'peace-1918': {
            kind: 'cinematic',
            id: 'peace-1918',
            environment: 'western-front',
            next: 'ending',
            shots: [
                { path: [[0, 8, 70], [0, 14, -20]], lookPath: [[0, 2, -60]], duration: 7 },
                { path: [[0, 14, -20], [0, 60, -160]], lookPath: [[0, 0, -300]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Amiens falls in April. The British fall back toward the Channel ports and the French toward Paris, and for the first time the two armies cannot help each other.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Germany is too exhausted to finish the job, and the Allies are too shaken to counter-attack. With American troops still arriving, both sides agree to talk.', hold: 3.8 },
                { speaker: 'Kaiser Wilhelm II', text: 'We did not win. But we did not lose, and that will have to be enough.', hold: 3 },
            ],
        },

        'hundred-days': {
            kind: 'cinematic',
            id: 'hundred-days',
            environment: 'western-front',
            next: 'armistice-choice',
            shots: [
                { path: [[0, 10, -80], [0, 8, 20]], lookPath: [[0, 2, 60]], duration: 7 },
                { path: [[0, 8, 20], [30, 40, 140]], lookPath: [[0, 0, 0]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The offensive stalls in front of Amiens. On 8 August, British, Australian and Canadian troops attack there with hundreds of tanks. General Ludendorff calls it "the black day of the German army".', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'Over the next hundred days the Allies push the Germans back across France. More than a million Americans are now in France, and ten thousand more arrive every day.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Germany\'s allies give up one by one. In early November, the sailors at Kiel mutiny rather than sail on a suicide mission, and red flags go up over German cities.', hold: 3.8 },
            ],
        },

        'armistice-choice': {
            kind: 'choice',
            id: 'armistice-choice',
            environment: 'berlin-1914',
            cast: [{ id: 'kaiser', position: [0, 0, -62], facing: 0, pose: 'think' }],
            title: 'November 1918',
            prompt: 'Your generals say the army will no longer fight for you. Revolutionaries are marching in Berlin. In a railway carriage in the forest of Compiègne, Marshal Foch is waiting with the Allied terms.',
            camera: { position: [6, 5, -41], target: [0, 4, -62] },
            options: [
                {
                    id: 'accept',
                    label: 'Abdicate and Sign',
                    icon: '🕊',
                    description: 'Give up the throne, go into exile, and let the new government accept the armistice. The terms are harsh, but the killing stops.',
                    effects: { diplomacy: 10, chaos: -6 },
                    flags: ['accepted-armistice'],
                    next: 'armistice',
                },
                {
                    id: 'refuse',
                    label: 'Fight to the Last',
                    icon: '⚔️',
                    description: 'Lead the army back into Germany and defend the Rhine. The empire will not surrender while you live.',
                    effects: { strength: 6, chaos: 14 },
                    flags: ['fought-on'],
                    next: 'last-stand',
                },
            ],
        },

        armistice: {
            kind: 'cinematic',
            id: 'armistice',
            environment: 'compiegne',
            next: 'ending',
            shots: [
                { path: [[30, 20, 50], [12, 6, 16]], lookPath: [[0, 3, -10]], duration: 8 },
                { path: [[12, 6, 16], [0, 5, 14]], lookPath: [[-6, 3, -10]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Kaiser crosses into the Netherlands on 10 November and never comes back. At about five the next morning, German delegates sign the armistice in Marshal Foch\'s railway carriage.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'It takes effect at eleven o\'clock: the eleventh hour of the eleventh day of the eleventh month. Men are still dying on the front line in the final minutes.', hold: 4 },
                { speaker: 'The Chronicle', text: 'About nine million soldiers are dead, and millions of civilians. Four empires have fallen: German, Austrian, Russian and Ottoman.', hold: 3.6 },
            ],
        },

        'last-stand': {
            kind: 'cinematic',
            id: 'last-stand',
            environment: 'western-front',
            next: 'ending',
            shots: [
                { path: [[0, 6, 70], [0, 20, 20]], lookPath: [[0, 2, -40]], duration: 7 },
                { path: [[0, 20, 20], [0, 50, 160]], lookPath: [[0, 0, 0]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The war goes on into 1919. The Allies cross the Rhine with thousands of tanks and a million Americans, and German cities are bombed from the air for the first time on a large scale.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Berlin falls in the spring. Germany is occupied and divided, and nobody can claim that its army was "stabbed in the back". The Kaiser is put on trial, as the Allies had promised.', hold: 4 },
            ],
        },

        ending: { kind: 'ending', id: 'ending' },
    },

    endings: [
        {
            id: 'long-peace',
            title: 'The Long Peace',
            subtitle: 'The car drives away · no Great War',
            icon: '🕊',
            color: '#10B981',
            linkedTimelineId: 'long-peace',
            priority: 10,
            requiresFlags: ['sped-away'],
            epilogue: [
                { text: 'Franz Ferdinand becomes Emperor in 1916. He turns Austria-Hungary into a federation of equal nations, and the Balkans settle into an uneasy calm.', hold: 3.8 },
                { text: 'There is no Lenin in power, no Hitler, no Holocaust and no Second World War. The Belle Époque simply keeps going, with its kings, its colonies and its injustices.', hold: 3.8 },
                { text: 'The European empires last far longer than in our history, and they are only slowly forced to give up their colonies over the course of the century.', hold: 3.4 },
            ],
        },
        {
            // Same reality as long-peace, reached through diplomacy in July 1914.
            id: 'long-peace-belgrade',
            title: 'The Long Peace',
            subtitle: 'Halt in Belgrade · the crisis is talked down',
            icon: '🕊',
            color: '#10B981',
            linkedTimelineId: 'long-peace',
            priority: 10,
            requiresFlags: ['halt-belgrade'],
            epilogue: [
                { text: 'The July Crisis becomes a footnote, like the crises of 1905 and 1911 before it. The great powers learn that conferences work, and they keep holding them.', hold: 3.8 },
                { text: 'Without the war, the Russian Tsar survives longer and reforms slowly. There is no Soviet Union, no Nazi Germany and no Second World War.', hold: 3.6 },
                { text: 'Kaiser Wilhelm dies on the throne in 1941, remembered as an embarrassing emperor who, once, did the right thing.', hold: 3.4 },
            ],
        },
        {
            id: 'german-victory',
            title: 'Pax Germanica',
            subtitle: 'Paris falls in 1914 · Germany dominates Europe',
            icon: '👑',
            color: '#1F2937',
            linkedTimelineId: 'german-victory',
            priority: 10,
            requiresFlags: ['marne:won'],
            epilogue: [
                { text: 'The war is over by Christmas after all. Germany takes Belgium\'s ports and a belt of French iron country, and builds a customs union, "Mitteleuropa", from the North Sea to the Black Sea.', hold: 4 },
                { text: 'Defeated France turns to revolution, and Britain to bitter isolation. There is no Hitler, because Germany never loses, but the Kaiser\'s Europe is no friend of democracy.', hold: 3.8 },
                { text: 'Berlin becomes the capital of science and industry. The twentieth century speaks German.', hold: 3.2 },
            ],
        },
        {
            id: 'negotiated-peace',
            title: 'Peace Without Victory',
            subtitle: 'No telegram · America stays out · peace in 1917',
            icon: '🤝',
            color: '#6B7280',
            linkedTimelineId: 'negotiated-peace',
            priority: 10,
            requiresFlags: ['no-telegram'],
            epilogue: [
                { text: 'The Treaty of Stockholm restores the borders of 1914. Everyone goes home, and everyone feels cheated, but nobody is humiliated.', hold: 3.6 },
                { text: 'Russia\'s fragile democracy survives without the Bolsheviks. Germany gets no Versailles, no runaway inflation and no Hitler.', hold: 3.6 },
                { text: 'President Wilson\'s League of Nations, born from the peace he brokered, actually has America as a member.', hold: 3.2 },
            ],
        },
        {
            // Same reality as negotiated-peace, reached by winning the 1918 offensive.
            id: 'negotiated-peace-1918',
            title: 'Peace Without Victory',
            subtitle: 'The Kaiser\'s Battle succeeds · a peace of exhaustion',
            icon: '🤝',
            color: '#6B7280',
            linkedTimelineId: 'negotiated-peace',
            priority: 10,
            requiresFlags: ['kaiserschlacht:won'],
            epilogue: [
                { text: 'The peace of 1918 leaves Germany holding much of Belgium and the East it took from Russia. America, angry and unbeaten, goes home and arms itself.', hold: 3.8 },
                { text: 'There is no "stab in the back" myth and no Versailles, but a cold war between the monarchies of Central Europe and the democracies of the West lasts for decades.', hold: 3.8 },
            ],
        },
        {
            id: 'total-defeat',
            title: 'Unconditional Surrender',
            subtitle: 'The Kaiser fights on · Germany is occupied in 1919',
            icon: '🏚',
            color: '#7F1D1D',
            priority: 9,
            requiresFlags: ['fought-on'],
            epilogue: [
                { text: 'A million more people die in the war\'s last year. Germany is occupied, and everyone can see it was beaten on the battlefield.', hold: 3.6 },
                { text: 'Without the lie that the army was betrayed at home, Hitler\'s favourite story never takes hold. Out of the ruins, a cautious German republic is built under Allied watch, a generation early.', hold: 3.8 },
            ],
        },
        {
            id: 'versailles',
            title: 'The War to End All Wars',
            subtitle: 'The history you know: armistice, Versailles, and a twenty-year truce',
            icon: '🎖',
            color: '#7C3AED',
            priority: 8,
            requiresFlags: ['accepted-armistice'],
            epilogue: [
                { text: 'The Treaty of Versailles is signed on 28 June 1919, five years to the day after the shots in Sarajevo. Germany loses territory and its colonies, must pay huge reparations, and has to accept the blame for the war.', hold: 4.2 },
                { text: 'The US Senate refuses to join Wilson\'s League of Nations. In Germany, many believe their army was never really beaten, only betrayed.', hold: 3.6 },
                { text: 'A French marshal, Ferdinand Foch, reads the treaty and says: "This is not peace. It is an armistice for twenty years." He is out by sixty-five days.', hold: 3.8 },
            ],
        },
    ],
};
