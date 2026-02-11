import { createContext, useContext, useState, type ReactNode } from 'react';

interface SystemContextType {
  isSystemMode: boolean;
  setSystemMode: (mode: boolean) => void;
  toggleSystemMode: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [isSystemMode, setIsSystemMode] = useState(false);

  const toggleSystemMode = () => {
    setIsSystemMode(prev => !prev);
    
    // Disable/enable scroll on body
    if (!isSystemMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <SystemContext.Provider value={{
      isSystemMode,
      setSystemMode: setIsSystemMode,
      toggleSystemMode
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