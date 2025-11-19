import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { titleVariants, itemVariants } from '@/lib/animations'
import { Award } from 'lucide-react'
import { awards } from '@/data/awards'

export function Awards() {
  return (
    <section id="awards" className="py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Awards & Recognition
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card>
                <CardHeader className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-primary" />
                  <CardTitle>{award.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{award.description} ({award.year})</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}