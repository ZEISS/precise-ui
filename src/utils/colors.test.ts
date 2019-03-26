import { transparentize, parseColor } from './colors';

describe('colors', () => {
  describe('parseColor', () => {
    it('should parse hex color correctly', () => {
      expect(parseColor('#4d4f53')).toEqual({ r: 77, g: 79, b: 83, a: 1 });
    });
  });

  describe('transparentize', () => {
    it('should return correct transparent color when using hex', () => {
      expect(transparentize('#4d4f53', 0.7)).toBe('rgba(77, 79, 83, 0.7)');
    });

    it('should return correct transparent color when using rgb', () => {
      expect(transparentize('rgb(77, 79, 83)', 0.7)).toBe('rgba(77, 79, 83, 0.7)');
    });

    it('should return correct transparent color when using rgba', () => {
      expect(transparentize('rgba(77, 79, 83, 1)', 0.7)).toBe('rgba(77, 79, 83, 0.7)');
    });
  });
});
