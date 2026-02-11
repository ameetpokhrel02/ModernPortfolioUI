import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminalEngine } from '../hooks/useTerminalEngine';
import { useGridPulse } from '../hooks/useGridPulse';
import { TerminalEntry } from './TerminalEntry.tsx';
import { TerminalInput } from './TerminalInput.tsx';
import { AnimatedGrid } from './AnimatedGrid.tsx';

export function CyberpunkTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  const {
    entries,
    currentInput,
    isAiMode,
    isBooting,
    executeCommand,
    setCurrentInput,
    navigateHistory,
    getCommandSuggestions,
    isFirewallActive,
  } = useTerminalEngine();

  const { isActive: isPulsing, intensity, triggerPulse } = useGridPulse();

  // Auto-scroll to bottom when new entries are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [entries]);

  // Trigger grid pulse on AI responses
  useEffect(() => {
    const lastEntry = entries[entries.length - 1];
    if (lastEntry?.type === 'ai') {
      triggerPulse(0.9);
    }
  }, [entries, triggerPulse]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        if (currentInput.trim()) {
          executeCommand(currentInput);
          setCurrentInput('');
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        navigateHistory('up');
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        navigateHistory('down');
        break;
        
      case 'Tab':
        e.preventDefault();
        const suggestions = getCommandSuggestions(currentInput);
        if (suggestions.length > 0) {
          setCurrentInput(suggestions[0]);
        }
        break;
        
      case 'Escape':
        setCurrentInput('');
        break;
    }
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Animated Background Grid */}
      <AnimatedGrid 
        isActive={isPulsing || isFirewallActive} 
        intensity={isFirewallActive ? Math.max(intensity, 0.6) : intensity}
        isFirewallActive={isFirewallActive}
      />
      
      {/* Terminal Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Terminal Output */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-cyan-500/30"
        >
          <AnimatePresence mode="popLayout">
            {entries.map((entry) => (
              <TerminalEntry key={entry.id} entry={entry} />
            ))}
          </AnimatePresence>
          
          {/* Boot Loading Indicator */}
          {isBooting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-cyan-400 mt-2"
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span>System initializing...</span>
            </motion.div>
          )}
        </div>

        {/* Terminal Input */}
        {!isBooting && (
          <div className="border-t border-cyan-500/20 bg-black/50">
            <TerminalInput
              value={currentInput}
              onChange={setCurrentInput}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              isAiMode={isAiMode}
              isFocused={isInputFocused}
            />
          </div>
        )}
      </div>

      {/* Terminal Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Scan Lines Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none opacity-30">
        <div className="w-full h-px bg-cyan-400/20 animate-pulse" style={{ marginTop: '25%' }} />
        <div className="w-full h-px bg-cyan-400/10 animate-pulse" style={{ marginTop: '25%' }} />
        <div className="w-full h-px bg-cyan-400/20 animate-pulse" style={{ marginTop: '25%' }} />
      </div>
    </div>
  );
}