**Elementary**

Using a dashboard with three tiles.

```jsx
const { Dashboard } = require('precise-ui');
const style = {
  height: '100%',
  width: '100%',
  background: '#ccc',
};
const tiles = [
  { id: '1' },
  { id: '2', colSpan: 2 },
  { id: '3', rowSpan: 2 },
  { id: '4', colSpan: 2, hidden: true },
];

<Dashboard defaultTiles={tiles} rowHeight={150}>
  <div style={style}>First</div>
  <div style={style}>Second</div>
  <div style={style}>Third</div>
  <div style={style}>Fourth</div>
</Dashboard>
```

**Decoration Options**

The dashboard can also be used in a more static way using the `disabled` prop.

```jsx
const { Dashboard } = require('precise-ui');
const style = {
  background: '#ccc',
  height: '100%',
};
const tiles = [
  { id: '1' },
  { id: '2', colSpan: 2, column: 2, row: 2 },
  { id: '3', rowSpan: 2, column: 4, row: 3 },
];

<Dashboard defaultTiles={tiles} disabled>
  <div style={style}>First</div>
  <div style={style}>Second</div>
  <div style={style}>Third</div>
</Dashboard>
```

What is missing so far is the ability to see upfront where the dragged tile is placed and what is the consequence for the layout. The `preview` prop does that.

```jsx
const { Dashboard } = require('precise-ui');
const style = {
  height: '100%',
  width: '100%',
  background: '#ccc',
};
const tiles = [
  { id: '1' },
  { id: '2', colSpan: 2 },
  { id: '3', rowSpan: 2 },
];

<Dashboard defaultTiles={tiles} columnCount={3} rowCount={3} rowHeight={150} preview>
  <div style={style}>First</div>
  <div style={style}>Second</div>
  <div style={style}>Third</div>
</Dashboard>
```

Showing the empty tiles is also possible. In this case we only need to use the `emptyTiles` prop.

```jsx
const { Dashboard } = require('precise-ui');
const style = {
  height: '100%',
  width: '100%',
  background: '#ccc',
};
const tiles = [
  { id: '1' },
  { id: '2', colSpan: 2 },
  { id: '3', rowSpan: 2 },
];

<Dashboard defaultTiles={tiles} rowHeight={150} emptyTiles preview>
  <div style={style}>First</div>
  <div style={style}>Second</div>
  <div style={style}>Third</div>
</Dashboard>
```

Example for 0 x 0 grid cell

```jsx
const { Dashboard, Button, colors } = require('precise-ui');
const styled = require('styled-components').default;

const style = {
  height: '100%',
  width: '100%',
  background: '#ccc',
};

const AbsoluteElement = styled.div`
  position: fixed;
  right: 0;
  top: 300px;
  background: red;
  color: white;
  padding: 5px;
`;

const tiles = [
  { id: '1' },
  { id: '2', colSpan: 2 },
  { id: '3', rowSpan: 2 },
  { id: '4', colSpan: 2, hidden: true },
  { id: '5', colSpan: 0, rowSpan: 0, },
  { id: '6', rowSpan: 2 },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  onToggleClick() {
    const { open } = this.state;
    this.setState({
      open: !open,
    })
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <Dashboard defaultTiles={tiles} rowHeight={150}>
          <div style={style}>First</div>
          <div style={style}>Second</div>
          <div style={style}>Third</div>
          <div style={style}>Fourth</div>
          <div style={style}>
            {open && <AbsoluteElement>here I am</AbsoluteElement>}
          </div>
          <div style={style}>sixth</div>
        </Dashboard>
        <Button onClick={() => this.onToggleClick()}>Toggle</Button>
      </>
    );
  }
}

<App />
```

**Drag and Drop**

The `Dashboard` tiles can also be dragged during operation without interferring with normal operations. Let's consider the following case where we want to display "Clicked" in the console only if we don't drag.

```jsx
const { Dashboard } = require('precise-ui');

const style = {
  height: '100%',
  width: '100%',
  background: '#ccc',
};

const tiles = [
  { id: '1' },
  { id: '2', colSpan: 2 },
  { id: '3', rowSpan: 2 },
  { id: '4', colSpan: 2 },
];

function clickHandler(e) {
  console.log('Clicked');
  e.preventDefault();
}

<Dashboard defaultTiles={tiles} rowHeight={40}>
  <div style={style}>First</div>
  <div style={style}>Second <a href="#" onClick={clickHandler}>Click me!</a></div>
  <div style={style}>Third</div>
  <div style={style}>Fourth</div>
</Dashboard>
```
