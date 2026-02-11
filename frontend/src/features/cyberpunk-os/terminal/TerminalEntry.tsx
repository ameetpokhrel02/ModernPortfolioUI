import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { TerminalEntry as TerminalEntryType } from '../types';

interface TerminalEntryProps {
  entry: TerminalEntryType;
}

export function TerminalEntry({ entry }: TerminalEntryProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect for AI responses
  useEffect(() => {
    if (entry.type === 'ai') {
      setIsTyping(true);
      setDisplayedContent('');
      
      const content = entry.content;
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < content.length) {
          setDisplayedContent(content.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 30); // Typing speed
      
      return () => clearInterval(typeInterval);
    } else {
      setDisplayedContent(entry.content);
      setIsTyping(false);
    }
  }, [entry.content, entry.type]);

  const getEntryStyles = () => {
    switch (entry.type) {
      case 'input':
        return 'text-white';
      case 'output':
        return 'text-gray-300';
      case 'system':
        return 'text-cyan-400';
      case 'error':
        return 'text-red-400';
      case 'ai':
        return 'text-green-400';
      default:
        return 'text-gray-300';
    }
  };

  const getEntryIcon = () => {
    switch (entry.type) {
      case 'input':
        return '>';
      case 'system':
        return '⚡';
      case 'error':
        return '❌';
      case 'ai':
        return '🤖';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`mb-1 ${getEntryStyles()}`}
    >
      <div className="flex items-start gap-2">
        {getEntryIcon() && (
          <span className="text-cyan-500 text-xs mt-0.5 w-4 flex-shrink-0">
            {getEntryIcon()}
          </span>
        )}
        <div className="flex-1 whitespace-pre-wrap break-words">
          {displayedContent}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-green-400"
            >
              ▋
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}