/* The French Revolution interactive episode: Paris 1789 → eight realities. */
import type { BattleConfig, ExperienceScript } from '../types';

const FRENCH = { side: 'player' as const, color: '#2a4fa8', accentColor: '#f2efe6' };
const PRUSSIAN = { side: 'enemy' as const, color: '#1f2942', accentColor: '#e8e2d0' };

/** Valmy, September 1792. What happened to the King at Varennes decides who France is fighting for, and how hard. */
function valmy(variant: 'republic' | 'monarchy' | 'abroad'): BattleConfig {
    const abroad = variant === 'abroad';
    return {
        id: 'valmy',
        name: 'The Cannonade of Valmy',
        era: 'musket',
        theme: 'colonial',
        objective:
            variant === 'monarchy'
                ? 'September 1792. Prussia and Austria have invaded to "rescue" a King who has sworn to the Constitution and is fighting against them. Hold the windmill ridge and the constitutional monarchy survives.'
                : abroad
                  ? 'September 1792. Louis XVI marches with the invaders, and thousands of émigré nobles ride beside the Prussians. If the ridge at Valmy falls, the road to Paris is open and the King comes home as a conqueror.'
                  : 'September 1792. The Duke of Brunswick has promised to raze Paris if the royal family is harmed. Between his Prussians and the capital stands a ridge, a windmill, and an army of volunteers who have never seen a battle.',
        player: abroad
            ? { ...FRENCH, name: 'Armies of the North and Centre', infantry: 110, cavalry: 20, archers: 30, attack: 1.0, defense: 1.0 }
            : { ...FRENCH, name: 'Armies of the North and Centre', infantry: 125, cavalry: 20, archers: 30, attack: 1.0, defense: 1.05 },
        enemy: abroad
            ? { ...PRUSSIAN, name: 'Prussians and Émigrés', infantry: 130, cavalry: 35, archers: 20, attack: 1.1, defense: 1.1 }
            : { ...PRUSSIAN, name: 'Brunswick\'s Prussians', infantry: 120, cavalry: 30, archers: 20, attack: 1.1, defense: 1.05 },
        onVictory: variant === 'monarchy' ? 'constitution-cinematic' : abroad ? 'terror-intro' : 'kings-trial',
        onDefeat: 'brunswick-paris',
        events: [
            {
                id: 'cannonade',
                atTime: 10,
                title: 'The Cannonade',
                prompt: 'Fog lifts from the ridge. Fifty-four Prussian guns open fire on your lines.',
                options: [
                    {
                        id: 'answer-guns',
                        label: 'Answer Gun for Gun',
                        icon: '💥',
                        description: 'The old royal artillery corps stayed with the Revolution. It is the best in Europe, and it is yours.',
                        effects: { strength: 4 },
                        mod: { catapultBarrage: 14, attackMult: 1.05 },
                    },
                    {
                        id: 'reverse-slope',
                        label: 'Pull Back Behind the Crest',
                        icon: '⛰',
                        description: 'Let the round shot fly over the ridge and keep the volunteers out of sight.',
                        mod: { defenseMult: 1.2 },
                    },
                ],
            },
            {
                id: 'brunswick-attack',
                atTime: 34,
                title: 'The Prussians Advance',
                prompt: 'Brunswick sends his infantry up the slope in perfect lines, as if on parade.',
                options: [
                    {
                        id: 'bayonets',
                        label: 'Meet Them with Bayonets',
                        icon: '🗡️',
                        description: 'Volunteers against veterans, downhill, with the "Ça ira" on their lips.',
                        effects: { chaos: 3, strength: 2 },
                        mod: { attackMult: 1.2, moraleShift: -0.06 },
                    },
                    {
                        id: 'dragoons',
                        label: 'Send the Dragoons Around',
                        icon: '🐎',
                        description: 'Hit the Prussian flank while their eyes are on the ridge.',
                        effects: { strength: 2 },
                        mod: { flankCavalry: 22 },
                    },
                ],
            },
            {
                id: 'vive-la-nation',
                whenMoraleBelow: { side: 'player', value: 0.55 },
                title: 'An Ammunition Wagon Explodes',
                prompt: 'A shell hits the powder carts behind the windmill. Panic runs down the line.',
                options: [
                    {
                        id: 'hat-on-sword',
                        label: '"Vive la Nation!"',
                        icon: '🎩',
                        description: 'General Kellermann raises his hat on the point of his sword, and thirty-six thousand men take up the shout.',
                        effects: { freedom: 4, strength: 3 },
                        mod: { moraleShift: 0.35, attackMult: 1.1 },
                    },
                    {
                        id: 'close-ranks',
                        label: 'Close Ranks and Hold',
                        icon: '🛡',
                        description: 'No speeches. Fill the gaps and stand.',
                        mod: { defenseMult: 1.3 },
                    },
                ],
            },
        ],
    };
}

export const frenchRevolutionScript: ExperienceScript = {
    chapterId: 'french-revolution',
    title: 'Liberty, Equality, or Death',
    era: 'Paris · 1789',
    startBeat: 'intro',
    initialStats: { chaos: 35, freedom: 30, diplomacy: 35, strength: 40 },
    defaultEnding: 'napoleonic-empire',

    characters: {
        louis: {
            id: 'louis', name: 'Louis XVI', role: 'King of France',
            face: '/images/chapters/french-revolution/faces/louis-xvi.webp',
            outfit: 'king', skin: '#cb9776', hair: '#ece7dc', robe: '#24408f', accent: '#1b2f6e',
        },
        'marie-antoinette': {
            id: 'marie-antoinette', name: 'Marie Antoinette', role: 'Queen of France',
            face: '/images/chapters/french-revolution/faces/marie-antoinette.webp',
            outfit: 'queen', skin: '#f1c1b0', hair: '#ece6da', robe: '#9fb8d8', accent: '#e8a0b4',
        },
        robespierre: {
            id: 'robespierre', name: 'Maximilien Robespierre', role: 'Jacobin leader, "the Incorruptible"',
            face: '/images/chapters/french-revolution/faces/robespierre.webp',
            outfit: 'statesman', skin: '#c99a7a', hair: '#e8e4dc', robe: '#5e7a4a', accent: '#8aa36e', breeches: '#efe6d2',
        },
        danton: {
            id: 'danton', name: 'Georges Danton', role: 'Orator of the Revolution',
            face: '/images/chapters/french-revolution/faces/jacques-danton.webp',
            outfit: 'statesman', skin: '#c6865d', hair: '#3b2a1e', robe: '#7a2f24', accent: '#a5523e', breeches: '#3a3a3a',
        },
        napoleon: {
            id: 'napoleon', name: 'Napoleon Bonaparte', role: 'General of the Republic',
            face: '/images/chapters/french-revolution/faces/napoleon-bonaparte.webp',
            outfit: 'napoleonic', skin: '#d29c74', hair: '#3a2a1e', robe: '#1f2f5a', accent: '#c4232f', breeches: '#efe9dc',
        },
    },

    beats: {
        // ── ACT I: Paris, July 1789 ───────────────────────────────────────
        intro: {
            kind: 'cinematic',
            id: 'intro',
            environment: 'paris-1789',
            next: 'explore-paris',
            shots: [
                { path: [[160, 90, 160], [60, 40, 80]], lookPath: [[0, 14, -50]], duration: 7 },
                { path: [[60, 40, 80], [20, 10, 30], [-14, 7, 20]], lookPath: [[0, 4, 0], [-6, 3, -18]], duration: 8 },
                { path: [[-14, 7, 20], [0, 16, -6], [10, 22, -20]], lookPath: [[0, 18, -50]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Paris, 14 July 1789. A four-pound loaf of bread costs more than half a labourer\'s daily wage. The harvest failed, the treasury is bankrupt, and the King has just dismissed the one minister the people trusted.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Twenty thousand royal troops are camped around the city. Two days ago, in the gardens of the Palais-Royal, a young lawyer named Camille Desmoulins jumped on a table and shouted: "To arms!"', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'This morning the crowd broke into the Invalides and took thirty thousand muskets. But muskets need powder, and the powder is inside the Bastille.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'In our history, this day began a revolution that killed a king, terrified Europe and ended with an emperor. In this one, you decide what happens next.', hold: 3.5 },
            ],
        },

        'explore-paris': {
            kind: 'explore',
            id: 'explore-paris',
            environment: 'paris-1789',
            cast: [{ id: 'danton', position: [-6, 0, 10], facing: 0.3, pose: 'command' }],
            prompt: 'Explore Paris: drag to look around and click the glowing markers. The crowd is gathering at the Bastille.',
            camera: { position: [44, 28, 62], target: [0, 8, -12] },
            hotspots: [
                {
                    id: 'bakery',
                    position: [-30, 5, 16],
                    label: 'A Bread Queue',
                    icon: '🥖',
                    title: 'The Price of Bread',
                    description:
                        'Women have queued here since before dawn. Bread is most of what a Paris family eats, and its price has nearly doubled in a year. Rumours say the nobles are hoarding grain to starve the city into obedience. It is not true, but everyone believes it.',
                    effects: { chaos: 3 },
                },
                {
                    id: 'cockade',
                    position: [28, 5, 18],
                    label: 'The New Colours',
                    icon: '🎗',
                    title: 'Red, White and Blue',
                    description:
                        'Parisians are pinning ribbons to their hats: blue and red, the colours of the city of Paris. Within days, General Lafayette will add the white of the King, and the tricolour will be born.',
                    effects: { freedom: 3 },
                },
                {
                    id: 'barricade',
                    position: [0, 4, -16],
                    label: 'The Barricade',
                    icon: '🛢',
                    title: 'Cannon from the Invalides',
                    description:
                        'Deserters from the French Guards, the King\'s own regiment, have brought cannon and taken command of the crowd. They know how to aim them. The fortress has towers twenty-four metres high, eighty-two old soldiers, thirty-two Swiss, and only seven prisoners.',
                    effects: { strength: 3 },
                },
                {
                    id: 'bastille',
                    position: [0, 14, -36],
                    label: 'Approach the Bastille',
                    icon: '🏰',
                    title: 'The Fortress of the King',
                    description:
                        'The governor, the Marquis de Launay, has raised the drawbridges and loaded his guns. Delegations from the city have gone in to talk and come out with nothing. The crowd is pressing forward, and someone is climbing to the drawbridge chains with an axe.',
                    advancesTo: 'bastille-choice',
                },
            ],
        },

        'bastille-choice': {
            kind: 'choice',
            id: 'bastille-choice',
            environment: 'paris-1789',
            cast: [{ id: 'danton', position: [-4, 0, -6], facing: 0.4, pose: 'command' }],
            title: 'Before the Bastille · 14 July 1789',
            prompt: 'The crowd turns to you. What now?',
            camera: { position: [16, 9, 22], target: [0, 8, -24] },
            options: [
                {
                    id: 'storm',
                    label: 'Storm the Fortress',
                    icon: '⚔️',
                    description: 'Cut the chains, bring up the cannon, and take the powder by force. The whole of France will hear about it by morning.',
                    effects: { chaos: 10, freedom: 10 },
                    flags: ['stormed'],
                    next: 'bastille-battle',
                },
                {
                    id: 'parley',
                    label: 'One More Parley',
                    icon: '🏳️',
                    description: 'Send a delegation under a white flag: hand over the powder and nobody is harmed. Slower, and the crowd may not wait.',
                    effects: { diplomacy: 10, chaos: -5 },
                    flags: ['parley'],
                    next: 'varennes-intro',
                },
            ],
        },

        'bastille-battle': {
            kind: 'battle',
            id: 'bastille-battle',
            environment: 'paris-1789',
            battle: {
                id: 'bastille',
                name: 'The Storming of the Bastille',
                era: 'musket',
                theme: 'colonial',
                objective:
                    'Afternoon, 14 July 1789. Insurgents and mutinous French Guards against a garrison behind twenty-four-metre walls. Break the defenders before the King\'s regiments march in from the Champ de Mars.',
                player: { ...FRENCH, name: 'Parisians and French Guards', color: '#3e4f86', infantry: 95, cavalry: 0, archers: 30, attack: 0.95, defense: 0.85 },
                enemy: { side: 'enemy', name: 'The Bastille Garrison', color: '#e6e2d6', accentColor: '#c4232f', infantry: 55, cavalry: 0, archers: 30, attack: 1.05, defense: 1.6 },
                onVictory: 'bastille-falls',
                onDefeat: 'bastille-massacre',
                events: [
                    {
                        id: 'drawbridge',
                        atTime: 10,
                        title: 'The Outer Drawbridge',
                        prompt: 'Two men have reached the chains of the outer drawbridge. The garrison is firing from the towers.',
                        options: [
                            {
                                id: 'cut-chains',
                                label: 'Cut the Chains',
                                icon: '🪓',
                                description: 'The bridge crashes down, and the crowd floods into the outer courtyard.',
                                effects: { chaos: 4 },
                                mod: { attackMult: 1.2, moraleShift: -0.05 },
                            },
                            {
                                id: 'cannon',
                                label: 'Bring Up the Cannon',
                                icon: '💥',
                                description: 'The French Guards drag the Invalides guns into the courtyard and aim at the main gate.',
                                effects: { strength: 4 },
                                mod: { catapultBarrage: 12 },
                            },
                        ],
                    },
                    {
                        id: 'white-flag',
                        atTime: 30,
                        title: 'A Note Through the Gate',
                        prompt: 'De Launay threatens to blow up the powder store, and the fortress with it, unless the garrison is allowed to surrender with honour.',
                        options: [
                            {
                                id: 'accept-terms',
                                label: 'Promise Them Their Lives',
                                icon: '🤝',
                                description: 'Take the fortress without a massacre, if the crowd will keep your word.',
                                effects: { diplomacy: 5 },
                                mod: { enemyAttackMult: 0.6, moraleShift: 0.1 },
                            },
                            {
                                id: 'no-quarter',
                                label: 'No Terms',
                                icon: '🔥',
                                description: 'They fired on the people. Let them face the people.',
                                effects: { chaos: 8 },
                                mod: { attackMult: 1.15 },
                            },
                        ],
                    },
                    {
                        id: 'volley',
                        whenMoraleBelow: { side: 'player', value: 0.5 },
                        title: 'Fire from the Towers',
                        prompt: 'The Swiss pour volleys into the courtyard. Dozens are down and the crowd is wavering.',
                        options: [
                            {
                                id: 'hulin',
                                label: 'Hulin Leads the Guards',
                                icon: '🎖',
                                description: 'Pierre-Augustin Hulin, a laundry manager and ex-soldier, steps out in front with his sword drawn.',
                                effects: { strength: 3 },
                                mod: { moraleShift: 0.32, attackMult: 1.1 },
                            },
                            {
                                id: 'take-cover',
                                label: 'Take Cover and Keep Firing',
                                icon: '🛡',
                                description: 'Burn carts of straw for a smoke screen and fight from behind it.',
                                mod: { defenseMult: 1.35 },
                            },
                        ],
                    },
                ],
            },
        },

        'bastille-falls': {
            kind: 'cinematic',
            id: 'bastille-falls',
            environment: 'paris-1789',
            next: 'varennes-intro',
            shots: [
                { path: [[30, 14, 30], [10, 20, 0]], lookPath: [[0, 18, -50]], duration: 8 },
                { path: [[10, 20, 0], [-60, 50, 40], [-100, 80, 90]], lookPath: [[0, 10, -40]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'At half past five the garrison surrenders. The crowd carries the governor\'s head through the streets on a pike. The King writes in his diary for the day: "Nothing."', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Within weeks, workers begin pulling the Bastille down stone by stone. A builder carves the stones into little Bastilles and sells them as souvenirs all over France.', hold: 3.5 },
            ],
        },

        'bastille-massacre': {
            kind: 'cinematic',
            id: 'bastille-massacre',
            environment: 'paris-1789',
            next: 'ending',
            shots: [
                { path: [[40, 18, 50], [12, 8, 20]], lookPath: [[0, 6, -20]], duration: 8 },
                { path: [[12, 8, 20], [80, 60, 100]], lookPath: [[0, 10, -40]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The assault breaks under the guns of the towers. By evening the Swiss regiments march in from the Champ de Mars and the crowd scatters.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'The King, emboldened, dissolves the National Assembly. Its leaders flee to London or to prison.', hold: 3.2 },
            ],
        },

        // ── ACT II: The King's flight ──────────────────────────────────────
        'varennes-intro': {
            kind: 'cinematic',
            id: 'varennes-intro',
            environment: 'varennes',
            next: 'varennes-choice',
            cast: [
                { id: 'louis', position: [-4, 0, 6], facing: 0.4 },
                { id: 'marie-antoinette', position: [4, 0, 7], facing: -0.3 },
            ],
            shots: [
                { path: [[0, 40, 120], [0, 14, 40]], lookPath: [[0, 4, -10]], duration: 7 },
                { path: [[0, 14, 40], [12, 6, 22], [8, 5, 18]], lookPath: [[0, 4, 6]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Two years pass. The Assembly abolishes feudal privilege and proclaims the Rights of Man. Seven thousand women march on Versailles and bring the royal family back to Paris, where they live as prisoners in all but name.', hold: 4 },
                { speaker: 'The Chronicle', text: 'On the night of 20 June 1791, the King, the Queen and their children slip out of the Tuileries in disguise, in a huge green carriage, heading for the army at the border.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'At Sainte-Menehould, a postmaster recognises the King\'s face from the money in his pocket and gallops ahead. At Varennes, the town bells ring. Farmers with pitchforks surround the carriage.', hold: 3.5 },
            ],
        },

        'varennes-choice': {
            kind: 'choice',
            id: 'varennes-choice',
            environment: 'varennes',
            cast: [
                { id: 'louis', position: [-4, 0, 6], facing: 0.4, pose: 'think' },
                { id: 'marie-antoinette', position: [4, 0, 7], facing: -0.3 },
            ],
            title: 'Varennes · Night of 21 June 1791',
            prompt: 'The King of France stands in a grocer\'s shop, caught. What does the nation do with him?',
            camera: { position: [10, 8, 30], target: [0, 4, 4] },
            options: [
                {
                    id: 'arrest',
                    label: 'Arrest Him as a Traitor',
                    icon: '⛓',
                    description: 'March him back to Paris under guard, past silent crowds who keep their hats on. Nobody will trust a king again.',
                    effects: { freedom: 10, chaos: 8 },
                    flags: ['arrested'],
                    next: 'valmy-republic',
                },
                {
                    id: 'restore',
                    label: 'Bring Him Back with Honour',
                    icon: '📜',
                    description: 'Pretend he was kidnapped, as the Assembly actually did, and hold him to an oath on the new Constitution. A king who reigns but does not rule.',
                    effects: { diplomacy: 10, freedom: 4 },
                    flags: ['restored'],
                    next: 'valmy-monarchy',
                },
                {
                    id: 'let-pass',
                    label: 'Let the Carriage Go',
                    icon: '🐎',
                    description: 'Open the barricade. Let him run to the Austrians, and see who follows him.',
                    effects: { chaos: 12, strength: -5 },
                    flags: ['escaped'],
                    next: 'valmy-abroad',
                },
            ],
        },

        'valmy-republic': { kind: 'battle', id: 'valmy-republic', environment: 'valmy', battle: valmy('republic') },
        'valmy-monarchy': { kind: 'battle', id: 'valmy-monarchy', environment: 'valmy', battle: valmy('monarchy') },
        'valmy-abroad': { kind: 'battle', id: 'valmy-abroad', environment: 'valmy', battle: valmy('abroad') },

        'brunswick-paris': {
            kind: 'cinematic',
            id: 'brunswick-paris',
            environment: 'valmy',
            next: 'ending',
            shots: [
                { path: [[40, 20, 70], [10, 10, 40]], lookPath: [[0, 4, 0]], duration: 8 },
                { path: [[10, 10, 40], [80, 60, 100]], lookPath: [[0, 4, -60]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The volunteers break on the ridge. Ten days later Prussian cavalry water their horses in the Seine.', hold: 3.2 },
                { speaker: 'The Chronicle', text: 'Brunswick keeps his promise to punish Paris. The Revolution ends in courts-martial, and its leaders hang from the lamp posts they once used for aristocrats.', hold: 3.5 },
            ],
        },

        'constitution-cinematic': {
            kind: 'cinematic',
            id: 'constitution-cinematic',
            environment: 'valmy',
            next: 'ending',
            cast: [{ id: 'louis', position: [-46, 0, 32], facing: 0.75, pose: 'command' }],
            shots: [
                { path: [[0, 30, 110], [-30, 10, 50]], lookPath: [[-46, 6, 32]], duration: 8 },
                { path: [[-30, 10, 50], [40, 30, 120]], lookPath: [[56, 12, 96]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Prussians fall back. In Paris the crowds cheer "Vive le Roi!" for the first time in years, because this King stood with the Constitution against the foreign kings.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'There will be no Republic in 1792, no trial, no Terror. France keeps its King, and its King keeps his head.', hold: 3.5 },
            ],
        },

        'kings-trial': {
            kind: 'choice',
            id: 'kings-trial',
            environment: 'paris-terror',
            cast: [
                { id: 'louis', position: [0, 0, 8], facing: 0.1 },
                { id: 'robespierre', position: [-12, 0, 10], facing: 0.7, pose: 'command' },
                { id: 'danton', position: [12, 0, 10], facing: -0.6, pose: 'think' },
            ],
            title: 'The Trial of Citizen Capet · January 1793',
            prompt: 'France is a Republic now, and the former King is on trial for treason. Seven hundred deputies vote one by one, out loud. How does yours vote?',
            camera: { position: [6, 10, 44], target: [0, 5, 4] },
            options: [
                {
                    id: 'execute',
                    label: 'Death',
                    icon: '⚖️',
                    description: '"Louis must die so that the nation may live," says Robespierre. The vote passes by a narrow margin.',
                    effects: { chaos: 12, strength: 6, freedom: 4 },
                    flags: ['regicide'],
                    next: 'terror-intro',
                },
                {
                    id: 'exile',
                    label: 'Exile, not Execution',
                    icon: '🕊',
                    description: 'The moderate Girondins argue that a dead king is a martyr and a living exile is an embarrassment. Send him to America.',
                    effects: { diplomacy: 10, chaos: -6 },
                    flags: ['exiled'],
                    next: 'girondin-cinematic',
                },
            ],
        },

        'girondin-cinematic': {
            kind: 'cinematic',
            id: 'girondin-cinematic',
            environment: 'paris-terror',
            next: 'ending',
            shots: [
                { path: [[6, 10, 44], [0, 30, 90]], lookPath: [[0, 5, 0]], duration: 8 },
                { path: [[0, 30, 90], [-90, 60, 60]], lookPath: [[0, 8, -20]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Louis Capet sails for Philadelphia in the spring of 1793, a private citizen with a pension. The guillotine on the square is taken down unused.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'Without a king\'s death to avenge, the war with Europe cools. The Girondins write a federal constitution, and the Jacobins lose the argument in the Assembly instead of winning it in the streets.', hold: 3.8 },
            ],
        },

        // ── ACT III: The Terror ────────────────────────────────────────────
        'terror-intro': {
            kind: 'cinematic',
            id: 'terror-intro',
            environment: 'paris-terror',
            next: 'terror-choice',
            cast: [{ id: 'robespierre', position: [-8, 0, 8], facing: 0.4, pose: 'command' }],
            shots: [
                { path: [[80, 50, 90], [30, 20, 40]], lookPath: [[0, 8, -10]], duration: 7 },
                { path: [[30, 20, 40], [8, 6, 20], [4, 5, 16]], lookPath: [[0, 9, -10]], duration: 8 },
                { path: [[4, 5, 16], [-20, 8, 24]], lookPath: [[-8, 5, 8]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'France is at war with Austria, Prussia, Britain, Spain and the Netherlands, and with rebels in its own west. The Committee of Public Safety rules by emergency decree.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'The Law of Suspects lets anyone be arrested for "lack of civic virtue". In nine months, about seventeen thousand people are officially executed, and many more die in prison.', hold: 3.8 },
                { speaker: 'Maximilien Robespierre', text: 'Terror is nothing but justice: prompt, severe, inflexible. It is an emanation of virtue.', hold: 3.2 },
            ],
        },

        'terror-choice': {
            kind: 'choice',
            id: 'terror-choice',
            environment: 'paris-terror',
            cast: [
                { id: 'robespierre', position: [-8, 0, 8], facing: 0.45, pose: 'command' },
                { id: 'danton', position: [8, 0, 9], facing: -0.45, pose: 'think' },
            ],
            title: 'Place de la Révolution · Spring 1794',
            prompt: 'Danton says the Terror has done its work and must end. Robespierre says the Republic is still full of traitors. One of them will be on that scaffold within a month.',
            camera: { position: [4, 9, 40], target: [0, 5, 0] },
            options: [
                {
                    id: 'purge',
                    label: 'Stand with Robespierre',
                    icon: '🗡',
                    description: 'Virtue needs no mercy. Danton and his friends go to the guillotine, and the Committee keeps its grip on France.',
                    effects: { chaos: 12, strength: 8, freedom: -10 },
                    flags: ['purge'],
                    next: 'eternal-terror',
                },
                {
                    id: 'danton',
                    label: 'Stand with Danton',
                    icon: '🕊',
                    description: '"Let us be terrible so the people need not be," he once said. Now he and his friend Desmoulins want a Committee of Clemency. Back him before the Committee strikes.',
                    effects: { diplomacy: 8, freedom: 8, chaos: -4 },
                    flags: ['danton-path'],
                    next: 'clemency-cinematic',
                },
                {
                    id: 'thermidor',
                    label: 'Wait, Then Strike at Both',
                    icon: '🎭',
                    description: 'Let the factions destroy each other, then bring Robespierre down in the Convention, as happened on 9 Thermidor. Order first; principles later.',
                    effects: { chaos: -6, diplomacy: 4 },
                    flags: ['thermidor'],
                    next: 'thermidor-cinematic',
                },
            ],
        },

        'eternal-terror': {
            kind: 'cinematic',
            id: 'eternal-terror',
            environment: 'paris-terror',
            next: 'ending',
            cast: [{ id: 'robespierre', position: [-8, 0, 8], facing: 0.45, pose: 'command' }],
            shots: [
                { path: [[4, 9, 40], [0, 14, 10]], lookPath: [[0, 10, -10]], duration: 8 },
                { path: [[0, 14, 10], [60, 50, 80]], lookPath: [[0, 6, -10]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Danton goes to the scaffold on 5 April 1794. "Show my head to the people," he tells the executioner. "It is worth seeing."', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'In this reality, the plot of Thermidor is discovered in time. Robespierre survives, and the Republic of Virtue becomes permanent.', hold: 3.5 },
            ],
        },

        'clemency-cinematic': {
            kind: 'cinematic',
            id: 'clemency-cinematic',
            environment: 'paris-terror',
            next: 'ending',
            cast: [{ id: 'danton', position: [8, 0, 9], facing: -0.45, pose: 'command' }],
            shots: [
                { path: [[4, 9, 40], [10, 6, 22]], lookPath: [[8, 5, 9]], duration: 8 },
                { path: [[10, 6, 22], [-60, 50, 80]], lookPath: [[0, 6, -10]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Convention, terrified of the Committee, finally finds its courage in Danton\'s booming voice. The Law of Suspects is repealed. The prisons empty.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'Robespierre retires to Arras to write. The surviving Girondins come out of hiding and help write a looser, federal constitution.', hold: 3.5 },
            ],
        },

        'thermidor-cinematic': {
            kind: 'cinematic',
            id: 'thermidor-cinematic',
            environment: 'paris-terror',
            next: 'brumaire-choice',
            shots: [
                { path: [[4, 9, 40], [0, 12, 12]], lookPath: [[0, 10, -10]], duration: 8 },
                { path: [[0, 12, 12], [40, 40, 90]], lookPath: [[0, 6, -10]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Danton dies in April. In July, the deputies who fear they are next shout Robespierre down in the Convention. He is guillotined the following evening, on the same square.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'Four years of weak government by a five-man Directory follow, full of corruption, bankruptcy and coups. France starts looking for a strong man. One is already famous.', hold: 3.8 },
            ],
        },

        // ── ACT IV: The general ────────────────────────────────────────────
        'brumaire-choice': {
            kind: 'choice',
            id: 'brumaire-choice',
            environment: 'versailles',
            cast: [{ id: 'napoleon', position: [-2, 0, 6], facing: 0.4, pose: 'command' }],
            title: 'Château de Saint-Cloud · 18 Brumaire, November 1799',
            prompt: 'General Bonaparte, just back from Egypt, wants the Directory replaced by three Consuls, with himself as the First. His grenadiers are outside. Do you back the coup?',
            camera: { position: [20, 10, 36], target: [-1, 5, -8] },
            options: [
                {
                    id: 'coup',
                    label: 'Back Bonaparte',
                    icon: '🦅',
                    description: 'He promises order, victory and the Revolution\'s gains made permanent. First he has to beat the Austrians in Italy, again.',
                    effects: { strength: 12, freedom: -8, chaos: -6 },
                    flags: ['coup'],
                    next: 'marengo-battle',
                },
                {
                    id: 'refuse',
                    label: 'Defend the Republic',
                    icon: '🏛',
                    description: 'The deputies shout "Outlaw the dictator!" Stand with them and arrest the general before his soldiers clear the hall.',
                    effects: { freedom: 10, chaos: 6 },
                    flags: ['refused-coup'],
                    next: 'directory-cinematic',
                },
            ],
        },

        'marengo-battle': {
            kind: 'battle',
            id: 'marengo-battle',
            environment: 'marengo',
            battle: {
                id: 'marengo',
                name: 'The Battle of Marengo',
                era: 'musket',
                theme: 'colonial',
                objective:
                    'June 1800. The First Consul has crossed the Alps with his army, but the Austrians strike first, and they outnumber him. Lose here and his regime falls within weeks. Win, and France is his.',
                player: { ...FRENCH, name: 'Army of the Reserve', infantry: 105, cavalry: 30, archers: 25, attack: 1.05, defense: 1.0 },
                enemy: { side: 'enemy', name: 'Austrian Army', color: '#e9e6dc', accentColor: '#c4232f', infantry: 135, cavalry: 30, archers: 25, attack: 1.0, defense: 1.05 },
                commander: 'napoleon',
                onVictory: 'empire-cinematic',
                onDefeat: 'marengo-defeat',
                events: [
                    {
                        id: 'surprise',
                        atTime: 8,
                        title: 'The Austrians Cross the Bormida',
                        prompt: 'You expected the enemy to retreat. Instead thirty thousand Austrians are pouring over the river bridges.',
                        options: [
                            {
                                id: 'consular-guard',
                                label: 'Form Squares with the Guard',
                                icon: '🛡',
                                description: 'The Consular Guard stands like a granite wall in the open plain.',
                                mod: { defenseMult: 1.25 },
                            },
                            {
                                id: 'counterattack',
                                label: 'Counterattack at Once',
                                icon: '⚔️',
                                description: 'Hit them while they are still crossing.',
                                effects: { chaos: 3 },
                                mod: { attackMult: 1.12, moraleShift: -0.08 },
                            },
                        ],
                    },
                    {
                        id: 'desaix',
                        atTime: 32,
                        title: 'Desaix Arrives',
                        prompt: 'General Desaix rides in with a fresh division. "This battle is lost," he says, "but there is time to win another."',
                        options: [
                            {
                                id: 'desaix-attack',
                                label: 'Desaix Attacks',
                                icon: '🥁',
                                description: 'Fresh infantry straight into the Austrian column. Desaix himself will not survive the charge.',
                                effects: { strength: 4 },
                                mod: { attackMult: 1.15, enemyAttackMult: 0.88 },
                            },
                            {
                                id: 'marmont-guns',
                                label: 'Marmont\'s Eighteen Guns',
                                icon: '💥',
                                description: 'Mass every remaining cannon and fire canister into the column at point-blank range.',
                                effects: { strength: 3 },
                                mod: { catapultBarrage: 16 },
                            },
                        ],
                    },
                    {
                        id: 'kellermann',
                        atTime: 44,
                        title: 'The Column Wavers',
                        prompt: 'The Austrian column is shaken. Young Kellermann, son of the hero of Valmy, has four hundred heavy cavalry behind a vineyard.',
                        options: [
                            {
                                id: 'charge',
                                label: 'Kellermann Charges',
                                icon: '🐎',
                                description: 'Into the column\'s flank. In our history, two thousand Austrians surrendered in minutes.',
                                effects: { strength: 4 },
                                mod: { flankCavalry: 30 },
                            },
                            {
                                id: 'pursue',
                                label: 'General Advance',
                                icon: '🚩',
                                description: 'The whole line moves forward together, drums beating.',
                                mod: { attackMult: 1.1, moraleShift: 0.1 },
                            },
                        ],
                    },
                    {
                        id: 'retreat',
                        whenMoraleBelow: { side: 'player', value: 0.5 },
                        title: 'The Line Is Breaking',
                        prompt: 'By mid-afternoon your army is retreating across the plain. Messengers are already riding to tell Paris the battle is lost.',
                        options: [
                            {
                                id: 'bonaparte-rides',
                                label: 'Bonaparte Rides Among Them',
                                icon: '🎖',
                                description: '"Soldiers, we have gone back far enough. You know I always sleep on the battlefield."',
                                effects: { strength: 4 },
                                mod: { moraleShift: 0.35, attackMult: 1.08 },
                            },
                            {
                                id: 'rally-village',
                                label: 'Rally at San Giuliano',
                                icon: '🏚',
                                description: 'Fall back to the village and fight from its walls until help arrives.',
                                mod: { defenseMult: 1.3 },
                            },
                        ],
                    },
                ],
            },
        },

        'empire-cinematic': {
            kind: 'cinematic',
            id: 'empire-cinematic',
            environment: 'marengo',
            next: 'ending',
            cast: [{ id: 'napoleon', position: [-46, 0, 32], facing: 0.75, pose: 'command' }],
            shots: [
                { path: [[0, 30, 110], [-30, 9, 48]], lookPath: [[-46, 6, 32]], duration: 8 },
                { path: [[-30, 9, 48], [0, 60, -60], [0, 120, -260]], lookPath: [[0, 60, -500]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Marengo is won at dusk. The bulletin sent to Paris never mentions that the battle was lost at three o\'clock.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'Four years later, in Notre-Dame, Napoleon takes the crown from the Pope\'s hands and places it on his own head. The Revolution has made an emperor.', hold: 3.8 },
            ],
        },

        'marengo-defeat': {
            kind: 'cinematic',
            id: 'marengo-defeat',
            environment: 'marengo',
            next: 'ending',
            shots: [
                { path: [[40, 20, 70], [10, 10, 40]], lookPath: [[0, 4, 0]], duration: 8 },
                { path: [[10, 10, 40], [80, 60, 100]], lookPath: [[0, 40, -400]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Desaix arrives an hour too late. The Army of the Reserve dissolves on the road back to the Alps.', hold: 3.2 },
                { speaker: 'The Chronicle', text: 'In Paris, royalists and generals who hated the First Consul seize their chance. Within a year, the Bourbon heir is invited home.', hold: 3.5 },
            ],
        },

        'directory-cinematic': {
            kind: 'cinematic',
            id: 'directory-cinematic',
            environment: 'versailles',
            next: 'ending',
            cast: [{ id: 'napoleon', position: [-2, 0, 6], facing: 0.4, pose: 'think' }],
            shots: [
                { path: [[20, 10, 36], [6, 6, 18]], lookPath: [[-2, 5, 6]], duration: 8 },
                { path: [[6, 6, 18], [0, 40, 90]], lookPath: [[0, 8, -40]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The coup collapses in the orangery of Saint-Cloud. Bonaparte faints when the deputies jostle him, and his brother cannot persuade the grenadiers to march.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'The general is sent back to command an army far away. The Republic stumbles on, poor and quarrelsome, but still a republic.', hold: 3.5 },
            ],
        },

        ending: { kind: 'ending', id: 'ending' },
    },

    endings: [
        {
            id: 'constitutional-monarchy',
            title: 'The King Who Learned to Share',
            subtitle: 'A constitutional monarchy, a century early',
            icon: '👑',
            color: '#2563EB',
            linkedTimelineId: 'constitutional-monarchy',
            priority: 10,
            requiresFlags: ['restored', 'valmy:won'],
            epilogue: [
                { text: 'Louis XVI dies in his bed in 1815, the first King of the French. His ministers answer to an elected Assembly, the way Britain\'s answer to Parliament.', hold: 3.8 },
                { text: 'With no Terror and no Napoleon, Europe fights no twenty-year war. France industrialises early and peacefully, and votes for women decades before our France did.', hold: 3.8 },
                { text: 'Marie Antoinette never says "let them eat cake." In fact, she never did in our history either.', hold: 3.2 },
            ],
        },
        {
            id: 'girondist-victory',
            title: 'The Girondin Republic',
            subtitle: 'A federal France, without the Terror',
            icon: '🕊',
            color: '#059669',
            linkedTimelineId: 'girondist-victory',
            priority: 10,
            requiresFlags: ['exiled'],
            epilogue: [
                { text: 'France becomes a federation of self-governing departments, more like Switzerland or the United States than the centralised state we know.', hold: 3.5 },
                { text: 'Louis Capet runs a farm in Pennsylvania and corresponds politely with Thomas Jefferson.', hold: 3.2 },
                { text: 'The federal idea spreads with French ideas across Europe, and becomes the model for the European Union two centuries early.', hold: 3.5 },
            ],
        },
        {
            // Same reality as girondist-victory, reached by ending the Terror with Danton.
            id: 'girondist-victory-danton',
            title: 'The Girondin Republic',
            subtitle: 'Danton ends the Terror · a moderate, federal France',
            icon: '🕊',
            color: '#059669',
            linkedTimelineId: 'girondist-victory',
            priority: 10,
            requiresFlags: ['danton-path'],
            epilogue: [
                { text: 'The Terror ends in the spring of 1794 instead of the summer, and thousands who died in our history live. Danton dies in 1799, rich and a little disgraced, in bed.', hold: 3.8 },
                { text: 'France settles into a moderate, federal republic. With no strong man needed, no Napoleon rises.', hold: 3.2 },
                { text: 'The federal idea spreads with French ideas across Europe, and becomes the model for the European Union two centuries early.', hold: 3.5 },
            ],
        },
        {
            id: 'robespierre-eternal',
            title: 'The Republic of Virtue',
            subtitle: 'Robespierre survives · the Terror becomes the state',
            icon: '🗡',
            color: '#991B1B',
            linkedTimelineId: 'robespierre-eternal',
            priority: 10,
            requiresFlags: ['purge'],
            epilogue: [
                { text: 'Robespierre rules until his death in 1820. The Cult of the Supreme Being becomes the state religion and the Committee of Public Safety never dissolves.', hold: 3.8 },
                { text: 'France becomes the first modern one-party state, with secret police, show trials and a cult of the leader, a century before such things had names.', hold: 3.8 },
                { text: 'It is a warning the rest of the world learns from early, or fails to.', hold: 3 },
            ],
        },
        {
            id: 'napoleonic-empire',
            title: 'The Eagle and the Crown',
            subtitle: 'The history you know: from revolution to empire',
            icon: '🦅',
            color: '#7C3AED',
            priority: 8,
            requiresFlags: ['marengo:won'],
            epilogue: [
                { text: 'Napoleon crowns himself Emperor in 1804, conquers most of Europe, and loses it all in Russia\'s snow and at Waterloo. The Bourbons come back in 1814.', hold: 3.8 },
                { text: 'But the Napoleonic Code, equality before the law, the metric system and the idea of the nation all survive him, and spread across the world.', hold: 3.8 },
                { text: 'This is the reality you are reading this in. The Revolution failed in almost everything it tried, and changed almost everything anyway.', hold: 3.5 },
            ],
        },
        {
            id: 'directory-republic',
            title: 'The Stubborn Republic',
            subtitle: 'No emperor · a weak republic that refuses to die',
            icon: '🏛',
            color: '#0F766E',
            priority: 8,
            requiresFlags: ['refused-coup'],
            epilogue: [
                { text: 'Without Napoleon, France fights a long, indecisive war and makes peace in 1802, keeping Belgium and the Rhine border.', hold: 3.5 },
                { text: 'The Republic is corrupt and unloved, but every few years it holds an election, and slowly the elections start to matter.', hold: 3.5 },
                { text: 'Bonaparte dies a forgotten general in 1821, writing bitter memoirs about the empire he was never allowed to build.', hold: 3.5 },
            ],
        },
        {
            id: 'old-regime',
            title: 'The Old Regime Returns',
            subtitle: 'The Bastille holds · the Revolution strangled at birth',
            icon: '🏰',
            color: '#64748B',
            priority: 10,
            requiresFlags: ['bastille:defeat'],
            epilogue: [
                { text: 'The King\'s troops restore order, and the National Assembly is never allowed to meet again. Louis XVI reigns, bankrupt and anxious, until a later and bloodier explosion in the 1820s.', hold: 3.8 },
                { text: 'The Declaration of the Rights of Man is never written. The ideas in it survive in books printed in Amsterdam and smuggled across the border.', hold: 3.5 },
            ],
        },
        {
            // Same reality as old-regime, reached by losing at Valmy.
            id: 'old-regime-valmy',
            title: 'The Old Regime Returns',
            subtitle: 'Valmy is lost · foreign kings restore the throne',
            icon: '🏰',
            color: '#64748B',
            priority: 10,
            requiresFlags: ['valmy:defeat'],
            epilogue: [
                { text: 'Louis XVI is restored by Prussian bayonets, and the people never forgive him for it. He reigns as a foreign power\'s puppet.', hold: 3.5 },
                { text: 'The Revolution becomes a legend of the volunteers who almost held the ridge, and the next one, when it comes, is far more radical.', hold: 3.5 },
            ],
        },
        {
            // Same reality as old-regime, reached by losing at Marengo.
            id: 'old-regime-marengo',
            title: 'The Old Regime Returns',
            subtitle: 'Marengo is lost · the Bourbons come home',
            icon: '🏰',
            color: '#64748B',
            priority: 10,
            requiresFlags: ['marengo:defeat'],
            epilogue: [
                { text: 'Louis XVIII, the dead King\'s brother, returns in 1801, thirteen years before he did in our history, and keeps most of the Revolution\'s laws because he cannot undo them.', hold: 3.8 },
                { text: 'Without Napoleon\'s wars, Europe\'s kings sleep easier, and Europe\'s nations wake up more slowly.', hold: 3.2 },
            ],
        },
    ],
};
