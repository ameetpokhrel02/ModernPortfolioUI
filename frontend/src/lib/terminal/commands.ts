import type { Command } from './types';
import { architectureAnimation, deploymentAnimation } from './animations';

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Display available commands',
    execute: () => ({
      type: 'OUTPUT',
      payload: `┌─ CYBERPUNK TERMINAL HELP ──────────────┐
│                                        │
│ 📋 BASIC COMMANDS                      │
│   help        - Display this help      │
│   whoami      - User information        │
│   stack       - Technology stack       │
│   experience  - Work experience        │
│   projects    - Project portfolio      │
│   education   - Educational background │
│   iot         - IoT expertise          │
│   contact     - Contact information    │
│   clear       - Clear terminal         │
│   exit        - Exit system mode       │
│                                        │
│ 🤖 AI ASSISTANT                        │
│   connect ai  - Connect to AI chat     │
│   ai          - Quick AI connect       │
│   disconnect ai - Exit AI mode         │
│                                        │
│ 🏗️  ADVANCED                           │
│   architecture - System topology       │
│   deploy      - Deployment info        │
│                                        │
│ ⌨️  SHORTCUTS                          │
│   TAB         - Command completion     │
│   ↑/↓         - Command history        │
│   Ctrl+C      - Cancel current input   │
│                                        │
└────────────────────────────────────────┘

💡 Pro tip: Type "ai" for quick AI assistant access!`
    })
  },

  whoami: {
    name: 'whoami',
    description: 'Display user information',
    execute: () => ({
      type: 'OUTPUT',
      payload: `┌─────────────────────────────────────┐
│           USER PROFILE              │
├─────────────────────────────────────┤
│ Name:     Amit Pokhrel              │
│ Role:     Frontend & IoT Developer  │
│ Location: Kathmandu, Nepal 🇳🇵       │
│ Status:   Available for hire        │
│ Focus:    React • TypeScript • IoT  │
│ Passion:  Creative Engineering      │
└─────────────────────────────────────┘

"Building the future, one line of code at a time."`
    })
  },

  stack: {
    name: 'stack',
    description: 'Show technology stack',
    execute: () => ({
      type: 'OUTPUT',
      payload: `┌─ TECHNOLOGY STACK ─────────────────────┐
│                                        │
│ 🚀 FRONTEND                            │
│   React 19 • TypeScript • Tailwind    │
│   Framer Motion • Next.js             │
│                                        │
│ ⚡ BACKEND                             │
│   Python • Django • Node.js           │
│   REST APIs • GraphQL                 │
│                                        │
│ 🗄️  DATABASE                           │
│   PostgreSQL • MySQL • MongoDB        │
│   Redis • SQLite                      │
│                                        │
│ ☁️  CLOUD & DEVOPS                     │
│   AWS (EC2, S3, RDS) • Docker         │
│   CI/CD • Linux                       │
│                                        │
│ 🤖 AI/ML                              │
│   TensorFlow • PyTorch • OpenAI       │
│                                        │
│ 🔧 IOT                                │
│   Arduino • Raspberry Pi • ESP32      │
│   MQTT • Sensors • Home Automation    │
│                                        │
└────────────────────────────────────────┘`
    })
  },

  experience: {
    name: 'experience',
    description: 'List work experience',
    execute: () => ({
      type: 'OUTPUT',
      payload: `┌─ PROFESSIONAL EXPERIENCE ──────────────┐
│                                         │
│ [2025 - Current]                        │
│ 💼 Max International                    │
│    Junior Cloud Engineer                │
│    → Managing cloud infrastructure      │
│    → Web application deployment         │
│                                         │
│ [2025 - Current]                        │
│ 🚀 Innovate Nepal Group                 │
│    Frontend Intern                      │
│    → React development                  │
│    → IoT project collaboration          │
│                                         │
│ [2023 - Present]                        │
│ 💻 Freelance                            │
│    Frontend Developer                   │
│    → Responsive UI development          │
│    → IoT system integration             │
│                                         │
│ [2023 - 2024]                           │
│ 🎨 KIEC PVT.LTD                         │
│    IT Support & Graphics Designer       │
│    → IT infrastructure support          │
│    → Social media marketing             │
│                                         │
└─────────────────────────────────────────┘`
    })
  },

  projects: {
    name: 'projects',
    description: 'Show project portfolio',
    execute: () => ({
      type: 'OUTPUT',
      payload: `┌─ PROJECT PORTFOLIO ────────────────────┐
│                                        │
│ 🏠 IoT Smart Home Dashboard            │
│    React + Arduino sensors             │
│    Real-time monitoring system         │
│                                        │
│ 🛍️  E-Commerce Platform                │
│    Full-stack web application          │
│    React + Django + PostgreSQL         │
│                                        │
│ 🧠 Mental Health Care App              │
│    Flutter + Firebase                  │
│    Mobile-friendly support system      │
│                                        │
│ 🎨 Creative Portfolio                  │
│    This cyberpunk terminal system!     │
│    React + TypeScript + Framer Motion  │
│                                        │
│ 📊 Various Client Projects             │
│    Custom web applications             │
│    Modern tech stack implementations   │
│                                        │
└────────────────────────────────────────┘`
    })
  },

  education: {
    name: 'education',
    description: 'Display educational background',
    execute: () => ({
      type: 'OUTPUT',
      payload: `┌─ EDUCATIONAL BACKGROUND ───────────────┐
│                                        │
│ 🎓 Bachelor's Degree                   │
│    Computer Science & Engineering      │
│    London Metropolitan University      │
│    (UK Affiliated)                     │
│    Itahari International College       │
│    2021-2025                           │
│                                        │
│ 📚 Plus Two (+2) Science               │
│    Kathmandu Model College (KMC)       │
│    Kathmandu, Nepal                    │
│    2019-2021                           │
│                                        │
│ 🌟 Key Areas:                          │
│    • Software Engineering              │
│    • Data Structures & Algorithms      │
│    • Web Technologies                  │
│    • Database Management               │
│    • Project Management                │
│                                        │
└────────────────────────────────────────┘`
    })
  },

  iot: {
    name: 'iot',
    description: 'Show IoT expertise',
    execute: () => ({
      type: 'OUTPUT',
      payload: `┌─ IOT EXPERTISE ────────────────────────┐
│                                        │
│ 🔧 HARDWARE                            │
│    Arduino Uno/Nano • Raspberry Pi     │
│    ESP32/ESP8266 • NodeMCU             │
│                                        │
│ 📡 SENSORS & MODULES                   │
│    Temperature/Humidity (DHT22)        │
│    Motion Detection (PIR)              │
│    Light Sensors (LDR)                 │
│    Ultrasonic Distance (HC-SR04)       │
│                                        │
│ 🌐 CONNECTIVITY                        │
│    WiFi • Bluetooth • MQTT Protocol    │
│    HTTP/HTTPS APIs • WebSocket         │
│                                        │
│ ☁️  CLOUD INTEGRATION                  │
│    AWS IoT Core • Real-time data       │
│    Firebase • ThingSpeak              │
│                                        │
│ 🏠 APPLICATIONS                        │
│    Home Automation Systems             │
│    Environmental Monitoring            │
│    Smart Security Solutions            │
│                                        │
└────────────────────────────────────────┘`
    })
  },

  contact: {
    name: 'contact',
    description: 'Display contact information',
    execute: () => ({
      type: 'OUTPUT',
      payload: `┌─ CONTACT INFORMATION ──────────────────┐
│                                        │
│ 📧 Email:                              │
│    Use contact form on portfolio       │
│                                        │
│ 💼 LinkedIn:                           │
│    Professional networking             │
│                                        │
│ 🐙 GitHub:                             │
│    github.com/ameetpokhrel02           │
│                                        │
│ 📱 Instagram:                          │
│    @ameet_pokrel                       │
│                                        │
│ 🌍 Location:                           │
│    Kathmandu, Nepal                    │
│    Available for remote work           │
│                                        │
│ 💬 Availability:                       │
│    Open to freelance & full-time       │
│    opportunities                       │
│                                        │
└────────────────────────────────────────┘`
    })
  },

  architecture: {
    name: 'architecture',
    description: 'Display animated system architecture',
    execute: () => ({
      type: 'ANIMATE_FRAMES',
      payload: { frames: architectureAnimation }
    })
  },

  deploy: {
    name: 'deploy',
    description: 'Show animated deployment pipeline',
    execute: () => ({
      type: 'ANIMATE_FRAMES', 
      payload: { frames: deploymentAnimation }
    })
  },

  clear: {
    name: 'clear',
    description: 'Clear terminal screen',
    execute: () => ({ type: 'CLEAR' })
  },

  exit: {
    name: 'exit',
    description: 'Exit system mode',
    execute: () => ({ type: 'EXIT' })
  },

  'connect ai': {
    name: 'connect ai',
    description: 'Connect to AI assistant',
    aliases: ['connect-ai'],
    execute: () => ({ type: 'CONNECT_AI' })
  },

  'disconnect ai': {
    name: 'disconnect ai',
    description: 'Disconnect from AI assistant',
    aliases: ['disconnect-ai', 'exit ai'],
    execute: () => ({ type: 'DISCONNECT_AI' })
  },

  ai: {
    name: 'ai',
    description: 'Quick connect to AI assistant',
    execute: () => ({ type: 'CONNECT_AI' })
  }
};

export function findCommand(input: string): Command | null {
  const normalizedInput = input.toLowerCase().trim();
  
  // Direct match
  if (commands[normalizedInput]) {
    return commands[normalizedInput];
  }
  
  // Check aliases
  for (const command of Object.values(commands)) {
    if (command.aliases?.includes(normalizedInput)) {
      return command;
    }
  }
  
  return null;
}

export function getCommandSuggestions(input: string): string[] {
  const normalizedInput = input.toLowerCase();
  const suggestions: string[] = [];
  
  for (const [name, command] of Object.entries(commands)) {
    if (name.startsWith(normalizedInput)) {
      suggestions.push(name);
    }
    
    // Check aliases
    if (command.aliases) {
      for (const alias of command.aliases) {
        if (alias.startsWith(normalizedInput)) {
          suggestions.push(alias);
        }
      }
    }
  }
  
  return suggestions.slice(0, 5); // Limit to 5 suggestions
}