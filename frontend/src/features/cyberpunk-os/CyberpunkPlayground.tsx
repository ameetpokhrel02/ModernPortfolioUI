// Main Cyberpunk OS Playground Component
// This is a complete, ready-to-use component that includes everything

import { PlaygroundProvider, PlaygroundOverlay, PlaygroundTrigger } from './index';

interface CyberpunkPlaygroundProps {
  children?: React.ReactNode;
  showTrigger?: boolean;
  triggerVariant?: 'button' | 'icon' | 'text';
  triggerClassName?: string;
  triggerContent?: React.ReactNode;
}

/**
 * Complete Cyberpunk OS Playground component
 * 
 * Usage:
 * ```tsx
 * // Minimal usage
 * <CyberpunkPlayground />
 * 
 * // With custom trigger
 * <CyberpunkPlayground 
 *   triggerVariant="icon"
 *   triggerContent="🖥️"
 * />
 * 
 * // Wrap your app
 * <CyberpunkPlayground>
 *   <YourApp />
 * </CyberpunkPlayground>
 * ```
 */
export function CyberpunkPlayground({
  children,
  showTrigger = true,
  triggerVariant = 'button',
  triggerClassName = '',
  triggerContent,
}: CyberpunkPlaygroundProps) {
  return (
    <PlaygroundProvider>
      {children}
      
      {showTrigger && (
        <div className="fixed bottom-6 right-6 z-30">
          <PlaygroundTrigger 
            variant={triggerVariant}
            className={triggerClassName}
          >
            {triggerContent}
          </PlaygroundTrigger>
        </div>
      )}
      
      <PlaygroundOverlay />
    </PlaygroundProvider>
  );
}

// Export everything for convenience
export * from './index';