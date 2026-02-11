import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VirtualKeyboardProps {
  isVisible: boolean;
  onKeyPress: (key: string) => void;
  onClose: () => void;
  isAiMode?: boolean;
}

const keyboardLayouts = {
  qwerty: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
    ['123', 'space', 'enter']
  ],
  numbers: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
    ['#+=', '.', ',', '?', '!', "'", 'backspace'],
    ['ABC', 'space', 'enter']
  ],
  symbols: [
    ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
    ['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'],
    ['123', '.', ',', '?', '!', "'", 'backspace'],
    ['ABC', 'space', 'enter']
  ]
};

export function VirtualKeyboard({ isVisible, onKeyPress, onClose, isAiMode = false }: VirtualKeyboardProps) {
  const [currentLayout, setCurrentLayout] = useState<keyof typeof keyboardLayouts>('qwerty');
  const [isShiftActive, setIsShiftActive] = useState(false);

  const handleKeyPress = useCallback((key: string) => {
    switch (key) {
      case 'shift':
        setIsShiftActive(!isShiftActive);
        break;
      case 'backspace':
        onKeyPress('Backspace');
        break;
      case 'enter':
        onKeyPress('Enter');
        break;
      case 'space':
        onKeyPress(' ');
        break;
      case '123':
        setCurrentLayout('numbers');
        break;
      case '#+=':
        setCurrentLayout('symbols');
        break;
      case 'ABC':
        setCurrentLayout('qwerty');
        break;
      default:
        const finalKey = isShiftActive && currentLayout === 'qwerty' ? key.toUpperCase() : key;
        onKeyPress(finalKey);
        if (isShiftActive && currentLayout === 'qwerty') {
          setIsShiftActive(false);
        }
        break;
    }
  }, [onKeyPress, isShiftActive, currentLayout]);

  const getKeyStyle = (key: string) => {
    const baseClasses = "relative overflow-hidden font-mono font-bold rounded transition-all duration-150 active:scale-95";
    const colorClasses = isAiMode 
      ? "bg-green-900/50 border border-green-400/30 text-green-300 hover:bg-green-800/60 active:bg-green-700/70"
      : "bg-cyan-900/50 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-800/60 active:bg-cyan-700/70";
    
    let sizeClasses = "h-12 px-3 text-sm";
    
    if (key === 'space') {
      sizeClasses = "h-12 px-8 text-sm";
    } else if (['shift', 'backspace', 'enter', '123', '#+=', 'ABC'].includes(key)) {
      sizeClasses = "h-12 px-4 text-xs";
    }

    return `${baseClasses} ${colorClasses} ${sizeClasses}`;
  };

  const getKeyLabel = (key: string) => {
    switch (key) {
      case 'shift':
        return isShiftActive ? '⇧' : '⇧';
      case 'backspace':
        return '⌫';
      case 'enter':
        return '↵';
      case 'space':
        return 'SPACE';
      default:
        return isShiftActive && currentLayout === 'qwerty' ? key.toUpperCase() : key;
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t"
        style={{
          borderColor: isAiMode ? '#4ade80' : '#22d3ee',
          boxShadow: `0 -4px 20px ${isAiMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(34, 211, 238, 0.2)'}`
        }}
      >
        {/* Keyboard Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: isAiMode ? '#4ade80' : '#22d3ee' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span 
              className="text-xs font-mono"
              style={{ color: isAiMode ? '#4ade80' : '#22d3ee' }}
            >
              VIRTUAL KEYBOARD
            </span>
          </div>
          <motion.button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              backgroundColor: isAiMode ? 'rgba(74, 222, 128, 0.1)' : 'rgba(34, 211, 238, 0.1)',
              border: `1px solid ${isAiMode ? 'rgba(74, 222, 128, 0.3)' : 'rgba(34, 211, 238, 0.3)'}`
            }}
          >
            ×
          </motion.button>
        </div>

        {/* Keyboard Layout */}
        <div className="p-3 pb-6">
          {keyboardLayouts[currentLayout].map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1 mb-2">
              {row.map((key) => (
                <motion.button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={getKeyStyle(key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: isShiftActive && key === 'shift' 
                      ? `0 0 10px ${isAiMode ? '#4ade80' : '#22d3ee'}`
                      : undefined
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded"
                    style={{
                      background: `linear-gradient(45deg, ${
                        isAiMode ? 'rgba(74, 222, 128, 0.1)' : 'rgba(34, 211, 238, 0.1)'
                      }, transparent)`
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="relative z-10">
                    {getKeyLabel(key)}
                  </span>
                </motion.button>
              ))}
            </div>
          ))}
        </div>

        {/* Keyboard Suggestions Bar */}
        <motion.div
          className="px-3 pb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 overflow-x-auto">
            {['help', 'clear', 'ls', 'whoami', 'status'].map((suggestion) => (
              <motion.button
                key={suggestion}
                onClick={() => suggestion.split('').forEach(char => onKeyPress(char))}
                className="flex-shrink-0 px-3 py-1 rounded text-xs font-mono border"
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}