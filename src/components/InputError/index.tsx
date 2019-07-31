import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { getFontStyle } from '../../textStyles';
import { PaddedContainer, PaddedContainerProps } from '../PaddedContainer';

export interface InputErrorProps extends PaddedContainerProps {}

const StyledError = styled(PaddedContainer)<InputErrorProps>`
  ${getFontStyle({ size: 'xSmall' })};
  color: ${themed(props => props.theme.inputError)};
`;

/**
 * Input error component.
 */
export class InputError extends React.PureComponent<InputErrorProps> {
  render() {
    const { children } = this.props;
    return children ? <StyledError top="xsmall" bottom="xsmall" {...this.props} /> : false;
  }
}
