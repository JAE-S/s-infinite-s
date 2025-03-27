// React Core Imports
import React, { useState, useEffect, useCallback } from 'react';
// Icon Imports
import { ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  scrollThreshold?: number;
  position?: 'bottom-right' | 'bottom-left';
  containerRef?: React.RefObject<HTMLElement>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = React.memo(
  ({ scrollThreshold = 300, position = 'bottom-right' }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Memoize the scroll handler to prevent recreating this function on every render
    const handleScroll = useCallback(() => {
      // Check the window scroll position for visibility
      const shouldBeVisible = window.scrollY > scrollThreshold;
      // Only update state if visibility actually changes
      if (isVisible !== shouldBeVisible) {
        setIsVisible(shouldBeVisible);
      }
    }, [scrollThreshold, isVisible]);

    // Memoize the scroll to top function
    const scrollToTop = useCallback(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, []);

    useEffect(() => {
      // Add passive event listener for better performance
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Initial check
      handleScroll();

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [handleScroll]); // Only depend on the memoized handler

    // Compute position classes outside of render
    const positionClasses = position === 'bottom-right' ? 'right-4 bottom-4' : 'left-4 bottom-4';

    // Compute visibility classes outside of render
    const visibilityClasses = isVisible
      ? 'translate-y-0 opacity-100'
      : 'pointer-events-none translate-y-10 opacity-0';

    return (
      <button
        onClick={scrollToTop}
        className={`fixed ${positionClasses} z-50 flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${visibilityClasses}`}
        aria-label="Scroll to top of page"
        title="Scroll to top of page"
        data-testid="scroll-to-top-button"
      >
        <ChevronUp size={18} aria-hidden="true" />
      </button>
    );
  }
);

ScrollToTopButton.displayName = 'ScrollToTopButton';

export default ScrollToTopButton;
