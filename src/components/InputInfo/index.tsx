import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { getFontStyle } from '../../textStyles';
import { StandardProps } from '../../common';

export interface InputInfoProps extends StandardProps {}

const StyledInfo = styled.div`
  ${getFontStyle({ size: 'xSmall' })};
  color: ${themed(props => props.theme.text2)};
`;

/**
 * Input info component.
 */
export class InputInfo extends React.PureComponent<InputInfoProps> {
  render() {
    const { children } = this.props;
    return children ? <StyledInfo {...this.props} /> : false;
  }
}
