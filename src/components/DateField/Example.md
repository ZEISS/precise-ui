**Elementary**

The `DateField` component provides an easy way for selecting a date. As all inputs it can be used in a controlled and managed mode. 

`DateField` is based on [ReactJS Datepicker](https://reactdatepicker.com/). Please refer to ReactJS Datepicker Docs for the detailed props description.

```jsx
const { DateField } = require('precise-ui');

<DateField onChange={(e) => console.log(e)} />
```

`DateField` with `autoComplete`

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField onChange={(e) => console.log(e)} autoComplete />
```

`DateField` with custom date format

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField onChange={(e) => console.log(e)} dateFormat="yyyy/mm/dd" />
```

Select time

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="MMMM d, yyyy h:mm aa" onChange={(e) => console.log(e)}/>
```

Select time only

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  showTimeSelect
  showTimeSelectOnly
  timeIntervals={15}
  dateFormat="h:mm aa"
  timeCaption="Time"
  onChange={(e) => console.log(e)}
/>
```

Exclude Times

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');
const { setHours, setMinutes } = require('date-fns');

<DateField
  showTimeSelect
  excludeTimes={[setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]}
  dateFormat="MMMM d, yyyy h:mm aa"
  onChange={(e) => console.log(e)}
/>
```

Include Times

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');
const { setHours, setMinutes } = require('date-fns');

<DateField
  showTimeSelect
  includeTimes={[setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]}
  dateFormat="MMMM d, yyyy h:mm aa"
  onChange={(e) => console.log(e)}
/>
```

Inject Specific Times

```jsx { "props": { "data-skip": true } }
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
  onChange={(e) => console.log(e)}
/>
```

Specific Time Range

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');
const { setHours, setMinutes } = require('date-fns');

<DateField
  showTimeSelect
  minTime={setHours(setMinutes(new Date(), 0), 17)}
  maxTime={setHours(setMinutes(new Date(), 30), 20)}
  dateFormat="MMMM d, yyyy"
  onChange={(e) => console.log(e)}
/>
```

Max date

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');
const { addDays } = require('date-fns');

<DateField
  maxDate={addDays(new Date(), 5)}
  placeholder="Select a date before 5 days in the future"
  onChange={(e) => console.log(e)}
/>
```

Excluded dates

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');
const { subDays } = require('date-fns');

<DateField
  excludeDates={[new Date(), subDays(new Date(), 1)]}
  placeholder="Select a date other than today or yesterday" 
  onChange={(e) => console.log(e)} />
```

Highlighted dates

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');
const { subDays, addDays } = require('date-fns');

<DateField
  highlightDates={[subDays(new Date(), 7), addDays(new Date(), 7)]}
  placeholder="This highlights a week ago and a week from today" 
  onChange={(e) => console.log(e)} />
```

Included dates

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');
const { addDays } = require('date-fns');

<DateField
  includeDates={[new Date(), addDays(new Date(), 1)]}
  placeholder="This only includes today and tomorrow" 
  onChange={(e) => console.log(e)} />
```

Date Range
```jsx { "props": { "data-skip": true } }
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

Disabled datepicker

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  disabled={true}
  placeholderText="This is disabled" />
```

Disabled keyboard navigation

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  disabledKeyboardNavigation
  placeholderText="This has disabled keyboard navigation" 
  onChange={(e) => console.log(e)} />
```

Configured Popper Properties

```jsx { "props": { "data-skip": true } }
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
  onChange={(e) => console.log(e)}
/>
```

Opened to date
```jsx { "props": { "data-skip": true } }
<DateField
  openToDate={new Date("1993/09/28")}
  onChange={(e) => console.log(e)}
/>
```

Display Week Numbers
```jsx { "props": { "data-skip": true } }
<DateField
  showWeekNumbers
  onChange={(e) => console.log(e)}
/>
```

Custom input
```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  customInput={<input />}
  onChange={(e) => console.log(e)}
/>
```

Get raw input value on change
```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  onChangeRaw={(e) => console.log(event.target.value)}
/>
```

Don't hide calendar on date selection

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  shouldCloseOnSelect={false}
  onChange={(e) => console.log(e)}
/>
```

With custom header
```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  renderCustomHeader={()=>'Custom header'}
  onChange={(e) => console.log(e)}
/>
```

Month Picker
```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  dateFormat="MM/yyyy"
  showMonthYearPicker
  onChange={(e) => console.log(e)}
/>
```

Range Month Picker
```jsx { "props": { "data-skip": true } }
const { DateField, StackPanel, StackItem } = require('precise-ui');

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

In `open` controlled mode
```jsx { "props": { "data-skip": true } }
const { DateField, StackPanel, StackItem, Button } = require('precise-ui');

const Example = () => {
  const [ open, setOpen ] = React.useState(false);

  return (
    <div>
      <DateField open={open} onOpenChange={(open) => console.log(open)}/>
      <Button onClick={() => setOpen(!open)}>{ open ? 'Hide' : 'Show' }</Button>
    </div>
  )
}

<Example />
```

In `value` controlled mode
```jsx { "props": { "data-skip": true } }
const { DateField, StackPanel, StackItem, Button } = require('precise-ui');

const Example = () => {
  const [ value, setValue ] = React.useState('14-06-1988');

  return (
    <div>
      <DateField value={value} onChange={({ value }) => setValue(value)}/>
    </div>
  )
}

<Example />
```

With `onOpenChange` callback
```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  onOpenChange={(e)=> console.log(e)}
  onChange={(e) => console.log(e)}
/>
```

With custom week days and month names
```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  weekDays={['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']}
  months={[
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь'
  ]}
/>
```

Inline version
```jsx
const { DateField } = require('precise-ui');

<DateField
  inline
  onChange={(e) => console.log(e)}
/>
```

Inline version time
```jsx
const { DateField } = require('precise-ui');

<DateField inline showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="MMMM d, yyyy h:mm aa" onChange={(e) => console.log(e)}/>
```

Inline version select time only

```jsx
const { DateField } = require('precise-ui');

<DateField
  inline
  showTimeSelect
  showTimeSelectOnly
  timeIntervals={15}
  dateFormat="h:mm aa"
  timeCaption="Time"
  onChange={(e) => console.log(e)}
/>
```

Inline version month

```jsx
const { DateField } = require('precise-ui');

<DateField
  inline
  dateFormat="MM/yyyy"
  showMonthYearPicker
  onChange={(e) => console.log(e)}
/>
```