import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Hand, Github, Instagram, Linkedin } from 'lucide-react'
import { useTypewriter } from 'react-simple-typewriter'  // Fixed: Correct hook import
import { skills } from '@/data/skills'  // Assuming you have this data file
import { OrbitingSkills } from './OrbitingSkills'

export function Hero() {
  // Fixed: Proper hook usage - returns [text, helper] or just [text]
  const [text] = useTypewriter({
    words: ['Frontend Developer', 'IoT Developer', 'Creative Professional'],  // From your site
    loop: true,
    delay: 2000,
    typeSpeed: 70,  // Sera-style smooth typing
    deleteSpeed: 50,
  })

  return (
    <>
      {/* Native React 19 SEO */}
      <title>Amit Pokhrel - Frontend Developer | IoT Developer | Nepal</title>
      <meta name="description" content="Passionate developer from Kathmandu, Nepal, specializing in React, IoT, and creative web experiences." />
      <meta property="og:title" content="Amit Pokhrel - Frontend Developer" />
      <meta property="og:description" content="Building modern web experiences with React & Tailwind." />
      <meta property="og:image" content="/images/amit.jpg" />
      <link rel="canonical" href="https://www.pokhrelamit.com.np" />

      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="container grid md:grid-cols-2 gap-12 items-center max-w-6xl">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Amit Pokhrel
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {text}
                <span className="text-muted-foreground ml-2">|</span>  {/* Blinking cursor like Sera UI */}
              </span>
              <Hand className="inline-block ml-4 h-12 w-12 animate-wave" />
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              Hi, I'm Amit Pokhrel—a passionate developer based in Kathmandu, Nepal. I craft modern web experiences with React, IoT innovations, and creative flair. 🇳🇵
            </p>

            {/* Social Icons - Sera Style with Hover Rotate */}
            <div className="flex gap-4 justify-center md:justify-start pt-4">
              <motion.a href="https://github.com/amitpokhrel" target="_blank" rel="noopener noreferrer" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Badge variant="outline" className="p-3">
                  <Github className="h-5 w-5" />
                </Badge>
              </motion.a>
              <motion.a href="https://instagram.com/amitpokhrel" target="_blank" rel="noopener noreferrer" whileHover={{ rotate: 360 }}>
                <Badge variant="outline" className="p-3">
                  <Instagram className="h-5 w-5" />
                </Badge>
              </motion.a>
              <motion.a href="https://linkedin.com/in/amitpokhrel" target="_blank" rel="noopener noreferrer" whileHover={{ rotate: 360 }}>
                <Badge variant="outline" className="p-3">
                  <Linkedin className="h-5 w-5" />
                </Badge>
              </motion.a>
            </div>

            {/* Tech Stack - Staggered Animation like Sera Blocks */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center md:justify-start"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Badge variant="secondary" className="text-sm">
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <Avatar className="w-80 h-80 border-8 border-background shadow-2xl">
              <AvatarImage src="/images/amit.jpg" alt="Amit Pokhrel" />
              <AvatarFallback className="text-6xl">AP</AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </section>
    </>
  )
}