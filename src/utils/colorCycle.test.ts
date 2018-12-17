import * as colors from '../colors';
import { colorCycle } from './colorCycle';
import { light } from '../themes';

const standardColors = light.colorCycle;

describe('util function colorCycle', () => {
  it('should return the correct color for two digits FR', () => {
    expect(colorCycle(standardColors, 'FR')).toBe(colors.orange);
  });

  it('should return the default color for an empty string', () => {
    expect(colorCycle(standardColors, '')).toBe(colors.cyan);
  });

  it('should return the default color for no argument', () => {
    expect(colorCycle()).toBe(colors.cyan);
  });

  it('should return the default color for a single argument', () => {
    expect(colorCycle(standardColors)).toBe(colors.cyan);
  });

  it('should return the default color for an empty cycle', () => {
    expect(colorCycle([], 'AB')).toBe(colors.cyan);
  });

  it('should return the default color for an undefined cycle', () => {
    expect(colorCycle(undefined, 'AB')).toBe(colors.cyan);
  });

  it('should return the correct color for some longer input', () => {
    expect(colorCycle(standardColors, 'Something')).toBe(colors.grey1);
  });

  it('should return the correct color for a single digit', () => {
    expect(colorCycle(standardColors, 'A')).toBe(colors.grey1);
  });

  it('should return the correct color for two digits ZY', () => {
    expect(colorCycle(standardColors, 'ZY')).toBe(colors.orangeNeon);
  });
});
