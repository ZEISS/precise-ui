**Elementary**

The `Form` is a simple form container that gives us an easy abstraction over controlling single form fields.

```jsx
const { Form, Button, TextField } = require('precise-ui');

<Form onSubmit={e => alert(JSON.stringify(e.data))}>
  <div>
    First:
  </div>
  <div>
    <TextField name="first" />
  </div>
  <div>
    Last:
  </div>
  <div>
    <TextField name="last" />
  </div>
  <div>
    <Button>Submit</Button>
  </div>
</Form>
```

**Important**: Imagine how much boilerplate code the above component takes away, including correct handling of the enter key and other subtle things.

**Managed Mode**

Like the input fields the `form` can be also controlled and managed. The managed version already gives us an easy way to observe changes:

```jsx
const { Form, Button, DropdownField, TextField } = require('precise-ui');

<Form onSubmit={e => alert(JSON.stringify(e.data))} defaultValue={{ first: 'Your', last: 'Name' }} onChange={e => console.log(e)}>
  <div>
    First:
  </div>
  <div>
    <TextField name="first" />
  </div>
  <div>
    Last:
  </div>
  <div>
    <TextField name="last" />
  </div>
  <div>
    What do you like?
  </div>
  <div>
    <DropdownField name="taste" data={["apples", "oranges", "bananas"]} />
  </div>
  <div>
    <Button>Submit</Button>
  </div>
</Form>
```

**Controlled Mode**

In controlled mode we can also prevent certain changes etc.

```jsx
const { Form, Button, Checkbox, RadioButton, RadioButtonGroup, DropdownField, FileSelect, ColorPicker, Toggle, Slider } = require('precise-ui');

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false,
      data: {
        foo: false,
        bar: true,
        qux: 'first',
        test: [0],
        zoo: true,
        fs: [],
        val: 52,
      },
    };
    this.changeForm = (e) => {
      if (e.value.bar) {
        this.setState({
          changed: e.changed,
          data: e.value,
        });
      }
    };
  }

  render() {
    const { changed, data } = this.state;
    return (
      <Form value={data} onChange={this.changeForm}>
        <div>
          <Checkbox name="foo">Just foo</Checkbox>
        </div>
        <div>
          <Checkbox name="bar">Just bar (cannot be unchecked)</Checkbox>
        </div>
        <div>
          <RadioButtonGroup name="qux">
            <RadioButton name="first">First</RadioButton>
            <RadioButton name="second">Second</RadioButton>
            <RadioButton name="third">Third</RadioButton>
          </RadioButtonGroup>
        </div>
        <div>
          <DropdownField data={['one', 'two']} name="test" />
        </div>
        <div>
          <Toggle name="zoo">Another toggle</Toggle>
        </div>
        <div>
          <FileSelect name="fs">Add files</FileSelect>
        </div>
        <div>
          <ColorPicker name="color" defaultColor="red" />
        </div>
        <div>
          <Slider name="val" minimum={0} maximum={100} />
        </div>
        <div>
          <Button disabled={!changed}>Submit</Button>
        </div>
      </Form>
    );
  }
}

<MyForm />
```
The `Form` with validation rules

```jsx
const { Form, Button, TextField } = require('precise-ui');

<Form
  onSubmit={e => alert(JSON.stringify(e))}
  validationRules={{
    first: (value) => value && value.length > 10 ? 'Should be less than 10' : undefined,
    last: () => 'Always some error',
  }}>
  <div>
    First:
  </div>
  <div>
    <TextField name="first" />
  </div>
  <div>
    Last:
  </div>
  <div>
    <TextField name="last" />
  </div>
  <div>
    <Button>Submit</Button>
  </div>
</Form>
```

**Using Prompt with Form**

When form has changes, it is possible to make a prompt, if user wants to leave the page without submitting the form. `Form` component has built-in `Prompt` component.

Simple way to use it is to provide `prompt` prop. It will show browser's system dialog.

```jsx  { "props": { "data-skip": true } }
const { Form } = require('precise-ui');

<Form prompt="Form has unsaved changes, do you want to leave?">
{/* other components*/}
</Form>
```

It is also possible to provide `Prompt` component, that will show `precise-ui` component instead of system dialog.

```jsx  { "props": { "data-skip": true } }
const { Form, Prompt } = require('precise-ui');

<Form prompt={(changed: boolean) => {
  return (
    <Prompt message="Your form has unsaved messages, are you sure you want to leave the page" when={changed} modalOptions={{ title: 'Do you want to leave' }} />
  );
}>
{/* other components*/}
</Form>
```

For more details refer to `Prompt` component examples
