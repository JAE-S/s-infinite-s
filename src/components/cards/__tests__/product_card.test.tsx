// Third-Party Library Imports
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test } from 'vitest';

// React Core Imports
// Mock Data Imports
import ProductCard from '../product_card';

import { mockProduct, setupIconMocks } from '@/test/mocks/products';
// Relative Imports

expect.extend(toHaveNoViolations);

// Setup mocks
setupIconMocks();

describe('ProductCard Component', () => {
  // Basic rendering test
  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    // Check for basic elements
    expect(screen.getByTestId('product-title')).toHaveTextContent('Test Product');
    expect(screen.getByTestId('product-price')).toHaveTextContent('From $99.99');
    expect(screen.getByTestId('product-image')).toHaveAttribute('src', '/test-image.jpg');
    expect(screen.getByTestId('product-image')).toHaveAttribute('alt', 'Test Product');
  });

  // Layout size tests
  test('applies correct classes based on layoutSize prop', () => {
    const { rerender } = render(<ProductCard product={mockProduct} layoutSize="default" />);

    // Default size classes
    const card = screen.getByTestId(`product-card-${mockProduct.id}`);
    expect(card).toHaveClass('max-w-72');

    // Rerender with compact size
    rerender(<ProductCard product={mockProduct} layoutSize="compact" />);
    expect(card).not.toHaveClass('max-w-72');
    expect(card).toHaveClass('w-full');
  });

  // Tooltip functionality test
  test('shows tooltip on hover and hides on mouse leave', async () => {
    render(<ProductCard product={mockProduct} />);

    // Initially tooltip should not be visible
    expect(screen.queryByTestId('product-tooltip')).not.toBeInTheDocument();

    // Hover over info button
    fireEvent.mouseEnter(screen.getByTestId('product-info-button'));

    // Tooltip should be visible with product description
    const tooltip = await screen.findByTestId('product-tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('This is a test product description');

    // Mouse leave should hide tooltip
    fireEvent.mouseLeave(screen.getByTestId('product-info-button'));
    await waitFor(() => {
      expect(screen.queryByTestId('product-tooltip')).not.toBeInTheDocument();
    });
  });

  // Focus and blur test (keyboard accessibility)
  test('shows tooltip on focus and hides on blur', async () => {
    render(<ProductCard product={mockProduct} />);

    // Focus info button
    fireEvent.focus(screen.getByTestId('product-info-button'));

    // Tooltip should be visible
    expect(await screen.findByTestId('product-tooltip')).toBeInTheDocument();

    // Blur should hide tooltip
    fireEvent.blur(screen.getByTestId('product-info-button'));
    await waitFor(() => {
      expect(screen.queryByTestId('product-tooltip')).not.toBeInTheDocument();
    });
  });

  // Rating display test
  test('displays correct rating stars', () => {
    render(<ProductCard product={mockProduct} />);

    // Product has 4.5 rating, so 4 filled stars and 1 empty
    const ratingContainer = screen.getByTestId('product-rating');
    expect(ratingContainer).toBeInTheDocument();

    // Check aria-label for rating
    expect(ratingContainer).toHaveAttribute('aria-label', 'Rating: 4.5 out of 5 stars');
  });

  // Image error handling test
  test('handles image loading error correctly', () => {
    render(<ProductCard product={mockProduct} />);

    const img = screen.getByTestId('product-image');
    fireEvent.error(img);

    expect(img).toHaveAttribute('src', '/placeholder-image.jpg');
  });

  // Accessibility tests
  test('has no accessibility violations', async () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Button accessibility test
  test('buttons have accessible names', () => {
    render(<ProductCard product={mockProduct} />);

    // Info button
    const infoButton = screen.getByTestId('product-info-button');
    expect(infoButton).toHaveAttribute('aria-label', 'Product information for Test Product');

    // Add to cart button
    const cartButton = screen.getByTestId('add-to-cart-button');
    expect(cartButton).toHaveAttribute('aria-label', 'Add Test Product to cart');
  });

  // Test aria-labelledby for product card
  test('article has correct aria-labelledby attribute', () => {
    render(<ProductCard product={mockProduct} />);

    const article = screen.getByTestId(`product-card-${mockProduct.id}`);
    expect(article).toHaveAttribute('aria-labelledby', `product-title-${mockProduct.id}`);

    const title = screen.getByTestId('product-title');
    expect(title).toHaveAttribute('id', `product-title-${mockProduct.id}`);
  });

  // Structured data test
  test('includes structured data for SEO', () => {
    render(<ProductCard product={mockProduct} />);

    const scriptTag = document.querySelector('script[type="application/ld+json"]');
    expect(scriptTag).toBeInTheDocument();

    const structuredData = JSON.parse(scriptTag?.innerHTML || '{}');
    expect(structuredData['@type']).toBe('Product');
    expect(structuredData.name).toBe(mockProduct.title);

    // Corrected path to the price - it's in the offers object
    expect(structuredData.offers.price).toBe(mockProduct.price);
  });
});
