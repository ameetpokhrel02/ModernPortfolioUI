import { createContext, useContext, useState, type ReactNode } from 'react';

// Terminal color themes
export type TerminalTheme = 'cyan' | 'red' | 'green' | 'purple' | 'orange' | 'pink' | 'yellow' | 'blue';

export const terminalThemes: Record<TerminalTheme, { primary: string; glow: string; bg: string }> = {
  cyan: { primary: 'text-cyan-400', glow: '#22d3ee', bg: 'rgba(0, 188, 212, 0.08)' },
  red: { primary: 'text-red-400', glow: '#f87171', bg: 'rgba(248, 113, 113, 0.08)' },
  green: { primary: 'text-green-400', glow: '#4ade80', bg: 'rgba(74, 222, 128, 0.08)' },
  purple: { primary: 'text-purple-400', glow: '#c084fc', bg: 'rgba(192, 132, 252, 0.08)' },
  orange: { primary: 'text-orange-400', glow: '#fb923c', bg: 'rgba(251, 146, 60, 0.08)' },
  pink: { primary: 'text-pink-400', glow: '#f472b6', bg: 'rgba(244, 114, 182, 0.08)' },
  yellow: { primary: 'text-yellow-400', glow: '#facc15', bg: 'rgba(250, 204, 21, 0.08)' },
  blue: { primary: 'text-blue-400', glow: '#60a5fa', bg: 'rgba(96, 165, 250, 0.08)' },
};

interface SystemContextType {
  isSystemMode: boolean;
  setSystemMode: (mode: boolean) => void;
  toggleSystemMode: () => void;
  isSecuritySandboxActive: boolean;
  setSecuritySandboxActive: (active: boolean) => void;
  toggleSecuritySandbox: () => void;
  terminalTheme: TerminalTheme;
  setTerminalTheme: (theme: TerminalTheme) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [isSystemMode, setIsSystemMode] = useState(false);
  const [isSecuritySandboxActive, setIsSecuritySandboxActive] = useState(false);
  const [terminalTheme, setTerminalTheme] = useState<TerminalTheme>('cyan');

  const toggleSystemMode = () => {
    setIsSystemMode(prev => !prev);
    
    // Disable/enable scroll on body
    if (!isSystemMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const toggleSecuritySandbox = () => {
    setIsSecuritySandboxActive(prev => !prev);
  };

  return (
    <SystemContext.Provider value={{
      isSystemMode,
      setSystemMode: setIsSystemMode,
      toggleSystemMode,
      isSecuritySandboxActive,
      setSecuritySandboxActive: setIsSecuritySandboxActive,
      toggleSecuritySandbox,
      terminalTheme,
      setTerminalTheme
    }}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
}