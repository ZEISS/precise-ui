import { stripUnit } from './stripUnit';
import { unit } from './unit';

export function multiply(input: string, multiplyValue: number) {
  const units = unit(input);
  const value = stripUnit(input);
  return value * multiplyValue + units;
}
