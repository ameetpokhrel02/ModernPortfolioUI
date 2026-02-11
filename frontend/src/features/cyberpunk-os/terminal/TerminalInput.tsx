import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getFileSystemState } from './virtualFileSystem';

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  isAiMode: boolean;
  isFocused: boolean;
}

export function TerminalInput({
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  isAiMode,
  isFocused,
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const currentPath = getFileSystemState().currentPath;
  const displayPath = currentPath === '/' ? '~' : currentPath.replace(/^\//, '~/');
  const prompt = isAiMode ? 'AI>' : `${displayPath} $`;
  const promptColor = isAiMode ? 'text-green-400' : 'text-cyan-400';

  return (
    <div className="flex items-center gap-2 p-4 font-mono text-sm">
      {/* Prompt */}
      <motion.span
        className={`${promptColor} flex-shrink-0`}
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {prompt}
      </motion.span>

      {/* Input Field */}
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full bg-transparent text-white outline-none border-none"
          placeholder={isAiMode ? 'Ask me anything...' : 'Type a command...'}
          autoComplete="off"
          spellCheck={false}
        />
        
        {/* Cursor */}
        {isFocused && (
          <motion.div
            className="absolute top-0 bg-cyan-400 w-2 h-5"
            style={{ left: `${value.length * 0.6}em` }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </div>

      {/* Status Indicator */}
      <div className="flex items-center gap-2 text-xs">
        {isAiMode && (
          <motion.div
            className="flex items-center gap-1 text-green-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span>AI</span>
          </motion.div>
        )}
        
        <div className="text-gray-500">
          {isAiMode ? 'ESC to clear' : 'TAB to complete'}
        </div>
      </div>
    </div>
  );
}