import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'  // ← FIXED: Add this import!
import { motion } from 'framer-motion'
import { titleVariants, containerVariants, itemVariants } from '@/lib/animations'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '@/data/projects'  // Your project data

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-muted/20">
      <div className="container max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          Projects
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="overflow-hidden group cursor-pointer h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardHeader>
                <CardContent className="flex gap-2 pt-0">
                  {project.live && (
                    <motion.a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      whileHover={{ scale: 1.05 }} 
                      className="flex-1"
                    >
                      <Badge variant="outline">
                        <ExternalLink className="h-4 w-4 mr-1" /> Live
                      </Badge>
                    </motion.a>
                  )}
                  {project.github && (
                    <motion.a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge variant="secondary">
                        <Github className="h-4 w-4 mr-1" /> Code
                      </Badge>
                    </motion.a>
                  )}
                </CardContent>
                {/* Tech Badges - Fixed: Now uses imported Badge */}
                <CardContent className="pt-2 flex flex-wrap gap-2">
                  {project.tech?.map((t, j) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{ delay: i * 0.06 + j * 0.03 }}
                    >
                      <Badge variant="secondary" className="px-2 py-1 text-sm">
                        {t}
                      </Badge>
                    </motion.span>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}