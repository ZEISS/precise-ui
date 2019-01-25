function compareGeneralNormal(a: any, b: any) {
  return a < b;
}

function compareGeneralReverse(a: any, b: any) {
  return b < a;
}

function compareStringNormal(a: string, b: string) {
  if (!a) {
    return true;
  } else if (!b) {
    return false;
  } else {
    return a.localeCompare(b) === -1;
  }
}

function compareStringReverse(a: string, b: string) {
  if (!b) {
    return true;
  } else if (!a) {
    return false;
  } else {
    return b.localeCompare(a) === -1;
  }
}

function getComparer(type: string, reverse: boolean) {
  if (type !== 'string') {
    return reverse ? compareGeneralReverse : compareGeneralNormal;
  }

  return reverse ? compareStringReverse : compareStringNormal;
}

function sorter<T extends {}>(indices: Array<number>, items: Array<T>, key: keyof T, reverse = false) {
  const values = items.map(item => item[key]);
  const n = values.length;

  if (n > 1) {
    const type = typeof values[0];
    const comparer = getComparer(type, reverse);

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
