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

<DateField onChange={(e) => console.log(e)} autoComplete placeholder="With autocomplete" />
```

`DateField` with custom date format

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField onChange={(e) => console.log(e)} dateFormat="yyyy/mm/dd" placeholder="With custom date format" />
```

Select time

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField 
  showTimeSelect 
  timeFormat="HH:mm" 
  timeIntervals={15} 
  dateFormat="MMMM d, yyyy h:mm aa" 
  onChange={(e) => console.log(e)}
  placeholder="Select time" />
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
  placeholder="Only select time"
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
  placeholder="With excluded times"
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
  placeholder="With included times"
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
  placeholder="With specific times"
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
  placeholder="With specified time range"
/>
```

Excluded dates

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');
const { subDays } = require('date-fns');

<DateField
  excludeDates={[new Date(), subDays(new Date(), 1)]}
  placeholder="Select a date other than today or yesterday" 
  onChange={(e) => console.log(e)} 
  placeholder="Exluded times" />
```

Max date

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');
const { addDays } = require('date-fns');

<DateField
  maxDate={addDays(new Date(), 5)}
  placeholder="Select a date before 5 days in the future"
  onChange={(e) => console.log(e)}
  placeholder="Max date"
/>
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
          placeholder="Select start date"
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
          placeholder="Select end date"
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
  placeholder="This is disabled" />
```

Disabled keyboard navigation

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  disabledKeyboardNavigation
  placeholder="This has disabled keyboard navigation" 
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
  placeholder="With changed popup position"
/>
```

Opened to date
```jsx { "props": { "data-skip": true } }
<DateField
  openToDate={new Date("1993/09/28")}
  onChange={(e) => console.log(e)}
  placeholder={`Will be opened to "1993/09/28"`}
/>
```

Display Week Numbers
```jsx { "props": { "data-skip": true } }
<DateField
  showWeekNumbers
  onChange={(e) => console.log(e)}
  placeholder="Shows week numbers"
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
  placeholder="Fires event on input field change"
/>
```

Don't hide calendar on date selection

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  shouldCloseOnSelect={false}
  onChange={(e) => console.log(e)}
  placeholder="Doesn't hide calendar on date select"
/>
```

With custom header
```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

<DateField
  renderCustomHeader={()=>'Custom header'}
  onChange={(e) => console.log(e)}
  placeholder="With custom header"
/>
```

In `open` controlled mode
```jsx { "props": { "data-skip": true } }
const { DateField, StackPanel, StackItem, Button } = require('precise-ui');

const Example = () => {
  const [ open, setOpen ] = React.useState(false);

  return (
    <div>
      <DateField open={open} onOpenChange={(open) => console.log(open)} placeholder="Click show button"/>
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
  const [ value, setValue ] = React.useState(new Date().toISOString().slice(0, 10));

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
  placeholder="Fires event when calendar view open/closed"
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
  placeholder="With custom week days and month names"
/>
```

With error handling

```jsx { "props": { "data-skip": true } }
const { DateField } = require('precise-ui');

const Example = () => {
  const [ error, setError ] = React.useState();

  const validate = (value) => setError(value.match(/^\d{2}-\d{2}-\d{4}$/) ? undefined : 'Invalid date format')

  return (
    <DateField 
      onChangeRaw={(e) => validate(e.target.value)} 
      onChange={({value}) => validate(value)}
      error={error} 
      placeholder="Type aaaa"
    />
  )
}

<Example />
```

Inline version
```jsx
const { DateField } = require('precise-ui');

<DateField
  selected={new Date("1988/06/14")}
  inline
  onChange={(e) => console.log(e)}
/>
```

Inline version time
```jsx
const { DateField } = require('precise-ui');

<DateField 
  selected={new Date("1988/06/14")}
  inline 
  showTimeSelect 
  timeFormat="HH:mm" 
  timeIntervals={15} 
  dateFormat="MMMM d, yyyy h:mm aa" 
  onChange={(e) => console.log(e)} />
```

Inline version select time only

```jsx
const { DateField } = require('precise-ui');

<DateField
  selected={new Date("1988/06/14")}
  inline
  showTimeSelect
  showTimeSelectOnly
  timeIntervals={15}
  dateFormat="h:mm aa"
  timeCaption="Time"
  onChange={(e) => console.log(e)}
/>
```

Version using withValidation HOC

```jsx

const { DateField, withValidation } = require('precise-ui');
const MyDateField = withValidation(({ value }) => {
  return (new Date(value) < new Date()  && "You need the date to be later than today")
})(DateField);

<MyDateField
  onChange={(e) => console.log(e)}
  placeholder="Shows an error when a date before than today is selected"
/>

```