// Third-Party Library Imports
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test } from 'vitest';
// Mock Data Imports
import { mockProduct } from '@/test/mocks/products';
import { setupIconMocks } from '@/test/mocks/icons';
import { renderWithHelmet, setupCommonMocks } from '@/test/mocks/common';
// Relative Imports
import ProductCard from '../product_card';

// Setup mocks
setupCommonMocks();
setupIconMocks();

expect.extend(toHaveNoViolations);

describe('ProductCard Component', () => {
  // Smoke tests - Basic renderWithHelmeting and core functionality
  describe('smoke', () => {
    test('renderWithHelmets product information correctly', () => {
      renderWithHelmet(<ProductCard product={mockProduct} />);

      // Check for basic elements
      expect(screen.getByTestId(`product-title-${mockProduct.id}`)).toHaveTextContent(
        'Test Product'
      );
      expect(screen.getByTestId(`product-price-${mockProduct.id}`)).toHaveTextContent(
        'From $99.99'
      );
      expect(screen.getByTestId(`product-image-${mockProduct.id}`)).toHaveAttribute(
        'src',
        '/test-image.jpg'
      );
    });

    test('renderWithHelmets with compact layout correctly', () => {
      renderWithHelmet(<ProductCard product={mockProduct} layoutSize="compact" />);

      const card = screen.getByTestId(`product-card-${mockProduct.id}`);
      expect(card).toHaveClass('w-full');
      expect(card).not.toHaveClass('max-w-72');
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = renderWithHelmet(<ProductCard product={mockProduct} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('buttons have accessible names', () => {
      renderWithHelmet(<ProductCard product={mockProduct} />);

      // Info button
      const infoButton = screen.getByTestId(`product-info-button-${mockProduct.id}`);
      expect(infoButton).toHaveAttribute('aria-label', 'Product information for Test Product');

      // Add to cart button
      const cartButton = screen.getByTestId(`add-to-cart-button-${mockProduct.id}`);
      expect(cartButton).toHaveAttribute('aria-label', 'Add Test Product to cart');
    });

    test('article has correct aria-labelledby attribute', () => {
      renderWithHelmet(<ProductCard product={mockProduct} />);

      const article = screen.getByTestId(`product-card-${mockProduct.id}`);
      expect(article).toHaveAttribute('aria-labelledby', `product-title-${mockProduct.id}`);

      const title = screen.getByTestId(`product-title-${mockProduct.id}`);
      expect(title).toHaveAttribute('id', `product-title-${mockProduct.id}`);
    });

    test('shows tooltip on focus and hides on blur', async () => {
      renderWithHelmet(<ProductCard product={mockProduct} />);

      // Focus info button
      fireEvent.focus(screen.getByTestId(`product-info-button-${mockProduct.id}`));

      // Tooltip should be visible
      expect(await screen.findByTestId(`product-tooltip-${mockProduct.id}`)).toBeInTheDocument();

      // Blur should hide tooltip
      fireEvent.blur(screen.getByTestId(`product-info-button-${mockProduct.id}`));
      await waitFor(() => {
        expect(screen.queryByTestId(`product-tooltip-${mockProduct.id}`)).not.toBeInTheDocument();
      });
    });
  });
});
