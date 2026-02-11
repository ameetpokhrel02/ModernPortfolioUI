import { useRef, useCallback } from 'react';

export interface TouchGestureHandlers {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  onPinch?: (scale: number) => void;
}

export interface TouchGestureOptions {
  swipeThreshold?: number;
  longPressDelay?: number;
  doubleTapDelay?: number;
  preventScroll?: boolean;
}

export function useTouchGestures(
  handlers: TouchGestureHandlers,
  options: TouchGestureOptions = {}
) {
  const {
    swipeThreshold = 50,
    longPressDelay = 500,
    doubleTapDelay = 300,
    preventScroll = false
  } = options;

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);
  const initialDistanceRef = useRef<number>(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (preventScroll) {
      e.preventDefault();
    }

    const touch = e.touches[0];
    const now = Date.now();
    
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: now
    };

    // Handle multi-touch for pinch gestures
    if (e.touches.length === 2 && handlers.onPinch) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      initialDistanceRef.current = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
    }

    // Start long press timer
    if (handlers.onLongPress) {
      longPressTimerRef.current = window.setTimeout(() => {
        handlers.onLongPress?.();
      }, longPressDelay);
    }
  }, [handlers, longPressDelay, preventScroll]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (preventScroll) {
      e.preventDefault();
    }

    // Cancel long press if finger moves
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Handle pinch gesture
    if (e.touches.length === 2 && handlers.onPinch && initialDistanceRef.current > 0) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      const scale = currentDistance / initialDistanceRef.current;
      handlers.onPinch(scale);
    }
  }, [handlers, preventScroll]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (preventScroll) {
      e.preventDefault();
    }

    // Clear long press timer
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const now = Date.now();
    
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: now
    };

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    const deltaTime = touchEndRef.current.time - touchStartRef.current.time;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Handle swipe gestures
    if (distance > swipeThreshold && deltaTime < 500) {
      const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
      
      if (angle >= -45 && angle <= 45) {
        handlers.onSwipeRight?.();
      } else if (angle >= 45 && angle <= 135) {
        handlers.onSwipeDown?.();
      } else if (angle >= -135 && angle <= -45) {
        handlers.onSwipeUp?.();
      } else {
        handlers.onSwipeLeft?.();
      }
    }
    // Handle tap gestures
    else if (distance < 10 && deltaTime < 500) {
      const timeSinceLastTap = now - lastTapRef.current;
      
      if (timeSinceLastTap < doubleTapDelay && handlers.onDoubleTap) {
        handlers.onDoubleTap();
        lastTapRef.current = 0; // Reset to prevent triple tap
      } else {
        lastTapRef.current = now;
        // Delay single tap to check for double tap
        setTimeout(() => {
          if (lastTapRef.current === now) {
            handlers.onTap?.();
          }
        }, doubleTapDelay);
      }
    }

    touchStartRef.current = null;
    touchEndRef.current = null;
    initialDistanceRef.current = 0;
  }, [handlers, swipeThreshold, doubleTapDelay, preventScroll]);

  const attachGestures = useCallback((element: HTMLElement | null) => {
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: !preventScroll });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventScroll });
    element.addEventListener('touchend', handleTouchEnd, { passive: !preventScroll });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, preventScroll]);

  return { attachGestures };
}