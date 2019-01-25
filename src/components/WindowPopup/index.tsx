import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { remCalc } from '../../utils/remCalc';
import { StandardProps } from '../../common';
import { Blocker, BlockerProps } from '../Blocker';
import { CloseButton } from '../CloseButton';
import { distance } from '../../distance';

const StyledMobileDropdownWrapper = styled.div`
  padding: ${distance.medium};
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  background: ${themed(props => props.theme.ui1)};
`;

const StyledMobileWrapper = styled.div`
  box-sizing: border-box;
  margin: 0;
`;

const StyledLabel = styled.div`
  color: ${themed(({ theme }) => theme.ui0)};
  padding-bottom: ${distance.medium};
  font-size: ${remCalc('14px')};
  min-height: ${remCalc('14px')};
`;

export interface WindowPopupProps extends StandardProps, BlockerProps {
  label?: React.ReactNode;
}

export class WindowPopup extends React.Component<WindowPopupProps> {
  render() {
    const { children, label, ...props } = this.props;
    return (
      <Blocker {...props}>
        <StyledMobileDropdownWrapper theme={props.theme} tabIndex={0}>
          <StyledLabel>{label}</StyledLabel>
          <CloseButton onClick={props.onClose} />
          <StyledMobileWrapper>{children}</StyledMobileWrapper>
        </StyledMobileDropdownWrapper>
      </Blocker>
    );
  }
}
