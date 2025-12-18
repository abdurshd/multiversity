/**
 * Emoji to SVG mapping utility
 * Maps Unicode emojis to corresponding SVG file names in /public/svg-emojis/scenes/
 */

export interface EmojiMapping {
  [emoji: string]: string;
}

/**
 * Comprehensive emoji to SVG file name mapping
 * SVG files are located in /public/svg-emojis/scenes/
 */
export const emojiToSvgMap: EmojiMapping = {
  // Military & Warfare
  '⚔️': 'crossed-swords',
  '⚔': 'crossed-swords',
  '💣': 'bomb',
  '💥': 'explosion',
  '🛡️': 'shield',
  '🛡': 'shield',
  '🏰': 'castle',
  '🎖️': 'medal',
  '🎖': 'medal',
  '💀': 'skull',
  '🏺': 'scroll', // Using scroll as ancient artifact

  // Aviation & Space
  '✈️': 'airplane',
  '✈': 'airplane',
  '🛩️': 'airplane-combat',
  '🛩': 'airplane-combat',
  '🚁': 'helicopter',
  '🚀': 'rocket',
  '🛰️': 'satellite',
  '🛰': 'satellite',
  '🌍': 'earth',
  '🌎': 'earth',
  '🌏': 'earth',
  '🌐': 'earth',
  '🪐': 'planet-saturn',
  '🌙': 'moon',
  '☄️': 'rocket', // Using rocket as closest match
  '☄': 'rocket',
  '👽': 'alien',

  // Royalty & Leadership
  '👑': 'crown',
  '🏛️': 'castle', // Using castle for government buildings
  '🏛': 'castle',

  // Science & Technology
  '🤖': 'robot',
  '🔬': 'microscope',
  '🧬': 'dna',
  '⚛️': 'atom',
  '⚛': 'atom',
  '☢️': 'radioactive',
  '☢': 'radioactive',
  '💻': 'computer',
  '📱': 'phone',
  '💡': 'light-bulb',
  '⚡': 'lightning-bolt',
  '🔦': 'light-bulb',
  '🧪': 'test-tube',
  '🔭': 'telescope',
  '🧠': 'brain',

  // Medical & Health
  '🏥': 'hospital',
  '💉': 'syringe',
  '🦠': 'virus',
  '🌡️': 'thermometer',
  '🌡': 'thermometer',
  '🩺': 'hospital', // Using hospital as closest match

  // Nature
  '🌳': 'tree',
  '🌲': 'tree',
  '🌴': 'tree',
  '🏔️': 'mountain',
  '🏔': 'mountain',
  '⛰️': 'mountain',
  '⛰': 'mountain',
  '☀️': 'sun',
  '☀': 'sun',
  '🌅': 'sun',
  '🌄': 'sun',
  '☁️': 'cloud',
  '☁': 'cloud',
  '🌧️': 'rain',
  '🌧': 'rain',
  '🌈': 'rainbow',
  '❄️': 'snowflake',
  '❄': 'snowflake',
  '☃️': 'snowman',
  '☃': 'snowman',
  '🐦': 'bird',
  '🕊️': 'dove',
  '🕊': 'dove',
  '🐕': 'dog',
  '🐶': 'dog',
  '🐈': 'cat',
  '🐱': 'cat',
  '🐟': 'fish',
  '🐠': 'fish',

  // Symbols & Icons
  '⭐': 'star',
  '⭐️': 'star',
  '🌟': 'star',
  '✨': 'star', // Using star as sparkles
  '❤️': 'heart',
  '❤': 'heart',
  '💗': 'heart',
  '🔥': 'fire',
  '🎁': 'gift',
  '🏆': 'trophy',
  '🔑': 'key',
  '🔒': 'lock',
  '🔓': 'lock',
  '🎨': 'celebration', // Using celebration for arts

  // Flags & Nations
  '🇺🇸': 'american-flag',
  '🏴': 'flag',
  '🏳️': 'flag',
  '🏳': 'flag',
  '🚩': 'flag',

  // Communication
  '📜': 'scroll',
  '📰': 'newspaper',
  '📢': 'megaphone',
  '🎺': 'trumpet',
  '🎙️': 'microphone',
  '🎙': 'microphone',
  '📧': 'envelope',
  '✉️': 'envelope',
  '✉': 'envelope',
  '📨': 'envelope',
  '📩': 'envelope',
  '🗣️': 'speaking-head',
  '🗣': 'speaking-head',
  '🔊': 'speaker',
  '📻': 'speaker',

  // Objects
  '📚': 'book',
  '📖': 'book',
  '📕': 'book',
  '⏰': 'clock',
  '🕐': 'clock',
  '⏳': 'hourglass',
  '⌛': 'hourglass',
  '💰': 'coin',
  '💵': 'coin',
  '💴': 'coin',
  '🎂': 'cake',
  '🍰': 'cake',
  '🍕': 'pizza',
  '🍎': 'apple',
  '🍞': 'bread',
  '🚗': 'car',
  '🚙': 'car',
  '🏭': 'factory',
  '🏗️': 'factory',
  '🏗': 'factory',
  '🧱': 'brick-wall',
  '📷': 'camera',
  '📸': 'camera',
  '💼': 'briefcase',
  '🎸': 'guitar',
  '🥁': 'drum',
  '🔨': 'hammer',
  '🛳️': 'ship',
  '🛳': 'ship',
  '⛵': 'ship',
  '🚢': 'ship',
  '🎈': 'balloon',
  '🗺️': 'world-map',
  '🗺': 'world-map',

  // Gestures & Actions
  '✊': 'raised-fist',
  '✊🏻': 'raised-fist',
  '✊🏼': 'raised-fist',
  '✊🏽': 'raised-fist',
  '✊🏾': 'raised-fist',
  '✊🏿': 'raised-fist',
  '🤝': 'handshake',
  '😱': 'scared-face',
  '😨': 'scared-face',

  // Celebration & Events
  '🎉': 'celebration',
  '🎊': 'celebration',
  '🎆': 'celebration',
  '🎇': 'celebration',

  // Beach/War scenes - using generic alternatives
  '🏖️': 'ship', // D-Day beaches - using ship as naval reference
  '🏖': 'ship',

  // People/Roles - using related objects
  '👨‍✈️': 'airplane', // Pilot
  '👨‍⚕️': 'hospital', // Doctor
  '👮': 'shield', // Police
  '👔': 'briefcase', // Business

  // Country flags (using generic flag for most)
  '🇵🇱': 'flag',
  '🇩🇪': 'flag',
  '🇬🇧': 'flag',
  '🇫🇷': 'flag',
  '🇷🇺': 'flag',
  '🇯🇵': 'flag',
  '🇨🇦': 'flag',
  '🇮🇹': 'flag',
  '🇦🇺': 'flag',
  '🇮🇳': 'flag',
  '🇨🇳': 'flag',

  // Religious/Cultural symbols
  '✡️': 'star', // Star of David
  '✡': 'star',

  // Interactive Story Specific Mappings
  '🎭': 'celebration', // Performing arts -> celebration
  '🛒': 'briefcase', // Commerce -> business/briefcase
  '⚓': 'ship', // Anchor -> ship
  '🎩': 'crown', // Top hat -> crown/leadership
  '✒️': 'scroll', // Pen -> scroll/writing
  '✒': 'scroll',
  '🥶': 'snowflake', // Cold face -> snowflake
  '🏃': 'raised-fist', // Runner -> action/fist
  '🗽': 'american-flag', // Statue of Liberty -> US Flag

  // Future Earth & Timur Legacy Mappings
  '🐝': 'robot', // Swarm -> robot
  '👨‍🚀': 'rocket', // Astronaut -> rocket
  '🌌': 'star', // Galaxy -> star
  '💊': 'thermometer', // Medicine -> thermometer
  '🤴': 'crown', // Prince -> crown
  '🐉': 'fire', // Dragon -> fire
  '👳': 'scroll', // Religious figure -> scroll
  '🇰🇷': 'flag',
  '🇰🇵': 'flag',
  '🚄': 'airplane', // Train -> airplane (transport)
  '🏙️': 'castle', // City -> castle
};

/**
 * Get the SVG file path for a given emoji
 * @param emoji - The emoji character(s)
 * @returns The SVG file path or null if no mapping exists
 */
export function getEmojiSvgPath(emoji: string): string | null {
  const svgFileName = emojiToSvgMap[emoji];
  if (!svgFileName) {
    return null;
  }
  return `/svg-emojis/scenes/${svgFileName}.svg`;
}

/**
 * Check if an emoji has a corresponding SVG
 * @param emoji - The emoji character(s)
 * @returns True if SVG exists, false otherwise
 */
export function hasEmojiSvg(emoji: string): boolean {
  return emoji in emojiToSvgMap;
}

/**
 * Get all supported emojis
 * @returns Array of all emojis that have SVG mappings
 */
export function getSupportedEmojis(): string[] {
  return Object.keys(emojiToSvgMap);
}
