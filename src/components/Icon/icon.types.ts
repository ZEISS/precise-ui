import * as icons from './icons';

declare global {
  interface AdditionalIconNames {} // eslint-disable-line
}

export type IconName = keyof typeof icons | keyof AdditionalIconNames;
export const IconNames = Object.keys(icons);
