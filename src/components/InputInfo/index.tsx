import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { remCalc } from '../../utils/remCalc';

export interface InputInfoProps extends StandardProps {
  /**
   * The content of input info (text to display).
   */
  children?: React.ReactNode;
}

const StyledInfo = styled('div')<InputInfoProps>`
  color: ${themed(props => props.theme.text2)};
  font-size: ${remCalc('12px')};
  line-height: 14px;
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
