import * as React from 'react';
import styled, { css, themed } from '../../utils/styled';
import { withResponsive, ResponsiveComponentProps } from '../../hoc/withResponsive';
import { FlyoutPosition, BasicPosition } from './Flyout.types.part';
import { distancePx, distance } from '../../distance';
import { StandardProps } from '../../common';
import { getFontStyle } from '../../textStyles';

const toolTipArrowSize = 18;

export interface Dimensions {
  width: number;
  height: number;
}

interface InvertedPosition {
  top: 'bottom';
  left: 'right';
  right: 'left';
  bottom: 'top';
}

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

function getFlyoutArrowPosition({
  mainPosition,
  secondaryPosition: origSecondaryPosition,
  offset,
  targetRect,
  flyoutRect,
}: {
  mainPosition: BasicPosition;
  secondaryPosition?: BasicPosition;
  targetRect: ClientRect;
  flyoutRect: ClientRect;
  offset: number;
}) {
  if (mainPosition && flyoutRect.width) {
    const vertical = isVertical(mainPosition);
    const mainAxisTargetSize = vertical ? targetRect.height : targetRect.width;
    const secondaryAxisTargetSize = vertical ? targetRect.width : targetRect.height;
    const secondaryAxisContnetSize = vertical ? flyoutRect.width : flyoutRect.height;
    const mainPositionValue = mainAxisTargetSize + offset + 1 - toolTipArrowSize / 2;

    let secondaryPosition: string;
    let secondaryPositionValue: number;
    if (!origSecondaryPosition) {
      secondaryPosition = vertical ? 'left' : 'top';
      secondaryPositionValue = (secondaryAxisTargetSize - toolTipArrowSize) / 2;
    } else {
      secondaryPosition = origSecondaryPosition;
      secondaryPositionValue =
        secondaryAxisTargetSize / 4 > secondaryAxisContnetSize - toolTipArrowSize
          ? secondaryAxisContnetSize - toolTipArrowSize
          : secondaryAxisTargetSize / 4;
    }

    const rotate = {
      top: 0,
      left: -90,
      right: 90,
      bottom: 180,
    };

    return {
      rotate: rotate[mainPosition],
      [invertPosition(mainPosition)]: mainPositionValue,
      [secondaryPosition]: secondaryPositionValue,
    };
  }

  return {};
}

function getDetailedPositionInfo({
  targetRect,
  dimensions,
  flyoutRect,
}: {
  targetRect: ClientRect;
  dimensions: Dimensions;
  flyoutRect: ClientRect;
}) {
  const viewportPosition = {
    left: targetRect.left,
    right: dimensions.width - targetRect.right,
    top: targetRect.top,
    bottom: dimensions.height - targetRect.bottom,
  };

  const hasEnoughSpace = {};
  const hasMoreSpace = {};

  for (const position of Object.keys(viewportPosition)) {
    if (isVertical(position as BasicPosition)) {
      // There is always enought space for top/bottom flyout when it lays outside of the viewport.
      hasEnoughSpace[position] = targetRect.top > dimensions.height || viewportPosition[position] > flyoutRect.height;
    } else {
      hasEnoughSpace[position] = viewportPosition[position] > flyoutRect.width;
    }
    hasMoreSpace[position] = viewportPosition[position] > viewportPosition[invertPosition(position as BasicPosition)];
  }

  return {
    viewportPosition,
    hasEnoughSpace,
    hasMoreSpace,
  };
}

function getMainAxisFlyoutPositionAndSize({
  direction,
  targetRect,
  offset,
  dimensions,
  vertical,
  flyoutRect,
}: {
  direction: BasicPosition;
  targetRect: ClientRect;
  flyoutRect: ClientRect;
  offset: number;
  dimensions: Dimensions;
  vertical: boolean;
}) {
  const targetSize = vertical ? targetRect.height : targetRect.width;
  const flyoutSize = vertical ? flyoutRect.height : flyoutRect.width;
  const { hasEnoughSpace, viewportPosition } = getDetailedPositionInfo({
    targetRect,
    dimensions,
    flyoutRect,
  });
  const sizeValue = hasEnoughSpace[direction]
    ? flyoutSize
    : viewportPosition[direction] - (offset + toolTipArrowSize / 2) - distancePx.medium;

  return {
    position: {
      name: invertPosition(direction),
      value: targetSize + (offset + toolTipArrowSize / 2),
    },
    size: {
      name: vertical ? 'height' : 'width',
      value: sizeValue,
    },
  };
}

function getSecondaryAxisFlyoutPositionAndSize({
  direction,
  targetRect,
  dimensions,
  vertical,
  flyoutRect,
}: {
  direction: BasicPosition;
  targetRect: ClientRect;
  dimensions: Dimensions;
  vertical: boolean;
  flyoutRect: ClientRect;
}) {
  let positionValue: number;
  let positionName: BasicPosition;
  const sizeName = vertical ? 'width' : 'height';
  const targetSize = vertical ? targetRect.width : targetRect.height;
  const targetPosition = vertical ? targetRect.left : targetRect.top;
  const flyoutSize = vertical ? flyoutRect.width : flyoutRect.height;
  const windowSize = vertical ? dimensions.width : dimensions.height;
  const { viewportPosition } = getDetailedPositionInfo({
    targetRect,
    dimensions,
    flyoutRect,
  });

  let sizeValue = flyoutSize;

  if (direction === undefined) {
    positionName = vertical ? 'left' : 'top';
    const centeredValue = (targetSize - flyoutSize) / 2;
    if (viewportPosition[positionName] > 0 && viewportPosition[positionName] + centeredValue < 0) {
      positionValue = -viewportPosition[positionName] + distancePx.medium;
      sizeValue = flyoutSize > windowSize ? windowSize - distancePx.xlarge : flyoutSize;
    } else {
      positionValue = centeredValue;
    }
  } else {
    positionName = direction;
    positionValue =
      positionName === 'top' || positionName === 'left'
        ? 0
        : targetPosition - flyoutSize > 0
        ? targetSize - flyoutSize
        : -targetPosition + distancePx.medium;

    if (positionName === 'top' || positionName === 'left') {
      sizeValue =
        targetPosition + positionValue + flyoutSize > windowSize
          ? windowSize - targetPosition + positionValue - distancePx.medium
          : flyoutSize;
    } else {
      sizeValue =
        flyoutSize > targetPosition + targetSize ? targetPosition + targetSize - distancePx.medium : flyoutSize;

      positionName = invertPosition(positionName);
    }
  }
  return {
    position: {
      name: positionName,
      value: positionValue,
    },
    size: {
      name: sizeName,
      value: sizeValue,
    },
  };
}

function invertPosition(position: BasicPosition) {
  const invertedPosition: InvertedPosition = {
    top: 'bottom',
    left: 'right',
    right: 'left',
    bottom: 'top',
  };

  return invertedPosition[position];
}

function isVertical(position: BasicPosition) {
  return position === 'top' || position === 'bottom' ? true : false;
}

export interface StyledFlyoutWindowProps {
  size?: {
    width?: number;
    height?: number;
  };
  position?: Position;
  noGutter?: boolean;
}

const StyledFlyoutWindow = styled('div')<StyledFlyoutWindowProps>(
  themed(
    ({ theme, size, position, noGutter }) => css`
      ${getFontStyle({ size: 'medium' })}

      position: absolute;
      z-index: 100;
      box-sizing: border-box;
      box-shadow: 0 2px 6px 0 rgba(75, 78, 82, 0.2);
      border: 1px solid ${theme.ui4};
      background: ${theme.flyout.background};
      color: ${theme.flyout.textColor};
      max-width: ${theme.flyout.maxWidth};
      max-height: ${theme.flyout.maxHeight};
      ${!noGutter ? `padding: ${distance.small} ${distance.medium};` : ''} box-sizing: border-box;

      ${size && size.width !== undefined ? `width: ${size.width}px` : ''};
      ${size && size.height !== undefined ? `height: ${size.height}px` : ''};
      ${position && position.top !== undefined ? `top: ${position.top}px` : ''};
      ${position && position.left !== undefined ? `left: ${position.left}px` : ''};
      ${position && position.bottom !== undefined ? `bottom: ${position.bottom}px` : ''};
      ${position && position.right !== undefined ? `right: ${position.right}px` : ''};
      overflow: auto;
    `,
  ),
);

interface StyledFlyoutArrowProps extends Position {
  rotate?: number;
}

const StyledFlyoutArrow = styled('div')<StyledFlyoutArrowProps>(
  themed(
    ({ top, left, bottom, right, rotate, theme }) => css`
      pointer-events: none;
      position: absolute;
      z-index: 101;
      width: ${toolTipArrowSize}px;
      height: ${toolTipArrowSize}px;

      ${top !== undefined ? `top: ${top}px` : ''};
      ${left !== undefined ? `left: ${left}px` : ''};
      ${bottom !== undefined ? `bottom: ${bottom}px` : ''};
      ${right !== undefined ? `right: ${right}px` : ''};
      ${rotate !== undefined ? `transform: rotate(${rotate}deg)` : ''};

      :before {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        border-style: solid;
        border-width: ${toolTipArrowSize / 2}px;
        border-color: ${theme.ui4} transparent transparent transparent;
      }

      :after {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        border-style: solid;
        border-width: ${toolTipArrowSize / 2 - 1}px;
        margin-left: 1px;
        border-color: ${theme.flyout.background} transparent transparent transparent;
      }
    `,
  ),
);

export interface FlyoutWindowState {
  flyoutRect?: ClientRect;
  children?: React.ReactNode;
}

interface ScrollPosition {
  top: number;
  left: number;
}

export class FlyoutWindowInt extends React.Component<FlyoutWindowProps, FlyoutWindowState> {
  private flyoutContainer: HTMLDivElement | null;
  private scrollPosition: ScrollPosition = { top: 0, left: 0 };

  constructor(props: FlyoutWindowProps) {
    super(props);
    this.state = {
      flyoutRect: undefined,
      children: undefined,
    };
  }

  static getDerivedStateFromProps(nextProps: FlyoutWindowProps, prevState: FlyoutWindowState) {
    if (nextProps.children !== prevState.children) {
      return {
        flyoutRect: undefined,
        children: nextProps.children,
      };
    }

    return {
      children: nextProps.children,
    };
  }

  private setFlyoutRef = (el: HTMLDivElement) => {
    if (this.flyoutContainer) {
      this.flyoutContainer.removeEventListener('scroll', this.onScroll);
    }

    if (el) {
      el.addEventListener('scroll', this.onScroll);
    }

    this.flyoutContainer = el;
  };

  private onScroll = (e: UIEvent) => {
    if (e.target && e.target instanceof HTMLElement) {
      this.scrollPosition = {
        top: e.target.scrollTop,
        left: e.target.scrollLeft,
      };
    }
  };

  componentDidMount() {
    if (this.flyoutContainer) {
      this.updateMeasurements();
    }
  }

  componentWillUnmount() {
    if (this.flyoutContainer) {
      this.flyoutContainer.removeEventListener('scroll', this.onScroll);
    }
  }

  componentDidUpdate() {
    if (this.flyoutContainer) {
      if (!this.state.flyoutRect) {
        this.updateMeasurements();
      }

      if (this.flyoutContainer.scroll) {
        this.flyoutContainer.scroll({
          top: this.scrollPosition.top,
          left: this.scrollPosition.left,
        });
      }
    }
  }

  private updateMeasurements() {
    if (this.flyoutContainer) {
      const flyoutRect = this.flyoutContainer.getBoundingClientRect();
      this.setState({
        flyoutRect,
      });
    }
  }

  private getFlyoutDimensions(): {
    size?: {
      width?: number;
      height?: number;
    };
    position?: Position;
    arrowPosition?: Position & { rotate?: number };
  } {
    const { flyoutRect } = this.state;
    if (!flyoutRect) {
      return {};
    }
    const { position, defaultPosition = 'bottom', offset = 4, dimensions, targetRect } = this.props;
    const [mainPosition, secondaryPosition] = (position || defaultPosition).split('-') as Array<BasicPosition>;
    if (!dimensions || !mainPosition) {
      return {};
    }

    const vertical = isVertical(mainPosition);

    const { hasMoreSpace, hasEnoughSpace } = getDetailedPositionInfo({
      targetRect,
      dimensions,
      flyoutRect,
    });

    let mainDirection = mainPosition;
    let main = getMainAxisFlyoutPositionAndSize({
      direction: mainDirection,
      targetRect,
      offset,
      dimensions,
      vertical,
      flyoutRect,
    });

    if (!position && !hasEnoughSpace[mainDirection] && !hasMoreSpace[mainDirection]) {
      mainDirection = invertPosition(mainDirection);
      main = getMainAxisFlyoutPositionAndSize({
        direction: mainDirection,
        targetRect,
        offset,
        dimensions,
        vertical,
        flyoutRect,
      });
    }

    let secondaryDirection = secondaryPosition;
    let secondary = getSecondaryAxisFlyoutPositionAndSize({
      direction: secondaryDirection,
      targetRect,
      dimensions,
      vertical,
      flyoutRect,
    });

    if (!position && secondaryDirection && !hasEnoughSpace[secondaryDirection] && hasMoreSpace[secondaryDirection]) {
      secondaryDirection = invertPosition(secondaryDirection);
      secondary = getSecondaryAxisFlyoutPositionAndSize({
        direction: secondaryDirection,
        targetRect,
        dimensions,
        vertical,
        flyoutRect,
      });
    }

    return {
      position: {
        [main.position.name]: main.position.value,
        [secondary.position.name]: secondary.position.value,
      },
      size: {
        [main.size.name]: main.size.value,
        [secondary.size.name]: secondary.size.value,
      },
      arrowPosition: getFlyoutArrowPosition({
        mainPosition: mainDirection,
        secondaryPosition: secondaryDirection,
        offset,
        targetRect,
        flyoutRect,
      }),
    };
  }

  render() {
    const { children, targetRect: _0, position: _1, offset: _2, dimensions: _3, innerRef: _4, ...props } = this.props;
    const { arrowPosition, ...flyoutDimensions } = this.getFlyoutDimensions();
    return (
      children && (
        <>
          <StyledFlyoutArrow {...arrowPosition} theme={props.theme} />
          <StyledFlyoutWindow {...flyoutDimensions} {...props} ref={this.setFlyoutRef}>
            {children}
          </StyledFlyoutWindow>
        </>
      )
    );
  }
}

export const FlyoutWindow = withResponsive(FlyoutWindowInt);
