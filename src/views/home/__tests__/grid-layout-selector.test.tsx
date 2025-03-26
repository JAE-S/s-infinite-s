// Third-Party Library Imports
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test, vi } from 'vitest';
// Relative Imports
import GridLayoutSelector from '../components/grid-layout-selector';

expect.extend(toHaveNoViolations);

describe('GridLayoutSelector Component', () => {
  // Smoke tests - Basic rendering and core functionality
  describe('smoke', () => {
    test('renders component correctly', () => {
      render(<GridLayoutSelector currentLayout={3} onLayoutChange={() => {}} />);

      // Check for main container
      const gridLayoutSelector = screen.getByTestId('grid-layout-selector');
      expect(gridLayoutSelector).toBeInTheDocument();

      // Check for text and buttons
      expect(screen.getByText('Grid size:')).toBeInTheDocument();

      // Check buttons by test ID and text
      const button3 = screen.getByTestId('layout-3-button');
      const button6 = screen.getByTestId('layout-6-button');
      expect(button3).toHaveTextContent('3');
      expect(button6).toHaveTextContent('6');
    });

    test('applies active styling to current layout option', () => {
      const { rerender } = render(
        <GridLayoutSelector currentLayout={3} onLayoutChange={() => {}} />
      );

      // When layout is 3, the "3" button should have active styling
      const button3 = screen.getByTestId('layout-3-button');
      const button6 = screen.getByTestId('layout-6-button');

      expect(button3).toHaveClass('bg-blue-600');
      expect(button3).toHaveClass('text-white');
      expect(button6).not.toHaveClass('bg-blue-600');

      // Rerender with layout 6
      rerender(<GridLayoutSelector currentLayout={6} onLayoutChange={() => {}} />);

      // Now the "6" button should have active styling
      expect(button3).not.toHaveClass('bg-blue-600');
      expect(button6).toHaveClass('bg-blue-600');
      expect(button6).toHaveClass('text-white');
    });

    test('displays current layout in hidden span', () => {
      const { rerender } = render(
        <GridLayoutSelector currentLayout={3} onLayoutChange={() => {}} />
      );

      // Check initial current layout
      const currentLayoutSpan = screen.getByTestId('current-layout');
      expect(currentLayoutSpan).toHaveTextContent('Current: 3');

      // Rerender with new layout
      rerender(<GridLayoutSelector currentLayout={6} onLayoutChange={() => {}} />);

      // Verify updated current layout
      expect(currentLayoutSpan).toHaveTextContent('Current: 6');
    });
  });

  // Interaction tests
  describe('interaction', () => {
    test('calls onLayoutChange when buttons are clicked', () => {
      const handleLayoutChange = vi.fn();
      render(<GridLayoutSelector currentLayout={3} onLayoutChange={handleLayoutChange} />);

      // Click the "6" button by test ID
      const button6 = screen.getByTestId('layout-6-button');
      fireEvent.click(button6);
      expect(handleLayoutChange).toHaveBeenCalledWith(6);

      // Click the "3" button by test ID
      const button3 = screen.getByTestId('layout-3-button');
      fireEvent.click(button3);
      expect(handleLayoutChange).toHaveBeenCalledWith(3);
    });

    test('continues to call onLayoutChange when clicking the active layout', () => {
      const handleLayoutChange = vi.fn();
      render(<GridLayoutSelector currentLayout={3} onLayoutChange={handleLayoutChange} />);

      // Click the active "3" button by test ID
      const button3 = screen.getByTestId('layout-3-button');
      fireEvent.click(button3);

      // The function should still be called
      expect(handleLayoutChange).toHaveBeenCalledTimes(1);
      expect(handleLayoutChange).toHaveBeenCalledWith(3);
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = render(
        <GridLayoutSelector currentLayout={3} onLayoutChange={() => {}} />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('buttons have appropriate aria labels', () => {
      render(<GridLayoutSelector currentLayout={3} onLayoutChange={() => {}} />);

      const button3 = screen.getByLabelText('3 columns grid layout');
      const button6 = screen.getByLabelText('6 columns grid layout');

      expect(button3).toBeInTheDocument();
      expect(button6).toBeInTheDocument();
    });

    test('buttons have accessible attributes', () => {
      render(<GridLayoutSelector currentLayout={3} onLayoutChange={() => {}} />);

      const button3 = screen.getByTestId('layout-3-button');
      const button6 = screen.getByTestId('layout-6-button');

      // Verify accessibility attributes
      expect(button3).toHaveAttribute('aria-label', '3 columns grid layout');
      expect(button6).toHaveAttribute('aria-label', '6 columns grid layout');
    });
  });

  // Edge cases
  describe('edge cases', () => {
    test('handles repeated clicks on same button', () => {
      const handleLayoutChange = vi.fn();
      render(<GridLayoutSelector currentLayout={3} onLayoutChange={handleLayoutChange} />);

      // Click the "3" button multiple times using test ID
      const button3 = screen.getByTestId('layout-3-button');
      fireEvent.click(button3);
      fireEvent.click(button3);
      fireEvent.click(button3);

      expect(handleLayoutChange).toHaveBeenCalledTimes(3);
      expect(handleLayoutChange).toHaveBeenCalledWith(3);
    });

    test('still functions correctly with layout prop changes', () => {
      const handleLayoutChange = vi.fn();
      const { rerender } = render(
        <GridLayoutSelector currentLayout={3} onLayoutChange={handleLayoutChange} />
      );

      // Click the "6" button by test ID
      const button6 = screen.getByTestId('layout-6-button');
      fireEvent.click(button6);
      expect(handleLayoutChange).toHaveBeenCalledWith(6);

      // Rerender with updated layout
      rerender(<GridLayoutSelector currentLayout={6} onLayoutChange={handleLayoutChange} />);

      // Click the "3" button by test ID after rerender
      const button3 = screen.getByTestId('layout-3-button');
      fireEvent.click(button3);
      expect(handleLayoutChange).toHaveBeenCalledWith(3);
    });
  });
});
