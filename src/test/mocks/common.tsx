/**
 * Setup common mocks used across multiple test files
 */
// Third-Party Library Imports
import React from 'react';
import { vi } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';

/**
 * Setup mock Wrapper component for tests to provide HelmetProvider
 */

// Helper function that renders with HelmetProvider
export const renderWithHelmet = (ui: React.ReactElement): RenderResult => {
  // Use a shared context for all tests
  return render(<HelmetProvider>{ui}</HelmetProvider>);
};

// Helper function to get helmet data from the document
export const getHelmetData = () => {
  // Get actual rendered elements in the document head
  const title = document.querySelector('title')?.textContent;
  const metaTags = Array.from(document.querySelectorAll('meta')).map(meta => ({
    name: meta.getAttribute('name') || meta.getAttribute('property'),
    content: meta.getAttribute('content'),
  }));
  const linkTags = Array.from(document.querySelectorAll('link')).map(link => ({
    rel: link.getAttribute('rel'),
    href: link.getAttribute('href'),
  }));
  const scriptTags = Array.from(document.querySelectorAll('script')).map(script => ({
    type: script.getAttribute('type'),
    innerHTML: script.innerHTML,
  }));

  return {
    title,
    metaTags,
    linkTags,
    scriptTags,
  };
};

/**
 * Setup mock for Loader component
 */
export const setupLoaderMock = () => {
  vi.mock('@/components/loaders/loader', () => ({
    default: ({ fullscreen, text }: { fullscreen?: boolean; text?: string }) => (
      <div data-testid="mock-loader" data-fullscreen={fullscreen ? 'true' : 'false'}>
        {text && <span>{text}</span>}
      </div>
    ),
  }));
};

/**
 * Setup all common mocks at once
 */
export const setupCommonMocks = () => {
  setupLoaderMock();
};
