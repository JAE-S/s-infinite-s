// Third-Party Library Imports
import { vi } from 'vitest';

export const setupIconMocks = () => {
  // Info icon mock
  vi.mock('@/components/icons/info', () => ({
    default: () => <div data-testid="info-icon">InfoIcon</div>,
  }));

  // Shopping cart icon mock
  vi.mock('@/components/icons/shopping-cart', () => ({
    default: () => <div data-testid="shopping-cart-icon">CartIcon</div>,
  }));

  // Star icon mock
  vi.mock('@/components/icons/star', () => ({
    default: ({ className }: { className: string }) => (
      <div data-testid="star-icon" className={className}>
        StarIcon
      </div>
    ),
  }));
};
