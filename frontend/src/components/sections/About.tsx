import { motion } from 'framer-motion'
import { titleVariants } from '@/lib/animations'

export function About() {
	return (
		<section id="about" className="py-24 px-6">
			<div className="container max-w-3xl mx-auto">
								<motion.h2
									className="text-4xl font-bold mb-6"
									variants={titleVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: false, amount: 0.2 }}
								>About Me</motion.h2>
				<p className="text-lg text-muted-foreground leading-relaxed">
					I'm Amit — a frontend-focused developer building interactive, accessible
					experiences with React, TypeScript and modern tooling. I enjoy crafting
					animations, working with IoT integrations, and turning ideas into
					polished interfaces.
				</p>
				<p className="mt-4 text-muted-foreground">
					I build with a focus on performance, design systems, and developer
					experience. I also enjoy experimenting with creative animations and
					micro-interactions.
				</p>
			</div>
		</section>
	)
}

export default About
