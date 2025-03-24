// React Core Imports
import React, { ReactNode, Suspense, useRef } from 'react';

// Internal Component Imports
import Loader from '@/components/loaders/loader';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Ref for main scroll container
  const scrollContainerRef = useRef<HTMLElement>(null);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Sticky Header */}
      <header
        className="sticky top-0 z-10 border-b bg-gray-100 shadow-sm"
        role="banner"
        aria-label="Marketplace header"
      >
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            <a href="/" className="focus:outline-none focus:ring-2 focus:ring-blue-500">
              Infinite Scroll Marketplace
            </a>
          </h1>
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:bg-blue-500 focus:p-2 focus:text-white"
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
      <footer className="mt-auto border-t bg-gray-100" role="contentinfo" aria-label="Site footer">
        <div className="container mx-auto p-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Infinite Scroll Marketplace
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
