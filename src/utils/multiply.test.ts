import { multiply } from './multiply';

describe('css value multiplier', () => {
  it('should multiply', () => {
    expect(multiply('2px', 5)).toBe('10px');
    expect(multiply('3', 4)).toBe('12');
  });
});
