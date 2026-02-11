import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { PlaygroundState, WindowState, WindowMode } from '../types';

interface PlaygroundContextType {
  state: PlaygroundState;
  openPlayground: () => void;
  closePlayground: () => void;
  setWindowMode: (mode: WindowMode) => void;
  updateWindowPosition: (position: { x: number; y: number }) => void;
  setDragging: (isDragging: boolean) => void;
}

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(undefined);

const DEFAULT_WINDOW_STATE: WindowState = {
  mode: 'normal',
  position: { x: 100, y: 100 },
  size: { width: 700, height: 500 },
  isDragging: false,
};

const DEFAULT_STATE: PlaygroundState = {
  isActive: false,
  windowState: DEFAULT_WINDOW_STATE,
};

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE);

  const openPlayground = useCallback(() => {
    setState(prev => ({
      ...prev,
      isActive: true,
      windowState: {
        ...DEFAULT_WINDOW_STATE,
        // Center the window on screen
        position: {
          x: Math.max(50, (window.innerWidth - DEFAULT_WINDOW_STATE.size.width) / 2),
          y: Math.max(50, (window.innerHeight - DEFAULT_WINDOW_STATE.size.height) / 2),
        },
      },
    }));
  }, []);

  const closePlayground = useCallback(() => {
    setState(prev => ({
      ...prev,
      isActive: false,
    }));
    // Dispatch close event for SecuritySandboxOverlay
    window.dispatchEvent(new CustomEvent('closeSecuritySandbox'));
  }, []);

  // Listen for auto-open events from SecuritySandboxOverlay
  useEffect(() => {
    const handleAutoOpen = () => {
      openPlayground();
    };

    window.addEventListener('openSecuritySandbox', handleAutoOpen);
    return () => window.removeEventListener('openSecuritySandbox', handleAutoOpen);
  }, [openPlayground]);

  const setWindowMode = useCallback((mode: WindowMode) => {
    setState(prev => {
      const newWindowState = { ...prev.windowState, mode };

      switch (mode) {
        case 'minimized':
          newWindowState.position = {
            x: window.innerWidth - 270, // 250px width + 20px margin
            y: window.innerHeight - 60, // 40px height + 20px margin
          };
          newWindowState.size = { width: 250, height: 40 };
          break;

        case 'maximized':
          newWindowState.position = { x: 20, y: 20 };
          newWindowState.size = {
            width: window.innerWidth * 0.9,
            height: window.innerHeight * 0.9,
          };
          break;

        case 'normal':
          newWindowState.position = {
            x: Math.max(50, (window.innerWidth - 700) / 2),
            y: Math.max(50, (window.innerHeight - 500) / 2),
          };
          newWindowState.size = { width: 700, height: 500 };
          break;
      }

      return {
        ...prev,
        windowState: newWindowState,
      };
    });
  }, []);

  const updateWindowPosition = useCallback((position: { x: number; y: number }) => {
    setState(prev => ({
      ...prev,
      windowState: {
        ...prev.windowState,
        position,
      },
    }));
  }, []);

  const setDragging = useCallback((isDragging: boolean) => {
    setState(prev => ({
      ...prev,
      windowState: {
        ...prev.windowState,
        isDragging,
      },
    }));
  }, []);

  return (
    <PlaygroundContext.Provider
      value={{
        state,
        openPlayground,
        closePlayground,
        setWindowMode,
        updateWindowPosition,
        setDragging,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (context === undefined) {
    throw new Error('usePlayground must be used within a PlaygroundProvider');
  }
  return context;
}