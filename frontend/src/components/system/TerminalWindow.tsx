import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

interface TerminalWindowProps {
    children: ReactNode;
    isAiMode?: boolean;
}

export function TerminalWindow({ children, isAiMode = false }: TerminalWindowProps) {
    const device = useDeviceDetection();
    
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`w-full relative overflow-hidden ${
                device.isMobile 
                    ? 'h-full rounded-none' 
                    : device.isTablet 
                    ? 'max-w-5xl h-[85vh] rounded-lg'
                    : 'max-w-4xl h-[80vh] rounded-lg'
            }`}
            style={{
                background: `
          linear-gradient(135deg, 
            rgba(0, 0, 0, 0.95) 0%, 
            rgba(0, 20, 40, 0.95) 50%, 
            rgba(0, 0, 0, 0.95) 100%
          )
        `,
                border: device.isMobile 
                    ? 'none' 
                    : `2px solid ${isAiMode ? '#00ff41' : '#00bcd4'}`,
                boxShadow: device.isMobile 
                    ? 'none'
                    : `
          0 0 50px ${isAiMode ? 'rgba(0, 255, 65, 0.3)' : 'rgba(0, 188, 212, 0.3)'},
          inset 0 0 50px rgba(0, 0, 0, 0.5)
        `
            }}
        >
            {/* Responsive Terminal Header */}
            {!device.isMobile && (
                <div
                    className={`border-b flex items-center justify-between relative ${
                        device.isTablet ? 'px-3 py-2' : 'px-4 py-3'
                    }`}
                    style={{
                        background: `linear-gradient(90deg, 
                rgba(0, 0, 0, 0.8) 0%, 
                rgba(0, 40, 80, 0.4) 50%, 
                rgba(0, 0, 0, 0.8) 100%
              )`,
                        borderBottom: `1px solid ${isAiMode ? '#00ff4150' : '#00bcd450'}`
                    }}
                >
                    {/* Enhanced Traffic Light Buttons */}
                    <div className="flex items-center gap-2">
                        <motion.div
                            className={`rounded-full bg-red-500 cursor-pointer relative overflow-hidden ${
                                device.isTablet ? 'w-2.5 h-2.5' : 'w-3 h-3'
                            }`}
                            whileHover={{ 
                              scale: 1.3, 
                              boxShadow: '0 0 15px #ef4444',
                              backgroundColor: '#dc2626'
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <motion.div
                              className="absolute inset-0 bg-white/20 rounded-full"
                              initial={{ scale: 0, opacity: 0 }}
                              whileHover={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                        </motion.div>
                        <motion.div
                            className={`rounded-full bg-yellow-500 cursor-pointer relative overflow-hidden ${
                                device.isTablet ? 'w-2.5 h-2.5' : 'w-3 h-3'
                            }`}
                            whileHover={{ 
                              scale: 1.3, 
                              boxShadow: '0 0 15px #eab308',
                              backgroundColor: '#ca8a04'
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <motion.div
                              className="absolute inset-0 bg-white/20 rounded-full"
                              initial={{ scale: 0, opacity: 0 }}
                              whileHover={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                        </motion.div>
                        <motion.div
                            className={`rounded-full bg-green-500 cursor-pointer relative overflow-hidden ${
                                device.isTablet ? 'w-2.5 h-2.5' : 'w-3 h-3'
                            }`}
                            whileHover={{ 
                              scale: 1.3, 
                              boxShadow: '0 0 15px #22c55e',
                              backgroundColor: '#16a34a'
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <motion.div
                              className="absolute inset-0 bg-white/20 rounded-full"
                              initial={{ scale: 0, opacity: 0 }}
                              whileHover={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                        </motion.div>
                    </div>

                    {/* Enhanced Terminal Title */}
                    <motion.div
                        className={`font-mono flex items-center gap-2 cursor-move ${
                            device.isTablet ? 'text-xs' : 'text-sm'
                        }`}
                        animate={{
                            color: isAiMode ? '#00ff41' : '#00bcd4',
                            textShadow: isAiMode
                                ? '0 0 10px #00ff41'
                                : '0 0 10px #00bcd4'
                        }}
                        whileHover={{
                            scale: 1.02,
                            textShadow: isAiMode
                                ? '0 0 15px #00ff41, 0 0 25px #00ff41'
                                : '0 0 15px #00bcd4, 0 0 25px #00bcd4'
                        }}
                    >
                        <motion.span 
                          className="animate-pulse"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          ●
                        </motion.span>
                        {device.isTablet ? 'CYBERPUNK OS' : 'CYBERPUNK OS v3.0'} - {isAiMode ? 'AI MODE' : 'TERMINAL'}
                        <motion.span 
                          className="animate-pulse"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                          }}
                        >
                          ●
                        </motion.span>
                    </motion.div>

                    {/* Enhanced Connection Status */}
                    <div className={`flex items-center gap-2 font-mono ${
                        device.isTablet ? 'text-xs' : 'text-xs'
                    }`}>
                        <motion.div
                            className={`rounded-full relative ${
                                device.isTablet ? 'w-1.5 h-1.5' : 'w-2 h-2'
                            } ${isAiMode ? 'bg-green-400' : 'bg-cyan-400'}`}
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.4, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            {/* Ripple Effect */}
                            <motion.div
                              className={`absolute inset-0 rounded-full ${
                                isAiMode ? 'bg-green-400' : 'bg-cyan-400'
                              }`}
                              animate={{
                                scale: [1, 2.5, 1],
                                opacity: [0.6, 0, 0.6]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                            />
                        </motion.div>
                        <motion.span 
                          className={isAiMode ? 'text-green-400' : 'text-cyan-400'}
                          animate={{
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                            {isAiMode ? 'AI ONLINE' : 'SYSTEM READY'}
                        </motion.span>
                        
                        {/* Data Transfer Indicator */}
                        <motion.div
                          className="flex gap-1 ml-2"
                          animate={{
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className={`${device.isTablet ? 'w-0.5 h-2' : 'w-1 h-3'} ${
                                isAiMode ? 'bg-green-400' : 'bg-cyan-400'
                              }`}
                              animate={{
                                scaleY: [0.3, 1, 0.3]
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </motion.div>
                    </div>
                </div>
            )}

            {/* Terminal Content */}
            <div className="relative h-full">
                {children}

                {/* Subtle Glow Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(
              ellipse at center,
              ${isAiMode ? 'rgba(0, 255, 65, 0.02)' : 'rgba(0, 188, 212, 0.02)'} 0%,
              transparent 70%
            )`
                    }}
                />
            </div>
        </motion.div>
    );
}