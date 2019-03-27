import * as React from 'react';
import styled, { css, themed } from '../../utils/styled';
import { TextInputProps } from '../../common';
import { grey5, grey7, white, tuna } from '../../colors';
import { TextField, TextFieldChangeEvent } from '../TextField';
import { withFormContext, FormContextProps } from '../../hoc/withFormContext';
import { remCalc } from '../../utils/remCalc';
import { Icon } from '../Icon';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

export interface DateFieldOpenChangedEvent {
  /**
   * If the calendar flyout is supposed to be open or closed.
   */
  open: boolean;
}

export interface DateFieldProps extends TextInputProps {
  /**
   * Optional abbreviations for the 12 months (Jan - Dec) of the year to use.
   */
  months?: Array<string>;
  /**
   * Optional abbreviations for the 7 days (Mon - Sun) of the week to use.
   */
  weekDays?: Array<string>;
  /**
   * Sets the visibilty of the calendar flyout. If set the flyout will be set
   * to controlled mode, otherwise it is managed.
   */
  open?: boolean;
  /**
   * Event fired when the flyout wants to open or close.
   */
  onOpenChange?(e: DateFieldOpenChangedEvent): void;
  /**
   * @ignore
   */
  children?: void;
}

interface TableCell {
  label: string;
  value: number;
  disabled?: boolean;
}

const defaultWeekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const defaultMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const decadesCount = 12;

export type CalendarViewOptions = 'days' | 'months' | 'years';

export interface DateFieldState {
  view: CalendarViewOptions;
  open: boolean;
  valueControlled: boolean;
  openControlled: boolean;
  value: string;
  date: Date;
}

export interface StyledCalendarCell {
  disabled?: boolean;
}

const DateFieldContainer = styled.div`
  position: relative;
`;

const CalendarView = styled.div`
  outline: none;
  position: absolute;
  z-index: 1;
  background: ${white};
  box-shadow: 0 1px 3px 0 ${grey5};
  border-radius: 4px;
  padding: ${remCalc(['26px', '20px'])};
  width: ${remCalc('400px')};
`;

export const CalendarTable = styled.div``;

export const Row = styled.div`
  display: relative;
  margin-bottom: ${distance.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CommonCalendarCell = css`
  display: inline-block;
  width: 100%;
  height: ${remCalc('28px')};
  margin-right: ${distance.medium};
  border: 0;
  text-align: center;
  vertical-align: top;
  box-sizing: border-box;

  &:last-child {
    margin-right: 0;
  }
`;

const DisabledCalendarCell = css`
  border-bottom: 1px solid transparent;
  color: ${themed(({ theme }) => theme.text3)};
`;

const EnabledCalendarCell = css`
  border-bottom: 1px solid ${themed(({ theme }) => theme.ui4)};
  color: ${themed(({ theme }) => theme.text1)};

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid ${themed(({ theme }) => theme.ui0)};
    color: ${themed(({ theme }) => theme.text0)};
  }
`;

const CalendarCell = styled.button<StyledCalendarCell>`
  ${getFontStyle({ size: 'medium' })}

  ${CommonCalendarCell};
  background: ${themed(({ theme }) => theme.ui2)};
  ${({ disabled }) => (disabled ? DisabledCalendarCell : EnabledCalendarCell)};
`;

const WeekHeaderCell = styled.div`
  ${getFontStyle({ weight: 'bold', lineHeight: 'xLarge' })}

  ${CommonCalendarCell};
  border-color: transparent;
`;

const Arrow = styled.button`
  ${getFontStyle({ size: 'medium' })}

  background-color: transparent;
  padding: 0;
  border: none;

  align-self: start;
  cursor: pointer;
  > i {
    vertical-align: middle;
  }
`;

const SwitchView = styled.div`
  cursor: pointer;
  padding: ${remCalc(['5px', '20px'])};
  background-color: transparent;
  transition: background-color 0.2s ease-out;
  &:hover {
    background-color: ${grey7};
  }
`;

function daysInMonth(date: Date, monthShift = 0) {
  let yr = date.getFullYear();
  let mt = date.getMonth();

  if (monthShift) {
    mt += monthShift;

    if (mt < 0) {
      yr--;
      mt = 11;
    } else if (mt > 11) {
      yr++;
      mt = 0;
    }
  }

  return 32 - new Date(yr, mt, 32).getDate();
}

function offsetInMonth(date: Date) {
  const yr = date.getFullYear();
  const mt = date.getMonth();
  return (new Date(yr, mt, 1).getDay() + 6) % 7;
}

function getDecade(date: Date, idx = 0) {
  const yr = date.getFullYear();
  const dc = ~~(yr / 10) * 10;
  return dc + idx;
}

function stringToDate(dateStr?: string) {
  if (dateStr) {
    const d = new Date(dateStr);

    if (Number.isNaN(d.valueOf())) {
      const [year, month, day] = dateStr.split('-').map(part => parseInt(part, 10));
      return new Date(year, month - 1, day);
    }

    return d;
  }

  return undefined;
}

function dateToString(dateObj: Date) {
  const [date] = dateObj.toJSON().split('T');
  return date;
}

export class DateFieldInt extends React.Component<DateFieldProps & FormContextProps, DateFieldState> {
  private timeout: any;

  constructor(props: DateFieldProps & FormContextProps) {
    super(props);
    const value = props.value || props.defaultValue || '';
    const date = stringToDate(value) || new Date();

    this.state = {
      view: 'days',
      valueControlled: props.value !== undefined,
      openControlled: props.open !== undefined,
      open: props.open || false,
      date,
      value,
    };
  }

  componentWillReceiveProps(nextProps: DateFieldProps) {
    if (this.state.valueControlled) {
      this.setState({
        value: nextProps.value || '',
      });
    }

    if (this.state.openControlled) {
      this.setState({
        open: nextProps.open || false,
      });
    }
  }

  componentDidMount() {
    const { form } = this.props;
    const { valueControlled } = this.state;

    if (!valueControlled && form) {
      form.subscribe(this);
    }
  }

  componentWillUnmount() {
    const { form } = this.props;
    const { valueControlled } = this.state;

    if (!valueControlled && form) {
      form.unsubscribe(this);
    }
  }

  private emitOpenChanged(open: boolean) {
    const { onOpenChange } = this.props;

    if (typeof onOpenChange === 'function') {
      onOpenChange({
        open,
      });
    }
  }

  private handleBlur = () => {
    this.timeout = setTimeout(() => {
      this.timeout = undefined;

      if (!this.state.openControlled) {
        this.setState({
          open: false,
        });
      }

      this.emitOpenChanged(false);
    }, 0);
  };

  private handleFocus = () => {
    if (this.timeout) {
      this.timeout = clearTimeout(this.timeout);
    } else {
      if (!this.state.openControlled) {
        this.setState({
          open: true,
        });
      }

      this.emitOpenChanged(true);
    }
  };

  private shiftDate(direction: number) {
    const { view, date } = this.state;
    const dateClone = new Date(date);
    switch (view) {
      case 'days':
        dateClone.setMonth(dateClone.getMonth() + direction);
        // If current month has 31 days, and today is 31 day, than switching 1 month forward
        // should switch to the last day of the next month, ie. 30th or 28th
        if (date.getDate() === 31 && dateClone.getDate() === 1) {
          dateClone.setDate(0);
        }
        break;
      case 'months':
        dateClone.setFullYear(dateClone.getFullYear() + direction);
        break;
      case 'years':
        dateClone.setFullYear(dateClone.getFullYear() + 10 * direction);
        break;
    }

    return dateClone;
  }

  private previous() {
    return this.shiftDate(-1);
  }

  private next() {
    return this.shiftDate(+1);
  }

  private changeValue(value: string, date: Date) {
    const { onChange, name = '', form } = this.props;

    if (!this.state.valueControlled) {
      if (form) {
        form.change({
          name,
          value,
        });
      } else {
        this.setState({
          value,
          date,
        });

        this.handleBlur();
      }
    }

    if (typeof onChange === 'function') {
      onChange({
        value,
      });
    }
  }

  private handleClick(value: number) {
    const { view, date } = this.state;
    const dateClone = new Date(date);

    switch (view) {
      case 'days':
        dateClone.setDate(value);
        this.changeValue(dateToString(dateClone), dateClone);
        break;
      case 'months':
        dateClone.setMonth(value);
        this.setState({
          view: 'days',
          date: dateClone,
        });
        break;
      case 'years':
        dateClone.setFullYear(value);
        this.setState({
          view: 'months',
          date: dateClone,
        });
        break;
    }
  }

  private handleNavigationClick(date: Date) {
    this.setState({ date });
  }

  private changeView(newView?: CalendarViewOptions) {
    const { view } = this.state;
    let nextView = newView || 'years';
    if (view === 'days') {
      nextView = 'months';
    }
    this.setState({ view: nextView });
  }

  private renderHeaderLabel() {
    const { view, date } = this.state;
    const { months: monthProps } = this.props;
    const months = monthProps || defaultMonths;

    switch (view) {
      case 'days':
        return months[date.getMonth()];
      case 'months':
        return date.getFullYear();
      case 'years':
        const decade = getDecade(date);
        return `${decade}-${decade + 9}`;
    }
  }

  private navigateLeft = () => {
    this.handleNavigationClick(this.previous());
  };

  private navigateRight = () => {
    this.handleNavigationClick(this.next());
  };

  private renderHeader() {
    return (
      <Row>
        <Arrow onClick={this.navigateLeft} type="button">
          <Icon name="KeyboardArrowLeft" size={2} />
        </Arrow>
        <SwitchView onClick={() => this.changeView()}>{this.renderHeaderLabel()}</SwitchView>
        <Arrow onClick={this.navigateRight} type="button">
          <Icon name="KeyboardArrowRight" size={2} />
        </Arrow>
      </Row>
    );
  }

  private renderCalendarTable(grid: Array<TableCell>, cols: number) {
    const rows: Array<JSX.Element> = [];
    let row: Array<JSX.Element> = [];

    grid.forEach((item: TableCell, i) => {
      if (i % cols === 0 && row.length) {
        rows.push(<Row key={rows.length}>{row}</Row>);
        row = [];
      }

      row.push(
        <CalendarCell
          type="button"
          key={i}
          disabled={item.disabled}
          tabIndex={item.disabled ? undefined : 0}
          onClick={item.disabled ? undefined : () => this.handleClick(item.value)}>
          {item.label}
        </CalendarCell>,
      );
    });

    rows.push(<Row key={rows.length}>{row}</Row>);
    return <CalendarTable>{rows}</CalendarTable>;
  }

  private renderDaysHeader() {
    const { weekDays } = this.props;
    const week = weekDays || defaultWeekDays;
    return (
      <Row>
        {week.map(day => (
          <WeekHeaderCell key={day}>{day}</WeekHeaderCell>
        ))}
      </Row>
    );
  }

  private renderDaysView() {
    const { date } = this.state;
    const offset = offsetInMonth(date);
    const daysLength = daysInMonth(date) + 1;
    const daysArray: Array<TableCell> = [];

    for (let i = 0; i < offset; i++) {
      daysArray.push({ label: '', value: -1, disabled: true });
    }

    for (let i = 1; i < daysLength; i++) {
      daysArray.push({ label: `${i}`, value: i });
    }

    const currentDays = daysArray.length;

    if (currentDays % 7 !== 0) {
      const freeSpace = currentDays + 7 - ((currentDays + 7) % 7);

      for (let i = currentDays; i < freeSpace; i++) {
        daysArray.push({ label: '', value: -1, disabled: true });
      }
    }

    return (
      <>
        {this.renderDaysHeader()}
        {this.renderCalendarTable(daysArray, defaultWeekDays.length)}
      </>
    );
  }

  private renderMonthsView() {
    const { months } = this.props;
    const m = months || defaultMonths;
    const monthsArray = m.map((month, i) => ({ value: i, label: month }));
    return this.renderCalendarTable(monthsArray, 4);
  }

  private renderYearsView() {
    const { date } = this.state;
    const decadeStart = getDecade(date, -1);
    const yearsArray: Array<TableCell> = [];

    for (let i = decadeStart; i < decadeStart + decadesCount; i++) {
      yearsArray.push({ label: `${i}`, value: i, disabled: i === decadeStart || i === decadeStart + decadesCount - 1 });
    }

    return this.renderCalendarTable(yearsArray, 4);
  }

  private renderView() {
    const { view } = this.state;

    switch (view) {
      case 'days':
        return this.renderDaysView();
      case 'months':
        return this.renderMonthsView();
      case 'years':
        return this.renderYearsView();
    }

    return false;
  }

  private changeDate = (e: TextFieldChangeEvent) => {
    const date = stringToDate(e.value);
    this.changeValue(e.value, date || this.state.date);
  };

  render() {
    const {
      name: _0,
      value: _1,
      defaultValue: _2,
      onChange: _3,
      open: _4,
      onOpenChange: _5,
      months,
      weekDays,
      ...props
    } = this.props;
    const { open, value } = this.state;
    const img = <Icon name="DateRange" color={tuna} size="22px" />;

    return (
      <DateFieldContainer>
        <TextField
          value={value}
          onChange={this.changeDate}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          icon={img}
          {...props}
        />
        {open && (
          <CalendarView tabIndex={0} onFocus={this.handleFocus} onBlur={this.handleBlur}>
            {this.renderHeader()}
            {this.renderView()}
          </CalendarView>
        )}
      </DateFieldContainer>
    );
  }
}

export const DateField = withFormContext(DateFieldInt);
DateField.displayName = 'DateField';
