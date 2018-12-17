import { sortObjectList } from './sort';

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
});
