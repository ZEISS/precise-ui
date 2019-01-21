import * as React from 'react';
import { StepIndicatorInt } from './StepIndicatorInt.part';
import { StepIndicatorProps, StepIndicatorMode } from './StepIndicator.types.part';
import { withResponsiveMode } from '../../hoc/withResponsiveMode';
import { breakpoints } from '../../themes';

export { StepIndicatorMode, StepIndicatorProps };
export { StepIndicatorStep } from './StepIndicatorStep.part';

export interface StepIndicatorType extends React.SFC<StepIndicatorProps> {
  (props: StepIndicatorProps & { children?: React.ReactNode }, context?: any): JSX.Element;
}

export const StepIndicator: StepIndicatorType = withResponsiveMode<StepIndicatorMode>(width =>
  !width || width > breakpoints.medium ? 'horizontal' : 'vertical',
)(StepIndicatorInt) as any;
