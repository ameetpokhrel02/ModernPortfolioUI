import { useState, useCallback, useRef } from 'react';
import type { GridPulseState } from '../types';

export function useGridPulse() {
  const [state, setState] = useState<GridPulseState>({
    isActive: false,
    intensity: 0,
  });

  const timeoutRef = useRef<number | null>(null);

  const triggerPulse = useCallback((intensity: number = 0.8) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start pulse
    setState({
      isActive: true,
      intensity,
    });

    // End pulse after 400ms
    timeoutRef.current = window.setTimeout(() => {
      setState({
        isActive: false,
        intensity: 0,
      });
    }, 400);
  }, []);

  const stopPulse = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setState({
      isActive: false,
      intensity: 0,
    });
  }, []);

  return {
    ...state,
    triggerPulse,
    stopPulse,
  };
}