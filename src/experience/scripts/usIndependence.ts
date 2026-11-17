/* The US Independence interactive episode: Philadelphia 1776 → six realities. */
import type { BattleConfig, ExperienceScript } from '../types';

const BRITISH = { side: 'enemy' as const, color: '#b3262b', accentColor: '#f2efe6' };
const CONTINENTAL = { side: 'player' as const, color: '#3a5bb5', accentColor: '#efe0b4' };

/** Yorktown, October 1781. Three variants share the siege; the alliance you made in Paris decides the odds. */
function yorktown(variant: 'allied' | 'protectorate' | 'alone'): BattleConfig {
    const alone = variant === 'alone';
    return {
        id: 'yorktown',
        name: 'The Siege of Yorktown',
        era: 'musket',
        theme: 'colonial',
        objective: alone
            ? 'October 1781. No French fleet, no French regiments: only the Continental Army against Cornwallis\'s entrenched redcoats, with the Royal Navy on its way. Break the British line before relief arrives.'
            : 'October 1781. Cornwallis is dug in at Yorktown with his back to the river, and the French fleet holds the bay. Take the redoubts, break the British line, and force a surrender.',
        player:
            variant === 'protectorate'
                ? { ...CONTINENTAL, name: 'Army of the King of France', color: '#e7e3d6', accentColor: '#24408f', infantry: 140, cavalry: 30, archers: 40, attack: 1.05, defense: 1.0 }
                : alone
                  ? { ...CONTINENTAL, name: 'Continental Army', infantry: 110, cavalry: 15, archers: 40, attack: 1.0, defense: 1.0 }
                  : { ...CONTINENTAL, name: 'Continental & French Army', infantry: 130, cavalry: 25, archers: 40, attack: 1.05, defense: 1.05 },
        enemy: alone
            ? { ...BRITISH, name: 'Cornwallis\'s Army', infantry: 125, cavalry: 25, archers: 30, attack: 1.05, defense: 1.15 }
            : { ...BRITISH, name: 'Cornwallis\'s Army', infantry: 140, cavalry: 20, archers: 30, attack: 1.05, defense: 1.2 },
        commander: 'washington',
        onVictory: variant === 'protectorate' ? 'french-victory' : alone ? 'surrender-alone' : 'surrender',
        onDefeat: 'yorktown-defeat',
        events: [
            {
                id: 'siege-guns',
                atTime: 10,
                title: 'The Siege Lines',
                prompt: 'Your engineers have dug the first parallel six hundred yards from the British works. The guns are in place.',
                options: [
                    {
                        id: 'grand-battery',
                        label: 'Open the Grand Battery',
                        icon: '💥',
                        description: 'Every gun fires at once. Washington is said to have touched off the first shot himself.',
                        effects: { strength: 4 },
                        mod: { catapultBarrage: 14, attackMult: 1.08 },
                    },
                    {
                        id: 'dig-closer',
                        label: 'Dig a Second Parallel',
                        icon: '⛏',
                        description: 'Patience: trench closer under cover before you show your hand.',
                        effects: { diplomacy: 2 },
                        mod: { defenseMult: 1.2, attackMult: 1.04 },
                    },
                ],
            },
            {
                id: 'redoubts',
                atTime: 28,
                title: 'Redoubts 9 and 10',
                prompt: 'Two earth forts guard the end of the British line. They must fall tonight.',
                options: [
                    {
                        id: 'bayonets',
                        label: 'Bayonets Only, in the Dark',
                        icon: '🗡️',
                        description: 'Unloaded muskets so no shot gives you away. Alexander Hamilton asks to lead the column.',
                        effects: { strength: 3, chaos: 2 },
                        mod: { attackMult: 1.25, moraleShift: -0.05 },
                    },
                    {
                        id: 'bombard',
                        label: 'Pound Them First',
                        icon: '🎯',
                        description: 'Safer for your men, slower, and the British get time to reinforce.',
                        mod: { catapultBarrage: 10, enemyReinforcements: 10 },
                    },
                ],
            },
            alone
                ? {
                      id: 'relief-fleet',
                      atTime: 46,
                      title: 'Sails on the Horizon',
                      prompt: 'Without a French fleet to stop it, a Royal Navy squadron is coming up the bay with fresh regiments.',
                      options: [
                          {
                              id: 'storm-now',
                              label: 'Storm the Lines Now',
                              icon: '⚔️',
                              description: 'Everything at once, before the ships can land a single man.',
                              effects: { chaos: 4, strength: 2 },
                              mod: { attackMult: 1.2, moraleShift: -0.12 },
                          },
                          {
                              id: 'fire-ships',
                              label: 'Send Fire Ships Downriver',
                              icon: '🔥',
                              description: 'Burning hulks drift at the anchored squadron. If they catch, the relief never lands.',
                              effects: { chaos: 3 },
                              mod: { enemyAttackMult: 0.85, enemyReinforcements: 12 },
                          },
                      ],
                  }
                : {
                      id: 'escape',
                      atTime: 46,
                      title: 'Cornwallis Tries the River',
                      prompt: 'At night the British load boats to slip across the York River to Gloucester Point. A storm is rising.',
                      options: [
                          {
                              id: 'fleet',
                              label: 'Signal the French Fleet',
                              icon: '⚓',
                              description: 'De Grasse\'s ships close the river mouth. There is nowhere left to run.',
                              effects: { diplomacy: 4 },
                              mod: { enemyAttackMult: 0.75, moraleShift: 0.2 },
                          },
                          {
                              id: 'press',
                              label: 'Hit Them While They Embark',
                              icon: '🐎',
                              description: 'Half their army is in the boats. Send the dragoons in.',
                              effects: { strength: 3 },
                              mod: { flankCavalry: 25 },
                          },
                      ],
                  },
            {
                id: 'sortie',
                whenMoraleBelow: { side: 'player', value: 0.55 },
                title: 'The British Sortie',
                prompt: 'Redcoats burst out of their works and spike your guns. Your line is giving ground.',
                options: [
                    {
                        id: 'washington-rides',
                        label: 'Washington Rides the Line',
                        icon: '🎖',
                        description: 'The commander in chief under fire, in plain view of every man.',
                        effects: { strength: 4 },
                        mod: { moraleShift: 0.35, attackMult: 1.1 },
                    },
                    {
                        id: 'hold',
                        label: 'Hold the Trenches',
                        icon: '🛡',
                        description: 'Let them come to you and break on the earthworks.',
                        mod: { defenseMult: 1.25 },
                    },
                ],
            },
        ],
    };
}

export const usIndependenceScript: ExperienceScript = {
    chapterId: 'us-independence',
    title: 'The Year the World Turned Upside Down',
    era: 'Philadelphia · 1776',
    startBeat: 'intro',
    initialStats: { chaos: 30, freedom: 55, diplomacy: 40, strength: 35 },
    defaultEnding: 'united-states',

    characters: {
        washington: {
            id: 'washington', name: 'George Washington', role: 'Commander in Chief, Continental Army',
            face: '/images/chapters/us-independence/faces/george-washington.webp',
            outfit: 'colonial-general', skin: '#d28f6b', hair: '#e6e1d6', robe: '#26386f', accent: '#e2cc95', breeches: '#e2cc95',
        },
        franklin: {
            id: 'franklin', name: 'Benjamin Franklin', role: 'Printer, scientist, diplomat',
            face: '/images/chapters/us-independence/faces/benjamin-franklin.webp',
            outfit: 'statesman', skin: '#ca906e', hair: '#d9d4cb', balding: true, robe: '#5b4330', accent: '#7a5c42', breeches: '#5b4330',
        },
        jefferson: {
            id: 'jefferson', name: 'Thomas Jefferson', role: 'Author of the Declaration',
            face: '/images/chapters/us-independence/faces/thomas-jefferson.webp',
            outfit: 'statesman', skin: '#c67d60', hair: '#b4624a', robe: '#6d2f2a', accent: '#c9a96a', breeches: '#efe6d2',
        },
        'king-george': {
            id: 'king-george', name: 'King George III', role: 'King of Great Britain',
            face: '/images/chapters/us-independence/faces/king-george-iii.webp',
            outfit: 'king', skin: '#ab6f4f', hair: '#ece7dc', robe: '#8c1023', accent: '#5a1d6e',
        },
    },

    beats: {
        // ── ACT I: Philadelphia ───────────────────────────────────────────
        intro: {
            kind: 'cinematic',
            id: 'intro',
            environment: 'philadelphia',
            next: 'explore-philadelphia',
            shots: [
                { path: [[170, 90, 170], [70, 40, 90]], lookPath: [[0, 12, -22]], duration: 7 },
                { path: [[70, 40, 90], [30, 12, 40], [-6, 8, 34]], lookPath: [[-14, 5, 14], [-14, 4, 14]], duration: 8 },
                { path: [[-6, 8, 34], [6, 6, 16], [0, 9, 6]], lookPath: [[0, 12, -18], [0, 18, -22]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Philadelphia, the summer of 1776. Thirteen British colonies have been at war with their own king for more than a year.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'The Continental Army has been beaten out of Canada. A British fleet of four hundred ships is sailing for New York. Most colonists still call themselves Englishmen.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Inside the Pennsylvania State House, the Second Continental Congress is about to vote on a resolution that would make every man in the room a traitor.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'In our history they signed it, survived eight years of war, and built a republic. In this one, nothing is decided yet. Walk the city. Then cast the vote.', hold: 3.5 },
            ],
        },

        'explore-philadelphia': {
            kind: 'explore',
            id: 'explore-philadelphia',
            environment: 'philadelphia',
            cast: [
                { id: 'franklin', position: [-5, 0, -6], facing: 0.35, pose: 'think' },
                { id: 'jefferson', position: [6, 0, -5], facing: -0.2 },
            ],
            prompt: 'Explore Philadelphia: drag to look around and click the glowing markers. Congress is waiting inside the State House.',
            camera: { position: [42, 26, 56], target: [0, 6, -6] },
            hotspots: [
                {
                    id: 'bell',
                    position: [-14, 7, 14],
                    label: 'The State House Bell',
                    icon: '🔔',
                    title: 'The Bell in the Yard',
                    description:
                        'Cast in 1752 and cracked on its very first ring, it bears a line from Leviticus: "Proclaim LIBERTY throughout all the Land unto all the Inhabitants thereof." Nobody calls it the Liberty Bell yet. Abolitionists will give it that name sixty years from now, because the promise on it does not yet include everyone.',
                    effects: { freedom: 2 },
                },
                {
                    id: 'print-shop',
                    position: [-38, 5, 38],
                    label: "Franklin's Print Shop",
                    icon: '📰',
                    title: 'The Most Famous Man in America',
                    description:
                        'Benjamin Franklin started here as a runaway printer\'s apprentice. His newspaper and Poor Richard\'s Almanack made him rich; his lightning experiments made him famous in every court in Europe. He is seventy years old, and Congress knows that if anyone can talk a European king into a war, it is him.',
                    effects: { diplomacy: 3 },
                },
                {
                    id: 'steeple',
                    position: [56, 14, 44],
                    label: 'Christ Church',
                    icon: '⛪',
                    title: 'The Tallest Building in America',
                    description:
                        'Christ Church steeple rises nearly two hundred feet, the highest point in the colonies. Washington, Franklin and a dozen delegates rent pews here. Its rector still prays for King George every Sunday. Within a month he will have to choose which prayer to say.',
                    effects: { chaos: 2 },
                },
                {
                    id: 'hall',
                    position: [0, 9, -13],
                    label: 'Enter the State House',
                    icon: '🏛',
                    title: 'The Assembly Room',
                    description:
                        'The windows are shut against spies and the room is stifling. Thomas Jefferson, thirty-three years old, has spent seventeen days drafting a declaration; Congress has spent two more cutting a quarter of it, including his passage condemning the slave trade. Now the delegates from twelve colonies must decide whether to adopt it. New York abstains.',
                    advancesTo: 'declaration-choice',
                },
            ],
        },

        'declaration-choice': {
            kind: 'choice',
            id: 'declaration-choice',
            environment: 'philadelphia',
            cast: [
                { id: 'jefferson', position: [-3, 0, -9], facing: 0.25, pose: 'command' },
                { id: 'franklin', position: [5, 0, -8], facing: -0.15, pose: 'think' },
            ],
            title: 'The Pennsylvania State House · July 1776',
            prompt: 'The question is called. How does this Congress vote?',
            camera: { position: [16, 9, 20], target: [1, 4, -9] },
            options: [
                {
                    id: 'declare',
                    label: 'Declare Independence',
                    icon: '📜',
                    description:
                        '"We hold these truths to be self-evident." Sign, and there is no going back: it is independence, or the gallows for everyone in this room.',
                    effects: { freedom: 12, chaos: 8 },
                    flags: ['declared'],
                    next: 'london-reaction',
                },
                {
                    id: 'olive-branch',
                    label: 'Send Franklin to Negotiate',
                    icon: '🕊',
                    description:
                        'One last try. Franklin lived in London for fifteen years and knows every minister. Ask for self-government inside the empire, the way Canada and Australia will one day get it.',
                    effects: { diplomacy: 12, freedom: -5 },
                    flags: ['olive-branch'],
                    next: 'london-talks',
                },
            ],
        },

        // ── The King's answer ──────────────────────────────────────────────
        'london-reaction': {
            kind: 'cinematic',
            id: 'london-reaction',
            environment: 'london',
            next: 'valley-forge-intro',
            cast: [{ id: 'king-george', position: [0, 0, -6], facing: 0, pose: 'command' }],
            shots: [
                { path: [[0, 30, 130], [0, 14, 60]], lookPath: [[0, 10, -26]], duration: 7 },
                { path: [[0, 14, 60], [14, 7, 14], [6, 5, 6]], lookPath: [[0, 5, -6]], duration: 8 },
                { path: [[6, 5, 6], [40, 30, 50]], lookPath: [[0, 6, -10]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Declaration reaches London in August. King George III is thirty-eight, devout, hard-working, and certain that a king who lets one colony go will soon lose them all. Two years ago he warned his Prime Minister:', hold: 3.8 },
                { speaker: 'King George III', text: 'The die is now cast. The colonies must either submit or triumph.', hold: 3.2 },
                { speaker: 'The Chronicle', text: 'Britain sends the largest expeditionary force it has ever put to sea. By winter the Americans have lost New York, and in 1777 the British take Philadelphia itself.', hold: 3.8 },
            ],
        },

        'london-talks': {
            kind: 'choice',
            id: 'london-talks',
            environment: 'london',
            cast: [
                { id: 'king-george', position: [-6, 0, -6], facing: 0.7, pose: 'command' },
                { id: 'franklin', position: [8, 0, -3], facing: -0.9, pose: 'think' },
            ],
            title: 'Buckingham House · Autumn 1776',
            prompt: 'The King offers terms: a colonial parliament, but taxes and the army stay with the Crown.',
            camera: { position: [6, 9, 34], target: [1, 4, -5] },
            options: [
                {
                    id: 'dominion',
                    label: 'Accept a Dominion',
                    icon: '👑',
                    description:
                        'Half a loaf. Americans run their own assemblies and stay British subjects. No war, no republic, and every grievance left to be settled later.',
                    effects: { diplomacy: 10, freedom: -10, chaos: -10 },
                    flags: ['dominion'],
                    next: 'dominion-cinematic',
                },
                {
                    id: 'walk-out',
                    label: 'Walk Out and Declare',
                    icon: '🚪',
                    description:
                        'Franklin sails home and Congress declares independence months late. The war begins anyway, and America has lost precious time.',
                    effects: { freedom: 8, chaos: 10, strength: -5 },
                    flags: ['declared', 'late-declaration'],
                    next: 'valley-forge-intro',
                },
            ],
        },

        'dominion-cinematic': {
            kind: 'cinematic',
            id: 'dominion-cinematic',
            environment: 'london',
            next: 'ending',
            cast: [
                { id: 'king-george', position: [-6, 0, -6], facing: 0.7 },
                { id: 'franklin', position: [8, 0, -3], facing: -0.9 },
            ],
            shots: [
                { path: [[6, 9, 34], [2, 6, 18]], lookPath: [[1, 4, -5]], duration: 8 },
                { path: [[4, 6, 14], [0, 40, 110]], lookPath: [[0, 10, -26]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The treaty is signed in the King\'s own drawing room. Franklin calls it "the best bad bargain an honest man ever made."', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'There is no Declaration, no Valley Forge, no Yorktown. The Thirteen Colonies become the Dominion of America, loyal and restless.', hold: 3.5 },
            ],
        },

        // ── ACT II: Valley Forge ───────────────────────────────────────────
        'valley-forge-intro': {
            kind: 'cinematic',
            id: 'valley-forge-intro',
            environment: 'valley-forge',
            next: 'valley-forge-choice',
            cast: [{ id: 'washington', position: [-4, 0, 24], facing: 0.6, pose: 'think' }],
            shots: [
                { path: [[110, 60, 110], [40, 22, 60]], lookPath: [[0, 3, -10]], duration: 7 },
                { path: [[40, 22, 60], [10, 6, 40], [2, 5, 32]], lookPath: [[-4, 3, 24]], duration: 8 },
                { path: [[2, 5, 32], [-30, 14, 40], [-50, 20, 10]], lookPath: [[0, 3, -16]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Valley Forge, Pennsylvania. December 1777. Twelve thousand men march into winter camp eighteen miles from British-held Philadelphia.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'Many have no shoes; you can follow the army by the blood in the snow. They build log huts with their own hands. Typhus and smallpox move faster than any redcoat.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Before spring, nearly two thousand of them will die here without ever seeing a battle. George Washington has to decide what to do with the men who are left.', hold: 3.5 },
            ],
        },

        'valley-forge-choice': {
            kind: 'choice',
            id: 'valley-forge-choice',
            environment: 'valley-forge',
            cast: [{ id: 'washington', position: [-4, 0, 24], facing: 0.6, pose: 'command' }],
            title: 'Valley Forge · February 1778',
            prompt: 'The army is starving and sick. What are the orders?',
            camera: { position: [24, 12, 50], target: [-2, 4, 18] },
            options: [
                {
                    id: 'steuben',
                    label: 'Drill, Inoculate, Endure',
                    icon: '🥁',
                    description:
                        'A Prussian volunteer, Baron von Steuben, offers to drill the army from scratch, and the surgeons want to inoculate every man against smallpox. Slow, unglamorous, and exactly what happened.',
                    effects: { strength: 12, chaos: -4 },
                    flags: ['drilled'],
                    next: 'paris-choice',
                },
                {
                    id: 'raid',
                    label: 'Strike Philadelphia',
                    icon: '❄️',
                    description:
                        'The British are sleeping warm in our capital while we freeze. March through the snow and take it back, food, quarters and all.',
                    effects: { strength: 4, chaos: 8 },
                    flags: ['raided'],
                    next: 'philadelphia-raid',
                },
            ],
        },

        'philadelphia-raid': {
            kind: 'battle',
            id: 'philadelphia-raid',
            environment: 'philadelphia-winter',
            battle: {
                id: 'philadelphia-raid',
                name: 'The Winter Assault on Philadelphia',
                era: 'musket',
                theme: 'colonial',
                objective:
                    'February 1778. Half-starved Continentals against the best-fed army in America, in the snow outside Philadelphia. Break the British line before your own men break from cold and hunger.',
                player: { ...CONTINENTAL, name: 'Continental Army', infantry: 100, cavalry: 15, archers: 35, attack: 1.0, defense: 0.92 },
                enemy: { ...BRITISH, name: 'Howe\'s Garrison', infantry: 105, cavalry: 25, archers: 20, attack: 1.05, defense: 1.05 },
                commander: 'washington',
                onVictory: 'paris-choice',
                onDefeat: 'captured',
                events: [
                    {
                        id: 'snowstorm',
                        atTime: 12,
                        title: 'A Snowstorm Rolls In',
                        prompt: 'Visibility drops to fifty yards. The British pickets can barely see their own campfires.',
                        options: [
                            {
                                id: 'attack-storm',
                                label: 'Attack Under the Storm',
                                icon: '🌨',
                                description: 'Surprise is the only advantage a hungry army has.',
                                effects: { chaos: 3 },
                                mod: { attackMult: 1.2, moraleShift: -0.08 },
                            },
                            {
                                id: 'guns-first',
                                label: 'Bring Up Knox\'s Guns',
                                icon: '💥',
                                description: 'Henry Knox, a former bookseller, has made himself the army\'s artillery chief.',
                                effects: { strength: 2 },
                                mod: { catapultBarrage: 10 },
                            },
                        ],
                    },
                    {
                        id: 'stone-house',
                        atTime: 30,
                        title: 'The Stone House',
                        prompt: 'British light infantry have barricaded themselves in a stone mansion behind their line. At Germantown, a house exactly like this one cost Washington the battle.',
                        options: [
                            {
                                id: 'bypass',
                                label: 'Bypass It, Hit the Flank',
                                icon: '🐎',
                                description: 'Leave a guard and send the dragoons around. Learn from Germantown.',
                                effects: { strength: 3 },
                                mod: { flankCavalry: 20 },
                            },
                            {
                                id: 'besiege',
                                label: 'Reduce the House',
                                icon: '🏚',
                                description: 'Never leave a fortress in your rear, the textbooks say. It costs time, and the British use it.',
                                effects: { chaos: 4 },
                                mod: { catapultBarrage: 6, enemyReinforcements: 25 },
                            },
                        ],
                    },
                    {
                        id: 'frostbite',
                        whenMoraleBelow: { side: 'player', value: 0.5 },
                        title: 'The Line Is Freezing',
                        prompt: 'Men are dropping from cold as much as from musket balls.',
                        options: [
                            {
                                id: 'washington-forward',
                                label: 'Washington Rides Forward',
                                icon: '🎖',
                                description: 'He did it at Princeton: rode between the lines, and the army followed him.',
                                effects: { strength: 4 },
                                mod: { moraleShift: 0.35, attackMult: 1.1 },
                            },
                            {
                                id: 'form-square',
                                label: 'Close Ranks and Hold',
                                icon: '🛡',
                                description: 'Survive the next hour and let the British wear themselves out.',
                                mod: { defenseMult: 1.4 },
                            },
                        ],
                    },
                ],
            },
        },

        captured: {
            kind: 'cinematic',
            id: 'captured',
            environment: 'philadelphia-winter',
            next: 'ending',
            shots: [
                { path: [[40, 18, 60], [10, 8, 30]], lookPath: [[0, 3, 0]], duration: 8 },
                { path: [[10, 8, 30], [70, 50, 90]], lookPath: [[0, 4, -40]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The assault breaks in the snow. British dragoons ride down the retreat, and by nightfall George Washington is a prisoner of the Crown.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'Without him the army dissolves within weeks. In Paris, the French ministers quietly put away the treaty they had been drafting.', hold: 3.5 },
            ],
        },

        // ── Versailles: the alliance ───────────────────────────────────────
        'paris-choice': {
            kind: 'choice',
            id: 'paris-choice',
            environment: 'versailles',
            cast: [{ id: 'franklin', position: [-2, 0, 6], facing: 0.4, pose: 'think' }],
            title: 'Versailles · February 1778',
            prompt: 'After a British army surrendered at Saratoga, King Louis XVI is ready to deal. Franklin must decide the price.',
            camera: { position: [20, 10, 36], target: [-1, 5, -8] },
            options: [
                {
                    id: 'equal-alliance',
                    label: 'An Alliance of Equals',
                    icon: '🤝',
                    description:
                        'France recognizes the United States, and neither side makes a separate peace. This is the treaty Franklin actually signed on February 6, 1778.',
                    effects: { diplomacy: 10, strength: 6 },
                    flags: ['alliance'],
                    next: 'yorktown-allied',
                },
                {
                    id: 'protectorate',
                    label: 'Accept French Protection',
                    icon: '⚜️',
                    description:
                        'Louis offers twice the troops and the whole Atlantic fleet. In exchange, America\'s foreign policy and its western lands answer to Versailles.',
                    effects: { strength: 14, freedom: -12 },
                    flags: ['protectorate'],
                    next: 'yorktown-protectorate',
                },
                {
                    id: 'go-alone',
                    label: 'Fight Alone',
                    icon: '🦅',
                    description:
                        'No foreign king will own a share of this revolution. Americans will win it themselves, or not at all.',
                    effects: { freedom: 10, strength: -6, chaos: 6 },
                    flags: ['alone'],
                    next: 'yorktown-alone',
                },
            ],
        },

        // ── ACT III: Yorktown ──────────────────────────────────────────────
        'yorktown-allied': { kind: 'battle', id: 'yorktown-allied', environment: 'yorktown', battle: yorktown('allied') },
        'yorktown-protectorate': { kind: 'battle', id: 'yorktown-protectorate', environment: 'yorktown', battle: yorktown('protectorate') },
        'yorktown-alone': { kind: 'battle', id: 'yorktown-alone', environment: 'yorktown', battle: yorktown('alone') },

        surrender: {
            kind: 'cinematic',
            id: 'surrender',
            environment: 'yorktown',
            next: 'convention-choice',
            cast: [{ id: 'washington', position: [0, 0, 30], facing: Math.PI, pose: 'command' }],
            shots: [
                { path: [[0, 30, 110], [0, 12, 50]], lookPath: [[0, 4, -40]], duration: 8 },
                { path: [[0, 12, 50], [10, 5, 38], [4, 4, 36]], lookPath: [[0, 3, 30]], duration: 8 },
                { path: [[4, 4, 36], [-60, 40, 40], [-90, 60, -40]], lookPath: [[0, 2, -110]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'October 19, 1781. Eight thousand British soldiers march out between a line of Americans and a line of Frenchmen and lay down their muskets.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Legend says their band played "The World Turned Upside Down." In London, the Prime Minister hears the news and cries out: "Oh God, it is all over."', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'The war is won. Six years later the peace is falling apart, and the delegates come back to the same room in Philadelphia.', hold: 3.5 },
            ],
        },

        'surrender-alone': {
            kind: 'cinematic',
            id: 'surrender-alone',
            environment: 'yorktown',
            next: 'convention-choice',
            cast: [{ id: 'washington', position: [0, 0, 30], facing: Math.PI, pose: 'command' }],
            shots: [
                { path: [[0, 30, 110], [0, 12, 50]], lookPath: [[0, 4, -40]], duration: 8 },
                { path: [[0, 12, 50], [10, 5, 38], [4, 4, 36]], lookPath: [[0, 3, 30]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Against every expectation, an American army with no foreign help forces a British army to surrender. Europe is stunned.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'The new nation owes nothing to anyone, and it is broke, exhausted and proud. In 1787 its leaders meet again in Philadelphia to decide what it will become.', hold: 3.8 },
            ],
        },

        'french-victory': {
            kind: 'cinematic',
            id: 'french-victory',
            environment: 'yorktown',
            next: 'ending',
            cast: [{ id: 'washington', position: [0, 0, 30], facing: Math.PI }],
            shots: [
                { path: [[0, 30, 110], [0, 14, 50]], lookPath: [[0, 4, -40]], duration: 8 },
                { path: [[0, 14, 50], [80, 50, -40]], lookPath: [[0, 2, -120]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Cornwallis surrenders his sword to a French general. The white banners of the Bourbon kings fly over Yorktown, above the Stars and Stripes.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'America is free of Britain. Whether it is free is a question the treaty answers in Versailles, not in Philadelphia.', hold: 3.5 },
            ],
        },

        'yorktown-defeat': {
            kind: 'cinematic',
            id: 'yorktown-defeat',
            environment: 'yorktown',
            next: 'ending',
            shots: [
                { path: [[40, 20, 70], [10, 10, 40]], lookPath: [[0, 4, 0]], duration: 8 },
                { path: [[10, 10, 40], [80, 60, 100]], lookPath: [[0, 4, 0]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The redoubts hold. Cornwallis breaks out, the siege collapses, and the army that was supposed to end the war is scattered across Virginia.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'Congress cannot pay its soldiers for another campaign. One by one, the states open talks with the Crown.', hold: 3.5 },
            ],
        },

        'convention-choice': {
            kind: 'choice',
            id: 'convention-choice',
            environment: 'philadelphia',
            cast: [
                { id: 'washington', position: [-4, 0, -8], facing: 0.25, pose: 'command' },
                { id: 'franklin', position: [5, 0, -7], facing: -0.2, pose: 'think' },
            ],
            title: 'The Constitutional Convention · 1787',
            prompt: 'The Articles of Confederation are failing: Congress cannot tax, cannot pay its debts, and cannot stop the states quarreling. What replaces them?',
            camera: { position: [16, 9, 20], target: [1, 4, -8] },
            options: [
                {
                    id: 'constitution',
                    label: 'A Strong Federal Constitution',
                    icon: '⚖️',
                    description:
                        'A national government with its own taxes, an elected president and a Supreme Court, held in check by separated powers. Washington presides; Franklin, at eighty-one, urges everyone to sign.',
                    effects: { strength: 10, freedom: 8, chaos: -8 },
                    flags: ['constitution'],
                    next: 'ending',
                },
                {
                    id: 'confederation',
                    label: 'Keep Power with the States',
                    icon: '🗺',
                    description:
                        'We did not throw off one distant ruler to crown another. Patch the Articles and leave the real power in thirteen state capitals.',
                    effects: { freedom: 6, chaos: 12, strength: -8 },
                    flags: ['confederation'],
                    next: 'ending',
                },
            ],
        },

        ending: { kind: 'ending', id: 'ending' },
    },

    endings: [
        {
            id: 'french-america',
            title: 'French America',
            subtitle: 'Free of London, bound to Versailles',
            icon: '⚜️',
            color: '#2563EB',
            linkedTimelineId: 'french-america',
            priority: 10,
            requiresFlags: ['protectorate', 'yorktown:won'],
            epilogue: [
                { text: 'The United States is born a French protectorate. French officers train its army, French bankers hold its debts, and French becomes the language of its courts and colleges.', hold: 3.8 },
                { text: 'With America\'s wealth behind it, the French monarchy pays its bills and never calls the Estates-General. There is no French Revolution in 1789.', hold: 3.8 },
                { text: 'Two centuries on, a Franco-American bloc dominates the Atlantic, and Louisiana is the heart of the continent rather than its edge.', hold: 3.5 },
            ],
        },
        {
            id: 'republic-alone',
            title: 'The Republic That Stood Alone',
            subtitle: 'Independence won without a single ally',
            icon: '🦅',
            color: '#0F766E',
            priority: 9,
            requiresFlags: ['alone', 'constitution'],
            epilogue: [
                { text: 'An America that won its freedom alone trusts no one. It stays out of every European war, trades with everyone, and allies with no one for a hundred and fifty years.', hold: 3.8 },
                { text: 'France, never bankrupted by an American war, delays its own revolution by a generation.', hold: 3.2 },
                { text: 'The Constitution of 1787 survives all the same: the one invention of this reality that turns out exactly as it did in ours.', hold: 3.5 },
            ],
        },
        {
            id: 'united-states',
            title: 'A More Perfect Union',
            subtitle: 'The history you know, and what it cost',
            icon: '🇺🇸',
            color: '#1D4ED8',
            priority: 8,
            requiresFlags: ['constitution'],
            epilogue: [
                { text: 'The Constitution is ratified in 1788, and George Washington becomes the first President, then does something kings never do: after two terms he goes home.', hold: 3.8 },
                { text: 'The bill comes due elsewhere. France goes bankrupt paying for the war and has its own revolution in 1789. And the Constitution protects slavery, a compromise that leads to civil war seventy years later.', hold: 4 },
                { text: 'This is the reality you are reading this in: an experiment that is still running.', hold: 3.2 },
            ],
        },
        {
            id: 'confederated-states',
            title: 'The Confederated States',
            subtitle: 'Thirteen countries, one weak treaty',
            icon: '🗺',
            color: '#7C3AED',
            linkedTimelineId: 'confederated-states',
            priority: 8,
            requiresFlags: ['confederation'],
            epilogue: [
                { text: 'The Articles limp on. Each state prints its own money and taxes its neighbors\' goods. Spain closes the Mississippi, and Congress can do nothing about it.', hold: 3.8 },
                { text: 'The West fills up with rival claims instead of new states. Industry comes decades late, and when the question of slavery finally splits the continent, there is no Union to fight for.', hold: 3.8 },
                { text: 'North America becomes a continent of quarrelling republics, closer to Europe than to the United States you know.', hold: 3.5 },
            ],
        },
        {
            id: 'crown-dominion',
            title: 'The Dominion of America',
            subtitle: 'No revolution · freedom by negotiation, eighty years late',
            icon: '👑',
            color: '#DC2626',
            linkedTimelineId: 'british-victory',
            priority: 10,
            requiresFlags: ['dominion'],
            epilogue: [
                { text: 'America stays British. Its assemblies grow bolder every decade, and London gives way a little at a time, as it later did with Canada.', hold: 3.5 },
                { text: 'Britain abolishes slavery across the empire in 1833, and the American South has no independent government to resist it.', hold: 3.5 },
                { text: 'Full self-government arrives in the 1850s by an Act of Parliament, not a war. America becomes a vast, slow, peaceful country, and the king\'s face is still on its money.', hold: 3.8 },
            ],
        },
        {
            id: 'british-victory',
            title: 'The Rebellion Crushed',
            subtitle: 'Washington in chains · the revolution that failed',
            icon: '🇬🇧',
            color: '#991B1B',
            linkedTimelineId: 'british-victory',
            priority: 10,
            requiresFlags: ['philadelphia-raid:defeat'],
            epilogue: [
                { text: 'Washington is tried for treason in London. The King, wiser than his ministers, commutes the sentence to exile, and the general dies a farmer in Bermuda.', hold: 3.8 },
                { text: 'The colonies are put under military governors. The idea of a republic is not killed; it is driven underground, where it spreads to Ireland, to France, and back again.', hold: 3.8 },
                { text: 'America eventually gets its independence in the 1850s, by negotiation. The world gets no example of a successful revolution for seventy years.', hold: 3.5 },
            ],
        },
        {
            // Same reality as british-victory, reached by losing at Yorktown.
            id: 'british-victory-yorktown',
            title: 'The Rebellion Crushed',
            subtitle: 'Yorktown holds · the revolution runs out of money',
            icon: '🇬🇧',
            color: '#991B1B',
            linkedTimelineId: 'british-victory',
            priority: 10,
            requiresFlags: ['yorktown:defeat'],
            epilogue: [
                { text: 'With the army scattered and Congress broke, the states make separate peaces with Britain. The revolution ends with a whimper.', hold: 3.5 },
                { text: 'Washington retires to Mount Vernon under a royal pardon he never accepts. The colonies are ruled as conquered provinces for a generation.', hold: 3.5 },
                { text: 'America eventually gets its independence in the 1850s, by negotiation. The world gets no example of a successful revolution for seventy years.', hold: 3.5 },
            ],
        },
    ],
};
