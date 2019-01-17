import styled, { css, themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { white } from '../../colors';
import { distance } from '../../distance';
import { TextStylings } from '../../textStyles';
import { remCalc } from '../../utils/remCalc';
import { ContentSwitchOrientation } from './ResponsiveContentSwitchPanel';

export const Container = styled.div``;

export interface HeadersProps {
  orientation: ContentSwitchOrientation;
}

export interface TabHeaderProps extends StandardProps {
  orientation?: ContentSwitchOrientation;
  active?: boolean;
}

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

export const Headers = styled<HeadersProps, 'ul'>('ul')`
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

export const Header = styled<TabHeaderProps, 'li'>('li')`
  padding: ${({ orientation }) => (orientation === 'vertical' ? remCalc(['8px', '48px']) : remCalc(['8px', '16px']))};
  position: relative;
  margin: 0;
  list-style: none;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  ${props => (props.active ? ActiveTab : InactiveTab)};
  border: 1px solid ${themed(props => props.theme.ui4)};
  font-size: ${remCalc('16px')};
  line-height: ${remCalc('20px')};
`;

export interface TabItemProps {
  active?: boolean;
}

export const ContentItem = styled.div`
  ${(props: TabItemProps) => (props.active ? '' : 'display: none;')};
`;

export const OverflowItems = styled.div`
  white-space: nowrap;
`;
