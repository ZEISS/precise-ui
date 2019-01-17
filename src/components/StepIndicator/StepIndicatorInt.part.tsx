import * as React from 'react';
import { StepIndicatorProps } from './StepIndicator.types.part';
import { StepIndicatorHorizontal } from './StepIndicatorHorizontal.part';
import { StepIndicatorVertical } from './StepIndicatorVertical.part';

export class StepIndicatorInt extends React.PureComponent<StepIndicatorProps> {
  render() {
    const { mode, innerRef, ...props } = this.props;

    return (
      <div ref={innerRef}>
        {mode === 'horizontal' ? (
          <StepIndicatorHorizontal {...props} />
        ) : mode === 'vertical' ? (
          <StepIndicatorVertical {...props} />
        ) : (
          false
        )}
      </div>
    );
  }
}
