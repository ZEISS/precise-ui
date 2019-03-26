**Elementary**

The `DateField` component provides an easy way for selecting a date. As all inputs it can be used in a controlled and managed mode.

```jsx
const { DateField } = require('precise-ui');

<DateField onChange={(e) => console.log(e)} />
```

**Customization**

Abbreviations may be given to support localization and customization.

```jsx
const { DateField } = require('precise-ui');

<DateField
  defaultValue="2018-01-08"
  onChange={(e) => console.log(e)}
  months={['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']}
  weekDays={['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']}  />
```

**Controlled Mode**

The calendar open state can be controlled by using the `open` prop.

```jsx
const { DateField, Button } = require('precise-ui');

class ToggleCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
    };
    this.click = () => {
      this.setState({
          open: !this.state.open,
      });
    };
  }

  render() {
    return (
      <>
        <Button onClick={this.click}>toggle</Button>
        <DateField open={this.state.open} />
      </>
    );
  }
}

<ToggleCalendar />
```

This way we could, e.g., reverse the logic.

```jsx
const { DateField } = require('precise-ui');

class MyDateField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      active: false,
    };
    this.change = ({ open }) => {
      this.setState({
        open: !open,
      });
    };
    this.activate = () => {
      this.setState({
        active: true,
      });
    };
  }

  render() {
    return (
      <div>
        <Button onClick={this.activate}>Activate</Button>
        <DateField open={this.state.active && this.state.open} onOpenChange={this.change} />
      </div>
    );
  }
}

<MyDateField />
```

**Remark** As this example can be quite obtrusive you will need to press the activate button first.
