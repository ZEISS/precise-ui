import { sortObjectList, compareNumberNormal, compareArrayNormal } from './sort';

describe('data sorting', () => {
  it('should do nothing for an empty table', () => {
    const result = sortObjectList([]);
    expect(result).toEqual([]);
  });

  it('should return identity without any sorting key', () => {
    const result = sortObjectList([{ a: 1 }, { a: 20 }, { a: 9 }]);
    expect(result).toEqual([0, 1, 2]);
  });

  it('should return identity with a sorted table', () => {
    const result = sortObjectList([{ a: 1 }, { a: 5 }, { a: 9 }], 'a');
    expect(result).toEqual([0, 1, 2]);
  });

  it('should return identity with a non-sorted table by following the wrong key', () => {
    const result = sortObjectList([{ a: 1 }, { a: 50 }, { a: -9 }], 'b' as any);
    expect(result).toEqual([0, 1, 2]);
  });

  it('should return sorted indices with a non-sorted table', () => {
    const result = sortObjectList([{ a: 1 }, { a: 50 }, { a: -9 }], 'a');
    expect(result).toEqual([2, 0, 1]);
  });

  it('should return sorted indices with a non-sorted table on case sensitive strings', () => {
    const result = sortObjectList(
      [
        {
          a: 'ABHISHEK',
          b: 21,
        },
        {
          a: 'abhishek',
          b: 12,
        },
        {
          a: 'TEST',
          b: 25,
        },
        {
          a: 'test',
          b: 15,
        },
      ],
      'a',
    );
    expect(result).toEqual([1, 0, 3, 2]);
  });

  it('should return sorted indices with a non-sorted table on numbers', () => {
    const result = sortObjectList(
      [
        {
          a: 'ABHISHEK',
          b: 21,
        },
        {
          a: 'abhishek',
          b: 12,
        },
        {
          a: 'TEST',
          b: 25,
        },
        {
          a: 'test',
          b: 15,
        },
      ],
      'b',
    );
    expect(result).toEqual([1, 3, 0, 2]);
  });

  it('should return reversed sorted indices with a non-sorted table on case sensitive strings', () => {
    const result = sortObjectList(
      [
        {
          a: 'ABHISHEK',
          b: 21,
        },
        {
          a: 'abhishek',
          b: 12,
        },
        {
          a: 'TEST',
          b: 25,
        },
        {
          a: 'test',
          b: 15,
        },
      ],
      'a',
      'descending',
    );
    expect(result).toEqual([2, 3, 0, 1]);
  });

  it('should return reversed sorted indices with a non-sorted table on numbers', () => {
    const result = sortObjectList(
      [
        {
          a: 'ABHISHEK',
          b: 21,
        },
        {
          a: 'abhishek',
          b: 12,
        },
        {
          a: 'TEST',
          b: 25,
        },
        {
          a: 'test',
          b: 15,
        },
      ],
      'b',
      'descending',
    );
    expect(result).toEqual([2, 0, 3, 1]);
  });

  it('should also work when grouping is active', () => {
    const result = sortObjectList(
      [
        {
          name: 'A',
          age: 21,
        },
        {
          name: 'A',
          age: 22,
        },
        {
          name: 'A',
          age: 29,
        },
        {
          name: 'A',
          age: 11,
        },
        {
          name: 'B',
          age: 12,
        },
        {
          name: 'C',
          age: 22,
        },
        {
          name: 'C',
          age: 25,
        },
        {
          name: 'D',
          age: 15,
        },
        {
          name: 'D',
          age: 14,
        },
      ],
      'age',
      'descending',
      'name',
    );
    expect(result).toEqual([2, 1, 0, 3, 4, 6, 5, 7, 8]);
  });

  it('should return sorted indices with non-sorted table on not defined values', () => {
    const result = sortObjectList(
      [
        {
          a: undefined,
          b: 32,
        },
        {
          // tslint:disable-next-line
          a: null,
          b: 12,
        },
        {
          a: 'B',
          b: 34,
        },
        {
          a: '',
          b: 55,
        },
        {
          a: 'B',
          b: 33,
        },
        {
          b: 45,
        },
        {
          a: 'C',
          b: 27,
        },
        {
          a: false,
          b: 38,
        },
      ],
      'a',
    );

    // the items with truthy fields should be sorted at the start of the result
    expect(result.slice(0, 3)).toEqual([2, 4, 6]);

    // the order of items with falsy fields is not defined. Therefore we don't test for exact order
    expect(result.slice(3, 8)).toEqual(expect.arrayContaining([0, 1, 3, 5, 7]));
  });

  describe('sort by keys of type number', () => {
    it('should sort items with non-defined number values but still handle 0 as normal number', () => {
      const data = [
        {
          a: 'A',
          b: 0,
        },
        {
          a: 'B',
          b: 5,
        },
        {
          a: 'C',
        },
        {
          a: 'D',
          b: undefined,
        },
        {
          a: 'E',
          b: 3,
        },
        {
          a: 'F',
          b: 0,
        },
        {
          a: 'G',
          b: 1,
        },
        {
          a: 'H',
          // tslint:disable-next-line
          b: null,
        },
      ];
      const result = sortObjectList(data, 'b');
      expect(result.slice(0, 5)).toEqual([0, 5, 6, 4, 1]);

      // the order of items without a groupBy-value is not defined. Therefore we don't test for exact order
      expect(result.slice(5, 8)).toEqual(expect.arrayContaining([2, 3, 7]));
    });

    describe('internal comparator for numbers: compareNumberNormal', () => {
      it('undefined undefined', () => {
        expect(compareNumberNormal(undefined, undefined)).toBeFalsy();
      });
      it('undefined 12', () => {
        expect(compareNumberNormal(undefined, 12)).toBeFalsy();
      });
      it('12 undefined', () => {
        expect(compareNumberNormal(12, undefined)).toBeTruthy();
      });
      it('12 10', () => {
        expect(compareNumberNormal(12, 10)).toBeFalsy();
      });
      it('10 12', () => {
        expect(compareNumberNormal(10, 12)).toBeTruthy();
      });
      it('undefined 0', () => {
        expect(compareNumberNormal(undefined, 0)).toBeFalsy();
      });
      it('0 undefined', () => {
        expect(compareNumberNormal(0, undefined)).toBeTruthy();
      });
      it('10 0', () => {
        expect(compareNumberNormal(10, 0)).toBeFalsy();
      });
      it('0 10', () => {
        expect(compareNumberNormal(0, 10)).toBeTruthy();
      });
      it('0 0', () => {
        expect(compareNumberNormal(0, 0)).toBeFalsy();
      });
      it('10 10', () => {
        expect(compareNumberNormal(10, 10)).toBeFalsy();
      });

      it('0 -10', () => {
        expect(compareNumberNormal(0, -10)).toBeFalsy();
      });

      it('-10 0', () => {
        expect(compareNumberNormal(-10, 0)).toBeTruthy();
      });
    });
  });

  describe('sort keys of type array', () => {
    it('should sort items with keys of type Array and treat empty arrays as undefined values', () => {
      const data = [
        {
          a: 'A',
          b: ['a'],
        },
        {
          a: 'B',
          b: ['d'],
        },
        {
          a: 'C',
          b: [],
        },
        {
          a: 'D',
        },
        {
          a: 'E',
          b: ['c'],
        },
        {
          a: 'F',
          b: ['a'],
        },
        {
          a: 'G',
          b: ['b'],
        },
        {
          a: 'H',
          b: [],
        },
      ];
      const result = sortObjectList(data, 'b');

      expect(result.slice(0, 5)).toEqual([0, 5, 6, 4, 1]);

      // the order of items without a groupBy-value is not defined. Therefore we don't test for exact order
      expect(result.slice(5, 8)).toEqual(expect.arrayContaining([2, 3, 7]));
    });

    describe('internal comparator for numbers: compareArrayNormal', () => {
      it('undefined undefined', () => {
        expect(compareArrayNormal(undefined, undefined)).toBeFalsy();
      });
      it('undefined ["b"]', () => {
        expect(compareArrayNormal(undefined, ['b'])).toBeFalsy();
      });
      it('["b"] undefined', () => {
        expect(compareArrayNormal(['b'], undefined)).toBeTruthy();
      });
      it('["b"] ["a"]', () => {
        expect(compareArrayNormal(['b'], ['a'])).toBeFalsy();
      });
      it('["a"] ["b"]', () => {
        expect(compareArrayNormal(['a'], ['b'])).toBeTruthy();
      });
      it('undefined []', () => {
        expect(compareArrayNormal(undefined, [])).toBeFalsy();
      });
      it('[] undefined', () => {
        expect(compareArrayNormal([], undefined)).toBeFalsy();
      });
      it('["a"] []', () => {
        expect(compareArrayNormal(['a'], [])).toBeTruthy();
      });
      it('[] ["a"]', () => {
        expect(compareArrayNormal([], ['a'])).toBeFalsy();
      });
      it('[] []', () => {
        expect(compareArrayNormal([], [])).toBeFalsy();
      });
      it('["a"] ["a"]', () => {
        expect(compareArrayNormal(['a'], ['a'])).toBeFalsy();
      });
    });
  });
});
