**Elementary**

The `DateField` component provides an easy way for selecting a date. As all inputs it can be used in a controlled and managed mode.

```jsx
const { DateField } = require('precise-ui');

<DateField onChange={(e) => console.log(e)} />
```

`DateField` with `autoComplete`

```jsx
const { DateField } = require('precise-ui');

<DateField onChange={(e) => console.log(e)} autoComplete />
```

`DateField` with custom date format

```jsx
const { DateField } = require('precise-ui');

<DateField onChange={(e) => console.log(e)} dateFormat="yyyy/mm/dd" />
```

Select time

```jsx
const { DateField } = require('precise-ui');

<DateField showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="MMMM d, yyyy h:mm aa" />
```

Select time only

```jsx
const { DateField } = require('precise-ui');

<DateField
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    dateFormat="h:mm aa"
    timeCaption="Time"
/>
```

Exclude Times

```jsx
const { DateField } = require('precise-ui');
const { setHours, setMinutes } = require('date-fns');

<DateField
  showTimeSelect
  excludeTimes={[setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]}
  dateFormat="MMMM d, yyyy h:mm aa"
/>
```

Include Times

```jsx
const { DateField } = require('precise-ui');
const { setHours, setMinutes } = require('date-fns');

<DateField
  showTimeSelect
  includeTimes={[setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]}
  dateFormat="MMMM d, yyyy h:mm aa"
/>
```

Inject Specific Times

```jsx
const { DateField } = require('precise-ui');
const { setHours, setMinutes } = require('date-fns');

<DateField
    showTimeSelect
    timeFormat="HH:mm"
    injectTimes={[
      setHours(setMinutes(new Date(), 1), 0),
      setHours(setMinutes(new Date(), 5), 12),
      setHours(setMinutes(new Date(), 59), 23)
    ]}
    dateFormat="MMMM d, yyyy h:mm aa"
/>
```

Specific Time Range

```jsx
const { DateField } = require('precise-ui');
const { setHours, setMinutes } = require('date-fns');

<DateField
  showTimeSelect
  minTime={setHours(setMinutes(new Date(), 0), 17)}
  maxTime={setHours(setMinutes(new Date(), 30), 20)}
  dateFormat="MMMM d, yyyy"
/>
```

Max date

```jsx
const { DateField } = require('precise-ui');
const { addDays } = require('date-fns');

<DateField
  maxDate={addDays(new Date(), 5)}
  placeholder="Select a date before 5 days in the future"
/>
```

Exclude dates

```jsx
const { DateField } = require('precise-ui');
const { subDays } = require('date-fns');

<DateField
  excludeDates={[new Date(), subDays(new Date(), 1)]}
  placeholder="Select a date other than today or yesterday" />
```

Highlight dates

```jsx
const { DateField } = require('precise-ui');
const { subDays, addDays } = require('date-fns');

<DateField
  highlightDates={[subDays(new Date(), 7), addDays(new Date(), 7)]}
  placeholder="This highlights a week ago and a week from today" />
```

Include dates

```jsx
const { DateField } = require('precise-ui');
const { addDays } = require('date-fns');

<DateField
  includeDates={[new Date(), addDays(new Date(), 1)]}
  placeholder="This only includes today and tomorrow" />
```

Date Range
```jsx
const { DateField } = require('precise-ui');
const { StackPanel, StackItem } = require('precise-ui');

const DateRange = () => {
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  return (
    <StackPanel>
      <StackItem>
        <DateField
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={({date}) => setStartDate(date)}
        />
      </StackItem>
      
      <StackItem>
        <DateField
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          onChange={({date}) => setEndDate(date)}
          minDate={startDate}
        />
      </StackItem>
    </StackPanel>
  )
}

<DateRange />

```

Disable datepicker

```js
const { DateField } = require('precise-ui');

<DateField
  disabled={true}
  placeholderText="This is disabled" />
```

Disable keyboard navigation

```js
const { DateField } = require('precise-ui');

<DateField
  disabledKeyboardNavigation
  placeholderText="This has disabled keyboard navigation" />
```

Configure Popper Properties

```js
const { DateField } = require('precise-ui');

<DateField
    popperClassName="some-custom-class"
    popperPlacement="top-end"
    popperModifiers={{
      offset: {
        enabled: true,
        offset: '5px, 10px'
      },
      preventOverflow: {
        enabled: true,
        escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
        boundariesElement: 'viewport'
      }
    }}
/>
```

Inline version
```js
const { DateField } = require('precise-ui');

<DateField
    inline
/>
```

Open to date
```js
<DateField
    openToDate={new Date("1993/09/28")}
/>
```

Display Week Numbers
```js
<DateField
    showWeekNumbers
/>
```

Custom input
```js
const { DateField } = require('precise-ui');

<DateField
  customInput={<input />}
/>
```

Get raw input value on change
```js
const { DateField } = require('precise-ui');

<DateField
  onChangeRaw={(e) => console.log(event.target.value)}
/>
```

Don't hide calendar on date selection

```js
const { DateField } = require('precise-ui');

<DateField
    shouldCloseOnSelect={false}
/>
```

Custom header
```js
const { DateField } = require('precise-ui');

<DateField
    renderCustomHeader={()=>'Custom header'}
/>
```

Month Picker
```js
const { DateField } = require('precise-ui');

<DateField
    dateFormat="MM/yyyy"
    showMonthYearPicker
/>
```

Range Month Picker
```jsx
const { DateField } = require('precise-ui');
const { StackPanel, StackItem } = require('precise-ui');

const DateRange = () => {
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  return (
    <StackPanel>
      <StackItem>
        <DateField
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={({date}) => setStartDate(date)}
          showMonthYearPicker
          dateFormat="MM/yyyy"
        />
      </StackItem>
      
      <StackItem>
        <DateField
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          onChange={({date}) => setEndDate(date)}
          minDate={startDate}
          showMonthYearPicker
          dateFormat="MM/yyyy"
        />
      </StackItem>
    </StackPanel>
  )
}

<DateRange />
```