// React Core Imports
import React, { useState, useEffect } from 'react';
// Icon Imports
import { ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  scrollThreshold?: number;
  position?: 'bottom-right' | 'bottom-left';
  containerRef?: React.RefObject<HTMLElement>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  scrollThreshold = 300,
  position = 'bottom-right',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Always check the window scroll position for visibility
      setIsVisible(window.scrollY > scrollThreshold);
    };

    // Always attach the scroll listener to the window
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  const scrollToTop = () => {
    // Always scroll the window since we're listening to window scroll events
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const positionClasses = position === 'bottom-right' ? 'right-4 bottom-4' : 'left-4 bottom-4';

  return (
    <button
      onClick={scrollToTop}
      className={`fixed ${positionClasses} z-50 flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'
      }`}
      aria-label="Scroll to top of page"
      title="Scroll to top of page"
      data-testid="scroll-to-top-button"
    >
      <ChevronUp size={18} aria-hidden="true" />
    </button>
  );
};

export default ScrollToTopButton;
