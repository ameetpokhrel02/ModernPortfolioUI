import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { experience } from '@/data/experience'

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Experience
        </motion.h2>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block" />
          {experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="mb-8 flex md:items-center"
            >
              <div className="md:w-16 md:flex-shrink-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center md:ml-8">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Card className="ml-0 md:ml-8 flex-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {exp.role} @ {exp.company}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" /> {exp.period}
                    <MapPin className="h-4 w-4 ml-4" /> {exp.location}
                  </div>
                </CardHeader>
                <CardContent>{exp.description}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}