// vitest.setup.ts
import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

// Add custom matchers for accessibility testing
expect.extend({ toHaveNoViolations });
