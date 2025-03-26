import { vi } from 'vitest';

// Setup common mocks used across multiple test files

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
