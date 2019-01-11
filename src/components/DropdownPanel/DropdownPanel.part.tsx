import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import {
  InteractiveList,
  InteractiveListChangeEvent,
  InteractiveListWrapperProps,
  InteractiveListItemObject,
} from '../InteractiveList';
import { cyan } from '../../colors';
import { Icon } from '../Icon';
import { TextStylings } from '../../textStyles';

interface StyledWrapperProps {
  open: boolean;
}
const StyledWrapper = styled.div`
  box-sizing: border-box;
  box-shadow: none;
  margin: 0 0 ${(props: StyledWrapperProps) => (props.open ? '10px' : '0')} 0;
  padding: 0;
  border: 1px solid ${themed(({ theme, open }) => (open ? theme.fill : theme.ui6))};
`;

const MenuCaret = styled.div`
  position: absolute;
  top: 8px;
  right: 9px;
  fill: rgba(0, 139, 208, 1);
`;

const MenuTitle = styled.span`
  line-height: ${TextStylings.delta.lineHeight};
  font-size: ${TextStylings.delta.fontSize};
  border-bottom: 2px solid black;
  font-weight: 400;
`;

const SelectedMenu = styled.div`
  position: relative;
  padding: 10px;
  cursor: pointer;
`;

export type TabHeaderItem = InteractiveListItemObject;

export interface SlideDownTabsProps {
  /**
   * The tab items.
   */
  data: Array<TabHeaderItem>;
  /**
   * Selected tab index.
   */
  selectedIndex: number;
  /**
   * Event triggered once the item selected.
   */
  onChange(index: number): void;
}

export interface SlideDownTabsState {
  isOpen: boolean;
}

const CustomWrapper: React.SFC<InteractiveListWrapperProps> = props => <div {...props} />;

export class SlideDownTabs extends React.Component<SlideDownTabsProps, SlideDownTabsState> {
  constructor(props: SlideDownTabsProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  private hide = () => {
    this.setState({ isOpen: false });
  };

  private toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState({ isOpen: !this.state.isOpen });
    e.preventDefault();
  };

  private onChange = ({ value }: InteractiveListChangeEvent) => {
    this.props.onChange(value[0]);
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { isOpen } = this.state;
    const { data, selectedIndex } = this.props;
    const interactiveList = data.map((item, index) => (index === selectedIndex ? undefined : item));

    return (
      <StyledWrapper open={isOpen}>
        <SelectedMenu onMouseDown={this.toggle}>
          <MenuTitle>{data[selectedIndex].content}</MenuTitle>
          <MenuCaret>
            <Icon name={isOpen ? 'KeyboardArrowUp' : 'KeyboardArrowDown'} size="24px" color={cyan} />
          </MenuCaret>
        </SelectedMenu>
        <InteractiveList
          data={interactiveList}
          open={isOpen}
          onBlur={this.hide}
          autoFocus
          onChange={this.onChange}
          customWrapper={CustomWrapper}
        />
      </StyledWrapper>
    );
  }
}

export const DropdownContainer = styled.div``;

export const TabContent = styled.div``;

export interface TabItemProps {
  active?: boolean;
}

export const TabItem = styled.div`
  ${(props: TabItemProps) => (props.active ? '' : 'display: none;')};
`;
