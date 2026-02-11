// Virtual Linux-style File System for Security Sandbox
// IMPORTANT: This is a SAFE client-side simulation only - NO real OS commands

export interface VirtualFile {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: Record<string, VirtualFile>;
  permissions?: string;
  size?: number;
  modified?: string;
  created?: string;
  isUserCreated?: boolean; // Track user-created files/folders
}

export interface FileSystemState {
  currentPath: string;
  pathHistory: string[];
  fileSystem: VirtualFile; // Make file system mutable
}

// Create a deep clone function for safe mutations
const deepClone = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (Array.isArray(obj)) return obj.map(deepClone);
  
  const cloned: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

// Initial Virtual File System Structure (will be cloned for mutations)
const initialFileSystem: VirtualFile = {
  name: '/',
  type: 'directory',
  permissions: 'drwxr-xr-x',
  modified: '2025-01-15 10:30',
  children: {
    'about.txt': {
      name: 'about.txt',
      type: 'file',
      permissions: '-rw-r--r--',
      size: 1024,
      modified: '2025-01-15 09:15',
      content: `# Amit Pokhrel - Cloud Security Engineer

## Professional Summary
Passionate cloud security engineer specializing in scalable infrastructure,
IoT integration, and modern web technologies. Based in Kathmandu, Nepal.

## Core Expertise
- Cloud Infrastructure (AWS, Docker, Kubernetes)
- Full-Stack Development (React, Django, Node.js)
- IoT Systems (Arduino, ESP32, Raspberry Pi)
- Security Operations & DevOps
- Real-time Applications & WebSocket

## Mission
Building secure, scalable, and innovative solutions that bridge the gap
between traditional infrastructure and modern cloud-native architectures.

## Contact
- Location: Kathmandu, Nepal 🇳🇵
- Role: Junior Cloud Engineer @ Max International
- Specialization: Cloud Security & IoT Integration`
    },

    'projects': {
      name: 'projects',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      modified: '2025-01-15 11:45',
      children: {
        'portfolio.md': {
          name: 'portfolio.md',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 2048,
          modified: '2025-01-15 11:45',
          content: `# Interactive Portfolio Website

## Project Overview
A cyberpunk-themed interactive portfolio featuring:
- Immersive terminal interface
- Real-time WebSocket chat integration
- Security sandbox simulation
- Responsive design with Framer Motion animations

## Technology Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Django, WebSocket, Redis
- **Deployment**: Docker, AWS
- **Features**: AI chat integration, IoT device simulation

## Key Features
- Interactive cyberpunk terminal
- Real-time AI assistant
- Security operations console
- Mobile-responsive design
- Dark theme with neon accents

## Live Demo
- URL: https://amitpokhrel.dev
- Status: Production Ready
- Performance: 95+ Lighthouse Score`
        },

        'ecommerce.md': {
          name: 'ecommerce.md',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 1536,
          modified: '2025-01-10 14:20',
          content: `# E-Commerce Platform

## Project Description
Full-stack e-commerce solution with modern architecture:
- Microservices-based backend
- React-based admin dashboard
- Mobile-first responsive design
- Real-time inventory management

## Technical Implementation
- **Backend**: Django REST Framework
- **Frontend**: React with Redux Toolkit
- **Database**: PostgreSQL with Redis caching
- **Payment**: Stripe integration
- **Deployment**: Docker containers on AWS

## Features Implemented
- User authentication & authorization
- Product catalog with search/filtering
- Shopping cart & checkout process
- Order management system
- Admin dashboard with analytics
- Real-time notifications

## Performance Metrics
- Page load time: <2s
- Mobile responsiveness: 100%
- Security score: A+ rating`
        },

        'iot-dashboard.md': {
          name: 'iot-dashboard.md',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 1792,
          modified: '2025-01-08 16:30',
          content: `# IoT Monitoring Dashboard

## System Architecture
Real-time IoT data visualization platform:
- ESP32/Arduino sensor networks
- MQTT message broker (Raspberry Pi)
- WebSocket real-time updates
- Cloud data storage and analytics

## Hardware Components
- ESP32 microcontrollers
- DHT22 temperature/humidity sensors
- BMP280 pressure sensors
- PIR motion detectors
- Custom PCB designs

## Software Stack
- **Firmware**: Arduino C++
- **Gateway**: Python on Raspberry Pi
- **Backend**: Node.js with MQTT client
- **Frontend**: React with Chart.js
- **Database**: InfluxDB for time-series data

## Key Metrics
- 50+ connected sensors
- <100ms data latency
- 99.9% uptime
- Real-time alerting system`
        }
      }
    },

    'infrastructure': {
      name: 'infrastructure',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      modified: '2025-01-15 08:45',
      children: {
        'topology.txt': {
          name: 'topology.txt',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 2560,
          modified: '2025-01-15 08:45',
          content: `# Cloud Infrastructure Topology

## Production Environment
┌─────────────────────────────────────────────────────┐
│                 CLOUD ARCHITECTURE                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [Internet] → [CloudFlare CDN] → [Load Balancer]   │
│                                        ↓            │
│  [Frontend]     [API Gateway]     [Backend Services]│
│  - React App    - Rate Limiting   - Django API      │
│  - Static CDN   - SSL Termination - WebSocket       │
│  - PWA Support  - DDoS Protection - Background Jobs │
│                                        ↓            │
│  [Database Layer]        [Cache Layer]              │
│  - PostgreSQL Primary   - Redis Cluster            │
│  - Read Replicas        - Session Store            │
│  - Automated Backups    - Real-time Cache          │
│                                        ↓            │
│  [Monitoring & Logging]  [Security Layer]          │
│  - Prometheus/Grafana   - WAF Protection           │
│  - ELK Stack           - SSL/TLS Encryption        │
│  - Alert Manager       - API Rate Limiting         │
│                                                     │
└─────────────────────────────────────────────────────┘

## Deployment Strategy
- Blue-Green Deployments
- Container Orchestration (Kubernetes)
- Auto-scaling based on metrics
- Multi-region redundancy

## Security Measures
- End-to-end encryption
- Regular security audits
- Automated vulnerability scanning
- Compliance with security standards`
        },

        'docker.txt': {
          name: 'docker.txt',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 1280,
          modified: '2025-01-12 13:20',
          content: `# Docker Configuration

## Container Architecture
Multi-container application setup:

### Frontend Container
- Base: node:18-alpine
- Build: Vite production build
- Nginx reverse proxy
- Gzip compression enabled
- Security headers configured

### Backend Container
- Base: python:3.11-slim
- Django application server
- Gunicorn WSGI server
- Redis connection pooling
- Health check endpoints

### Database Container
- PostgreSQL 15
- Persistent volume mounts
- Automated backup scripts
- Connection pooling
- Performance tuning

### Redis Container
- Redis 7.0 Alpine
- Persistence enabled
- Memory optimization
- Cluster-ready configuration

## Docker Compose Services
- Load balancer (Nginx)
- Application containers
- Database services
- Monitoring stack
- Log aggregation

## Production Optimizations
- Multi-stage builds
- Layer caching
- Security scanning
- Resource limits
- Health monitoring`
        },

        'aws-config.txt': {
          name: 'aws-config.txt',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 1920,
          modified: '2025-01-14 10:15',
          content: `# AWS Infrastructure Configuration

## Core Services
- **EC2**: Auto-scaling groups with t3.medium instances
- **RDS**: PostgreSQL Multi-AZ deployment
- **ElastiCache**: Redis cluster for session management
- **S3**: Static asset storage with CloudFront CDN
- **Route 53**: DNS management with health checks

## Security Configuration
- **VPC**: Private subnets with NAT gateways
- **Security Groups**: Restrictive inbound rules
- **IAM**: Least privilege access policies
- **WAF**: Web application firewall rules
- **Certificate Manager**: SSL/TLS certificates

## Monitoring & Logging
- **CloudWatch**: Metrics and log aggregation
- **X-Ray**: Distributed tracing
- **Config**: Resource compliance monitoring
- **GuardDuty**: Threat detection service

## Backup & Recovery
- **Automated snapshots**: Daily RDS backups
- **Cross-region replication**: S3 disaster recovery
- **Point-in-time recovery**: 7-day retention
- **Infrastructure as Code**: Terraform templates

## Cost Optimization
- **Reserved Instances**: 40% cost savings
- **Spot Instances**: Non-critical workloads
- **Auto-scaling**: Dynamic resource allocation
- **S3 Lifecycle**: Intelligent tiering`
        }
      }
    },

    'logs': {
      name: 'logs',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      modified: '2025-01-15 12:00',
      children: {
        'security.log': {
          name: 'security.log',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 4096,
          modified: '2025-01-15 12:00',
          content: `# Security Event Log

[2025-01-15 12:00:15] [INFO] Firewall rule updated: Block suspicious IP range
[2025-01-15 11:58:32] [WARN] Multiple failed login attempts from 203.0.113.45
[2025-01-15 11:55:18] [INFO] SSL certificate renewed successfully
[2025-01-15 11:52:44] [INFO] Security scan completed - No vulnerabilities found
[2025-01-15 11:50:12] [WARN] Rate limit exceeded for API endpoint /api/auth
[2025-01-15 11:48:33] [INFO] DDoS protection activated - Traffic normalized
[2025-01-15 11:45:21] [INFO] Intrusion detection system updated
[2025-01-15 11:42:15] [INFO] User privilege escalation: admin@system
[2025-01-15 11:40:08] [INFO] WebSocket connection secured with TLS
[2025-01-15 11:38:45] [INFO] Database connection encrypted
[2025-01-15 11:35:22] [WARN] Unusual traffic pattern detected - Monitoring
[2025-01-15 11:32:18] [INFO] Security headers validated
[2025-01-15 11:30:05] [INFO] CORS policy updated for production
[2025-01-15 11:28:33] [INFO] API authentication successful
[2025-01-15 11:25:12] [INFO] System security status: SECURE

# Threat Analysis Summary
- Blocked IPs: 23 in last 24h
- Failed authentications: 156
- DDoS attempts mitigated: 3
- Security score: 98/100`
        },

        'system.log': {
          name: 'system.log',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 3584,
          modified: '2025-01-15 12:00',
          content: `# System Performance Log

[2025-01-15 12:00:30] [INFO] CPU usage: 23% | Memory: 2.1GB/8GB | Load: 0.85
[2025-01-15 11:59:45] [INFO] Docker container health check: All services healthy
[2025-01-15 11:58:12] [INFO] Database connection pool: 15/50 active connections
[2025-01-15 11:57:33] [INFO] Redis cache hit ratio: 94.2%
[2025-01-15 11:56:18] [INFO] WebSocket connections: 8 active sessions
[2025-01-15 11:55:44] [INFO] API response time: avg 120ms, p95 280ms
[2025-01-15 11:54:22] [INFO] Disk usage: 45% (18GB/40GB available)
[2025-01-15 11:53:15] [INFO] Network throughput: 2.3MB/s in, 1.8MB/s out
[2025-01-15 11:52:08] [INFO] Background job queue: 3 pending, 0 failed
[2025-01-15 11:51:33] [INFO] SSL handshake time: avg 45ms
[2025-01-15 11:50:18] [INFO] CDN cache hit ratio: 89.7%
[2025-01-15 11:49:45] [INFO] Auto-scaling: No scaling events triggered
[2025-01-15 11:48:22] [INFO] Backup process completed successfully
[2025-01-15 11:47:15] [INFO] Log rotation completed: 7 files archived
[2025-01-15 11:46:33] [INFO] System uptime: 15 days, 8 hours, 23 minutes

# Performance Metrics
- Average response time: 120ms
- 99.9% uptime achieved
- Zero critical errors
- Memory usage stable`
        },

        'deployment.log': {
          name: 'deployment.log',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 2048,
          modified: '2025-01-15 09:30',
          content: `# Deployment History

[2025-01-15 09:30:15] [INFO] Deployment v2.1.3 initiated
[2025-01-15 09:30:18] [INFO] Running pre-deployment tests...
[2025-01-15 09:30:45] [INFO] All tests passed ✓
[2025-01-15 09:30:48] [INFO] Building Docker images...
[2025-01-15 09:32:12] [INFO] Images built successfully
[2025-01-15 09:32:15] [INFO] Pushing to container registry...
[2025-01-15 09:33:22] [INFO] Registry push completed
[2025-01-15 09:33:25] [INFO] Starting blue-green deployment...
[2025-01-15 09:33:28] [INFO] Spinning up new containers...
[2025-01-15 09:34:45] [INFO] Health checks passed
[2025-01-15 09:34:48] [INFO] Switching traffic to new version...
[2025-01-15 09:35:15] [INFO] Traffic switch completed
[2025-01-15 09:35:18] [INFO] Terminating old containers...
[2025-01-15 09:35:45] [INFO] Deployment completed successfully
[2025-01-15 09:35:48] [INFO] Post-deployment verification passed

# Deployment Summary
- Version: v2.1.3
- Duration: 5 minutes 33 seconds
- Zero downtime achieved
- Rollback plan: Ready`
        }
      }
    },

    'devices': {
      name: 'devices',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      modified: '2025-01-15 10:15',
      children: {
        'esp32.txt': {
          name: 'esp32.txt',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 1536,
          modified: '2025-01-15 10:15',
          content: `# ESP32 IoT Device Configuration

## Device Information
- Model: ESP32-WROOM-32
- IP Address: 192.168.0.101
- MAC Address: 24:6F:28:AB:CD:EF
- Firmware Version: v2.3.1
- Status: ONLINE

## Sensor Configuration
- DHT22: Temperature & Humidity
  * Temperature: 24.5°C
  * Humidity: 65.2%
  * Update Interval: 30 seconds

- BMP280: Atmospheric Pressure
  * Pressure: 1013.25 hPa
  * Altitude: 1350m (calculated)
  * Update Interval: 60 seconds

## Network Configuration
- WiFi SSID: IoT_Network_5G
- Signal Strength: -45 dBm (Excellent)
- Connection Type: WPA2-PSK
- MQTT Broker: 192.168.0.102:1883
- WebSocket Endpoint: ws://192.168.0.50:8001/ws/iot/

## Power Management
- Supply Voltage: 3.3V
- Current Consumption: 80mA (active)
- Sleep Mode: Deep sleep enabled
- Battery Level: N/A (Powered via USB)

## Recent Activity
- Last data transmission: 2025-01-15 12:00:45
- Uptime: 7 days, 14 hours
- Data packets sent: 15,432
- Connection drops: 0`
        },

        'raspberrypi.txt': {
          name: 'raspberrypi.txt',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 1792,
          modified: '2025-01-15 10:10',
          content: `# Raspberry Pi Gateway Configuration

## System Information
- Model: Raspberry Pi 4 Model B (8GB)
- OS: Raspberry Pi OS Lite (64-bit)
- Kernel: Linux 6.1.21-v8+
- IP Address: 192.168.0.102
- Hostname: iot-gateway-01

## Services Running
- MQTT Broker (Mosquitto): Port 1883
- Node-RED: Port 1880
- InfluxDB: Port 8086
- Grafana Dashboard: Port 3000
- SSH Server: Port 22 (Key-based auth)

## MQTT Broker Statistics
- Connected Clients: 12
- Messages/Hour: 1,440
- Retained Messages: 48
- Subscriptions: 36
- Uptime: 15 days, 8 hours

## Storage & Performance
- SD Card: 64GB SanDisk Extreme Pro
- Used Space: 18.2GB / 59.6GB
- CPU Usage: 15.3%
- Memory Usage: 1.2GB / 8GB
- Temperature: 42.8°C

## Network Configuration
- Ethernet: 1Gbps (Connected)
- WiFi: 802.11ac (Backup)
- Port Forwarding: 1883, 1880, 3000
- Firewall: UFW enabled

## Connected IoT Devices
- ESP32 Sensors: 8 devices
- Arduino Nodes: 4 devices
- Smart Switches: 6 devices
- Environmental Sensors: 12 devices

## Backup & Monitoring
- Automated backups: Daily at 2:00 AM
- Log rotation: Weekly
- Health monitoring: Enabled
- Remote access: VPN tunnel active`
        },

        'arduino.txt': {
          name: 'arduino.txt',
          type: 'file',
          permissions: '-rw-r--r--',
          size: 1024,
          modified: '2025-01-12 15:45',
          content: `# Arduino IoT Nodes

## Node Configuration
- Total Nodes: 4 active
- Communication: Serial over WiFi
- Update Interval: 5 minutes
- Power Source: 12V DC adapter

## Node 01 - Environmental Monitor
- Location: Living Room
- Sensors: DHT22, LDR, PIR
- IP: 192.168.0.103
- Status: ACTIVE

## Node 02 - Security System
- Location: Main Entrance
- Sensors: PIR, Magnetic Door, Camera
- IP: 192.168.0.104
- Status: ACTIVE

## Node 03 - Garden Monitor
- Location: Outdoor Garden
- Sensors: Soil Moisture, UV, Rain
- IP: 192.168.0.105
- Status: ACTIVE

## Node 04 - Energy Monitor
- Location: Electrical Panel
- Sensors: Current, Voltage, Power
- IP: 192.168.0.106
- Status: ACTIVE

## Firmware Information
- Version: v1.8.2
- Compiler: Arduino IDE 2.2.1
- Libraries: WiFi, MQTT, Sensors
- OTA Updates: Enabled`
        }
      }
    },

    'scripts': {
      name: 'scripts',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      modified: '2025-01-14 16:20',
      children: {
        'deploy.sh': {
          name: 'deploy.sh',
          type: 'file',
          permissions: '-rwxr-xr-x',
          size: 512,
          modified: '2025-01-14 16:20',
          content: `#!/bin/bash
# Deployment Script for Production

echo "🚀 Starting deployment process..."

# Build and test
npm run build
npm run test

# Docker operations
docker build -t portfolio:latest .
docker tag portfolio:latest registry.aws.com/portfolio:v2.1.3
docker push registry.aws.com/portfolio:v2.1.3

# Deploy to production
kubectl apply -f k8s/
kubectl rollout status deployment/portfolio

echo "✅ Deployment completed successfully!"`
        },

        'backup.sh': {
          name: 'backup.sh',
          type: 'file',
          permissions: '-rwxr-xr-x',
          size: 384,
          modified: '2025-01-13 08:30',
          content: `#!/bin/bash
# Automated Backup Script

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

echo "📦 Starting backup process..."

# Database backup
pg_dump portfolio_db > $BACKUP_DIR/db_$DATE.sql

# File system backup
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/

# Upload to S3
aws s3 cp $BACKUP_DIR/ s3://portfolio-backups/ --recursive

echo "✅ Backup completed: $DATE"`
        }
      }
    }
  }
};

// File System Navigation State (now includes mutable file system)
let fileSystemState: FileSystemState = {
  currentPath: '/',
  pathHistory: ['/'],
  fileSystem: deepClone(initialFileSystem) // Create mutable copy
};

// Helper Functions
export const getCurrentDirectory = (): VirtualFile => {
  const pathParts = fileSystemState.currentPath.split('/').filter(Boolean);
  let current = fileSystemState.fileSystem;
  
  for (const part of pathParts) {
    if (current.children && current.children[part]) {
      current = current.children[part];
    } else {
      return fileSystemState.fileSystem; // Return root if path is invalid
    }
  }
  
  return current;
};

export const resolvePath = (path: string): string => {
  if (path.startsWith('/')) {
    return path; // Absolute path
  }
  
  // Relative path
  const currentParts = fileSystemState.currentPath.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  
  for (const part of pathParts) {
    if (part === '..') {
      currentParts.pop();
    } else if (part !== '.') {
      currentParts.push(part);
    }
  }
  
  return '/' + currentParts.join('/');
};

export const getFileSystemState = (): FileSystemState => ({ 
  ...fileSystemState,
  fileSystem: deepClone(fileSystemState.fileSystem) // Return safe copy
});

export const setCurrentPath = (path: string): void => {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');
  fileSystemState.currentPath = normalizedPath;
  fileSystemState.pathHistory.push(normalizedPath);
  
  // Keep history limited
  if (fileSystemState.pathHistory.length > 50) {
    fileSystemState.pathHistory = fileSystemState.pathHistory.slice(-50);
  }
};

export const getFileAtPath = (path: string): VirtualFile | null => {
  const resolvedPath = resolvePath(path);
  const pathParts = resolvedPath.split('/').filter(Boolean);
  let current = fileSystemState.fileSystem;
  
  for (const part of pathParts) {
    if (current.children && current.children[part]) {
      current = current.children[part];
    } else {
      return null;
    }
  }
  
  return current;
};

// NEW MUTATION FUNCTIONS
export const createDirectory = (name: string, path?: string): { success: boolean; message: string } => {
  const targetPath = path || fileSystemState.currentPath;
  const resolvedPath = resolvePath(targetPath);
  const pathParts = resolvedPath.split('/').filter(Boolean);
  let current = fileSystemState.fileSystem;
  
  // Navigate to target directory
  for (const part of pathParts) {
    if (current.children && current.children[part]) {
      current = current.children[part];
    } else {
      return { success: false, message: `Directory not found: ${targetPath}` };
    }
  }
  
  if (current.type !== 'directory') {
    return { success: false, message: `Not a directory: ${targetPath}` };
  }
  
  if (!current.children) {
    current.children = {};
  }
  
  // Check if directory already exists
  if (current.children[name]) {
    return { success: false, message: `Directory already exists: ${name}` };
  }
  
  // Validate directory name
  if (!/^[a-zA-Z0-9._-]+$/.test(name)) {
    return { success: false, message: `Invalid directory name: ${name}` };
  }
  
  // Create new directory
  const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
  current.children[name] = {
    name,
    type: 'directory',
    permissions: 'drwxr-xr-x',
    modified: now,
    created: now,
    children: {},
    isUserCreated: true
  };
  
  return { success: true, message: `Directory created: ${name}` };
};

export const createFile = (name: string, content: string = '', path?: string): { success: boolean; message: string } => {
  const targetPath = path || fileSystemState.currentPath;
  const resolvedPath = resolvePath(targetPath);
  const pathParts = resolvedPath.split('/').filter(Boolean);
  let current = fileSystemState.fileSystem;
  
  // Navigate to target directory
  for (const part of pathParts) {
    if (current.children && current.children[part]) {
      current = current.children[part];
    } else {
      return { success: false, message: `Directory not found: ${targetPath}` };
    }
  }
  
  if (current.type !== 'directory') {
    return { success: false, message: `Not a directory: ${targetPath}` };
  }
  
  if (!current.children) {
    current.children = {};
  }
  
  // Check if file already exists
  if (current.children[name]) {
    return { success: false, message: `File already exists: ${name}` };
  }
  
  // Validate file name
  if (!/^[a-zA-Z0-9._-]+$/.test(name)) {
    return { success: false, message: `Invalid file name: ${name}` };
  }
  
  // Create new file
  const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
  current.children[name] = {
    name,
    type: 'file',
    permissions: '-rw-r--r--',
    size: content.length,
    modified: now,
    created: now,
    content,
    isUserCreated: true
  };
  
  return { success: true, message: `File created: ${name}` };
};

export const deleteFileOrDirectory = (name: string, path?: string): { success: boolean; message: string } => {
  const targetPath = path || fileSystemState.currentPath;
  const resolvedPath = resolvePath(targetPath);
  const pathParts = resolvedPath.split('/').filter(Boolean);
  let current = fileSystemState.fileSystem;
  
  // Prevent deleting root
  if (resolvedPath === '/' && name === '/') {
    return { success: false, message: 'Cannot delete root directory' };
  }
  
  // Navigate to target directory
  for (const part of pathParts) {
    if (current.children && current.children[part]) {
      current = current.children[part];
    } else {
      return { success: false, message: `Directory not found: ${targetPath}` };
    }
  }
  
  if (current.type !== 'directory' || !current.children) {
    return { success: false, message: `Not a directory: ${targetPath}` };
  }
  
  // Check if file/directory exists
  if (!current.children[name]) {
    return { success: false, message: `File or directory not found: ${name}` };
  }
  
  const target = current.children[name];
  
  // Prevent deleting system files (non-user-created)
  if (!target.isUserCreated) {
    return { success: false, message: `Cannot delete system file: ${name}` };
  }
  
  // Delete the file/directory
  delete current.children[name];
  
  const type = target.type === 'directory' ? 'Directory' : 'File';
  return { success: true, message: `${type} deleted: ${name}` };
};

// Reset file system to initial state
export const resetFileSystem = (): void => {
  fileSystemState.fileSystem = deepClone(initialFileSystem);
  fileSystemState.currentPath = '/';
  fileSystemState.pathHistory = ['/'];
};

export const formatFileSize = (size?: number): string => {
  if (!size) return '0B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let fileSize = size;
  
  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024;
    unitIndex++;
  }
  
  return `${Math.round(fileSize * 10) / 10}${units[unitIndex]}`;
};

export const generateTreeView = (node: VirtualFile = fileSystemState.fileSystem, prefix: string = '', isLast: boolean = true): string => {
  const lines: string[] = [];
  const connector = isLast ? '└── ' : '├── ';
  const icon = node.type === 'directory' ? '📁 ' : '📄 ';
  const userCreatedMark = node.isUserCreated ? ' *' : '';
  
  if (node.name !== '/') {
    lines.push(prefix + connector + icon + node.name + userCreatedMark);
  }
  
  if (node.children) {
    const children = Object.values(node.children);
    const nextPrefix = node.name === '/' ? '' : prefix + (isLast ? '    ' : '│   ');
    
    children.forEach((child, index) => {
      const isLastChild = index === children.length - 1;
      lines.push(...generateTreeView(child, nextPrefix, isLastChild).split('\n').filter(Boolean));
    });
  }
  
  return lines.join('\n');
};