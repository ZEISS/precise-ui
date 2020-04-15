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

Managed `Form` with default value and reset button

```jsx
const { Form, Button, TextField, DropdownField } = require('precise-ui');

const filterDefinitions = {
  timeRanges: {
    label: 'Time Range',
    name: 'timeRanges',
    data: [
      { content: 'Last 7 days', key: '7' },
      { content: 'Last 30 days', key: '30' },
      { content: 'Last 60 days', key: '60' },
      { content: 'Last 90 days', key: '90' },
      { content: 'Last year', key: '365' },
    ],
  },
  types: {
    label: 'Types',
    name: 'types',
    multiple: true,
    data: [
      { content: 'Statement', key: 'Statement' },
      { content: 'Invoice', key: 'Invoice' },
      { content: 'Credit', key: 'Credit' },
    ],
  },
  statuses: {
    label: 'Status',
    name: 'statuses',
    data: [
      { content: 'Open', key: 'Open' },
      { content: 'Paid', key: 'Paid' },
    ],
  }
};

<Form defaultValue={{first: 'My Firstname', statuses: [1], types: [1, 2] }} onSubmit={e => alert(JSON.stringify(e.data))} onReset={e => { console.info(e, 'reset'); }} onChange={e => { console.info(e, 'CHANGE'); }}>
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
    Filters:
  </div>
  <div>
    <DropdownField {...filterDefinitions.timeRanges} />
    <hr/>
  </div>
  <div>
    <DropdownField {...filterDefinitions.statuses} />
    <hr/>
  </div>
  <div>
    <DropdownField {...filterDefinitions.types} />
  </div>
  <div>
    <Button>Submit</Button>
    <Button type="reset" buttonStyle="secondary">Reset</Button>
  </div>
</Form>
```
