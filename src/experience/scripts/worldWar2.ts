/* World War II interactive episode: Munich 1938 → six realities. The player
   leads the Allies. No Nazi symbols are shown; German forces appear only in
   field grey with the plain cross on their vehicles. */
import type { BattleConfig, Beat, ExperienceScript } from '../types';

const CZECH_1938 = { side: 'player' as const, color: '#7d7550', accentColor: '#b0202a', helmet: 'adrian' as const };
const BRITISH_DESERT = { side: 'player' as const, color: '#a8946a', accentColor: '#b33a2a', helmet: 'brodie' as const };
const US_1944 = { side: 'player' as const, color: '#6b6a48', accentColor: '#3a4a7a', helmet: 'm1' as const };
const GERMAN_GREY = { side: 'enemy' as const, color: '#6a6e5e', accentColor: '#3a3a36', helmet: 'stahlhelm' as const };
const AFRIKA_KORPS = { side: 'enemy' as const, color: '#a39468', accentColor: '#4a4a3a', helmet: 'stahlhelm' as const };

/**
 * The Czechoslovak border, October 1938, in the reality where Britain and France
 * refuse to sign at Munich. The Czechoslovak army holds its new concrete forts.
 */
const sudeten: BattleConfig = {
    id: 'sudeten',
    name: 'The Battle of the Border Forts',
    era: 'ww2',
    theme: 'colonial',
    objective:
        "1 October 1938. There was no deal at Munich, and the German army has crossed the border. Czechoslovakia has 1.25 million men under arms and a chain of new concrete forts in the mountains. Hold the line until France and Britain can strike from the west.",
    player: { ...CZECH_1938, name: 'Czechoslovak Army', infantry: 120, cavalry: 10, archers: 36, attack: 1.0, defense: 1.25 },
    enemy: { ...GERMAN_GREY, name: 'German Second and Tenth Armies', infantry: 150, cavalry: 16, archers: 30, attack: 1.15, defense: 1.0 },
    onVictory: 'hitler-falls',
    onDefeat: 'czech-falls',
    events: [
        {
            id: 'luftwaffe',
            atTime: 9,
            title: 'Bombers Over the Mountains',
            prompt: "German bombers are hitting the roads behind your forts. The French army has mobilised on the Maginot Line, but it has not yet attacked.",
            options: [
                {
                    id: 'man-forts',
                    label: 'Into the Forts',
                    icon: '🛡',
                    description: 'Pull the men into the concrete and let the bombs fall on empty roads.',
                    effects: { strength: 3 },
                    mod: { defenseMult: 1.25 },
                },
                {
                    id: 'call-paris',
                    label: 'Call on Paris',
                    icon: '📞',
                    description: "Beg France to attack the half-built Siegfried Line now, while most of Germany's army is here in the east.",
                    effects: { diplomacy: 5 },
                    mod: { enemyAttackMult: 0.9 },
                },
            ],
        },
        {
            id: 'generals-plot',
            atTime: 28,
            title: "The Generals' Plot",
            prompt: "Rumours reach Prague that the chief of the German General Staff, Franz Halder, and other officers were ready to arrest Hitler if he dragged Germany into a war it could lose.",
            options: [
                {
                    id: 'counter-attack',
                    label: 'Counter-Attack',
                    icon: '⚔️',
                    description: 'Show the German generals that this war cannot be won. Send the tanks and the reserves forward.',
                    effects: { strength: 4 },
                    mod: { attackMult: 1.15, catapultBarrage: 10 },
                },
                {
                    id: 'broadcast',
                    label: 'Broadcast to Germany',
                    icon: '📻',
                    description: "Tell German soldiers by radio that Britain and France are now at war with them, and that their generals know it.",
                    effects: { diplomacy: 4 },
                    mod: { enemyAttackMult: 0.88 },
                },
            ],
        },
        {
            id: 'last-line',
            whenMoraleBelow: { side: 'player', value: 0.5 },
            title: 'The Forts Are Surrounded',
            prompt: 'German pioneers with flamethrowers have reached the first bunkers. Behind you lies the open plain of Bohemia.',
            options: [
                {
                    id: 'hold-forts',
                    label: 'Fight from Every Bunker',
                    icon: '🧱',
                    description: 'Every fort fights on alone. They were built for exactly this.',
                    effects: { strength: 3 },
                    mod: { defenseMult: 1.3 },
                },
                {
                    id: 'moravia',
                    label: 'Fall Back to Moravia',
                    icon: '↩️',
                    description: 'Give up the mountains, save the army, and fight on the next ridge.',
                    mod: { moraleShift: 0.25 },
                },
            ],
        },
    ],
};

/** The Second Battle of El Alamein, 23 October – 4 November 1942. */
function alamein(): BattleConfig {
    return {
        id: 'alamein',
        name: 'The Second Battle of El Alamein',
        era: 'ww2',
        theme: 'colonial',
        commander: 'montgomery',
        objective:
            "23 October 1942, 9:40 in the evening. Rommel's army is dug in behind half a million mines, sixty kilometres from Alexandria. Break through the minefields and destroy the Panzer Army Africa before it can reach the Suez Canal.",
        player: { ...BRITISH_DESERT, name: 'British Eighth Army', infantry: 130, cavalry: 16, archers: 34, attack: 1.0, defense: 1.0 },
        enemy: { ...AFRIKA_KORPS, name: 'Panzer Army Africa', infantry: 125, cavalry: 14, archers: 34, attack: 1.05, defense: 1.3 },
        onVictory: 'alamein-won',
        onDefeat: 'alamein-lost',
        events: [
            {
                id: 'lightfoot',
                atTime: 6,
                title: 'Operation Lightfoot',
                prompt: 'Nearly nine hundred guns are lined up wheel to wheel. Behind them, the sappers are waiting to clear paths through the "Devil\'s Gardens", the German minefields.',
                options: [
                    {
                        id: 'barrage',
                        label: 'Open Fire',
                        icon: '💥',
                        description: 'The biggest British barrage since 1918 lights up the desert for twenty minutes.',
                        effects: { strength: 4 },
                        mod: { catapultBarrage: 16 },
                    },
                    {
                        id: 'sappers',
                        label: 'Sappers First',
                        icon: '🧭',
                        description: 'Let the engineers clear wide lanes with mine detectors before the tanks go in. Slower, but fewer tanks will be lost to mines.',
                        effects: { diplomacy: 2 },
                        mod: { defenseMult: 1.2, enemyAttackMult: 0.92 },
                    },
                ],
            },
            {
                id: 'rommel-returns',
                atTime: 26,
                title: 'Rommel Returns',
                prompt: 'Rommel was in an Austrian hospital when the battle began. He has flown back to Africa and is gathering his panzers for a counter-attack.',
                options: [
                    {
                        id: 'supercharge',
                        label: 'Operation Supercharge',
                        icon: '🛡️',
                        description: 'Throw the armoured divisions at one narrow point and smash through, whatever it costs.',
                        effects: { strength: 4 },
                        mod: { attackMult: 1.2, flankCavalry: 8 },
                    },
                    {
                        id: 'crumbling',
                        label: 'Keep Crumbling',
                        icon: '⛏',
                        description: "Montgomery's plan: wear down the Axis infantry bit by bit and let Rommel waste his tanks attacking you.",
                        mod: { defenseMult: 1.15, enemyAttackMult: 0.9 },
                    },
                ],
            },
            {
                id: 'no-retreat',
                whenMoraleBelow: { side: 'player', value: 0.5 },
                title: 'The Breakthrough Stalls',
                prompt: 'Burning tanks fill the lanes through the minefields. The armoured commanders want to pull back and wait.',
                options: [
                    {
                        id: 'monty-order',
                        label: '"No Withdrawal"',
                        icon: '🎖',
                        description: 'Montgomery has promised there will be no more retreats. The tanks go forward again.',
                        effects: { strength: 3 },
                        mod: { moraleShift: 0.3, attackMult: 1.05 },
                    },
                    {
                        id: 'desert-air-force',
                        label: 'Call the Desert Air Force',
                        icon: '✈️',
                        description: 'Send the bombers over the German anti-tank guns, wave after wave.',
                        mod: { catapultBarrage: 12 },
                    },
                ],
            },
        ],
    };
}

/**
 * Omaha Beach, 6 June 1944. The weather choice at Southwick and the outcome
 * at El Alamein both change how strong the German defence is.
 */
function omaha(weather: 'go' | 'delay', alameinWon: boolean): BattleConfig {
    const delayed = weather === 'delay';
    return {
        id: 'omaha',
        name: 'Omaha Beach',
        era: 'ww2',
        theme: 'colonial',
        objective: delayed
            ? "The landing has come weeks late. Rommel has had time to bring a panzer division to the coast and lay thousands more mines. Get off the beach and up the bluffs, or the invasion fails."
            : alameinWon
                ? "6 June 1944, 6:30 in the morning. The sea is rough and the bombers missed the bunkers, but the Germans did not expect a landing in this weather. Get off the beach and up the bluffs before the tide comes in."
                : "6 June 1944, 6:30 in the morning. Rommel, who was never beaten in Africa, has turned this coast into a wall of mines, obstacles and bunkers. Get off the beach and up the bluffs before the tide comes in.",
        player: { ...US_1944, name: 'US 1st and 29th Infantry Divisions', infantry: 140, cavalry: 10, archers: 30, attack: alameinWon ? 1.0 : 0.95, defense: 1.0 },
        enemy: {
            ...GERMAN_GREY,
            name: delayed ? '352nd Division and 21st Panzer' : '352nd and 716th Infantry Divisions',
            // tuned per variant: a delay costs surprise, a lost desert war costs men and landing craft
            infantry: delayed ? (alameinWon ? 120 : 118) : alameinWon ? 112 : 110,
            cavalry: delayed ? 8 : alameinWon ? 0 : 6,
            archers: delayed || !alameinWon ? 40 : 44,
            attack: 1.05,
            defense: delayed ? 1.5 : alameinWon ? 1.45 : 1.4,
        },
        onVictory: 'liberation',
        onDefeat: 'dday-fails',
        events: [
            {
                id: 'dd-tanks',
                atTime: 6,
                title: 'The Swimming Tanks',
                prompt: 'Thirty-two Sherman tanks have canvas floatation screens so they can swim ashore from five kilometres out. The waves are a metre and a half high.',
                options: [
                    {
                        id: 'launch-at-sea',
                        label: 'Launch Them at Sea',
                        icon: '🌊',
                        description: 'Stick to the plan and launch them far out, out of range of the coastal guns.',
                        effects: { chaos: 4 },
                        mod: { moraleShift: -0.05 },
                    },
                    {
                        id: 'land-on-beach',
                        label: 'Carry Them to the Beach',
                        icon: '🛡️',
                        description: 'Keep the tanks on the landing craft and drop them straight onto the sand, under fire.',
                        effects: { strength: 3 },
                        mod: { flankCavalry: 6 },
                    },
                ],
            },
            {
                id: 'destroyers',
                atTime: 24,
                title: 'Destroyers Close In',
                prompt: "From the bridge of their ships, destroyer captains can see the infantry pinned on the sand. Their orders say not to come so close to the shore.",
                options: [
                    {
                        id: 'close-in',
                        label: 'Come In Close',
                        icon: '🚢',
                        description: 'Bring the destroyers within a kilometre of the beach, scraping the sandbanks, and shoot at the bunkers point-blank.',
                        effects: { strength: 4 },
                        mod: { catapultBarrage: 16 },
                    },
                    {
                        id: 'bangalore',
                        label: 'Blow the Wire',
                        icon: '🧨',
                        description: 'Engineers push Bangalore torpedoes under the wire, and small groups climb the bluffs between the strongpoints.',
                        effects: { chaos: 2 },
                        mod: { attackMult: 1.15 },
                    },
                ],
            },
            {
                id: 'pinned',
                whenMoraleBelow: { side: 'player', value: 0.5 },
                title: 'Pinned at the Shingle',
                prompt: 'Thousands of men are lying behind a low bank of stones, and the tide is rising behind them. Offshore, General Bradley is thinking about sending the next waves somewhere else.',
                options: [
                    {
                        id: 'get-off-beach',
                        label: '"Get Off This Beach!"',
                        icon: '🎖',
                        description: 'Colonel George Taylor: "Two kinds of people are staying on this beach: the dead and those who are going to die. Now let\'s get the hell out of here!"',
                        effects: { strength: 4 },
                        mod: { moraleShift: 0.3, attackMult: 1.1 },
                    },
                    {
                        id: 'dig-in',
                        label: 'Hold On and Wait',
                        icon: '⛏',
                        description: 'Dig in behind the shingle and wait for the next wave and the navy\'s guns.',
                        mod: { defenseMult: 1.25 },
                    },
                ],
            },
        ],
    };
}

/** Southwick House, 4–5 June 1944, built twice: once after a victory at El Alamein, once after a defeat. */
function southwick(alameinWon: boolean): Record<string, Beat> {
    const s = alameinWon ? '' : '-b';
    const ike = { id: 'eisenhower', position: [0, 0, -10] as [number, number, number], facing: 0 };
    return {
        [`southwick-intro${s}`]: {
            kind: 'cinematic',
            id: `southwick-intro${s}`,
            environment: 'southwick-1944',
            next: `explore-southwick${s}`,
            cast: [{ ...ike, pose: 'think' }],
            shots: [
                { path: [[0, 60, 220], [0, 30, 90]], lookPath: [[0, 10, 260], [0, 8, -20]], duration: 9 },
                { path: [[0, 30, 90], [12, 9, 26], [8, 5.5, 9]], lookPath: [[0, 8, -30], [0, 3.6, -10]], duration: 11 },
            ],
            narration: alameinWon
                ? [
                    { speaker: 'The Chronicle', text: 'Southwick House, near Portsmouth, 4 June 1944. More than six thousand ships and a hundred and fifty thousand men are waiting to cross the English Channel to Normandy.', hold: 4 },
                    { speaker: 'The Chronicle', text: 'After Midway and El Alamein, the Allies have the initiative everywhere. The Red Army is advancing in the east, and Rome is about to fall.', hold: 3.6 },
                    { speaker: 'The Chronicle', text: 'But a gale is blowing in the Channel, and the invasion has already been postponed once. General Dwight D. Eisenhower, Supreme Allied Commander, has to decide alone.', hold: 4 },
                ]
                : [
                    { speaker: 'The Chronicle', text: 'Southwick House, near Portsmouth, 4 June 1944. More than six thousand ships and a hundred and fifty thousand men are waiting to cross the English Channel to Normandy.', hold: 4 },
                    { speaker: 'The Chronicle', text: 'The war in Africa dragged on into 1943, and men and landing craft that should be here are still in the Mediterranean. Rommel, the hero of Egypt, now commands the defences of the French coast.', hold: 4 },
                    { speaker: 'The Chronicle', text: 'A gale is blowing in the Channel, and the invasion has already been postponed once. General Dwight D. Eisenhower, Supreme Allied Commander, has to decide alone.', hold: 4 },
                ],
        },
        [`explore-southwick${s}`]: {
            kind: 'explore',
            id: `explore-southwick${s}`,
            environment: 'southwick-1944',
            cast: [{ ...ike, pose: 'think' }],
            prompt: 'Explore Southwick House on the night of 4 June: drag to look around and click the glowing markers.',
            camera: { position: [16, 9, 26], target: [0, 4, -16] },
            hotspots: [
                {
                    id: 'map-room',
                    position: [-12, 4.5, -25],
                    label: 'The Map Room',
                    icon: '🗺',
                    title: 'Group Captain Stagg',
                    description: 'The chief weather forecaster, a Scottish scientist named James Stagg, has spotted a gap in the storms. He thinks the wind will drop for about thirty-six hours on 6 June. The American forecasters disagree with him.',
                },
                {
                    id: 'fleet',
                    position: [0, 8, 60],
                    label: 'The Fleet',
                    icon: '🚢',
                    title: 'Operation Neptune',
                    description: 'Battleships, minesweepers, troop ships and thousands of landing craft. Some convoys have already sailed and had to be called back. Men have been sealed on board their ships for days, seasick and waiting.',
                },
                {
                    id: 'tides',
                    position: [22, 3, -18],
                    label: 'Tides and Moon',
                    icon: '🌙',
                    title: 'Only Three Days a Month',
                    description: 'The landing needs a low tide at dawn, to expose the beach obstacles, and a bright moon the night before for the paratroopers. That happens on 5, 6 and 7 June. The next chance is two weeks away.',
                },
                {
                    id: 'note',
                    position: [-22, 3, -14],
                    label: 'A Note in a Pocket',
                    icon: '✉️',
                    title: '"The Fault Is Mine Alone"',
                    description: 'Eisenhower has written a short message to read out if the landings fail: "If any blame or fault attaches to the attempt it is mine alone." He keeps it in his wallet.',
                    effects: { diplomacy: 2 },
                },
                {
                    id: 'ike',
                    position: [0, 4.6, -10],
                    label: 'Eisenhower',
                    icon: '⭐',
                    title: 'The Supreme Commander',
                    description: alameinWon
                        ? "A small-town boy from Kansas who had never commanded troops in battle until 1942. His job is less to fight than to keep the British, the Americans, the Canadians and the Free French working together."
                        : "A small-town boy from Kansas who had never commanded troops in battle until 1942. The long fight in Africa has cost him men and landing craft. He knows the beaches will be harder than planned.",
                    advancesTo: `dday-choice${s}`,
                },
            ],
        },
        [`dday-choice${s}`]: {
            kind: 'choice',
            id: `dday-choice${s}`,
            environment: 'southwick-1944',
            cast: [{ ...ike, pose: 'command' }],
            title: 'Southwick House · 5 June, 4:15 a.m.',
            prompt: 'Rain is lashing the windows. Stagg says the break in the weather will come. The commanders are silent, waiting for Eisenhower.',
            camera: { position: [7, 4.5, 10], target: [0, 3.4, -10] },
            options: [
                {
                    id: 'go',
                    label: '"OK, We\'ll Go"',
                    icon: '✅',
                    description: 'Trust the forecast. The invasion sails tonight and lands on the morning of 6 June.',
                    effects: { strength: 6, chaos: 4 },
                    flags: ['go-june-6'],
                    next: `omaha-landing${s}`,
                },
                {
                    id: 'delay',
                    label: 'Wait for Better Weather',
                    icon: '⏳',
                    description: 'The risk is too great. Unload the men and wait for the next good tides in two weeks.',
                    effects: { diplomacy: 2, chaos: 6 },
                    flags: ['delayed'],
                    next: `storm${s}`,
                },
            ],
        },
        [`storm${s}`]: {
            kind: 'cinematic',
            id: `storm${s}`,
            environment: 'southwick-1944',
            next: `omaha-delay${s}`,
            cast: [{ ...ike, pose: 'think' }],
            shots: [
                { path: [[30, 20, 60], [0, 12, 120]], lookPath: [[0, 6, 200]], duration: 9 },
                { path: [[0, 12, 120], [6, 5, 8]], lookPath: [[0, 3.5, -10]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'On 19 June, the date of the next good tides, the worst Channel storm in forty years blows for four days. The invasion is postponed again, into July.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Some troops have been briefed and then kept waiting for weeks. German intelligence picks up hints of the plan, and Rommel moves a panzer division up to the Normandy coast.', hold: 4 },
            ],
        },
        [`omaha-landing${s}`]: {
            kind: 'cinematic',
            id: `omaha-landing${s}`,
            environment: 'normandy-1944',
            next: `omaha-go${s}`,
            shots: [
                { path: [[0, 40, 360], [0, 8, 150]], lookPath: [[0, 6, 0]], duration: 9 },
                { path: [[0, 8, 150], [-20, 4, 112]], lookPath: [[-20, 10, -90]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Normandy, 6 June 1944. Paratroopers have dropped inland in the night. At dawn the navy opens fire, and the landing craft head for five beaches: Utah, Omaha, Gold, Juno and Sword.', hold: 4 },
                { speaker: 'The Chronicle', text: 'At Omaha, the bombers have dropped their loads too far inland in the cloud. The bunkers on the bluffs are untouched, and German machine gunners are waiting.', hold: 4 },
            ],
        },
        [`omaha-go${s}`]: { kind: 'battle', id: `omaha-go${s}`, environment: 'normandy-1944', battle: omaha('go', alameinWon) },
        [`omaha-delay${s}`]: { kind: 'battle', id: `omaha-delay${s}`, environment: 'normandy-1944', battle: omaha('delay', alameinWon) },
    };
}

export const worldWar2Script: ExperienceScript = {
    chapterId: 'world-war-2',
    title: 'Their Finest Hour',
    era: 'Munich · 1938',
    startBeat: 'intro',
    initialStats: { chaos: 50, freedom: 40, diplomacy: 45, strength: 35 },
    defaultEnding: 'allied-victory',

    characters: {
        churchill: {
            id: 'churchill', name: 'Winston Churchill', role: 'Member of Parliament, Prime Minister from May 1940',
            face: '/images/chapters/world-war-2/faces/winston-churchill.webp',
            outfit: 'homburg', skin: '#efc3a6', hair: '#c9b8a0', robe: '#1f2026', accent: '#2a3a6a', breeches: '#2a2a30',
        },
        roosevelt: {
            id: 'roosevelt', name: 'Franklin D. Roosevelt', role: '32nd President of the United States',
            face: '/images/chapters/world-war-2/faces/franklin-d-roosevelt.webp',
            outfit: 'frock-coat', skin: '#e9c0a2', hair: '#9a948c', robe: '#2b3040', accent: '#3a3a44', breeches: '#2b3040',
        },
        eisenhower: {
            id: 'eisenhower', name: 'Dwight D. Eisenhower', role: 'Supreme Allied Commander in Europe',
            face: '/images/chapters/world-war-2/faces/dwight-d-eisenhower.webp',
            outfit: 'peaked-cap', skin: '#ecbf9e', hair: '#b8a68a', hat: '#6b6a48', robe: '#5f5d40', accent: '#4a3624', breeches: '#7a6e52',
        },
        montgomery: {
            id: 'montgomery', name: 'Bernard Montgomery', role: 'Commander of the British Eighth Army',
            face: '/images/chapters/world-war-2/faces/bernard-montgomery.webp',
            outfit: 'beret', skin: '#e6b898', hair: '#8a7a64', robe: '#a8946a', accent: '#b33a2a', breeches: '#8e7c56',
        },
        rommel: {
            id: 'rommel', name: 'Erwin Rommel', role: 'Commander of the Panzer Army Africa',
            face: '/images/chapters/world-war-2/faces/erwin-rommel.webp',
            outfit: 'peaked-cap', skin: '#e4b494', hair: '#6b5a48', hat: '#8a8466', robe: '#9a8c62', accent: '#3a3a36', breeches: '#8a7e5a',
        },
    },

    beats: {
        // ── ACT I: London, September 1938 ─────────────────────────────────
        intro: {
            kind: 'cinematic',
            id: 'intro',
            environment: 'london-1940',
            next: 'explore-london',
            cast: [{ id: 'churchill', position: [4, 0, -4], facing: 0.15, pose: 'idle' }],
            shots: [
                { path: [[120, 60, 110], [60, 30, 60]], lookPath: [[10, 20, -36]], duration: 9 },
                { path: [[60, 30, 60], [70, 40, 10]], lookPath: [[66, 49, -32], [66, 52, -32]], duration: 9 },
                { path: [[70, 40, 10], [24, 10, 24], [12, 6, 14]], lookPath: [[30, 20, -30], [4, 3.6, -4]], duration: 12 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'London, September 1938. Twenty years after the last war, Britain is digging trenches in the parks and handing out gas masks to every family.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Adolf Hitler, the dictator of Germany, demands the Sudetenland, the mountain border region of Czechoslovakia where three million German speakers live. He says it is his last territorial demand.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'Prime Minister Neville Chamberlain is flying to Munich to meet Hitler, Mussolini and the French premier Daladier. The Czechoslovaks have not been invited to the meeting about their own country.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Winston Churchill, a backbench MP whom most people think is finished, has been warning for years that Hitler cannot be trusted. In our history, Britain chose peace at Munich. In this one, you decide.', hold: 4.4 },
            ],
        },

        'explore-london': {
            kind: 'explore',
            id: 'explore-london',
            environment: 'london-1940',
            cast: [{ id: 'churchill', position: [4, 0, -4], facing: 0.15, pose: 'think' }],
            prompt: 'Explore Westminster: drag to look around and click the glowing markers.',
            camera: { position: [58, 26, 92], target: [24, 18, -24] },
            hotspots: [
                {
                    id: 'commons',
                    position: [-8, 22, -24],
                    label: 'Parliament',
                    icon: '🏛',
                    title: 'The House of Commons',
                    description: 'Most MPs, and most of the country, want peace at almost any price. They remember the trenches of 1914 to 1918, and they have been told that "the bomber will always get through" and could flatten London in days.',
                },
                {
                    id: 'big-ben',
                    position: [66, 52, -26],
                    label: 'Big Ben',
                    icon: '🕰',
                    title: 'Time Running Out',
                    description: 'Britain began to rearm only a few years ago. The first Spitfire fighters reached an RAF squadron in August 1938. Radar stations are still being built along the coast. Every year of peace means more aircraft.',
                    effects: { strength: 2 },
                },
                {
                    id: 'balloons',
                    position: [37, 5, -11],
                    label: 'Air-Raid Defences',
                    icon: '🎈',
                    title: 'Ready for the Bombers',
                    description: 'Barrage balloons on steel cables to stop low-flying bombers, anti-aircraft guns, sandbags, and thirty-eight million gas masks given out in a single week of crisis.',
                    effects: { chaos: 2 },
                },
                {
                    id: 'czechs',
                    position: [-30, 4, -8],
                    label: 'Czechoslovakia',
                    icon: '🇨🇿',
                    title: 'A Faraway Country',
                    description: 'Chamberlain called it "a quarrel in a faraway country between people of whom we know nothing". But Czechoslovakia is a democracy with a modern army of thirty-five divisions, the Škoda arms works, and a line of concrete forts along its mountain border, all inside the Sudetenland.',
                    effects: { diplomacy: 2 },
                },
                {
                    id: 'churchill',
                    position: [4, 4.6, -4],
                    label: 'Churchill',
                    icon: '🎩',
                    title: 'The Voice in the Wilderness',
                    description: 'Churchill is sixty-three and out of office. He is said to have summed up Munich in one line: "You were given the choice between war and dishonour. You chose dishonour, and you will have war." He wants Britain and France to stand by the Czechs now.',
                    advancesTo: 'munich-choice',
                },
            ],
        },

        'munich-choice': {
            kind: 'choice',
            id: 'munich-choice',
            environment: 'london-1940',
            cast: [{ id: 'churchill', position: [4, 0, -4], facing: 0.15, pose: 'command' }],
            title: 'The Munich Agreement · 29 September 1938',
            prompt: 'Hitler will take the Sudetenland on 1 October, with or without an agreement. Britain and France must decide whether to sign it.',
            camera: { position: [14, 5.5, 14], target: [4, 3.5, -4] },
            options: [
                {
                    id: 'appease',
                    label: 'Sign at Munich',
                    icon: '📜',
                    description: 'Give Hitler the Sudetenland in return for his promise of peace. Britain gets another year to build fighters and radar.',
                    effects: { diplomacy: 6, chaos: -4, strength: 4 },
                    flags: ['appeased'],
                    next: 'peace-for-our-time',
                },
                {
                    id: 'resist',
                    label: 'Stand by Czechoslovakia',
                    icon: '🦁',
                    description: 'Refuse to sign. If Germany attacks, Britain and France go to war, now, alongside the Czechoslovak army and its forts.',
                    effects: { freedom: 8, chaos: 10, strength: 2 },
                    flags: ['resisted'],
                    next: 'sudeten-intro',
                },
            ],
        },

        // ── Branch: war in 1938 ───────────────────────────────────────────
        'sudeten-intro': {
            kind: 'cinematic',
            id: 'sudeten-intro',
            environment: 'sudeten-1938',
            next: 'sudeten-battle',
            shots: [
                { path: [[0, 50, -200], [0, 26, -80]], lookPath: [[0, 4, 60]], duration: 9 },
                { path: [[0, 26, -80], [40, 10, 40], [20, 6, 56]], lookPath: [[0, 3, 70], [-20, 3, 72]], duration: 11 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Chamberlain flies home with no agreement. Britain and France mobilise. On 1 October 1938, German troops cross the Czechoslovak border anyway.', hold: 4 },
                { speaker: 'The Chronicle', text: 'They run into a chain of new concrete bunkers in the forests, held by a well-armed army defending its own homes. Germany has no fuel reserves for a long war, and its western border is almost undefended.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'In Berlin, a group of generals has secretly agreed that if Hitler starts a war he cannot win, they will arrest him. Now the Czechoslovaks must hold.', hold: 4 },
            ],
        },
        'sudeten-battle': { kind: 'battle', id: 'sudeten-battle', environment: 'sudeten-1938', battle: sudeten },
        'hitler-falls': {
            kind: 'cinematic',
            id: 'hitler-falls',
            environment: 'sudeten-1938',
            next: 'ending',
            shots: [
                { path: [[30, 8, 100], [0, 30, 40]], lookPath: [[0, 4, 70], [0, 2, -60]], duration: 8 },
                { path: [[0, 30, 40], [0, 70, -160]], lookPath: [[-40, 0, -120]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The border forts hold for three weeks. French divisions push into the Saarland, and the Royal Navy blockades Germany\'s ports. The war Hitler promised would be short is going badly.', hold: 4 },
                { speaker: 'The Chronicle', text: 'In November, General Halder and his fellow officers act. Hitler is arrested in the Reich Chancellery, and the new military government asks for an armistice.', hold: 4 },
            ],
        },
        'czech-falls': {
            kind: 'cinematic',
            id: 'czech-falls',
            environment: 'sudeten-1938',
            next: 'cabinet-1940',
            shots: [
                { path: [[0, 20, -60], [0, 10, 40]], lookPath: [[0, 3, 80]], duration: 8 },
                { path: [[0, 10, 40], [0, 60, 160]], lookPath: [[0, 0, 0]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The forts are outflanked and Czechoslovakia falls by the end of the year. The French attack in the west stops at the first German fortifications. The generals\' plot never happens.', hold: 4 },
                { speaker: 'The Chronicle', text: 'The war drags on. Poland is overrun in 1939. In May 1940 the German army bursts through the Ardennes, Chamberlain resigns, and Winston Churchill becomes Prime Minister. Six weeks later France has collapsed, and the British army is trapped at Dunkirk.', hold: 4.2 },
            ],
        },

        // ── Branch: appeasement ──────────────────────────────────────────
        'peace-for-our-time': {
            kind: 'cinematic',
            id: 'peace-for-our-time',
            environment: 'london-1940',
            next: 'cabinet-1940',
            cast: [{ id: 'churchill', position: [4, 0, -4], facing: 0.15, pose: 'think' }],
            shots: [
                { path: [[-60, 20, 60], [-20, 10, 30]], lookPath: [[-8, 14, -36]], duration: 8 },
                { path: [[-20, 10, 30], [10, 5, 12]], lookPath: [[4, 3.5, -4]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Chamberlain lands at Heston airfield waving a piece of paper signed by Hitler. That evening he tells cheering crowds that he has brought "peace for our time".', hold: 4 },
                { speaker: 'The Chronicle', text: 'Six months later, German troops march into Prague. In September 1939 they invade Poland, and Britain and France declare war.', hold: 3.8 },
                { speaker: 'The Chronicle', text: 'In May 1940 the German army bursts through the Ardennes. On 10 May, the day the attack began, Winston Churchill became Prime Minister. Six weeks later France has collapsed, and the British army is trapped at Dunkirk.', hold: 4.2 },
            ],
        },

        // ── ACT II: May 1940 ─────────────────────────────────────────────
        'cabinet-1940': {
            kind: 'choice',
            id: 'cabinet-1940',
            environment: 'london-1940',
            cast: [{ id: 'churchill', position: [4, 0, -4], facing: 0.15, pose: 'think' }],
            title: 'The War Cabinet · 28 May 1940',
            prompt: 'The Foreign Secretary, Lord Halifax, wants to ask Mussolini to find out what peace terms Hitler would offer. Most of the army is trapped on the beaches of Dunkirk. Churchill must answer him.',
            camera: { position: [14, 5.5, 14], target: [4, 3.5, -4] },
            options: [
                {
                    id: 'negotiate',
                    label: 'Ask for Terms',
                    icon: '🕊',
                    description: 'Save the army and the Empire while there is still something to save. Hitler has hinted he would leave Britain alone.',
                    effects: { diplomacy: 6, freedom: -12, chaos: -6 },
                    flags: ['negotiated-1940'],
                    next: 'halifax-peace',
                },
                {
                    id: 'fight-on',
                    label: '"We Shall Never Surrender"',
                    icon: '✌️',
                    description: '"If this long island story of ours is to end at last, let it end only when each one of us lies choking in his own blood upon the ground." Britain fights on alone.',
                    effects: { freedom: 8, strength: 6, chaos: 6 },
                    flags: ['fought-on'],
                    next: 'battle-of-britain',
                },
            ],
        },
        'halifax-peace': {
            kind: 'cinematic',
            id: 'halifax-peace',
            environment: 'london-1940',
            next: 'ending',
            shots: [
                { path: [[8, 5, 14], [30, 20, 40]], lookPath: [[4, 4, -4], [10, 14, -36]], duration: 8 },
                { path: [[30, 20, 40], [100, 70, 120]], lookPath: [[20, 20, -40]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Churchill is outvoted and resigns. Lord Halifax becomes Prime Minister and signs a peace that leaves Britain its fleet and its empire, and leaves the continent to Hitler.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'The United States, with no ally left in Europe, stays out of the war in the west. Germany turns all its strength east, against the Soviet Union.', hold: 4 },
            ],
        },
        'battle-of-britain': {
            kind: 'choice',
            id: 'battle-of-britain',
            environment: 'london-1940',
            cast: [{ id: 'churchill', position: [4, 0, -4], facing: 0.15, pose: 'command' }],
            title: 'The Battle of Britain · August 1940',
            prompt: 'The Luftwaffe is bombing the RAF\'s airfields and radar stations every day to clear the sky for an invasion. Fighter Command is losing pilots faster than it can train them.',
            camera: { position: [20, 4, 20], target: [4, 12, -10] },
            options: [
                {
                    id: 'radar-defense',
                    label: 'Trust the Dowding System',
                    icon: '📡',
                    description: 'Radar, observers and a control room in a bunker guide each squadron to the raiders. Spend every fighter on defending the airfields.',
                    effects: { strength: 6, chaos: -2 },
                    flags: ['radar'],
                    next: 'the-few',
                },
                {
                    id: 'vengeance',
                    label: 'Bomb Berlin',
                    icon: '💣',
                    description: 'Send Bomber Command to hit the German capital. It will do little damage, but it will make Hitler furious.',
                    effects: { chaos: 8, strength: 2 },
                    flags: ['bombed-berlin'],
                    next: 'the-blitz',
                },
            ],
        },
        'the-few': {
            kind: 'cinematic',
            id: 'the-few',
            environment: 'london-1940',
            next: 'pearl-harbor',
            cast: [{ id: 'churchill', position: [4, 0, -4], facing: 0.15, pose: 'command' }],
            shots: [
                { path: [[20, 6, 30], [0, 30, 60]], lookPath: [[0, 60, -80]], duration: 8 },
                { path: [[0, 30, 60], [10, 5, 12]], lookPath: [[4, 3.5, -4]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Radar sees every raid forming over France. The fighters meet the bombers again and again, and the Luftwaffe loses almost two aircraft for every one the RAF loses.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Churchill tells the Commons: "Never in the field of human conflict was so much owed by so many to so few." In September, Hitler quietly postpones the invasion of Britain.', hold: 4.2 },
            ],
        },
        'the-blitz': {
            kind: 'cinematic',
            id: 'the-blitz',
            environment: 'london-1940',
            next: 'pearl-harbor',
            cast: [{ id: 'churchill', position: [4, 0, -4], facing: 0.15, pose: 'think' }],
            shots: [
                { path: [[-40, 50, 60], [10, 30, 40]], lookPath: [[20, 60, -100]], duration: 8 },
                { path: [[10, 30, 40], [10, 5, 12]], lookPath: [[4, 3.5, -4]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Hitler is enraged by the raid on Berlin and orders the Luftwaffe to bomb London instead. From 7 September, the Blitz kills more than forty thousand civilians across Britain.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'But the battered RAF airfields get the rest they need. The fighters recover, the invasion never comes, and Londoners sleep in the Underground and carry on.', hold: 4 },
            ],
        },

        // ── ACT III: the Pacific ─────────────────────────────────────────
        'pearl-harbor': {
            kind: 'cinematic',
            id: 'pearl-harbor',
            environment: 'washington-1917',
            next: 'explore-midway',
            cast: [{ id: 'roosevelt', position: [0, 0, -44], facing: 0, pose: 'command' }],
            shots: [
                { path: [[0, 20, 40], [0, 6, -18]], lookPath: [[0, 14, -80], [0, 5, -44]], duration: 8 },
                { path: [[0, 6, -18], [9, 5, -26]], lookPath: [[0, 4.5, -44]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Sunday 7 December 1941. Japanese carrier planes attack the US Pacific Fleet at Pearl Harbor in Hawaii. Eight battleships are sunk or damaged and more than two thousand Americans are killed.', hold: 4.2 },
                { speaker: 'Franklin D. Roosevelt', text: '"Yesterday, December 7, 1941, a date which will live in infamy, the United States of America was suddenly and deliberately attacked."', hold: 4 },
                { speaker: 'The Chronicle', text: 'Four days later, Hitler declares war on the United States too. But the American aircraft carriers were at sea that morning, and every one of them survived.', hold: 4 },
            ],
        },
        'explore-midway': {
            kind: 'explore',
            id: 'explore-midway',
            environment: 'midway-1942',
            prompt: 'June 1942. Explore the flight deck of a US carrier northeast of Midway: drag to look around and click the glowing markers.',
            camera: { position: [40, 30, -110], target: [0, 10, -20] },
            hotspots: [
                {
                    id: 'codebreakers',
                    position: [13, 24, 10],
                    label: 'Codebreakers',
                    icon: '🔐',
                    title: '"AF Is Short of Water"',
                    description: 'In a basement at Pearl Harbor, Joseph Rochefort\'s team has partly broken the Japanese navy\'s code. To prove that the target "AF" is Midway, they had the island radio a fake message about a broken water plant. Days later, the Japanese reported that "AF" was short of water.',
                    effects: { strength: 3 },
                },
                {
                    id: 'dauntless',
                    position: [0, 13, -55],
                    label: 'Dive Bombers',
                    icon: '✈️',
                    title: 'The Dauntless',
                    description: 'Slow and old-fashioned, the SBD Dauntless can dive almost straight down onto a ship from four kilometres up. If the bombers catch the Japanese carriers with planes and fuel on their decks, a single bomb can be fatal.',
                },
                {
                    id: 'yorktown',
                    position: [-14, 12, 20],
                    label: 'Repair Crews',
                    icon: '🔧',
                    title: 'Seventy-Two Hours',
                    description: 'The carrier Yorktown was badly damaged at the Coral Sea a month ago. The repair should have taken three months. Fourteen hundred workers patched her up in about three days.',
                },
                {
                    id: 'kido-butai',
                    position: [160, 30, 330],
                    label: 'The Japanese Fleet',
                    icon: '🎌',
                    title: 'Kido Butai',
                    description: 'Four of the six carriers that struck Pearl Harbor, Akagi, Kaga, Soryu and Hiryu, are heading for Midway with an invasion force behind them. Admiral Yamamoto hopes to lure the last American carriers into a trap.',
                    effects: { chaos: 3 },
                    advancesTo: 'midway-choice',
                },
            ],
        },
        'midway-choice': {
            kind: 'choice',
            id: 'midway-choice',
            environment: 'midway-1942',
            title: 'Northeast of Midway · 4 June 1942',
            prompt: 'A scout plane has spotted the Japanese carriers. Their planes are bombing Midway island. The US fleet has three carriers against four.',
            camera: { position: [24, 16, -70], target: [0, 10, -30] },
            options: [
                {
                    id: 'ambush',
                    label: 'Launch Everything Now',
                    icon: '🎯',
                    description: 'Strike first, at long range, while the Japanese planes are refuelling after the raid on Midway. Some of the slow torpedo bombers may not come back.',
                    effects: { strength: 8, chaos: 4 },
                    flags: ['midway-ambush'],
                    next: 'midway-victory',
                },
                {
                    id: 'caution',
                    label: 'Save the Carriers',
                    icon: '🛡',
                    description: 'Pull back towards Hawaii. These are the only carriers America has in the Pacific, and they cannot be risked against a bigger fleet.',
                    effects: { diplomacy: 2, chaos: 6 },
                    flags: ['midway-caution'],
                    next: 'midway-defeat',
                },
            ],
        },
        'midway-victory': {
            kind: 'cinematic',
            id: 'midway-victory',
            environment: 'midway-1942',
            next: 'alamein-intro',
            shots: [
                { path: [[0, 20, -120], [0, 30, 40]], lookPath: [[0, 40, 200]], duration: 8 },
                { path: [[0, 30, 40], [40, 40, 200]], lookPath: [[160, 30, 360]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The torpedo bombers attack first and are almost wiped out. But they pull the Japanese fighters down to sea level.', hold: 3.6 },
                { speaker: 'The Chronicle', text: 'At 10:22 a.m., American dive bombers arrive overhead. In five minutes, three Japanese carriers are burning. The fourth, Hiryu, is wrecked that afternoon.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Japan has lost four carriers and hundreds of veteran airmen it can never replace. Six months after Pearl Harbor, the tide in the Pacific has turned.', hold: 4 },
            ],
        },
        'midway-defeat': {
            kind: 'cinematic',
            id: 'midway-defeat',
            environment: 'midway-1942',
            next: 'ending',
            shots: [
                { path: [[0, 30, -60], [60, 20, -160]], lookPath: [[0, 10, 0]], duration: 9 },
                { path: [[60, 20, -160], [0, 80, -300]], lookPath: [[0, 0, 0]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The carriers turn away. Midway falls to a Japanese landing, and Japanese planes can now reach Hawaii. Pearl Harbor has to be abandoned as a fleet base.', hold: 4 },
                { speaker: 'The Chronicle', text: 'With no American fleet to stop them, the Japanese cut the sea route to Australia. Washington decides that the war against Germany must come first.', hold: 4 },
            ],
        },

        // ── ACT IV: the desert ───────────────────────────────────────────
        'alamein-intro': {
            kind: 'cinematic',
            id: 'alamein-intro',
            environment: 'el-alamein',
            next: 'alamein-battle',
            cast: [
                { id: 'montgomery', position: [0, 0, 72], facing: 0.2, pose: 'command' },
                { id: 'rommel', position: [8, 0, -62], facing: Math.PI - 0.2, pose: 'think' },
            ],
            shots: [
                { path: [[0, 60, 200], [14, 16, 110], [10, 6.5, 92]], lookPath: [[0, 4, 0], [0, 3.8, 72]], duration: 11 },
                { path: [[40, 30, 0], [22, 7, -84]], lookPath: [[8, 3.8, -62]], duration: 10 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Egypt, October 1942. Field Marshal Erwin Rommel, "the Desert Fox", has chased the British army back across North Africa to a railway halt called El Alamein. Beyond it lie Alexandria and the Suez Canal.', hold: 4.4 },
                { speaker: 'The Chronicle', text: 'The new commander of the British Eighth Army, General Bernard Montgomery, has spent two months gathering tanks, guns and men. He has more of everything, and he knows it.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Rommel is short of fuel, and he is sick. He has gone home to Austria for treatment. In his absence, his army has laid half a million mines.', hold: 4 },
            ],
        },
        'alamein-battle': { kind: 'battle', id: 'alamein-battle', environment: 'el-alamein', battle: alamein() },
        'alamein-won': {
            kind: 'cinematic',
            id: 'alamein-won',
            environment: 'el-alamein',
            next: 'southwick-intro',
            cast: [{ id: 'montgomery', position: [0, 0, 72], facing: 0.2, pose: 'command' }],
            shots: [
                { path: [[0, 30, 40], [10, 6.5, 92]], lookPath: [[0, 4, -40], [0, 3.8, 72]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'After twelve days, Rommel\'s line breaks. Days later, American and British troops land in Morocco and Algeria. By May 1943, the Axis armies in Africa have surrendered.', hold: 4 },
                { speaker: 'Winston Churchill', text: '"Now this is not the end. It is not even the beginning of the end. But it is, perhaps, the end of the beginning."', hold: 4 },
            ],
        },
        'alamein-lost': {
            kind: 'cinematic',
            id: 'alamein-lost',
            environment: 'el-alamein',
            next: 'southwick-intro-b',
            cast: [{ id: 'rommel', position: [8, 0, -62], facing: Math.PI - 0.2, pose: 'command' }],
            shots: [
                { path: [[0, 20, 60], [22, 7, -84]], lookPath: [[0, 4, 0], [8, 3.8, -62]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The British attack bogs down in the minefields. Rommel holds El Alamein, and the war in Africa drags on deep into 1943.', hold: 4 },
                { speaker: 'The Chronicle', text: 'Men, tanks and landing craft that were meant for France are kept in the Mediterranean. Rommel returns to Europe a hero, and Hitler gives him the job of defending the Atlantic coast.', hold: 4.2 },
            ],
        },

        // ── ACT V: D-Day (two versions, after victory or defeat in the desert) ─
        ...southwick(true),
        ...southwick(false),

        liberation: {
            kind: 'cinematic',
            id: 'liberation',
            environment: 'normandy-1944',
            next: 'ending',
            shots: [
                { path: [[0, 6, 70], [0, 30, -60]], lookPath: [[0, 20, -120]], duration: 8 },
                { path: [[0, 30, -60], [0, 80, 200]], lookPath: [[0, 0, 0]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'By nightfall, the Americans have climbed the bluffs and the five beaches are held. Paris is liberated in August. The Red Army, which has done most of the fighting, drives on Berlin from the east.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'Hitler kills himself in his bunker on 30 April 1945, and Germany surrenders a week later. Japan surrenders in August, after atomic bombs destroy Hiroshima and Nagasaki.', hold: 4.2 },
            ],
        },
        'dday-fails': {
            kind: 'cinematic',
            id: 'dday-fails',
            environment: 'normandy-1944',
            next: 'ending',
            shots: [
                { path: [[0, 10, 30], [0, 20, 120]], lookPath: [[0, 10, -90], [0, 4, 40]], duration: 8 },
                { path: [[0, 20, 120], [0, 50, 300]], lookPath: [[0, 0, 100]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Omaha Beach is lost, and the other beaches are pinned and cut off. Eisenhower reads out his note: "If any blame or fault attaches to the attempt it is mine alone."', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'It will take the western Allies at least a year to try again. The Red Army does not wait for them.', hold: 3.6 },
            ],
        },

        ending: { kind: 'ending', id: 'ending' },
    },

    endings: [
        {
            id: 'no-appeasement',
            title: 'No Appeasement',
            subtitle: 'War in 1938 · the forts hold · Hitler falls',
            icon: '🦁',
            color: '#1E40AF',
            linkedTimelineId: 'no-appeasement',
            priority: 10,
            requiresFlags: ['sudeten:won'],
            epilogue: [
                { text: 'The "short war" of 1938 lasts only a few months. Germany\'s new military rulers give back the Sudetenland and Austria, and the Nazi party is banned.', hold: 3.8 },
                { text: 'There is no Holocaust. Six million Jews, and millions of others, live out their lives. There is no Blitz, no Pearl Harbor and no atomic bomb dropped on a city.', hold: 4 },
                { text: 'Churchill becomes the man who was right, and 30 September is remembered in Prague as the day democracies found their nerve.', hold: 3.6 },
            ],
        },
        {
            id: 'nazi-europe',
            title: 'The Lights Go Out',
            subtitle: 'Britain makes peace in 1940 · Hitler rules Europe',
            icon: '🕯',
            color: '#374151',
            priority: 10,
            requiresFlags: ['negotiated-1940'],
            epilogue: [
                { text: 'With Britain out of the war, Germany throws everything at the Soviet Union in 1941. The fighting in the east is even more terrible, and the Holocaust goes on unseen behind a sealed continent.', hold: 4.2 },
                { text: 'Britain keeps its fleet but lives on Hitler\'s terms, its newspapers careful and its refugees sent home. America arms itself and waits.', hold: 3.8 },
                { text: 'Churchill was right in May 1940: a peace with Hitler was only a slower defeat.', hold: 3.2 },
            ],
        },
        {
            id: 'japan-wins-pacific',
            title: 'Empire of the Rising Sun',
            subtitle: 'The carriers turn back at Midway · Japan rules the Pacific',
            icon: '🌅',
            color: '#B91C1C',
            linkedTimelineId: 'japan-wins-pacific',
            priority: 10,
            requiresFlags: ['midway-caution'],
            epilogue: [
                { text: 'America fights Germany first and is forced to accept a truce in the Pacific in 1944. Japan keeps most of its conquests, from Manchuria to the Dutch East Indies.', hold: 4 },
                { text: 'The "Greater East Asia Co-Prosperity Sphere" is run from Tokyo for decades, with brutal occupations and wars of resistance in China, Korea and Southeast Asia.', hold: 4 },
            ],
        },
        {
            id: 'd-day-fails',
            title: 'Overlord Fails',
            subtitle: 'Omaha Beach is lost · Stalin reaches the Rhine',
            icon: '🏖',
            color: '#7F1D1D',
            linkedTimelineId: 'd-day-fails',
            priority: 10,
            requiresFlags: ['omaha:defeat'],
            epilogue: [
                { text: 'The Red Army takes Berlin in the spring of 1945, then keeps going. By the time the western Allies are ready to land again, Soviet tanks have reached the Rhine.', hold: 4 },
                { text: 'Most of Europe falls behind the Iron Curtain. Britain stands alone again, this time facing Stalin.', hold: 3.6 },
            ],
        },
        {
            id: 'allied-victory',
            title: 'Their Finest Hour',
            subtitle: 'The history you know: D-Day, victory, and a world rebuilt',
            icon: '🎖',
            color: '#047857',
            priority: 8,
            epilogue: [
                { text: 'More than seventy million people have died, among them six million Jews murdered in the Holocaust. Europe and East Asia lie in ruins.', hold: 4 },
                { text: 'The victors found the United Nations in 1945 and try the Nazi leaders at Nuremberg. The Marshall Plan rebuilds Western Europe.', hold: 3.8 },
                { text: 'But Europe is split down the middle by an Iron Curtain, and the two superpowers that won the war begin a Cold War that will last almost half a century.', hold: 4 },
            ],
        },
    ],
};
