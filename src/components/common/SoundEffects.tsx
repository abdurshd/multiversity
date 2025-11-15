import { useEffect, useRef } from 'react';
import { audioManager } from '../../utils/audioManager';

interface SoundEffectsProps {
  enabled?: boolean;
}

export default function SoundEffects({ enabled = true }: SoundEffectsProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      audioManager.initializeSounds();
      initialized.current = true;
    }

    audioManager.setEnabled(enabled);
  }, [enabled]);

  useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      void audioManager.resume();

      if (target.matches('button, a, [role="button"], .cursor-pointer')) {
        audioManager.playSound('click', 0.3);
      }
    };

    const handleMouseEnter = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      if (target.matches('button, a, [role="button"], .cursor-pointer')) {
        audioManager.playSound('hover', 0.2);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mouseenter', handleMouseEnter, true);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
    };
  }, []);

  return null;
}
