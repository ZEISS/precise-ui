**Full Window Size**

Creates a popup with a full window size. This is ideal on mobile or to completely hide what's underneath.

```jsx
const { WindowPopup, Button } = require('precise-ui');

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ opened: true })}>Show window</Button>
        {this.state.opened && (
          <WindowPopup onClick={() => this.setState({ opened: false })} label="Some label">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </WindowPopup>
        )}
      </div>
    );
  }
}

<Component />
```
