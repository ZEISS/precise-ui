import { FlyoutPosition } from '../Flyout/Flyout.types.part';
import { Placement } from '@popperjs/core';

export const mapFlyoutPositionToPopperPlacement = (position?: FlyoutPosition): Placement => {
  if (position) {
    return ({
      top: 'top',
      right: 'right',
      bottom: 'bottom',
      left: 'left',
      'top-left': 'top-start',
      'top-right': 'top-end',
      'bottom-left': 'bottom-start',
      'bottom-right': 'bottom-end',
      'right-top': 'right-start',
      'right-bottom': 'right-end',
      'left-top': 'left-start',
      'left-bottom': 'left-end',
    } as const)[position];
  }

  return 'auto';
};

export const calculateArrowStyleOverrides = (
  popperAttributes = {},
  arrowStyles: React.CSSProperties = {},
): React.CSSProperties => {
  const { transform, ...arrowStylesWithoutTransform } = arrowStyles;

  if (!transform || !popperAttributes['data-popper-placement']) {
    return arrowStyles;
  }

  const primaryPlacement = (popperAttributes['data-popper-placement'] as Placement).split('-')[0];

  const placementDependentStyles: React.CSSProperties = {
    top: {
      bottom: 0,
      transform: transform + ` rotate(${0}deg)`,
    },
    bottom: {
      top: 0,
      transform: transform + ` rotate(${180}deg)`,
    },
    left: {
      right: 0,
      transform: transform + ` rotate(${-90}deg)`,
    },
    right: {
      left: 0,
      transform: transform + ` rotate(${90}deg)`,
    },
  }[primaryPlacement as 'top' | 'bottom' | 'left' | 'right'];

  return { ...arrowStylesWithoutTransform, ...placementDependentStyles };
};
