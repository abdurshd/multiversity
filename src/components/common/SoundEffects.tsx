import { useEffect, useRef } from 'react';

interface SoundEffectsProps {
  enabled?: boolean;
}

class AudioManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  // Create sounds programmatically using Web Audio API
  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      let value = 0;

      switch (type) {
        case 'sine':
          value = Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'square':
          value = Math.sign(Math.sin(2 * Math.PI * frequency * t));
          break;
        case 'sawtooth':
          value = 2 * (t * frequency - Math.floor(t * frequency + 0.5));
          break;
        case 'triangle':
          value = Math.asin(Math.sin(2 * Math.PI * frequency * t)) * (2 / Math.PI);
          break;
      }

      // Apply envelope (fade in/out)
      const fadeTime = 0.05; // 50ms fade
      const fadeInEnd = fadeTime * sampleRate;
      const fadeOutStart = length - (fadeTime * sampleRate);

      if (i < fadeInEnd) {
        value *= i / fadeInEnd;
      } else if (i > fadeOutStart) {
        value *= (length - i) / (length - fadeOutStart);
      }

      data[i] = value * volume;
    }

    return buffer;
  }

  private createNoiseBuffer(duration: number, volume: number = 0.1): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * volume;
    }

    return buffer;
  }

  initializeSounds() {
    if (!this.audioContext) return;

    // Click sound
    const clickBuffer = this.createTone(800, 0.1, 'sine', 0.2);
    if (clickBuffer) this.sounds.set('click', clickBuffer);

    // Hover sound
    const hoverBuffer = this.createTone(600, 0.05, 'sine', 0.1);
    if (hoverBuffer) this.sounds.set('hover', hoverBuffer);

    // Success sound (ascending chord)
    const successBuffer = this.createTone(523, 0.2, 'sine', 0.15); // C note
    if (successBuffer) this.sounds.set('success', successBuffer);

    // Error sound
    const errorBuffer = this.createTone(200, 0.3, 'square', 0.2);
    if (errorBuffer) this.sounds.set('error', errorBuffer);

    // Pop sound for animations
    const popBuffer = this.createTone(1000, 0.08, 'sine', 0.15);
    if (popBuffer) this.sounds.set('pop', popBuffer);

    // Whoosh sound for transitions
    const whooshBuffer = this.createNoiseBuffer(0.5, 0.05);
    if (whooshBuffer) this.sounds.set('whoosh', whooshBuffer);

    // Bell sound for notifications
    const bellBuffer = this.createTone(1047, 0.8, 'sine', 0.1); // High C
    if (bellBuffer) this.sounds.set('bell', bellBuffer);

    // Chime for timeline events
    const chimeBuffer = this.createTone(698, 0.4, 'triangle', 0.12); // F note
    if (chimeBuffer) this.sounds.set('chime', chimeBuffer);
  }

  playSound(soundName: string, volume: number = 1) {
    if (!this.enabled || !this.audioContext || this.audioContext.state === 'suspended') return;

    const buffer = this.sounds.get(soundName);
    if (!buffer) return;

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = volume;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start();
    } catch (e) {
      // Silently handle audio errors
    }
  }

  // Resume audio context (required for user interaction)
  async resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (e) {
        // Handle resume errors
      }
    }
  }
}

// Global audio manager instance
const audioManager = new AudioManager();

const SoundEffects: React.FC<SoundEffectsProps> = ({ enabled = true }) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      audioManager.initializeSounds();
      initialized.current = true;
    }
    
    audioManager.setEnabled(enabled);
  }, [enabled]);

  useEffect(() => {
    // Add click listeners for all interactive elements
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Resume audio context on first user interaction
      audioManager.resume();
      
      if (target.matches('button, a, [role="button"], .cursor-pointer')) {
        audioManager.playSound('click', 0.3);
      }
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, [role="button"], .cursor-pointer')) {
        audioManager.playSound('hover', 0.2);
      }
    };

    // Add global event listeners
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseenter', handleMouseEnter, true);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
    };
  }, []);

  return null; // This component doesn't render anything
};

// Export both the component and the audio manager for custom sound triggers
export { audioManager };
export default SoundEffects;