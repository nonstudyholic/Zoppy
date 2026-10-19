import { useCallback } from 'react';

export function useGiggle(): () => void {
  return useCallback((): void => {
    const audioContext = new AudioContext();
    const notes = [660, 880, 740, 990];
    const startTime = audioContext.currentTime;

    void audioContext.resume();
    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const noteStart = startTime + index * 0.09;

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      oscillator.frequency.exponentialRampToValueAtTime(frequency + 110, noteStart + 0.07);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.12, noteStart + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.1);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + 0.11);
    });

    window.setTimeout(() => void audioContext.close(), 600);
  }, []);
}