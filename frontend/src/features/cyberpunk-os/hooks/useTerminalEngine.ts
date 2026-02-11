import { useState, useCallback, useRef, useEffect } from 'react';
import type { CyberpunkTerminalState, TerminalEntry, CommandResult } from '../types';
import { findCyberpunkCommand, getCyberpunkCommandSuggestions, bootSequence, syncSystemState, getSystemState } from '../terminal/commands';
import { usePlayground } from '../context/PlaygroundContext';

const MAX_HISTORY = 200;

export function useTerminalEngine() {
  const { closePlayground } = usePlayground();
  const [state, setState] = useState<CyberpunkTerminalState>({
    entries: [],
    currentInput: '',
    isAiMode: false,
    isBooting: true,
    wsConnection: null,
    commandHistory: [],
    historyIndex: -1,
    accessLevel: 'Visitor',
    isFirewallActive: false,
    isMonitoringActive: false,
    systemMetrics: {
      cpuUsage: 0,
      memoryUsed: 0,
      memoryTotal: 8,
      activeConnections: 0,
      redisLatency: 0,
    },
  });

  const wsRef = useRef<WebSocket | null>(null);
  const entryIdCounter = useRef(0);

  // Generate unique entry ID
  const generateEntryId = useCallback(() => {
    return `entry-${Date.now()}-${++entryIdCounter.current}`;
  }, []);

  // Add entry to terminal
  const addEntry = useCallback((entry: Omit<TerminalEntry, 'id' | 'timestamp'>) => {
    setState(prev => {
      const newEntry: TerminalEntry = {
        ...entry,
        id: generateEntryId(),
        timestamp: Date.now(),
      };

      const newEntries = [...prev.entries, newEntry];
      
      // Keep history capped
      if (newEntries.length > MAX_HISTORY) {
        newEntries.splice(0, newEntries.length - MAX_HISTORY);
      }

      return {
        ...prev,
        entries: newEntries,
      };
    });
  }, [generateEntryId]);

  // Clear terminal
  const clearTerminal = useCallback(() => {
    setState(prev => ({ ...prev, entries: [] }));
  }, []);

  // Set current input
  const setCurrentInput = useCallback((input: string) => {
    setState(prev => ({ ...prev, currentInput: input }));
  }, []);

  // Boot sequence
  const runBootSequence = useCallback(async () => {
    setState(prev => ({ ...prev, isBooting: true, entries: [] }));
    
    for (const frame of bootSequence) {
      addEntry({
        type: frame.type || 'output',
        content: frame.content,
      });
      
      if (frame.delay) {
        await new Promise(resolve => setTimeout(resolve, frame.delay));
      }
    }
    
    setState(prev => ({ ...prev, isBooting: false }));
  }, [addEntry]);

  // Connect to AI
  const connectAI = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      addEntry({
        type: 'system',
        content: '🤖 AI: Already connected to AI assistant.',
      });
      return;
    }

    addEntry({
      type: 'system',
      content: '🔌 Establishing AI connection...',
    });

    const wsUrl = 'ws://localhost:8001/ws/chat/';
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      setState(prev => ({ ...prev, isAiMode: true, wsConnection: wsRef.current }));
      addEntry({
        type: 'system',
        content: '✅ AI: Connection established.',
      });
      addEntry({
        type: 'ai',
        content: '🤖 AI: Hello! I\'m your cyberpunk assistant. Ask me anything about Amit\'s work!',
      });
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        addEntry({
          type: 'ai',
          content: `🤖 AI: ${data.message}`,
        });
      } catch (error) {
        addEntry({
          type: 'error',
          content: '❌ AI: Error parsing response.',
        });
      }
    };

    wsRef.current.onclose = () => {
      setState(prev => ({ ...prev, isAiMode: false, wsConnection: null }));
      addEntry({
        type: 'system',
        content: '🔌 AI: Connection closed.',
      });
    };

    wsRef.current.onerror = () => {
      setState(prev => ({ ...prev, isAiMode: false, wsConnection: null }));
      addEntry({
        type: 'error',
        content: '❌ AI: Connection failed. Backend may be offline.',
      });
    };
  }, [addEntry]);

  // Disconnect AI
  const disconnectAI = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setState(prev => ({ ...prev, isAiMode: false, wsConnection: null }));
    addEntry({
      type: 'system',
      content: '🔌 AI: Disconnected. Returning to terminal mode.',
    });
  }, [addEntry]);

  // Execute animated output
  const executeAnimatedOutput = useCallback(async (frames: any[]) => {
    for (const frame of frames) {
      addEntry({
        type: frame.type || 'output',
        content: frame.content,
      });
      
      if (frame.delay) {
        await new Promise(resolve => setTimeout(resolve, frame.delay));
      }
    }
  }, [addEntry]);

  // Sync system state after command execution
  const syncStateFromCommands = useCallback(() => {
    const commandState = getSystemState();
    setState(prev => ({
      ...prev,
      accessLevel: commandState.accessLevel,
      isFirewallActive: commandState.isFirewallActive,
      isMonitoringActive: commandState.isMonitoringActive,
    }));
  }, []);

  // Execute command
  const executeCommand = useCallback(async (input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add input to terminal
    addEntry({
      type: 'input',
      content: `${state.isAiMode ? 'AI>' : '>'} ${trimmedInput}`,
    });

    // Add to command history
    setState(prev => ({
      ...prev,
      commandHistory: [...prev.commandHistory, trimmedInput],
      historyIndex: -1,
    }));

    // Handle AI mode
    if (state.isAiMode) {
      if (trimmedInput.toLowerCase() === 'disconnect ai' || trimmedInput.toLowerCase() === 'exit ai') {
        disconnectAI();
        return;
      }

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ message: trimmedInput }));
        addEntry({
          type: 'system',
          content: '🤖 AI: Processing...',
        });
      } else {
        addEntry({
          type: 'error',
          content: '❌ AI: Not connected. Use "connect ai" first.',
        });
      }
      return;
    }

    // Find and execute command
    const command = findCyberpunkCommand(trimmedInput);
    
    if (!command) {
      const suggestions = getCyberpunkCommandSuggestions(trimmedInput.split(' ')[0]);
      let errorMessage = `❌ Command not found: "${trimmedInput}"`;
      
      if (suggestions.length > 0) {
        errorMessage += `\n\n💡 Did you mean: ${suggestions.join(', ')}?`;
      }
      
      errorMessage += '\n\nType "help" for available commands.';
      
      addEntry({
        type: 'error',
        content: errorMessage,
      });
      return;
    }

    try {
      const result: CommandResult = await command.execute(trimmedInput.split(' ').slice(1), addEntry);
      
      // Sync state after command execution
      syncStateFromCommands();
      
      switch (result.type) {
        case 'output':
        case 'system':
        case 'error':
          addEntry({
            type: result.type,
            content: result.content,
          });
          break;
          
        case 'clear':
          clearTerminal();
          break;
          
        case 'ai_connect':
          connectAI();
          break;
          
        case 'ai_disconnect':
          disconnectAI();
          break;
          
        case 'animated_output':
          await executeAnimatedOutput(result.frames);
          break;
          
        case 'exit':
          addEntry({
            type: 'system',
            content: '🚪 Closing Interactive Security Sandbox...',
          });
          setTimeout(() => {
            closePlayground();
          }, 1000);
          break;
      }
    } catch (error) {
      addEntry({
        type: 'error',
        content: `❌ Command error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }, [state.isAiMode, addEntry, clearTerminal, connectAI, disconnectAI, executeAnimatedOutput, closePlayground]);

  // Navigate command history
  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    setState(prev => {
      if (prev.commandHistory.length === 0) return prev;

      let newIndex = prev.historyIndex;
      
      if (direction === 'up') {
        newIndex = prev.historyIndex === -1 
          ? prev.commandHistory.length - 1 
          : Math.max(0, prev.historyIndex - 1);
      } else {
        newIndex = prev.historyIndex === -1 
          ? -1 
          : Math.min(prev.commandHistory.length - 1, prev.historyIndex + 1);
      }

      const newInput = newIndex === -1 ? '' : prev.commandHistory[newIndex];

      return {
        ...prev,
        historyIndex: newIndex,
        currentInput: newInput,
      };
    });
  }, []);

  // Get command suggestions
  const getCommandSuggestions = useCallback((input: string): string[] => {
    return getCyberpunkCommandSuggestions(input);
  }, []);

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Run boot sequence on mount
  useEffect(() => {
    runBootSequence();
  }, [runBootSequence]);

  return {
    ...state,
    executeCommand,
    setCurrentInput,
    navigateHistory,
    getCommandSuggestions,
    clearTerminal,
    connectAI,
    disconnectAI,
  };
}