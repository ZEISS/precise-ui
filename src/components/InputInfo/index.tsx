import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

interface CustomPadding {
  horizontal: string;
  vertical: string;
}

interface InputInfoProps extends StandardProps {
  /**
   * The content of input info (text to display).
   */
  children?: React.ReactNode;
  padding?: CustomPadding;
}

const StyledInfo = styled('div')<InputInfoProps>`
  ${getFontStyle({ size: 'xSmall' })}
  color: ${themed(props => props.theme.text2)};
  padding: ${props => (props.padding ? props.padding.vertical : '0')} ${props =>
  props.padding ? props.padding.horizontal : '0'};
`;

/**
 * Input info component.
 */
export class InputInfo extends React.PureComponent<InputInfoProps> {
  render() {
    const { children } = this.props;
    return children ? (
      <StyledInfo padding={{ horizontal: distance.medium, vertical: distance.xsmall }} {...this.props} />
    ) : (
      false
    );
  }
}
