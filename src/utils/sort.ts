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

export function sortObjectList<T extends {}>(
  data: Array<T>,
  sortBy?: keyof T,
  order: 'ascending' | 'descending' = 'ascending',
) {
  const result = data.map((_, index) => index);

  if (sortBy) {
    const rev = order === 'descending';
    const values = data.map(item => item[sortBy]);
    const n = values.length;

    if (n > 1) {
      const type = typeof values[0];
      const comparer = getComparer(type, rev);

      for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
          const ij = result[j];
          const ii = result[i];

          if (comparer(values[ii], values[ij])) {
            result[i] = ij;
            result[j] = ii;
          }
        }
      }
    }
  }

  return result;
}
