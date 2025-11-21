import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { getEmojiSvgPath, hasEmojiSvg } from '../../utils/emojiToSvg';

interface AnimatedSvgEmojiProps {
  emoji: string;
  className?: string;
  size?: number | string;
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  initial?: MotionProps['initial'];
  whileHover?: MotionProps['whileHover'];
  whileTap?: MotionProps['whileTap'];
  style?: React.CSSProperties;
  fallbackToEmoji?: boolean;
}

/**
 * AnimatedSvgEmoji Component
 *
 * Renders an animated SVG emoji if available, otherwise falls back to text emoji.
 * Supports all framer-motion animation props for consistency with existing animations.
 *
 * @param emoji - The emoji character to render
 * @param className - Additional CSS classes
 * @param size - Width/height of the SVG (default: '1em' to match text size)
 * @param animate - Framer motion animate prop
 * @param transition - Framer motion transition prop
 * @param initial - Framer motion initial prop
 * @param whileHover - Framer motion whileHover prop
 * @param whileTap - Framer motion whileTap prop
 * @param style - Additional inline styles
 * @param fallbackToEmoji - Whether to fall back to emoji if SVG not found (default: true)
 */
const AnimatedSvgEmoji: React.FC<AnimatedSvgEmojiProps> = ({
  emoji,
  className = '',
  size = '1em',
  animate,
  transition,
  initial,
  whileHover,
  whileTap,
  style,
  fallbackToEmoji = true,
}) => {
  const svgPath = getEmojiSvgPath(emoji);
  const hasSvg = hasEmojiSvg(emoji);

  // If no SVG mapping exists, fall back to text emoji
  if (!hasSvg || !svgPath) {
    if (fallbackToEmoji) {
      return (
        <motion.span
          className={className}
          style={style}
          animate={animate}
          transition={transition}
          initial={initial}
          whileHover={whileHover}
          whileTap={whileTap}
        >
          {emoji}
        </motion.span>
      );
    }
    return null;
  }

  // Determine size values
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: sizeValue,
        height: sizeValue,
        ...style,
      }}
      animate={animate}
      transition={transition}
      initial={initial}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      <img
        src={svgPath}
        alt={`${emoji} icon`}
        className="w-full h-full object-contain"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
        }}
      />
    </motion.div>
  );
};

export default AnimatedSvgEmoji;
