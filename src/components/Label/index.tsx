import * as React from 'react';
import styled, { css } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';

export interface LabelProps extends StandardProps {
  /**
   * The content of the label.
   */
  children?: React.ReactNode;
  /**
   * The displayed tooltip, if any.
   */
  toolTip?: string;
  /**
   * Sets the label into an attached mode.
   */
  attached?: boolean;
}

const AttachedLabel = css`
  padding-left: ${distance.small};
  display: inline-block;
  cursor: inherit;
`;

const BlockLabel = css`
  display: block;
`;

const Styledlabel = styled.label<LabelProps>`
  ${props => (props.attached ? AttachedLabel : BlockLabel)};
`;

/**
 * The label component displays an input or general label.
 */
export const Label: React.SFC<LabelProps> = ({ toolTip, ...props }) => <Styledlabel title={toolTip} {...props} />;
Label.displayName = 'Label';
