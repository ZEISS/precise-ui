import * as React from 'react';
import styled, { css } from '../../utils/styled';
import { distance } from '../../distance';

export interface PaddedContainerProps {
  /**
   * Padding on top. Valid values: xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge.
   */
  top?: keyof typeof distance;
  /**
   * Padding on left. Valid values: xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge.
   */
  left?: keyof typeof distance;
  /**
   * Padding on bottom. Valid values: xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge.
   */
  bottom?: keyof typeof distance;
  /**
   * Padding on right. Valid values: xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge.
   */
  right?: keyof typeof distance;
  /**
   * Padding around the content. Valid values: xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge.
   */
  gutter?: keyof typeof distance;
  /**
   * Allows to change the container element.
   * @default 'div'
   */
  as?: keyof JSX.IntrinsicElements;
}

const StyledContainer = styled('div')<PaddedContainerProps>(
  ({ top, left, bottom, right, gutter }) => css`
    ${top ? `padding-top: ${distance[top]};` : ''}
    ${left ? `padding-left: ${distance[left]};` : ''}
    ${bottom ? `padding-bottom: ${distance[bottom]};` : ''}
    ${right ? `padding-right: ${distance[right]};` : ''}
    ${gutter ? `padding: ${distance[gutter]};` : ''}
  `,
);

export const PaddedContainer: React.FC<PaddedContainerProps> = props => {
  return <StyledContainer {...props} />;
};
