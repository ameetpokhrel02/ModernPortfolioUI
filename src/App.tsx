import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Awards } from './components/sections/Awards'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'
import { Skills } from './components/sections/Skills'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Awards />
      <Contact />
      <Footer />
    </div>
  )
}

export default App