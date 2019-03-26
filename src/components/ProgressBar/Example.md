**Elementary**

Simple 50% progress bar.

```jsx
const { ProgressBar } = require('precise-ui');

<ProgressBar value={50} />
```

**Animations**

Enabling the animation effect to have smoother transitions when changing the value.

```js { "props": { "data-skip": true } }
const { ProgressBar } = require('precise-ui');
const stops = [0, 10, 30, 30, 30, 30, 60, 60, 70, 70, 70, 90, 90, 91, 95, 99, 100];

class AnimationProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    this.tid = setInterval(() => {
      var index = (this.state.index + 1) % stops.length;
      this.setState({
        index,
      });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.tid);
  }

  render() {
    const index = this.state.index;
    const value = stops[index];
    return <ProgressBar value={value} animate />;
  }
}

<AnimationProgressBar />
```

**Decoration Options**

Optionally, a title and a description may be applied.

```jsx
const { ProgressBar } = require('precise-ui');

<ProgressBar value={75} title="Updating" description="Please wait while we prepare your system. It will be worth the wait!" />
```

We can insert some stop points to indicate important milestones in the progress.

```jsx
const { ProgressBar } = require('precise-ui');

<ProgressBar value={30} stops={[25, 50, 75]} />
```

ProgressBar component also provides an alternative for the infinite spinning bar.

```jsx
const { ProgressBar } = require('precise-ui');

<ProgressBar animate="spinning" type="secondary" />
```
