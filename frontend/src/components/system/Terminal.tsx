import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTerminal } from '@/hooks/useTerminal';
import { useTypingSound } from '@/hooks/useTypingSound';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

interface TerminalProps {
  isAiMode?: boolean;
}

export function Terminal({ isAiMode: propIsAiMode }: TerminalProps = {}) {
  const {
    history,
    currentInput,
    isAiMode: terminalIsAiMode,
    isBooting,
    executeCommand,
    setCurrentInput,
    setBooting,
    navigateHistory,
    getAutoComplete,
    addToHistory,
    cleanup
  } = useTerminal();

  const device = useDeviceDetection();
  const [autoComplete, setAutoComplete] = useState<string[] | null>(null);
  
  // Use prop AI mode if provided, otherwise use terminal's internal state
  const isAiMode = propIsAiMode !== undefined ? propIsAiMode : terminalIsAiMode;

  const { playKeystroke, playSystemSound } = useTypingSound();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-complete functionality
  useEffect(() => {
    if (currentInput.trim()) {
      const suggestions = getAutoComplete(currentInput);
      if (Array.isArray(suggestions)) {
        setAutoComplete(suggestions.length > 0 ? suggestions : null);
      } else {
        setAutoComplete(null);
      }
    } else {
      setAutoComplete(null);
    }
  }, [currentInput, getAutoComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Emit AI mode changes for visual effects
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('aiModeChange', { 
      detail: { isAiMode } 
    }));
  }, [isAiMode]);

  // Boot sequence
  useEffect(() => {
    const bootSequence = [
      'Initializing Cyberpunk OS v3.0...',
      'Loading React Core...',
      'Connecting Django ASGI...',
      'Redis Channel Layer Active...',
      'WebSocket Ready...',
      'System Online.',
      '',
      '╔══════════════════════════════════════╗',
      '║     Welcome to Amit\'s Portfolio      ║',
      '║         Cyberpunk Terminal           ║',
      '╚══════════════════════════════════════╝',
      '',
      'Type "help" for available commands.',
      'Type "connect ai" to chat with AI assistant.',
      ''
    ];

    let index = 0;
    const bootInterval = setInterval(() => {
      if (index < bootSequence.length) {
        addToHistory({
          type: 'system',
          value: bootSequence[index]
        });
        playSystemSound('notification');
        index++;
      } else {
        clearInterval(bootInterval);
        setBooting(false);
        playSystemSound('success');
        // Focus input after boot
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }, 200);

    return () => clearInterval(bootInterval);
  }, [addToHistory, setBooting, playSystemSound]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Pulse effect on new messages
  useEffect(() => {
    if (history.length > 0) {
      window.dispatchEvent(new CustomEvent('messagePulse'));
    }
  }, [history.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isBooting) {
      executeCommand(currentInput);
      setCurrentInput('');
      playSystemSound('notification');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory('down');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (autoComplete && autoComplete.length > 0) {
        setCurrentInput(autoComplete[0]);
        playSystemSound('success');
      }
    } else if (e.key === 'Escape') {
      setAutoComplete(null);
    } else if (e.key.length === 1) {
      // Play keystroke sound for regular characters
      playKeystroke();
    }
  }, [currentInput, executeCommand, navigateHistory, autoComplete, playKeystroke, playSystemSound, isBooting, setCurrentInput]);

  const getEntryColor = (type: string) => {
    switch (type) {
      case 'input': return 'text-white';
      case 'system': return 'text-cyan-300';
      case 'ai': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-cyan-400';
    }
  };

  const getEntryIcon = (type: string) => {
    switch (type) {
      case 'system': return '⚡';
      case 'ai': return '🤖';
      case 'error': return '❌';
      default: return '';
    }
  };

  const getGlowStyle = (type: string) => {
    switch (type) {
      case 'system':
        return { textShadow: '0 0 10px #67e8f9' };
      case 'ai':
        return { textShadow: '0 0 10px #4ade80' };
      case 'error':
        return { textShadow: '0 0 10px #f87171' };
      case 'input':
        return { textShadow: '0 0 5px #ffffff' };
      default:
        return { textShadow: '0 0 8px #22d3ee' };
    }
  };

  return (
    <div className={`h-full flex flex-col text-cyan-400 font-mono relative ${
      device.isMobile ? 'text-xs' : device.isTablet ? 'text-sm' : 'text-sm'
    }`}>
      {/* Terminal Output */}
      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto space-y-1 relative ${
          device.isMobile ? 'p-2' : 'p-4'
        }`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${isAiMode ? '#00ff41' : '#00bcd4'} transparent`,
          background: `
            radial-gradient(
              ellipse at center,
              rgba(0, 0, 0, 0.8) 0%,
              rgba(0, 20, 40, 0.9) 100%
            )
          `
        }}
      >
        {/* Responsive Scanline effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${isAiMode ? '#00ff4108' : '#00bcd408'} 2px,
              ${isAiMode ? '#00ff4108' : '#00bcd408'} 4px
            )`
          }}
        />

        {history.map((entry, index) => (
          <motion.div
            key={`${entry.timestamp}-${index}`}
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
            className={`${getEntryColor(entry.type)} relative`}
            style={getGlowStyle(entry.type)}
          >
            <pre className={`whitespace-pre-wrap font-mono leading-relaxed ${
              device.isMobile ? 'text-xs' : 'text-sm'
            }`}>
              {getEntryIcon(entry.type)} {entry.value}
            </pre>
          </motion.div>
        ))}
      </div>

      {/* Mobile Auto-completion */}
      {device.isMobile && autoComplete && currentInput && (
        <motion.div
          className="border-t border-b bg-black/90 backdrop-blur-sm"
          style={{
            borderColor: isAiMode ? '#4ade80' : '#22d3ee'
          }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="p-2">
            <div className="text-xs text-gray-400 mb-1">Suggestions:</div>
            <div className="flex gap-2 overflow-x-auto">
              {autoComplete.map((suggestion) => (
                <motion.button
                  key={suggestion}
                  onClick={() => {
                    setCurrentInput(suggestion);
                    setAutoComplete(null);
                  }}
                  className="flex-shrink-0 px-2 py-1 rounded text-xs border"
                  style={{
                    backgroundColor: isAiMode ? 'rgba(74, 222, 128, 0.1)' : 'rgba(34, 211, 238, 0.1)',
                    borderColor: isAiMode ? 'rgba(74, 222, 128, 0.3)' : 'rgba(34, 211, 238, 0.3)',
                    color: isAiMode ? '#4ade80' : '#22d3ee'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Responsive Input Line */}
      {!isBooting && (
        <div 
          className={`border-t flex items-center relative ${
            device.isMobile ? 'p-2' : 'p-4'
          }`}
          style={{
            borderColor: isAiMode ? '#00ff4130' : '#00bcd430',
            background: `
              linear-gradient(90deg, 
                rgba(0, 0, 0, 0.8) 0%, 
                rgba(0, 40, 80, 0.3) 50%, 
                rgba(0, 0, 0, 0.8) 100%
              )
            `
          }}
        >
          <motion.span
            className={`font-bold ${
              device.isMobile ? 'mr-2 text-sm' : 'mr-3 text-lg'
            } ${isAiMode ? 'text-green-400' : 'text-cyan-400'}`}
            animate={{
              textShadow: isAiMode 
                ? ['0 0 5px #4ade80', '0 0 15px #4ade80', '0 0 5px #4ade80']
                : ['0 0 5px #22d3ee', '0 0 15px #22d3ee', '0 0 5px #22d3ee']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {device.isMobile 
              ? (isAiMode ? 'AI>' : '>') 
              : (isAiMode ? '🤖 AI>' : '💻 >')
            }
          </motion.span>
          
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent text-white outline-none font-mono ${
              device.isMobile ? 'text-xs' : 'text-sm'
            }`}
            placeholder={
              device.isMobile 
                ? (isAiMode ? "Chat with AI..." : "Command...") 
                : (isAiMode ? "Chat with AI assistant..." : "Enter command...")
            }
            autoComplete="off"
            spellCheck={false}
            style={{
              textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
            }}
          />
          
          <motion.div
            animate={{ 
              opacity: [1, 0, 1],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`ml-2 ${
              device.isMobile ? 'w-1 h-3' : 'w-2 h-5'
            } ${isAiMode ? 'bg-green-400' : 'bg-cyan-400'}`}
            style={{
              boxShadow: isAiMode 
                ? '0 0 10px #4ade80' 
                : '0 0 10px #22d3ee'
            }}
          />

          {/* Desktop Auto-completion */}
          {!device.isMobile && autoComplete && currentInput && (
            <motion.div
              className="absolute bottom-full left-0 mb-2 bg-black/90 border rounded px-3 py-2 text-xs font-mono"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                borderColor: isAiMode ? '#4ade80' : '#22d3ee',
                boxShadow: `0 0 20px ${isAiMode ? 'rgba(74, 222, 128, 0.3)' : 'rgba(34, 211, 238, 0.3)'}`
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isAiMode ? '#4ade80' : '#22d3ee' }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span style={{ color: isAiMode ? '#4ade80' : '#22d3ee' }}>
                  AUTOCOMPLETE
                </span>
              </div>
              <div className="space-y-1">
                {autoComplete.map((suggestion, index) => (
                  <motion.div
                    key={suggestion}
                    className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer p-1 rounded"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      backgroundColor: isAiMode ? 'rgba(74, 222, 128, 0.1)' : 'rgba(34, 211, 238, 0.1)',
                      x: 4
                    }}
                    onClick={() => {
                      setCurrentInput(suggestion);
                      setAutoComplete(null);
                    }}
                  >
                    <span className="text-gray-500">▶</span>
                    <span>{suggestion}</span>
                    <span className="text-xs text-gray-500 ml-auto">TAB</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="mt-2 pt-2 border-t text-xs text-gray-500"
                style={{ borderColor: isAiMode ? '#4ade8050' : '#22d3ee50' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Press TAB to complete • ESC to dismiss
              </motion.div>
            </motion.div>
          )}
        </div>
      )}

      {/* Responsive Status Bar */}
      <div 
        className={`border-t flex justify-between items-center ${
          device.isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-xs'
        }`}
        style={{
          borderColor: isAiMode ? '#00ff4120' : '#00bcd420',
          background: `
            linear-gradient(90deg, 
              rgba(0, 0, 0, 0.9) 0%, 
              rgba(0, 20, 40, 0.5) 50%, 
              rgba(0, 0, 0, 0.9) 100%
            )
          `
        }}
      >
        <span className="flex items-center gap-2">
          {isAiMode ? (
            <>
              <motion.span 
                className={`bg-green-400 rounded-full ${
                  device.isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                }`}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ boxShadow: '0 0 8px #4ade80' }}
              />
              <span className="text-green-400" style={{ textShadow: '0 0 5px #4ade80' }}>
                {device.isMobile ? 'AI Connected' : '🤖 AI Assistant Connected'}
              </span>
            </>
          ) : (
            <>
              <motion.span 
                className={`bg-cyan-400 rounded-full ${
                  device.isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                }`}
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ boxShadow: '0 0 8px #22d3ee' }}
              />
              <span className="text-cyan-400" style={{ textShadow: '0 0 5px #22d3ee' }}>
                {device.isMobile ? 'Terminal Active' : '💻 Terminal Mode Active'}
              </span>
            </>
          )}
        </span>
        
        {!device.isMobile && (
          <div className="flex items-center gap-4 text-cyan-600">
            <span>Commands: {history.filter(h => h.type === 'input').length}</span>
            <span>|</span>
            <span>Session: {Math.floor((Date.now() - (history[0]?.timestamp || Date.now())) / 1000)}s</span>
          </div>
        )}
      </div>
    </div>
  );
}