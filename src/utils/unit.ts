export function unit(value: string): string {
  const regex = /([a-zA-Z&._%$]+)/gi;
  const units: Array<String> | null = value.match(regex);

  if (units) {
    return units.sort().toString();
  }

  return '';
}
