// Third-Party Library Imports
import { screen, fireEvent, within, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
// Mocks
import { mockProducts } from '@/test/mocks/products';

// Use basic mocks for all external dependencies
vi.mock('@/store/apis/product_api');

vi.mock('lodash', () => ({
  debounce: (fn: Function) => {
    const debounced = (...args: any[]) => fn(...args);
    debounced.cancel = vi.fn();
    return debounced;
  },
}));

vi.mock('@/components/cards/product_card', () => ({
  default: ({ product, layoutSize }: { product: any; layoutSize: string }) => (
    <div data-testid={`product-card-${product.id}`} data-layout={layoutSize}>
      {product.title}
    </div>
  ),
}));

vi.mock('@/components/loaders/loader', () => ({
  default: ({ text, size }: { text?: string; size?: string }) => (
    <div data-testid="loader-component" data-size={size}>
      {text || 'Loading...'}
    </div>
  ),
}));

vi.mock('../grid-layout-selector', () => ({
  default: ({
    currentLayout,
    onLayoutChange,
  }: {
    currentLayout: number;
    onLayoutChange: (layout: number) => void;
  }) => (
    <div data-testid="grid-layout-selector">
      <span data-testid="current-layout">Current: {currentLayout}</span>
      <button data-testid="layout-3-button" onClick={() => onLayoutChange(3)}>
        3
      </button>
      <button data-testid="layout-6-button" onClick={() => onLayoutChange(6)}>
        6
      </button>
    </div>
  ),
}));

// Import components AFTER mocks
import { useGetProductsQuery, useLazyGetProductsQuery } from '@/store/apis/product_api';
import ProductList from '../components/product-list';

// Create mock functions
const mockRefetch = vi.fn();
const mockFetchMore = vi.fn();

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn().mockImplementation(_key => null),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock IntersectionObserver
window.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

expect.extend(toHaveNoViolations);

// Wrapper component for tests to provide HelmetProvider
const renderWithHelmet = (component: React.ReactNode) => {
  return render(<HelmetProvider>{component}</HelmetProvider>);
};

describe('ProductList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Set up default mocks for each test
    (useGetProductsQuery as any).mockReturnValue({
      data: {
        products: mockProducts.slice(0, 10),
        total: mockProducts.length,
        limit: 10,
        skip: 0,
      },
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    });

    (useLazyGetProductsQuery as any).mockReturnValue([
      mockFetchMore,
      { data: null, isFetching: false, reset: vi.fn() },
    ]);
  });

  // Smoke tests - Basic rendering and core functionality
  describe('smoke', () => {
    test('renders product list with correct grid layout', () => {
      renderWithHelmet(<ProductList />);

      // Check main container
      const container = screen.getByTestId('product-list-container');
      expect(container).toBeInTheDocument();

      // Check grid layout selector is present
      const layoutSelector = screen.getByTestId('grid-layout-selector');
      expect(layoutSelector).toBeInTheDocument();

      // Check product grid is present
      const productGrid = screen.getByTestId('product-grid');
      expect(productGrid).toBeInTheDocument();

      // Check products are displayed
      mockProducts.slice(0, 10).forEach(product => {
        const productCard = screen.getByTestId(`product-card-${product.id}`);
        expect(productCard).toBeInTheDocument();
        expect(productCard).toHaveAttribute('data-layout', 'default');
      });
    });

    test('changes product card layout when grid layout changes', () => {
      renderWithHelmet(<ProductList />);

      // Check initial layout is 3 columns
      const layoutSelector = screen.getByTestId('grid-layout-selector');
      const currentLayout = within(layoutSelector).getByTestId('current-layout');
      expect(currentLayout).toHaveTextContent('Current: 3');

      // Change to 6 columns
      const layout6Button = within(layoutSelector).getByTestId('layout-6-button');
      fireEvent.click(layout6Button);

      // Check layout changed to 6 columns
      expect(currentLayout).toHaveTextContent('Current: 6');

      // Check product cards layout updated to compact
      mockProducts.slice(0, 10).forEach(product => {
        const productCard = screen.getByTestId(`product-card-${product.id}`);
        expect(productCard).toHaveAttribute('data-layout', 'compact');
      });
    });

    test('sets up intersection observers for infinite scrolling', () => {
      renderWithHelmet(<ProductList />);

      // Check that IntersectionObserver was created
      expect(window.IntersectionObserver).toHaveBeenCalled();

      // Check that load-more-trigger exists
      const loadMoreTrigger = screen.getByTestId('load-more-trigger');
      expect(loadMoreTrigger).toBeInTheDocument();

      // Check that preload-trigger exists
      const preloadTrigger = screen.getByTestId('preload-trigger');
      expect(preloadTrigger).toBeInTheDocument();
    });

    test('displays loading state when data is loading', () => {
      // Override mock for this specific test
      (useGetProductsQuery as any).mockReturnValue({
        data: null,
        isLoading: true,
        isError: false,
        refetch: mockRefetch,
      });

      renderWithHelmet(<ProductList />);

      expect(screen.getByTestId('product-list-loading')).toBeInTheDocument();
      expect(screen.getByText('Loading products...')).toBeInTheDocument();
    });

    test('displays error state and retry button when there is an error', () => {
      // Override mock for this specific test
      (useGetProductsQuery as any).mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
        refetch: mockRefetch,
      });

      renderWithHelmet(<ProductList />);

      const errorElement = screen.getByTestId('product-list-error');
      expect(errorElement).toBeInTheDocument();
      expect(screen.getByText('Failed to load products')).toBeInTheDocument();

      const retryButton = screen.getByTestId('retry-button');
      expect(retryButton).toBeInTheDocument();

      // Test retry functionality
      fireEvent.click(retryButton);
      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });

    test('displays empty state when no products are returned', () => {
      // Override mock for this specific test
      (useGetProductsQuery as any).mockReturnValue({
        data: {
          products: [],
          total: 0,
          limit: 10,
          skip: 0,
        },
        isLoading: false,
        isError: false,
        refetch: mockRefetch,
      });

      renderWithHelmet(<ProductList />);

      expect(screen.getByTestId('product-list-empty')).toBeInTheDocument();
      expect(screen.getByText('No products found')).toBeInTheDocument();
    });

    test('shows end of results message when there are no more products', () => {
      // Override mock for this specific test
      (useGetProductsQuery as any).mockReturnValue({
        data: {
          products: mockProducts.slice(0, 10),
          total: 10, // Total equals number of loaded products
          limit: 10,
          skip: 0,
        },
        isLoading: false,
        isError: false,
        refetch: mockRefetch,
      });

      renderWithHelmet(<ProductList />);

      const endMessage = screen.getByTestId('end-of-results');
      expect(endMessage).toBeInTheDocument();
      expect(endMessage).toHaveTextContent("You've reached the end of the list");
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = renderWithHelmet(<ProductList />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has appropriate ARIA attributes for accessibility', () => {
      renderWithHelmet(<ProductList />);

      const container = screen.getByTestId('product-list-container');
      expect(container).toHaveAttribute('aria-live', 'polite');
      expect(container).toHaveAttribute('aria-busy', 'false');
    });

    test('loading area has appropriate ARIA attributes', () => {
      // Override mock for this specific test
      (useGetProductsQuery as any).mockReturnValue({
        data: null,
        isLoading: true,
        isError: false,
        refetch: mockRefetch,
      });

      renderWithHelmet(<ProductList />);

      const loadingArea = screen.getByTestId('product-list-loading');
      expect(loadingArea).toHaveAttribute('aria-live', 'polite');
    });

    test('error state has assertive ARIA live region', () => {
      // Override mock for this specific test
      (useGetProductsQuery as any).mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
        refetch: mockRefetch,
      });

      renderWithHelmet(<ProductList />);

      const errorElement = screen.getByTestId('product-list-error');
      expect(errorElement).toHaveAttribute('aria-live', 'assertive');
    });
  });

  // SEO related tests
  describe('seo', () => {
    test.skip('includes structured data via React Helmet', async () => {
      // TODO: Future development
      // This test is currently skipped due to potential async rendering complexities
      // Needs further investigation to properly test Helmet-rendered structured data
    });
  });
});
