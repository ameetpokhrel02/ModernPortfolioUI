import { motion, AnimatePresence } from 'framer-motion';
import { usePlayground } from '../context/PlaygroundContext';
import { useDraggable } from '../hooks/useDraggable';
import { WindowControls } from './WindowControls';
import { CyberpunkTerminal } from '../terminal/CyberpunkTerminal.tsx';

export function CyberpunkWindow() {
  const { state } = usePlayground();
  const { handleMouseDown, isDragging } = useDraggable();

  if (!state.isActive) return null;

  const { mode, position, size } = state.windowState;

  const windowVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: position.x,
      y: position.y,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: position.x,
      y: position.y,
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
    },
  };

  const sizeVariants = {
    normal: { width: size.width, height: size.height },
    minimized: { width: size.width, height: size.height },
    maximized: { width: size.width, height: size.height },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed z-50 bg-black/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg shadow-2xl overflow-hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-default'
        }`}
        variants={windowVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        style={{
          left: 0,
          top: 0,
        }}
      >
        <motion.div
          variants={sizeVariants}
          animate={mode}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="w-full h-full flex flex-col"
        >
          {/* Window Header */}
          <div
            className={`flex items-center justify-between px-4 py-2 bg-gray-900/80 border-b border-cyan-500/20 ${
              mode === 'normal' ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
            }`}
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-cyan-500/20 rounded border border-cyan-500/40 flex items-center justify-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-sm animate-pulse" />
              </div>
              <span className="text-cyan-400 text-sm font-mono">
                {mode === 'minimized' ? 'Security Console' : 'Interactive Security Sandbox'}
              </span>
            </div>
            
            <WindowControls />
          </div>

          {/* Window Content */}
          {mode !== 'minimized' && (
            <motion.div
              className="flex-1 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CyberpunkTerminal />
            </motion.div>
          )}
        </motion.div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />
        
        {/* Border Glow */}
        <div className="absolute inset-0 rounded-lg border border-cyan-400/20 pointer-events-none animate-pulse" />
      </motion.div>
    </AnimatePresence>
  );
}