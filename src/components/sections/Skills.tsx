import OrbitingSkills from './OrbitingSkills';
import { motion } from 'framer-motion';

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl mx-auto text-center">
        <motion.h2 className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >Tech Stack</motion.h2>
        <OrbitingSkills />
        <p className="mt-8 text-muted-foreground max-w-2xl mx-auto">
          Proficient in modern frontend tools, IoT integrations, and creative animations.
        </p>
      </div>
    </section>
  );
}