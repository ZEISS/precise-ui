import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { getFontStyle } from '../../textStyles';
import { PaddedContainer, PaddedContainerProps } from '../PaddedContainer';

export interface InputInfoProps extends PaddedContainerProps {}

const StyledInfo = styled(PaddedContainer)<InputInfoProps>`
  ${getFontStyle({ size: 'xSmall' })};
  color: ${themed(props => props.theme.text2)};
`;

/**
 * Input info component.
 */
export class InputInfo extends React.PureComponent<InputInfoProps> {
  render() {
    const { children } = this.props;
    return children ? <StyledInfo top="xsmall" bottom="xsmall" {...this.props} /> : false;
  }
}
