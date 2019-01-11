import styled, { css, themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { dark, cyan } from '../../colors';
import { distance } from '../../distance';
import { TextStylings } from '../../textStyles';

export const TabContainer = styled.div``;

export const TabHeaders = styled.ul`
  margin: 0 0 ${distance.xsmall};
  padding: 0;
  display: flex;
`;

export const TabContent = styled.div``;

const ActiveTab = css`
  color: ${themed(props => props.theme.text)};
  font-weight: 500;
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

export const TabHeader = styled<TabHeaderProps, 'li'>('li')`
  position: relative;
  z-index: 1;
  margin: 0;
  list-style: none;
  cursor: pointer;
  overflow: visible;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: ${TextStylings.delta.lineHeight};
  font-size: ${TextStylings.delta.fontSize};
  font-weight: 400;
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

export const TabItem = styled.div`
  ${(props: TabItemProps) => (props.active ? '' : 'display: none;')};
`;
