import * as React from 'react';
import { usePopper } from 'react-popper'
import { Placement } from '@popperjs/core'
import onClickOutside, { AdditionalProps } from 'react-onclickoutside';
import styled, { css, themed } from '../../utils/styled';
import { getFontStyle } from '../../textStyles';
import { StandardProps } from '../../common';
import { ResponsiveComponentProps } from '../../hoc/withResponsive';
import { distance } from '../../distance';
import { FlyoutPosition, FlyoutProps } from '../Flyout/Flyout.types.part';
import { forwardRef } from 'react';
const { useState, useEffect, useImperativeHandle } = React;

const toolTipArrowSize = 18;

const FlyoutContainer = styled.div`
z-index: 100;
position: relative;
display: inline-block;
width: fit-content;
`;

export interface FlyoutWindowProps extends ResponsiveComponentProps, StandardProps {
  targetRect: ClientRect;
  children: React.ReactNode;
  position?: FlyoutPosition;
  defaultPosition?: FlyoutPosition;
  offset?: number;
}

export interface Position {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const StyledTargetWrapper = styled.div``;

interface StyledFlyoutArrowProps extends Position {
  rotate?: number;
  popperStyles: any;
  show: boolean;
}
const StyledFlyoutArrow = styled('div')<StyledFlyoutArrowProps>(
  themed<StyledFlyoutArrowProps>(
    ({ theme, show }) => {
      return css`
      visibility: ${show ? 'visible' : 'hidden'};
      pointer-events: none;
      position: absolute;
      box-sizing: border-box;
      z-index: 101;
      width: ${toolTipArrowSize}px;
      height: ${toolTipArrowSize}px;

      :before {
        content: ' ';
        position: absolute;
        top: ${toolTipArrowSize - 1}px;
        left: 0;
        border-style: solid;
        border-width: ${toolTipArrowSize / 2}px;
        border-color: ${theme.ui4} transparent transparent transparent;
      }

      :after {
        content: ' ';
        position: absolute;
        top: ${toolTipArrowSize - 1}px;
        left: 0;
        border-style: solid;
        border-width: ${toolTipArrowSize / 2 - 1}px;
        margin-left: 1px;
        border-color: ${theme.flyout.background} transparent transparent transparent;
      }
`}));

export interface StyledFlyoutWindowProps {
  size?: {
    width?: number;
    height?: number;
  };
  position?: Position;
  noGutter?: boolean;
  open?: boolean;
  popperStyles: any;
}

const StyledFlyoutWindow = styled('div')<StyledFlyoutWindowProps>(
  themed<StyledFlyoutWindowProps>(
    ({ theme, open, noGutter }) => css`
    ${getFontStyle({ size: 'medium' })}
    visibility: ${open ? 'visible' : 'hidden'};
    z-index: 100;
    box-sizing: border-box;
    box-shadow: 0 2px 6px 0 rgba(75, 78, 82, 0.2);
    border: 1px solid ${theme.ui4};
    background: ${theme.flyout.background};
    color: ${theme.flyout.textColor};
    max-width: ${theme.flyout.maxWidth};
    max-height: ${theme.flyout.maxHeight};
    ${!noGutter ? `padding: ${distance.small} ${distance.medium};` : ''} box-sizing: border-box;
    overflow: auto;
`));

const mapFlyoutPositionToPopperPlacement = (position?: FlyoutPosition): Placement => {
  if (position) {
    return ({
      'top': 'top',
      'right': 'right',
      'bottom': 'bottom',
      'left': 'left',
      'top-left': 'top-start',
      'top-right': 'top-end',
      'bottom-left': 'bottom-start',
      'bottom-right': 'bottom-end',
      'right-top': 'right-start',
      'right-bottom': 'right-end',
      'left-top': 'left-start',
      'left-bottom': 'left-end',
    } as const)[position]
  }

  return 'auto';
}

const FlyoutInt2: React.FC<FlyoutProps & AdditionalProps> = forwardRef((props, ref) => {
  const [controlled ] = useState<boolean>(props.open !== undefined);
  const [open, setOpenInt] = useState<boolean>(Boolean(props.open))
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: mapFlyoutPositionToPopperPlacement(props.position),
    modifiers: [
      { name: 'hide' },
      { name: 'arrow', options: {
        element: arrowElement,
        padding: 10
      } },
      { name: 'offset', options: { offset: [0,20]}}
    ],
  });

  useImperativeHandle(ref, () => ({
    handleClickOutside: () => {
      setOpen(false)
    }
  }));

  useEffect(() => setOpenInt(Boolean(props.open)), [props.open])
  const onClick = () => {
    setOpen(!open);
  }

  const setOpen = (nextOpen: boolean) => {
    if (controlled || nextOpen === open) {
      return
    }
    typeof props.onChange === 'function' && props.onChange({ open: nextOpen });
    setOpenInt(nextOpen);
  }

  const placement = ((attributes?.popper || {})['data-popper-placement'] ?? 'bottom').split('-')[0]

  const rotate = {
    left: -90,
    right: 90,
    top: 0,
    bottom: 180,
  } [placement];

  const { transform, ...arrowStylesWithoutTransform } = styles.arrow;
  const popperArrowStyles: any = {
    transform: transform + ` rotate(${rotate}deg)`,
  }
  switch (placement) {
    case 'top': {
      popperArrowStyles.bottom = '0px';
      break;
    };
    case 'bottom': {
      popperArrowStyles.top = '0px';
      break;
    };
    case 'left': {
      popperArrowStyles.right = '0px';
      break;
    };
    case 'right': {
      popperArrowStyles.left = '0px';
      break;
    }
  }

  const arrowStyles = {...arrowStylesWithoutTransform, ...popperArrowStyles}

  return (
    <FlyoutContainer>
      <StyledTargetWrapper onClick={onClick} ref={setReferenceElement}>{props.children}</StyledTargetWrapper>
      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        <StyledFlyoutWindow {...attributes.popper} open={open}>
          {props.content}
          <StyledFlyoutArrow ref={setArrowElement} style={arrowStyles} popperStyles={styles} show={open} rotate={rotate}></StyledFlyoutArrow>
        </StyledFlyoutWindow>
      </div>
    </FlyoutContainer>
  );
})

class OutsideClickAdapter extends React.Component<FlyoutProps & AdditionalProps> {
  private ref = React.createRef<React.FC>()

  // @ts-ignore
  handleClickOutside = () => this.ref?.current?.handleClickOutside()

  render() {
    // @ts-ignore
    return <FlyoutInt2 ref={this.ref} {...this.props}>{this.props.children}</FlyoutInt2>
  }
}

export const Flyout2: React.ComponentClass<FlyoutProps & AdditionalProps> = onClickOutside(OutsideClickAdapter);
Flyout2.displayName = 'Flyout2';
