// Demo component to test the Cyberpunk OS Playground
// This can be used for testing or as a standalone demo page

import { CyberpunkPlayground, PlaygroundTrigger } from './CyberpunkPlayground';

export function CyberpunkPlaygroundDemo() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          🚀 Cyberpunk OS Playground Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Button Trigger */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Button Trigger</h3>
            <p className="text-gray-300 mb-4">
              Standard button with cyberpunk styling
            </p>
            <PlaygroundTrigger variant="button" />
          </div>

          {/* Icon Trigger */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Icon Trigger</h3>
            <p className="text-gray-300 mb-4">
              Compact icon button for minimal UI
            </p>
            <PlaygroundTrigger variant="icon" />
          </div>

          {/* Text Trigger */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Text Trigger</h3>
            <p className="text-gray-300 mb-4">
              Simple text link with hover effects
            </p>
            <PlaygroundTrigger variant="text">
              🖥️ Launch Terminal
            </PlaygroundTrigger>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-900/30 p-8 rounded-lg border border-cyan-500/20 mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">✨ Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-green-400 mb-2">🪟 Window Management</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Draggable floating window</li>
                <li>• Minimize/Maximize controls</li>
                <li>• Smooth animations</li>
                <li>• Responsive sizing</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-green-400 mb-2">⚡ Terminal Engine</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Full CLI with commands</li>
                <li>• Command history (↑/↓)</li>
                <li>• Tab completion</li>
                <li>• Boot sequence animation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-green-400 mb-2">🤖 AI Integration</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• WebSocket connection</li>
                <li>• Typewriter animations</li>
                <li>• Grid pulse effects</li>
                <li>• Real-time chat</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-green-400 mb-2">🎨 Visual Effects</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Animated background grid</li>
                <li>• Cyberpunk styling</li>
                <li>• Scan line effects</li>
                <li>• Glow animations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Commands */}
        <div className="bg-gray-900/30 p-8 rounded-lg border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">⌨️ Available Commands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'help', 'whoami', 'stack', 'experience', 
              'architecture', 'iot', 'deploy', 'connect ai',
              'disconnect ai', 'clear', 'exit'
            ].map((command) => (
              <div key={command} className="bg-black/50 px-3 py-2 rounded border border-cyan-500/30">
                <code className="text-cyan-400">{command}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Click any trigger above to launch the Cyberpunk OS Playground
          </p>
          <p className="text-sm text-gray-500">
            Try commands like <code className="text-cyan-400">help</code>, <code className="text-cyan-400">whoami</code>, or <code className="text-cyan-400">connect ai</code>
          </p>
        </div>
      </div>
    </div>
  );
}

// Standalone demo with provider
export function StandaloneCyberpunkDemo() {
  return (
    <CyberpunkPlayground showTrigger={false}>
      <CyberpunkPlaygroundDemo />
    </CyberpunkPlayground>
  );
}