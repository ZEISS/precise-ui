import * as React from 'react';
import styled, { keyframes, css } from '../../utils/styled';
import { StandardProps } from '../../common';
import { whiteSmoke, whiterSmoke } from '../../colors';

export interface SkeletonProps extends StandardProps {
  /**
   * The duration of the shine animation.
   * @default 1.2
   */
  duration?: number;
  /**
   * The width of the skeleton, it could be a number (transformed into px) or a string (e.g.: '75%')
   * @default '100%'
   */
  width?: number | string;
  /**
   * The height of the skeleton, it could be a number (transformed into px) or a string (e.g.: '20px')
   * @default '100%'
   */
  height?: number | string;
  /**
   * Determines if the skeleton should be a circle (e.g.: avatar). The final shape will depend on the `width` and `height` values.
   */
  isCircle?: boolean;
  /**
   * The number of skeletons you want to display.
   * @default 1
   */
  count?: number;
  /**
   * Randomly simulates different text line lengths. This will work only when `count` is greater that 1.
   */
  isText?: boolean;
  /**
   * Determines whether the pulsing animation is active or not. Could be use to stop the animation in case your component has some kind of error or just to have a more simple `Skeleton` component.
   * @default true
   */
  isPulsing?: boolean;
}

const defaultBaseColor = whiteSmoke;
const defaultHighlightColor = whiterSmoke;

const shine = keyframes`
  from {
    background-position: -100px;
  }
  to {
    background-position: 110%;
  }
`;

export const Skeleton: React.FC<SkeletonProps> = props => {
  const { count = 1, duration = 1.2, width = '100%', height = '100%', isCircle, isText, isPulsing = true } = props;
  const skeletons = [];

  for (let i = 0; i < count; i++) {
    const extraStyle = css`
      animation: ${shine} ${duration}s infinite linear ${!isPulsing ? 'paused' : 'running'};

      ${count > 1 && isText
        ? { width: `${Math.floor(Math.random() * (100 - 80 + 1) + 80)}%` }
        : { width: typeof width === 'number' ? `${width}px` : width }};

      height: ${typeof height === 'number' ? `${height}px` : height};

      ${height &&
        width &&
        isCircle && {
          borderRadius: '50%',
        }};
    `;

    const Span = styled.span`
      background-color: ${defaultBaseColor};
      background-image: linear-gradient(90deg, ${defaultBaseColor}, ${defaultHighlightColor}, ${defaultBaseColor});
      background-size: 60px 100%;
      background-repeat: no-repeat;
      display: inline-block;
      line-height: 1;
      ${extraStyle};
    `;

    skeletons.push(
      <Span key={i} {...props}>
        &zwnj;
      </Span>,
    );
  }

  return <>{skeletons}</>;
};

Skeleton.displayName = 'Skeleton';
