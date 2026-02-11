import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from '@/components/system/Terminal';
import { VirtualKeyboard } from './VirtualKeyboard';
import { useTouchGestures } from '@/hooks/useTouchGestures';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

interface MobileTerminalProps {
  isAiMode?: boolean;
  onToggleAiMode?: () => void;
}

export function MobileTerminal({ isAiMode = false, onToggleAiMode }: MobileTerminalProps) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [terminalScale, setTerminalScale] = useState(1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const device = useDeviceDetection();

  // Handle virtual keyboard key presses
  const handleVirtualKeyPress = useCallback((key: string) => {
    const terminalInput = terminalRef.current?.querySelector('input');
    if (terminalInput) {
      if (key === 'Backspace') {
        const event = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true });
        terminalInput.dispatchEvent(event);
      } else if (key === 'Enter') {
        const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
        terminalInput.dispatchEvent(event);
      } else {
        // Simulate typing
        const currentValue = (terminalInput as HTMLInputElement).value;
        (terminalInput as HTMLInputElement).value = currentValue + key;
        const event = new Event('input', { bubbles: true });
        terminalInput.dispatchEvent(event);
      }
    }
  }, []);

  // Touch gesture handlers
  const { attachGestures } = useTouchGestures({
    onSwipeUp: () => {
      if (!isKeyboardVisible) {
        setIsFullscreen(true);
      }
    },
    onSwipeDown: () => {
      if (isFullscreen && !isKeyboardVisible) {
        setIsFullscreen(false);
      } else if (isKeyboardVisible) {
        setIsKeyboardVisible(false);
      }
    },
    onDoubleTap: () => {
      if (onToggleAiMode) {
        onToggleAiMode();
      }
    },
    onPinch: (scale) => {
      setTerminalScale(Math.max(0.5, Math.min(2, scale)));
    }
  });

  // Attach gestures to terminal
  useEffect(() => {
    if (terminalRef.current) {
      return attachGestures(terminalRef.current);
    }
  }, [attachGestures]);

  // Handle input focus on mobile
  const handleInputFocus = useCallback(() => {
    if (device.isMobile) {
      setIsKeyboardVisible(true);
    }
  }, [device.isMobile]);

  // Auto-hide keyboard when terminal loses focus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (terminalRef.current && !terminalRef.current.contains(event.target as Node)) {
        setIsKeyboardVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Mobile Terminal Container */}
      <motion.div
        ref={terminalRef}
        className={`relative w-full transition-all duration-300 ${
          isFullscreen ? 'h-screen' : 'h-full'
        } ${isKeyboardVisible ? 'pb-80' : ''}`}
        style={{
          transform: `scale(${terminalScale})`,
          transformOrigin: 'top center'
        }}
        animate={{
          y: isFullscreen ? 0 : undefined,
          height: isFullscreen ? '100vh' : undefined
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Mobile Header */}
        {device.isMobile && (
          <motion.div
            className="flex items-center justify-between p-3 border-b bg-black/50 backdrop-blur-sm"
            style={{
              borderColor: isAiMode ? '#4ade80' : '#22d3ee'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Status Indicators */}
            <div className="flex items-center gap-3">
              <motion.div
                className="flex items-center gap-2"
                animate={{
                  color: isAiMode ? '#4ade80' : '#22d3ee'
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isAiMode ? '#4ade80' : '#22d3ee' }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-xs font-mono">
                  {isAiMode ? 'AI' : 'SYS'}
                </span>
              </motion.div>
              
              <div className="text-xs font-mono text-gray-400">
                {device.orientation.toUpperCase()}
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2">
              {/* Keyboard Toggle */}
              <motion.button
                onClick={() => setIsKeyboardVisible(!isKeyboardVisible)}
                className="w-8 h-8 rounded flex items-center justify-center text-xs font-mono"
                style={{
                  backgroundColor: isKeyboardVisible 
                    ? (isAiMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(34, 211, 238, 0.2)')
                    : 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${isKeyboardVisible 
                    ? (isAiMode ? '#4ade80' : '#22d3ee')
                    : 'rgba(255, 255, 255, 0.2)'
                  }`,
                  color: isKeyboardVisible 
                    ? (isAiMode ? '#4ade80' : '#22d3ee')
                    : '#ffffff'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⌨
              </motion.button>

              {/* Fullscreen Toggle */}
              <motion.button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-8 h-8 rounded flex items-center justify-center text-xs font-mono"
                style={{
                  backgroundColor: isFullscreen 
                    ? (isAiMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(34, 211, 238, 0.2)')
                    : 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${isFullscreen 
                    ? (isAiMode ? '#4ade80' : '#22d3ee')
                    : 'rgba(255, 255, 255, 0.2)'
                  }`,
                  color: isFullscreen 
                    ? (isAiMode ? '#4ade80' : '#22d3ee')
                    : '#ffffff'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isFullscreen ? '⤓' : '⤢'}
              </motion.button>

              {/* AI Mode Toggle */}
              {onToggleAiMode && (
                <motion.button
                  onClick={onToggleAiMode}
                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-mono"
                  style={{
                    backgroundColor: isAiMode 
                      ? 'rgba(74, 222, 128, 0.2)'
                      : 'rgba(34, 211, 238, 0.2)',
                    border: `1px solid ${isAiMode ? '#4ade80' : '#22d3ee'}`,
                    color: isAiMode ? '#4ade80' : '#22d3ee'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAiMode ? '🤖' : '💻'}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Terminal Content */}
        <div 
          className="h-full"
          onClick={handleInputFocus}
        >
          <Terminal isAiMode={isAiMode} />
        </div>

        {/* Mobile Gesture Hints */}
        {device.isMobile && !isKeyboardVisible && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-mono text-gray-500 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div>Swipe ↑ fullscreen • Double tap AI mode</div>
            <div>Pinch to zoom • Tap for keyboard</div>
          </motion.div>
        )}
      </motion.div>

      {/* Virtual Keyboard */}
      <VirtualKeyboard
        isVisible={isKeyboardVisible}
        onKeyPress={handleVirtualKeyPress}
        onClose={() => setIsKeyboardVisible(false)}
        isAiMode={isAiMode}
      />

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}