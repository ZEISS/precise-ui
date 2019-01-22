**Elementary**

The interactive surface is sensitive to both, touch and mouse events. It reports the x and y coordinates on clicks / drags.

```jsx
const { InteractiveSurface } = require('precise-ui');

class DisplayLastValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
    this.valueChanged = (e) => this.setState({
      x: e.x,
      y: e.y,
    });
  }

  render() {
    return (
      <InteractiveSurface onChange={this.valueChanged} {...this.props}>
        <div>x: {this.state.x}</div>
        <div>y: {this.state.y}</div>
      </InteractiveSurface>
    );
  }
}

<DisplayLastValue style={{ background: '#ddd', height: '200px', width: '200px', padding: '10px' }} />
```
