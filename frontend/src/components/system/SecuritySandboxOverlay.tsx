import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/contexts/SystemContext';
import { CyberpunkTerminal } from '@/features/cyberpunk-os/terminal/CyberpunkTerminal';
import { PlaygroundProvider } from '@/features/cyberpunk-os/context/PlaygroundContext';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { useState, useEffect, useMemo } from 'react';

// Red-themed Security Grid Component
function SecurityGrid({ pulseOnMessage = false }: { pulseOnMessage?: boolean }) {
    const [gridPulse, setGridPulse] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const device = useDeviceDetection();

    // Generate red-themed data particles
    const dataParticles = useMemo(() =>
        Array.from({ length: device.isMobile ? 6 : 12 }, (_, i) => ({
            id: i,
            startX: Math.random() * 100,
            startY: Math.random() * 100,
            endX: Math.random() * 100,
            endY: Math.random() * 100,
            delay: i * 0.3,
            duration: device.isMobile ? 4 + Math.random() * 2 : 6 + Math.random() * 4
        })), [device.isMobile]
    );

    useEffect(() => {
        if (pulseOnMessage) {
            setGridPulse(prev => prev + 1);
        }
    }, [pulseOnMessage]);

    // Mouse/Touch tracking for interactive effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                setMousePosition({
                    x: (touch.clientX / window.innerWidth) * 100,
                    y: (touch.clientY / window.innerHeight) * 100
                });
            }
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);
        const handleTouchStart = () => setIsHovering(true);
        const handleTouchEnd = () => setIsHovering(false);

        if (device.isTouchDevice) {
            window.addEventListener('touchmove', handleTouchMove, { passive: true });
            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchend', handleTouchEnd);
        } else {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseenter', handleMouseEnter);
            window.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [device.isTouchDevice]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Interactive Red Glow */}
            {isHovering && (
                <motion.div
                    className={`absolute rounded-full pointer-events-none ${device.isMobile ? 'w-48 h-48' : 'w-96 h-96'
                        }`}
                    style={{
                        left: `${mousePosition.x}%`,
                        top: `${mousePosition.y}%`,
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
                        filter: device.isMobile ? 'blur(15px)' : 'blur(20px)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: device.isMobile ? [0.2, 0.4, 0.2] : [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            {/* Red Main Grid */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    opacity: [0.03, 0.08, 0.03],
                    scale: pulseOnMessage ? [1, 1.02, 1] : 1
                }}
                transition={{
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 0.6, ease: "easeOut" }
                }}
                key={gridPulse}
                style={{
                    backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              #ef4444 2px,
              #ef4444 3px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              #ef4444 2px,
              #ef4444 3px
            )
          `,
                    backgroundSize: device.isMobile ? '25px 25px' : '40px 40px',
                    transform: device.isMobile
                        ? 'perspective(800px) rotateX(45deg)'
                        : 'perspective(1000px) rotateX(60deg)',
                    transformOrigin: 'center bottom'
                }}
            />

            {/* Red Data Particles */}
            {dataParticles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={`absolute rounded-full ${device.isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'
                        } bg-red-400`}
                    animate={{
                        x: [`${particle.startX}%`, `${particle.endX}%`],
                        y: [`${particle.startY}%`, `${particle.endY}%`],
                        opacity: [0, 0.8, 0.4, 0],
                        scale: device.isMobile ? [0, 1, 0.6, 0] : [0, 1.2, 0.8, 0]
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut"
                    }}
                    style={{
                        boxShadow: `0 0 ${device.isMobile ? '4px' : '8px'} #f87171`
                    }}
                />
            ))}

            {/* Red Corner Accents */}
            {[
                { position: device.isMobile ? 'top-2 left-2' : 'top-4 left-4', borders: 'border-l-2 border-t-2' },
                { position: device.isMobile ? 'top-2 right-2' : 'top-4 right-4', borders: 'border-r-2 border-t-2' },
                { position: device.isMobile ? 'bottom-2 left-2' : 'bottom-4 left-4', borders: 'border-l-2 border-b-2' },
                { position: device.isMobile ? 'bottom-2 right-2' : 'bottom-4 right-4', borders: 'border-r-2 border-b-2' }
            ].map((corner, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${device.isMobile ? 'w-6 h-6' : 'w-8 h-8'} ${corner.borders} ${corner.position}`}
                    animate={{
                        borderColor: '#ef444450',
                        opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Red Scan Lines */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    backgroundPosition: ['0px 0px', '0px 100vh']
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #ef444410 2px,
            #ef444410 4px
          )`,
                    backgroundSize: '100% 4px'
                }}
            />
        </div>
    );
}

// Red-themed Terminal Window
function SecurityTerminalWindow({ children }: { children: React.ReactNode }) {
    const device = useDeviceDetection();

    return (
        <motion.div
            className={`relative bg-black/95 backdrop-blur-sm border border-red-500/30 rounded-lg shadow-2xl overflow-hidden ${device.isMobile ? 'w-full h-full' : 'w-full max-w-4xl h-full max-h-[80vh]'
                }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
            }}
        >
            {/* Security Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900/80 border-b border-red-500/20">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500/80 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500/60 rounded-full" />
                        <div className="w-3 h-3 bg-green-500/40 rounded-full" />
                    </div>
                    <span className="text-red-400 text-sm font-mono">
                        🛡️ SECURITY SANDBOX v1.0 - TERMINAL
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    <span className="text-red-400 text-xs font-mono">SECURITY ACTIVE</span>
                    <div className="text-red-400 text-xs">⚡⚡⚡</div>
                </div>
            </div>

            {/* Terminal Content with proper height and scrolling */}
            <div className="h-[calc(100%-48px)] overflow-hidden">
                <div className="w-full h-full security-terminal">
                    {children}
                </div>
            </div>

            {/* Red Glow Effects */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 pointer-events-none" />
            <div className="absolute inset-0 rounded-lg border border-red-400/20 pointer-events-none animate-pulse" />

            {/* Custom Red Scrollbar Styles */}
            <style>{`
                .security-terminal ::-webkit-scrollbar {
                    width: 8px;
                }
                .security-terminal ::-webkit-scrollbar-track {
                    background: rgba(17, 24, 39, 0.8);
                    border-radius: 4px;
                }
                .security-terminal ::-webkit-scrollbar-thumb {
                    background: rgba(239, 68, 68, 0.3);
                    border-radius: 4px;
                }
                .security-terminal ::-webkit-scrollbar-thumb:hover {
                    background: rgba(239, 68, 68, 0.5);
                }
                .security-terminal .scrollbar-thin {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(239, 68, 68, 0.3) rgba(17, 24, 39, 0.8);
                }
            `}</style>
        </motion.div>
    );
}

export function SecuritySandboxOverlay() {
    const { isSecuritySandboxActive, setSecuritySandboxActive } = useSystem();
    const [messagePulse, setMessagePulse] = useState(0);
    const device = useDeviceDetection();

    // Listen for message pulses
    useEffect(() => {
        const handleMessagePulse = () => {
            setMessagePulse(prev => prev + 1);
        };

        window.addEventListener('messagePulse' as any, handleMessagePulse);
        return () => window.removeEventListener('messagePulse' as any, handleMessagePulse);
    }, []);

    return (
        <AnimatePresence>
            {isSecuritySandboxActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-sm"
                >
                    {/* Red Security Grid Background */}
                    <SecurityGrid pulseOnMessage={messagePulse > 0} />

                    {/* Terminal Container */}
                    <div className="relative z-10 h-full flex items-center justify-center p-4">
                        <SecurityTerminalWindow>
                            <PlaygroundProvider>
                                <CyberpunkTerminal />
                            </PlaygroundProvider>
                        </SecurityTerminalWindow>
                    </div>

                    {/* Red Ambient Lighting Effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Top glow */}
                        <div
                            className={`absolute top-0 left-1/2 -translate-x-1/2 blur-3xl opacity-20 ${device.isMobile ? 'w-64 h-20' : 'w-96 h-32'
                                }`}
                            style={{
                                background: 'radial-gradient(ellipse, #ef4444 0%, transparent 70%)'
                            }}
                        />

                        {/* Bottom glow */}
                        <div
                            className={`absolute bottom-0 left-1/2 -translate-x-1/2 blur-3xl opacity-20 ${device.isMobile ? 'w-64 h-20' : 'w-96 h-32'
                                }`}
                            style={{
                                background: 'radial-gradient(ellipse, #ef4444 0%, transparent 70%)'
                            }}
                        />

                        {/* Mobile-specific side glows */}
                        {device.isMobile && (
                            <>
                                <div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-64 blur-3xl opacity-10"
                                    style={{
                                        background: 'radial-gradient(ellipse, #ef4444 0%, transparent 70%)'
                                    }}
                                />
                                <div
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-64 blur-3xl opacity-10"
                                    style={{
                                        background: 'radial-gradient(ellipse, #ef4444 0%, transparent 70%)'
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