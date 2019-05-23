import * as React from 'react';
import { CloseButton } from '../CloseButton';
import { SidebarContainer } from './SidebarContainer.part';
import { PositionType } from './SidebarPopup.types.part';
import { SidebarBlocker } from './SidebarBlocker.part';

export interface SidebarPopupProps {
  position?: PositionType;
  size?: string;
  open?: boolean;
  onClose?: () => void;
}

export const SidebarPopup: React.FC<SidebarPopupProps> = ({
  open = false,
  size,
  position,
  children,
  onClose,
  ...props
}) => (
  <>
    <SidebarContainer {...props} open={open} position={position} size={size}>
      <CloseButton onClick={onClose} />
      {children}
    </SidebarContainer>
    <SidebarBlocker open={open} onClose={onClose} />
  </>
);
