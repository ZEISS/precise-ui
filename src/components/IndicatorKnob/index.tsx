import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { ocean, midnight } from '../../colors';

interface IndicatorProps {
  active?: boolean;
  disabled?: boolean;
  animate?: boolean;
  focus?: boolean;
}

const transitionDuration = '0.3s';
const transitionDurationBorder = '0.2s';
const transitionEase = 'cubic-bezier(0, 0, 0.25, 1)';

const Indicator = styled('div')<IndicatorProps>`
  width: ${distance.large};
  height: ${distance.large};
  position: absolute;
  border: ${themed(props =>
    props.disabled || !props.focus ? 'none' : `${distance.xsmall} solid ${props.active ? midnight : props.theme.text1}`,
  )};
  border-radius: 50%;
  background: ${themed(props =>
    props.disabled ? props.theme.ui3 : props.active ? props.theme.ui0 : props.theme.text2,
  )};
  transform: translate(-50%, -50%);
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  box-sizing: border-box;
  transition: background ${transitionDuration} ${transitionEase},
    border ${transitionDurationBorder} ${transitionEase}
      ${props => (props.animate ? `, left ${transitionDuration} ${transitionEase}` : '')};

  &:hover {
    border: ${themed(props =>
      props.disabled ? 'none' : `${distance.xsmall} solid ${props.active ? ocean : props.theme.ui5}`,
    )};
  }
`;

function percent(value?: number) {
  return typeof value === 'number' ? `${value * 100}%` : '50%';
}

export interface IndicatorKnobProps extends StandardProps {
  /**
   * @ignore
   */
  children?: void;
  /**
   * Indicates the x position of the knob in the 0 to 1 range. By default 0.5.
   * @default 0.5
   */
  x?: number;
  /**
   * Indicates the y position of the knob in the 0 to 1 range. By default 0.5.
   * @default 0.5
   */
  y?: number;
  /**
   * Sets the background color of the knob.
   */
  color?: string;
  /**
   * Sets the indicator as active.
   * @default false
   */
  active?: boolean;
  /**
   * Sets the indicator as focused.
   * @default false
   */
  focus?: boolean;
  /**
   * Sets the indicator as disabled, i.e., not movable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Animate the position of the indicator
   * @default false
   */
  animate?: boolean;
}

/**
 * The indicator knob is a button like component that is placed in a container to indicate a position.
 */
export const IndicatorKnob: React.SFC<IndicatorKnobProps> = ({ x, y, color, style, ...props }) => (
  <Indicator
    style={{
      ...style,
      left: percent(x),
      top: percent(y),
      backgroundColor: color,
    }}
    {...props}
  />
);
IndicatorKnob.displayName = 'IndicatorKnob';
