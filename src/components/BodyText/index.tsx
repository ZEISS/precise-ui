import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';

export type TextAlign = 'left' | 'right' | 'center' | 'justify';

export interface BodyTextProps extends StandardProps {
  /**
   * Determines the alignment. By default left aligned.
   * @default left
   */
  align?: TextAlign;
  /**
   * The content representing the body text.
   */
  children?: React.ReactNode;
}

const StyledBodyText = styled.p<{ align: TextAlign }>`
  text-align: ${props => props.align};
  font-family: ${themed(props => props.theme.fontFamily)};
  margin-bottom: ${distance.medium};
  font-size: inherit;
  line-height: 1.6;
  &:last-child {
    margin-bottom: 0;
  }
`;

const defaultAlign: TextAlign = 'left';
/**
 * Represents the body text component for placing normal text.
 */
export const BodyText: React.SFC<BodyTextProps> = ({ align = defaultAlign, ...props }) => (
  <StyledBodyText align={align} {...props} />
);
BodyText.displayName = 'BodyText';
