import { StandardProps, RefProps } from '../../common';
import { ModeProviderProps } from '../../hoc/withResponsiveMode';

export type StepIndicatorMode = 'horizontal' | 'vertical';

export interface StepIndicatorProps extends StandardProps, ModeProviderProps<StepIndicatorMode>, RefProps {
  /**
   * The current step to show as active. Zero based.
   * @default 0
   */
  current?: number;
  /**
   * Show a number in the step icon
   * @default false
   */
  numbered?: boolean;
  /**
   * The step headers to render, if any. Alternatively, just use children.
   */
  steps?: Array<React.ReactChild>;
}

export interface StepIndicatorStepProps extends StandardProps {
  /**
   * The title of the step in the StepIndicator.
   */
  header: React.ReactChild;
  /**
   * The content of the step to be rendered if open.
   */
  children?: React.ReactNode;
}
