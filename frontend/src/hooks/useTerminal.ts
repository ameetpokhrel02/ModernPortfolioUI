import { useState, useCallback, useRef } from 'react';
import type { HistoryEntry, TerminalState, CommandAction } from '@/lib/terminal/types';
import { findCommand, getCommandSuggestions } from '@/lib/terminal/commands';
import { useSystem } from '@/contexts/SystemContext';

export function useTerminal() {
    const { toggleSystemMode } = useSystem();
    const [state, setState] = useState<TerminalState>({
        history: [],
        currentInput: '',
        isAiMode: false,
        isBooting: true,
        wsConnection: null
    });

    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const wsRef = useRef<WebSocket | null>(null);

    const addToHistory = useCallback((entry: Omit<HistoryEntry, 'timestamp'>) => {
        setState(prev => ({
            ...prev,
            history: [...prev.history, { ...entry, timestamp: Date.now() }]
        }));
    }, []);

    const clearHistory = useCallback(() => {
        setState(prev => ({ ...prev, history: [] }));
    }, []);

    const setCurrentInput = useCallback((input: string) => {
        setState(prev => ({ ...prev, currentInput: input }));
    }, []);

    const setBooting = useCallback((isBooting: boolean) => {
        setState(prev => ({ ...prev, isBooting }));
    }, []);

    const connectAI = useCallback(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            addToHistory({
                type: 'output',
                value: 'AI: Already connected to AI assistant.'
            });
            return;
        }

        addToHistory({
            type: 'system',
            value: 'Establishing AI connection...'
        });

        const wsUrl = 'ws://localhost:8001/ws/chat/';
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
            setState(prev => ({ ...prev, isAiMode: true, wsConnection: wsRef.current }));
            addToHistory({
                type: 'system',
                value: '✅ AI: Connection established.'
            });
            addToHistory({
                type: 'ai',
                value: 'AI: Hello! I\'m Amit\'s AI assistant. I can help you learn about his work, skills, projects, and experience. What would you like to know?'
            });
            addToHistory({
                type: 'system',
                value: '💡 Tip: You\'re now in AI mode. All your messages will be sent to the AI. Type "disconnect ai" to return to terminal mode.'
            });
        };

        wsRef.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                addToHistory({
                    type: 'ai',
                    value: `AI: ${data.message}`
                });
            } catch (error) {
                addToHistory({
                    type: 'error',
                    value: 'AI: Error parsing response from AI assistant.'
                });
            }
        };

        wsRef.current.onclose = () => {
            setState(prev => ({ ...prev, isAiMode: false, wsConnection: null }));
            addToHistory({
                type: 'system',
                value: '🔌 AI: Connection closed.'
            });
        };

        wsRef.current.onerror = () => {
            setState(prev => ({ ...prev, isAiMode: false, wsConnection: null }));
            addToHistory({
                type: 'error',
                value: '❌ AI: Connection failed. Make sure the Django backend is running on localhost:8001.'
            });
            addToHistory({
                type: 'system',
                value: 'To start the backend: docker compose up --build -d'
            });
        };
    }, [addToHistory]);

    const disconnectAI = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        setState(prev => ({ ...prev, isAiMode: false, wsConnection: null }));
        addToHistory({
            type: 'system',
            value: '🔌 AI: Disconnected from AI assistant. Returning to terminal mode.'
        });
    }, [addToHistory]);

    const playAnimatedCommand = useCallback(async (frames: Array<{ content: string, delay?: number, color?: string }>) => {
        for (const frame of frames) {
            const entryType = frame.color === 'green' ? 'system' :
                frame.color === 'red' ? 'error' :
                    frame.color === 'yellow' ? 'ai' : 'output';

            addToHistory({
                type: entryType,
                value: frame.content
            });

            if (frame.delay) {
                await new Promise(resolve => setTimeout(resolve, frame.delay));
            }
        }
    }, [addToHistory]);

    const animateOutput = useCallback(async (lines: string[], delay = 100) => {
        for (const line of lines) {
            addToHistory({
                type: 'output',
                value: line
            });
            if (delay > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }, [addToHistory]);

    const executeCommand = useCallback(async (input: string) => {
        const trimmedInput = input.trim();

        if (!trimmedInput) return;

        // Add input to history
        addToHistory({
            type: 'input',
            value: `${state.isAiMode ? 'AI>' : '>'} ${trimmedInput}`
        });

        // Add to command history
        setCommandHistory(prev => [...prev, trimmedInput]);
        setHistoryIndex(-1);

        // If in AI mode, send to WebSocket
        if (state.isAiMode && wsRef.current?.readyState === WebSocket.OPEN) {
            // Check for disconnect command in AI mode
            if (trimmedInput.toLowerCase() === 'disconnect ai' || trimmedInput.toLowerCase() === 'exit ai') {
                disconnectAI();
                return;
            }

            // Send message to AI
            wsRef.current.send(JSON.stringify({ message: trimmedInput }));

            // Show typing indicator
            addToHistory({
                type: 'system',
                value: 'AI: Thinking...'
            });
            return;
        }

        // Find and execute command
        const command = findCommand(trimmedInput);

        if (!command) {
            const suggestions = getCommandSuggestions(trimmedInput.split(' ')[0]);
            let errorMessage = `❌ Command not recognized: "${trimmedInput}"`;

            if (suggestions.length > 0) {
                errorMessage += `\n\n💡 Did you mean: ${suggestions.join(', ')}?`;
            }

            errorMessage += '\n\nType "help" for available commands.';

            addToHistory({
                type: 'error',
                value: errorMessage
            });
            return;
        }

        try {
            const action: CommandAction = await command.execute(trimmedInput.split(' ').slice(1));

            switch (action.type) {
                case 'OUTPUT':
                    addToHistory({
                        type: 'output',
                        value: action.payload
                    });
                    break;

                case 'CLEAR':
                    clearHistory();
                    break;

                case 'EXIT':
                    addToHistory({
                        type: 'system',
                        value: '🚪 Exiting system mode...'
                    });
                    setTimeout(() => {
                        toggleSystemMode();
                    }, 1000);
                    break;

                case 'CONNECT_AI':
                    connectAI();
                    break;

                case 'DISCONNECT_AI':
                    disconnectAI();
                    break;

                case 'ANIMATE':
                    await animateOutput(action.payload.lines, action.payload.delay);
                    break;

                case 'ANIMATE_FRAMES':
                    await playAnimatedCommand(action.payload.frames);
                    break;
            }
        } catch (error) {
            addToHistory({
                type: 'error',
                value: `❌ Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`
            });
        }
    }, [state.isAiMode, addToHistory, clearHistory, toggleSystemMode, connectAI, disconnectAI, animateOutput]);

    const navigateHistory = useCallback((direction: 'up' | 'down') => {
        if (commandHistory.length === 0) return;

        let newIndex = historyIndex;

        if (direction === 'up') {
            newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        } else {
            newIndex = historyIndex === -1 ? -1 : Math.min(commandHistory.length - 1, historyIndex + 1);
        }

        setHistoryIndex(newIndex);

        if (newIndex === -1) {
            setCurrentInput('');
        } else {
            setCurrentInput(commandHistory[newIndex]);
        }
    }, [commandHistory, historyIndex, setCurrentInput]);

    const getAutoComplete = useCallback((input: string): string | null => {
        const suggestions = getCommandSuggestions(input);
        return suggestions.length > 0 ? suggestions[0] : null;
    }, []);

    return {
        ...state,
        executeCommand,
        setCurrentInput,
        setBooting,
        navigateHistory,
        getAutoComplete,
        addToHistory,
        playAnimatedCommand,
        cleanup: useCallback(() => {
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
        }, [])
    };
}