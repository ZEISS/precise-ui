Using a regular dropdown with some options.

```jsx
const { Dropdown } = require('precise-ui');
const items = [
  "Value 1",
  "Value 2",
  "Value 3",
  "Value 4",
  "Value 5",
  "Value 6",
  "Value 7",
  "Value 8",
  "Value 9",
  "Foo",
];

<Dropdown data={items} defaultValue="Value 1" label="Select item"/>
```

The given items can also be more than just values. We can provide complex objects that contain further information such as an optional item type (e.g., `divider`, `header`) or some fixed content.

```jsx
const { Dropdown, Icon } = require('precise-ui');
const items = [
  { key: "group1", content: 'Group 1', type: 'header' },
  { key: "Value1", content: <div><b>Value <i>one</i></b></div>, searchText: 'Value one' },
  { key: "Value2", content: "Value 2" },
  { key: 'sep', type: 'divider' },
  { key: "group2", content: 'Group Two', type: 'header' },
  { key: "Value3", content: <div><Icon name="Warning" /> Apples</div>, searchText: 'Apple' },
];

<Dropdown data={items} defaultValue="Value1" />
```

Likewise, we can have a multi-select dropdown. The placeholder can be used to display a message shown when no value is currently selected.

```jsx
const { Dropdown } = require('precise-ui');
const items = [
  "Value 1",
  "Value 2",
  "Value 3",
  "Value 4",
  "Value 5",
  "Value 6",
  "Value 7",
  "Value 8",
  "Value 9",
];

<Dropdown data={items} multiple label="With Label" placeholder="You need to select a value" />
```

Errors can also be shown, like for other input components.

```jsx
const { Dropdown } = require('precise-ui');
const items = [
  "Apple",
  "Orange",
  "Banana",
];

<Dropdown data={items} label="With Label" error="Only fruits here" />
```

The `Dropdown` can also be used in a controlled way.

```jsx
const { Dropdown } = require('precise-ui');
const items = [
  "Apple",
  "Orange",
  "Banana",
];

class MyDropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.change = (e) => {
      const selected = e.value[0];
      const index = items.indexOf(selected);
      const value = items[(index + 1) % items.length];
      this.setState({
        value,
      });
    };
  }

  render() {
    return <Dropdown data={items} value={this.state.value} onChange={this.change} />;
  }
}

<MyDropdown />
```
