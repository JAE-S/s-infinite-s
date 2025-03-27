// React Core Imports
import { ReactElement } from 'react';
// Third-Party Library Imports
import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test, vi, beforeEach } from 'vitest';
// Component Import
import ScrollToTopButton from '../components/scroll-to-top-button';

expect.extend(toHaveNoViolations);

// TODO: implement alternative method to act to resolve testing warning

// Helper function to render with act and return utils
const renderWithAct = (ui: ReactElement): RenderResult => {
  let utils: RenderResult = {} as RenderResult;
  act(() => {
    utils = render(ui);
  });
  return utils;
};

// Helper to safely simulate scroll position and event
const simulateScroll = (scrollPosition: number): void => {
  act(() => {
    // Use Object.defineProperty instead of direct assignment
    Object.defineProperty(window, 'scrollY', {
      value: scrollPosition,
      configurable: true,
    });
    fireEvent.scroll(window);
  });
};

// Helper to click elements safely
const clickWithAct = (element: Element): void => {
  act(() => {
    fireEvent.click(element);
  });
};

describe('ScrollToTopButton Component', () => {
  // Reset scroll position and mocks before each test
  beforeEach(() => {
    // Use Object.defineProperty instead of direct assignment
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  describe('smoke', () => {
    test('renders properly and is initially hidden', () => {
      renderWithAct(<ScrollToTopButton />);
      const button = screen.getByTestId('scroll-to-top-button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('opacity-0');
    });

    test('button becomes visible when scrolled past threshold', () => {
      renderWithAct(<ScrollToTopButton />);
      const button = screen.getByTestId('scroll-to-top-button');

      // Initial state - should be hidden
      expect(button).toHaveClass('opacity-0');

      // Simulate scrolling down
      simulateScroll(400);

      // Button should now be visible
      expect(button).toHaveClass('opacity-100');
    });
  });

  describe('interaction', () => {
    test('scrolls to top when clicked', () => {
      // Mock scrollTo function
      const scrollToMock = vi.fn();
      window.scrollTo = scrollToMock;

      renderWithAct(<ScrollToTopButton />);

      // Make button visible
      simulateScroll(400);

      // Click the button
      const button = screen.getByTestId('scroll-to-top-button');
      clickWithAct(button);

      // Check if window.scrollTo was called with correct params
      expect(scrollToMock).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });

  describe('customization', () => {
    test('uses custom scroll threshold', () => {
      const customThreshold = 500;
      renderWithAct(<ScrollToTopButton scrollThreshold={customThreshold} />);
      const button = screen.getByTestId('scroll-to-top-button');

      // Should be hidden when below threshold
      simulateScroll(400);
      expect(button).toHaveClass('opacity-0');

      // Should be visible when above threshold
      simulateScroll(600);
      expect(button).toHaveClass('opacity-100');
    });

    test('applies custom position class', () => {
      renderWithAct(<ScrollToTopButton position="bottom-left" />);
      const button = screen.getByTestId('scroll-to-top-button');

      expect(button.className).toContain('left-4 bottom-4');
      expect(button.className).not.toContain('right-4 bottom-4');
    });
  });

  describe('accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = renderWithAct(<ScrollToTopButton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has appropriate aria attributes', () => {
      renderWithAct(<ScrollToTopButton />);
      const button = screen.getByTestId('scroll-to-top-button');

      expect(button).toHaveAttribute('aria-label', 'Scroll to top of page');
      expect(button).toHaveAttribute('title', 'Scroll to top of page');
    });
  });
});
