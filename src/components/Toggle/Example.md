**Elementary**

Standard usage of a `Toggle` component.

```jsx
import { Toggle } from 'precise-ui';

<Toggle />
```

The `Toggle` could be disabled as well.

```jsx
import { Toggle } from 'precise-ui';

<Toggle disabled defaultValue={true} label="Toggle Label">On</Toggle>
```

**Controlled Mode**

The component supports two modes - managed and controlled. By default, the managed mode is selected. When we supply a `value` initially we create the component in controlled mode.

```jsx
import { Toggle } from 'precise-ui';

class MyToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
    this.change = (e) => this.setState({
      checked: e.value,
    });
  }

  render() {
    const { checked } = this.state;
    return (
      <Toggle value={checked} label="Toggle Label" onChange={this.change}>
        {checked ? 'On' : 'Off'}
      </Toggle>
    );
  }
}

<MyToggle />
```

Like with all other input components it is possible to annotate the visual realization with an error message.

```jsx
import { Toggle } from 'precise-ui';

<Toggle label="Agree to the terms & conditions" error="You need to agree">Agree</Toggle>
```
