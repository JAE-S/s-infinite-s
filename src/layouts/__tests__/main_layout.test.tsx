// Third-Party Library Imports
import { screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, test } from 'vitest';
// Mock Data Imports
import { getHelmetData, renderWithHelmet, setupCommonMocks } from '@/test/mocks/common';

// Setup all common mocks
setupCommonMocks();

expect.extend(toHaveNoViolations);

// Import after mocks
import MainLayout from '../main_layout';

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
    test('includes default SEO meta tags', async () => {
      renderWithHelmet(<MainLayout>Test Content</MainLayout>);

      // Wait for Helmet to update the document head
      await waitFor(() => {
        const helmetData = getHelmetData();

        // Check title
        expect(helmetData.title).toBe('Infinite Scroll Marketplace | Infinite Scroll Marketplace');

        // Check meta tags
        const descriptionTag = helmetData.metaTags.find(tag => tag.name === 'description');
        expect(descriptionTag?.content).toBe(
          'Discover amazing products with our infinite scroll marketplace'
        );

        // Check OG tags
        const ogTitleTag = helmetData.metaTags.find(tag => tag.name === 'og:title');
        expect(ogTitleTag?.content).toBe('Infinite Scroll Marketplace');

        const ogDescriptionTag = helmetData.metaTags.find(tag => tag.name === 'og:description');
        expect(ogDescriptionTag?.content).toBe(
          'Discover amazing products with our infinite scroll marketplace'
        );

        // Check Twitter Card tags
        const twitterCardTag = helmetData.metaTags.find(tag => tag.name === 'twitter:card');
        expect(twitterCardTag?.content).toBe('summary_large_image');
      });
    });

    test('includes structured data via React Helmet', async () => {
      renderWithHelmet(<MainLayout>Test Content</MainLayout>);

      await waitFor(() => {
        const helmetData = getHelmetData();

        // Find the JSON-LD script
        const jsonLdScript = helmetData.scriptTags.find(
          script => script.type === 'application/ld+json'
        );

        expect(jsonLdScript).toBeDefined();

        if (jsonLdScript) {
          const scriptContent = jsonLdScript.innerHTML;
          const parsedContent = JSON.parse(scriptContent);

          // Verify structured data content
          expect(parsedContent['@context']).toBe('https://schema.org');
          expect(parsedContent['@type']).toBe('WebSite');
          expect(parsedContent.name).toBe('Infinite Scroll Marketplace');
          expect(parsedContent.description).toBe(
            'Discover amazing products with our infinite scroll marketplace'
          );
        }
      });
    });

    test('applies custom SEO props correctly', async () => {
      const customSEO = {
        title: 'Custom Page Title',
        description: 'Custom page description for testing',
        canonical: 'https://example.com/custom-page',
        openGraph: {
          title: 'Custom OG Title',
          description: 'Custom OG description',
          image: '/custom-image.jpg',
          url: 'https://example.com/custom-og-page',
        },
      };

      renderWithHelmet(<MainLayout {...customSEO}>Test Content</MainLayout>);

      await waitFor(() => {
        const helmetData = getHelmetData();

        // Check title - account for the titleTemplate in Helmet
        expect(helmetData.title).toBe('Custom Page Title | Infinite Scroll Marketplace');
        // Check description
        const descriptionTag = helmetData.metaTags.find(tag => tag.name === 'description');
        expect(descriptionTag?.content).toBe('Custom page description for testing');
        // Check canonical link
        const canonicalLink = helmetData.linkTags.find(link => link.rel === 'canonical');
        expect(canonicalLink?.href).toBe('https://example.com/custom-page');
        // Check custom OG tags
        const ogTitleTag = helmetData.metaTags.find(tag => tag.name === 'og:title');
        expect(ogTitleTag?.content).toBe('Custom OG Title');

        const ogImageTag = helmetData.metaTags.find(tag => tag.name === 'og:image');
        expect(ogImageTag?.content).toBe('/custom-image.jpg');

        const ogUrlTag = helmetData.metaTags.find(tag => tag.name === 'og:url');
        expect(ogUrlTag?.content).toBe('https://example.com/custom-og-page');
      });
    });
  });
});
