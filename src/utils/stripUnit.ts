/**
 * Removes the unit (e.g. px, em, rem) from a value, returning the number only.
 * @param value String to strip unit from.
 * @returns The same number without unit if value undefined
 */
export function stripUnit(value: string): number {
  return +value.replace(/[^0-9\.]+/g, '');
}
