import * as React from 'react';
import styled, { themed, StyledFunction, keyframes } from '../../utils/styled';
import { StandardProps } from '../../common';
import { remCalc } from '../../utils/remCalc';
import { distance } from '../../distance';

export interface ProgressBarProps extends StandardProps {
  /**
   * @ignore
   */
  children?: void;
  /**
   * Shows animations between value updates.
   * @default false
   */
  animate?: boolean | 'spinning';
  /**
   * The minimum value, which is by default 0.
   * @default 0
   */
  minimum?: number;
  /**
   * The maximum value, which is by default 100.
   * @default 100
   */
  maximum?: number;
  /**
   * The current value, which is by default 0.
   * @default 0
   */
  value?: number;
  /**
   * The optional title to be displayed.
   */
  title?: string;
  /**
   * The optional stops to be displayed.
   */
  stops?: Array<number>;
  /**
   * The optional description to be displayed.
   */
  description?: string;
}

interface StopProps {
  active: boolean;
}

const stopCreator: StyledFunction<StopProps & React.HTMLProps<HTMLInputElement>> = styled.div;

const ProgressContainer = styled.div`
  color: ${themed(props => props.theme.text)};
`;

const ProgressRail = styled.div`
  border-radius: 4px;
  position: relative;
  border: 0;
  background: ${themed(props => props.theme.textDisabled)};
  height: 8px;
`;

const ProgressTitle = styled.h2`
  font-size: ${remCalc('24px')};
  font-weight: 200;
  margin: 0 0 ${distance.small} 0;
  padding: 0;
  display: block;
`;

const ProgressDescription = styled.div`
  margin: 10px 0 0 0;
  font-size: ${remCalc('12px')};
`;

const ProgressIndicator = styled.div`
  border-radius: inherit;
  border: 0;
  background: ${themed(props => props.theme.fill)};
  height: 100%;
  width: 0;
`;

const ProgressStop = stopCreator`
  border-radius: 12px;
  position: absolute;
  width: 12px;
  height: 12px;
  top: -4px;
  background: ${themed(props => (props.active ? props.theme.fill : props.theme.textDisabled))};
  border: 2px solid ${themed(props => props.theme.background)};
  transform: translate(-50%, 0);
`;

const SpinningAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const ProgressAnimation = styled.div`
  height: 8px;
  border-radius: 4px;
  animation: ${SpinningAnimation} 3s infinite;
`;

function getPercent(current: number, minimum: number, maximum: number) {
  const value = ~~((100 * (current - minimum)) / (maximum - minimum));
  const percent = Math.min(Math.max(0, value), 100);
  return `${percent}%`;
}

function spinning(child: React.ReactChild) {
  return <ProgressAnimation>{child}</ProgressAnimation>;
}

/**
 * The progress bar component displays a progress indicator ranging from min to max.
 */
export const ProgressBar: React.SFC<ProgressBarProps> = ({
  minimum = 0,
  maximum = 100,
  value = 0,
  title,
  description,
  animate,
  stops = [],
  ...props
}) => {
  const { theme } = props;
  const width = getPercent(value, minimum, maximum);
  const transition = animate ? 'width 200ms' : 'none';
  const indicator = <ProgressIndicator style={{ width, transition }} theme={theme} />;

  return (
    <ProgressContainer theme={theme}>
      {!!title && <ProgressTitle theme={theme}>{title}</ProgressTitle>}
      <ProgressRail {...props}>
        {animate === 'spinning' ? spinning(indicator) : indicator}
        {stops.map((stop, index) => (
          <ProgressStop
            key={`${index}-at-${stop}`}
            style={{ left: getPercent(stop, minimum, maximum) }}
            active={stop <= value}
            theme={theme}
          />
        ))}
      </ProgressRail>
      {!!description && <ProgressDescription theme={theme}>{description}</ProgressDescription>}
    </ProgressContainer>
  );
};
ProgressBar.displayName = 'ProgressBar';
