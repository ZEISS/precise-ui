import { remCalc } from './remCalc';

describe('util rem calculator', () => {
  it('should return 4.5rem if 72 as array passed to function', () => {
    expect(remCalc(['72'])).toBe('4.5rem');
  });

  it('should return 4.5rem if 72 as string passed to function', () => {
    expect(remCalc('72')).toBe('4.5rem');
  });

  it('should return 1rem if 16px passed to function', () => {
    expect(remCalc('16px')).toBe('1rem');
  });

  it('should return 1rem if 16px passed to function', () => {
    expect(remCalc('16px')).toBe('1rem');
  });

  it('should return 0.3125rem 0.625rem 1rem 3rem if array of [5, 10, 16, 48] passed to function', () => {
    expect(remCalc(['5', '10', '16', '48'])).toBe('0.3125rem 0.625rem 1rem 3rem');
  });
});
