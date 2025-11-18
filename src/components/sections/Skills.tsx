import { motion } from 'framer-motion'
import { OrbitingSkills } from './OrbitingSkills'

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12"
        >
          Tech Stack
        </motion.h2>
        <OrbitingSkills className="w-[500px] h-[500px] md:w-[600px] md:h-[600px]" />  {/* Larger for section */}
        <p className="mt-8 text-muted-foreground max-w-2xl mx-auto">
          Proficient in modern frontend tools, IoT integrations, and creative animations.
        </p>
      </div>
    </section>
  )
}