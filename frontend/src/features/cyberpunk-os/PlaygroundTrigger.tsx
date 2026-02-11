import { motion } from 'framer-motion';
import { usePlayground } from './context/PlaygroundContext';

interface PlaygroundTriggerProps {
  className?: string;
  variant?: 'button' | 'icon' | 'text';
  children?: React.ReactNode;
}

export function PlaygroundTrigger({ 
  className = '', 
  variant = 'button',
  children 
}: PlaygroundTriggerProps) {
  const { openPlayground } = usePlayground();

  const baseClasses = "cursor-pointer select-none";
  
  const variantClasses = {
    button: "px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 text-cyan-400 font-mono text-sm",
    icon: "w-10 h-10 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center hover:bg-cyan-500/30 transition-all duration-300 text-cyan-400",
    text: "text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-mono underline decoration-cyan-500/50"
  };

  const defaultContent = {
    button: "🛡️ Launch Security Sandbox",
    icon: "🛡️",
    text: "Open Security Console"
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={openPlayground}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Launch Interactive Security Sandbox"
    >
      {children || defaultContent[variant]}
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}