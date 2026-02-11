import type { CyberpunkCommand, AnimationFrame } from '../types';
import { fileSystemCommands, fileSystemCommandNames } from './fileSystemCommands';
import { getFileSystemState } from './virtualFileSystem';

// Security-focused system state - this will be synced with terminal state
let systemState = {
  accessLevel: 'Visitor' as 'Visitor' | 'Administrator',
  isFirewallActive: false,
  isMonitoringActive: false,
  lastIntrusionCheck: Date.now(),
  intrusionTimer: null as NodeJS.Timeout | null,
};

// State sync function to be called from terminal engine
export const syncSystemState = (newState: Partial<typeof systemState>) => {
  Object.assign(systemState, newState);
};

export const getSystemState = () => ({ ...systemState });

// System metrics simulation
const getSystemMetrics = () => ({
  cpuUsage: Math.floor(Math.random() * 30) + 15, // 15-45%
  memoryUsed: Math.floor(Math.random() * 2) + 1, // 1-3GB
  memoryTotal: 8,
  activeConnections: Math.floor(Math.random() * 5) + 1, // 1-6
  redisLatency: Math.floor(Math.random() * 5) + 1, // 1-6ms
});

// Intrusion detection simulation
const startIntrusionDetection = (addEntry: (entry: any) => void) => {
  if (systemState.intrusionTimer) return;
  
  const checkIntrusion = () => {
    if (!systemState.isFirewallActive) return;
    
    // Random intrusion attempt every 30-60 seconds
    const nextCheck = Math.random() * 30000 + 30000;
    
    systemState.intrusionTimer = setTimeout(() => {
      if (Math.random() < 0.3) { // 30% chance
        const suspiciousIPs = [
          '203.0.113.45', '198.51.100.23', '192.0.2.156',
          '203.0.113.78', '198.51.100.89', '192.0.2.234'
        ];
        const randomIP = suspiciousIPs[Math.floor(Math.random() * suspiciousIPs.length)];
        
        addEntry({
          type: 'error',
          content: `⚠️  Suspicious activity detected.\nIP: ${randomIP}\nStatus: Blocked.`,
        });
      }
      checkIntrusion();
    }, nextCheck);
  };
  
  checkIntrusion();
};

const stopIntrusionDetection = () => {
  if (systemState.intrusionTimer) {
    clearTimeout(systemState.intrusionTimer);
    systemState.intrusionTimer = null;
  }
};

// ASCII Art Animations
const architectureFrames: AnimationFrame[] = [
  { content: '🏗️  Initializing system architecture...', delay: 500, type: 'system' },
  { content: '', delay: 200 },
  { content: '┌─────────────────────────────────────────┐', delay: 100 },
  { content: '│           SYSTEM TOPOLOGY               │', delay: 100 },
  { content: '├─────────────────────────────────────────┤', delay: 100 },
  { content: '│                                         │', delay: 50 },
  { content: '│  [Frontend] ←→ [API Gateway] ←→ [Backend]│', delay: 200 },
  { content: '│      ↓              ↓              ↓    │', delay: 200 },
  { content: '│  [Browser]     [Load Balancer]  [Database]│', delay: 200 },
  { content: '│      ↓              ↓              ↓    │', delay: 200 },
  { content: '│   [Cache]       [Monitoring]    [Storage]│', delay: 200 },
  { content: '│                                         │', delay: 100 },
  { content: '└─────────────────────────────────────────┘', delay: 100 },
  { content: '', delay: 200 },
  { content: '✅ Architecture visualization complete!', type: 'system' },
];

const bootSequence: AnimationFrame[] = [
  { content: '🚀 CYBERPUNK SECURITY OS v3.1.0 INITIALIZING...', delay: 300, type: 'system' },
  { content: '⚡ Loading security modules...', delay: 200, type: 'system' },
  { content: '🔧 Initializing terminal engine...', delay: 200, type: 'system' },
  { content: '🗂️  Mounting virtual file system...', delay: 200, type: 'system' },
  { content: '📁 Loading project directories...', delay: 200, type: 'system' },
  { content: '🌐 Establishing network protocols...', delay: 200, type: 'system' },
  { content: '🔒 Security protocols active...', delay: 200, type: 'system' },
  { content: '🛡️  Firewall systems standby...', delay: 200, type: 'system' },
  { content: '', delay: 100 },
  { content: 'Authenticating user...', delay: 400, type: 'system' },
  { content: 'Access level: Visitor', delay: 200, type: 'system' },
  { content: '', delay: 100 },
  { content: '✅ Interactive Security Sandbox ready!', delay: 300, type: 'system' },
  { content: '📁 File system mounted: /projects /infrastructure /logs /devices', delay: 200, type: 'system' },
  { content: '', delay: 100 },
  { content: '💡 Type "help" to see available commands.', type: 'system' },
  { content: '🗂️  Type "ls" to explore the file system.', type: 'system' },
  { content: '🔐 Use "sudo elevate" to unlock advanced features.', type: 'system' },
];

export const cyberpunkCommands: Record<string, CyberpunkCommand> = {
  // Debug: Log the merge process
  ...((() => {
    console.log('Merging file system commands...');
    console.log('File system commands keys:', Object.keys(fileSystemCommands));
    console.log('mkdir in fileSystemCommands:', 'mkdir' in fileSystemCommands);
    console.log('cd in fileSystemCommands:', 'cd' in fileSystemCommands);
    return {};
  })()),
  
  help: {
    name: 'help',
    description: 'Display available commands',
    execute: () => ({
      type: 'output',
      content: `┌─ CYBERPUNK SECURITY SANDBOX HELP ──────┐
│                                        │
│ 🗂️  FILE SYSTEM COMMANDS               │
│   ls [-l]     - List directory contents│
│   cd <dir>    - Change directory       │
│   pwd         - Print working directory│
│   cat <file>  - Display file contents  │
│   tree        - Show directory tree    │
│   find <name> - Search for files       │
│   grep <text> <file> - Search in files │
│   head/tail <file>   - Show file parts │
│                                        │
│ ✏️  FILE SYSTEM MUTATIONS              │
│   mkdir <dir> - Create directory       │
│   touch <file>- Create empty file      │
│   rm <name>   - Delete file/directory  │
│   reset       - Reset to initial state │
│                                        │
│ 🎮 BASIC COMMANDS                      │
│   help        - Show this help         │
│   whoami      - User information       │
│   stack       - Technology stack       │
│   experience  - Work experience        │
│   architecture- System architecture    │
│   clear       - Clear terminal         │
│   exit        - Close sandbox          │
│                                        │
│ 🔐 SECURITY OPERATIONS                 │
│   sudo elevate    - Elevate privileges │
│   scan network    - Network discovery  │
│   system status   - Real-time metrics  │
│   list devices    - Connected devices  │
│   ping esp32      - Test IoT device    │
│   view logs       - System logs        │
│                                        │
│ 🛡️  ADVANCED (Admin Only)              │
│   enable firewall     - Activate firewall │
│   security scan       - Vulnerability scan │
│   show attack simulation - Demo attack   │
│                                        │
│ 🤖 AI ASSISTANT                        │
│   connect ai      - Connect to AI chat │
│   disconnect ai   - Exit AI mode       │
│                                        │
└────────────────────────────────────────┘

🎯 Interactive Security Sandbox - Cloud Operations Console
📁 Virtual File System: /projects /infrastructure /logs /devices
💡 Create your own files and folders! Files marked with * are user-created.`
    })
  },

  'sudo elevate': {
    name: 'sudo elevate',
    description: 'Elevate access privileges',
    execute: () => {
      if (systemState.accessLevel === 'Administrator') {
        return {
          type: 'system',
          content: '🔐 Already elevated to Administrator level.'
        };
      }
      
      systemState.accessLevel = 'Administrator';
      return {
        type: 'animated_output',
        frames: [
          { content: '🔐 Requesting privilege escalation...', delay: 400, type: 'system' },
          { content: '🔍 Verifying credentials...', delay: 300, type: 'system' },
          { content: '✅ Access granted!', delay: 200, type: 'system' },
          { content: '', delay: 100 },
          { content: '🛡️  Access level: Administrator', type: 'system' },
          { content: '🔓 Advanced security commands unlocked.', type: 'system' },
        ]
      };
    }
  },

  'scan network': {
    name: 'scan network',
    description: 'Scan network for devices',
    execute: () => ({
      type: 'animated_output',
      frames: [
        { content: '🔍 Scanning 192.168.0.0/24...', delay: 400, type: 'system' },
        { content: '', delay: 200 },
        { content: 'Host detected: IoT Node 01 (192.168.0.101)', delay: 300, type: 'output' },
        { content: 'Host detected: AWS Cloud Gateway (192.168.0.1)', delay: 300, type: 'output' },
        { content: 'Host detected: Django ASGI Core (192.168.0.50)', delay: 300, type: 'output' },
        { content: 'Host detected: Redis Channel Layer (192.168.0.51)', delay: 300, type: 'output' },
        { content: 'Host detected: ESP32 Sensor Hub (192.168.0.102)', delay: 300, type: 'output' },
        { content: '', delay: 200 },
        { content: '✅ Scan complete.', delay: 200, type: 'system' },
        { content: '🛡️  No vulnerabilities detected.', type: 'system' },
      ]
    })
  },

  'system status': {
    name: 'system status',
    description: 'Show real-time system metrics',
    execute: () => {
      const metrics = getSystemMetrics();
      systemState.isMonitoringActive = true;
      
      return {
        type: 'output',
        content: `┌─ REAL-TIME SYSTEM STATUS ──────────────┐
│                                        │
│ 💻 CPU Usage: ${metrics.cpuUsage}%                      │
│ 🧠 Memory: ${metrics.memoryUsed}.${Math.floor(Math.random() * 9)}GB / ${metrics.memoryTotal}GB              │
│ 🌐 Active WebSocket Connections: ${metrics.activeConnections}     │
│ ⚡ Redis Latency: ${metrics.redisLatency}ms                │
│ 🔒 Firewall: ${systemState.isFirewallActive ? 'ACTIVE' : 'INACTIVE'}               │
│ 🛡️  Access Level: ${systemState.accessLevel}          │
│                                        │
│ 📊 Status: All systems operational     │
│                                        │
└────────────────────────────────────────┘

⏱️  Metrics update every second. Run another command to stop.`
      };
    }
  },

  'list devices': {
    name: 'list devices',
    description: 'List connected IoT devices',
    execute: () => ({
      type: 'output',
      content: `┌─ CONNECTED IOT DEVICES ────────────────┐
│                                        │
│ 📱 ESP32 Sensor Node                   │
│    IP: 192.168.0.101                   │
│    Status: Online                      │
│    Sensors: DHT22, BMP280              │
│                                        │
│ 🍓 Raspberry Pi Gateway                │
│    IP: 192.168.0.102                   │
│    Status: Online                      │
│    Role: MQTT Broker                   │
│                                        │
│ 🌡️  Temperature Sensor Unit            │
│    IP: 192.168.0.103                   │
│    Status: Online                      │
│    Last Reading: 24.5°C                │
│                                        │
│ 👁️  Motion Detection Unit              │
│    IP: 192.168.0.104                   │
│    Status: Standby                     │
│    Coverage: Living Room               │
│                                        │
└────────────────────────────────────────┘`
    })
  },

  'ping esp32': {
    name: 'ping esp32',
    description: 'Test ESP32 device connectivity',
    execute: () => ({
      type: 'animated_output',
      frames: [
        { content: '📡 Pinging ESP32 Sensor Node...', delay: 300, type: 'system' },
        { content: '', delay: 400 },
        { content: '64 bytes from 192.168.0.101: time=12ms', delay: 200, type: 'output' },
        { content: '64 bytes from 192.168.0.101: time=11ms', delay: 200, type: 'output' },
        { content: '64 bytes from 192.168.0.101: time=13ms', delay: 200, type: 'output' },
        { content: '', delay: 100 },
        { content: '✅ Response received.', type: 'system' },
        { content: '📊 Latency: 12ms', type: 'system' },
        { content: '📶 Signal strength: Strong', type: 'system' },
      ]
    })
  },

  'view logs': {
    name: 'view logs',
    description: 'Display system logs',
    execute: () => {
      const now = new Date();
      const formatTime = (offset: number) => {
        const time = new Date(now.getTime() - offset);
        return time.toLocaleTimeString('en-US', { hour12: false });
      };

      return {
        type: 'output',
        content: `┌─ SYSTEM LOGS (Last 10 entries) ────────┐
│                                        │
│ [${formatTime(300000)}] [INFO] WebSocket connection established │
│ [${formatTime(240000)}] [INFO] Redis channel synchronized      │
│ [${formatTime(180000)}] [WARNING] High traffic detected        │
│ [${formatTime(120000)}] [INFO] Docker container healthy        │
│ [${formatTime(90000)}] [INFO] ESP32 sensor data received      │
│ [${formatTime(60000)}] [INFO] Database connection stable      │
│ [${formatTime(30000)}] [INFO] SSL certificate renewed         │
│ [${formatTime(15000)}] [INFO] Backup process completed        │
│ [${formatTime(5000)}] [INFO] System health check passed      │
│ [${formatTime(1000)}] [INFO] All services operational        │
│                                        │
└────────────────────────────────────────┘`
      };
    }
  },

  'enable firewall': {
    name: 'enable firewall',
    description: 'Activate security firewall (Admin only)',
    execute: (args, addEntry) => {
      if (systemState.accessLevel !== 'Administrator') {
        return {
          type: 'error',
          content: '❌ Access denied. Administrator privileges required.\nUse "sudo elevate" to gain access.'
        };
      }

      if (systemState.isFirewallActive) {
        return {
          type: 'system',
          content: '🛡️  Firewall is already active.'
        };
      }

      systemState.isFirewallActive = true;
      
      // Start intrusion detection if addEntry is provided
      if (addEntry) {
        startIntrusionDetection(addEntry);
      }

      return {
        type: 'animated_output',
        frames: [
          { content: '🛡️  Initializing firewall systems...', delay: 400, type: 'system' },
          { content: '🔧 Loading security rules...', delay: 300, type: 'system' },
          { content: '🌐 Configuring network filters...', delay: 300, type: 'system' },
          { content: '👁️  Starting intrusion detection...', delay: 300, type: 'system' },
          { content: '', delay: 200 },
          { content: '✅ Firewall engaged.', type: 'system' },
          { content: '🔍 Intrusion detection active.', type: 'system' },
          { content: '⚠️  System will now monitor for threats.', type: 'system' },
        ]
      };
    }
  },

  'security scan': {
    name: 'security scan',
    description: 'Run comprehensive security scan (Admin only)',
    execute: () => {
      if (systemState.accessLevel !== 'Administrator') {
        return {
          type: 'error',
          content: '❌ Access denied. Administrator privileges required.\nUse "sudo elevate" to gain access.'
        };
      }

      return {
        type: 'animated_output',
        frames: [
          { content: '🔍 Initiating comprehensive security scan...', delay: 400, type: 'system' },
          { content: '', delay: 200 },
          { content: '📊 Scanning network topology...', delay: 300, type: 'system' },
          { content: '✅ Network topology: Secure', delay: 200, type: 'output' },
          { content: '', delay: 100 },
          { content: '🔐 Checking authentication systems...', delay: 300, type: 'system' },
          { content: '✅ Authentication: Strong', delay: 200, type: 'output' },
          { content: '', delay: 100 },
          { content: '🛡️  Analyzing firewall rules...', delay: 300, type: 'system' },
          { content: '✅ Firewall configuration: Optimal', delay: 200, type: 'output' },
          { content: '', delay: 100 },
          { content: '🔍 Scanning for vulnerabilities...', delay: 400, type: 'system' },
          { content: '✅ No critical vulnerabilities found', delay: 300, type: 'output' },
          { content: '', delay: 200 },
          { content: '📋 SECURITY SCAN COMPLETE', type: 'system' },
          { content: '🛡️  Overall Security Rating: EXCELLENT', type: 'system' },
        ]
      };
    }
  },

  'show attack simulation': {
    name: 'show attack simulation',
    description: 'Demonstrate attack mitigation (Admin only)',
    execute: () => {
      if (systemState.accessLevel !== 'Administrator') {
        return {
          type: 'error',
          content: '❌ Access denied. Administrator privileges required.\nUse "sudo elevate" to gain access.'
        };
      }

      return {
        type: 'animated_output',
        frames: [
          { content: '⚠️  Simulating DDoS attempt...', delay: 400, type: 'error' },
          { content: '📈 Traffic spike detected: 10,000 req/sec', delay: 300, type: 'error' },
          { content: '🚨 Alert: Potential DDoS attack in progress', delay: 300, type: 'error' },
          { content: '', delay: 200 },
          { content: '🛡️  Activating defense systems...', delay: 300, type: 'system' },
          { content: '⚖️  Load balancer activated', delay: 200, type: 'system' },
          { content: '🚫 Rate limiting enabled', delay: 200, type: 'system' },
          { content: '🔒 Suspicious IPs blocked', delay: 200, type: 'system' },
          { content: '', delay: 300 },
          { content: '✅ Attack mitigated successfully', delay: 200, type: 'system' },
          { content: '📊 Traffic normalized: 150 req/sec', delay: 200, type: 'system' },
          { content: '🛡️  System stabilized', delay: 200, type: 'system' },
          { content: '', delay: 100 },
          { content: '🎯 Simulation complete. All systems secure.', type: 'system' },
        ]
      };
    }
  },

  whoami: {
    name: 'whoami',
    description: 'Display user information',
    execute: () => {
      const currentPath = getFileSystemState().currentPath;
      return {
        type: 'output',
        content: `┌─────────────────────────────────────┐
│        SECURITY CONSOLE USER        │
├─────────────────────────────────────┤
│ User:     Amit Pokhrel              │
│ Role:     Cloud Security Engineer   │
│ Level:    ${systemState.accessLevel.padEnd(12)}         │
│ Location: Kathmandu, Nepal 🇳🇵       │
│ Status:   [ONLINE] Available        │
│ Mode:     Security Sandbox          │
│ Clearance: ${systemState.accessLevel === 'Administrator' ? 'ELEVATED' : 'STANDARD'}              │
│ Directory: ${currentPath.padEnd(11)}          │
└─────────────────────────────────────┘

🛡️  "Securing the future of cloud infrastructure"`
      };
    }
  },

  stack: {
    name: 'stack',
    description: 'Show technology stack',
    execute: () => ({
      type: 'output',
      content: `┌─ CYBERPUNK TECH STACK ─────────────────┐
│                                        │
│ ⚛️  FRONTEND ARSENAL                   │
│   React 19 • TypeScript • Tailwind    │
│   Framer Motion • Vite                 │
│                                        │
│ 🔧 BACKEND SYSTEMS                     │
│   Python • Django • Node.js           │
│   WebSocket • REST APIs               │
│                                        │
│ 🗄️  DATA LAYER                         │
│   PostgreSQL • Redis • MongoDB        │
│                                        │
│ ☁️  CLOUD INFRASTRUCTURE               │
│   AWS • Docker • Kubernetes           │
│   CI/CD Pipelines                      │
│                                        │
│ 🤖 AI/ML INTEGRATION                   │
│   OpenAI • TensorFlow • PyTorch       │
│                                        │
│ 🔌 IOT ECOSYSTEM                       │
│   Arduino • Raspberry Pi • ESP32      │
│   MQTT • Sensor Networks              │
│                                        │
└────────────────────────────────────────┘`
    })
  },

  experience: {
    name: 'experience',
    description: 'List work experience',
    execute: () => ({
      type: 'output',
      content: `┌─ PROFESSIONAL JOURNEY ─────────────────┐
│                                        │
│ [2025 - Current] 🌟                    │
│ Max International                      │
│ → Junior Cloud Engineer                │
│ → AWS infrastructure management        │
│ → Scalable web deployments             │
│                                        │
│ [2025 - Current] 🚀                    │
│ Innovate Nepal Group                   │
│ → Frontend Development Intern          │
│ → React ecosystem mastery              │
│ → IoT integration projects             │
│                                        │
│ [2023 - Present] 💻                    │
│ Freelance Developer                    │
│ → Custom web applications              │
│ → IoT system implementations           │
│ → Client solution architecture         │
│                                        │
│ [2023 - 2024] 🎨                       │
│ KIEC PVT.LTD                           │
│ → IT Support & Graphics Design         │
│ → System administration                │
│ → Creative digital solutions           │
│                                        │
└────────────────────────────────────────┘`
    })
  },

  architecture: {
    name: 'architecture',
    description: 'Display animated system architecture',
    execute: () => ({
      type: 'animated_output',
      frames: architectureFrames
    })
  },

  iot: {
    name: 'iot',
    description: 'Show IoT expertise',
    execute: () => ({
      type: 'output',
      content: `┌─ IOT CYBERPUNK ARSENAL ────────────────┐
│                                        │
│ 🔧 HARDWARE MATRIX                     │
│   Arduino Ecosystem • Raspberry Pi     │
│   ESP32/ESP8266 • NodeMCU              │
│   Custom PCB Design                    │
│                                        │
│ 📡 SENSOR NETWORK                      │
│   Environmental (DHT22, BMP280)        │
│   Motion & Proximity (PIR, HC-SR04)    │
│   Light & Color (LDR, TCS3200)         │
│   Smart Home Integration               │
│                                        │
│ 🌐 CONNECTIVITY PROTOCOLS              │
│   WiFi • Bluetooth • LoRa             │
│   MQTT • HTTP/HTTPS • WebSocket        │
│   Real-time Data Streaming             │
│                                        │
│ ☁️  CLOUD INTEGRATION                  │
│   AWS IoT Core • Firebase             │
│   Real-time Dashboards                │
│   Predictive Analytics                 │
│                                        │
│ 🏠 SMART APPLICATIONS                  │
│   Home Automation Systems              │
│   Environmental Monitoring             │
│   Security & Surveillance              │
│   Energy Management                    │
│                                        │
└────────────────────────────────────────┘`
    })
  },

  deploy: {
    name: 'deploy',
    description: 'Show deployment pipeline',
    execute: () => ({
      type: 'animated_output',
      frames: [
        { content: '🚀 Initializing deployment sequence...', delay: 400, type: 'system' },
        { content: '📦 Building application...', delay: 300, type: 'system' },
        { content: '🔍 Running tests...', delay: 300, type: 'system' },
        { content: '✅ Tests passed!', delay: 200, type: 'system' },
        { content: '🐳 Creating Docker image...', delay: 400, type: 'system' },
        { content: '☁️  Pushing to cloud registry...', delay: 400, type: 'system' },
        { content: '🌐 Deploying to production...', delay: 500, type: 'system' },
        { content: '✅ Deployment successful!', delay: 300, type: 'system' },
        { content: '', delay: 200 },
        { content: '🎯 Application is now live and ready!', type: 'system' },
      ]
    })
  },

  clear: {
    name: 'clear',
    description: 'Clear terminal screen',
    execute: () => ({ type: 'clear' })
  },

  exit: {
    name: 'exit',
    description: 'Close playground',
    execute: () => ({ type: 'exit' })
  },

  'connect ai': {
    name: 'connect ai',
    description: 'Connect to AI assistant',
    aliases: ['ai'],
    execute: () => ({ type: 'ai_connect' })
  },

  'disconnect ai': {
    name: 'disconnect ai',
    description: 'Disconnect from AI assistant',
    aliases: ['exit ai'],
    execute: () => ({ type: 'ai_disconnect' })
  },

  // File system commands at the end to avoid conflicts
  ...fileSystemCommands,
};

export function findCyberpunkCommand(input: string): CyberpunkCommand | null {
  const normalizedInput = input.toLowerCase().trim();
  
  // Debug: Log available commands
  console.log('Available commands:', Object.keys(cyberpunkCommands));
  console.log('Looking for command:', normalizedInput);
  
  // Direct match
  if (cyberpunkCommands[normalizedInput]) {
    console.log('Found direct match:', normalizedInput);
    return cyberpunkCommands[normalizedInput];
  }
  
  // Check aliases
  for (const command of Object.values(cyberpunkCommands)) {
    if (command.aliases?.includes(normalizedInput)) {
      console.log('Found alias match:', normalizedInput);
      return command;
    }
  }
  
  console.log('No command found for:', normalizedInput);
  return null;
}

export function getCyberpunkCommandSuggestions(input: string): string[] {
  const normalizedInput = input.toLowerCase();
  const suggestions: string[] = [];
  
  // Include file system commands in suggestions
  const allCommands = { ...cyberpunkCommands };
  
  for (const [name, command] of Object.entries(allCommands)) {
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
  
  return suggestions.slice(0, 8); // Increased from 5 to 8 for more suggestions
}

export { bootSequence };