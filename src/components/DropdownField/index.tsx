import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { KeyCodes } from '../../utils/keyCodes';
import { showInputInfo } from '../../utils/input';
import { remCalc } from '../../utils/remCalc';
import { LabeledInputProps, InputChangeEvent, ScreenSize } from '../../common';
import { InputIcon } from '../InputIcon';
import { withFormContext, FormContextProps } from '../../hoc/withFormContext';
import { transparent } from '../../colors';
import { distance } from '../../distance';
import { light } from '../../themes';
import { Icon } from '../Icon';
import { Responsive } from '../Responsive';
import { WindowPopup } from '../WindowPopup';
import {
  InteractiveList,
  InteractiveListChangeEvent,
  InteractiveListWrapperProps,
  InteractiveListDirection,
  InteractiveListBorderType,
} from '../InteractiveList';
import {
  StyledInputRow,
  StyledInputBox,
  getTextFieldBorderType,
  StyledTagItem,
  StyledIconContainer,
} from '../../quarks';
import { getFontStyle } from '../../textStyles';

export interface DropdownFieldToggleEvent {
  state: 'open' | 'close';
}

export type DropdownFieldChangeEvent = InputChangeEvent<Array<string>>;

export interface DropdownFieldItem {
  key: string;
  content?: React.ReactChild;
  searchText?: string;
  type?: 'item' | 'divider' | 'header';
}

export interface DropdownFieldProps extends LabeledInputProps<string | Array<string>> {
  /**
   * @ignore
   */
  children?: void;
  /**
   * This Boolean attribute indicates that multiple options can be selected in the list.
   * If it is not specified, then only one option can be selected at a time.
   * Default value is `false`.
   */
  multiple?: boolean;
  /**
   * The maximum number of items shown in case of multiple.
   * @default 8
   */
  maxSelectedShown?: number;
  /**
   * Fired when the dropdown gets opened or closed.
   */
  onToggle?(e: DropdownFieldToggleEvent): void;
  /**
   * Fired once the selected value changes.
   */
  onChange?(e: DropdownFieldChangeEvent): void;
  /**
   * The data to be displayed as selection basis.
   */
  data: Array<string | DropdownFieldItem>;
  /**
   * Removes the border of the control.
   * @default false
   */
  borderless?: boolean;
}

export interface DropdownState {
  value: Array<number>;
  open: boolean;
  controlled: boolean;
}

const DropdownContainer = styled.div`
  position: relative;
  outline: 0;
`;

const DropdownSelect = styled.div`
  display: flex;
`;

interface DropDownOptionsTextProps {
  labelShown: boolean;
  disabled?: boolean;
}

const DropdownInputBox = styled(StyledInputBox)`
  border: 1px solid ${themed(({ focused, theme: { ui4 } }) => (focused ? ui4 : transparent))};
`;

const DropdownOptionText = styled.div<DropDownOptionsTextProps>`
  ${getFontStyle({ size: 'medium' })}
  padding: ${props =>
    !props.labelShown ? `${distance.medium}` : `${distance.large} ${distance.medium} ${distance.small}`};
  margin: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: ${themed(({ theme, disabled }) => (disabled ? theme.text3 : theme.text1))};
  font-family: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'auto')};
`;

const SingleDropdownItem = styled.span`
  display: inline-block;
  line-height: normal;
  border: 0;
  color: ${themed(props => props.theme.text6)};
`;

interface StyledStandardWrapperProps {
  direction: InteractiveListDirection;
  border: InteractiveListBorderType;
}

const StyledStandardWrapper = styled('ul')<StyledStandardWrapperProps>`
  list-style: none;
  width: 100%;
  position: absolute;
  transform: translateY(${props => (props.direction === InteractiveListDirection.normal ? 0 : -100)}%);
  box-sizing: border-box;
  box-shadow: none;
  margin: 0;
  padding: 0;
  background: ${themed(props => props.theme.ui1)};
  border: 1px solid
    ${themed(({ border, theme: { ui0, ui4 } }) => (border === InteractiveListBorderType.none ? ui0 : ui4))};
  max-height: 50vh;
  ${props =>
    props.direction === InteractiveListDirection.normal
      ? 'border-top-color: transparent'
      : 'border-bottom-color: transparent'};
  top: ${props => (props.direction === InteractiveListDirection.normal ? -1 : -53)}px;
  overflow-y: auto;
  z-index: 100;
`;

const StyledLabel = styled.div`
  padding-left: ${distance.medium};
`;

const DropdownPopup = styled(WindowPopup)`
  border: 2em solid transparent;
`;

// tslint:disable-next-line
const NotOpenComponent = null;

const StandardWrapper: React.SFC<InteractiveListWrapperProps> = ({ open, ...props }) =>
  open ? <StyledStandardWrapper {...props} /> : NotOpenComponent;
StandardWrapper.displayName = 'StandardWrapper';

const getMobileWrapper = (label?: React.ReactChild) => ({
  onClick,
  children,
  open,
}: InteractiveListWrapperProps & { children?: React.ReactNode }) =>
  open ? (
    <DropdownPopup onClose={onClick} label={label}>
      {children}
    </DropdownPopup>
  ) : (
    NotOpenComponent
  );

function getChosen(selected: string | Array<string>, multiple?: boolean) {
  if (multiple) {
    return Array.isArray(selected) ? selected : [selected];
  } else {
    return [Array.isArray(selected) ? selected[0] : selected];
  }
}

function getKeys(data: Array<string | DropdownFieldItem>, selected: Array<number>) {
  return selected.map(index => {
    const item = data[index];
    return typeof item === 'string' ? item : item.key;
  });
}

function getIndices(data: Array<string | DropdownFieldItem>, selected: string | Array<string>, multiple?: boolean) {
  const chosen = getChosen(selected, multiple);
  const indices: Array<number> = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
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

function getContent(item: string | DropdownFieldItem) {
  if (typeof item !== 'string') {
    return item.content || item.key;
  }

  return item;
}

function getSingleContent(item: string | DropdownFieldItem, theme?: any) {
  const key = typeof item === 'string' ? item : item.key;
  return (
    <SingleDropdownItem theme={theme} key={key}>
      {getContent(item)}
    </SingleDropdownItem>
  );
}

const MultipleDropdownItem = styled(StyledTagItem as any)`
  margin: 0 ${distance.small} 0 0;
`;

function getMultipleContent(item: string | DropdownFieldItem, theme?: any) {
  const key = typeof item === 'string' ? item : item.key;
  return (
    <MultipleDropdownItem theme={theme} key={key}>
      {getContent(item)}
    </MultipleDropdownItem>
  );
}

class DropdownFieldInt extends React.Component<DropdownFieldProps & FormContextProps, DropdownState> {
  constructor(props: DropdownFieldProps) {
    super(props);
    const data = props.data || [];
    let value: string | Array<string> = [];

    if (typeof props.value === 'string' || Array.isArray(props.value)) {
      value = props.value;
    } else if (typeof props.defaultValue === 'string' || Array.isArray(props.defaultValue)) {
      value = props.defaultValue;
    }

    this.state = {
      value: getIndices(data, value, props.multiple),
      open: false,
      controlled: props.value !== undefined,
    };
  }

  componentDidMount() {
    const { form } = this.props;
    const { controlled } = this.state;

    if (!controlled && form) {
      form.subscribe(this);
    }
  }

  componentWillUnmount() {
    const { form } = this.props;
    const { controlled } = this.state;

    if (!controlled && form) {
      form.unsubscribe(this);
    }
  }

  componentWillReceiveProps(nextProps: DropdownFieldProps) {
    const { controlled } = this.state;

    if (controlled) {
      const data = nextProps.data || [];
      const value = nextProps.value !== undefined ? nextProps.value : [];
      this.setState({
        value: getIndices(data, value, nextProps.multiple),
      });
    }
  }

  private show = () => {
    if (!this.state.open) {
      this.toggle();
    }
  };

  private hide = () => {
    if (this.state.open) {
      this.toggle();
    }
  };

  private toggle = () => {
    const { onToggle, disabled } = this.props;

    if (!disabled) {
      const { open } = this.state;

      this.setState({
        open: !open,
      });

      if (typeof onToggle === 'function') {
        onToggle({
          state: open ? 'close' : 'open',
        });
      }
    }
  };

  private control = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.keyCode) {
      case KeyCodes.enter:
      case KeyCodes.space:
        this.show();
        break;
      case KeyCodes.escape:
        this.hide();
        break;
      case KeyCodes.up:
      case KeyCodes.down:
        if (!this.state.open) {
          this.show();
        }
        return;
      default:
        return;
    }
    e.stopPropagation();
    e.preventDefault();
  };

  private handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.toggle();
    e.preventDefault();
  };

  private handleChange = ({ value }: InteractiveListChangeEvent) => {
    const { controlled } = this.state;
    const { onChange, data, multiple, form, name = '' } = this.props;

    if (!multiple) {
      this.hide();
    }

    if (!controlled) {
      if (form) {
        form.change({
          name,
          value,
        });
      } else {
        this.setState({
          value: value,
        });
      }
    }

    if (typeof onChange === 'function') {
      onChange({
        value: value.length ? getKeys(data, value) : [],
      });
    }
  };

  private renderList = (screenSize?: ScreenSize) => {
    const { data = [], theme, disabled, multiple } = this.props;
    const { open, value } = this.state;
    const mobile = screenSize === 'small';
    const wrapper = mobile ? getMobileWrapper(<StyledLabel>{this.props.label}</StyledLabel>) : StandardWrapper;

    return (
      <InteractiveList
        theme={theme}
        data={data}
        multiple={multiple}
        open={open && !disabled}
        onChange={this.handleChange}
        onClick={mobile ? this.toggle : undefined}
        onBlur={mobile ? undefined : this.hide}
        onKeyDown={mobile ? this.control : undefined}
        indices={value}
        customWrapper={wrapper}
        autoPosition
        autoFocus
      />
    );
  };

  render() {
    const {
      borderless,
      children: _0,
      value: _1,
      defaultValue: _2,
      data = [],
      theme,
      className: classNameProp,
      label,
      placeholder,
      maxSelectedShown = 8,
      disabled,
      multiple,
      info,
      error,
      onChange,
      ...other
    } = this.props;
    const { open: openState, value } = this.state;
    const open = openState && !disabled;
    const getContent = multiple ? getMultipleContent : getSingleContent;
    const hasValue = !!value.length;
    const border = getTextFieldBorderType(borderless, !!error, open);
    const items = value.map(i => data[i]);
    const th = theme || light;

    if (value.length > maxSelectedShown) {
      const rest = 1 + value.length - maxSelectedShown;
      items.splice(maxSelectedShown - 1, rest, `+ ${rest}`);
    }

    return (
      <DropdownContainer {...other}>
        <DropdownSelect
          onMouseDown={this.handleMouseDown}
          tabIndex={0}
          onKeyDown={this.control}
          className="ignore-react-onclickoutside">
          <DropdownInputBox disabled={disabled} hasValue={hasValue} border={border} focused={open} theme={theme}>
            <StyledInputRow label={label} placeholder={placeholder} error={!!error} focused={open} hasValue={hasValue}>
              <DropdownOptionText labelShown={label !== undefined} disabled={disabled}>
                {hasValue || label ? items.map(item => getContent(item, theme)) : placeholder}
              </DropdownOptionText>
            </StyledInputRow>
            <InputIcon disabled={disabled} theme={theme} error={error} hasValue={hasValue} />
            <StyledIconContainer>
              <Icon
                name={open ? 'KeyboardArrowUp' : 'KeyboardArrowDown'}
                color={disabled ? th.ui4 : th.ui5}
                size="22px"
              />
            </StyledIconContainer>
          </DropdownInputBox>
        </DropdownSelect>
        <Responsive render={this.renderList} />
        {showInputInfo(error, info)}
      </DropdownContainer>
    );
  }
}

/**
 * Dropdown menu component.
 */
export const DropdownField = withFormContext(DropdownFieldInt);
DropdownField.displayName = 'DropdownField';
