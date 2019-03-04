import * as React from 'react';
import styled, { css } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';

export type ContainerAlignment = 'left' | 'center' | 'right';

export interface ContainerProps extends StandardProps {
  /**
   * Sets the children to display.
   */
  children?: React.ReactNode;
  /**
   * By default the container is fluid, meaning it occupies 100% of it's
   * parent width, and by defining maxWidth property, container looses it's
   * fluid behaviour and becomes defined with max-width.
   */
  maxWidth?: number;
  /**
   * Where the container content should be aligned. This property is only
   * applicable in case when fullWidth is defined. By default, it is 'center'.
   * @default center
   */
  align?: ContainerAlignment;
  /**
   * Gets the reference to the underlying HTML DOM element.
   */
  innerRef?(instance: HTMLElement | null): void;
}

interface FixedWidthContainerProps {
  maxWidth: number;
  align: ContainerAlignment;
}

function getAlignMargin(alignment: ContainerAlignment) {
  if (alignment !== 'center') {
    return alignment === 'left' ? 'margin-right: auto' : 'margin-left: auto';
  }

  return 'margin: 0 auto';
}

const FluidContainer = css`
  width: 100%;
`;

const FixedWidthContainer = css<FixedWidthContainerProps>`
  position: relative;
  ${props => getAlignMargin(props.align)};
  max-width: ${props => props.maxWidth}px;
  padding: 0 ${distance.medium};
`;

const StyledContainer = styled.div`
  ${(props: { maxWidth?: number; align: ContainerAlignment }) =>
    props.maxWidth ? FixedWidthContainer : FluidContainer};
`;

const defaultAlign: ContainerAlignment = 'center';
/**
 * Represents a simple reusable container for outer layouts.
 */
export const Container: React.SFC<ContainerProps> = ({
  align = defaultAlign,
  maxWidth = undefined,
  innerRef,
  ...rest
}) => <StyledContainer align={align} maxWidth={maxWidth} ref={innerRef} {...rest} />;
Container.displayName = 'Container';
