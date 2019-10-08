**Elementary**

Using a regular dropdown with some options.

```jsx
const { DropdownField } = require('precise-ui');
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

<DropdownField data={items} defaultValue="Value 1" label="Select item"/>
```

**Positioning**

By default the list is positioned automatically based on the screen size (whether towards the top or bottom, depending on available space on the screen). There is an option to override this behavior by `direction` prop (`0` - bottom, `1` - top).

```jsx
const { DropdownField } = require('precise-ui');

<DropdownField data={['first', 'second']} direction={0} label="Select item"/>
```

**Decoration Options**

The given items can also be more than just values. We can provide complex objects that contain further information such as an optional item type (e.g., `divider`, `header`) or some fixed content.

```jsx
const { DropdownField, Icon } = require('precise-ui');
const items = [
  { key: "group1", content: 'Group 1', type: 'header' },
  { key: "Value1", content: <div><b>Value <i>one</i></b></div>, searchText: 'Value one' },
  { key: "Value2", content: "Value 2" },
  { key: 'sep', type: 'divider' },
  { key: "group2", content: 'Group Two', type: 'header' },
  { key: "Value3", content: <div><Icon name="Warning" /> Apples</div>, searchText: 'Apple' },
];

<DropdownField data={items} defaultValue="Value1" />
```

Errors can also be shown, like for other input components.

```jsx
const { DropdownField } = require('precise-ui');
const items = [
  "Apple",
  "Orange",
  "Banana",
];

<DropdownField data={items} label="With Label" error="Only fruits here" />
```

**Multi Select**

Likewise, we can have a multi-select dropdown. The placeholder can be used to display a message shown when no value is currently selected.

```jsx
const { DropdownField } = require('precise-ui');
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

<DropdownField data={items} multiple label="With Label" placeholder="You need to select a value" />
```

**Controlled Mode**

The `Dropdown` can also be used in a controlled way.

```jsx
const { DropdownField } = require('precise-ui');
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
    return <DropdownField data={items} value={this.state.value} onChange={this.change} />;
  }
}

<MyDropdown />
```

**Disable specific options**

To disable specific options pass an array of strings (matching the strings if plain strings are used or the `key` 
field if objects are used as `data`). This prevents those options from being selected by the user.

Example with single selection:

```jsx
const { DropdownField } = require('precise-ui');

const items = [
  {
    key: "1",
    content: "Option 1"
  },
  {
    key: "2",
    content: "Option 2"
  },
  {
    key: "3",
    content: "Option 3"
  },
  {
    key: "4",
    content: "Option 4"
  },
  {
    key: "5",
    content: "Option 5"
  },
]

const disabledItems = [
  "1",
  "3"
];

<DropdownField data={items} disabledItems={disabledItems} />
```

Example with multiple selection:

```jsx
const { DropdownField } = require('precise-ui');

const items = [
  {
    key: "1",
    content: "Option 1"
  },
  {
    key: "2",
    content: "Option 2"
  },
  {
    key: "3",
    content: "Option 3"
  },
  {
    key: "4",
    content: "Option 4"
  },
  {
    key: "5",
    content: "Option 5"
  },
]

const disabledItems = [
  "1",
  "3"
];

<DropdownField data={items} disabledItems={disabledItems} multiple/>
```
