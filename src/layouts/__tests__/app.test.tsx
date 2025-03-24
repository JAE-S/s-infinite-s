// Third-Party Library Imports
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Relative Imports
import App from '../../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);

    // This verifies that the component rendered something
    const appElement = screen.getByTestId('main-container');
    expect(appElement).toBeInTheDocument();
  });
});
