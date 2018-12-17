export type SelectedIndex = Array<number> | number;
export type NormalizedSelectedIndex = Array<number>;

export function normalizeIndex(indexes: SelectedIndex = []): NormalizedSelectedIndex {
  if (Array.isArray(indexes)) {
    return [...indexes];
  } else if (typeof indexes === 'number') {
    return [indexes];
  }

  return [];
}

export function toggleIndex(indexes: NormalizedSelectedIndex, target: number, multiple = false) {
  if (hasIndex(indexes, target)) {
    return indexes.filter(value => value !== target);
  } else {
    return multiple ? [...indexes, target] : [target];
  }
}

export function hasIndex(indexes: NormalizedSelectedIndex, index: number) {
  return indexes.indexOf(index) !== -1;
}
