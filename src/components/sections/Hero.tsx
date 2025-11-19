
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Hand, Github, Instagram, Linkedin } from 'lucide-react';
import { useTypewriter } from 'react-simple-typewriter';
import CoderProfileCard from './CoderProfileCard';
import { Button } from '@/components/ui/button'

export function Hero() {
  const [text] = useTypewriter({
    words: ['Frontend Developer', 'IoT Developer', 'Creative Professional'],
    loop: true,
    delaySpeed: 2000,
    typeSpeed: 70,
    deleteSpeed: 50,
  });

  // Your real skills (you can move this to data/skills.ts later)
  const skills = [
    { name: 'React' },
    { name: 'TypeScript' },
    { name: 'Tailwind CSS' },
    { name: 'Node.js' },
    { name: 'Next.js' },
    { name: 'Python' },
    { name: 'Docker' },
    { name: 'Framer Motion' },
  ];

  return (
    <>
      {/* SEO */}
      <title>Amit Pokhrel - Frontend & IoT Developer | Nepal</title>
      <meta name="description" content="Passionate developer from Kathmandu, Nepal. Building modern web & IoT experiences with React, TypeScript, and creative animations." />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
        {/* NOTE: removed rotating OrbitingSkills background in Hero per request */}

        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-8 text-center md:text-left"
          >
            {/* Greeting + Name */}
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                Hey there
                <Hand className="inline-block ml-3 h-12 w-12 text-blue-600 animate-wave" />
                <br />
                I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Amit Pokhrel
                </span>
              </h1>

              {/* Typewriter Role */}
              <div className="h-20 flex items-center justify-center md:justify-start mt-4">
                <p className="text-2xl md:text-4xl font-medium text-foreground/90">
                  {text}
                  <span className="text-purple-600 animate-pulse">|</span>
                </p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              A passionate developer from <strong>Kathmandu, Nepal</strong> building beautiful, fast, and creative web & IoT experiences with modern tools.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start">
              {[
                { Icon: Github, href: 'https://github.com/ameetpokhrel02', label: 'GitHub' },
                { Icon: Instagram, href: 'https://www.instagram.com/ameet_pokrel/', label: 'Instagram' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/ameet-pokhrel-82533433b/', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-secondary/50 backdrop-blur-sm border border-border hover:bg-secondary transition-all"
                >
                  <Icon className="w-6 h-6 text-black dark:text-white" />
                </motion.a>
              ))}
            </div>

            {/* Tech Pills */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center md:justify-start"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Badge variant="secondary" className="text-sm font-medium">
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact CTA (white style) */}
            <div className="mt-6 flex justify-center md:justify-start">
              <Button asChild size="lg" className="bg-white text-black dark:bg-white/10 dark:text-white">
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </motion.div>

          {/* Your Photo + Code Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex justify-center relative group"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition duration-1000" />
                  <Avatar className="w-64 h-64 md:w-80 md:h-80 border-8 border-background shadow-2xl ring-8 ring-blue-500/20 relative">
                    <AvatarImage
                      src="/mee.jpg"
                      alt="Amit Pokhrel"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-6xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      AP
                    </AvatarFallback>

                    <span className="absolute bottom-4 right-4 w-6 h-6 bg-green-400 rounded-full border-4 border-background shadow-lg animate-pulse ring-4 ring-green-400/30" />
                  </Avatar>
                </div>

                <div className="w-full md:w-auto">
                  <CoderProfileCard />
                </div>
              </div>
            </motion.div>
        </div>

        {/* Scroll Down Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-8 h-14 border-2 border-foreground/30 rounded-full flex justify-center">
              <div className="w-1 h-4 bg-foreground/40 rounded-full mt-3" />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}