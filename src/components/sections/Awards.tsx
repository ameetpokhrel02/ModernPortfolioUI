import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { awards } from '@/data/awards'

export function Awards() {
  return (
    <section id="awards" className="py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold text-center mb-12">
          Awards & Recognition
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((award, i) => (
            <motion.div key={award.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
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