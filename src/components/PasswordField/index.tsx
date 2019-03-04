import * as React from 'react';
import styled from '../../utils/styled';
import { TextField, TextFieldProps } from '../TextField';
import { PreciseTheme, TextInputProps } from '../../common';
import { IconLink } from '../IconLink';

interface StyledTextFieldProps extends TextFieldProps {
  reveal: boolean;
}

const StyledTextField = styled(TextField)<StyledTextFieldProps>`
  font-family: ${props => (props.reveal ? 'inherit' : 'sans-serif')};
`;

export interface PasswordFieldProps extends TextInputProps {
  /**
   * @ignore
   */
  children?: void;
}

export interface PasswordFieldState {
  reveal: boolean;
}

/**
 * A password field for custom user input.
 */
export class PasswordField extends React.Component<PasswordFieldProps, PasswordFieldState> {
  constructor(props: PasswordFieldProps) {
    super(props);
    this.state = {
      reveal: false,
    };
  }

  private showPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    this.setState({
      reveal: true,
    });
    e.preventDefault();
  };

  private hidePassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    this.setState({
      reveal: false,
    });
    e.preventDefault();
  };

  private renderDefaultSuffix(reveal: boolean, theme?: PreciseTheme) {
    const iconName = reveal ? 'VisibilityOff' : 'Visibility';
    return <IconLink icon={iconName} onClick={reveal ? this.hidePassword : this.showPassword} theme={theme} />;
  }

  render() {
    const { theme, suffix, ...rest } = this.props;
    const { reveal } = this.state;
    const props = {
      suffix: suffix === undefined ? this.renderDefaultSuffix(reveal, theme) : suffix,
      type: reveal ? 'text' : 'password',
      theme,
      reveal,
      ...rest,
    };
    return <StyledTextField {...props} />;
  }
}
