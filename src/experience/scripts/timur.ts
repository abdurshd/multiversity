/* The Timur's Legacy interactive episode: Samarkand 1404 → four realities. */
import type { ExperienceScript } from '../types';

export const timurScript: ExperienceScript = {
    chapterId: 'timur-legacy',
    title: "The Iron Emir's Last Campaign",
    era: 'Samarkand · 1404 AD',
    startBeat: 'intro',
    initialStats: { chaos: 20, freedom: 40, diplomacy: 50, strength: 65 },
    defaultEnding: 'historical-fragmentation',

    beats: {
        // ── ACT I: Samarkand ──────────────────────────────────────────────
        intro: {
            kind: 'cinematic',
            id: 'intro',
            environment: 'samarkand-day',
            next: 'explore-city',
            shots: [
                { path: [[170, 95, 170], [70, 45, 95]], lookPath: [[0, 12, 0]], duration: 7 },
                { path: [[70, 45, 95], [34, 14, 46], [-22, 11, 34]], lookPath: [[0, 10, -14], [0, 8, -20]], duration: 8 },
                { path: [[-22, 11, 34], [18, 16, -8], [42, 13, -28]], lookPath: [[52, 14, -52]], duration: 7 },
                { path: [[42, 13, -28], [34, 11, 26], [20, 8, 46]], lookPath: [[8, 3, 52]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Samarkand, in the year 1404. Jewel of the Silk Road, capital of an empire stretching from Delhi to Damascus.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'Its builder is Amir Timur — Tamerlane to his enemies — the last great conqueror of the steppe. He is sixty-eight years old, and he is not finished.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'Beneath the turquoise domes his architects raise monuments, while in the war camps beyond the walls, two hundred thousand soldiers sharpen their blades.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'History records that he marched east against Ming China — and died of fever at Otrar before striking a single blow. His empire shattered among his heirs.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'But tonight, in this reality, the dice have not yet been cast. Walk his city. Then sit at his war council — and choose.', hold: 3 },
            ],
        },

        'explore-city': {
            kind: 'explore',
            id: 'explore-city',
            environment: 'samarkand-day',
            prompt: 'Explore Samarkand — drag to look around, click the glowing markers. The war council awaits.',
            camera: { position: [48, 32, 62], target: [0, 6, 0] },
            hotspots: [
                {
                    id: 'registan',
                    position: [0, 4, -18],
                    label: 'Registan Square',
                    icon: '🕌',
                    title: 'The Registan',
                    description:
                        'The heart of the city. Merchants from Cathay, Persia and the Rus trade under the gaze of madrasahs sheathed in lapis tile. Every brick was paid for by conquest — Timur deported the finest artisans of every city he broke.',
                },
                {
                    id: 'mosque',
                    position: [48, 6, -44],
                    label: 'Bibi-Khanym Mosque',
                    icon: '🌙',
                    title: 'Bibi-Khanym Mosque',
                    description:
                        'Raised in five years with stone hauled by ninety-five elephants from India. Timur ordered its portal torn down and rebuilt — twice — because it was not magnificent enough. A monument to ambition that outpaces even stone.',
                    effects: { diplomacy: 2 },
                },
                {
                    id: 'mausoleum',
                    position: [-44, 5, 38],
                    label: 'Gur-e-Amir',
                    icon: '⚱️',
                    title: 'Gur-e-Amir — the Tomb That Waits',
                    description:
                        'A mausoleum built for a beloved grandson, dead before his time. The court whispers that the Emir will lie here himself one day. On its future jade cenotaph, legend will carve: "When I rise from the dead, the world shall tremble."',
                    effects: { chaos: 2 },
                },
                {
                    id: 'council',
                    position: [10, 3, 52],
                    label: 'The War Council',
                    icon: '⚔️',
                    title: 'The Council of Samarkand',
                    description:
                        'Around the fire sit the amirs of the tumens, the princes of the blood, the spymasters of three continents. Maps of China, of Anatolia, of the empire itself lie unrolled. The Emir raises his hand for silence. The moment of divergence has come.',
                    advancesTo: 'council-choice',
                },
            ],
        },

        'council-choice': {
            kind: 'choice',
            id: 'council-choice',
            environment: 'samarkand-dusk',
            title: 'The Council of Samarkand · Winter 1404',
            prompt: 'The Emir asks: where does the empire ride?',
            camera: { position: [26, 14, 70], target: [8, 4, 50] },
            options: [
                {
                    id: 'east',
                    label: 'March East — Conquer Ming China',
                    icon: '🐉',
                    description:
                        'The greatest prize on earth. Two hundred thousand riders against the oldest empire in the world. But the road crosses the winter steppe that killed him in our history…',
                    effects: { strength: 10, chaos: 8 },
                    flags: ['path-east'],
                    next: 'east-march',
                },
                {
                    id: 'consolidate',
                    label: 'Consolidate — Forge the Succession',
                    icon: '🏛',
                    description:
                        'No more campaigns. Name an heir, bind the amirs with law and marriage, turn an army of conquest into an empire of administration. Boring. Unprecedented. Possibly immortal.',
                    effects: { diplomacy: 12, freedom: 5 },
                    flags: ['path-consolidate'],
                    next: 'consolidate-cinematic',
                },
                {
                    id: 'west',
                    label: 'Turn West — The Gates of Europe',
                    icon: '🌍',
                    description:
                        'Ankara broke the Ottomans once. Finish them, cross the straits, and put the horsetail standard over a divided, plague-weakened Europe before its Renaissance can begin.',
                    effects: { strength: 12, chaos: 10 },
                    flags: ['path-west'],
                    next: 'west-march',
                },
            ],
        },

        // ── ACT II — EAST: the China campaign ─────────────────────────────
        'east-march': {
            kind: 'cinematic',
            id: 'east-march',
            environment: 'winter-march',
            next: 'otrar-choice',
            shots: [
                { path: [[80, 50, 80], [20, 18, 40]], lookPath: [[-20, 4, 0]], duration: 7 },
                { path: [[20, 18, 40], [-10, 8, 18], [-30, 6, -10]], lookPath: [[-28, 3, -20]], duration: 8 },
                { path: [[-30, 6, -10], [0, 12, -20], [25, 10, 5]], lookPath: [[0, 3, 0]], duration: 7 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'January 1405. The Grand Army crawls east through the worst winter in living memory. The Syr Darya is frozen solid enough to march an army across.', hold: 3.2 },
                { speaker: 'The Chronicle', text: 'At Otrar, the cold finds the Emir. Fever. The physicians burn herbs and watch the tent flap. The whole campaign — the whole century — holds its breath.', hold: 3.5 },
                { speaker: 'Amir Shah Malik', text: 'Lord — the men can winter here. China has stood two thousand years; it will wait one more season. Or we press on now, while the rivers are still roads of ice.', hold: 3.5 },
            ],
        },

        'otrar-choice': {
            kind: 'choice',
            id: 'otrar-choice',
            environment: 'winter-march',
            title: 'Otrar · The Fever Night, February 1405',
            prompt: 'In our history, Timur waited at Otrar — and died there. What happens in this one?',
            camera: { position: [30, 16, 38], target: [0, 3, 0] },
            options: [
                {
                    id: 'press-on',
                    label: 'Defy the Fever — March at Dawn',
                    icon: '🔥',
                    description:
                        'Movement is life. Break camp, cross the ice, and let the campaign\'s fire burn the sickness out. The army rides for the Great Wall.',
                    effects: { strength: 8, chaos: 5 },
                    flags: ['defied-fever'],
                    next: 'wall-battle',
                },
                {
                    id: 'wait',
                    label: 'Winter at Otrar — As History Did',
                    icon: '❄️',
                    description:
                        'Rest. Recover. Trust the physicians and the spring. (This is the road our own timeline took. You know where it leads.)',
                    effects: { chaos: 10, diplomacy: 3 },
                    flags: ['waited-at-otrar'],
                    next: 'otrar-death',
                },
            ],
        },

        'otrar-death': {
            kind: 'cinematic',
            id: 'otrar-death',
            environment: 'winter-march',
            next: 'ending',
            shots: [
                { path: [[18, 6, 24], [8, 4, 12]], lookPath: [[0, 2, 0]], duration: 9 },
                { path: [[8, 4, 12], [30, 30, 30], [80, 70, 80]], lookPath: [[0, 2, 0]], duration: 10 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The fever deepens. On the 18th of February, 1405, Amir Timur dies at Otrar — exactly as he did in our world.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'The Grand Army melts away from the Chinese road. Grandsons turn on uncles. Within a decade the empire is a memory quarreled over by princes.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'Some timelines, it seems, have a current. You chose the historical channel — and history flowed down it.', hold: 3 },
            ],
        },

        'wall-battle': {
            kind: 'battle',
            id: 'wall-battle',
            environment: 'great-wall',
            battle: {
                id: 'china-campaign',
                name: 'The Breach of the Great Wall',
                objective:
                    'Spring 1405. The Grand Army stands before the Ming frontier. Break the garrison army at the wall and the road to Beijing lies open. Rout — or be routed.',
                theme: 'great-wall',
                player: {
                    side: 'player', name: 'Timurid Grand Army', color: '#d63b3b', accentColor: '#e8a23d',
                    infantry: 110, cavalry: 60, archers: 50, attack: 1.1, defense: 1.0,
                },
                enemy: {
                    side: 'enemy', name: 'Ming Border Army', color: '#3f5f8f', accentColor: '#7aa0c4',
                    infantry: 150, cavalry: 30, archers: 60, attack: 0.95, defense: 1.05,
                },
                onVictory: 'beijing-falls',
                onDefeat: 'east-defeat',
                events: [
                    {
                        id: 'breach',
                        atTime: 14,
                        title: 'The Wall Must Fall',
                        prompt: 'The Ming line anchors on the fortifications. Your engineers await the order.',
                        options: [
                            {
                                id: 'catapults',
                                label: 'Unleash the Catapults',
                                icon: '🪨',
                                description: 'A barrage of stone shatters their massed ranks. Loud, brutal, effective.',
                                effects: { strength: 4 },
                                mod: { catapultBarrage: 14 },
                            },
                            {
                                id: 'tunnels',
                                label: 'Sappers and Tunnels',
                                icon: '⛏',
                                description: 'Undermine quietly. Your whole army fights harder once the wall\'s shadow no longer frightens it.',
                                effects: { diplomacy: 2 },
                                mod: { attackMult: 1.25 },
                            },
                            {
                                id: 'frontal',
                                label: 'Glory — Frontal Assault',
                                icon: '💀',
                                description: 'Ladders and fury. The bards will sing of it; the widows will not.',
                                effects: { chaos: 6, strength: 2 },
                                mod: { attackMult: 1.1, moraleShift: -0.25 },
                            },
                        ],
                    },
                    {
                        id: 'flank',
                        atTime: 38,
                        title: 'The Reserve Tumen',
                        prompt: 'Ten thousand veteran riders wait behind the dunes. Commit them?',
                        options: [
                            {
                                id: 'flank-now',
                                label: 'Release the Flank Riders',
                                icon: '🐎',
                                description: 'The classic Timurid hammer — cavalry erupting from the flank into their archers.',
                                effects: { strength: 3 },
                                mod: { flankCavalry: 40 },
                            },
                            {
                                id: 'hold-reserve',
                                label: 'Hold Them in Reserve',
                                icon: '🛡',
                                description: 'Patience. A shield behind your line stiffens every spine in front of it.',
                                effects: { diplomacy: 2 },
                                mod: { defenseMult: 1.3 },
                            },
                        ],
                    },
                    {
                        id: 'rally',
                        whenMoraleBelow: { side: 'player', value: 0.55 },
                        title: 'The Line Wavers',
                        prompt: 'Your center is bleeding. The Emir himself rides forward — what is the order?',
                        options: [
                            {
                                id: 'fire-arrows',
                                label: 'Fire Arrows — Burn Their Will',
                                icon: '🏹',
                                description: 'The sky itself catches fire. Archers loose burning shafts into the Ming mass.',
                                effects: { chaos: 4 },
                                mod: { archerDamageMult: 1.8 },
                            },
                            {
                                id: 'emir-rides',
                                label: 'The Emir Rides to the Standard',
                                icon: '👑',
                                description: 'Sixty-eight years old, sword drawn, under the horsetail banner. Morale becomes a weapon.',
                                effects: { strength: 5 },
                                mod: { moraleShift: 0.35, attackMult: 1.15 },
                            },
                        ],
                    },
                ],
            },
        },

        'beijing-falls': {
            kind: 'cinematic',
            id: 'beijing-falls',
            environment: 'great-wall',
            next: 'ending',
            shots: [
                { path: [[0, 30, 90], [0, 18, 10], [0, 14, -30]], lookPath: [[0, 8, -55]], duration: 9 },
                { path: [[0, 14, -30], [60, 40, -80], [120, 80, -140]], lookPath: [[0, 10, -60]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The wall is breached. The garrison army breaks and the gates of the Middle Kingdom swing open one by one.', hold: 3.2 },
                { speaker: 'The Chronicle', text: 'By 1407, Beijing falls. The Yongle Emperor dies defending his capital, and a Timurid prince is enthroned with the Mandate of Heaven.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'One empire now spans Anatolia to the Pacific. The Silk Road has a single master, and Samarkand becomes the axis on which the world turns.', hold: 3.5 },
            ],
        },

        'east-defeat': {
            kind: 'cinematic',
            id: 'east-defeat',
            environment: 'winter-march',
            next: 'ending',
            shots: [
                { path: [[40, 20, 50], [10, 8, 20]], lookPath: [[0, 3, 0]], duration: 8 },
                { path: [[10, 8, 20], [60, 50, 60]], lookPath: [[0, 2, 0]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Ming line holds. The Grand Army — the instrument of forty years of victories — bleeds to death under the wall.', hold: 3.2 },
                { speaker: 'The Chronicle', text: 'Timur survives the retreat, but not the winter. The shattered tumens carry his body — and his unraveling empire — back along the frozen road.', hold: 3.5 },
            ],
        },

        // ── ACT II — CONSOLIDATE: the succession ──────────────────────────
        'consolidate-cinematic': {
            kind: 'cinematic',
            id: 'consolidate-cinematic',
            environment: 'samarkand-dusk',
            next: 'heir-choice',
            shots: [
                { path: [[60, 35, 60], [20, 12, 30]], lookPath: [[0, 8, -10]], duration: 7 },
                { path: [[20, 12, 30], [-20, 10, 20], [-40, 8, 40]], lookPath: [[-48, 8, 42]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The order stuns the council: the Grand Army will not march. For the first time in forty years, the Emir chooses parchment over the sword.', hold: 3.2 },
                { speaker: 'The Chronicle', text: 'Through the winter he dictates: a code of succession, governorships balanced against each other, marriages binding every amir to the house of Timur.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'One question remains — the only one that ever mattered in a steppe empire. Who inherits?', hold: 3 },
            ],
        },

        'heir-choice': {
            kind: 'choice',
            id: 'heir-choice',
            environment: 'samarkand-dusk',
            title: 'The Question of the Heir · 1405',
            prompt: 'The dynasty\'s future rests on a single name.',
            camera: { position: [30, 16, 40], target: [0, 8, -10] },
            options: [
                {
                    id: 'shahrukh',
                    label: 'Shah Rukh — the Scholar',
                    icon: '📜',
                    description:
                        'Your youngest son: pious, patient, beloved of Herat\'s scholars. No conqueror — but empires are kept by administrators, not conquerors.',
                    effects: { diplomacy: 10, freedom: 5 },
                    flags: ['heir-shahrukh'],
                    next: 'khan-crisis',
                },
                {
                    id: 'pir-muhammad',
                    label: 'Pir Muhammad — the Soldier',
                    icon: '🗡',
                    description:
                        'The grandson Timur himself favored in our history. A warrior the army respects — and the amirs fear. Strength, at the price of resentment.',
                    effects: { strength: 10, chaos: 5 },
                    flags: ['heir-pir'],
                    next: 'khan-crisis',
                },
                {
                    id: 'council-rule',
                    label: 'A Council of Princes',
                    icon: '⚖️',
                    description:
                        'No single heir: a ruling diwan of princes and amirs under written law. Radical. Either the birth of constitutional empire — or of civil war by committee.',
                    effects: { freedom: 12, chaos: 8 },
                    flags: ['heir-council'],
                    next: 'khan-crisis',
                },
            ],
        },

        'khan-crisis': {
            kind: 'choice',
            id: 'khan-crisis',
            environment: 'samarkand-day',
            title: 'The Revolt of the Steppe Khans · 1406',
            prompt: 'Three frontier khans refuse the new succession law and fortify the old citadel at Sygnak. The first test of the new order.',
            camera: { position: [40, 24, 56], target: [0, 6, 0] },
            options: [
                {
                    id: 'negotiate',
                    label: 'Summon Them to the Carpet',
                    icon: '🤝',
                    description:
                        'Gold, marriages, and titles — bind the khans with honey instead of blood. The law must be seen to reward loyalty.',
                    effects: { diplomacy: 10, freedom: 3 },
                    flags: ['khans-negotiated', 'succession-secured'],
                    next: 'succession-golden',
                },
                {
                    id: 'crush',
                    label: 'Make an Example of Sygnak',
                    icon: '⚔️',
                    description:
                        'The law must also be seen to have teeth. Ride out and break the revolt before it spreads through the tumens.',
                    effects: { strength: 6, chaos: 4 },
                    flags: ['khans-crushed'],
                    next: 'revolt-battle',
                },
            ],
        },

        'revolt-battle': {
            kind: 'battle',
            id: 'revolt-battle',
            environment: 'anatolia',
            battle: {
                id: 'steppe-revolt',
                name: 'The Storming of Sygnak',
                objective:
                    'The rebel khans hold the citadel with veteran steppe cavalry. Break the revolt decisively — a long siege would invite every malcontent in the empire to join it.',
                theme: 'steppe',
                player: {
                    side: 'player', name: 'Imperial Loyalists', color: '#d63b3b', accentColor: '#e8a23d',
                    infantry: 90, cavalry: 50, archers: 40, attack: 1.1, defense: 1.05,
                },
                enemy: {
                    side: 'enemy', name: 'Rebel Khans', color: '#6b5a8a', accentColor: '#9a86bd',
                    infantry: 80, cavalry: 60, archers: 30, attack: 1.0, defense: 0.95,
                },
                onVictory: 'succession-golden',
                onDefeat: 'succession-collapse',
                events: [
                    {
                        id: 'rebel-charge',
                        atTime: 15,
                        title: 'The Khans Charge',
                        prompt: 'Rebel cavalry masses for a single great charge down the hill. Meet it how?',
                        options: [
                            {
                                id: 'pikes',
                                label: 'Plant the Pikes',
                                icon: '🛡',
                                description: 'Brace and let the charge die on a hedge of steel.',
                                mod: { defenseMult: 1.4 },
                            },
                            {
                                id: 'counter',
                                label: 'Counter-Charge',
                                icon: '🐎',
                                description: 'Send your own riders uphill into theirs. Audacity against momentum.',
                                effects: { strength: 3, chaos: 3 },
                                mod: { flankCavalry: 30, attackMult: 1.1 },
                            },
                        ],
                    },
                    {
                        id: 'citadel',
                        atTime: 40,
                        title: 'The Citadel Gate',
                        prompt: 'The field is tilting your way, but the citadel still spits arrows. End it.',
                        options: [
                            {
                                id: 'bombard',
                                label: 'Bombard the Gate',
                                icon: '🪨',
                                description: 'Bring up the engines and crack the rebels\' last shell.',
                                mod: { catapultBarrage: 10 },
                            },
                            {
                                id: 'mercy-terms',
                                label: 'Offer Terms Mid-Battle',
                                icon: '🕊',
                                description: 'Shout an offer over the walls: surrender now, keep your heads. Some defenders waver.',
                                effects: { diplomacy: 5 },
                                mod: { enemyAttackMult: 0.7, moraleShift: 0.15 },
                            },
                        ],
                    },
                ],
            },
        },

        'succession-golden': {
            kind: 'cinematic',
            id: 'succession-golden',
            environment: 'samarkand-day',
            next: 'ending',
            shots: [
                { path: [[80, 45, 80], [30, 20, 40]], lookPath: [[0, 10, -10]], duration: 8 },
                { path: [[30, 20, 40], [-30, 15, 0], [0, 40, -80]], lookPath: [[0, 12, -32]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The succession holds. When Timur dies in his bed in 1409 — in his own palace, under his own dome — power passes without a single battle.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'The Timurid state hardens into something the steppe has never produced: a bureaucratic empire, Rome with paiza passports, astride every road between Europe and China.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'European captains will spend centuries seeking a sea route around it — and paying its tolls in the meantime.', hold: 3 },
            ],
        },

        'succession-collapse': {
            kind: 'cinematic',
            id: 'succession-collapse',
            environment: 'samarkand-dusk',
            next: 'ending',
            shots: [
                { path: [[50, 25, 50], [15, 10, 25]], lookPath: [[0, 6, 0]], duration: 8 },
                { path: [[15, 10, 25], [70, 50, 70]], lookPath: [[0, 5, 0]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Sygnak holds. The defeat cracks the new order\'s aura of inevitability, and crack by crack, khan by khan, the law of succession becomes a dead letter.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'The empire fragments a few years later than in our history — but it fragments all the same.', hold: 3 },
            ],
        },

        // ── ACT II — WEST: the Gates of Europe ────────────────────────────
        'west-march': {
            kind: 'cinematic',
            id: 'west-march',
            environment: 'anatolia',
            next: 'gates-battle',
            shots: [
                { path: [[100, 55, 100], [40, 25, 70]], lookPath: [[0, 10, -40]], duration: 7 },
                { path: [[40, 25, 70], [-30, 15, 40], [-50, 12, 0]], lookPath: [[0, 14, -60]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Spring 1405. The Grand Army pours west along the roads it broke in 1402, when Timur smashed Sultan Bayezid at Ankara and carried him off in a litter.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'This time there will be no withdrawal. Ahead, the patched-together Ottoman host and a hastily-sworn crusader coalition bar the road to the straits — and to Europe behind them.', hold: 3.8 },
            ],
        },

        'gates-battle': {
            kind: 'battle',
            id: 'gates-battle',
            environment: 'anatolia',
            battle: {
                id: 'gates-of-europe',
                name: 'The Gates of Europe',
                objective:
                    'The Ottoman-Crusader coalition stands between the Grand Army and the Bosphorus. Break them here, and no force on the continent can stop the horsetail standard.',
                theme: 'anatolia',
                player: {
                    side: 'player', name: 'Timurid Grand Army', color: '#d63b3b', accentColor: '#e8a23d',
                    infantry: 100, cavalry: 70, archers: 45, attack: 1.1, defense: 1.0,
                },
                enemy: {
                    side: 'enemy', name: 'Ottoman–Crusader Coalition', color: '#2f6f50', accentColor: '#74a78c',
                    infantry: 140, cavalry: 45, archers: 50, attack: 1.0, defense: 1.05,
                },
                onVictory: 'europe-opens',
                onDefeat: 'west-defeat',
                events: [
                    {
                        id: 'feigned-retreat',
                        atTime: 14,
                        title: 'The Oldest Trick on the Steppe',
                        prompt: 'The coalition\'s knights are eager and heavy. Your riders know the feigned retreat as they know their own names.',
                        options: [
                            {
                                id: 'feign',
                                label: 'Feign Retreat, Then Envelop',
                                icon: '🌀',
                                description: 'Draw the knights out of their line, then close the horns around them.',
                                effects: { strength: 4 },
                                mod: { flankCavalry: 36, attackMult: 1.1 },
                            },
                            {
                                id: 'stand',
                                label: 'Refuse the Trick — Stand and Grind',
                                icon: '🛡',
                                description: 'They expect cunning. Give them a wall instead and let their charge exhaust itself.',
                                mod: { defenseMult: 1.35 },
                            },
                        ],
                    },
                    {
                        id: 'janissary-push',
                        atTime: 38,
                        title: 'The Janissaries Advance',
                        prompt: 'The Sultan commits his elite infantry to the center. Your answer?',
                        options: [
                            {
                                id: 'engines',
                                label: 'Stone Rain on the Janissaries',
                                icon: '🪨',
                                description: 'The engines speak. Elite infantry packed in close ranks make a generous target.',
                                effects: { chaos: 3 },
                                mod: { catapultBarrage: 14 },
                            },
                            {
                                id: 'fire-sky',
                                label: 'Darken the Sky with Fire',
                                icon: '🏹',
                                description: 'Every archer looses burning shafts. The coalition fights under a ceiling of flame.',
                                mod: { archerDamageMult: 1.7 },
                            },
                        ],
                    },
                    {
                        id: 'west-rally',
                        whenMoraleBelow: { side: 'player', value: 0.5 },
                        title: 'The Standard Falters',
                        prompt: 'The coalition fights with the desperation of men defending a continent. Your line is buckling.',
                        options: [
                            {
                                id: 'emir-standard',
                                label: 'The Emir Takes the Standard',
                                icon: '👑',
                                description: 'Timur rides the line with the horsetail banner. Forty years of legend in a single silhouette.',
                                effects: { strength: 5 },
                                mod: { moraleShift: 0.35, attackMult: 1.15 },
                            },
                            {
                                id: 'fresh-tumen',
                                label: 'Commit the Last Tumen',
                                icon: '🐎',
                                description: 'Everything. The reserve rides, and the matter is settled one way or the other.',
                                effects: { chaos: 4 },
                                mod: { flankCavalry: 30, moraleShift: 0.15 },
                            },
                        ],
                    },
                ],
            },
        },

        'europe-opens': {
            kind: 'cinematic',
            id: 'europe-opens',
            environment: 'anatolia',
            next: 'ending',
            shots: [
                { path: [[0, 30, 90], [0, 20, 0], [0, 18, -40]], lookPath: [[0, 12, -60]], duration: 9 },
                { path: [[0, 18, -40], [-80, 50, -100], [-150, 90, -150]], lookPath: [[0, 10, -60]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The coalition shatters. The Ottoman state — already broken once at Ankara — dissolves, and the straits lie open.', hold: 3.2 },
                { speaker: 'The Chronicle', text: 'Timurid tumens cross into the Balkans in 1406. Plague-hollowed, schism-divided Europe has no answer to the army that conquered three empires.', hold: 3.5 },
                { speaker: 'The Chronicle', text: 'The Renaissance that was beginning in Florence will happen — but it will happen in Chagatai, under turquoise domes on the Danube.', hold: 3.5 },
            ],
        },

        'west-defeat': {
            kind: 'cinematic',
            id: 'west-defeat',
            environment: 'anatolia',
            next: 'ending',
            shots: [
                { path: [[40, 20, 60], [10, 10, 30]], lookPath: [[0, 4, 0]], duration: 8 },
                { path: [[10, 10, 30], [80, 60, 80]], lookPath: [[0, 4, 0]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'On the worst day of his sixty-eight years, the Emir watches the Grand Army break against the coalition line.', hold: 3.2 },
                { speaker: 'The Chronicle', text: 'The retreat east never quite ends. The empire he spent a lifetime stitching together comes apart at the seams within a decade.', hold: 3.5 },
            ],
        },

        // ── ACT III ────────────────────────────────────────────────────────
        ending: { kind: 'ending', id: 'ending' },
    },

    endings: [
        {
            id: 'immortal-emir',
            title: 'The Immortal Emir',
            subtitle: 'Conquest of China · the world\'s axis moves to Samarkand',
            icon: '🐉',
            color: '#DC2626',
            linkedTimelineId: 'immortal-emir',
            priority: 10,
            requiresFlags: ['china-campaign:won'],
            epilogue: [
                { text: 'Timur lives another twenty years, ruling the largest land empire in human history from a throne in Beijing and a tomb-city in Samarkand.', hold: 3.5 },
                { text: 'The Ottoman beylik never recovers. European colonial expansion never begins — there is nothing left to expand into that does not already pay the Emir\'s tolls.', hold: 3.5 },
                { text: 'Six centuries later, the Great Timurid Federation spans Turkey to Korea, and the world\'s lingua franca is Chagatai Turkic.', hold: 3.5 },
            ],
        },
        {
            id: 'unified-succession',
            title: 'Pax Timuridea',
            subtitle: 'The succession holds · a steppe Rome is born',
            icon: '🏛',
            color: '#D97706',
            linkedTimelineId: 'unified-succession',
            priority: 8,
            requiresFlags: ['path-consolidate', 'succession-secured'],
            statGates: { chaos: ['<', 70] },
            epilogue: [
                { text: 'The empire Timur built with the sword survives him by centuries — because in his last years he built it again, with law.', hold: 3.5 },
                { text: 'A stable, bureaucratic Timurid state dominates every road between Europe and Asia, taxing the Silk Road and starving European expansion before it can begin.', hold: 3.5 },
                { text: 'Historians of this reality call it what Timur\'s grandson called it: the Pax Timuridea.', hold: 3 },
            ],
        },
        {
            // Same reality as unified-succession, reached by crushing the revolt.
            id: 'unified-succession-by-sword',
            title: 'Pax Timuridea',
            subtitle: 'The succession holds — written in law, sealed in blood',
            icon: '🏛',
            color: '#D97706',
            linkedTimelineId: 'unified-succession',
            priority: 8,
            requiresFlags: ['path-consolidate', 'steppe-revolt:won'],
            statGates: { chaos: ['<', 75] },
            epilogue: [
                { text: 'Sygnak falls, and with it the last argument against the new order. The succession law is never tested in open revolt again.', hold: 3.5 },
                { text: 'A stable, bureaucratic Timurid state dominates every road between Europe and Asia — though its founding code is remembered as much for its teeth as its wisdom.', hold: 3.5 },
                { text: 'Historians of this reality call it the Pax Timuridea.', hold: 3 },
            ],
        },
        {
            id: 'western-campaign',
            title: 'The Western Storm',
            subtitle: 'Europe falls under the horsetail standard',
            icon: '🌍',
            color: '#7C3AED',
            linkedTimelineId: 'western-campaign',
            priority: 10,
            requiresFlags: ['gates-of-europe:won'],
            epilogue: [
                { text: 'The tumens winter in Buda in 1407 and water their horses in the Rhine in 1409. No coalition holds; none ever quite forms again.', hold: 3.5 },
                { text: 'The European Renaissance is delayed by a century and transformed forever — flowing through Samarkand\'s observatories rather than Florence\'s banks.', hold: 3.5 },
                { text: 'In this reality, "the West" is a direction, not a civilization.', hold: 3 },
            ],
        },
        {
            id: 'historical-fragmentation',
            title: 'The Shattered Inheritance',
            subtitle: 'History reasserts itself · the empire of one man dies with him',
            icon: '🕯',
            color: '#64748B',
            priority: 0,
            epilogue: [
                { text: 'However the dice fell, they came to rest where they did in our own world: the empire fragments among quarreling heirs.', hold: 3.5 },
                { text: 'And yet — from the wreckage, Shah Rukh\'s Herat and Ulugh Beg\'s Samarkand kindle the Timurid Renaissance, and a great-great-grandson named Babur will found an empire in India.', hold: 3.8 },
                { text: 'Even the timelines that collapse leave light behind. This is the reality you are reading this in.', hold: 3.2 },
            ],
        },
    ],
};
