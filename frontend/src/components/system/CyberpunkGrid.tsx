import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

interface CyberpunkGridProps {
  isAiActive?: boolean;
  pulseOnMessage?: boolean;
}

export function CyberpunkGrid({ isAiActive = false, pulseOnMessage = false }: CyberpunkGridProps) {
  const [gridPulse, setGridPulse] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const device = useDeviceDetection();

  // Generate responsive data particles
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
      {/* Responsive Interactive Glow */}
      {isHovering && (
        <motion.div
          className={`absolute rounded-full pointer-events-none ${
            device.isMobile ? 'w-48 h-48' : 'w-96 h-96'
          }`}
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${
              isAiActive ? 'rgba(0, 255, 65, 0.1)' : 'rgba(0, 188, 212, 0.1)'
            } 0%, transparent 70%)`,
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

      {/* Responsive Main Grid */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: isAiActive ? [0.04, 0.12, 0.04] : [0.03, 0.08, 0.03],
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
              ${isAiActive ? '#00ff41' : '#00bcd4'} 2px,
              ${isAiActive ? '#00ff41' : '#00bcd4'} 3px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              ${isAiActive ? '#00ff41' : '#00bcd4'} 2px,
              ${isAiActive ? '#00ff41' : '#00bcd4'} 3px
            )
          `,
          backgroundSize: device.isMobile ? '25px 25px' : '40px 40px',
          transform: device.isMobile 
            ? 'perspective(800px) rotateX(45deg)' 
            : 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'center bottom'
        }}
      />

      {/* Responsive Diagonal Grid Lines */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0px 0px', device.isMobile ? '50px 50px' : '80px 80px'],
          opacity: [0.02, 0.06, 0.02]
        }}
        transition={{
          backgroundPosition: { 
            duration: device.isMobile ? 15 : 25, 
            repeat: Infinity, 
            ease: "linear" 
          },
          opacity: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent ${device.isMobile ? '15px' : '20px'},
              ${isAiActive ? '#00ff4125' : '#00bcd425'} ${device.isMobile ? '15px' : '20px'},
              ${isAiActive ? '#00ff4125' : '#00bcd425'} ${device.isMobile ? '16px' : '21px'}
            )
          `,
          backgroundSize: device.isMobile ? '50px 50px' : '80px 80px'
        }}
      />

      {/* Responsive Data Particles */}
      {dataParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            device.isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'
          } ${isAiActive ? 'bg-green-400' : 'bg-cyan-400'}`}
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
            boxShadow: `0 0 ${device.isMobile ? '4px' : '8px'} ${isAiActive ? '#4ade80' : '#22d3ee'}`
          }}
        />
      ))}

      {/* Responsive Corner Accents */}
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
            borderColor: isAiActive ? '#00ff4150' : '#00bcd450',
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

      {/* Enhanced Scan Lines */}
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
            ${isAiActive ? '#00ff4110' : '#00bcd410'} 2px,
            ${isAiActive ? '#00ff4110' : '#00bcd410'} 4px
          )`,
          backgroundSize: '100% 4px'
        }}
      />

      {/* Pulse Wave Effect */}
      {pulseOnMessage && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0.8, 1.1, 1]
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: `radial-gradient(
              ellipse at center,
              ${isAiActive ? 'rgba(0, 255, 65, 0.1)' : 'rgba(0, 188, 212, 0.1)'} 0%,
              transparent 70%
            )`
          }}
        />
      )}
    </div>
  );
}