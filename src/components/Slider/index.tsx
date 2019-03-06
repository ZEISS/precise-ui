import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { ocean } from '../../colors';
import { InputProps, InputChangeEvent } from '../../common';
import { IndicatorKnob } from '../IndicatorKnob';
import { InteractiveSurface, InteractiveSurfaceChangeEvent, InteractiveSurfaceProps } from '../InteractiveSurface';
import { withFormContext, FormContextProps } from '../../hoc/withFormContext';
import { showInputInfo } from '../../utils/input';
import { KeyCodes } from '../../utils/keyCodes';
import { distance } from '../../distance';
import { transparentize } from '../../utils/colors';
import { Tooltip } from '../Tooltip';

export interface SliderChangeEvent extends InputChangeEvent<number> {
  /**
   * Gets the type of the changed value.
   */
  type: 'single' | 'multi';
  /**
   * Gets the index of the knob.
   */
  index: number;
}

export interface SliderProps extends InputProps<number | Array<number>> {
  /**
   * @ignore
   */
  children?: void;
  /**
   * Defines the color of the indicator.
   */
  color?: string;
  /**
   * Optionally sets the minimum value of the slider. By default is set to 0.
   * @default 0
   */
  minimum?: number;
  /**
   * Optionally sets the maximum value of the slider. By default is set to 1.
   * @default 1
   */
  maximum?: number;
  /**
   * Optionally sets the margin between the values.
   */
  margin?: number;
  /**
   * The stepping to use. By default is set to 0, i.e., no fixed stepping / continuous mode.
   * @default 0
   */
  step?: number;
  /**
   * Sets the orienatation of the slider. By default is set to horizontal.
   * @default horizontal
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Sets the slider as disabled, i.e., not movable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Show status tooltip
   * @default false
   */
  showTooltip?: boolean;
  /**
   * Emitted once the slider's value changed.
   */
  onChange?(e: SliderChangeEvent): void;
}

export interface SliderState {
  value: number | Array<number>;
  active: number;
  controlled: boolean;
  vertical: boolean;
  hovered: boolean;
}

interface SliderBarProps extends InteractiveSurfaceProps {
  orientation?: 'vertical' | 'horizontal';
  disabled?: boolean;
  active?: boolean;
  theme: any;
}

interface IndicatorBarProps {
  disabled?: boolean;
  active?: boolean;
  vertical: boolean;
}

interface TooltipContainerProps {
  value: string;
  vertical: boolean;
}

function percent(value?: number) {
  return typeof value === 'number' ? `${value * 100}%` : '50%';
}

const transitionDuration = '0.3s';
const transitionEase = 'cubic-bezier(0, 0, 0.25, 1)';

const SliderContainer = styled.div`
  position: relative;
  outline: 0;
  height: 100%;
`;

const SliderBar = styled(InteractiveSurface)<SliderBarProps>`
  position: relative;
  padding: ${props => (props.orientation === 'vertical' ? `0 ${distance.small}` : `${distance.small} 0`)};
  height: ${props => (props.orientation === 'vertical' ? '100%' : distance.xsmall)};
  width: ${props => (props.orientation === 'vertical' ? distance.xsmall : '100%')};
  box-sizing: content-box;

  &:after {
    content: '';
    display: block;
    border-radius: ${distance.small};
    height: 100%;
    width: 100%;
    background: ${themed(props =>
      props.disabled
        ? props.theme.ui3
        : props.active
        ? transparentize(ocean, 0.25)
        : transparentize(props.theme.ui4, 0.25),
    )};
    transition: background ${transitionDuration} ${transitionEase};
  }

  &:hover {
    cursor: pointer;

    &:after {
      background: ${transparentize(ocean, 0.25)};
    }
  }
`;

const IndicatorBar = styled('div')<IndicatorBarProps>`
  border-radius: ${distance.small};
  background: ${themed(props =>
    props.disabled ? props.theme.ui4 : props.active ? ocean : transparentize(props.theme.ui5, 0.75),
  )};
  transition: background ${transitionDuration} ${transitionEase};
  height: ${props => (props.vertical ? '100%' : distance.xsmall)};
  width: ${props => (props.vertical ? distance.xsmall : 'auto')};
  position: absolute;
  margin: auto;
`;

const TooltipContainer = styled('div')<TooltipContainerProps>`
  position: absolute;
  ${props => (props.vertical ? `top: ${props.value}` : `left: ${props.value}`)};
  ${props => (props.vertical ? `left: ${distance.large}` : `top: -${distance.large}`)};
  width: 0;
  height: 0;

  > div {
    display: ${props => (props.vertical ? `block` : `inline-block`)};
  }
`;

class SliderInt extends React.PureComponent<SliderProps & FormContextProps, SliderState> {
  constructor(props: SliderProps) {
    super(props);
    const value = props.value || props.defaultValue;

    this.state = {
      value: Array.isArray(value) ? value : [value || 0],
      vertical: props.orientation === 'vertical',
      active: 0,
      controlled: typeof props.value !== 'undefined',
      hovered: false,
    };
  }

  componentDidMount() {
    const { form } = this.props;
    const { controlled } = this.state;

    if (!controlled && form) {
      form.subscribe(this);
    }
  }

  componentWillUnmount() {
    const { form } = this.props;
    const { controlled } = this.state;

    if (!controlled && form) {
      form.unsubscribe(this);
    }
  }

  componentWillReceiveProps(nextProps: SliderProps) {
    if (this.state.controlled) {
      const { value } = this.state;
      const newValue = nextProps.value === undefined ? value : nextProps.value;

      this.setState({
        value: newValue,
      });
    }

    this.setState({
      vertical: nextProps.orientation === 'vertical',
    });
  }

  private getClosestKnob(current: number) {
    const values = this.state.value;

    if (Array.isArray(values)) {
      const dists = values.map(val => Math.abs(val - current));
      const length = dists.length;
      let minIndex = 0;

      for (let i = 0; i < length; i++) {
        const curValue = dists[i];
        const minValue = dists[minIndex];

        if (curValue < minValue || (curValue === minValue && current > values[i])) {
          minIndex = i;
        }
      }

      return minIndex + 1;
    }

    return 1;
  }

  private selectValue(selected: number, knob: number) {
    const { margin = 0 } = this.props;
    const current = this.state.value;

    if (Array.isArray(current)) {
      const value = [...current];
      const upper = value[knob];
      const lower = value[knob - 2];

      if (lower + margin > selected) {
        value[knob - 1] = lower + margin;
      } else if (upper - margin < selected) {
        value[knob - 1] = upper - margin;
      } else {
        value[knob - 1] = selected;
      }

      return value;
    }

    return selected;
  }

  private setValue(position: number, knob: number) {
    const { onChange, maximum = 1, minimum = 0, step = 0, disabled, form, name = '' } = this.props;

    if (!disabled) {
      const current = this.state.value;
      const length = Array.isArray(current) ? current.length : 1;
      const multi = length > 1;
      const previous = Array.isArray(current) ? current[knob - 1] : current;
      const valid = Math.abs(position - previous) >= step && position >= minimum && position <= maximum;
      const selected = position - (step && (position - previous) % step);

      if (!this.state.controlled && valid) {
        const value = this.selectValue(selected, knob);

        if (form) {
          form.change({
            name,
            value,
          });
        } else {
          this.setState({
            value,
          });
        }
      }

      this.setState({
        active: knob,
      });

      if (valid && typeof onChange === 'function') {
        onChange({
          value: selected,
          index: knob - 1,
          type: multi ? 'multi' : 'single',
        });
      }
    }
  }

  private updateValue = (e: InteractiveSurfaceChangeEvent) => {
    const { maximum = 1, minimum = 0 } = this.props;
    const v = this.state.vertical ? 1 - e.y : e.x;
    const position = minimum + v * (maximum - minimum);
    const value = this.state.value;
    const length = Array.isArray(value) ? value.length : 1;
    const multi = length > 1;
    const knob = this.state.active || (multi ? this.getClosestKnob(position) : 1);
    this.setValue(position, e.active ? knob : 0);
  };

  private controlKnob(change: boolean, dir: number, step: number) {
    const { active, value } = this.state;
    const length = Array.isArray(value) ? value.length : 1;
    const multi = length > 1;
    const knob = active || 1;

    if (change) {
      this.setValue(value[knob - 1] + dir * step, knob);
    } else if (multi) {
      const newActive = knob + dir;

      if (newActive <= length && newActive > 0) {
        this.setState({
          active: newActive,
        });
      }
    }
  }

  private control = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { minimum = 0, maximum = 1, onInput } = this.props;
    const { step = Math.min(1, (maximum - minimum) / 10) } = this.props;
    const { active, vertical } = this.state;
    const knob = active || 1;

    switch (e.keyCode) {
      case KeyCodes.up:
      case KeyCodes.down:
        this.controlKnob(vertical, 39 - e.keyCode, step);
        break;
      case KeyCodes.left:
      case KeyCodes.right:
        this.controlKnob(!vertical, e.keyCode - 38, step);
        break;
      case KeyCodes.home:
        this.setValue(minimum, knob);
        break;
      case KeyCodes.end:
        this.setValue(maximum, knob);
        break;
      case KeyCodes.escape:
        this.setState({
          active: 0,
        });
      case KeyCodes.enter:
      case KeyCodes.space:
      default:
        if (typeof onInput === 'function') {
          onInput();
        }
        return;
    }

    e.preventDefault();
  };

  private handleMouseEnter = () => {
    this.setState({ hovered: true });
  };

  private handleMouseLeave = () => {
    this.setState({ hovered: false });
  };

  private countDecimals(val: number) {
    if (Math.floor(val) === val) return 0;
    return val.toString().split('.')[1].length || 0;
  }

  private updateTooltipValue = (val: number) => {
    const { maximum = 1, step } = this.props;
    const decimalPlaces = step && step < 1 ? this.countDecimals(step) : 0;
    return !step && maximum <= 1 ? `${val.toFixed(1)}` : `${val.toFixed(decimalPlaces)}`;
  };

  render() {
    const {
      children: _0,
      value: _1,
      defaultValue: _2,
      disabled,
      onChange: _3,
      margin: _4,
      step,
      minimum = 0,
      maximum = 1,
      color,
      theme,
      info,
      error,
      onBlur,
      onFocus,
      showTooltip,
      ...props
    } = this.props;
    const { value, active, vertical, hovered } = this.state;
    const values = Array.isArray(value) ? value : [value];
    const ind = values.length === 1 ? (100 * (values[0] - minimum)) / (maximum - minimum) : 0;

    return (
      <SliderContainer
        theme={theme}
        tabIndex={0}
        onKeyDown={this.control}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <SliderBar {...props} theme={theme} onChange={this.updateValue} active={active !== 0} disabled={disabled}>
          {ind > 0 && (
            <IndicatorBar
              style={{ [vertical ? 'height' : 'width']: `${ind}%` }}
              vertical={vertical}
              active={active !== 0 || hovered}
              disabled={disabled}
            />
          )}
          {values.map((val, index) => (
            <div key={index}>
              {showTooltip && (
                <TooltipContainer
                  vertical={vertical}
                  value={percent(
                    vertical ? 1.0 - (val - minimum) / (maximum - minimum) : (val - minimum) / (maximum - minimum),
                  )}>
                  <Tooltip
                    content={this.updateTooltipValue(val)}
                    position={vertical ? 'right' : 'top'}
                    open={active === index + 1}
                  />
                </TooltipContainer>
              )}
              <IndicatorKnob
                x={vertical ? 0.5 : (val - minimum) / (maximum - minimum)}
                y={vertical ? 1.0 - (val - minimum) / (maximum - minimum) : 0.5}
                key={index}
                color={color}
                active={active === index + 1 || hovered}
                theme={theme}
                disabled={disabled}
              />
            </div>
          ))}
        </SliderBar>
        {showInputInfo(error, info)}
      </SliderContainer>
    );
  }
}

/**
 * The slider component displays a data value picker in form of a sliding bar.
 */
export const Slider = withFormContext(SliderInt);
Slider.displayName = 'Slider';
