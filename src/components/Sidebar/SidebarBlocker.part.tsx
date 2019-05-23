import styled, { keyframes, css } from '../../utils/styled';
import { Blocker, BlockerProps } from '../Blocker';
import * as React from 'react';

export interface SidebarBlockerProps extends BlockerProps {
  open: boolean;
}

const InAnimation = () => keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const OutAnimation = () => keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const animationDuration = 500;
export const StyledSidebarBlocker = styled(Blocker)<{ closing: boolean }>(
  ({ closing }) => css`
    animation: ${closing ? OutAnimation() : InAnimation()} ${animationDuration}ms;
    animation-fill-mode: forwards;
  `,
);

export const SidebarBlocker: React.FC<SidebarBlockerProps> = props => {
  const [closed, setClosed] = React.useState(!props.open);

  React.useEffect(() => {
    if (props.open) {
      setClosed(false);
      return;
    } else {
      const timeout = setTimeout(() => setClosed(true), animationDuration);
      return () => clearTimeout(timeout);
    }
  }, [props.open]);

  //tslint:disable-next-line
  return !closed ? <StyledSidebarBlocker {...props} closing={!props.open} /> : null;
};
