import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from '../../App';

// Set up necessary jsdom environment
// @vitest-environment jsdom

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);

    // This verifies that the component rendered something
    const appElement = screen.getByTestId('main-container');
    expect(appElement).toBeInTheDocument();
  });
});
