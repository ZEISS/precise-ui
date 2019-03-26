import { normalizeIndex, toggleIndex, hasIndex } from './indexHelper';

describe('indexHelper', () => {
  describe('normalizeIndex', () => {
    it('should normilize when empty value passed', () => {
      expect(normalizeIndex()).toEqual([]);
    });

    it('should transform number into array', () => {
      expect(normalizeIndex(5)).toEqual([5]);
    });

    it('should not change array', () => {
      expect(normalizeIndex([5, 1])).toEqual([5, 1]);
    });
  });

  describe('toggleIndex', () => {
    it('should toggle index', () => {
      expect(toggleIndex([5, 1], 5, true)).toEqual([1]);
      expect(toggleIndex([5, 1], 6, true)).toEqual([5, 1, 6]);
      expect(toggleIndex([1], 6, false)).toEqual([6]);
      expect(toggleIndex([1], 1, false)).toEqual([]);
    });
  });

  describe('hasIndex', () => {
    it('hasIndex', () => {
      expect(hasIndex([5, 1], 5)).toBeTruthy();
      expect(hasIndex([5, 1], 6)).toBeFalsy();
    });
  });
});
