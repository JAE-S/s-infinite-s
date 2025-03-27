// Third-Party Library Imports
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
// Relative Imports
import ScrollToTopButton from '../components/scroll-to-top-button';

// Mock the Lucide ChevronUp icon
vi.mock('lucide-react', () => ({
  ChevronUp: ({ size, ...props }: { size: number }) => (
    <svg data-testid="mock-chevron-up" width={size} height={size} {...props} />
  ),
}));

expect.extend(toHaveNoViolations);

describe('ScrollToTopButton Component', () => {
  // Setup window.scrollY mock and window.scrollTo spy
  const originalScrollY = window.scrollY;
  const scrollToSpy = vi.fn();

  beforeEach(() => {
    // Mock window.scrollTo
    Object.defineProperty(window, 'scrollTo', {
      value: scrollToSpy,
      writable: true,
    });
  });

  afterEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Reset window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: originalScrollY,
      writable: true,
      configurable: true,
    });
  });

  // Helper function to simulate scroll
  const simulateScroll = (scrollPosition: number) => {
    Object.defineProperty(window, 'scrollY', {
      value: scrollPosition,
      writable: true,
      configurable: true,
    });

    // Dispatch scroll event
    window.dispatchEvent(new Event('scroll'));
  };

  // Smoke tests - Basic rendering and core functionality
  describe('smoke', () => {
    test('renders the button correctly', () => {
      render(<ScrollToTopButton />);

      const button = screen.getByTestId('scroll-to-top-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Scroll to top of page');

      // Check that the icon is rendered
      const icon = screen.getByTestId('mock-chevron-up');
      expect(icon).toBeInTheDocument();
    });

    test('button is initially hidden when scroll position is at top', () => {
      // Set scrollY to 0
      simulateScroll(0);

      render(<ScrollToTopButton />);

      const button = screen.getByTestId('scroll-to-top-button');
      expect(button).toHaveClass('opacity-0');
      expect(button).toHaveClass('pointer-events-none');
    });

    test('button becomes visible when scrolled past threshold', () => {
      // Initial render with scrollY at 0
      simulateScroll(0);
      const { rerender } = render(<ScrollToTopButton scrollThreshold={100} />);

      let button = screen.getByTestId('scroll-to-top-button');
      expect(button).toHaveClass('opacity-0');

      // Simulate scrolling past threshold
      simulateScroll(150);

      // Need to rerender to trigger the useEffect
      rerender(<ScrollToTopButton scrollThreshold={100} />);

      button = screen.getByTestId('scroll-to-top-button');
      expect(button).toHaveClass('opacity-100');
      expect(button).not.toHaveClass('pointer-events-none');
    });
  });

  // Interaction tests
  describe('interaction', () => {
    test('calls window.scrollTo when clicked', () => {
      // Set scrollY to make button visible
      simulateScroll(400);

      render(<ScrollToTopButton />);

      const button = screen.getByTestId('scroll-to-top-button');
      fireEvent.click(button);

      expect(scrollToSpy).toHaveBeenCalledTimes(1);
      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });

  // Customization tests
  describe('customization', () => {
    test('applies correct position classes for bottom-right', () => {
      render(<ScrollToTopButton position="bottom-right" />);

      const button = screen.getByTestId('scroll-to-top-button');
      expect(button).toHaveClass('right-4');
      expect(button).toHaveClass('bottom-4');
      expect(button).not.toHaveClass('left-4');
    });

    test('applies correct position classes for bottom-left', () => {
      render(<ScrollToTopButton position="bottom-left" />);

      const button = screen.getByTestId('scroll-to-top-button');
      expect(button).toHaveClass('left-4');
      expect(button).toHaveClass('bottom-4');
      expect(button).not.toHaveClass('right-4');
    });

    test('uses custom scroll threshold', () => {
      // Initial render with scrollY at 0
      simulateScroll(0);
      const { rerender } = render(<ScrollToTopButton scrollThreshold={500} />);

      let button = screen.getByTestId('scroll-to-top-button');
      expect(button).toHaveClass('opacity-0');

      // Simulate scrolling to 400 (below custom threshold)
      simulateScroll(400);

      // Need to rerender to trigger the useEffect
      rerender(<ScrollToTopButton scrollThreshold={500} />);

      button = screen.getByTestId('scroll-to-top-button');
      expect(button).toHaveClass('opacity-0');

      // Simulate scrolling to 600 (above custom threshold)
      simulateScroll(600);

      // Need to rerender to trigger the useEffect
      rerender(<ScrollToTopButton scrollThreshold={500} />);

      button = screen.getByTestId('scroll-to-top-button');
      expect(button).toHaveClass('opacity-100');
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = render(<ScrollToTopButton />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has appropriate aria attributes', () => {
      render(<ScrollToTopButton />);

      const button = screen.getByTestId('scroll-to-top-button');
      expect(button).toHaveAttribute('aria-label', 'Scroll to top of page');
      expect(button).toHaveAttribute('title', 'Scroll to top of page');

      // Icon should be marked as decorative
      const icon = screen.getByTestId('mock-chevron-up');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    test('is focusable when visible', () => {
      // Make button visible
      simulateScroll(400);

      render(<ScrollToTopButton />);

      const button = screen.getByTestId('scroll-to-top-button');
      expect(button).not.toHaveClass('pointer-events-none');
      expect(button).toHaveClass('focus:ring-2');
    });
  });

  // Cleanup and lifecycle tests
  describe('cleanup', () => {
    test('removes scroll event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = render(<ScrollToTopButton />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });
});
