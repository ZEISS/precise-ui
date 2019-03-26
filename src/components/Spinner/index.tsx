import * as React from 'react';
import styled, { keyframes, themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { remCalc } from '../../utils/remCalc';

export type SpinnerSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface SpinnerProps extends StandardProps {
  /**
   * The size of the spinner, where medium is the default size.
   * @default medium
   */
  size?: SpinnerSize;
  /**
   * Determines if the spinner should be hidden.
   */
  hidden?: boolean;
  /**
   * Sets the spinner's label, if any.
   */
  children?: React.ReactNode;
}

function strToSize(size?: string) {
  switch (size) {
    case 'x-small':
      return 5;
    case 'small':
      return 7;
    case 'large':
      return 12;
    case 'x-large':
      return 15;
  }

  return 10;
}

function strToFontSize(size?: string) {
  return remCalc(size === 'x-small' ? '12px' : '14px');
}

const SpinnerAnimation = keyframes`
  25% {
    transform: translateX(2.625em) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(2.625em) rotate(-90deg) scale(0.5);
  } 50% {
    transform: translateX(2.625em) translateY(2.625em) rotate(-179deg);
    -webkit-transform: translateX(2.625em) translateY(2.625em) rotate(-179deg);
  } 50.1% {
    transform: translateX(2.625em) translateY(2.625em) rotate(-180deg);
    -webkit-transform: translateX(2.625em) translateY(2.625em) rotate(-180deg);
  } 75% {
    transform: translateX(0px) translateY(2.625em) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(2.625em) rotate(-270deg) scale(0.5);
  } 100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
`;

const SpinningContainer = styled.div<{ hidden?: boolean }>`
  text-align: center;
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
`;

export interface SpinningLabelProps {
  size?: string;
}

const SpinningLabel = styled('label')<SpinningLabelProps>`
  color: ${themed(props => props.theme.text6)};
  display: ${props => (strToSize(props.size) >= 20 ? 'block' : 'inline-block')};
  margin: ${distance.xsmall};
  color: ${themed(props => props.theme.textDisabled)};
  font-size: ${props => strToFontSize(props.size)};
`;

const Cubes = styled.div<{ size?: string }>`
  width: ${props => strToSize(props.size) * 4.6}px;
  height: ${props => strToSize(props.size) * 4.6}px;
  position: relative;
  font-size: ${props => strToSize(props.size)}px;
  margin: auto;
`;

const Cube0 = styled.div`
  background-color: #141e8c;
  width: 2em;
  height: 2em;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${SpinnerAnimation} 1.8s infinite ease-in-out;
`;

const Cube1 = styled(Cube0)`
  animation-delay: -0.9s;
`;

/**
 * The spinner component displays a loading spinner optionally equipped with a label text.
 */
export const Spinner: React.SFC<SpinnerProps> = ({ theme, size = 'medium', children, ...props }) => {
  const spinningProps = { theme, size, hidden: props.hidden };

  return (
    <SpinningContainer {...props}>
      <Cubes {...spinningProps}>
        <Cube0 />
        <Cube1 />
      </Cubes>
      {children && <SpinningLabel {...spinningProps}>{children}</SpinningLabel>}
    </SpinningContainer>
  );
};
Spinner.displayName = 'Spinner';
