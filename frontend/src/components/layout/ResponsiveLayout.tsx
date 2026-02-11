import type { ReactNode } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  const device = useDeviceDetection();

  const getLayoutClasses = () => {
    const baseClasses = 'w-full h-full';
    
    if (device.isMobile) {
      return `${baseClasses} mobile-layout`;
    }
    
    if (device.isTablet) {
      return `${baseClasses} tablet-layout`;
    }
    
    return `${baseClasses} desktop-layout`;
  };

  const getContainerClasses = () => {
    if (device.isMobile) {
      return 'container-mobile';
    }
    
    if (device.isTablet) {
      return 'container-tablet';
    }
    
    return 'container-desktop';
  };

  return (
    <div 
      className={`${getLayoutClasses()} ${getContainerClasses()} ${className}`}
      data-device-type={device.isMobile ? 'mobile' : device.isTablet ? 'tablet' : 'desktop'}
      data-orientation={device.orientation}
      data-screen-size={device.screenSize}
    >
      {children}
      
      {/* Device-specific overlays */}
      {device.isMobile && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Mobile-specific background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        </div>
      )}
    </div>
  );
}