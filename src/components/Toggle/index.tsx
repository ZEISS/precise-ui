import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { InputProps, InputChangeEvent } from '../../common';
import { withFormContext, FormContextProps } from '../../hoc/withFormContext';
import { showInputInfo } from '../../utils/input';
import { distance } from '../../distance';
import { IndicatorKnob } from '../IndicatorKnob';
import { getFontStyle } from '../../textStyles';

export type ToggleChangeEvent = InputChangeEvent<boolean>;

export interface ToggleProps extends InputProps<boolean> {
  /**
   * Sets the text of label.
   * @default ''
   */
  label?: React.ReactChild;
  /**
   * The content of the toggle button.
   */
  children?: React.ReactNode;
}

export interface ToggleState {
  value: boolean;
  controlled: boolean;
  focused: boolean;
}

interface ToggleContainerProps {
  disabled?: boolean;
}

interface ToggleBoxProps {
  checked: boolean;
  theme: any;
}

const transitionDuration = '0.3s';
const transitionEase = 'cubic-bezier(0, 0, 0.25, 1)';

const ToggleContainer = styled('div')<ToggleContainerProps>`
  ${getFontStyle({ size: 'medium' })}
  position: relative;
  display: inline-block;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${themed(props => props.theme.text1)};
`;

const ToggleBoxWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding: ${distance.xsmall} 0;
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
`;

const ToggleBox = styled('div')<ToggleBoxProps>`
  outline: 0;
  display: block;
  width: ${distance.xxlarge};
  height: ${distance.medium};
  border-radius: ${distance.small};
  position: relative;
  background: ${themed(props => props.theme.ui4)};
  transition: all ${transitionDuration} ${transitionEase};
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: ${distance.small};
`;

const StyledDesc = styled.span`
  display: inline-block;
  margin-left: ${distance.small};
  vertical-align: middle;
`;

const IndicatorKnobStyle: React.CSSProperties = {
  transform: 'translate(0, -50%)',
};

class ToggleInt extends React.PureComponent<ToggleProps & FormContextProps, ToggleState> {
  constructor(props: ToggleProps) {
    super(props);
    this.state = {
      controlled: typeof props.value !== 'undefined',
      value: props.value || props.defaultValue || false,
      focused: false,
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

  componentWillReceiveProps(nextProps: ToggleProps) {
    if (this.state.controlled) {
      this.setState({
        value: nextProps.value || false,
      });
    }
  }

  private changeValue() {
    const { onChange, disabled, form, name = '' } = this.props;

    if (!disabled) {
      const { controlled, value } = this.state;
      const status = !value;

      if (!controlled) {
        if (form) {
          form.change({
            name,
            value: status,
          });
        } else {
          this.setState({
            value: status,
          });
        }
      }

      if (typeof onChange === 'function') {
        onChange({
          value: status,
        });
      }
    }
  }

  private handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    this.changeValue();
    e.preventDefault();
  };

  private handleCheckboxChange = () => {
    this.changeValue();
  };

  private handleCheckboxFocus = () => {
    this.setState({
      focused: true,
    });
  };

  private handleCheckboxBlur = () => {
    this.setState({
      focused: false,
    });
  };

  render() {
    const {
      children,
      disabled,
      theme,
      value: _0,
      defaultValue: _1,
      onChange: _2,
      info,
      error,
      label,
      ...props
    } = this.props;
    const { value, focused } = this.state;
    const containerProps = {
      ...props,
      theme,
      onClick: this.handleOnClick,
      disabled,
    };
    const boxProps = {
      checked: value,
      theme,
    };

    return (
      <ToggleContainer {...containerProps}>
        {label && <StyledLabel theme={theme}>{label}</StyledLabel>}
        <ToggleBoxWrapper>
          <StyledInput
            checked={value}
            onChange={this.handleCheckboxChange}
            onFocus={this.handleCheckboxFocus}
            onBlur={this.handleCheckboxBlur}
          />
          <ToggleBox {...boxProps}>
            <IndicatorKnob
              style={IndicatorKnobStyle}
              x={value ? 0.5 : 0}
              active={value}
              focus={focused}
              disabled={containerProps.disabled}
              animate
            />
          </ToggleBox>
        </ToggleBoxWrapper>
        {children && <StyledDesc>{children}</StyledDesc>}
        {showInputInfo(error, info)}
      </ToggleContainer>
    );
  }
}

/**
 * The toggle component displays a button to toggle a checked state.
 */
export const Toggle = withFormContext(ToggleInt);
Toggle.displayName = 'Toggle';
