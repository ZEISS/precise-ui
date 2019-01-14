import { remCalc } from './utils/remCalc';

export const distancePx = {
  xxsmall: 2,
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
  xxxlarge: 64,
};

export type Distance = { [T in keyof typeof distancePx]: string };

export const distance = Object.keys(distancePx).reduce(
  (distance, name) => {
    distance[name] = remCalc(`${distancePx[name]}px`);
    return distance;
  },
  {} as Distance,
);
