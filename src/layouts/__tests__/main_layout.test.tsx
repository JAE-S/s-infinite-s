// React Core Imports
import { Provider } from 'react-redux';
// Third-Party Library Imports
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
// Store Imports
import { store } from '@/store';
// Relative Imports
import App from '../../App';

vi.mock('../../views/home/components/product-list', () => ({
  default: () => <div data-testid="mocked-product-list">Mocked Product List</div>,
}));

describe('App Component', () => {
  beforeEach(() => {
    // Mock fetch before each test
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)
    );
  });

  afterEach(() => {
    // Clean up after each test
    vi.restoreAllMocks();
  });

  test('renders without crashing', () => {
    // Render the App with the real Redux store
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check for the mocked component
    expect(screen.getByTestId('mocked-product-list')).toBeInTheDocument();
  });
});
