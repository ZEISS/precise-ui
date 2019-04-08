import * as React from 'react';
import styled from '../../utils/styled';
import {
  InteractiveList,
  InteractiveListChangeEvent,
  InteractiveListItem,
  InteractiveListWrapperProps,
  InteractiveListDirection,
} from '../InteractiveList';
import { Icon } from '../Icon';
import { white, cyan, skyBlue } from '../../colors';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import OnClickOut from 'react-onclickoutside';

export interface SelectButtonChangeEvent {
  /**
   * The currently selected index. In case none is
   * chosen the value -1 is communicated.
   */
  index: number;
  /**
   * The currently selected value. Undefined if none
   * is chosen.
   */
  value: string | undefined;
}

export interface SelectButtonProps extends StandardProps {
  /**
   * The data source of the elements to show.
   */
  data: Array<string | InteractiveListItem>;
  /**
   * The currently selected value if any. Picking one enters the controlled mode.
   */
  value?: string;
  /**
   * The initial value if any. Picking one enters managed mode.
   */
  defaultValue?: string;
  /**
   * Event fired once the selected value changes.
   */
  onChange?(e: SelectButtonChangeEvent): void;
  /**
   * @ignore
   */
  children?: void;
}

export interface SelectButtonState {
  open: boolean;
  value: string;
  controlled: boolean;
}

const RootWrapper = styled.div`
  color: ${cyan};
  &:hover {
    color: ${skyBlue};
  }
`;

const ButtonWrapper = styled.div`
  padding-left: ${distance.xsmall};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledCustomWrapper = styled.div<InteractiveListWrapperProps>`
  position: absolute;
  border: solid 1px #dfe3e6;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 2;
  top: ${props => (props.direction === InteractiveListDirection.normal ? 8 : -30)}px;
  transform: translateY(${props => (props.direction === InteractiveListDirection.normal ? 0 : -100)}%);
  background: ${white};
  border: 1px solid #dfe3e6;
  max-height: 50vh;
  overflow-y: auto;
`;

const CustomWrapper: React.SFC<InteractiveListWrapperProps> = props => {
  return <StyledCustomWrapper {...props} />;
};

function renderValue(data: Array<string | InteractiveListItem>, value: string) {
  for (const item of data) {
    if (typeof item !== 'string' && item.key === value) {
      return item.content || value;
    }
  }

  return value;
}

class SelectButtonInt extends React.PureComponent<SelectButtonProps, SelectButtonState> {
  constructor(props: SelectButtonProps) {
    super(props);
    const controlled = props.value !== undefined;
    this.state = {
      open: false,
      value: (controlled ? props.value : props.defaultValue) || '',
      controlled,
    };
  }

  componentWillReceiveProps(nextProps: SelectButtonProps) {
    const { controlled } = this.state;

    if (controlled) {
      this.setState({
        value: nextProps.value || '',
      });
    }
  }

  private handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const { open } = this.state;

    this.setState({
      open: !open,
    });

    e.preventDefault();
  };

  private handleChange = (e: InteractiveListChangeEvent) => {
    const { onChange, data } = this.props;
    const { controlled } = this.state;
    const index = e.value.length ? e.value[0] : -1;
    const item = data[index];
    const value = item && (typeof item === 'string' ? item : item.key);

    if (!value) {
      return;
    }

    if (!controlled) {
      this.setState({
        open: false,
        value,
      });
    } else {
      this.setState({
        open: false,
      });
    }

    if (typeof onChange === 'function') {
      onChange({
        index,
        value,
      });
    }
  };

  private handleBlur = () => {
    this.setState({
      open: false,
    });
  };

  handleClickOutside = this.handleBlur;

  render() {
    const { data = [], onChange: _0, value: _1, ...props } = this.props;
    const { open, value } = this.state;

    return (
      <RootWrapper {...props}>
        <ButtonWrapper onMouseDown={this.handleMouseDown}>
          {renderValue(data, value)}
          <Icon name="ArrowDropDown" size={1.5} />
        </ButtonWrapper>
        <InteractiveList
          data={data}
          open={open}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          customWrapper={CustomWrapper}
          value={value}
          onClickOutside={() => {}}
          autoPosition
          autoFocus
          showTick
        />
      </RootWrapper>
    );
  }
}

/**
 * Represents a select button, which is a kind of dropdown button.
 */
export const SelectButton = OnClickOut(SelectButtonInt);
