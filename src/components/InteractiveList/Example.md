**Elementary**

Most basic usage of Interactive list requires to specify data and whether the list is open or closed. The list is placed in absolutely positioned wrapper.

```jsx
const { InteractiveList } = require('precise-ui');

<InteractiveList data={['Item 1', 'Item 2', 'Item 3', 'Item 4 has very long text inside. It will break in two lines. Item 4 has very long text inside. It will break in two lines. Item 4 has very long text inside. It will break in two lines.']} />
```

You can show a tick for the selected item by using the `showTick` options.

```jsx
const { InteractiveList } = require('precise-ui');

<InteractiveList data={['Item 1', 'Item 2']} showTick />
```

Condensed list with smaller spacings

```jsx
const { InteractiveList } = require('precise-ui');

<InteractiveList data={['Item 1', 'Item 2', 'Item 3', 'Item 4 has very long text inside. It will break in two lines. Item 4 has very long text inside. It will break in two lines. Item 4 has very long text inside. It will break in two lines.']} condensed />
```

It's possible to select multiple elements, by adding checkboxes

```jsx
const { InteractiveList } = require('precise-ui');

<InteractiveList data={['Item 1', 'Item 2', 'Item 3', 'Item 4 has very long text inside. It will break in two lines. Item 4 has very long text inside. It will break in two lines. Item 4 has very long text inside. It will break in two lines.']} multiple />
```

You can add dividers
```jsx
const { InteractiveList } = require('precise-ui');

const data = ['1', '2',
{
  key: '1',
  type: 'divider',
}, {
  key: '2',
  content: 'Test Header',
}];
<InteractiveList data={data} />
```

**Custom Wrapper**

It's also possible to override the default wrapper by providing custom wrapper, where one could possibly build custom styled wrapper for the list.

```jsx

const { InteractiveList } = require('precise-ui');

const CustomWrapper = function (props) {
  const { children, ...rest } = props;
  const style = {
    WebkitBoxShadow: '0px 2px 5px 0px rgba(0,0,0,0.75)',
    MozBoxShadow: '0px 2px 5px 0px rgba(0,0,0,0.75)',
    boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.75)',
  }
  return <div {...rest} style={style}>{children}</div>;
};

<InteractiveList data={['Value 1', 'Value 2', 'Value 3']} open customWrapper={CustomWrapper} />
```

**Controlled Mode**

Here is an example of using a controlling version of the interactive list together with another component.

```jsx
const { InteractiveList, Button } = require('precise-ui');

const items = [
  "Anim qui laborum officia laborum occaecat eu deserunt et.",
  "Value 2",
  "Value 3",
  "Value 4",
  "Value 5",
  "Value 6",
  "Value 7",
  "Value 8",
  "Value 9",
  "Value 10",
  "Value 11",
  "Value 12",
];

const ListContainerStyle = {
  position: 'absolute',
  width: '250px',
  maxHeight: '300px',
  zIndex: '100',
}

const CustomWrapper = ({ children, ...rest }) => {
  const style = {
    background: '#fff',
    WebkitBoxShadow: '0px 2px 5px 0px rgba(0,0,0,0.75)',
    MozBoxShadow: '0px 2px 5px 0px rgba(0,0,0,0.75)',
    boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.75)',
  }
  return <div {...rest} style={style}>{children}</div>;
};

class CustomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleMouseDown(e) {
    const { open } = this.state;
    this.setState({open: !open});
    e.preventDefault();
  }

  handleBlur() {
    this.setState({open: false});
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button onMouseDown={this.handleMouseDown.bind(this)}>{ open ? 'Close' : 'Open' }</Button>
        <div style={ListContainerStyle}>
          <InteractiveList data={items} open={open} onBlur={this.handleBlur.bind(this)} customWrapper={CustomWrapper}/>
        </div>
      </div>
    );
  }
}

<CustomComponent />
```

**Content Presentation**

Using links in the interactive list is possible (e.g., for building up menus).

```jsx
const { InteractiveList } = require('precise-ui');
const data = [
  {
    key: 'firstLink',
    content: <a href="#">First Link</a>,
  },
  {
    key: 'secondLink',
    content: <div><a href="#">Second Link</a></div>,
  },
];

<InteractiveList data={data}  />
```
