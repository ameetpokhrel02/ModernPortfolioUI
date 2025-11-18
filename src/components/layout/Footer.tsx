import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ameetpokhrel02', label: 'GitHub' },
    { icon: Instagram, href: '', label: 'https://www.instagram.com/ameet_pokhrel/' },
    { icon: Linkedin, href: 'https://www.instagram.com/ameet_pokhrel/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@pokhrelamit.com.np', label: 'Email' },
  ]

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <Separator className="mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p>
              © {currentYear}{' '}
              <span className="font-semibold text-foreground">Amit Pokhrel</span>. All rights
              reserved.
            </p>
            <p className="mt-1">Handcrafted with React, TypeScript, Tailwind & shadcn/ui</p>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -4, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Optional: Made in Nepal */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          Made with love from Tehrathum, Nepal 🇳🇵
        </div>
      </div>
    </footer>
  )
}