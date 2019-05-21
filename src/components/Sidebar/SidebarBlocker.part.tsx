import styled from '../../utils/styled';
import { Blocker, BlockerProps } from '../Blocker';

export interface SidebarBlockerProps extends BlockerProps {
  open: boolean;
}

export const SidebarBlocker = styled(Blocker)<SidebarBlockerProps>`
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  opacity: ${props => (props.open ? '1' : '0')};
  transition: all 0.5s;
`;
