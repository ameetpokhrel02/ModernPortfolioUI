import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Awards } from './components/sections/Awards'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'
import { Skills } from './components/sections/Skills'
import Chatbot from './components/sections/Chatbot'
import { SystemProvider } from './contexts/SystemContext'
import { SystemOverlay } from './components/system/SystemOverlay'
import { ResponsiveLayout } from './components/layout/ResponsiveLayout'
import { SecuritySandboxOverlay } from './components/system/SecuritySandboxOverlay'

function App() {
  return (
    <SystemProvider>
      <ResponsiveLayout>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Education />
          <Experience />
          <Projects />
          <Awards />
          <Contact />
          <Footer />
          <Chatbot />
          <SystemOverlay />
          <SecuritySandboxOverlay />
        </div>
      </ResponsiveLayout>
    </SystemProvider>
  )
}

export default App