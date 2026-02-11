import { motion } from 'framer-motion';
import { usePlayground } from '../context/PlaygroundContext';

export function WindowControls() {
  const { state, closePlayground, setWindowMode } = usePlayground();

  const handleMinimize = () => {
    if (state.windowState.mode === 'minimized') {
      setWindowMode('normal');
    } else {
      setWindowMode('minimized');
    }
  };

  const handleMaximize = () => {
    if (state.windowState.mode === 'maximized') {
      setWindowMode('normal');
    } else {
      setWindowMode('maximized');
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Close Button */}
      <motion.button
        onClick={closePlayground}
        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Close"
      />
      
      {/* Minimize Button */}
      <motion.button
        onClick={handleMinimize}
        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={state.windowState.mode === 'minimized' ? 'Restore' : 'Minimize'}
      />
      
      {/* Maximize Button */}
      <motion.button
        onClick={handleMaximize}
        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={state.windowState.mode === 'maximized' ? 'Restore' : 'Maximize'}
      />
    </div>
  );
}