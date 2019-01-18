import * as React from 'react';
import styled, { themed, reStyled } from '../../utils/styled';
import {
  InteractiveListWrapperProps,
  InteractiveListDirection,
  InteractiveListBorderType,
  InteractiveListItem,
  InteractiveListProps,
  InteractiveListState,
} from './InteractiveList.types.part';
import { Icon } from '../Icon';
import { Checkbox } from '../Checkbox';
import { remCalc } from '../../utils/remCalc';
import { KeyCodes } from '../../utils/keyCodes';
import { pacificBlue, transparent } from '../../colors';
import { distance } from '../../distance';

interface ListItemProps {
  selected: boolean;
  hovered: boolean;
  onClick?(e: React.MouseEvent): void;
  onMouseMove?(e: React.MouseEvent): void;
}

interface ListItemContentProps {
  condensed: boolean;
  showTick: boolean;
}

interface ListItemIconProps {
  condensed: boolean;
  padding: boolean;
}

const InteractiveListContainer = styled.div`
  position: relative;
  outline: none;
`;

const ListWrapper = reStyled<InteractiveListWrapperProps, 'ul'>('ul')(
  ({ open, flyout, border, direction, theme: { ui4 } }) => `
  display: ${open || !flyout ? 'block' : 'none'};
  list-style: none;
  width: 100%;
  position: ${flyout ? 'absolute' : 'relative'};
  transform: translateY(${direction === InteractiveListDirection.normal ? 0 : -100}%);
  box-sizing: border-box;
  box-shadow: none;
  margin: 0;
  padding: 0;
  background: ${transparent};
  border: 1px solid
    ${border === InteractiveListBorderType.none ? transparent : ui4};
  ${flyout ? (direction === InteractiveListDirection.normal ? 'border-top: none' : 'border-bottom: none') : ''};
  max-height: ${flyout ? '50vh' : '100%'};
  overflow-y: auto;
  z-index: 100;
`,
);

const ListItem = reStyled.li<ListItemProps>(
  ({ hovered, theme: { ui3, text2 } }) => `
  background: ${hovered ? ui3 : transparent};
  color: ${text2};
  list-style: none;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  width: 100%;
  height: auto;
  font-size: ${remCalc('16px')};
  line-height: 22px;
  position: relative;

  a {
    color: inherit;
    display: block;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }
`,
);

const ListItemInnerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ListItemContent = styled.div`
  flex-grow: 1;
`;

const ListItemContentPadding = styled<ListItemContentProps, 'div'>('div')`
  padding: ${props => (props.condensed ? `${distance.small} ${distance.medium}` : distance.medium)};
  ${props => (props.showTick ? 'padding-right: 0;' : '')};
`;

const ListItemContentComponentPadding = styled<ListItemContentProps, 'div'>('div')`
  > * {
    padding: ${props => (props.condensed ? `${distance.small} ${distance.medium}` : distance.medium)};
    ${props => (props.showTick ? 'padding-right: 0;' : '')};
  }
`;

const ListItemIconPadding = styled<ListItemIconProps, 'div'>('div')`
  padding: ${props =>
    props.padding ? (props.condensed ? `${distance.small} ${distance.medium}` : distance.medium) : '0'};

  i {
    display: block;
  }
`;

const ListDivider = styled.hr`
  margin: ${distance.xsmall} ${distance.small};
  border: none;
  border-top: 1px solid ${themed(props => props.theme.textDisabled)};
`;

const ListHeader = styled.span`
  font-size: ${remCalc('16px')};
  line-height: 22px;
  padding: ${distance.medium} ${distance.small};
  width: 100%;
  display: block;
  height: auto;
  min-height: 1em;
  box-sizing: border-box;
  color: ${themed(props => props.theme.primary)};
`;

function getChosen(selected: string | Array<string>, multiple?: boolean) {
  if (multiple) {
    return Array.isArray(selected) ? selected : [selected];
  } else {
    return [Array.isArray(selected) ? selected[0] : selected];
  }
}

function getIndices(
  data: Array<InteractiveListItem | undefined>,
  selected: string | Array<string>,
  multiple?: boolean,
) {
  const chosen = getChosen(selected, multiple);
  const indices: Array<number> = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (!item) {
      continue;
    }

    const key = typeof item === 'string' ? item : item.key;

    if (chosen.indexOf(key) !== -1) {
      indices.push(i);
    }
  }

  if (!multiple && indices.length > 1) {
    indices.splice(1);
  }

  return indices;
}

function autoSelect(element: HTMLElement) {
  const child = element && element.querySelector('a');

  if (child) {
    child.click();
  }
}

export class InteractiveListInt extends React.PureComponent<InteractiveListProps, InteractiveListState> {
  private readonly selects: Array<() => void> = [];
  private readonly elements: Array<HTMLElement> = [];
  private interactiveList: HTMLElement;

  constructor(props: InteractiveListProps) {
    super(props);
    const value = props.value || props.defaultValue || [];
    this.state = {
      value: props.indices || getIndices(props.data || [], value, props.multiple),
      controlled: props.indices !== undefined || props.value !== undefined,
      selected: undefined,
      direction: InteractiveListDirection.normal,
    };
  }

  handleClickOutside = () => {
    const { open, onBlur } = this.props;

    if (open) {
      if (typeof onBlur === 'function') {
        onBlur();
      }

      this.setState({
        selected: undefined,
      });
    }
  };

  componentWillReceiveProps(nextProps: InteractiveListProps) {
    const { flyout = true, open, autoPosition, focus } = this.props;

    if (this.state.controlled) {
      const { indices, value, data = [], multiple } = nextProps;

      this.setState({
        value: indices || getIndices(data, value || [], multiple),
      });
    }

    if (nextProps.focus !== focus && nextProps.focus) {
      if (flyout && open && nextProps.open) {
        this.interactiveList.focus();
        this.setState({
          selected: 0,
        });
      }
    }

    if (autoPosition && flyout && !open && nextProps.open) {
      const windowHeight = window.innerHeight;
      const { top } = this.interactiveList.getBoundingClientRect();

      if (top > windowHeight / 2) {
        this.setState(() => ({
          direction: InteractiveListDirection.reverse,
        }));
      } else {
        this.setState(() => ({
          direction: InteractiveListDirection.normal,
        }));
      }
    }
  }

  componentDidUpdate() {
    const { flyout = true, open, autoFocus } = this.props;

    if (flyout && open && autoFocus) {
      this.interactiveList.focus();
    }
  }

  private getNext(proposed: number, dir: number) {
    const { data } = this.props;
    const max = data.length;

    for (let i = 0; i < max; i++) {
      const item = data[proposed];

      if (!item) {
        continue;
      }

      if (typeof item === 'string' || (item.type !== 'divider' && item.type !== 'header')) {
        return proposed;
      }

      proposed += dir;

      if (proposed < 0) {
        proposed = max - 1;
      } else if (proposed === max) {
        proposed = 0;
      }
    }

    return 0;
  }

  private jumpTo(part: string) {
    const { data } = this.props;
    const { selected } = this.state;
    const start = selected ? (selected === data.length - 1 ? 0 : selected) : 0;
    let index = start;

    for (let i = start; i < start + data.length; i++, index = i === data.length ? 0 : index + 1) {
      const item = data[index];
      if (!item) {
        continue;
      }
      const lookup = typeof item === 'string' ? item : item.searchText || item.content || item.key;

      if (typeof lookup === 'string' && lookup.substr(0, part.length).toLowerCase() === part && selected !== index) {
        this.setState({
          selected: index,
        });
        break;
      }
    }
  }

  private control = (e: React.KeyboardEvent<HTMLElement>) => {
    const { data, onBlur, disabled, onKeyDown } = this.props;

    if (!disabled) {
      const { selected } = this.state;

      if (typeof onKeyDown === 'function') {
        onKeyDown(e);
      }

      switch (e.keyCode) {
        case KeyCodes.down:
          this.setState({
            selected: this.getNext(selected === undefined ? 0 : (selected + 1) % data.length, 1),
          });
          break;
        case KeyCodes.up:
          this.setState({
            selected: this.getNext(((selected || data.length) - 1) % data.length, -1),
          });
          break;
        case KeyCodes.home:
          this.setState({
            selected: this.getNext(0, 1),
          });
          break;
        case KeyCodes.end:
          this.setState({
            selected: this.getNext(data.length - 1, -1),
          });
          break;
        case KeyCodes.enter:
        case KeyCodes.space:
          if (typeof selected === 'number') {
            autoSelect(this.elements[selected]);
          }

          this.done();
          break;
        case KeyCodes.escape:
          if (typeof onBlur === 'function') {
            onBlur();
          }

          break;
        default:
          this.jumpTo(e.key.toLowerCase());
          return;
      }
    }

    e.stopPropagation();
    e.preventDefault();
  };

  private createSingleItem = (item: InteractiveListItem, index: number) => {
    let key = '';
    let content: React.ReactChild;

    if (typeof item === 'string') {
      key = item;
      content = item;
    } else {
      key = item.key;
      content = item.content || item.key;
    }

    return this.createItem(key, index, content);
  };

  private createMultipleItem = (item: InteractiveListItem, index: number) => {
    const { value } = this.state;
    let key = '';
    let content: React.ReactChild;

    if (typeof item === 'string') {
      key = item;
      content = item;
    } else {
      key = item.key;
      content = item.content || item.key;
    }

    const newContent = <Checkbox value={value.indexOf(index) >= 0}>{content}</Checkbox>;
    return this.createItem(key, index, newContent);
  };

  private done = () => {
    const { multiple, onChange, disabled } = this.props;
    const { value, controlled, selected } = this.state;

    if (!disabled && selected !== undefined) {
      const newValue = multiple
        ? value.indexOf(selected) === -1
          ? [...value, selected]
          : value.filter(i => i !== selected)
        : [selected];

      if (!controlled) {
        this.setState({
          value: newValue,
        });
      }

      if (typeof onChange === 'function') {
        onChange({
          value: newValue,
        });
      }
    }
  };

  private createItem(key: string, index: number, content: React.ReactChild) {
    const { value, selected } = this.state;
    const { disabled, showTick = false, multiple = false, condensed = false } = this.props;
    const isHovered = !disabled && selected === index;
    const isSelected = value.indexOf(index) >= 0;
    const selects = this.selects;
    const isContentString = typeof content === 'string';
    const ContentWrapper = isContentString ? ListItemContentPadding : ListItemContentComponentPadding;

    if (selects[index] === undefined) {
      selects[index] = () => this.select(index);
    }

    return (
      <ListItem
        key={`${key}-${index}`}
        onClick={this.done}
        onMouseMove={selects[index]}
        selected={isSelected}
        hovered={isHovered}
        innerRef={(node: HTMLLIElement) => {
          this.elements[index] = node;

          if (isHovered && node) {
            const parent = node.parentElement;

            if (parent) {
              const height = parent.clientHeight;
              const position = parent.scrollTop;
              const y0 = node.offsetTop - position;
              const y1 = y0 + node.offsetHeight - height;

              if (y0 < 0) {
                parent.scrollTop = node.offsetTop;
              } else if (y1 > 0) {
                parent.scrollTop += y1;
              }
            }
          }
        }}>
        <ListItemInnerContainer>
          <ListItemContent>
            <ContentWrapper condensed={condensed} showTick={showTick}>
              {content}
            </ContentWrapper>
          </ListItemContent>
          {isSelected && !multiple && showTick && (
            <ListItemIconPadding condensed={condensed} padding={isContentString}>
              <Icon name="Check" color={pacificBlue} size={1.375} />
            </ListItemIconPadding>
          )}
        </ListItemInnerContainer>
      </ListItem>
    );
  }

  private select(index: number) {
    const { disabled } = this.props;

    if (!disabled && this.state.selected !== index) {
      this.setState({
        selected: index,
      });
    }
  }

  private setNode = (ref: HTMLElement) => {
    this.interactiveList = ref;
  };

  render() {
    const {
      onChange: _0,
      indices: _1,
      disabled: _2,
      onKeyDown: _3,
      data = [],
      theme,
      borderless = false,
      children,
      multiple = false,
      open = false,
      onBlur,
      customWrapper,
      flyout = true,
      onClick,
      ...props
    } = this.props;
    const border = borderless ? InteractiveListBorderType.none : InteractiveListBorderType.normal;
    const createItem = multiple ? this.createMultipleItem : this.createSingleItem;
    const Wrapper = customWrapper || ListWrapper;

    return (
      <InteractiveListContainer
        innerRef={this.setNode}
        {...(open ? { tabIndex: 0 } : undefined)}
        onKeyDown={this.control}
        {...props}>
        <Wrapper open={open} flyout={flyout} border={border} direction={this.state.direction} onClick={onClick}>
          {(open || !flyout) &&
            data.map((item, index) => {
              if (!item) {
                return;
              } else if (typeof item !== 'string') {
                switch (item.type) {
                  case 'divider':
                    return <ListDivider key={item.key} />;
                  case 'header':
                    return <ListHeader key={item.key}>{item.content || item.key}</ListHeader>;
                }
              }

              return createItem(item, index);
            })}
        </Wrapper>
      </InteractiveListContainer>
    );
  }
}
