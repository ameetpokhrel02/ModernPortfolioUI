import { motion, AnimatePresence } from 'framer-motion';
import { usePlayground } from '../context/PlaygroundContext';
import { CyberpunkWindow } from '../window/CyberpunkWindow';

export function PlaygroundOverlay() {
  const { state } = usePlayground();

  return (
    <AnimatePresence>
      {state.isActive && (
        <motion.div
          className="fixed inset-0 z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Overlay - subtle darkening */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
          
          {/* Window Container */}
          <div className="relative w-full h-full pointer-events-auto">
            <CyberpunkWindow />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}