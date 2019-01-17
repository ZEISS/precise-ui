import * as React from 'react';
import { StepIndicatorInt } from './StepIndicatorInt.part';
import { StepIndicatorProps, StepIndicatorMode } from './StepIndicator.types.part';
import { withResponsiveMode, ModeProviderState } from '../../hoc/withResponsiveMode';
import { breakpoints } from '../../themes';

export { StepIndicatorMode, StepIndicatorProps } from './StepIndicator.types.part';
export { StepIndicatorStep } from './StepIndicatorStep.part';

export const StepIndicator = withResponsiveMode<StepIndicatorMode>(width =>
  !width || width > breakpoints.medium ? 'horizontal' : 'vertical',
)(StepIndicatorInt);
