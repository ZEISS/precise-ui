export interface Labels {
  [key: string]: string;
}

const defaultLabels: Labels = {};

export function setLabels(labels: Labels) {
  for (const key of Object.keys(labels)) {
    const value = labels[key];
    defaultLabels[key] = value;
    defaultLabels[key + 'Label'] = value;
  }
}

export function getLabel(key: string) {
  return defaultLabels[key] || '';
}

export function getPropLabel<TProps, TKey extends keyof TProps>(
  props: TProps,
  name: TKey & string,
): Required<TProps>[TKey] | string {
  const value = props[name];

  if (value === undefined) {
    return getLabel(name);
  }

  return value;
}
