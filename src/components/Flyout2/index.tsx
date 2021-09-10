import * as React from 'react';
import { usePopper } from 'react-popper'
import { Placement } from '@popperjs/core'
import onClickOutside, { AdditionalProps } from 'react-onclickoutside';
import styled, { css, themed } from '../../utils/styled';
import { getFontStyle } from '../../textStyles';
import { distance } from '../../distance';
import { FlyoutPosition, FlyoutProps } from '../Flyout/Flyout.types.part';
const { useState, useEffect } = React;

const toolTipArrowSize = 18;

const FlyoutContainer = styled.div`
z-index: 100;
position: relative;
display: inline-block;
width: fit-content;
`;

const StyledTargetWrapper = styled.div``;

const StyledFlyoutArrow = styled('div')(
  themed(
    ({ theme }) => {
      return css`
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
  visibility: boolean;
  noGutter?: boolean;
}

const StyledFlyoutWindow = styled('div')<StyledFlyoutWindowProps>(
  themed<StyledFlyoutWindowProps>(
    ({ theme, visibility, noGutter }) => css`
    ${getFontStyle({ size: 'medium' })}
    visibility: ${visibility ? 'visible' : 'hidden'};
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

const calculateArrowStyleOverrides = (popperAttributes = {}, arrowStyles: React.CSSProperties): React.CSSProperties => {
  const placement = (popperAttributes['data-popper-placement'] ?? 'top').split('-')[0]
  const rotate = {
    left: -90,
    right: 90,
    top: 0,
    bottom: 180,
  } [placement];

  const { transform, ...arrowStylesWithoutTransform } = arrowStyles;
  const placementDependentStyles: React.CSSProperties = {
    transform: transform + ` rotate(${rotate}deg)`,
  }
  switch (placement) {
    case 'top': {
      placementDependentStyles.bottom = '0px';
      break;
    };
    case 'bottom': {
      placementDependentStyles.top = '0px';
      break;
    };
    case 'left': {
      placementDependentStyles.right = '0px';
      break;
    };
    case 'right': {
      placementDependentStyles.left = '0px';
      break;
    }
  }

  return {...arrowStylesWithoutTransform, ...placementDependentStyles}
}

interface OutsideClickProps {
  outsideClickEvent: React.SyntheticEvent | null;
}

const FlyoutInt: React.FC<FlyoutProps & AdditionalProps & OutsideClickProps> = (props) => {
  const [controlled ] = useState<boolean>(props.open !== undefined);
  const [visibility, setVisibility] = useState<boolean>(Boolean(props.open))
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

  useEffect(() => setVisibility(Boolean(props.open)), [props.open])
  useEffect(() => changeVisibility(false), [props.outsideClickEvent])

  const onClick = () => changeVisibility(!visibility);

  const changeVisibility = (nextVisibility: boolean) => {
    if (controlled || nextVisibility === visibility) {
      return
    }
    typeof props.onChange === 'function' && props.onChange({ open: nextVisibility });
    setVisibility(nextVisibility);
  }
FlyoutInt.displayName = 'FlyoutInt';

  return (
    <FlyoutContainer>
      <StyledTargetWrapper onClick={onClick} ref={setReferenceElement}>{props.children}</StyledTargetWrapper>
      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        <StyledFlyoutWindow visibility={visibility}>
          {props.content}
          <StyledFlyoutArrow ref={setArrowElement} style={calculateArrowStyleOverrides(attributes.popper, styles.arrow)}></StyledFlyoutArrow>
        </StyledFlyoutWindow>
      </div>
    </FlyoutContainer>
  );
}

function withClickOutsideFunctionalAdapter<P extends object>(Component: React.FC<P>) {
  class OutsideClickAdapter extends React.Component<P, OutSideClickAdapterState> {
    static displayName: string;
    constructor(props: P) {
      super(props);
      this.state = {
        outsideClickEvent: null,
      }
    }

    handleClickOutside = (e: React.SyntheticEvent) => {
      this.setState({ outsideClickEvent: e })
    }

    render() {
      const { children, ...otherProps } = this.props;
      return <Component outsideClickEvent={this.state.outsideClickEvent} {...otherProps as P}>{children}</Component>
    }
  }

  OutsideClickAdapter.displayName = 'withClickOutsideWrapper';

  return OutsideClickAdapter
}

interface OutSideClickAdapterState {
  outsideClickEvent: React.SyntheticEvent | null;
}

export const Flyout2: React.ComponentClass<FlyoutProps & AdditionalProps> = onClickOutside(withClickOutsideFunctionalAdapter<FlyoutProps & AdditionalProps & OutsideClickProps>(FlyoutInt));
Flyout2.displayName = 'Flyout2';
