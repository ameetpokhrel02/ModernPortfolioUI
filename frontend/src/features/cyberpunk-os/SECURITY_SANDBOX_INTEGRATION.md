# Interactive Security Sandbox Integration Guide

## Overview
The Interactive Security Sandbox is now enhanced with cloud security operations features. This guide shows how to integrate it into your existing portfolio.

## Quick Integration

### 1. Add to Your Main Component
```tsx
import { CyberpunkPlayground } from './features/cyberpunk-os/CyberpunkPlayground';

// In your main portfolio component
<CyberpunkPlayground />
```

### 2. Add Trigger Button
```tsx
import { PlaygroundTrigger } from './features/cyberpunk-os/PlaygroundTrigger';

// Add anywhere in your portfolio
<PlaygroundTrigger />
```

## New Security Features

### Access Control System
- **Visitor Level**: Basic commands only
- **Administrator Level**: Full security operations
- Use `sudo elevate` to upgrade access

### Security Commands
- `scan network` - Network discovery simulation
- `system status` - Real-time metrics display
- `list devices` - IoT device inventory
- `ping esp32` - Device connectivity test
- `view logs` - System log display
- `enable firewall` - Activate security monitoring
- `security scan` - Comprehensive security audit
- `show attack simulation` - DDoS mitigation demo

### Visual Enhancements
- **Firewall Active**: Red border glow + grid intensity increase
- **AI Response**: Grid pulse animation with cyan glow
- **Intrusion Detection**: Random security alerts when firewall is active
- **Smooth Animations**: Framer Motion transitions for all interactions

## Styling
The sandbox uses your existing Tailwind CSS setup with:
- Matte black background
- Cyan primary text (#00bcd4)
- Red alerts for security warnings
- Clean, minimal cyberpunk aesthetic

## Performance
- Capped terminal history at 200 entries
- Efficient state management with React hooks
- No heavy 3D libraries or canvas rendering
- Production-ready TypeScript implementation

## Usage
1. Click the floating trigger button
2. Terminal opens with boot sequence
3. Type `help` to see all commands
4. Use `sudo elevate` to unlock advanced features
5. Try `enable firewall` and `security scan` for full experience

The sandbox is completely modular and won't interfere with your existing portfolio functionality.