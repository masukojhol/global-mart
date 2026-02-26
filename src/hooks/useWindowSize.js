import { useState, useEffect } from 'react';
import { theme } from '../styles/theme';

export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = size.width < theme.breakpoints.mobile;
  const isTablet = size.width >= theme.breakpoints.mobile && size.width < theme.breakpoints.tablet;
  const isDesktop = size.width >= theme.breakpoints.tablet;

  const getGridColumns = (mobileColumns = 2, tabletColumns = 3, desktopColumns = 4) => {
    if (isMobile) return `repeat(${mobileColumns}, 1fr)`;
    if (isTablet) return `repeat(${tabletColumns}, 1fr)`;
    return `repeat(${desktopColumns}, 1fr)`;
  };

  return {
    ...size,
    isMobile,
    isTablet,
    isDesktop,
    getGridColumns,
  };
}

export default useWindowSize;
