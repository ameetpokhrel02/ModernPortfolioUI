import { motion } from 'framer-motion';

interface AnimatedGridProps {
    isActive: boolean;
    intensity: number;
    isFirewallActive?: boolean;
}

export function AnimatedGrid({ isActive, intensity, isFirewallActive = false }: AnimatedGridProps) {
    const gridSize = 20;
    const rows = Math.ceil(window.innerHeight / gridSize);
    const cols = Math.ceil(window.innerWidth / gridSize);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Horizontal Lines */}
            {Array.from({ length: rows }).map((_, i) => (
                <motion.div
                    key={`h-${i}`}
                    className="absolute w-full h-px bg-cyan-500/10"
                    style={{ top: i * gridSize }}
                    animate={{
                        opacity: isActive ? intensity * 0.3 : 0.1,
                        boxShadow: isActive
                            ? `0 0 ${intensity * 10}px rgba(6, 182, 212, ${intensity * 0.5})`
                            : 'none',
                    }}
                    transition={{ duration: 0.4 }}
                />
            ))}

            {/* Vertical Lines */}
            {Array.from({ length: cols }).map((_, i) => (
                <motion.div
                    key={`v-${i}`}
                    className="absolute h-full w-px bg-cyan-500/10"
                    style={{ left: i * gridSize }}
                    animate={{
                        opacity: isActive ? intensity * 0.3 : 0.1,
                        boxShadow: isActive
                            ? `0 0 ${intensity * 10}px rgba(6, 182, 212, ${intensity * 0.5})`
                            : 'none',
                    }}
                    transition={{ duration: 0.4 }}
                />
            ))}

            {/* Pulse Effect */}
            {isActive && (
                <motion.div
                    className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-cyan-500/5 to-transparent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: [0, intensity, 0],
                        scale: [0.8, 1.2, 1.5],
                    }}
                    transition={{ duration: 0.4 }}
                />
            )}

            {/* Corner Accents */}
            <div className={`absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 ${isFirewallActive ? 'border-red-500/50' : 'border-cyan-500/30'}`} />
            <div className={`absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 ${isFirewallActive ? 'border-red-500/50' : 'border-cyan-500/30'}`} />
            <div className={`absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 ${isFirewallActive ? 'border-red-500/50' : 'border-cyan-500/30'}`} />
            <div className={`absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 ${isFirewallActive ? 'border-red-500/50' : 'border-cyan-500/30'}`} />

            {/* Firewall Active Effect */}
            {isFirewallActive && (
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        boxShadow: [
                            'inset 0 0 0 1px rgba(239, 68, 68, 0.2)',
                            'inset 0 0 0 2px rgba(239, 68, 68, 0.4)',
                            'inset 0 0 0 1px rgba(239, 68, 68, 0.2)'
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.05) 0%, transparent 70%)'
                    }}
                />
            )}
        </div>
    );
}