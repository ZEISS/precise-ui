**Elementary**

Using the Color Picker directly without any options.

```jsx
const { ColorPicker } = require('precise-ui');

<ColorPicker />
```

**Decoration Options**

Setting the initial color of the picker. Also hiding the wheel bar.

```jsx
const { ColorPicker } = require('precise-ui');

<ColorPicker defaultValue={{ r: 133, g: 183, b: 221 }} hideBar />
```

Allowing also to set the transparency. Furthermore, we can set a new height (and width). By default the full width of the container is being used with the height set to 200px.

```jsx
const { ColorPicker } = require('precise-ui');

<ColorPicker defaultValue="#FFFF00" height="300px" allowOpacity />
```

**Controlled Mode**

Controlling the picked color of the component. In this example we put a constraint on the opacity of the color, which has to be between 30 and 80 percent.

```jsx
const { ColorPicker } = require('precise-ui');

class MyColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'rgba(255, 28, 100, 0.5)',
    };
    this.changeColor = (e) => {
      const color = e.value;

      if (color.a < 0.8 && color.a > 0.3) {
        this.setState({
          color,
        });
      }
    };
  }

  render() {
    return <ColorPicker value={this.state.color} allowOpacity onChange={this.changeColor} />;
  }
}

<MyColorPicker />
```

**Combined Usage**

Using the contained color information to display some useful information about the selected value.

```jsx
const { ColorPicker } = require('precise-ui');

class SuperColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: {
        r: 255,
        g: 28,
        b: 104,
        a: 1,
        h: 0.9444444444444444,
        s: 0.88,
        v: 1,
      },
    };
    this.changeColor = (e) => {
      const color = e.value;

      this.setState({
        color,
      });
    };
  }

  render() {
    const { color } = this.state;

    return (
      <div>
        <ColorPicker value={color} onChange={this.changeColor} />
        <table style={{ padding: '10px', width: '100%' }}>
          <tbody>
            <tr>
              <td width="50">HEX</td>
              <td align="right">#{`${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(16)}`}</td>
            </tr>
            <tr>
              <td>RGB</td>
              <td align="right">rgb({`${color.r}, ${color.g}, ${color.b}`})</td>
            </tr>
            <tr>
              <td>HSV</td>
              <td align="right">hsv({`${~~(color.h * 360)}°, ${~~(color.s * 100)}%, ${~~(color.v * 100)}%`})</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

<SuperColorPicker />
```
