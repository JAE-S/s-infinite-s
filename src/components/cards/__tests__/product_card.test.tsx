// Third-Party Library Imports
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test, vi } from 'vitest';
// Mock Data Imports
import { mockProduct } from '@/test/mocks/products';
// Relative Imports
import { setupIconMocks } from '@/test/mocks/icons';
import ProductCard from '../product_card';

// Mock React Helmet with proper TypeScript typing
vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="helmet-mock">{children}</div>
  ),
}));

expect.extend(toHaveNoViolations);

// Setup mocks
setupIconMocks();

describe('ProductCard Component', () => {
  // Smoke tests - Basic rendering and core functionality
  describe('smoke', () => {
    test('renders product information correctly', () => {
      render(<ProductCard product={mockProduct} />);

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

    test('renders with compact layout correctly', () => {
      render(<ProductCard product={mockProduct} layoutSize="compact" />);

      const card = screen.getByTestId(`product-card-${mockProduct.id}`);
      expect(card).toHaveClass('w-full');
      expect(card).not.toHaveClass('max-w-72');
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = render(<ProductCard product={mockProduct} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('buttons have accessible names', () => {
      render(<ProductCard product={mockProduct} />);

      // Info button
      const infoButton = screen.getByTestId(`product-info-button-${mockProduct.id}`);
      expect(infoButton).toHaveAttribute('aria-label', 'Product information for Test Product');

      // Add to cart button
      const cartButton = screen.getByTestId(`add-to-cart-button-${mockProduct.id}`);
      expect(cartButton).toHaveAttribute('aria-label', 'Add Test Product to cart');
    });

    test('article has correct aria-labelledby attribute', () => {
      render(<ProductCard product={mockProduct} />);

      const article = screen.getByTestId(`product-card-${mockProduct.id}`);
      expect(article).toHaveAttribute('aria-labelledby', `product-title-${mockProduct.id}`);

      const title = screen.getByTestId(`product-title-${mockProduct.id}`);
      expect(title).toHaveAttribute('id', `product-title-${mockProduct.id}`);
    });

    test('shows tooltip on focus and hides on blur', async () => {
      render(<ProductCard product={mockProduct} />);

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

  // SEO related tests
  describe('seo', () => {
    test('includes structured data via React Helmet', () => {
      render(<ProductCard product={mockProduct} />);

      // Check for Helmet mock
      const helmetMock = screen.getByTestId('helmet-mock');
      expect(helmetMock).toBeInTheDocument();

      // Check for script tag inside Helmet mock
      const scriptTag = helmetMock.querySelector('script[type="application/ld+json"]');
      expect(scriptTag).toBeInTheDocument();

      // Verify the script content is correct
      const scriptContent = scriptTag?.textContent;
      expect(scriptContent).toBeTruthy();

      if (scriptContent) {
        const structuredData = JSON.parse(scriptContent);
        expect(structuredData['@type']).toBe('Product');
        expect(structuredData.name).toBe(mockProduct.title);
        expect(structuredData.offers.price).toBe(mockProduct.price);
      }
    });

    test('product image has appropriate alt text', () => {
      render(<ProductCard product={mockProduct} />);

      const image = screen.getByTestId(`product-image-${mockProduct.id}`);
      expect(image).toHaveAttribute('alt', 'Test Product');
    });
  });
});
