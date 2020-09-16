import * as React from 'react';
import styled from '../../utils/styled';
import { InputProps } from '../../common';
import { Slider, SliderChangeEvent } from '../Slider';
import { IndicatorKnob } from '../IndicatorKnob';
import { InteractiveSurface, InteractiveSurfaceChangeEvent } from '../InteractiveSurface';
import { rgbToHsv, hsvToRgb, parseColor } from '../../utils/colors';
import { withFormContext, FormContextProps } from '../../hoc/withFormContext';
import { showInputInfo } from '../../utils/input';
import { distance } from '../../distance';
import { PaddedContainer } from '../PaddedContainer';
import { InputNotification } from '../InputNotification';

export interface ColorChangeEvent {
  /**
   * Gets the selected color.
   */
  value: FullColor;
}

export interface FullColor {
  h: number;
  s: number;
  v: number;
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface RgbaColor {
  /**
   * The red part of the color.
   */
  r: number;
  /**
   * The green part of the color.
   */
  g: number;
  /**
   * The blue part of the color.
   */
  b: number;
  /**
   * The optional alpha part of the color - by default 1.
   */
  a?: number;
}

export interface ColorPickerProps extends InputProps<FullColor | RgbaColor | string> {
  /**
   * Sets if the color wheel bar should be hidden.
   */
  hideBar?: boolean;
  /**
   * Sets if the transparency can be changed.
   */
  allowOpacity?: boolean;
  /**
   * Emitted once color changed.
   */
  onChange?(e: ColorChangeEvent): void;
  /**
   * Sets the height of the picker area, usually 200px.
   */
  height?: string;
  /**
   * Sets the width of the picker area, usually 100%.
   */
  width?: string;
  /**
   * @ignore
   */
  children?: void;
}

export interface ColorPickerState {
  controlled: boolean;
  value: FullColor;
  error?: React.ReactChild;
  base: RgbaColor;
  active: boolean;
}

function rgb(c: RgbaColor) {
  return `rgb(${c.r}, ${c.g}, ${c.b})`;
}

function computeColor(color: FullColor | RgbaColor | string) {
  const fc = color as FullColor;

  if (typeof color === 'string') {
    color = parseColor(color);
  } else if (typeof fc.h === 'number') {
    return {
      hsv: fc,
      color,
      base: hsvToRgb(fc.h, 1, 1),
    };
  } else {
    color = {
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a,
    };
  }

  const hsv = rgbToHsv(color.r, color.g, color.b, color.a);

  return {
    hsv,
    color,
    base: hsvToRgb(hsv.h, 1, 1),
  };
}

const PickerContainer = styled.div`
  margin: ${distance.small};
`;

interface PickerSurfaceProps {
  color: string;
  width: string;
  height: string;
}

const PickerSurface = styled(InteractiveSurface)<PickerSurfaceProps>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: relative;
  background-color: ${props => props.color};
`;

const PickerSaturation = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, black 100%);
`;

const PickerValue = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(to right, white 0%, transparent 100%);
`;

const ColorSlider = styled(Slider)`
  margin: ${distance.large} 0 -${distance.xsmall} 0;
  background: linear-gradient(
    to left,
    red 0,
    #f09 10%,
    #cd00ff 20%,
    #3200ff 30%,
    #06f 40%,
    #00fffd 50%,
    #0f6 60%,
    #35ff00 70%,
    #cdff00 80%,
    #f90 90%,
    red 100%
  );
`;

const OpacitySlider = styled(Slider)`
  margin: ${distance.large} 0 -${distance.xsmall} 0;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==');
  &:before {
    background: linear-gradient(to right, transparent 0px, rgba(0, 117, 120, 0.357) 100%);
    border-radius: 10px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    content: '';
  }
`;

interface ColorIndicatorProps {
  disabled?: boolean;
  active: boolean;
}

const ColorIndicator = styled(IndicatorKnob)<ColorIndicatorProps>`
  box-shadow: 0 0 20px -5px ${props => (props.disabled ? 'transparent' : '#000')};
  border: 2px solid ${props => (props.disabled ? '#ccc' : props.active ? '#eee' : '#fff')};
`;

class ColorPickerInt extends React.PureComponent<ColorPickerProps & FormContextProps, ColorPickerState> {
  constructor(props: ColorPickerProps) {
    super(props);
    const { hsv, color, base } = computeColor(props.value || props.defaultValue || { r: 0, g: 0, b: 0 });

    this.state = {
      controlled: props.value !== undefined,
      active: false,
      value: {
        a: 1,
        ...color,
        h: hsv.h,
        s: hsv.s,
        v: hsv.v,
      },
      base,
      error: props.error,
    };
  }

  componentWillReceiveProps({ value, error }: ColorPickerProps) {
    if (value && value !== this.state.value) {
      const { hsv, color, base } = computeColor(value || this.state.value);

      this.setState({
        value: {
          a: 1,
          ...color,
          h: hsv.h,
          s: hsv.s,
          v: hsv.v,
        },
        base,
      });
    }
    this.setState({ error });
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

  private changeTo<K extends keyof ColorPickerState>(state: Pick<ColorPickerState, K>) {
    const { form, name = '' } = this.props;

    if (form) {
      form.change({
        name,
        value: (state as Pick<ColorPickerState, 'value'>).value,
      });
    } else {
      this.setState(state);
    }
  }

  private changeColor = (e: InteractiveSurfaceChangeEvent) => {
    const s = e.x;
    const v = 1 - e.y;
    const notify = this.props.onChange;
    const current = this.state.value;
    const rgb = hsvToRgb(current.h, s, v, current.a);
    const selected = {
      ...current,
      s: s,
      v: v,
      ...rgb,
    };

    if (!this.state.controlled) {
      this.changeTo({
        value: selected,
      });
    }

    this.setState({
      active: e.active,
    });

    if (typeof notify === 'function') {
      notify({
        value: selected,
      });
    }
  };

  private changeBackground = (e: SliderChangeEvent) => {
    const h = e.value;
    const notify = this.props.onChange;
    const current = this.state.value;
    const rgb = hsvToRgb(h, current.s, current.v, current.a);
    const selected = {
      ...current,
      h,
      s: current.s,
      v: current.v,
      ...rgb,
    };

    if (!this.state.controlled) {
      const base = hsvToRgb(h, 1, 1);
      this.changeTo({
        base,
        value: selected,
      });
    }

    if (typeof notify === 'function') {
      notify({
        value: selected,
      });
    }
  };

  private changeOpacity = (e: SliderChangeEvent) => {
    const alpha = e.value;
    const notify = this.props.onChange;
    const current = this.state.value;
    const selected = {
      ...current,
      a: alpha,
    };

    if (!this.state.controlled) {
      this.changeTo({
        value: selected,
      });
    }

    if (typeof notify === 'function') {
      notify({
        value: selected,
      });
    }
  };

  render() {
    const { value, active, base, error } = this.state;
    const {
      defaultValue: _0,
      value: _1,
      onChange: _2,
      onInput: _3,
      allowOpacity,
      hideBar,
      width = '100%',
      height = '200px',
      info,
      ...props
    } = this.props;
    const baseRgb = rgb(base);
    const currentRgb = rgb(value);
    const surface = {
      color: baseRgb,
      width,
      height,
    };

    return (
      <PickerContainer {...props}>
        <PickerSurface {...surface} onChange={this.changeColor}>
          <PickerValue />
          <PickerSaturation />
          <ColorIndicator x={value.s} y={1 - value.v} color={currentRgb} active={active} />
        </PickerSurface>
        {!hideBar && <ColorSlider onChange={this.changeBackground} value={value.h} color={baseRgb} />}
        {allowOpacity && <OpacitySlider onChange={this.changeOpacity} value={value.a} />}
        {(error || info) && (
          <PaddedContainer top="small" bottom="xsmall">
            <InputNotification error={error} info={info} />
          </PaddedContainer>
        )}
      </PickerContainer>
    );
  }
}

/**
 * A color picker for selecting a color in the UI.
 */
export const ColorPicker = withFormContext(ColorPickerInt);
ColorPicker.displayName = 'ColorPicker';
