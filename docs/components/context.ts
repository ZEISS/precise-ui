import { PreciseTheme } from '../../src';

export interface AppState {
  theme: PreciseTheme;
}

declare global {
  interface Window {
    setContext?<K extends keyof AppState>(state: Pick<AppState, K>): void;
    context: AppState;
  }
}
