# 🚀 Cyberpunk OS Playground

An experimental interactive terminal playground feature for your React portfolio. This modular feature provides a floating, draggable cyberpunk-style terminal window with AI integration.

## ✨ Features

- **Floating Window**: Draggable terminal window with minimize/maximize controls
- **Terminal Engine**: Full CLI with command registry and history
- **AI Integration**: WebSocket connection to your Django backend
- **Animations**: Framer Motion animations with typewriter effects
- **Grid Effects**: Animated background grid with pulse effects
- **Clean Architecture**: Modular, TypeScript-safe, removable

## 🏗️ Architecture

```
features/cyberpunk-os/
├── context/           # React context for state management
├── overlay/           # Overlay components
├── window/            # Window management components
├── terminal/          # Terminal engine and UI
├── ai/                # AI integration utilities
├── hooks/             # Custom hooks
├── types/             # TypeScript definitions
└── index.ts           # Main exports
```

## 🚀 Quick Integration

### 1. Add Provider to Your App

```tsx
// src/App.tsx or your root component
import { PlaygroundProvider, PlaygroundOverlay } from '@/features/cyberpunk-os';

function App() {
  return (
    <PlaygroundProvider>
      {/* Your existing app content */}
      <YourPortfolioContent />
      
      {/* Add the playground overlay */}
      <PlaygroundOverlay />
    </PlaygroundProvider>
  );
}
```

### 2. Add Trigger Button

```tsx
// In any component where you want the trigger
import { PlaygroundTrigger } from '@/features/cyberpunk-os';

function SomeSection() {
  return (
    <div>
      {/* Your content */}
      
      {/* Add trigger button */}
      <PlaygroundTrigger variant="button" />
      
      {/* Or as an icon */}
      <PlaygroundTrigger variant="icon" />
      
      {/* Or custom content */}
      <PlaygroundTrigger variant="text">
        🖥️ Launch Terminal
      </PlaygroundTrigger>
    </div>
  );
}
```

### 3. That's It!

The playground is now integrated and ready to use. Users can:
- Click the trigger to open the terminal
- Drag the window around
- Use minimize/maximize controls
- Execute commands like `help`, `whoami`, `stack`, etc.
- Connect to AI with `connect ai`

## 🎮 Available Commands

- `help` - Show all commands
- `whoami` - User information
- `stack` - Technology stack
- `experience` - Work experience
- `architecture` - Animated system architecture
- `iot` - IoT expertise
- `deploy` - Deployment pipeline
- `connect ai` - Connect to AI assistant
- `disconnect ai` - Exit AI mode
- `clear` - Clear terminal
- `exit` - Close playground

## 🎨 Window Modes

### Normal Mode (700x500)
- Draggable window
- Standard size
- Full functionality

### Minimized Mode (250x40)
- Moves to bottom-right corner
- Shows only title bar
- Click to restore

### Maximized Mode (90% viewport)
- Fills most of the screen
- Drag disabled
- Click maximize again to restore

## 🤖 AI Integration

The playground connects to your existing Django WebSocket endpoint:
- URL: `ws://localhost:8001/ws/chat/`
- Uses your existing chat consumer
- Typewriter animation for AI responses
- Grid pulse effect on AI messages

## 🎭 Animations

### Boot Sequence
- Plays when terminal first opens
- System initialization messages
- Cyberpunk-style loading

### Typewriter Effect
- AI responses type out character by character
- Configurable speed (30ms per character)
- Blinking cursor during typing

### Grid Pulse
- Triggers on AI responses
- Cyan glow effect
- 400ms duration
- Automatic reset

### Window Transitions
- Smooth spring animations
- Scale and position transitions
- Framer Motion powered

## 🔧 Customization

### Adding New Commands

```tsx
// In terminal/commands.ts
export const cyberpunkCommands: Record<string, CyberpunkCommand> = {
  // ... existing commands
  
  mycommand: {
    name: 'mycommand',
    description: 'My custom command',
    execute: () => ({
      type: 'output',
      content: 'Hello from my command!'
    })
  }
};
```

### Custom Animations

```tsx
// Create animated command
myanimated: {
  name: 'myanimated',
  description: 'Animated output',
  execute: () => ({
    type: 'animated_output',
    frames: [
      { content: 'Frame 1', delay: 500, type: 'system' },
      { content: 'Frame 2', delay: 300, type: 'output' },
    ]
  })
}
```

### Styling

The playground uses Tailwind CSS with cyberpunk theme:
- Primary: Cyan (`cyan-400`, `cyan-500`)
- Secondary: Purple (`purple-500`)
- Background: Black with transparency
- Borders: Cyan with low opacity

## 📱 Responsive Design

- Window automatically centers on open
- Respects viewport boundaries
- Minimum/maximum sizes enforced
- Touch-friendly controls

## 🔒 Performance

- History capped at 200 entries
- Efficient re-render prevention
- Clean component separation
- WebSocket cleanup on unmount
- No heavy 3D libraries

## 🧪 Testing

The playground is designed to be:
- **Non-intrusive**: Doesn't affect existing portfolio
- **Removable**: Can be easily disabled/removed
- **Isolated**: Self-contained with no external dependencies
- **Safe**: Error boundaries and fallbacks

## 🚫 Removal

To remove the playground:

1. Remove `<PlaygroundProvider>` and `<PlaygroundOverlay>` from your app
2. Remove trigger components
3. Delete the `features/cyberpunk-os/` folder

No other changes needed - your portfolio remains unchanged.

## 🐛 Troubleshooting

### WebSocket Connection Issues
- Ensure Django backend is running on port 8001
- Check WebSocket endpoint: `ws://localhost:8001/ws/chat/`
- Verify CORS settings in Django

### Window Not Dragging
- Check if window is in 'normal' mode
- Minimized/maximized windows disable dragging
- Ensure proper mouse event handling

### Commands Not Working
- Check command registry in `terminal/commands.ts`
- Verify command name and aliases
- Check for typos in command execution

## 🎯 Future Enhancements

- File system simulation
- Code editor integration
- Network monitoring tools
- System resource display
- Custom themes
- Sound effects
- Multi-tab support

---

**Built with**: React 19, TypeScript, Framer Motion, Tailwind CSS
**Compatible with**: Your existing portfolio structure
**Status**: Experimental feature - ready for production use