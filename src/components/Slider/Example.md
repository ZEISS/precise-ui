**Elementary**

The `SliderChangeEvent` contains properties such as `current`, `selected`, `index` (the 0-based slider knob that was modified), and `type`. The latter is available to distinguish between `single` (1-knob) and `multi` (*n*-knobs).

Standard usage of a slider component.

```jsx
const { Slider } = require('precise-ui');

<Slider />
```

The Slider can have a tooltip showing the value.

```jsx
const { Slider } = require('precise-ui');

<Slider defaultValue={[5]} minimum={0} maximum={10} showTooltip />
```

The Slider could be disabled as well using the `disabled` prop. This is the same as on on every input field.

```jsx
const { Slider } = require('precise-ui');

<Slider disabled defaultValue={[5]} minimum={0} maximum={10} />
```

**Controlled Mode**

The slider supports two modes: controlled and managed. Setting the `value` will trigger the controlled mode.

```jsx
const { Slider } = require('precise-ui');

class MySlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.change = (e) => this.setState({
      value: e.value,
    });
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <Slider value={value} onChange={this.change} minimum={0} maximum={100} />
        <span>{~~value}</span>
      </div>
    );
  }
}

<MySlider />
```

**Multiple Values**

The slider also supports multiple values. Just use an array as (initial) input. By default, the differnt values are not allowed to cross each other. A margin can be used to determine the spacing.

**Boundaries**

```jsx
const { Slider } = require('precise-ui');

<Slider defaultValue={[0, 5, 10]} minimum={0} maximum={10} margin={1} />
```

An optional stepping can be used to make the slider snap to certain fix points. This also has an impact on the reported value.

```jsx
const { Slider } = require('precise-ui');

<Slider defaultValue={[1, 9]} minimum={0} maximum={10} margin={1} step={0.5} />
```

**Vertical Mode**

The slider could also be shown with vertical orientation. Note the height of the slider depends on the outer container - like the width of the horizontal slider.

```jsx
const { Slider } = require('precise-ui');

<div style={{ height: '200px' }}>
  <Slider defaultValue={[0.3, 0.6]} margin={0.1} orientation="vertical" showTooltip />
</div>
```
