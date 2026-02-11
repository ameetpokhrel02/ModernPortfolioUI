import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/contexts/SystemContext';
import { Terminal } from './Terminal';
import { CyberpunkGrid } from './CyberpunkGrid';
import { TerminalWindow } from './TerminalWindow';
import { MobileTerminal } from '@/components/mobile/MobileTerminal';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { useState, useEffect } from 'react';

export function SystemOverlay() {
  const { isSystemMode } = useSystem();
  const [isAiMode, setIsAiMode] = useState(false);
  const [messagePulse, setMessagePulse] = useState(0);
  const device = useDeviceDetection();

  // Listen for AI mode changes and message pulses
  useEffect(() => {
    const handleAiModeChange = (event: CustomEvent) => {
      setIsAiMode(event.detail.isAiMode);
    };

    const handleMessagePulse = () => {
      setMessagePulse(prev => prev + 1);
    };

    window.addEventListener('aiModeChange' as any, handleAiModeChange);
    window.addEventListener('messagePulse' as any, handleMessagePulse);

    return () => {
      window.removeEventListener('aiModeChange' as any, handleAiModeChange);
      window.removeEventListener('messagePulse' as any, handleMessagePulse);
    };
  }, []);

  const toggleAiMode = () => {
    setIsAiMode(!isAiMode);
    window.dispatchEvent(new CustomEvent('aiModeChange', {
      detail: { isAiMode: !isAiMode }
    }));
  };

  return (
    <AnimatePresence>
      {isSystemMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-sm"
        >
          {/* Enhanced Cyberpunk Grid Background */}
          <CyberpunkGrid
            isAiActive={isAiMode}
            pulseOnMessage={messagePulse > 0}
          />

          {/* Responsive Terminal Container */}
          {device.isMobile ? (
            <div className="relative z-10 h-full">
              <MobileTerminal
                isAiMode={isAiMode}
                onToggleAiMode={toggleAiMode}
              />
            </div>
          ) : (
            <div className="relative z-10 h-full flex items-center justify-center p-4">
              <TerminalWindow isAiMode={isAiMode}>
                <Terminal isAiMode={isAiMode} />
              </TerminalWindow>
            </div>
          )}

          {/* Responsive Ambient Lighting Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top glow */}
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 blur-3xl opacity-20 ${device.isMobile ? 'w-64 h-20' : 'w-96 h-32'
                }`}
              style={{
                background: `radial-gradient(ellipse, ${isAiMode ? '#00ff41' : '#00bcd4'
                  } 0%, transparent 70%)`
              }}
            />

            {/* Bottom glow */}
            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 blur-3xl opacity-20 ${device.isMobile ? 'w-64 h-20' : 'w-96 h-32'
                }`}
              style={{
                background: `radial-gradient(ellipse, ${isAiMode ? '#00ff41' : '#00bcd4'
                  } 0%, transparent 70%)`
              }}
            />

            {/* Mobile-specific side glows */}
            {device.isMobile && (
              <>
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-64 blur-3xl opacity-10"
                  style={{
                    background: `radial-gradient(ellipse, ${isAiMode ? '#00ff41' : '#00bcd4'
                      } 0%, transparent 70%)`
                  }}
                />
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-64 blur-3xl opacity-10"
                  style={{
                    background: `radial-gradient(ellipse, ${isAiMode ? '#00ff41' : '#00bcd4'
                      } 0%, transparent 70%)`
                  }}
                />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}