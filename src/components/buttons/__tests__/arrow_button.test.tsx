// Third-Party Library Imports
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test, vi } from 'vitest';

// Mock the arrow icons
vi.mock('@/components/icons/arrow-left', () => ({
  default: ({ width, height, ...props }: { width: number; height: number }) => (
    <svg data-testid="arrow-left-icon" width={width} height={height} {...props} />
  ),
}));

vi.mock('@/components/icons/arrow-right', () => ({
  default: ({ width, height, ...props }: { width: number; height: number }) => (
    <svg data-testid="arrow-right-icon" width={width} height={height} {...props} />
  ),
}));

// Relative Imports
import ArrowButton from '../arrow_button';

expect.extend(toHaveNoViolations);

describe('ArrowButton Component', () => {
  // Smoke tests - Basic rendering and core functionality
  describe('smoke', () => {
    test('renders left arrow button correctly', () => {
      render(<ArrowButton direction="left" />);

      const button = screen.getByTestId('arrow-button-left');
      expect(button).toBeInTheDocument();

      const icon = screen.getByTestId('arrow-left-icon');
      expect(icon).toBeInTheDocument();
    });

    test('renders right arrow button correctly', () => {
      render(<ArrowButton direction="right" />);

      const button = screen.getByTestId('arrow-button-right');
      expect(button).toBeInTheDocument();

      const icon = screen.getByTestId('arrow-right-icon');
      expect(icon).toBeInTheDocument();
    });

    test('uses default aria-labels when no label is provided', () => {
      const { rerender } = render(<ArrowButton direction="left" />);

      expect(screen.getByLabelText('Previous')).toBeInTheDocument();

      rerender(<ArrowButton direction="right" />);

      expect(screen.getByLabelText('Next')).toBeInTheDocument();
    });
  });

  // Interaction tests
  describe('interaction', () => {
    test('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<ArrowButton direction="left" onClick={handleClick} />);

      fireEvent.click(screen.getByTestId('arrow-button-left'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<ArrowButton direction="left" onClick={handleClick} disabled />);

      fireEvent.click(screen.getByTestId('arrow-button-left'));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Customization tests
  describe('customization', () => {
    test('applies different sizes correctly', () => {
      const { rerender } = render(<ArrowButton direction="left" size="small" />);

      // Check small size
      let button = screen.getByTestId('arrow-button-left');
      let icon = screen.getByTestId('arrow-left-icon');

      expect(button).toHaveClass('p-1.5');
      expect(icon).toHaveAttribute('width', '18');

      // Check medium size (default)
      rerender(<ArrowButton direction="left" size="medium" />);

      button = screen.getByTestId('arrow-button-left');
      icon = screen.getByTestId('arrow-left-icon');

      expect(button).toHaveClass('p-2');
      expect(icon).toHaveAttribute('width', '24');

      // Check large size
      rerender(<ArrowButton direction="left" size="large" />);

      button = screen.getByTestId('arrow-button-left');
      icon = screen.getByTestId('arrow-left-icon');

      expect(button).toHaveClass('p-3');
      expect(icon).toHaveAttribute('width', '30');
    });

    test('applies different variants correctly', () => {
      const { rerender } = render(<ArrowButton direction="left" variant="default" />);

      // Check default variant
      let button = screen.getByTestId('arrow-button-left');
      expect(button).toHaveClass('bg-gray-200');

      // Check primary variant
      rerender(<ArrowButton direction="left" variant="primary" />);

      button = screen.getByTestId('arrow-button-left');
      expect(button).toHaveClass('bg-blue-600');
      expect(button).toHaveClass('text-white');

      // Check secondary variant
      rerender(<ArrowButton direction="left" variant="secondary" />);

      button = screen.getByTestId('arrow-button-left');
      expect(button).toHaveClass('bg-gray-700');
      expect(button).toHaveClass('text-white');
    });

    test('applies custom className correctly', () => {
      render(<ArrowButton direction="left" className="custom-class" />);

      const button = screen.getByTestId('arrow-button-left');
      expect(button).toHaveClass('custom-class');
    });

    test('applies disabled styling correctly', () => {
      render(<ArrowButton direction="left" disabled />);

      const button = screen.getByTestId('arrow-button-left');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50');
      expect(button).toHaveClass('cursor-not-allowed');
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = render(<ArrowButton direction="left" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('uses custom aria-label when provided', () => {
      render(<ArrowButton direction="left" label="Go back" />);

      expect(screen.getByLabelText('Go back')).toBeInTheDocument();
    });

    test('adds sr-only text when label is provided', () => {
      render(<ArrowButton direction="left" label="Go back" />);

      const srOnlyText = screen.getByText('Go back');
      expect(srOnlyText).toHaveClass('sr-only');
    });

    test('has appropriate focus styling', () => {
      render(<ArrowButton direction="left" />);

      const button = screen.getByTestId('arrow-button-left');
      expect(button).toHaveClass('focus:outline-none');
      expect(button).toHaveClass('focus:ring-2');
      expect(button).toHaveClass('focus:ring-offset-2');
    });

    test('sets icons as decorative with aria-hidden', () => {
      const { rerender } = render(<ArrowButton direction="left" />);

      let icon = screen.getByTestId('arrow-left-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');

      rerender(<ArrowButton direction="right" />);

      icon = screen.getByTestId('arrow-right-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
