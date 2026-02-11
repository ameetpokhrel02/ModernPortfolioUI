export interface AnimationFrame {
  content: string;
  delay?: number;
  color?: 'cyan' | 'green' | 'yellow' | 'red' | 'blue' | 'magenta';
}

export const architectureAnimation: AnimationFrame[] = [
  { content: 'Initializing system topology scan...', delay: 300, color: 'cyan' },
  { content: 'Connecting to network nodes...', delay: 400, color: 'cyan' },
  { content: 'Rendering architecture diagram...', delay: 500, color: 'cyan' },
  { content: '', delay: 200 },
  
  // Header
  { 
    content: `┌─────────────────────────────────────────────────────────────┐
│                    SYSTEM ARCHITECTURE                     │
│                     Amit's Portfolio                       │
└─────────────────────────────────────────────────────────────┘`, 
    delay: 300, 
    color: 'cyan' 
  },
  { content: '', delay: 100 },
  
  // IoT Layer
  { content: '🌐 IOT SENSOR NETWORK', delay: 200, color: 'green' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│  [DHT22] [PIR] [LDR] [HC-SR04]     │', delay: 150, color: 'yellow' },
  { content: '│     Temperature │ Motion │ Light   │', delay: 150, color: 'yellow' },
  { content: '└─────────────────┼────────┼─────────┘', delay: 100, color: 'cyan' },
  { content: '                  │        │         ', delay: 50 },
  { content: '                  ▼        ▼         ', delay: 100, color: 'cyan' },
  { content: '', delay: 100 },
  
  // MQTT Broker
  { content: '📡 MQTT BROKER', delay: 200, color: 'green' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│        Message Queue Telemetry      │', delay: 150, color: 'yellow' },
  { content: '│         Protocol Handler            │', delay: 150, color: 'yellow' },
  { content: '└─────────────────┼───────────────────┘', delay: 100, color: 'cyan' },
  { content: '                  │                   ', delay: 50 },
  { content: '                  ▼                   ', delay: 100, color: 'cyan' },
  { content: '', delay: 100 },
  
  // AWS Cloud
  { content: '☁️  AWS CLOUD INFRASTRUCTURE', delay: 200, color: 'green' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│  ┌─────────┐ ┌─────────┐ ┌────────┐ │', delay: 150, color: 'yellow' },
  { content: '│  │ IoT Core│ │   EC2   │ │   S3   │ │', delay: 150, color: 'yellow' },
  { content: '│  └─────────┘ └─────────┘ └────────┘ │', delay: 150, color: 'yellow' },
  { content: '│  ┌─────────┐ ┌─────────┐ ┌────────┐ │', delay: 150, color: 'yellow' },
  { content: '│  │   RDS   │ │ Lambda  │ │CloudFnt│ │', delay: 150, color: 'yellow' },
  { content: '│  └─────────┘ └─────────┘ └────────┘ │', delay: 150, color: 'yellow' },
  { content: '└─────────────────┼───────────────────┘', delay: 100, color: 'cyan' },
  { content: '                  │                   ', delay: 50 },
  { content: '                  ▼                   ', delay: 100, color: 'cyan' },
  { content: '', delay: 100 },
  
  // Django Backend
  { content: '🐍 DJANGO ASGI BACKEND', delay: 200, color: 'green' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│  ┌─────────────┐ ┌─────────────────┐ │', delay: 150, color: 'yellow' },
  { content: '│  │   Django    │ │   Channels      │ │', delay: 150, color: 'yellow' },
  { content: '│  │   REST API  │ │   WebSocket     │ │', delay: 150, color: 'yellow' },
  { content: '│  └─────────────┘ └─────────────────┘ │', delay: 150, color: 'yellow' },
  { content: '│  ┌─────────────┐ ┌─────────────────┐ │', delay: 150, color: 'yellow' },
  { content: '│  │ PostgreSQL  │ │   AI Chatbot    │ │', delay: 150, color: 'yellow' },
  { content: '│  │  Database   │ │    Engine       │ │', delay: 150, color: 'yellow' },
  { content: '│  └─────────────┘ └─────────────────┘ │', delay: 150, color: 'yellow' },
  { content: '└─────────────────┼───────────────────┘', delay: 100, color: 'cyan' },
  { content: '                  │                   ', delay: 50 },
  { content: '                  ▼                   ', delay: 100, color: 'cyan' },
  { content: '', delay: 100 },
  
  // Redis Layer
  { content: '🔴 REDIS CHANNEL LAYER', delay: 200, color: 'green' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│     In-Memory Data Structure        │', delay: 150, color: 'yellow' },
  { content: '│      WebSocket Channel Manager      │', delay: 150, color: 'yellow' },
  { content: '│        Real-time Messaging          │', delay: 150, color: 'yellow' },
  { content: '└─────────────────┼───────────────────┘', delay: 100, color: 'cyan' },
  { content: '                  │                   ', delay: 50 },
  { content: '                  ▼                   ', delay: 100, color: 'cyan' },
  { content: '', delay: 100 },
  
  // WebSocket Connection
  { content: '🔌 WEBSOCKET CONNECTION', delay: 200, color: 'green' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│    ╭─────────────────────────────╮   │', delay: 150, color: 'magenta' },
  { content: '│    │   Bidirectional Stream      │   │', delay: 150, color: 'magenta' },
  { content: '│    │     Real-time Data Flow     │   │', delay: 150, color: 'magenta' },
  { content: '│    ╰─────────────────────────────╯   │', delay: 150, color: 'magenta' },
  { content: '└─────────────────┼───────────────────┘', delay: 100, color: 'cyan' },
  { content: '                  │                   ', delay: 50 },
  { content: '                  ▼                   ', delay: 100, color: 'cyan' },
  { content: '', delay: 100 },
  
  // React Frontend
  { content: '⚛️  REACT FRONTEND UI', delay: 200, color: 'green' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│  ┌─────────────┐ ┌─────────────────┐ │', delay: 150, color: 'blue' },
  { content: '│  │   React 19  │ │   TypeScript    │ │', delay: 150, color: 'blue' },
  { content: '│  │  Components │ │   Type Safety   │ │', delay: 150, color: 'blue' },
  { content: '│  └─────────────┘ └─────────────────┘ │', delay: 150, color: 'blue' },
  { content: '│  ┌─────────────┐ ┌─────────────────┐ │', delay: 150, color: 'blue' },
  { content: '│  │ Tailwind CSS│ │ Framer Motion   │ │', delay: 150, color: 'blue' },
  { content: '│  │   Styling   │ │   Animations    │ │', delay: 150, color: 'blue' },
  { content: '│  └─────────────┘ └─────────────────┘ │', delay: 150, color: 'blue' },
  { content: '│  ┌─────────────────────────────────┐ │', delay: 150, color: 'blue' },
  { content: '│  │      Cyberpunk Terminal         │ │', delay: 150, color: 'blue' },
  { content: '│  │        AI Integration           │ │', delay: 150, color: 'blue' },
  { content: '│  └─────────────────────────────────┘ │', delay: 150, color: 'blue' },
  { content: '└─────────────────────────────────────┘', delay: 100, color: 'cyan' },
  { content: '', delay: 200 },
  
  // Status indicators
  { content: '📊 SYSTEM STATUS', delay: 300, color: 'green' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│ Architecture Status: ✅ OPERATIONAL │', delay: 200, color: 'green' },
  { content: '│ Real-time Comms:     ✅ ACTIVE      │', delay: 200, color: 'green' },
  { content: '│ AI Integration:      ✅ READY       │', delay: 200, color: 'green' },
  { content: '│ WebSocket Layer:     ✅ CONNECTED   │', delay: 200, color: 'green' },
  { content: '│ Database Layer:      ✅ SYNCED      │', delay: 200, color: 'green' },
  { content: '│ Cloud Services:      ✅ DEPLOYED    │', delay: 200, color: 'green' },
  { content: '└─────────────────────────────────────┘', delay: 100, color: 'cyan' },
  { content: '', delay: 200 },
  
  // Data flow animation
  { content: '🔄 DATA FLOW SIMULATION', delay: 300, color: 'yellow' },
  { content: 'IoT Sensor → MQTT → AWS → Django → Redis → WebSocket → React', delay: 400, color: 'magenta' },
  { content: 'User Input ← Terminal ← WebSocket ← Redis ← Django ← AI Engine', delay: 400, color: 'magenta' },
  { content: '', delay: 200 },
  
  // Performance metrics
  { content: '⚡ PERFORMANCE METRICS', delay: 300, color: 'yellow' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│ Response Time:       < 100ms        │', delay: 150, color: 'green' },
  { content: '│ WebSocket Latency:   < 50ms         │', delay: 150, color: 'green' },
  { content: '│ Database Queries:    < 10ms         │', delay: 150, color: 'green' },
  { content: '│ AI Response Time:    < 2s           │', delay: 150, color: 'green' },
  { content: '│ Frontend Load Time:  < 1s           │', delay: 150, color: 'green' },
  { content: '└─────────────────────────────────────┘', delay: 100, color: 'cyan' },
  { content: '', delay: 300 },
  
  // Final message
  { content: '🎯 Architecture scan complete!', delay: 400, color: 'green' },
  { content: '💡 This system powers Amit\'s portfolio with real-time capabilities.', delay: 400, color: 'cyan' }
];

export const deploymentAnimation: AnimationFrame[] = [
  { content: 'Initializing deployment sequence...', delay: 300, color: 'cyan' },
  { content: 'Connecting to deployment pipeline...', delay: 400, color: 'cyan' },
  { content: '', delay: 200 },
  
  { 
    content: `┌─────────────────────────────────────────────────────────────┐
│                   DEPLOYMENT PIPELINE                      │
└─────────────────────────────────────────────────────────────┘`, 
    delay: 300, 
    color: 'cyan' 
  },
  { content: '', delay: 100 },
  
  // Docker Build
  { content: '🐳 DOCKER CONTAINERIZATION', delay: 200, color: 'blue' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│ Building frontend container...  ✅  │', delay: 300, color: 'green' },
  { content: '│ Building backend container...   ✅  │', delay: 300, color: 'green' },
  { content: '│ Building database container...  ✅  │', delay: 300, color: 'green' },
  { content: '│ Building redis container...     ✅  │', delay: 300, color: 'green' },
  { content: '└─────────────────────────────────────┘', delay: 100, color: 'cyan' },
  { content: '', delay: 200 },
  
  // AWS Deployment
  { content: '☁️  AWS DEPLOYMENT', delay: 200, color: 'yellow' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│ Deploying to EC2 instances...   ✅  │', delay: 400, color: 'green' },
  { content: '│ Configuring load balancer...    ✅  │', delay: 400, color: 'green' },
  { content: '│ Setting up RDS database...      ✅  │', delay: 400, color: 'green' },
  { content: '│ Configuring S3 storage...       ✅  │', delay: 400, color: 'green' },
  { content: '│ Setting up CloudFront CDN...    ✅  │', delay: 400, color: 'green' },
  { content: '└─────────────────────────────────────┘', delay: 100, color: 'cyan' },
  { content: '', delay: 200 },
  
  // Health Checks
  { content: '🏥 HEALTH CHECKS', delay: 200, color: 'green' },
  { content: '┌─────────────────────────────────────┐', delay: 100, color: 'cyan' },
  { content: '│ Frontend health check...        ✅  │', delay: 300, color: 'green' },
  { content: '│ Backend API health check...     ✅  │', delay: 300, color: 'green' },
  { content: '│ Database connectivity...        ✅  │', delay: 300, color: 'green' },
  { content: '│ WebSocket connection...         ✅  │', delay: 300, color: 'green' },
  { content: '│ AI service availability...      ✅  │', delay: 300, color: 'green' },
  { content: '└─────────────────────────────────────┘', delay: 100, color: 'cyan' },
  { content: '', delay: 200 },
  
  { content: '🚀 Deployment successful!', delay: 400, color: 'green' },
  { content: '🌐 Portfolio is now live and operational.', delay: 400, color: 'cyan' }
];

export async function playAnimation(
  frames: AnimationFrame[], 
  onFrame: (content: string, color?: string) => void
): Promise<void> {
  for (const frame of frames) {
    onFrame(frame.content, frame.color);
    if (frame.delay) {
      await new Promise(resolve => setTimeout(resolve, frame.delay));
    }
  }
}