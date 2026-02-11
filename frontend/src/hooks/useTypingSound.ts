import { useCallback, useRef } from 'react';

export function useTypingSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isEnabledRef = useRef(true);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playKeystroke = useCallback(() => {
    if (!isEnabledRef.current) return;

    try {
      const audioContext = initAudioContext();
      
      // Create a subtle beep sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Subtle cyberpunk-style beep
      oscillator.frequency.setValueAtTime(800 + Math.random() * 200, audioContext.currentTime);
      oscillator.type = 'square';
      
      // Very quiet volume
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Silently fail if audio context is not available
      console.debug('Audio context not available');
    }
  }, [initAudioContext]);

  const playSystemSound = useCallback((type: 'success' | 'error' | 'notification' = 'notification') => {
    if (!isEnabledRef.current) return;

    try {
      const audioContext = initAudioContext();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different sounds for different types
      switch (type) {
        case 'success':
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
          break;
        case 'error':
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.1);
          break;
        default:
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
      }
      
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.debug('Audio context not available');
    }
  }, [initAudioContext]);

  const toggleSound = useCallback(() => {
    isEnabledRef.current = !isEnabledRef.current;
    return isEnabledRef.current;
  }, []);

  return {
    playKeystroke,
    playSystemSound,
    toggleSound,
    isEnabled: () => isEnabledRef.current
  };
}