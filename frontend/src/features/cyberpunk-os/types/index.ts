// Cyberpunk OS Playground Types
export type WindowMode = 'normal' | 'minimized' | 'maximized';

export interface WindowState {
  mode: WindowMode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isDragging: boolean;
}

export interface PlaygroundState {
  isActive: boolean;
  windowState: WindowState;
}

export interface TerminalEntry {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'ai';
  content: string;
  timestamp: number;
}

export interface CyberpunkTerminalState {
  entries: TerminalEntry[];
  currentInput: string;
  isAiMode: boolean;
  isBooting: boolean;
  wsConnection: WebSocket | null;
  commandHistory: string[];
  historyIndex: number;
  accessLevel: 'Visitor' | 'Administrator';
  isFirewallActive: boolean;
  isMonitoringActive: boolean;
  systemMetrics: SystemMetrics;
}

export interface CyberpunkCommand {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[], addEntry?: (entry: any) => void) => Promise<CommandResult> | CommandResult;
}

export type CommandResult = 
  | { type: 'output'; content: string }
  | { type: 'system'; content: string }
  | { type: 'error'; content: string }
  | { type: 'clear' }
  | { type: 'ai_connect' }
  | { type: 'ai_disconnect' }
  | { type: 'animated_output'; frames: AnimationFrame[] }
  | { type: 'exit' };

export interface AnimationFrame {
  content: string;
  delay?: number;
  type?: 'output' | 'system' | 'error' | 'ai';
}

export interface GridPulseState {
  isActive: boolean;
  intensity: number;
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsed: number;
  memoryTotal: number;
  activeConnections: number;
  redisLatency: number;
}

export interface SecurityEvent {
  id: string;
  timestamp: number;
  type: 'intrusion' | 'scan' | 'firewall';
  message: string;
  severity: 'low' | 'medium' | 'high';
}