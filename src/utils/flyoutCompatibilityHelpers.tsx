import { FlyoutPosition } from '../components/Flyout/Flyout.types.part';
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

  return 'bottom';
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
      transform,
    },
    bottom: {
      top: 0,
      transform: `${transform} rotate(180deg)`,
    },
    left: {
      right: 0,
      transform: `${transform} rotate(-90deg)`,
    },
    right: {
      left: 0,
      transform: `${transform} rotate(90deg)`,
    },
  }[primaryPlacement as 'top' | 'bottom' | 'left' | 'right'];

  return { ...arrowStylesWithoutTransform, ...placementDependentStyles };
};
