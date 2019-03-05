import * as React from 'react';
import { StandardProps } from '../../common';
import styled, { themed } from '../../utils/styled';

export interface AccordionTableRowProps extends StandardProps {
  /**
   * Displays `AccordionRow` in the active state.
   */
  active?: boolean;
  /**
   * Triggers `click` event only if `true`.
   * By default set to `true`.
   */
  clickable?: boolean;
  /**
   * The event which will be fired when row is clicked.
   */
  onClick?(e: React.MouseEvent): void;
}

const StyledAccordionTableRow = styled.tr<AccordionTableRowProps>(
  themed(
    ({ active, clickable, theme: { ui1, ui2, ui3, ui4, ui5, text1 } }) => `
    background: ${active ? ui2 : ui1};
    border: ${active ? `1px solid ${ui5}` : 'none'};
    cursor: ${clickable ? 'pointer' : 'default'};
    border-bottom: 1px solid ${ui4};
    color: ${text1};

    &:hover {
      background: ${ui3};
    }

    &:nth-last-child(2) {
      ${active ? '' : 'border-bottom: none'};
    }

    > td {
      border-top: ${active ? `1px solid ${ui5}` : 'none'};
    }
  `,
  ),
);

export const AccordionTableRow: React.SFC<AccordionTableRowProps> = ({
  active = false,
  clickable = true,
  children,
  onClick,
  ...props
}) => {
  const handleClick = typeof onClick === 'function' && clickable ? onClick : undefined;
  return (
    <StyledAccordionTableRow onClick={handleClick} active={active} clickable={clickable} {...props}>
      {children}
    </StyledAccordionTableRow>
  );
};
