import { unit } from './unit';
import { stripUnit } from './stripUnit';

function calcBasis(myBase: string) {
  const myUnit = unit(myBase);
  const num = stripUnit(myBase);

  // If the base font size is a %, then multiply it by 16px
  // This is because 100% font size = 16px in most all browsers
  if (myUnit === '%') {
    return (num / 100) * 16;
  }

  // Using rem as base allows correct scaling
  if (myUnit === 'rem') {
    return num * 16;
  }

  return num;
}

function convertArray(input: Array<string>, baseNum: number) {
  const output: Array<string> = [];

  for (const value of input) {
    output.push(`${stripUnit(value) / baseNum}rem`);
  }

  return output.join(' ');
}

/**
 * Converts one or more pixel values into matching rem values.
 * @param values One or more values to convert.
 * @param base The base value to use when calculating the `rem`.
 */
export function remCalc(input: Array<string> | string, base?: string): string {
  // If no base is defined, defer to the global font size
  const myBase = base || '16px';
  const baseNum = calcBasis(myBase);

  if (typeof input === 'string') {
    return `${stripUnit(input) / baseNum}rem`;
  }

  return convertArray(input, baseNum);
}
