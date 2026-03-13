import { useState, useRef, useEffect } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, Terminal, Shield, Sun, Moon, Monitor } from 'lucide-react'
import { useSystem } from '@/contexts/SystemContext'
import { useTheme } from '@/contexts/ThemeContext'
import { AnimatePresence, motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Icon Components
const HomeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const UserIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const SkillsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v4" />
    <path d="m6.8 15-3.5 2" />
    <path d="m20.7 17-3.5-2" />
    <path d="M6.8 9 3.3 7" />
    <path d="m20.7 7-3.5 2" />
    <circle cx="12" cy="12" r="6" />
  </svg>
)

const EducationIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
)

const ExperienceIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const ProjectsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    <line x1="12" x2="12" y1="11" y2="17" />
    <line x1="9" x2="15" y1="14" y2="14" />
  </svg>
)

const AwardsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

const ContactIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

// Tab Types
interface Tab {
  title: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  type?: never
}

interface Separator {
  type: "separator"
  title?: never
  icon?: never
  href?: never
}

type TabItem = Tab | Separator

// Animation Variants
const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: {
    width: "auto",
    opacity: 1,
    transition: { delay: 0.05, duration: 0.2, ease: "easeOut" as const },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: { duration: 0.1, ease: "easeIn" as const },
  },
}

// Navigation Tabs
const NAV_TABS: TabItem[] = [
  { title: "Home", icon: HomeIcon, href: "#" },
  { title: "About", icon: UserIcon, href: "#about" },
  { title: "Skills", icon: SkillsIcon, href: "#skills" },
  { title: "Education", icon: EducationIcon, href: "#education" },
  { type: "separator" },
  { title: "Experience", icon: ExperienceIcon, href: "#experience" },
  { title: "Projects", icon: ProjectsIcon, href: "#projects" },
  { title: "Awards", icon: AwardsIcon, href: "#awards" },
  { type: "separator" },
  { title: "Contact", icon: ContactIcon, href: "#contact" },
]

interface ExpandedTabsProps {
  tabs: TabItem[]
  className?: string
}

function ExpandedTabs({ tabs, className }: ExpandedTabsProps) {
  const [selected, setSelected] = useState<number | null>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelected(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (index: number, href: string) => {
    setSelected(index)
    // Smooth scroll to section
    if (href !== "#") {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const SeparatorComponent = () => (
    <div className="h-7 w-px bg-slate-300" aria-hidden="true" />
  )

  return (
    <div
      ref={containerRef}
      className={`flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1 shadow-md backdrop-blur-sm ${className || ""}`}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <SeparatorComponent key={`separator-${index}`} />
        }

        const Icon = tab.icon
        const isSelected = selected === index

        return (
          <button
            key={tab.title}
            onClick={() => handleSelect(index, tab.href)}
            className={`relative z-10 flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors focus:outline-none 
              ${isSelected
                ? "text-green-700"
                : "text-slate-600 hover:text-slate-900"
              }
            `}
          >
            {isSelected && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 z-0 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/40 shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              <Icon className="h-4 w-4 flex-shrink-0" />
              <AnimatePresence initial={false}>
                {isSelected && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="overflow-hidden whitespace-nowrap text-xs"
                  >
                    {tab.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function Navbar() {
  const { isSystemMode, toggleSystemMode, isSecuritySandboxActive, toggleSecuritySandbox } = useSystem()
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <a href="/" className="text-2xl font-bold tracking-tighter">
          Amit<span className="text-primary">.</span>
        </a>

        {/* Desktop - Animated Tabs */}
        <nav className="hidden lg:flex items-center gap-4">
          <ExpandedTabs tabs={NAV_TABS} />
          
          {/* System Mode Toggle */}
          <Button
            onClick={toggleSystemMode}
            variant={isSystemMode ? "default" : "outline"}
            size="sm"
            className={`font-mono text-xs rounded-full ${
              isSystemMode 
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                : 'border-cyan-500/50 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700'
            }`}
          >
            <Terminal className="w-4 h-4 mr-2" />
            {isSystemMode ? 'EXIT PLAYGROUND' : 'PLAYGROUND'}
          </Button>

          {/* Security Sandbox Toggle */}
          <Button
            onClick={toggleSecuritySandbox}
            variant={isSecuritySandboxActive ? "default" : "outline"}
            size="sm"
            className={`font-mono text-xs rounded-full ${
              isSecuritySandboxActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'border-red-500/50 text-red-600 hover:bg-red-50 hover:text-red-700'
            }`}
          >
            <Shield className="w-4 h-4 mr-2" />
            {isSecuritySandboxActive ? 'EXIT SECURITY' : 'SECURITY SANDBOX'}
          </Button>

          {/* Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile System Toggle */}
          <Button
            onClick={toggleSystemMode}
            variant={isSystemMode ? "default" : "outline"}
            size="sm"
            className={`font-mono text-xs ${
              isSystemMode 
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                : 'border-cyan-500/50 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700'
            }`}
          >
            <Terminal className="w-4 h-4" />
          </Button>

          {/* Mobile Security Toggle */}
          <Button
            onClick={toggleSecuritySandbox}
            variant={isSecuritySandboxActive ? "default" : "outline"}
            size="sm"
            className={`font-mono text-xs ${
              isSecuritySandboxActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'border-red-500/50 text-red-600 hover:bg-red-50 hover:text-red-700'
            }`}
          >
            <Shield className="w-4 h-4" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="mt-10 flex flex-col gap-8">
                {NAV_TABS.filter((tab): tab is Tab => tab.type !== "separator").map((tab) => {
                  const Icon = tab.icon
                  return (
                    <a
                      key={tab.title}
                      href={tab.href}
                      className="flex items-center gap-3 text-2xl font-semibold hover:text-primary transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      {tab.title}
                    </a>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}