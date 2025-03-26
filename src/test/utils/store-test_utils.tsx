// React Core Imports
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
// Third-Party Library Imports
import { render, RenderOptions } from '@testing-library/react';
import { vi } from 'vitest';
// Store Imports
import { store } from '@/store';

export function renderWithStore(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    ...options,
  });
}

// Mock fetch responses
export function mockFetch() {
  const originalFetch = global.fetch;

  global.fetch = vi.fn().mockImplementation((url, _options) => {
    if (typeof url === 'string' && url.includes('/products')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            products: [
              {
                id: '1',
                title: 'Test Product',
                description: 'Test description',
                price: 99.99,
                images: ['/test-image.jpg'],
                rating: 4.5,
              },
            ],
            total: 1,
            limit: 10,
            skip: 0,
          }),
      });
    }

    // Default response for unmocked routes
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
    });
  });

  // Return cleanup function
  return () => {
    global.fetch = originalFetch;
  };
}
