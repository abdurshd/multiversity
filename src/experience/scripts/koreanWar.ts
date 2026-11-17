/* Korean War interactive episode: liberation in 1945 → six realities. The
   player steers the southern side and the UN Command. */
import type { BattleConfig, ExperienceScript } from '../types';

type V3 = [number, number, number];

const UN_1950 = { side: 'player' as const, color: '#6b6a48', accentColor: '#3a4a7a', helmet: 'm1' as const };
const MARINES_1950 = { side: 'player' as const, color: '#5d6a4a', accentColor: '#3a4a2a', helmet: 'm1' as const };
const KPA = { side: 'enemy' as const, color: '#7a7a4a', accentColor: '#9a2a2a', helmet: 'kepi' as const };
const PVA = { side: 'enemy' as const, color: '#a8a07a', accentColor: '#9a2a2a', helmet: 'kepi' as const };

/** The Pusan Perimeter, August–September 1950. */
const pusan: BattleConfig = {
    id: 'pusan',
    name: 'The Pusan Perimeter',
    era: 'ww2',
    theme: 'colonial',
    objective:
        "August 1950. The North Korean army has driven the South Koreans and the Americans into the last corner of the peninsula, behind the Naktong river. Behind you is the port of Pusan and the sea. Hold the river line until reinforcements arrive.",
    player: { ...UN_1950, name: 'US Eighth Army and ROK Army', infantry: 120, cavalry: 8, archers: 34, attack: 1.0, defense: 1.2 },
    enemy: { ...KPA, name: 'Korean People\'s Army', infantry: 145, cavalry: 16, archers: 30, attack: 1.12, defense: 1.0 },
    onVictory: 'pusan-holds',
    onDefeat: 'pusan-falls',
    events: [
        {
            id: 'naktong',
            atTime: 9,
            title: 'Night Crossing of the Naktong',
            prompt: 'North Korean infantry waded across the river in the dark on underwater bridges of sandbags and logs. By dawn they have a foothold on your bank.',
            options: [
                {
                    id: 'stand-or-die',
                    label: '"Stand or Die"',
                    icon: '🛡',
                    description: 'General Walton Walker\'s order of 29 July: there will be no more retreating. Every unit holds where it stands.',
                    effects: { strength: 3 },
                    mod: { defenseMult: 1.25 },
                },
                {
                    id: 'carriers',
                    label: 'Call the Carriers',
                    icon: '✈️',
                    description: 'Navy and Marine fighter-bombers from the carriers offshore hit the river crossings with rockets and napalm.',
                    effects: { strength: 2 },
                    mod: { catapultBarrage: 14 },
                },
            ],
        },
        {
            id: 'reinforcements',
            atTime: 28,
            title: 'Ships in Pusan Harbour',
            prompt: 'Every day, more ships unload at Pusan: the 1st Provisional Marine Brigade, British troops from Hong Kong, and new M26 Pershing tanks that can finally fight a T-34 on equal terms.',
            options: [
                {
                    id: 'fire-brigade',
                    label: 'The Fire Brigade',
                    icon: '🚒',
                    description: 'Rush the Marine brigade from one break in the line to the next and counter-attack every crossing.',
                    effects: { strength: 4 },
                    mod: { attackMult: 1.15 },
                },
                {
                    id: 'pershings',
                    label: 'Send the Pershings',
                    icon: '🛡️',
                    description: 'Swing the new tank battalions round the flank of the North Korean bridgehead.',
                    effects: { strength: 3 },
                    mod: { flankCavalry: 6 },
                },
            ],
        },
        {
            id: 'perimeter-cracks',
            whenMoraleBelow: { side: 'player', value: 0.5 },
            title: 'The Line Is Cracking',
            prompt: 'Taegu is under shellfire and refugees are crowding the roads to Pusan. Some officers want to plan an evacuation by sea.',
            options: [
                {
                    id: 'no-dunkirk',
                    label: '"There Will Be No Dunkirk"',
                    icon: '🎖',
                    description: 'Walker tells his commanders there will be no evacuation. The reserves go into the line.',
                    effects: { strength: 3 },
                    mod: { moraleShift: 0.3, attackMult: 1.05 },
                },
                {
                    id: 'shorten-line',
                    label: 'Shorten the Line',
                    icon: '↩️',
                    description: 'Pull back to the hills closer to Pusan, where the line is shorter and easier to hold.',
                    mod: { defenseMult: 1.25 },
                },
            ],
        },
    ],
};

/** The Chosin Reservoir, 27 November – 13 December 1950. */
const chosin: BattleConfig = {
    id: 'chosin',
    name: 'The Battle of Chosin Reservoir',
    era: 'ww2',
    theme: 'colonial',
    objective:
        "27 November 1950, minus thirty degrees. Seven Chinese divisions have come out of the snow around the reservoir. The 1st Marine Division is strung out along a single mountain road. Hold the perimeter at Hagaru-ri and break the Chinese attack.",
    player: { ...MARINES_1950, name: '1st Marine Division', infantry: 120, cavalry: 6, archers: 30, attack: 1.0, defense: 1.1 },
    enemy: { ...PVA, name: 'Chinese Ninth Army Group', infantry: 200, cavalry: 0, archers: 26, attack: 1.05, defense: 0.95 },
    onVictory: 'christmas',
    onDefeat: 'retreat',
    events: [
        {
            id: 'night-attack',
            atTime: 8,
            title: 'Bugles in the Dark',
            prompt: 'The Chinese attack at night, to the sound of bugles, whistles and gongs. They wear quilted cotton and canvas shoes, and many carry only a few grenades.',
            options: [
                {
                    id: 'perimeter',
                    label: 'Close the Perimeter',
                    icon: '🛡',
                    description: 'Cooks, clerks and drivers take rifles and fill the holes in the line. Nobody sleeps.',
                    effects: { strength: 3 },
                    mod: { defenseMult: 1.25 },
                },
                {
                    id: 'corsairs',
                    label: 'Corsairs at Dawn',
                    icon: '✈️',
                    description: 'Hold until first light, then call in the Marine Corsair fighter-bombers on the ridges.',
                    effects: { strength: 2 },
                    mod: { catapultBarrage: 16 },
                },
            ],
        },
        {
            id: 'funchilin',
            atTime: 27,
            title: 'The Bridge at Funchilin Pass',
            prompt: 'The Chinese have blown the only bridge on the road south. Air Force cargo planes can drop new bridge sections by parachute, but no one has ever tried it.',
            options: [
                {
                    id: 'airdrop',
                    label: 'Drop the Bridge',
                    icon: '🪂',
                    description: 'Eight steel sections come down on parachutes. The engineers build the bridge under fire and the column rolls on.',
                    effects: { strength: 4 },
                    mod: { attackMult: 1.15 },
                },
                {
                    id: 'airstrip',
                    label: 'Hold the Airstrip',
                    icon: '🛬',
                    description: 'Keep the half-built airstrip at Hagaru-ri open. Planes fly out four thousand wounded men and bring in fresh troops.',
                    effects: { diplomacy: 2 },
                    mod: { defenseMult: 1.2 },
                },
            ],
        },
        {
            id: 'frozen',
            whenMoraleBelow: { side: 'player', value: 0.5 },
            title: 'Frozen Rifles',
            prompt: 'Weapons are jamming in the cold and morphine is freezing in the syrettes. A reporter asks General Oliver Smith if this is a retreat.',
            options: [
                {
                    id: 'another-direction',
                    label: '"Retreat, Hell!"',
                    icon: '🎖',
                    description: '"We\'re not retreating. We\'re just attacking in another direction." The Marines go forward again.',
                    effects: { strength: 3 },
                    mod: { moraleShift: 0.3, attackMult: 1.05 },
                },
                {
                    id: 'warming-tents',
                    label: 'Warming Tents',
                    icon: '⛺',
                    description: 'Rotate the men through the heated tents in shifts so they can thaw out their hands and their weapons.',
                    mod: { defenseMult: 1.25 },
                },
            ],
        },
    ],
};

const RHEE: V3 = [0, 0, -6];
const TRUMAN: V3 = [0, 0, -44];
const MAC_SHIP: V3 = [-80, 1.6, 112];
const MAC_NORTH: V3 = [0, 0, 40];

export const koreanWarScript: ExperienceScript = {
    chapterId: 'korea-destiny',
    title: 'The 38th Parallel',
    era: 'Seoul · 1945',
    startBeat: 'intro',
    initialStats: { chaos: 45, freedom: 40, diplomacy: 45, strength: 30 },
    defaultEnding: 'armistice',

    characters: {
        rhee: {
            id: 'rhee', name: 'Syngman Rhee', role: 'Independence leader, first President of South Korea',
            face: '/images/chapters/korea-destiny/faces/syngman-rhee.webp',
            outfit: 'homburg', skin: '#b5804c', hair: '#d8d4cc', hat: '#2a2a2e', robe: '#2a2c30', accent: '#5a3a3a', breeches: '#2a2c30',
        },
        kim: {
            id: 'kim', name: 'Kim Il-sung', role: 'Leader of North Korea',
            face: '/images/chapters/korea-destiny/faces/kim-il-sung.webp',
            outfit: 'peaked-cap', skin: '#be8b51', hair: '#1e1a16', hat: '#4a5240', robe: '#55603f', accent: '#9a2a2a', breeches: '#4a5240',
        },
        truman: {
            id: 'truman', name: 'Harry S. Truman', role: '33rd President of the United States',
            face: '/images/chapters/korea-destiny/faces/harry-s-truman.webp',
            outfit: 'homburg', skin: '#ebbf9e', hair: '#a8a49c', hat: '#5a5650', robe: '#3a3e4a', accent: '#6a2a2a', breeches: '#3a3e4a',
        },
        macarthur: {
            id: 'macarthur', name: 'Douglas MacArthur', role: 'Commander of the UN forces in Korea',
            face: '/images/chapters/korea-destiny/faces/douglas-macarthur.webp',
            outfit: 'peaked-cap', skin: '#caa67c', hair: '#5a4a3a', hat: '#7a6e52', robe: '#b8a47a', accent: '#6a5a40', breeches: '#a8946a',
        },
        peng: {
            id: 'peng', name: 'Peng Dehuai', role: "Commander of the Chinese People's Volunteers",
            face: '/images/chapters/korea-destiny/faces/peng-dehuai.webp',
            outfit: 'peaked-cap', skin: '#d8a882', hair: '#1e1a16', hat: '#6a6e46', robe: '#6f7348', accent: '#9a2a2a', breeches: '#6f7348',
        },
    },

    beats: {
        // ── ACT I: Seoul, liberation ──────────────────────────────────────
        intro: {
            kind: 'cinematic',
            id: 'intro',
            environment: 'seoul-1945',
            next: 'explore-seoul',
            cast: [{ id: 'rhee', position: RHEE, facing: 0, pose: 'idle' }],
            shots: [
                { path: [[0, 70, 180], [0, 30, 90]], lookPath: [[0, 10, -40], [0, 12, -60]], duration: 9 },
                { path: [[0, 30, 90], [30, 18, 20]], lookPath: [[0, 14, -80], [0, 10, -26]], duration: 9 },
                { path: [[30, 18, 20], [10, 7, 12], [6, 5.5, 10]], lookPath: [[0, 6, -26], [0, 3.6, -6]], duration: 11 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Seoul, August 1945. Japan has surrendered, and after thirty-five years of colonial rule Koreans pour into the streets waving the flag that was banned for a generation.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'But liberation comes from outside. Soviet troops are already marching into the north. To stop them taking the whole peninsula, two American officers in Washington drew a line across a map in about half an hour: the 38th parallel.', hold: 4.4 },
                { speaker: 'The Chronicle', text: 'Syngman Rhee, seventy years old, returns from more than thirty years of exile in America. In the north, the Soviets introduce a thirty-three-year-old guerrilla captain named Kim Il-sung.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'In our history, the line meant to last a few months became a border. In this one, you decide.', hold: 3.6 },
            ],
        },

        'explore-seoul': {
            kind: 'explore',
            id: 'explore-seoul',
            environment: 'seoul-1945',
            cast: [{ id: 'rhee', position: RHEE, facing: 0.25, pose: 'think' }],
            prompt: 'Explore liberated Seoul: drag to look around and click the glowing markers.',
            camera: { position: [26, 14, 46], target: [0, 7, -24] },
            hotspots: [
                {
                    id: 'gov-general',
                    position: [0, 20, -80],
                    label: 'The Government-General',
                    icon: '🏛',
                    title: 'The Surrender Ceremony',
                    description: 'The Japanese built their colonial headquarters right in front of the royal palace, to block it from view. On 9 September 1945 the Japanese governor surrendered here. The Japanese flag came down, and the American flag went up, not the Korean one.',
                },
                {
                    id: 'gate',
                    position: [0, 11, -26],
                    label: 'Gwanghwamun',
                    icon: '⛩',
                    title: 'The Palace Gate',
                    description: 'The main gate of Gyeongbokgung, the palace of the Joseon kings. Korea was an independent kingdom for more than five hundred years before Japan annexed it in 1910.',
                },
                {
                    id: 'parallel',
                    position: [-10, 3.5, 16],
                    label: 'The 38th Parallel',
                    icon: '🗺',
                    title: 'A Line on a National Geographic Map',
                    description: 'On the night of 10 August 1945, Colonel Charles Bonesteel and Major Dean Rusk were told to find a dividing line. They picked the 38th parallel because it left Seoul in the American zone. No Korean was asked. Stalin accepted it.',
                },
                {
                    id: 'taegukgi',
                    position: [24, 11, 12],
                    label: 'The Taegukgi',
                    icon: '🇰🇷',
                    title: 'A Flag Kept Hidden',
                    description: 'Families had hidden their flags for decades. Within days of liberation, political committees spring up across the country, from conservatives to communists. Everyone wants independence now, but no one agrees on what kind of Korea it should be.',
                    effects: { freedom: 2 },
                },
                {
                    id: 'rhee',
                    position: [0, 4.6, -6],
                    label: 'Syngman Rhee',
                    icon: '👤',
                    title: 'The Old Exile',
                    description: 'A Princeton PhD and a fierce anti-communist, Rhee lobbied for Korean independence in Washington for decades. In December 1945 the Allies meet in Moscow and decide Korea\'s future without him.',
                    advancesTo: 'trusteeship-choice',
                },
            ],
        },

        'trusteeship-choice': {
            kind: 'choice',
            id: 'trusteeship-choice',
            environment: 'seoul-1945',
            cast: [{ id: 'rhee', position: RHEE, facing: 0.3, pose: 'command' }],
            title: 'Seoul · December 1945',
            prompt: 'The Moscow Conference has decided: Korea will be ruled for up to five years by a trusteeship of America, the Soviet Union, Britain and China, then hold elections. Crowds are marching against it in Seoul.',
            camera: { position: [9, 6, 12], target: [0, 4, -6] },
            options: [
                {
                    id: 'trusteeship',
                    label: 'Accept the Trusteeship',
                    icon: '🤝',
                    description: 'Swallow the insult. Five more years of foreign supervision, but one Korea at the end, chosen by one vote across the whole peninsula.',
                    effects: { diplomacy: 6, freedom: -2 },
                    flags: ['trusteeship'],
                    next: 'one-korea',
                },
                {
                    id: 'separate-gov',
                    label: 'Reject It',
                    icon: '✊',
                    description: 'No more foreign rulers. If the Soviets will not leave the north, build a government in the south now.',
                    effects: { freedom: 4, chaos: 6 },
                    flags: ['separate-gov'],
                    next: 'division',
                },
            ],
        },

        'one-korea': {
            kind: 'cinematic',
            id: 'one-korea',
            environment: 'seoul-1945',
            next: 'ending',
            cast: [
                { id: 'rhee', position: [-5, 0, -8], facing: 0.4, pose: 'idle' },
                { id: 'kim', position: [5, 0, -8], facing: -0.4, pose: 'idle' },
            ],
            shots: [
                { path: [[0, 8, 40], [0, 6, 10]], lookPath: [[0, 4, -8]], duration: 9 },
                { path: [[0, 6, 10], [0, 40, 120]], lookPath: [[0, 4, -8], [0, 10, -60]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Korean leaders from the left and the right accept the trusteeship, and the Joint Commission of American and Soviet officers keeps meeting instead of breaking up in 1947.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'In 1948 Koreans from Busan to the Yalu vote in one election. Rhee and Kim both sit in the first coalition cabinet, and they loathe each other. But the foreign armies go home.', hold: 4.2 },
            ],
        },

        division: {
            kind: 'cinematic',
            id: 'division',
            environment: 'seoul-1945',
            next: 'truman',
            cast: [
                { id: 'kim', position: [0, 0, -14], facing: 0, pose: 'command' },
            ],
            shots: [
                { path: [[0, 40, 100], [0, 20, 40]], lookPath: [[0, 10, -60]], duration: 8 },
                { path: [[0, 20, 40], [6, 6, 4]], lookPath: [[0, 6, -40], [0, 3.8, -14]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The trusteeship collapses. In 1948 there are two Koreas: the Republic of Korea under Rhee in the south, and the Democratic People\'s Republic under Kim Il-sung in the north. Each claims the whole peninsula.', hold: 4.4 },
                { speaker: 'The Chronicle', text: 'Kim asks Stalin again and again for permission to unify Korea by force. In the spring of 1950 Stalin finally agrees, and Mao Zedong promises help if it is needed.', hold: 4 },
                { speaker: 'The Chronicle', text: 'At four in the morning on 25 June 1950, the North Korean army crosses the 38th parallel with more than two hundred Soviet-built tanks. Seoul falls in three days.', hold: 4.2 },
            ],
        },

        truman: {
            kind: 'cinematic',
            id: 'truman',
            environment: 'washington-1917',
            next: 'pusan-intro',
            cast: [{ id: 'truman', position: TRUMAN, facing: 0, pose: 'command' }],
            shots: [
                { path: [[0, 20, 40], [0, 6, -18]], lookPath: [[0, 14, -80], [0, 5, -44]], duration: 8 },
                { path: [[0, 6, -18], [8, 5, -26]], lookPath: [[0, 4.5, -44]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'In Washington, President Harry Truman decides within days that the invasion must be stopped. "If we let Korea down," he says, "the Soviets will keep right on going."', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'The Soviet Union is boycotting the UN Security Council over who should hold China\'s seat, so it is not there to veto. The Council asks UN members to defend South Korea. Sixteen nations will send troops.', hold: 4.4 },
                { speaker: 'The Chronicle', text: 'But the first Americans to arrive are untrained occupation troops from Japan. By August, the UN forces have been pushed into a small corner around the port of Pusan.', hold: 4 },
            ],
        },

        'pusan-intro': {
            kind: 'cinematic',
            id: 'pusan-intro',
            environment: 'busan-1950',
            next: 'pusan-battle',
            cast: [{ id: 'rhee', position: [0, 0, 66], facing: Math.PI, pose: 'think' }],
            shots: [
                { path: [[0, 60, 200], [0, 26, 110]], lookPath: [[0, 4, -40], [0, 4, -8]], duration: 8 },
                { path: [[0, 26, 110], [6, 6, 54]], lookPath: [[0, 4, 20], [0, 3.6, 66]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Pusan Perimeter, August 1950. Rhee\'s government has fled to Pusan, and hundreds of thousands of refugees fill the city. The line runs for about two hundred and thirty kilometres along the Naktong river and the mountains.', hold: 4.4 },
                { speaker: 'The Chronicle', text: 'If it breaks, the war is over, and Korea is united under Kim Il-sung.', hold: 3.2 },
            ],
        },

        'pusan-battle': { kind: 'battle', id: 'pusan-battle', environment: 'busan-1950', battle: pusan },

        'pusan-falls': {
            kind: 'cinematic',
            id: 'pusan-falls',
            environment: 'busan-1950',
            next: 'ending',
            shots: [
                { path: [[0, 10, 30], [0, 24, 120]], lookPath: [[0, 4, -20], [0, 4, 200]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Naktong line breaks in September. American ships evacuate the last troops from Pusan harbour, along with Rhee and as many soldiers and civilians as they can carry.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'Rhee sets up a government in exile on the island of Jeju, until it too is abandoned. Kim Il-sung rules the whole peninsula from Seoul.', hold: 4 },
            ],
        },

        'pusan-holds': {
            kind: 'cinematic',
            id: 'pusan-holds',
            environment: 'busan-1950',
            next: 'explore-incheon',
            shots: [
                { path: [[0, 12, 80], [0, 40, 10]], lookPath: [[0, 4, -40], [0, 0, -120]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The perimeter holds. The North Korean army has bled itself white on the Naktong, and its supply lines now stretch back three hundred kilometres to the 38th parallel.', hold: 4 },
                { speaker: 'The Chronicle', text: 'In Tokyo, General Douglas MacArthur has a plan to cut them in half.', hold: 3.2 },
            ],
        },

        // ── ACT II: Incheon ───────────────────────────────────────────────
        'explore-incheon': {
            kind: 'explore',
            id: 'explore-incheon',
            environment: 'incheon-1950',
            cast: [{ id: 'macarthur', position: MAC_SHIP, facing: 0.57, pose: 'think' }],
            prompt: 'Explore the approach to Incheon: drag to look around and click the glowing markers.',
            camera: { position: [-66, 10, 134], target: [-78, 5, 60] },
            hotspots: [
                {
                    id: 'tides',
                    position: [20, 4, -56],
                    label: 'The Mudflats',
                    icon: '🌊',
                    title: 'Ten-Metre Tides',
                    description: 'The tides at Incheon rise and fall by up to ten metres. At low tide the harbour becomes kilometres of mud. The landing craft can only come in for about three hours, twice a day, and the right tides come only a few days each month.',
                },
                {
                    id: 'wolmido',
                    position: [-90, 24, -20],
                    label: 'Wolmido',
                    icon: '🏝',
                    title: 'Moon Tip Island',
                    description: 'A fortified island guarding the harbour. It has to be taken on the morning tide, and then the Marines on it must hold alone for twelve hours until the evening tide brings the main landing.',
                },
                {
                    id: 'sea-wall',
                    position: [40, 9, -76],
                    label: 'The Sea Wall',
                    icon: '🪜',
                    title: 'Ladders, Not Beaches',
                    description: 'There is no beach, only stone sea walls. The Marines will have to climb them on wooden ladders, straight into a city.',
                },
                {
                    id: 'fleet',
                    position: [60, 14, 170],
                    label: 'The Fleet',
                    icon: '🚢',
                    title: 'Operation Chromite',
                    description: 'More than two hundred ships and seventy thousand men, including Korean Marines. One navy planner said: "We drew up a list of every natural and geographic handicap, and Inchon had \'em all."',
                },
                {
                    id: 'macarthur',
                    position: [-80, 6.4, 112],
                    label: 'MacArthur',
                    icon: '⭐',
                    title: 'The American Caesar',
                    description: 'Seventy years old, the hero of the Pacific war and the ruler of occupied Japan. The navy and the Joint Chiefs think his plan is far too risky. MacArthur says the enemy will think so too.',
                    advancesTo: 'incheon-choice',
                },
            ],
        },

        'incheon-choice': {
            kind: 'choice',
            id: 'incheon-choice',
            environment: 'incheon-1950',
            cast: [{ id: 'macarthur', position: MAC_SHIP, facing: 0.64, pose: 'command' }],
            title: 'The Decision · 23 August 1950',
            prompt: 'The generals and admirals have argued for hours. Now MacArthur speaks for forty-five minutes without notes: "We shall land at Inchon, and I shall crush them."',
            camera: { position: [-68, 8, 128], target: [-80, 5, 112] },
            options: [
                {
                    id: 'inchon',
                    label: 'Land at Incheon',
                    icon: '⚓',
                    description: 'Strike deep behind the enemy, retake Seoul and cut every North Korean supply line at once.',
                    effects: { strength: 6, chaos: 4 },
                    flags: ['inchon'],
                    next: 'landing',
                },
                {
                    id: 'breakout',
                    label: 'Break Out from Pusan',
                    icon: '🧭',
                    description: 'The navy is right. Put the reinforcements into the perimeter and push north the hard way.',
                    effects: { diplomacy: 2, strength: 2 },
                    flags: ['breakout'],
                    next: 'slow-march',
                },
            ],
        },

        'slow-march': {
            kind: 'cinematic',
            id: 'slow-march',
            environment: 'busan-1950',
            next: 'armistice',
            shots: [
                { path: [[0, 8, 60], [0, 30, -40]], lookPath: [[0, 4, -100], [0, 4, -200]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The breakout from Pusan costs three months and tens of thousands of lives. The North Korean army falls back in good order, valley by valley, and reaches the 38th parallel intact.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'The line settles almost where it began. The fighting goes on for two more years, from trenches and bunkers on the hills.', hold: 3.8 },
            ],
        },

        landing: {
            kind: 'cinematic',
            id: 'landing',
            environment: 'incheon-1950',
            next: 'yalu-choice',
            shots: [
                { path: [[0, 30, 220], [0, 8, 90]], lookPath: [[0, 6, -60]], duration: 9 },
                { path: [[0, 8, 90], [10, 6, 10]], lookPath: [[0, 8, -76], [0, 10, -110]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Incheon, 15 September 1950. Wolmido falls in forty-five minutes on the morning tide. In the evening the Marines climb the sea walls into the city with ladders, and the enemy is taken completely by surprise.', hold: 4.4 },
                { speaker: 'The Chronicle', text: 'Seoul is retaken on 28 September. Cut off, the North Korean army collapses, and the UN forces cross the 38th parallel. Pyongyang falls on 19 October.', hold: 4.2 },
            ],
        },

        // ── ACT III: To the Yalu ──────────────────────────────────────────
        'yalu-choice': {
            kind: 'choice',
            id: 'yalu-choice',
            environment: 'chosin-1950',
            cast: [{ id: 'macarthur', position: MAC_NORTH, facing: 0.3, pose: 'command' }],
            title: 'North Korea · October 1950',
            prompt: 'China has warned, through the Indian ambassador in Beijing, that it will fight if the Americans approach its border. At Wake Island, MacArthur assured Truman the Chinese would not come, and if they did "there would be the greatest slaughter".',
            camera: { position: [10, 7, 58], target: [0, 4.5, 40] },
            options: [
                {
                    id: 'halt',
                    label: 'Halt at the Narrow Neck',
                    icon: '✋',
                    description: 'Stop at the narrowest point of Korea, from Pyongyang to Wonsan, as the British suggest, and leave a buffer zone along the Chinese border.',
                    effects: { diplomacy: 6, strength: -2 },
                    flags: ['halt-neck'],
                    next: 'narrow-neck',
                },
                {
                    id: 'attack',
                    label: 'On to the Yalu',
                    icon: '🎄',
                    description: 'Finish the war. Drive to the Chinese border and have the boys home by Christmas.',
                    effects: { strength: 4, chaos: 8 },
                    flags: ['to-the-yalu'],
                    next: 'china-enters',
                },
            ],
        },

        'narrow-neck': {
            kind: 'cinematic',
            id: 'narrow-neck',
            environment: 'chosin-1950',
            next: 'ending',
            cast: [{ id: 'macarthur', position: MAC_NORTH, facing: 0.3, pose: 'think' }],
            shots: [
                { path: [[10, 7, 58], [0, 30, 120]], lookPath: [[0, 4.5, 40], [0, 10, -160]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The UN armies dig in from Pyongyang to Wonsan. In Beijing, Mao has already ordered his troops across the Yalu, but with no Americans near the border, the Politburo argues and the attack is called off.', hold: 4.4 },
                { speaker: 'The Chronicle', text: 'Kim Il-sung keeps only a mountain strip along the Chinese border. The rest of Korea, nine-tenths of its people, is governed from Seoul.', hold: 4 },
            ],
        },

        'china-enters': {
            kind: 'cinematic',
            id: 'china-enters',
            environment: 'chosin-1950',
            next: 'chosin-battle',
            cast: [{ id: 'peng', position: [0, 0, -50], facing: 0, pose: 'command' }],
            shots: [
                { path: [[0, 50, -260], [0, 20, -120]], lookPath: [[40, 0, -170], [0, 6, -50]], duration: 9 },
                { path: [[0, 20, -120], [0, 7, -30]], lookPath: [[0, 4, -50]], duration: 8 },
                { path: [[0, 7, -30], [7, 5, -36]], lookPath: [[0, 4.2, -50]], duration: 6 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'They were already there. Since 19 October, about two hundred thousand Chinese soldiers have crossed the Yalu at night, marching without lights and hiding in the forests by day. American air reconnaissance has seen almost nothing.', hold: 4.4 },
                { speaker: 'The Chronicle', text: 'Their commander is Peng Dehuai, a veteran of the Long March. Mao calls them the "People\'s Volunteers", so that China is not officially at war with America.', hold: 4 },
                { speaker: 'The Chronicle', text: 'On the night of 27 November, in the coldest winter in living memory, they fall on the Marines around the Chosin Reservoir.', hold: 3.6 },
            ],
        },

        'chosin-battle': { kind: 'battle', id: 'chosin-battle', environment: 'chosin-1950', battle: chosin },

        christmas: {
            kind: 'cinematic',
            id: 'christmas',
            environment: 'chosin-1950',
            next: 'ending',
            shots: [
                { path: [[0, 10, 90], [0, 30, -40]], lookPath: [[0, 4, -60], [40, 0, -170]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Chinese Ninth Army Group is shattered in the snow, with more of its men lost to frostbite than to bullets. Peng pulls his armies back across the Yalu to save what is left.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'Moscow will not risk a world war for Kim Il-sung. By the spring of 1951, the UN flag flies on the Yalu, and Korea is united under the government in Seoul.', hold: 4 },
            ],
        },

        retreat: {
            kind: 'cinematic',
            id: 'retreat',
            environment: 'chosin-1950',
            next: 'nuke-choice',
            shots: [
                { path: [[0, 20, -20], [0, 12, 120]], lookPath: [[0, 4, 40], [0, 2, 220]], duration: 9 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The Marines fight their way out to the port of Hungnam. Navy ships carry away a hundred thousand soldiers and nearly a hundred thousand Korean refugees, the largest sea evacuation of the war.', hold: 4.4 },
                { speaker: 'The Chronicle', text: 'Seoul falls again in January 1951. MacArthur says the war cannot be won without bombing China, and asks for atomic bombs.', hold: 4 },
            ],
        },

        'nuke-choice': {
            kind: 'choice',
            id: 'nuke-choice',
            environment: 'washington-1917',
            cast: [{ id: 'truman', position: TRUMAN, facing: 0, pose: 'think' }],
            title: 'The White House · Spring 1951',
            prompt: 'MacArthur has drawn up a list of targets in China. He has also written to a Republican congressman that "there is no substitute for victory", openly defying the President\'s policy.',
            camera: { position: [7, 6, -26], target: [0, 4.4, -44] },
            options: [
                {
                    id: 'nukes',
                    label: 'Use the Bomb',
                    icon: '☢️',
                    description: 'Give MacArthur what he wants: atomic strikes on the Chinese bases and supply lines in Manchuria.',
                    effects: { strength: 6, chaos: 20, diplomacy: -12 },
                    flags: ['nukes'],
                    next: 'atomic',
                },
                {
                    id: 'fire-macarthur',
                    label: 'Fire MacArthur',
                    icon: '📝',
                    description: 'Civilians command the military. Relieve the most famous general in America, keep the war limited and seek a ceasefire.',
                    effects: { diplomacy: 6, freedom: 3 },
                    flags: ['fire-macarthur'],
                    next: 'macarthur-fired',
                },
            ],
        },

        atomic: {
            kind: 'cinematic',
            id: 'atomic',
            environment: 'chosin-1950',
            next: 'ending',
            shots: [
                { path: [[0, 20, 60], [0, 60, 160]], lookPath: [[0, 20, -200], [0, 40, -400]], duration: 10 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'The first atomic bombs since Nagasaki fall on Manchuria in the spring of 1951. Stalin has had the bomb since 1949, and he is bound by treaty to defend China.', hold: 4.2 },
                { speaker: 'The Chronicle', text: 'Soviet bombers strike back at American bases in Japan and South Korea. Britain and France warn that they will leave the war, and the alliance that won in 1945 starts to break apart.', hold: 4.2 },
            ],
        },

        'macarthur-fired': {
            kind: 'cinematic',
            id: 'macarthur-fired',
            environment: 'washington-1917',
            next: 'armistice',
            cast: [{ id: 'truman', position: TRUMAN, facing: 0, pose: 'command' }],
            shots: [
                { path: [[0, 6, -18], [8, 5, -26]], lookPath: [[0, 4.5, -44]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'On 11 April 1951 Truman relieves MacArthur of his command. MacArthur comes home to a hero\'s welcome and tells Congress, "Old soldiers never die; they just fade away."', hold: 4.4 },
                { speaker: 'The Chronicle', text: 'Truman\'s approval rating falls to the lowest of any president in modern polling. But the war stays inside Korea.', hold: 3.8 },
            ],
        },

        armistice: {
            kind: 'cinematic',
            id: 'armistice',
            environment: 'panmunjom-1953',
            next: 'ending',
            cast: [
                { id: 'peng', position: [-5, 0, -10], facing: 0.3, pose: 'idle' },
                { id: 'kim', position: [5, 0, -10], facing: -0.3, pose: 'idle' },
            ],
            shots: [
                { path: [[0, 40, 120], [0, 14, 40]], lookPath: [[0, 4, -24]], duration: 9 },
                { path: [[0, 14, 40], [0, 6, 10]], lookPath: [[0, 4, -10]], duration: 8 },
            ],
            narration: [
                { speaker: 'The Chronicle', text: 'Panmunjom, 27 July 1953. After two years of talks, the armistice is signed in a hall built for the occasion. Kim Il-sung and Peng Dehuai countersign it later. Syngman Rhee refuses to sign at all.', hold: 4.4 },
                { speaker: 'The Chronicle', text: 'The new line runs close to the old 38th parallel. No peace treaty is ever signed, and the two Koreas are still technically at war.', hold: 4 },
            ],
        },

        ending: { kind: 'ending', id: 'ending' },
    },

    endings: [
        {
            id: 'neutral-korea',
            title: 'The Fortress of the East',
            subtitle: 'The trusteeship holds · one election · one Korea',
            icon: '🛡️',
            color: '#3B82F6',
            linkedTimelineId: 'neutral-korea',
            priority: 10,
            requiresFlags: ['trusteeship'],
            epilogue: [
                { text: 'A united Korea of thirty million people declares itself neutral, like Switzerland, and arms itself to the teeth so that no great power is tempted to invade.', hold: 4 },
                { text: 'There is no Korean War. Three million people who died in our history live out their lives, and ten million families are never separated by a border.', hold: 4 },
                { text: 'The politics are bitter and the coalition nearly breaks a dozen times. But Korea\'s quarrels are its own.', hold: 3.4 },
            ],
        },
        {
            id: 'red-korea',
            title: 'The Fall of Pusan',
            subtitle: 'The perimeter breaks · Korea is united under Kim Il-sung',
            icon: '⭐',
            color: '#B91C1C',
            linkedTimelineId: 'red-korea',
            priority: 10,
            requiresFlags: ['pusan:defeat'],
            epilogue: [
                { text: 'All of Korea becomes one closed state run by Kim Il-sung and, after him, his son. There is no Samsung, no K-pop and no Korean democracy.', hold: 4 },
                { text: 'Japan, with communist Korea a few hours across the strait, becomes America\'s armed fortress in Asia. The Cold War line in the Pacific runs through the Tsushima Strait.', hold: 4 },
            ],
        },
        {
            id: 'narrow-neck',
            title: 'The Narrow Neck',
            subtitle: 'The UN stops short of China · a war without Chinese armies',
            icon: '✋',
            color: '#0E7490',
            priority: 10,
            requiresFlags: ['halt-neck'],
            epilogue: [
                { text: 'The war ends in the winter of 1950 instead of 1953. Hundreds of thousands of Chinese, Korean and American soldiers who died in the battles that followed in our history go home.', hold: 4.2 },
                { text: 'A small, isolated North Korea survives in the mountains under Chinese protection. Pyongyang, Kaesong and most of the north are rebuilt as part of the Republic of Korea.', hold: 4 },
            ],
        },
        {
            id: 'blue-korea',
            title: 'Home by Christmas',
            subtitle: 'The Marines win at Chosin · Korea is united under Seoul',
            icon: '🎄',
            color: '#1E40AF',
            linkedTimelineId: 'blue-korea',
            priority: 10,
            requiresFlags: ['chosin:won'],
            epilogue: [
                { text: 'Rhee rules a united Korea with an iron hand, and Koreans will have to fight for their democracy in the streets, as they did in our history.', hold: 4 },
                { text: 'American troops stand on the Yalu, face to face with China. The Cold War in Asia has a new front line, a thousand kilometres further north.', hold: 4 },
            ],
        },
        {
            id: 'atomic-war',
            title: 'Fire on the Yalu',
            subtitle: 'The bomb is used in Korea · the war spreads beyond it',
            icon: '☢️',
            color: '#7F1D1D',
            priority: 10,
            requiresFlags: ['nukes'],
            epilogue: [
                { text: 'The fighting spreads from Korea to Manchuria and Japan before the great powers step back from the edge in 1952. Millions more are dead.', hold: 4 },
                { text: 'The taboo against using nuclear weapons, which in our history has held since 1945, is broken in the first decade of the atomic age.', hold: 4 },
            ],
        },
        {
            id: 'armistice',
            title: 'The 38th Parallel',
            subtitle: 'The history you know: an armistice, and a line that never closed',
            icon: '🕊',
            color: '#047857',
            priority: 8,
            epilogue: [
                { text: 'About three million Koreans, Chinese, Americans and others have died, most of them civilians. Seoul changed hands four times.', hold: 4 },
                { text: 'The two Koreas go separate ways. The South, desperately poor in 1953, becomes one of the richest democracies in the world. The North becomes the most closed country on Earth, ruled by three generations of the Kim family.', hold: 4.4 },
                { text: 'The Demilitarized Zone, four kilometres wide, still divides the peninsula. Millions of families have never seen their relatives on the other side again.', hold: 4 },
            ],
        },
    ],
};
