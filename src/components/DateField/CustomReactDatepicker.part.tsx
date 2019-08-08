import * as React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import './stylesheets/datepicker.scss';
import * as enGB from 'date-fns/locale/en-GB';
import { Locale } from 'date-fns';
import { PaddedContainer } from '../PaddedContainer';
import { Icon } from '../Icon';
import styled from '../../utils/styled';
import { distance } from '../../distance';
import { getFontStyle, getFontWeight } from '../../textStyles';
import { IncreaseDecrease } from '../IncreaseDecrease';

const defaultWeekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const defaultMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function patchLocale(locale: Locale, inputWeekDays = defaultWeekDays, months = defaultMonths): Locale {
  // in react-datepicker week starts from Sunday, not from Monday
  const weekDays = [...inputWeekDays.slice(-1), ...inputWeekDays.slice(0, -1)];

  return {
    ...locale,
    localize: {
      ...locale.localize,
      month: (month: number) => months[month],
      day: (day: number) => weekDays[day],
    },
    match: {
      ...locale.match,
      month: (month: string) => months.indexOf(month),
      day: (day: string) => weekDays.indexOf(day),
    },
  };
}

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

const Row = styled.div`
  margin-bottom: ${distance.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const HeaderDateContainer = styled.div`
  ${getFontWeight('medium')}
`;

const StyledIncreaseDecrease = styled(IncreaseDecrease)`
  margin-left: ${distance.xsmall};
`;

const getHeaderRender = ({ months = defaultMonths }: { months: CustomReactDatepickerProps['months'] }) => {
  const CalendarHeader: ReactDatePickerProps['renderCustomHeader'] = ({
    date,
    increaseMonth,
    decreaseMonth,
    changeYear,
  }) => {
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    return (
      <PaddedContainer gutter="medium">
        <Row>
          <Arrow onClick={decreaseMonth} type="button">
            <Icon name="KeyboardArrowLeft" size={2} />
          </Arrow>
          <HeaderDateContainer>
            {monthName} {year}
            <StyledIncreaseDecrease onIncrease={() => changeYear(year + 1)} onDecrease={() => changeYear(year - 1)} />
          </HeaderDateContainer>
          <Arrow onClick={increaseMonth} type="button">
            <Icon name="KeyboardArrowRight" size={2} />
          </Arrow>
        </Row>
      </PaddedContainer>
    );
  };

  return CalendarHeader;
};

export interface CustomReactDatepickerProps extends ReactDatePickerProps {
  months?: Array<string>;
  weekDays?: Array<string>;
}

export const CustomReactDatepicker: React.FC<CustomReactDatepickerProps> = ({
  months,
  weekDays,
  showMonthYearPicker,
  ...props
}) => (
  <ReactDatePicker
    locale={patchLocale(enGB, weekDays, months)}
    renderCustomHeader={showMonthYearPicker ? undefined : getHeaderRender({ months })}
    showMonthYearPicker={showMonthYearPicker}
    {...props}
  />
);
