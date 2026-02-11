import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, Terminal, Shield } from 'lucide-react'
import { useSystem } from '@/contexts/SystemContext'

const navItems = ['About', 'Skills', 'Education', 'Experience', 'Projects', 'Awards', 'Contact']

export function Navbar() {
  const { isSystemMode, toggleSystemMode, isSecuritySandboxActive, toggleSecuritySandbox } = useSystem();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <a href="/" className="text-2xl font-bold tracking-tighter">
          Amit<span className="text-primary">.</span>
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
          
          {/* System Mode Toggle */}
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
            <Terminal className="w-4 h-4 mr-2" />
            {isSystemMode ? 'EXIT PLAYGROUND' : 'PLAYGROUND'}
          </Button>

          {/* Security Sandbox Toggle */}
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
            <Shield className="w-4 h-4 mr-2" />
            {isSecuritySandboxActive ? 'EXIT SECURITY' : 'SECURITY SANDBOX'}
          </Button>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
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
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="mt-10 flex flex-col gap-8">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-2xl font-semibold hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}