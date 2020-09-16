import * as React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import enGB from 'date-fns/esm/locale/en-GB';
import { Locale } from 'date-fns';
import { PaddedContainer } from '../PaddedContainer';
import { Icon } from '../Icon';
import styled, { themed } from '../../utils/styled';
import { distance, distancePx } from '../../distance';
import { getFontStyle, getFontWeight } from '../../textStyles';
import { IncreaseDecrease } from '../IncreaseDecrease';
import { greenNeon } from '../../colors';

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

const itemSize = '40px';

const ReactDatePickerContainer = styled.div(
  themed(
    ({ theme: { ui0, ui1, ui3, ui4 } }) => `
    .react-datepicker {
      background-color: ${ui1};
      border: 1px solid ${ui4};
      display: inline-block;
      position: relative;
    }

    .react-datepicker--time-only {
      .react-datepicker__time-container {
        border-left: 0;
      }

      .react-datepicker__time {
        border-radius: 0.3rem;
      }

      .react-datepicker__time-box {
        border-radius: 0.3rem;
      }
    }

    .react-datepicker__triangle {
      display: none;
    }

    .react-datepicker-popper {
      z-index: 9999;
    }

    .react-datepicker__header {
      text-align: center;
      position: relative;

      &--time {
        padding-top: 20px;
        padding-bottom: 10px;
        padding-left: 5px;
        padding-right: 5px;
      }
    }

    .react-datepicker__current-month,
    .react-datepicker-time__header,
    .react-datepicker-year-header {
      margin-top: 0;
      ${getFontWeight('bold')}
    }

    .react-datepicker-year-header {
      line-height: ${itemSize};
    }

    .react-datepicker-time__header {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .react-datepicker__month-container {
      float: left;
      padding: 0 ${distance.medium};
    }

    .react-datepicker__time-container {
      float: right;
      border-left: 1px solid ${ui4};
      width: 90px;

      .react-datepicker__time {
        position: relative;
        background: ${ui1};

        .react-datepicker__time-box {
          width: 100%;
          overflow-x: hidden;
          margin: 0;
          text-align: center;
          ul.react-datepicker__time-list {
            list-style: none;
            margin: 0;
            height: calc(195px + (#{${itemSize}} / 2));
            overflow-y: scroll;
            padding-right: 0px;
            padding-left: 0px;
            width: 100%;
            box-sizing: content-box;

            li.react-datepicker__time-list-item {
              height: ${itemSize};
              line-height: ${itemSize};
              &:hover {
                cursor: pointer;
                background-color: ${ui4};
              }
              &--selected {
                background-color: ${ui0};
                color: white;
                font-weight: bold;
                &:hover {
                  background-color: ${ui0};
                }
              }
              &--disabled {
                color: ${ui4};
                background: repeating-linear-gradient(-45deg, ${ui3} 2px, ${ui1} 2px, ${ui1} 4px, ${ui3} 4px, ${ui3} 6px);
                background-size: 41px 41px;

                &:hover {
                  cursor: default;
                  background-color: transparent;
                }
              }
            }
          }
        }
      }
    }

    .react-datepicker__week-number {
      color: ${ui4};
      display: inline-block;
      width: ${itemSize};
      line-height: ${itemSize};
      text-align: center;
      margin: 0;
      &.react-datepicker__week-number--clickable {
        cursor: pointer;
        &:hover {
          background-color: ${ui4};
        }
      }
    }

    .react-datepicker__day-names,
    .react-datepicker__week {
      white-space: nowrap;
      margin-bottom: ${distancePx.large / 2}px;
    }

    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
      display: inline-block;
      width: ${itemSize};
      line-height: ${itemSize};
      text-align: center;
      margin: 0;
    }

    .react-datepicker__day,
    .react-datepicker__month-text {
      cursor: pointer;
      text-align: center;

      &:hover {
        background-color: ${ui4};
      }

      &:focus {
        border: 1px solid ${ui0};
        outline: none;
      }

      &--today {
        color: ${ui0};
      }

      &--highlighted {
        border-radius: 0;
        background-color: ${greenNeon};

        &:hover {
          background-color: darken(${greenNeon}, 5%);
        }

        &-custom-1 {
          color: magenta;
        }

        &-custom-2 {
          color: green;
        }
      }

      &--selected {
        background-color: ${ui0};
        color: ${ui1};

        &:hover {
          background-color: darken(${ui0}, 5%);
        }
      }

      &--in-selecting-range,
      &--in-range {
        background-color: ${ui3};
      }

      &--range-start,
      &--range-end,
      &--selecting-range-start {
        color: ${ui1};
        background-color: ${ui0};
      }

      &--disabled {
        cursor: default;
        color: ${ui4};
        background: repeating-linear-gradient(-45deg, ${ui3} 2px, ${ui1} 2px, ${ui1} 4px, ${ui3} 4px, ${ui3} 6px);

        &:hover {
          background-color: transparent;
        }
      }
    }

    .react-datepicker__month-text {
      &.react-datepicker__month--selected {
        background-color: ${ui0};
        color: ${ui1};
      }
      &:hover {
        background-color: ${ui4};
      }
    }

    .react-datepicker__input-container {
      position: relative;
    }

    .react-datepicker__day-name {
      text-transform: uppercase;
      line-height: 1;
    }

    .react-datepicker__day--outside-month {
      color: ${ui4};
    }

    .react-datepicker__day--keyboard-selected {
      border: 1px solid ${ui0};
      box-sizing: border-box;
      width: ${itemSize};
      height: ${itemSize};
    }
  `,
  ),
);

const getHeaderRender = ({
  months = defaultMonths,
}: {
  months: CustomReactDatepickerProps['months'];
}): ReactDatePickerProps['renderCustomHeader'] => ({ date, increaseMonth, decreaseMonth, changeYear }) => {
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
  <ReactDatePickerContainer>
    <ReactDatePicker
      locale={patchLocale(enGB, weekDays, months)}
      renderCustomHeader={getHeaderRender({ months })}
      showMonthYearPicker={showMonthYearPicker}
      {...props}
    />
  </ReactDatePickerContainer>
);
