export interface HistoryEntry {
  type: 'input' | 'output' | 'system' | 'error' | 'ai';
  value: string;
  timestamp: number;
}

export interface TerminalState {
  history: HistoryEntry[];
  currentInput: string;
  isAiMode: boolean;
  isBooting: boolean;
  wsConnection: WebSocket | null;
}

export type CommandAction = 
  | { type: 'OUTPUT'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'EXIT' }
  | { type: 'CONNECT_AI' }
  | { type: 'DISCONNECT_AI' }
  | { type: 'ANIMATE'; payload: { lines: string[]; delay?: number } }
  | { type: 'ANIMATE_FRAMES'; payload: { frames: Array<{content: string, delay?: number, color?: string}> } };

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[]) => CommandAction | Promise<CommandAction>;
}