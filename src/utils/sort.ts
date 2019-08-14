function compareGeneralNormal(a: any, b: any) {
  return a < b;
}

function compareGeneralReverse(a: any, b: any) {
  return b < a;
}

export function compareArrayNormal(a: Array<any> | undefined, b: Array<any> | undefined) {
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

function compareArrayReverse(a: Array<any> | undefined, b: Array<any> | undefined) {
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
  if (!a && !b) {
    return false;
  } else {
    if (!b) {
      return true;
    } else if (!a) {
      return false;
    } else {
      return b.localeCompare(a) === -1;
    }
  }
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

function getComparer(exampleValue: any, reverse: boolean): (a: any, b: any) => boolean {
  if (typeof exampleValue === 'string') {
    return reverse ? compareStringReverse : compareStringNormal;
  }

  if (typeof exampleValue === 'number') {
    return reverse ? compareNumberReverse : compareNumberNormal;
  }

  if (Array.isArray(exampleValue)) {
    return reverse ? compareArrayReverse : compareArrayNormal;
  }

  return reverse ? compareGeneralReverse : compareGeneralNormal;
}

function sorter<T extends {}>(indices: Array<number>, items: Array<T>, key: keyof T, reverse = false) {
  const values = items.map(item => item[key]);
  const n = values.length;

  if (n > 1) {
    const firstNonFalsyValue = values.find(item => !!item);

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

export function sortObjectList<T extends {}>(
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
