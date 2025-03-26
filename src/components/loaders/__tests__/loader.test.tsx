// Third-Party Library Imports
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test } from 'vitest';
// Relative Imports
import Loader from '../loader';

expect.extend(toHaveNoViolations);

describe('Loader Component', () => {
  // Smoke tests - Basic rendering and core functionality
  describe('smoke', () => {
    test('renders loader correctly with default props', () => {
      render(<Loader />);

      const loader = screen.getByTestId('inline-loader');
      expect(loader).toBeInTheDocument();

      const spinner = loader.querySelector('div[role="status"]');
      expect(spinner).toHaveClass('w-12 h-12 border-3');
      expect(spinner).toHaveClass('border-blue-600 border-t-transparent');
    });

    test('renders with small size correctly', () => {
      render(<Loader size="small" />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('w-4 h-4 border-2');
    });

    test('renders with medium size correctly', () => {
      render(<Loader size="medium" />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('w-8 h-8 border-2');
    });

    test('renders with different colors correctly', () => {
      const { rerender } = render(<Loader color="secondary" />);

      let spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('border-gray-600 border-t-transparent');

      rerender(<Loader color="white" />);
      spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('border-white border-t-transparent');
    });

    test('renders text when provided', () => {
      render(<Loader text="Loading content..." />);

      expect(screen.getByText('Loading content...')).toBeInTheDocument();
    });

    test('renders as fullscreen when fullscreen prop is true', () => {
      render(<Loader fullscreen />);

      const fullscreenLoader = screen.getByTestId('fullscreen-loader');
      expect(fullscreenLoader).toBeInTheDocument();
      expect(fullscreenLoader).toHaveClass('fixed inset-0 z-50');
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = render(<Loader />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has no accessibility violations when fullscreen', async () => {
      const { container } = render(<Loader fullscreen text="Loading page content" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('spinner has appropriate aria attributes', () => {
      render(<Loader />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });

    test('fullscreen loader maintains appropriate aria attributes', () => {
      render(<Loader fullscreen />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });
  });

  // Visual customization tests
  describe('visual customization', () => {
    test('combines size and color correctly', () => {
      render(<Loader size="small" color="secondary" />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('w-4 h-4 border-2');
      expect(spinner).toHaveClass('border-gray-600 border-t-transparent');
    });

    test('displays text with correct styling in fullscreen mode', () => {
      render(<Loader fullscreen text="Please wait" />);

      const textElement = screen.getByText('Please wait');
      expect(textElement).toHaveClass('mt-4 font-medium text-gray-700');
    });

    test('displays text with correct styling in inline mode', () => {
      render(<Loader text="Loading data" />);

      const textElement = screen.getByText('Loading data');
      expect(textElement).toHaveClass('ml-3 font-medium text-gray-700');
    });
  });

  // Edge cases
  describe('edge cases', () => {
    test('renders correctly without text', () => {
      render(<Loader />);

      const textElements = screen.queryAllByText(/.+/);
      // Filter out any potential react-testing-library debug elements
      const visibleTextElements = textElements.filter(el => !el.className.includes('debug'));
      expect(visibleTextElements.length).toBe(0);
    });

    test('renders correctly with empty text', () => {
      render(<Loader text="" />);

      // There should be no <p> element rendered
      const paragraphs = document.querySelectorAll('p');
      expect(paragraphs.length).toBe(0);
    });
  });
});
