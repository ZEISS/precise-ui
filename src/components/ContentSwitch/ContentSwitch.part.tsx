import styled, { css, themed } from '../../utils/styled';
import { white } from '../../colors';
import { distance } from '../../distance';
import { remCalc } from '../../utils/remCalc';
import { HeadersProps, TabHeaderProps } from './ContentSwitchTypes.part';
import { getFontStyle } from '../../textStyles';

export const Container = styled.div``;

const HorizontalHeaders = css`
  display: flex;

  > li {
    display: inline-block;
  }
`;

const VerticalHeaders = css`
  display: inline-block;
  text-align: center;
`;

export const Headers = styled('ul')<HeadersProps>`
  margin: 0 0 ${distance.xsmall};
  padding: 0;
  ${({ orientation }) => (orientation === 'horizontal' ? HorizontalHeaders : VerticalHeaders)};
`;

export const Content = styled.div``;

const ActiveTab = css`
  color: ${themed(props => props.theme.text4)};
  background: ${themed(props => props.theme.ui5)};
`;

const InactiveTab = css`
  color: ${themed(props => props.theme.text2)};
  background: ${white};

  &:hover {
    border-color: ${themed(props => props.theme.ui5)};
  }
`;

export const Header = styled('li')<TabHeaderProps>`
  ${getFontStyle({ size: 'medium' })}
  padding: ${({ orientation }) => (orientation === 'vertical' ? remCalc(['8px', '48px']) : remCalc(['8px', '16px']))};
  position: relative;
  margin: 0;
  list-style: none;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  ${props => (props.active ? ActiveTab : InactiveTab)};
  border: 1px solid ${themed(props => props.theme.ui4)};
`;

export interface TabItemProps {
  active?: boolean;
}

export const ContentItem = styled.div<TabItemProps>`
  ${props => (props.active ? '' : 'display: none;')};
`;

export const OverflowItems = styled.div`
  white-space: nowrap;
`;
