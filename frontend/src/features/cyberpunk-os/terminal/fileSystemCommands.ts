// Virtual File System Commands for Security Sandbox
// IMPORTANT: This is a SAFE client-side simulation only - NO real OS commands

import type { CyberpunkCommand } from '../types';
import {
  getCurrentDirectory,
  resolvePath,
  getFileSystemState,
  setCurrentPath,
  getFileAtPath,
  formatFileSize,
  generateTreeView,
  createDirectory,
  createFile,
  deleteFileOrDirectory,
  resetFileSystem
} from './virtualFileSystem';

// File System Commands
export const fileSystemCommands: Record<string, CyberpunkCommand> = {
  ls: {
    name: 'ls',
    description: 'List directory contents',
    aliases: ['dir'],
    execute: (args) => {
      const currentDir = getCurrentDirectory();
      const showAll = args.includes('-a') || args.includes('--all');
      const longFormat = args.includes('-l') || args.includes('--long');
      
      if (!currentDir.children) {
        return {
          type: 'error',
          content: '❌ Not a directory'
        };
      }

      const entries = Object.values(currentDir.children);
      
      if (entries.length === 0) {
        return {
          type: 'output',
          content: '📁 Directory is empty'
        };
      }

      if (longFormat) {
        const lines = ['total ' + entries.length];
        entries.forEach(entry => {
          const permissions = entry.permissions || '-rw-r--r--';
          const size = formatFileSize(entry.size);
          const modified = entry.modified || '2025-01-15 12:00';
          const icon = entry.type === 'directory' ? '📁' : '📄';
          const userMark = entry.isUserCreated ? ' *' : '';
          
          lines.push(`${permissions} 1 user user ${size.padStart(8)} ${modified} ${icon} ${entry.name}${userMark}`);
        });
        
        return {
          type: 'output',
          content: lines.join('\n')
        };
      }

      // Simple format
      const items = entries.map(entry => {
        const icon = entry.type === 'directory' ? '📁' : '📄';
        const userMark = entry.isUserCreated ? '*' : '';
        return `${icon} ${entry.name}${userMark}`;
      });

      return {
        type: 'output',
        content: items.join('  ')
      };
    }
  },

  cd: {
    name: 'cd',
    description: 'Change directory',
    execute: (args) => {
      if (args.length === 0) {
        // Go to root
        setCurrentPath('/');
        return {
          type: 'system',
          content: '📁 Changed to root directory'
        };
      }

      const targetPath = args[0];
      const resolvedPath = resolvePath(targetPath);
      const targetDir = getFileAtPath(resolvedPath);

      if (!targetDir) {
        return {
          type: 'error',
          content: `❌ Directory not found: ${targetPath}`
        };
      }

      if (targetDir.type !== 'directory') {
        return {
          type: 'error',
          content: `❌ Not a directory: ${targetPath}`
        };
      }

      setCurrentPath(resolvedPath);
      const displayPath = resolvedPath === '/' ? '/' : resolvedPath;
      
      return {
        type: 'system',
        content: `📁 Changed directory to: ${displayPath}`
      };
    }
  },

  pwd: {
    name: 'pwd',
    description: 'Print working directory',
    execute: () => {
      const currentPath = getFileSystemState().currentPath;
      return {
        type: 'output',
        content: `📍 Current directory: ${currentPath}`
      };
    }
  },

  cat: {
    name: 'cat',
    description: 'Display file contents',
    aliases: ['type', 'more'],
    execute: (args) => {
      if (args.length === 0) {
        return {
          type: 'error',
          content: '❌ Usage: cat <filename>'
        };
      }

      const filename = args[0];
      const file = getFileAtPath(resolvePath(filename));

      if (!file) {
        return {
          type: 'error',
          content: `❌ File not found: ${filename}`
        };
      }

      if (file.type === 'directory') {
        return {
          type: 'error',
          content: `❌ ${filename} is a directory`
        };
      }

      if (!file.content) {
        return {
          type: 'output',
          content: '📄 File is empty'
        };
      }

      return {
        type: 'output',
        content: `📄 ${filename}:\n\n${file.content}`
      };
    }
  },

  tree: {
    name: 'tree',
    description: 'Display directory tree structure',
    execute: (args) => {
      const showAll = args.includes('-a');
      const maxDepth = args.includes('-L') ? parseInt(args[args.indexOf('-L') + 1]) || 3 : undefined;
      
      const treeOutput = generateTreeView();
      
      return {
        type: 'output',
        content: `🌳 Directory Tree Structure:\n\n${treeOutput}\n\n📊 File system contains projects, infrastructure docs, logs, and IoT device configs.\n💡 Files marked with * are user-created and can be deleted.`
      };
    }
  },

  mkdir: {
    name: 'mkdir',
    description: 'Create directory',
    execute: (args) => {
      if (args.length === 0) {
        return {
          type: 'error',
          content: '❌ Usage: mkdir <directory_name>'
        };
      }

      const dirName = args[0];
      const result = createDirectory(dirName);

      return {
        type: result.success ? 'system' : 'error',
        content: result.success ? `📁 ${result.message}` : `❌ ${result.message}`
      };
    }
  },

  touch: {
    name: 'touch',
    description: 'Create empty file',
    execute: (args) => {
      if (args.length === 0) {
        return {
          type: 'error',
          content: '❌ Usage: touch <filename>'
        };
      }

      const fileName = args[0];
      const result = createFile(fileName, '');

      return {
        type: result.success ? 'system' : 'error',
        content: result.success ? `📄 ${result.message}` : `❌ ${result.message}`
      };
    }
  },

  rm: {
    name: 'rm',
    description: 'Remove file or directory',
    aliases: ['del', 'delete'],
    execute: (args) => {
      if (args.length === 0) {
        return {
          type: 'error',
          content: '❌ Usage: rm <filename_or_directory>'
        };
      }

      const name = args[0];
      
      // Safety check for dangerous operations
      if (name === '/' || name === '.' || name === '..') {
        return {
          type: 'error',
          content: '❌ Cannot delete system directories'
        };
      }

      const result = deleteFileOrDirectory(name);

      return {
        type: result.success ? 'system' : 'error',
        content: result.success ? `🗑️  ${result.message}` : `❌ ${result.message}`
      };
    }
  },

  reset: {
    name: 'reset',
    description: 'Reset file system to initial state',
    execute: () => {
      resetFileSystem();
      return {
        type: 'system',
        content: '🔄 File system reset to initial state. All user-created files and directories have been removed.'
      };
    }
  },

  find: {
    name: 'find',
    description: 'Search for files and directories',
    execute: (args) => {
      if (args.length === 0) {
        return {
          type: 'error',
          content: '❌ Usage: find <pattern>'
        };
      }

      const pattern = args[0].toLowerCase();
      const results: string[] = [];

      const searchNode = (node: any, currentPath: string) => {
        if (node.name.toLowerCase().includes(pattern)) {
          const fullPath = currentPath === '/' ? `/${node.name}` : `${currentPath}/${node.name}`;
          const icon = node.type === 'directory' ? '📁' : '📄';
          const userMark = node.isUserCreated ? ' *' : '';
          results.push(`${icon} ${fullPath}${userMark}`);
        }

        if (node.children) {
          Object.values(node.children).forEach((child: any) => {
            const childPath = currentPath === '/' ? `/${child.name}` : `${currentPath}/${child.name}`;
            searchNode(child, currentPath);
          });
        }
      };

      const currentFileSystem = getFileSystemState().fileSystem;
      searchNode(currentFileSystem, '');

      if (results.length === 0) {
        return {
          type: 'output',
          content: `🔍 No files found matching: ${pattern}`
        };
      }

      return {
        type: 'output',
        content: `🔍 Search results for "${pattern}":\n\n${results.join('\n')}\n\n📊 Found ${results.length} matches`
      };
    }
  },

  grep: {
    name: 'grep',
    description: 'Search text within files',
    execute: (args) => {
      if (args.length < 2) {
        return {
          type: 'error',
          content: '❌ Usage: grep <pattern> <filename>'
        };
      }

      const pattern = args[0].toLowerCase();
      const filename = args[1];
      const file = getFileAtPath(resolvePath(filename));

      if (!file) {
        return {
          type: 'error',
          content: `❌ File not found: ${filename}`
        };
      }

      if (file.type === 'directory') {
        return {
          type: 'error',
          content: `❌ ${filename} is a directory`
        };
      }

      if (!file.content) {
        return {
          type: 'output',
          content: '📄 File is empty'
        };
      }

      const lines = file.content.split('\n');
      const matches: string[] = [];

      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(pattern)) {
          matches.push(`${(index + 1).toString().padStart(3)}: ${line}`);
        }
      });

      if (matches.length === 0) {
        return {
          type: 'output',
          content: `🔍 No matches found for "${pattern}" in ${filename}`
        };
      }

      return {
        type: 'output',
        content: `🔍 Matches for "${pattern}" in ${filename}:\n\n${matches.join('\n')}\n\n📊 Found ${matches.length} matches`
      };
    }
  },

  head: {
    name: 'head',
    description: 'Display first lines of a file',
    execute: (args) => {
      if (args.length === 0) {
        return {
          type: 'error',
          content: '❌ Usage: head <filename> [-n lines]'
        };
      }

      const filename = args[0];
      const lineCount = args.includes('-n') ? parseInt(args[args.indexOf('-n') + 1]) || 10 : 10;
      const file = getFileAtPath(resolvePath(filename));

      if (!file) {
        return {
          type: 'error',
          content: `❌ File not found: ${filename}`
        };
      }

      if (file.type === 'directory') {
        return {
          type: 'error',
          content: `❌ ${filename} is a directory`
        };
      }

      if (!file.content) {
        return {
          type: 'output',
          content: '📄 File is empty'
        };
      }

      const lines = file.content.split('\n').slice(0, lineCount);
      
      return {
        type: 'output',
        content: `📄 First ${lineCount} lines of ${filename}:\n\n${lines.join('\n')}`
      };
    }
  },

  tail: {
    name: 'tail',
    description: 'Display last lines of a file',
    execute: (args) => {
      if (args.length === 0) {
        return {
          type: 'error',
          content: '❌ Usage: tail <filename> [-n lines]'
        };
      }

      const filename = args[0];
      const lineCount = args.includes('-n') ? parseInt(args[args.indexOf('-n') + 1]) || 10 : 10;
      const file = getFileAtPath(resolvePath(filename));

      if (!file) {
        return {
          type: 'error',
          content: `❌ File not found: ${filename}`
        };
      }

      if (file.type === 'directory') {
        return {
          type: 'error',
          content: `❌ ${filename} is a directory`
        };
      }

      if (!file.content) {
        return {
          type: 'output',
          content: '📄 File is empty'
        };
      }

      const lines = file.content.split('\n').slice(-lineCount);
      
      return {
        type: 'output',
        content: `📄 Last ${lineCount} lines of ${filename}:\n\n${lines.join('\n')}`
      };
    }
  },

  wc: {
    name: 'wc',
    description: 'Count lines, words, and characters in files',
    execute: (args) => {
      if (args.length === 0) {
        return {
          type: 'error',
          content: '❌ Usage: wc <filename>'
        };
      }

      const filename = args[0];
      const file = getFileAtPath(resolvePath(filename));

      if (!file) {
        return {
          type: 'error',
          content: `❌ File not found: ${filename}`
        };
      }

      if (file.type === 'directory') {
        return {
          type: 'error',
          content: `❌ ${filename} is a directory`
        };
      }

      if (!file.content) {
        return {
          type: 'output',
          content: `📊 ${filename}: 0 lines, 0 words, 0 characters`
        };
      }

      const lines = file.content.split('\n').length;
      const words = file.content.split(/\s+/).filter(word => word.length > 0).length;
      const characters = file.content.length;

      return {
        type: 'output',
        content: `📊 ${filename}: ${lines} lines, ${words} words, ${characters} characters`
      };
    }
  },

  file: {
    name: 'file',
    description: 'Determine file type',
    execute: (args) => {
      if (args.length === 0) {
        return {
          type: 'error',
          content: '❌ Usage: file <filename>'
        };
      }

      const filename = args[0];
      const file = getFileAtPath(resolvePath(filename));

      if (!file) {
        return {
          type: 'error',
          content: `❌ File not found: ${filename}`
        };
      }

      let fileType = '';
      if (file.type === 'directory') {
        fileType = 'directory';
      } else {
        const extension = filename.split('.').pop()?.toLowerCase();
        switch (extension) {
          case 'txt':
            fileType = 'ASCII text';
            break;
          case 'md':
            fileType = 'Markdown document';
            break;
          case 'log':
            fileType = 'log file';
            break;
          case 'sh':
            fileType = 'shell script';
            break;
          default:
            fileType = 'text file';
        }
      }

      return {
        type: 'output',
        content: `📄 ${filename}: ${fileType}`
      };
    }
  },

  echo: {
    name: 'echo',
    description: 'Create file with content or display text',
    execute: (args) => {
      if (args.length === 0) {
        return {
          type: 'output',
          content: ''
        };
      }

      // Check if using redirection (echo "content" > filename)
      const redirectIndex = args.indexOf('>');
      if (redirectIndex > 0 && redirectIndex < args.length - 1) {
        const content = args.slice(0, redirectIndex).join(' ').replace(/^["']|["']$/g, '');
        const filename = args[redirectIndex + 1];
        
        const result = createFile(filename, content);
        return {
          type: result.success ? 'system' : 'error',
          content: result.success ? `📄 ${result.message}` : `❌ ${result.message}`
        };
      }

      // Regular echo - just display the text
      const text = args.join(' ').replace(/^["']|["']$/g, '');
      return {
        type: 'output',
        content: text
      };
    }
  },

  // Test command to verify merging works
  testcmd: {
    name: 'testcmd',
    description: 'Test command to verify file system integration',
    execute: () => ({
      type: 'system',
      content: '✅ File system commands are properly integrated!'
    })
  }
};

// Export command names for integration
export const fileSystemCommandNames = Object.keys(fileSystemCommands);

// Debug: Log all file system commands
console.log('File System Commands:', fileSystemCommandNames);
console.log('mkdir command exists:', 'mkdir' in fileSystemCommands);
console.log('cd command exists:', 'cd' in fileSystemCommands);