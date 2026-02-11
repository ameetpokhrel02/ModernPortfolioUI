import { useCallback, useRef } from 'react';
import { usePlayground } from '../context/PlaygroundContext';

interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  startWindowX: number;
  startWindowY: number;
}

export function useDraggable() {
  const { state, updateWindowPosition, setDragging } = usePlayground();
  const dragState = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    startWindowX: 0,
    startWindowY: 0,
  });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Don't drag if maximized or minimized
    if (state.windowState.mode !== 'normal') return;

    e.preventDefault();
    
    dragState.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startWindowX: state.windowState.position.x,
      startWindowY: state.windowState.position.y,
    };

    setDragging(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.current.isDragging) return;

      const deltaX = e.clientX - dragState.current.startX;
      const deltaY = e.clientY - dragState.current.startY;

      const newX = Math.max(0, Math.min(
        window.innerWidth - state.windowState.size.width,
        dragState.current.startWindowX + deltaX
      ));

      const newY = Math.max(0, Math.min(
        window.innerHeight - state.windowState.size.height,
        dragState.current.startWindowY + deltaY
      ));

      updateWindowPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      dragState.current.isDragging = false;
      setDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [state.windowState, updateWindowPosition, setDragging]);

  return {
    handleMouseDown,
    isDragging: state.windowState.isDragging,
  };
}