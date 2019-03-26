import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

export interface InputInfoProps extends StandardProps {
  /**
   * The content of input info (text to display).
   */
  children?: React.ReactNode;
}

const StyledInfo = styled('div')<InputInfoProps>`
  ${getFontStyle({ size: 'xSmall' })}
  color: ${themed(props => props.theme.text2)};
  padding: ${distance.xsmall} 0;
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
