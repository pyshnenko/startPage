import { describe, expect, it } from 'vitest';

describe('application test environment', () => {
  it('supports the browser APIs used by the app', () => {
    expect(window.localStorage).toBeDefined();
    expect(window.matchMedia).toBeDefined();
  });
});
