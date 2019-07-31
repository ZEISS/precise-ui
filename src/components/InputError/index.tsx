import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

interface CustomPadding {
  horizontal: string;
  vertical: string;
}

interface InputErrorProps extends StandardProps {
  /**
   * The content of input error (error to display).
   */
  children?: React.ReactNode;
  padding?: CustomPadding;
}

const StyledError = styled('div')<InputErrorProps>`
  ${getFontStyle({ size: 'xSmall' })}
  color: ${themed(props => props.theme.inputError)};
  padding: ${props => props.padding ? props.padding.vertical : distance.xsmall} ${props => props.padding ? props.padding.horizontal : distance.medium};
`;

/**
 * Input error component.
 */
export class InputError extends React.PureComponent<InputErrorProps> {
  render() {
    const { children } = this.props;
    return children ? <StyledError {...this.props} /> : false;
  }
}
