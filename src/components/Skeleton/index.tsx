import * as React from 'react';
import styled, { keyframes, css, themed } from '../../utils/styled';
import { StandardProps } from '../../common';

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

const defaultBaseColor = themed(({ theme }) => theme.ui3);
const defaultHighlightColor = themed(({ theme }) => theme.ui2);

const shine = keyframes`
  from {
    background-position: -200px;
  }
  to {
    background-position: 130%;
  }
`;

const Span = styled.span`
  background-color: ${defaultBaseColor};
  background-image: linear-gradient(90deg, ${defaultBaseColor}, ${defaultHighlightColor}, ${defaultBaseColor});
  background-size: 60px 100%;
  background-repeat: no-repeat;
  display: inline-block;
  line-height: 1;
`;

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * The `Sekeleton` component displays a low fidelity UI into which information will be gradually loaded.
 */
export const Skeleton: React.FC<SkeletonProps> = props => {
  const { count = 1, duration = 1.2, width = '100%', height = '100%', isCircle, isText, isPulsing = true } = props;
  const skeletons = [];

  for (let i = 0; i < count; i++) {
    const StyledSpan = styled(Span)`
      animation: ${shine} ${duration}s infinite linear ${!isPulsing ? 'paused' : 'running'};

      ${count > 1 && isText
        ? { width: `${randomInt(80, 100)}%` }
        : { width: typeof width === 'number' ? `${width}px` : width }};

      height: ${typeof height === 'number' ? `${height}px` : height};

      ${height &&
        width &&
        isCircle && {
          borderRadius: '50%',
        }};
    `;

    skeletons.push(
      <StyledSpan key={i} {...props}>
        &zwnj;
      </StyledSpan>,
    );
  }

  return <>{skeletons}</>;
};

Skeleton.displayName = 'Skeleton';
