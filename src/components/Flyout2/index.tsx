import * as React from 'react';
import { usePopper } from 'react-popper'
import { withClickOutsideFC, WithClickOutsideFCProps } from '../../hoc/withClickOutsideFC';
import styled, { css, themed } from '../../utils/styled';
import { getFontStyle } from '../../textStyles';
import { distance } from '../../distance';
import { FlyoutProps } from '../Flyout/Flyout.types.part';
import { mapFlyoutPositionToPopperPlacement, calculateArrowStyleOverrides } from './helpers'
const { useState, useEffect } = React;

const FlyoutContainer = styled.div`
  position: relative;
  display: inline-block;
  width: fit-content;
`;
FlyoutContainer.displayName = 'FlyoutContainer';

const FlyoutTargetWrapper = styled.div``;
FlyoutTargetWrapper.displayName = 'FlyoutTargetWrapper';

const FlyoutArrow = styled('div')(
  themed(
    ({ theme }) => {
      return css`
        pointer-events: none;
        position: absolute;
        box-sizing: border-box;
        z-index: 101;
        width: ${theme.flyout.arrowSize}px;
        height: ${theme.flyout.arrowSize}px;

        :before {
          content: ' ';
          position: absolute;
          top: ${theme.flyout.arrowSize - 1}px;
          left: 0;
          border-style: solid;
          border-width: ${theme.flyout.arrowSize / 2}px;
          border-color: ${theme.ui4} transparent transparent transparent;
        }

        :after {
          content: ' ';
          position: absolute;
          top: ${theme.flyout.arrowSize - 1}px;
          left: 0;
          border-style: solid;
          border-width: ${theme.flyout.arrowSize / 2 - 1}px;
          margin-left: 1px;
          border-color: ${theme.flyout.background} transparent transparent transparent;
        }
  `})
);
FlyoutArrow.displayName = 'FlyoutArrow';

interface FlyoutBodyProps {
  noGutter?: boolean;
}

const FlyoutBody = styled('div')<FlyoutBodyProps>(
  themed<FlyoutBodyProps>(
    ({ theme, noGutter }) => css`
      ${getFontStyle({ size: 'medium' })}
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
  `)
);
FlyoutBody.displayName = 'FlyoutBody';

const FlyoutInt: React.FC<FlyoutProps & WithClickOutsideFCProps> = (props) => {
  const [controlled ] = useState<boolean>(props.open !== undefined);
  const [visible, setVisible] = useState<boolean>(Boolean(props.open))
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: mapFlyoutPositionToPopperPlacement(props.position),
    modifiers: [
      { name: 'hide' },
      { name: 'arrow', options: {
        element: arrowElement,
      } },
      { name: 'offset', options: { offset: [0,20]}}
    ],
  });

  useEffect(() => setVisible(Boolean(props.open)), [props.open])
  useEffect(() => changeVisibility(false), [props.outsideClickEvent])

  const onClick = () => changeVisibility(!visible);

  const changeVisibility = (nextVisibility: boolean) => {
    if (controlled || nextVisibility === visible) {
      return
    }
    typeof props.onChange === 'function' && props.onChange({ open: nextVisibility });
    setVisible(nextVisibility);
  }

  return (
    <FlyoutContainer>
      <FlyoutTargetWrapper onClick={onClick} ref={setReferenceElement}>{props.children}</FlyoutTargetWrapper>
        {visible && props.content &&
          <FlyoutBody ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            {props.content}
            <FlyoutArrow ref={setArrowElement} style={calculateArrowStyleOverrides(attributes.popper, styles.arrow)}></FlyoutArrow>
          </FlyoutBody>
        }
    </FlyoutContainer>
  );
}
FlyoutInt.displayName = 'FlyoutInt';

export const Flyout2 = withClickOutsideFC<FlyoutProps>(FlyoutInt);
Flyout2.displayName = 'Flyout2';
