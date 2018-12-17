import { unit } from './unit';

describe('util function unit', () => {
  it('should return empty string when just number passed', () => {
    expect(unit('100')).toBe('');
  });

  it('should return px when 50px passed', () => {
    expect(unit('50px')).toBe('px');
  });

  it('should return % when 10% passed', () => {
    expect(unit('10%')).toBe('%');
  });

  it('should return alphabetical order', () => {
    expect(unit('50px 1cm')).toBe('cm,px');
  });
});
