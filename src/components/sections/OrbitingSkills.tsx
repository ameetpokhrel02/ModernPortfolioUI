// src/components/sections/OrbitingSkills.tsx
import { motion } from 'framer-motion'
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiFramer,
  SiArduino,
  SiJavascript,
  SiPython
} from 'react-icons/si'

const techStack = [
  { Icon: SiReact, name: 'React', color: '#61DAFB' },
  { Icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { Icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
  { Icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  { Icon: SiFramer, name: 'Framer Motion', color: '#0055FF' },
  { Icon: SiArduino, name: 'Arduino', color: '#00979D' },
  { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
  {Icon: SiPython, name: 'Python', color: '#3776AB' }
  

]

export function OrbitingSkills() {
  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
      {/* Orbiting Container */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {techStack.map((tech, i) => {
          const angle = (i * 360) / techStack.length
          const radius = 120  // Adjust orbit size

          return (
            <motion.div
              key={tech.name}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.4, zIndex: 50 }}
            >
              <div
                className="p-3 bg-background/90 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50"
                style={{ color: tech.color }}
              >
                <tech.Icon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <span className="sr-only">{tech.name}</span>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Center Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30" />
      </div>
    </div>
  )
}