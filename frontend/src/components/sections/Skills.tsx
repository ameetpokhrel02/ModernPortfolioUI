import OrbitingSkills from './OrbitingSkills';
import { motion } from 'framer-motion';
import { titleVariants } from '@/lib/animations'

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-12"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >Tech Stack</motion.h2>
        <OrbitingSkills />
        <p className="mt-8 text-muted-foreground max-w-2xl mx-auto">
          Full-stack developer with expertise in modern web technologies, cloud infrastructure (AWS), and AI/ML frameworks. Specialized in IoT integrations and scalable solutions.
        </p>
      </div>
    </section>
  );
}