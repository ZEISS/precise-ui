import * as React from 'react';
import { ReactDatePickerProps } from 'react-datepicker';
import { TextInputProps, Omit, InputChangeEvent } from '../../common';
import { FormContextProps, withFormContext } from '../../hoc';
import { CustomReactDatepicker } from './CustomReactDatepicker.part';
import { DatePickerTextField } from './DateFieldTextField.part';
import { parseDate, safeDateFormat, getIsoDateFormat } from '../../utils';

export { ReactDatePickerProps };

export interface DateFieldOpenChangedEvent {
  /**
   * If the calendar flyout is supposed to be open or closed.
   */
  open: boolean;
}

const reactDatepickerProps = {
  adjustDateOnChange: 1,
  allowSameDay: 1,
  autoComplete: 1,
  autoFocus: 1,
  calendarClassName: 1,
  calendarContainer: 1,
  children: 1,
  className: 1,
  clearButtonTitle: 1,
  customInput: 1,
  customInputRef: 1,
  dateFormat: 1,
  dateFormatCalendar: 1,
  dayClassName: 1,
  disabled: 1,
  disabledKeyboardNavigation: 1,
  dropdownMode: 1,
  endDate: 1,
  excludeDates: 1,
  excludeTimes: 1,
  filterDate: 1,
  fixedHeight: 1,
  forceShowMonthNavigation: 1,
  formatWeekDay: 1,
  formatWeekNumber: 1,
  highlightDates: 1,
  id: 1,
  includeDates: 1,
  includeTimes: 1,
  injectTimes: 1,
  inline: 1,
  isClearable: 1,
  locale: 1,
  maxDate: 1,
  maxTime: 1,
  minDate: 1,
  minTime: 1,
  monthsShown: 1,
  name: 1,
  nextMonthButtonLabel: 1,
  onBlur: 1,
  onChange: 1,
  onChangeRaw: 1,
  onClickOutside: 1,
  onFocus: 1,
  onInputClick: 1,
  onInputError: 1,
  onKeyDown: 1,
  onMonthChange: 1,
  onSelect: 1,
  onWeekSelect: 1,
  onYearChange: 1,
  open: 1,
  openToDate: 1,
  peekNextMonth: 1,
  placeholderText: 1,
  popperClassName: 1,
  popperContainer: 1,
  popperModifiers: 1,
  popperPlacement: 1,
  popperProps: 1,
  preventOpenOnFocus: 1,
  previousMonthButtonLabel: 1,
  readOnly: 1,
  renderCustomHeader: 1,
  renderDayContents: 1,
  required: 1,
  scrollableMonthYearDropdown: 1,
  scrollableYearDropdown: 1,
  selected: 1,
  selectsEnd: 1,
  selectsStart: 1,
  shouldCloseOnSelect: 1,
  showDisabledMonthNavigation: 1,
  showMonthDropdown: 1,
  showMonthYearDropdown: 1,
  showMonthYearPicker: 1,
  showTimeSelect: 1,
  showTimeSelectOnly: 1,
  showWeekNumbers: 1,
  showYearDropdown: 1,
  startDate: 1,
  startOpen: 1,
  strictParsing: 1,
  tabIndex: 1,
  timeCaption: 1,
  timeFormat: 1,
  timeIntervals: 1,
  title: 1,
  todayButton: 1,
  useShortMonthInDropdown: 1,
  useWeekdaysShort: 1,
  value: 1,
  weekLabel: 1,
  withPortal: 1,
  yearDropdownItemNumber: 1,
  timeInputLabel: 1,
  inlineFocusSelectedMonth: 1,
  onDayMouseEnter: 1,
  onMonthMouseLeave: 1,
};

const excludedReactDatePickerProps = {
  autoComplete: 1,
  onBlur: 1,
  onChange: 1,
  onFocus: 1,
  children: 1,
  todayButton: 1,
  placeholderText: 1,
  isClearable: 1,
  withPortal: 1,
  showYearDropdown: 1,
  showMonthDropdown: 1,
  useShortMonthInDropdown: 1,
  showMonthYearDropdown: 1,
  dropdownMode: 1,
  monthsShown: 1,
  showTimeInput: 1,
  showMonthYearPicker: 1,
};

export interface DatePickerOnChangeEvent extends InputChangeEvent<string> {
  date?: Date;
}

export interface DateFieldBasicProps extends FormContextProps, TextInputProps {
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
   * Event emitted once the value changes due to user input.
   */
  onChange?(e: DatePickerOnChangeEvent): void;
  /**
   * @ignore
   */
  children?: void;
}

export type DateFieldProps = DateFieldBasicProps &
  Omit<ReactDatePickerProps, keyof typeof excludedReactDatePickerProps>;

interface DateFieldState {
  value: string;
  date?: Date;
  error?: React.ReactChild;
}

const DefaultDateFormat = getIsoDateFormat();

class DateFieldInt extends React.Component<DateFieldProps, DateFieldState> {
  private readonly valueControlled: boolean;

  constructor(props: DateFieldProps) {
    super(props);
    const value = props.value || props.defaultValue || '';
    const date = value ? this.parseDate(value) : new Date();

    this.valueControlled = props.value !== undefined;

    this.state = {
      error: props.error,
      date,
      value,
    };
  }

  componentWillReceiveProps({ value = '', error }: DateFieldProps) {
    if (this.valueControlled) {
      this.setState({ value, date: this.parseDate(value) });
    }

    this.setState({ error });
  }

  componentDidMount() {
    const { form } = this.props;

    if (!this.valueControlled && form) {
      form.subscribe(this);
    }
  }

  componentWillUnmount() {
    const { form } = this.props;

    if (!this.valueControlled && form) {
      form.unsubscribe(this);
    }
  }

  private onOpenChange(open: boolean) {
    const { onOpenChange } = this.props;

    if (typeof onOpenChange === 'function') {
      onOpenChange({
        open,
      });
    }
  }

  private changeValue: ReactDatePickerProps['onChange'] = inputDate => {
    const { dateFormat = DefaultDateFormat, locale } = this.props;
    const date = inputDate || undefined;
    const value = safeDateFormat(date, {
      dateFormat,
      locale,
    });

    this.change(date, value);
  };

  private changeInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const { onChangeRaw } = this.props;
    const { value } = e.target;
    this.change(this.parseDate(value), value);

    if (typeof onChangeRaw === 'function') {
      onChangeRaw(e);
    }
  };

  private parseDate = (value: string) => {
    const { locale, dateFormat = DefaultDateFormat, strictParsing } = this.props;
    return parseDate(value, dateFormat, locale, strictParsing) || undefined;
  };

  private change = (date: Date | undefined, value: string) => {
    const { onChange, name = '', form } = this.props;

    if (!this.valueControlled) {
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

        this.onOpenChange(true);
      }
    }

    if (typeof onChange === 'function') {
      onChange({
        value,
        date,
      });
    }
  };

  private onClickOutside: DateFieldProps['onClickOutside'] = event => {
    const { onClickOutside } = this.props;
    this.onOpenChange(false);
    if (typeof onClickOutside === 'function') {
      onClickOutside(event);
    }
  };

  private onFocus: DateFieldProps['onFocus'] = () => {
    const { onFocus } = this.props;
    this.onOpenChange(true);
    if (typeof onFocus === 'function') {
      onFocus();
    }
  };

  private onBlur: DateFieldProps['onBlur'] = () => {
    const { onBlur } = this.props;
    this.onOpenChange(false);
    if (typeof onBlur === 'function') {
      onBlur();
    }
  };

  render() {
    const {
      autoComplete,
      months,
      weekDays,
      open,
      placeholder,
      name: _0,
      value: _1,
      defaultValue: _2,
      onChange: _3,
      onOpenChange: _4,
      onClickOutside: _5,
      onFocus: _6,
      onBlur: _7,
      ...rest
    } = this.props;

    const datePickerProps = {} as ReactDatePickerProps;
    const customInputProps = {} as Omit<DateFieldBasicProps, 'onChange' | 'children'>;
    Object.keys(rest).forEach(propName => {
      if (excludedReactDatePickerProps[propName]) {
        return;
      }

      if (reactDatepickerProps[propName]) {
        datePickerProps[propName] = rest[propName];
      } else {
        customInputProps[propName] = rest[propName];
      }
    });

    const { value, error, date } = this.state;

    return (
      <CustomReactDatepicker
        customInput={<DatePickerTextField {...customInputProps} error={error} autoComplete={autoComplete} />}
        placeholderText={placeholder}
        customInputRef="inputRef"
        months={months}
        weekDays={weekDays}
        value={value}
        selected={date}
        {...datePickerProps}
        open={open}
        onChange={this.changeValue}
        onChangeRaw={this.changeInput}
        onClickOutside={this.onClickOutside}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  }
}

export const DateField = withFormContext(DateFieldInt);
DateField.displayName = 'DateField';
