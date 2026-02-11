import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !wsRef.current) {
      connectWebSocket();
    }
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [isOpen]);

  const connectWebSocket = () => {
    const wsUrl = `ws://localhost:8001/ws/chat/`;
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connected');
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setIsTyping(false);
      
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        message: data.message,
        timestamp: data.timestamp || new Date().toISOString()
      };
      
      setMessages(prev => [...prev, newMessage]);
    };

    wsRef.current.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || !wsRef.current || !isConnected) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    wsRef.current.send(JSON.stringify({
      message: inputMessage
    }));

    setInputMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out">
      {/* Chat Button */}
      {!isOpen && (
        <div className="animate-bounce-in">
          <button
            onClick={toggleChat}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none"
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-2xl border transition-all duration-300 transform ${
          isMinimized ? 'w-80 h-16' : 'w-80 h-96'
        } ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} />
              <span className="font-medium">Chat with Amit's AI</span>
              {!isConnected && (
                <span className="text-xs bg-red-500 px-2 py-1 rounded animate-pulse">Offline</span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={toggleMinimize}
                className="hover:bg-blue-700 p-1 rounded transition-colors duration-200"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={toggleChat}
                className="hover:bg-blue-700 p-1 rounded transition-colors duration-200"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-${message.type === 'user' ? 'right' : 'left'}-2 duration-300`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:shadow-md ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.message}</div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start animate-in slide-in-from-left-2 duration-300">
                    <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Amit's skills, projects..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                    disabled={!isConnected}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || !isConnected}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}