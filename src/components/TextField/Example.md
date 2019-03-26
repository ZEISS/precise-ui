**Elementary**

Various versions of the text field. By default, we get a plain text field that is managed and enabled. No placeholder is shown. The width of the text field is the width of the parent container.

```jsx
const { TextField } = require('precise-ui');

<TextField />
```

**Decoration**

The `label` prop is used to determine what text should be shown as a label.

```jsx
const { TextField } = require('precise-ui');

<TextField label="Label" />
```

The `placeholder` prop is used to determine what text should be shown as a placeholder (for the empty text field).

```jsx
const { TextField } = require('precise-ui');

<TextField label="With label" placeholder="With placeholder" />
```

The `disabled` prop is indicating that the value cannot be edited, because the control is disabled. There is no `readonly` prop, as such a prop is given indirectly via not updating the `value` prop in controlled mode.

```jsx
const { TextField } = require('precise-ui');

<TextField disabled placeholder="disabled"/>
```

The `clearable` prop is showing a little icon to reset the `TextField` as soon as the user enters data.

```jsx
const { TextField } = require('precise-ui');

<TextField clearable placeholder="Enter something ..."/>
```

**Controlled Mode**

The controlled mode is triggered via the `value` prop.

```jsx
const { TextField } = require('precise-ui');

<TextField value="With value" placeholder="With value"/>
```

You can also add a callback to the clear button by using the `onClear` prop.

```jsx
const { TextField } = require('precise-ui');

<TextField value="With value" placeholder="With value" clearable onClear={() => alert('Clear Pressed')}/>
```

This enables us to also fully utilize a controlled mode. Note, that not only the `onClear` is fired when clearing, but also the `onChange` as we want to change to a new value.

```jsx
const { TextField } = require('precise-ui');

class ControlledClearableTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
    };
    this.changed = ({ value }) => {
      this.setState({
          value,
      });
    };
  }

  render() {
      return <TextField clearable value={this.state.value} onChange={this.changed} placeholder="Enter something ..."/>;
}
}

<ControlledClearableTextField />
```

Likewise, we can stay in managed mode by using the `defaultValue` instead.

```jsx
const { TextField } = require('precise-ui');

<TextField defaultValue="With value" placeholder="With default value"/>
```

**Decoration Options**

The text field can be decorated with several options, e.g., adding a `prefix` or `suffix`.

```jsx
const { TextField, Icon } = require('precise-ui');

<div>
  <TextField label="Full Name" prefix={<Icon name="Person" width="100%" height="100%" />} />
  <br />
  <TextField label="E-mail" suffix="@mail.com" />
  <br />
  <TextField label="Website" prefix="https://" suffix=".com" />
</div>
```

We can also indicate errors by placing some text on the `error` prop.

```jsx
const { TextField } = require('precise-ui');

class MyInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.changeValue = (e) => {
      this.setState({
        value: e.value,
      });
    };
  }

  render() {
    const { value } = this.state;
    const error = value === 'email' ? '' : 'Value must be "email"';
    return <TextField label="Email" defaultValue="emai" error={error} value={value} onChange={this.changeValue} />;
  }
}

<MyInputForm />
```

**Multiline Input**

Finally, multi-line input is also supported. Once we go into multi-line mode the `prefix` and `suffix` props are no longer supported. By default, the multi-line input is not resizable. This can be changed, however, with the `resizable` prop.

```jsx
const { TextField } = require('precise-ui');

<TextField multiline resizable />
```

You can also add the `label` prop to multiline textfields

```jsx
const { TextField } = require('precise-ui');

<TextField multiline resizable label="Test label" />
```

You can also add the `label` prop in addition to the placeholder

```jsx
const { TextField } = require('precise-ui');

<TextField multiline resizable label="Test label" placeholder="Test placeholder" />
```

The resizable can also be restricted to vertical and horizontal.

```jsx
const { TextField } = require('precise-ui');

<TextField multiline resizable="vertical" />
```

The `multiline` prop can be specified as a number, indicating the number of rows initially shown.

```jsx
const { TextField } = require('precise-ui');

<TextField multiline={4} value="My text here" disabled />
```

Last, but not least we can use the `resizable` prop with the `auto` value to automatically adjust the height of the input.

```jsx
const { TextField } = require('precise-ui');

<TextField multiline resizable="auto" defaultValue="My text here" />
```
