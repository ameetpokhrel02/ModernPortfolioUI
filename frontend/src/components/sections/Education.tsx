import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { titleVariants, containerVariants, itemVariants } from '@/lib/animations'
import { GraduationCap, ExternalLink, Calendar, MapPin } from 'lucide-react'

const educationData = [
  {
    degree: "Bachelor's Degree",
    field: "Computer Science & Engineering",
    institution: "London Metropolitan University (UK Affiliated)",
    college: "Itahari International College",
    location: "Itahari, Nepal",
    period: "2021 - 2025",
    status: "Latest",
    website: "https://iic.edu.np/",
    description: "UK affiliated bachelor's program focusing on modern software development, computer science fundamentals, and engineering principles.",
    highlights: [
      "Software Engineering & Development",
      "Data Structures & Algorithms", 
      "Web Technologies & Frameworks",
      "Database Management Systems",
      "Project Management"
    ]
  },
  {
    degree: "Plus Two (+2)",
    field: "Science", 
    institution: "Kathmandu Model College (KMC)",
    location: "Kathmandu, Nepal",
    period: "2019 - 2021",
    description: "Higher secondary education with focus on science subjects, building foundation for computer science studies.",
    highlights: [
      "Mathematics & Physics",
      "Computer Science Basics",
      "Scientific Research Methods", 
      "Analytical Thinking",
      "Problem Solving"
    ]
  }
]

export function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
        >
          Education
        </motion.h2>
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block" />
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.institution}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: i * 0.06 }}
              className="mb-8 flex md:items-center"
            >
              <div className="md:w-16 md:flex-shrink-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center md:ml-8">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Card className="ml-0 md:ml-8 flex-1 relative">
                {/* Status Badge */}
                {edu.status && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      {edu.status}
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {edu.degree} - {edu.field}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {edu.institution}
                    </p>
                    {edu.college && (
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                          {edu.college}
                        </p>
                        {edu.website && (
                          <a
                            href={edu.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                          >
                            Visit College
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" /> {edu.period}
                    <MapPin className="h-4 w-4 ml-4" /> {edu.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{edu.description}</p>
                  {/* Highlights */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Key Areas of Study</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}