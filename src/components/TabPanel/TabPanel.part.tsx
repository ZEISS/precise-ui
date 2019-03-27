import styled, { css, themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { dark, cyan } from '../../colors';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

export const TabContainer = styled.div``;

export const TabHeaders = styled.ul`
  margin: 0 0 ${distance.xsmall};
  padding: 0;
  display: flex;
`;

export const TabContent = styled.div``;

const ActiveTab = css`
  ${getFontStyle({ weight: 'medium' })}

  color: ${themed(props => props.theme.text6)};
  border-color: ${dark};
`;

const InactiveTab = css`
  &:hover {
    color: ${cyan};
    border: none;
  }
`;

export interface TabHeaderProps extends StandardProps {
  active?: boolean;
}

export const TabHeader = styled('li')<TabHeaderProps>`
  ${getFontStyle({ size: 'large', weight: 'regular' })}
  position: relative;
  z-index: 1;
  margin: 0;
  list-style: none;
  cursor: pointer;
  overflow: visible;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  border-bottom: 2px solid transparent;
  margin-right: ${distance.xxlarge};
  ${props => (props.active ? ActiveTab : InactiveTab)};

  &:last-child {
    margin-right: 0;
  }
`;

export interface TabItemProps {
  active?: boolean;
}

export const TabItem = styled.div<TabItemProps>`
  ${props => (props.active ? '' : 'display: none;')};
`;
