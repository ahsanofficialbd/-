// Web Audio API Sound Synthesizer - 100% offline & zero external audio files needed

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazily initialize AudioContext on first user interaction
    const savedMute = localStorage.getItem('gk_sound_muted');
    if (savedMute !== null) {
      this.isMuted = savedMute === 'true';
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('gk_sound_muted', String(muted));
    } catch {}
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'light') {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        if (type === 'light') navigator.vibrate(15);
        else if (type === 'medium') navigator.vibrate(30);
        else if (type === 'heavy') navigator.vibrate(60);
        else if (type === 'success') navigator.vibrate([20, 40, 30]);
        else if (type === 'error') navigator.vibrate([40, 60, 40]);
      } catch {}
    }
  }

  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  }

  public playCorrect() {
    if (this.isMuted) return;
    this.triggerHaptic('success');
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      // Subtle, pleasant melodic chime: C5 (523.25Hz) -> E5 (659.25Hz) -> G5 (783.99Hz)
      // Triangle wave with soft attack and smooth natural exponential decay
      const notes = [523.25, 659.25, 783.99];
      const startTime = ctx.currentTime;
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const noteStart = startTime + index * 0.07;
        const noteDuration = 0.28;

        osc.frequency.setValueAtTime(freq, noteStart);

        // Smooth acoustic envelope: soft attack (15ms) then gentle exponential falloff
        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.09, noteStart + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0008, noteStart + noteDuration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + noteDuration);
      });
    } catch {}
  }

  public playWrong() {
    if (this.isMuted) return;
    this.triggerHaptic('error');
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      // Subtle, non-jarring low acoustic double-tone (240Hz -> 180Hz)
      // Uses triangle wave with warm low-frequency characteristic rather than harsh buzz
      const tones = [240, 180];
      const startTime = ctx.currentTime;
      tones.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const toneStart = startTime + index * 0.11;
        const toneDuration = 0.16;

        osc.frequency.setValueAtTime(freq, toneStart);

        // Gentle, soft attack and quick warm release
        gain.gain.setValueAtTime(0.001, toneStart);
        gain.gain.exponentialRampToValueAtTime(0.07, toneStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0008, toneStart + toneDuration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(toneStart);
        osc.stop(toneStart + toneDuration);
      });
    } catch {}
  }

  public playTimerTick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      // Ultra-subtle wooden clock tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.025);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {}
  }

  public playLifeline() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  }

  public playVictory() {
    if (this.isMuted) return;
    this.triggerHaptic('heavy');
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      // Fanfare: C5, E5, G5, C6
      const fanfare = [523.25, 659.25, 783.99, 1046.50];
      fanfare.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const start = ctx.currentTime + idx * 0.12;
        const dur = idx === 3 ? 0.6 : 0.15;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.01, start);
        gain.gain.linearRampToValueAtTime(0.18, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur);
      });
    } catch {}
  }
}

export const sound = new SoundEffects();
