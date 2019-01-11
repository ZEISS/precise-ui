import * as React from 'react';
import styled, { themed, StyledFunction, keyframes } from '../../utils/styled';
import { StandardProps } from '../../common';
import { remCalc } from '../../utils/remCalc';
import { distance } from '../../distance';
import { grey4, midnight } from '../../colors';

/**
 * ProgressBar type.
 */
export type ProgressBarType = 'primary' | 'secondary';

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
  /**
   * Sets the progress bar type. By default primary.
   * @default primary
   */
  type?: ProgressBarType;
}

interface StopProps {
  active: boolean;
}

export interface ProgressContainerProps {
  type: ProgressBarType;
}

const spinningWidth = 50;

const stopCreator: StyledFunction<StopProps & React.HTMLProps<HTMLInputElement>> = styled.div;

const ProgressContainer = styled.div`
  color: ${themed(props => props.theme.text)};
`;

const ProgressRail = styled<ProgressContainerProps, 'div'>('div')`
  position: relative;
  border: 0;
  background: ${themed(props => props.theme.ui4)};
  height: ${({ type }: ProgressContainerProps) => (type === 'secondary' ? distance.xsmall : distance.xxsmall)};
`;

const ProgressTitle = styled.div`
  font-size: ${remCalc('16px')};
  margin: 0 0 ${distance.medium};
  padding: 0;
  display: block;
`;

const ProgressDescription = styled.div`
  margin: ${distance.small} 0 0;
  font-size: ${remCalc('14px')};
`;

const ProgressIndicator = styled.div`
  border-radius: inherit;
  border: 0;
  background: ${themed(props => props.theme.fill)};
  height: 100%;
  width: 0;
`;

const ProgressStop = stopCreator`
  border-radius: ${distance.small};
  position: absolute;
  width: ${distance.small};
  height: ${distance.small};
  background: ${themed(props => (props.active ? props.theme.support1 : props.theme.ui7))};
  top: 50%;
  transform: translateY(-50%);
`;

const SpinningAnimation = keyframes`
  from {
    left: -${spinningWidth}%;
  }
  to {
    left: 100%;
  }
`;

const MaskContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const ProgressAnimation = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  left: -${spinningWidth}%;
  animation: ${SpinningAnimation} 2s linear infinite;
`;

function getPercent(current: number, minimum: number, maximum: number) {
  const value = ~~((100 * (current - minimum)) / (maximum - minimum));
  const percent = Math.min(Math.max(0, value), 100);
  return `${percent}%`;
}

function spinning(child: React.ReactChild) {
  return (
    <MaskContainer>
      <ProgressAnimation>{child}</ProgressAnimation>
    </MaskContainer>
  );
}

/**
 * The progress bar component displays a progress indicator ranging from min to max.
 */
export const ProgressBar: React.SFC<ProgressBarProps> = ({
  minimum = 0,
  maximum = 100,
  value: propValue,
  title,
  description,
  animate,
  stops = [],
  type = 'primary' as 'primary',
  theme,
  ...rest
}) => {
  const value = (animate === 'spinning' ? spinningWidth : propValue) || 0;
  const width = getPercent(value, minimum, maximum);
  const transition = animate ? 'width 200ms' : 'none';
  const indicator = <ProgressIndicator style={{ width, transition }} theme={theme} />;

  return (
    <ProgressContainer theme={theme}>
      {!!title && <ProgressTitle theme={theme}>{title}</ProgressTitle>}
      <ProgressRail type={type} theme={theme} {...rest}>
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
