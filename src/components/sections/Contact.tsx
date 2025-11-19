import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
import { titleVariants, itemVariants } from '@/lib/animations'
import { Send, Mail } from 'lucide-react'

export function Contact() {
  return (
    <>
      <section id="newsletter" className="py-24 px-6 bg-primary/5 border-0 shadow-none">
        <div className="container max-w-md mx-auto text-center border-0">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <h2 className="text-3xl font-bold mb-4">Newsletter</h2>
            <p className="text-muted-foreground mb-6">Get updates on my latest projects and IoT experiments.</p>
            <div className="flex gap-2">
              <Input placeholder="your@email.com" className="flex-1" />
              <Button><Mail className="h-4 w-4 mr-2" />Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6">
        <div className="container max-w-2xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            Get In Touch
          </motion.h2>
          <form className="space-y-4">
            <Input placeholder="Your Name" />
            <Input placeholder="your@email.com" />
            <Textarea placeholder="Your Message" rows={5} />
            <Button type="submit" className="w-full"><Send className="h-4 w-4 mr-2" />Send Message</Button>
          </form>
        </div>
      </section>
    </>
  )
}