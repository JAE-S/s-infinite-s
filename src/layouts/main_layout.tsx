// React Core Imports
import React, { ReactNode, Suspense, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
// Internal Component Imports
import Loader from '@/components/loaders/loader';

type MainLayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
};

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'Infinite Scroll Marketplace',
  description = 'Discover amazing products with our infinite scroll marketplace',
  canonical,
  openGraph,
}) => {
  // Ref for main scroll container
  const scrollContainerRef = useRef<HTMLElement>(null);

  // Memoize structured data to prevent recreation on each render
  const structuredData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: title,
      description: description,
      url: canonical || (typeof window !== 'undefined' ? window.location.href : ''),
    };
  }, [title, description, canonical]);

  // Prepare OpenGraph data
  const ogTitle = openGraph?.title || title;
  const ogDescription = openGraph?.description || description;
  const ogUrl =
    openGraph?.url || canonical || (typeof window !== 'undefined' ? window.location.href : '');
  const ogImage = openGraph?.image || '/default-og-image.jpg';

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* SEO */}
      <Helmet
        defaultTitle="Infinite Scroll Marketplace"
        titleTemplate="%s | Infinite Scroll Marketplace"
      >
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}

        {/* Open Graph / Social Media */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <header
        className="sticky top-0 z-10 border-b bg-gray-100 shadow-sm"
        role="banner"
        aria-label="Marketplace header"
        data-testid="site-header"
      >
        <div className="mx-auto flex items-center justify-between p-4 md:px-20">
          <h1 className="text-2xl font-semibold text-gray-900">
            <a
              href="/"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="site-title"
            >
              Infinite Scroll Marketplace
            </a>
          </h1>
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:bg-blue-500 focus:p-2 focus:text-white"
            data-testid="skip-link"
          >
            Skip to content
          </a>
        </div>
      </header>

      {/* Main content for infinite scroll feature */}
      <main
        id="main-content"
        data-testid="main-container"
        className="flex-grow overflow-y-auto bg-gray-100 px-4 py-12 md:px-20"
        role="main"
        ref={scrollContainerRef}
      >
        <div className="container mx-auto py-8">
          <Suspense fallback={<Loader fullscreen text="Loading..." />}>{children}</Suspense>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-auto border-t bg-gray-100"
        role="contentinfo"
        aria-label="Site footer"
        data-testid="site-footer"
      >
        <div className="container mx-auto p-4 text-center text-gray-600">
          &copy; {currentYear} Infinite Scroll Marketplace
        </div>
      </footer>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';

export default MainLayout;
