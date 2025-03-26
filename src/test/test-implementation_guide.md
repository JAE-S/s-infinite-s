# Test Implementation Guide

This guide explains our testing approach, categories, and implementation patterns for developers writing tests.

## Test Categories

Our project organizes tests into distinct categories with specific purposes:

### Smoke Tests

Smoke tests verify that the essential functionality of components works correctly.

```javascript
// Basic smoke test example
describe('smoke', () => {
  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByTestId(`product-title-${mockProduct.id}`)).toHaveTextContent('Test Product');
    expect(screen.getByTestId(`product-price-${mockProduct.id}`)).toHaveAttribute(
      'src',
      '/test-image.jpg'
    );
  });
});
```

### Accessibility Tests

Accessibility tests ensure components meet WCAG standards and are usable by people with neurodiversities.

```javascript
// Accessibility test example
describe('accessibility', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('buttons have accessible names', () => {
    render(<ProductCard product={mockProduct} />);
    const button = screen.getByTestId(`product-info-button-${mockProduct.id}`);
    expect(button).toHaveAttribute('aria-label', 'Product information for Test Product');
  });
});
```

### SEO Tests

SEO tests verify that components include proper meta tags, structured data, and other SEO-related elements.

```javascript
// SEO test example
describe('seo', () => {
  test('includes structured data via React Helmet', () => {
    render(<ProductCard product={mockProduct} />);
    const scriptTag = screen
      .getByTestId('helmet-mock')
      .querySelector('script[type="application/ld+json"]');
    expect(scriptTag).toBeInTheDocument();

    const structuredData = JSON.parse(scriptTag.textContent);
    expect(structuredData['@type']).toBe('Product');
    expect(structuredData.name).toBe(mockProduct.title);
  });
});
```

### Implementation Details

1. **Test file naming**: Match the component name with `.test.tsx` suffix
2. **Describe blocks**: Use category names as describe block identifiers

## Writing Effective Tests

### Smoke Tests

Smoke tests should:

- Focus on the most critical functionality
- Verify that core elements render correctly
- Check interaction with primary user actions
- Be fast and reliable

```javascript
// Good smoke test example
test('shows tooltip on hover', async () => {
  render(<InfoButton id="test" tooltip="Help info" />);
  fireEvent.mouseEnter(screen.getByTestId('info-button-test'));
  expect(await screen.findByText('Help info')).toBeInTheDocument();
});
```

### Accessibility Tests

Accessibility tests should:

- Use axe for comprehensive checks
- Verify proper ARIA attributes
- Test keyboard navigation
- Check focus management
- Verify color contrast (when possible)

```javascript
// Focus management test
test('focus traps in modal when open', async () => {
  render(<Modal isOpen={true} content="Test content" />);
  const modal = screen.getByRole('dialog');
  expect(document.activeElement).toBe(modal);

  // Test focus trap
  userEvent.tab();
  expect(document.activeElement).not.toBe(document.body);
});
```

### SEO Tests

SEO tests should:

- Verify structured data compliance
- Check for proper meta tags
- Ensure proper heading hierarchy

```javascript
// Structured data test
test('blog post has proper article schema', () => {
  render(<BlogPost post={mockPost} />);
  const scriptContent = screen
    .getByTestId('helmet-mock')
    .querySelector('script[type="application/ld+json"]').textContent;

  const schema = JSON.parse(scriptContent);
  expect(schema['@type']).toBe('Article');
  expect(schema.headline).toBe(mockPost.title);
  expect(schema.datePublished).toBeTruthy();
});
```

## Mock Data and Utilities

### Mock Data

Store reusable mock data in the `test/mocks` directory:

```javascript
// test/mocks/products.ts
export const mockProduct = {
  id: 'prod123',
  title: 'Test Product',
  price: 99.99,
  description: 'This is a test product description',
  imageUrl: '/test-image.jpg',
  rating: 4.5,
};
```

### Test Utilities

Create helper functions for common test operations:

```javascript
// test/utils/test-utils.tsx
export function renderWithProviders(ui, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme="light">
        <I18nProvider locale="en">{children}</I18nProvider>
      </ThemeProvider>
    ),
    ...options,
  });
}
```

## Running Tests Locally

### Basic Commands

```bash
# Run all tests
pnpm run test

# Run specific test categories
pnpm run test:smoke
pnpm run test:accessibility
pnpm run test:seo

# Watch mode for development
pnpm run test:watch

# Visual test UI
pnpm run test:ui
```

### Test Debugging

For debugging tests:

1. Use the Vitest UI:

   ```bash
   pnpm run test:ui
   ```

2. Add debugging console logs:

   ```javascript
   test('debug this test', () => {
     const result = someFunction();
     console.log('Result:', result);
     expect(result).toBeTruthy();
   });
   ```

3. Use browser devtools with browser mode:
   ```javascript
   // In your test file
   test.skip('debugging in browser', () => {
     // This code will be available in browser devtools
     debugger;
     // ...test code
   });
   ```

## Tools Reference

Our testing stack includes:

- **Vitest**: Modern test runner and framework
- **React Testing Library**: Component testing utilities
- **jest-axe**: Accessibility testing
- **JSDOM**: Browser environment simulation
- **user-event**: Realistic user interaction simulation

## Code Coverage

We track code coverage through the `test:coverage` command, which generates reports showing:

- Statement coverage
- Branch coverage
- Function coverage
- Line coverage
