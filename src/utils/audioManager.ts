type AudioContextConstructor = typeof AudioContext;

type ExtendedWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: AudioContextConstructor;
  };

const getAudioContextConstructor = (): AudioContextConstructor | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const extendedWindow = window as ExtendedWindow;
  return extendedWindow.AudioContext ?? extendedWindow.webkitAudioContext;
};

class AudioManager {
  private audioContext: AudioContext | null = null;

  private sounds = new Map<string, AudioBuffer>();

  private enabled = true;

  constructor() {
    const ContextConstructor = getAudioContextConstructor();

    if (!ContextConstructor) {
      return;
    }

    try {
      this.audioContext = new ContextConstructor();
    } catch (error) {
      console.warn('Web Audio API not supported', error);
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private createTone(
    frequency: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.1,
  ): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i += 1) {
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
        default:
          break;
      }

      const fadeTime = 0.05;
      const fadeInEnd = fadeTime * sampleRate;
      const fadeOutStart = length - fadeTime * sampleRate;

      if (i < fadeInEnd) {
        value *= i / fadeInEnd;
      } else if (i > fadeOutStart) {
        value *= (length - i) / (length - fadeOutStart);
      }

      data[i] = value * volume;
    }

    return buffer;
  }

  private createNoiseBuffer(duration: number, volume = 0.1): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * volume;
    }

    return buffer;
  }

  initializeSounds() {
    if (!this.audioContext) return;

    const clickBuffer = this.createTone(800, 0.1, 'sine', 0.2);
    if (clickBuffer) this.sounds.set('click', clickBuffer);

    const hoverBuffer = this.createTone(600, 0.05, 'sine', 0.1);
    if (hoverBuffer) this.sounds.set('hover', hoverBuffer);

    const successBuffer = this.createTone(523, 0.2, 'sine', 0.15);
    if (successBuffer) this.sounds.set('success', successBuffer);

    const errorBuffer = this.createTone(200, 0.3, 'square', 0.2);
    if (errorBuffer) this.sounds.set('error', errorBuffer);

    const popBuffer = this.createTone(1000, 0.08, 'sine', 0.15);
    if (popBuffer) this.sounds.set('pop', popBuffer);

    const whooshBuffer = this.createNoiseBuffer(0.5, 0.05);
    if (whooshBuffer) this.sounds.set('whoosh', whooshBuffer);

    const bellBuffer = this.createTone(1047, 0.8, 'sine', 0.1);
    if (bellBuffer) this.sounds.set('bell', bellBuffer);

    const chimeBuffer = this.createTone(698, 0.4, 'triangle', 0.12);
    if (chimeBuffer) this.sounds.set('chime', chimeBuffer);
  }

  playSound(soundName: string, volume = 1) {
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
    } catch (error) {
      console.warn('Failed to play sound', error);
    }
  }

  async resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (error) {
        console.warn('Failed to resume AudioContext', error);
      }
    }
  }
}

export const audioManager = new AudioManager();

export default AudioManager;
