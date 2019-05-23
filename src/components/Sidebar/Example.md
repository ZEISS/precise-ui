Sidebar component shows a sidebar floating from the edge of the screen after clicked on `activator` element. Sidebar can be closed by clicked on close button or background and by pressing Esc.

Basic usage.
```jsx
const { Sidebar } = require('precise-ui');

<Sidebar activator={<Button>Show sidebar</Button>}><PaddedContainer gutter="medium">Some content</PaddedContainer></Sidebar>
```


Sidebar element on left side of the screen.
```jsx
const { Sidebar } = require('precise-ui');

<Sidebar position="left" activator={<Button>Show sidebar on left</Button>}><PaddedContainer gutter="medium">Some content</PaddedContainer></Sidebar>
```

Sidebar element on bottom of the screen.
```jsx
const { Sidebar } = require('precise-ui');

<Sidebar position="bottom" activator={<Button>Show sidebar on bottom</Button>}><PaddedContainer gutter="medium">Some content</PaddedContainer></Sidebar>
```

Sidebar element on top of the screen.
```jsx
const { Sidebar } = require('precise-ui');

<Sidebar position="top" activator={<Button>Show sidebar on top</Button>}><PaddedContainer gutter="medium">Some content</PaddedContainer></Sidebar>
```

Sidebar with different activator element and custom size.
```jsx
const { Sidebar } = require('precise-ui');

<Sidebar size="50%" activator={<ActionLink>Show</ActionLink>}><PaddedContainer gutter="medium">Some content</PaddedContainer></Sidebar>
```

Sidebar in Controlled mode.
```jsx
const { Sidebar } = require('precise-ui');

class SidebarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <Sidebar
        open={this.state.open}
        onClose={() => this.setState({ open: false })}
        activator={<Button onClick={() => this.setState({ open: true })}>Show sidebar</Button>}>
        <PaddedContainer gutter="medium">Some content</PaddedContainer>
      </Sidebar>
    );
  }
}

<SidebarContainer />
```