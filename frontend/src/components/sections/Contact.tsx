import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
import { titleVariants, itemVariants } from '@/lib/animations'
import { Send, Mail, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { contactAPI, newsletterAPI, type ContactFormData } from '@/lib/api'

export function Contact() {
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterLoading, setNewsletterLoading] = useState(false)
  const [newsletterMessage, setNewsletterMessage] = useState('')

  // Contact form state
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  })
  const [contactLoading, setContactLoading] = useState(false)
  const [contactMessage, setContactMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return

    setNewsletterLoading(true)
    setNewsletterMessage('')

    try {
      const response = await newsletterAPI.subscribe({ email: newsletterEmail })
      setNewsletterMessage(response.message || 'Subscribed successfully!')
      setNewsletterEmail('')
    } catch (error) {
      setNewsletterMessage(error instanceof Error ? error.message : 'Failed to subscribe')
    } finally {
      setNewsletterLoading(false)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setContactMessage('Please fill in all fields')
      return
    }

    setContactLoading(true)
    setContactMessage('')

    try {
      const response = await contactAPI.submitContact(contactForm)
      setContactMessage(response.message || 'Message sent successfully!')
      setContactForm({ name: '', email: '', message: '' })
    } catch (error) {
      setContactMessage(error instanceof Error ? error.message : 'Failed to send message')
    } finally {
      setContactLoading(false)
    }
  }

  return (
    <>
      <section id="newsletter" className="py-24 px-6 bg-primary/5 border-0 shadow-none">
        <div className="container max-w-md mx-auto text-center border-0">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
          >
            <h2 className="text-3xl font-bold mb-4">Newsletter</h2>
            <p className="text-muted-foreground mb-6">Get updates on my latest projects and IoT experiments.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input 
                placeholder="your@email.com" 
                className="flex-1"
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={newsletterLoading}
              />
              <Button type="submit" disabled={newsletterLoading}>
                {newsletterLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4 mr-2" />
                )}
                Subscribe
              </Button>
            </form>
            {newsletterMessage && (
              <p className={`mt-2 text-sm ${newsletterMessage.includes('success') || newsletterMessage.includes('subscribed') ? 'text-green-600' : 'text-red-600'}`}>
                {newsletterMessage}
              </p>
            )}
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
            viewport={{ once: false, amount: 0.25 }}
          >
            Get In Touch
          </motion.h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <Input 
              placeholder="Your Name"
              value={contactForm.name}
              onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
              disabled={contactLoading}
            />
            <Input 
              placeholder="your@email.com"
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
              disabled={contactLoading}
            />
            <Textarea 
              placeholder="Your Message" 
              rows={5}
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
              disabled={contactLoading}
            />
            <Button type="submit" className="w-full" disabled={contactLoading}>
              {contactLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Send Message
            </Button>
            {contactMessage && (
              <p className={`text-sm text-center ${contactMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {contactMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  )
}