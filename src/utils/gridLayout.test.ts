import { checkAllocation, findAllocation, updateAllocation } from './gridLayout';

describe('gridLayout', () => {
  it('checkAllocation should be true if vacant', () => {
    const layout = {
      allocations: [[false, false], [false, true]],
      flexCols: false,
      flexRows: false,
    };
    const result = checkAllocation(layout, 0, 0, 1, 1);
    expect(result).toBeTruthy();
  });

  it('checkAllocation should be false if directly occupied', () => {
    const layout = {
      allocations: [[false, false], [false, true]],
      flexCols: false,
      flexRows: false,
    };
    const result = checkAllocation(layout, 1, 1, 1, 1);
    expect(result).toBeFalsy();
  });

  it('checkAllocation should be false if indirectly occupied for column', () => {
    const layout = {
      allocations: [[false, false], [false, true]],
      flexCols: false,
      flexRows: false,
    };
    const result = checkAllocation(layout, 1, 0, 1, 2);
    expect(result).toBeFalsy();
  });

  it('checkAllocation should be false if indirectly occupied for row', () => {
    const layout = {
      allocations: [[false, false], [false, true]],
      flexCols: false,
      flexRows: false,
    };
    const result = checkAllocation(layout, 0, 1, 2, 1);
    expect(result).toBeFalsy();
  });

  it('checkAllocation should be false if indirectly occupied for both', () => {
    const layout = {
      allocations: [[false, false], [false, true]],
      flexCols: false,
      flexRows: false,
    };
    const result = checkAllocation(layout, 0, 0, 2, 2);
    expect(result).toBeFalsy();
  });

  it('findAllocation should return first place for 1x1 block', () => {
    const layout = {
      allocations: [[true, false], [false, false]],
      flexCols: false,
      flexRows: false,
    };
    const allocation = findAllocation(layout, { colSpan: 1, rowSpan: 1 });
    expect(allocation).toEqual({
      ci: 1,
      cf: 2,
      ri: 0,
      rf: 1,
    });
  });

  it('findAllocation should return second place for 1x2 block', () => {
    const layout = {
      allocations: [[true, false], [false, false]],
      flexCols: false,
      flexRows: false,
    };
    const allocation = findAllocation(layout, { colSpan: 2, rowSpan: 1 });
    expect(allocation).toEqual({
      ci: 0,
      cf: 2,
      ri: 1,
      rf: 2,
    });
  });

  it('findAllocation should return first place for 2x1 block', () => {
    const layout = {
      allocations: [[true, false], [false, false]],
      flexCols: false,
      flexRows: false,
    };
    const allocation = findAllocation(layout, { colSpan: 1, rowSpan: 2 });
    expect(allocation).toEqual({
      ci: 1,
      cf: 2,
      ri: 0,
      rf: 2,
    });
  });

  it('findAllocation should return undefined for 2x2 block', () => {
    const layout = {
      allocations: [[true, false], [false, false]],
      flexCols: false,
      flexRows: false,
    };
    const allocation = findAllocation(layout, { colSpan: 2, rowSpan: 2 });
    expect(allocation).toBeUndefined();
  });

  it('findAllocation should return fixed place for fixed block', () => {
    const layout = {
      allocations: [[true, false], [false, false]],
      flexCols: false,
      flexRows: false,
    };
    const allocation = findAllocation(layout, { colSpan: 1, rowSpan: 2, column: 0, row: 0 });
    expect(allocation).toEqual({
      ci: 0,
      cf: 1,
      ri: 0,
      rf: 2,
    });
  });

  it('updateAllocation should mutate the allocations with the placement', () => {
    const allocations = [[true, false], [false, false]];
    updateAllocation(allocations, {
      ci: 1,
      cf: 2,
      ri: 0,
      rf: 2,
    });
    expect(allocations).toEqual([[true, true], [false, true]]);
  });
});
