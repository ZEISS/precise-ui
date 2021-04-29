function compareGeneralNormal<T>(a: T, b: T) {
  return a < b;
}

function compareGeneralReverse<T>(a: T, b: T) {
  return b < a;
}

export function compareArrayNormal<T>(a: Array<T> | undefined, b: Array<T> | undefined) {
  // treat empty array like undefined
  const aIsUndefined = !a || a.length === 0;
  const bIsUndefined = !b || b.length === 0;

  if (aIsUndefined && bIsUndefined) {
    return false;
  } else {
    if (aIsUndefined) {
      return false;
    } else if (bIsUndefined) {
      return true;
    } else {
      return !!a && !!b && a < b; // double checking for not undefined is needed to satisfy typescript
    }
  }
}

function compareArrayReverse<T>(a: Array<T> | undefined, b: Array<T> | undefined) {
  return compareArrayNormal(b, a);
}

function compareStringNormal(a: string | undefined, b: string | undefined) {
  if (!a && !b) {
    return false;
  } else {
    if (!a) {
      return false;
    } else if (!b) {
      return true;
    } else {
      return a.localeCompare(b) === -1;
    }
  }
}

function compareStringReverse(a: string | undefined, b: string | undefined) {
  return compareStringNormal(b, a);
}

export function compareNumberNormal(a: number | undefined, b: number | undefined): boolean {
  if (a === b) {
    return false;
  }

  if (a === 0) {
    return !b || a < b;
  }

  if (!a) {
    return false;
  }

  if (!b && b !== 0) {
    return true;
  }

  return a < b;
}

function compareNumberReverse(a: number | undefined, b: number | undefined): boolean {
  return compareNumberNormal(b, a);
}
interface Comparer<T> {
  (a: T | undefined, b: T | undefined): boolean;
}

function getComparer<T>(exampleValue: T, reverse: boolean): Comparer<T> {
  if (typeof exampleValue === 'string') {
    return (reverse ? compareStringReverse : compareStringNormal) as Comparer<T>;
  }

  if (typeof exampleValue === 'number') {
    return (reverse ? compareNumberReverse : compareNumberNormal) as Comparer<T>;
  }

  if (Array.isArray(exampleValue)) {
    return (reverse ? compareArrayReverse : compareArrayNormal) as Comparer<T>;
  }

  return reverse ? compareGeneralReverse : compareGeneralNormal;
}

function sorter<T extends unknown>(indices: Array<number>, items: Array<T>, key: keyof T, reverse = false) {
  const values = items.map((item) => item[key]);
  const n = values.length;

  if (n > 1) {
    const firstNonFalsyValue = values.find((item) => !!item);

    const comparer = getComparer(firstNonFalsyValue, reverse);

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        const ij = indices[j];
        const ii = indices[i];

        if (comparer(values[ii], values[ij])) {
          indices[i] = ij;
          indices[j] = ii;
        }
      }
    }
  }
}

export function sortObjectList<T extends unknown>(
  items: Array<T>,
  sortBy?: keyof T,
  order: 'ascending' | 'descending' = 'ascending',
  groupBy?: keyof T,
) {
  const result = items.map((_, index) => index);

  if (sortBy) {
    sorter(result, items, sortBy, order === 'descending');
  }

  if (groupBy && groupBy !== sortBy) {
    sorter(result, items, groupBy);
  }

  return result;
}
