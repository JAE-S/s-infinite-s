// Third-Party Library Imports
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test } from 'vitest';
// React Helmet Async Imports
import { HelmetProvider } from 'react-helmet-async';
// Import common mocks
import { setupCommonMocks } from '@/test/mocks/common';

// Setup all common mocks
setupCommonMocks();

expect.extend(toHaveNoViolations);

// Import after mocks
import MainLayout from '../main_layout';

// Wrapper component to provide HelmetProvider context
const renderWithHelmet = (component: React.ReactNode) => {
  return render(<HelmetProvider>{component}</HelmetProvider>);
};

describe('MainLayout Component', () => {
  // Smoke tests - Basic rendering and core functionality
  describe('smoke', () => {
    test('renders layout with children correctly', () => {
      const { getByTestId, getByText } = renderWithHelmet(
        <MainLayout>
          <div data-testid="test-child">Test Content</div>
        </MainLayout>
      );

      // Check for header
      expect(screen.getByRole('banner')).toBeInTheDocument();

      // Check for main content
      expect(screen.getByRole('main')).toBeInTheDocument();

      // Check for footer
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();

      // Check that children are rendered
      expect(getByTestId('test-child')).toBeInTheDocument();
      expect(getByText('Test Content')).toBeInTheDocument();
    });

    test('header contains site title with link', () => {
      renderWithHelmet(<MainLayout>Content</MainLayout>);

      const header = screen.getByRole('banner');
      const titleLink = header.querySelector('a[href="/"]');

      expect(titleLink).toBeInTheDocument();
      expect(titleLink).toHaveTextContent('Infinite Scroll Marketplace');
    });

    test('footer contains copyright with current year', () => {
      renderWithHelmet(<MainLayout>Content</MainLayout>);

      const footer = screen.getByRole('contentinfo');
      const currentYear = new Date().getFullYear();

      expect(footer).toHaveTextContent(`© ${currentYear} Infinite Scroll Marketplace`);
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = renderWithHelmet(<MainLayout>Test Content</MainLayout>);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has skip to content link for keyboard navigation', () => {
      renderWithHelmet(<MainLayout>Content</MainLayout>);

      const skipLink = screen.getByText('Skip to content');
      expect(skipLink).toHaveAttribute('href', '#main-content');
      expect(skipLink).toHaveClass('sr-only focus:not-sr-only');
    });

    test('main content has correct id for skip link target', () => {
      renderWithHelmet(<MainLayout>Content</MainLayout>);

      const main = screen.getByRole('main');
      expect(main).toHaveAttribute('id', 'main-content');
    });

    test('header and footer have appropriate ARIA labels', () => {
      renderWithHelmet(<MainLayout>Content</MainLayout>);

      const header = screen.getByRole('banner');
      expect(header).toHaveAttribute('aria-label', 'Marketplace header');

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveAttribute('aria-label', 'Site footer');
    });
  });

  // Suspense and content rendering tests
  describe('content rendering', () => {
    test('renders main content area with children', () => {
      renderWithHelmet(<MainLayout>Test Content</MainLayout>);

      const mainContainer = screen.getByTestId('main-container');
      expect(mainContainer).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
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
