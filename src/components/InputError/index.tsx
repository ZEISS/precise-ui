import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { getFontStyle } from '../../textStyles';
import { StandardProps } from '../../common';

export interface InputErrorProps extends StandardProps {}

const StyledError = styled.div`
  ${getFontStyle({ size: 'xSmall' })};
  color: ${themed(props => props.theme.inputError)};
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
