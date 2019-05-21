**Elementary**

Simple example of using the radio button group to group radio buttons. Third radio button is disabled.

```jsx
const { RadioButtonGroup, RadioButton } = require('precise-ui');

<RadioButtonGroup>
  <RadioButton>First</RadioButton>
  <RadioButton>Second</RadioButton>
  <RadioButton disabled>Third</RadioButton>
</RadioButtonGroup>
```

The style of the radio buttons can be varied. Here we use some wrapping to prevent an overflow. Bravo radio button is selected by default.

```jsx
const { RadioButtonGroup, RadioButton } = require('precise-ui');
const style = { padding: '5px', margin: '5px' };

<RadioButtonGroup>
  <RadioButton style={style}>Alpha</RadioButton>
  <RadioButton defaultSelected style={style}>Bravo</RadioButton>
  <RadioButton style={style}>Charlie</RadioButton>
</RadioButtonGroup>
```

**Layouts**

To make more complex layout it is possible to use any kind of components inside of the `RadioButtonGroup`. In this example we use `StackPanel` to create top down (vertical) layout for radio buttons. Option 3 radio button selected is set explicitly which switch radio button to controlled mode. It also means that it will not take part radio button group selection.

```jsx
const { RadioButtonGroup, RadioButton, StackPanel, StackItem } = require('precise-ui');

<RadioButtonGroup>
  <StackPanel direction="top">
    <StackItem>
      <RadioButton>Option 1</RadioButton>
    </StackItem>
    <StackItem>
      <RadioButton>Option 2</RadioButton>
    </StackItem>
    <StackItem>
      <RadioButton selected>Option 3</RadioButton>
    </StackItem>
  </StackPanel>
</RadioButtonGroup>
```

The following example uses responsive wrapped layout for radio buttons and a checkbox.

```jsx
const { RadioButtonGroup, RadioButton, StackPanel, StackItem, Checkbox } = require('precise-ui');

<RadioButtonGroup>
  <StackPanel wrap>
    <StackItem width="440px">
      <RadioButton>These</RadioButton>
    </StackItem>
    <StackItem width="300px">
      <RadioButton>are</RadioButton>
    </StackItem>
    <StackItem width="300px">
      <Checkbox>flexibly</Checkbox>
    </StackItem>
    <StackItem width="40%">
      <RadioButton>stacked!</RadioButton>
    </StackItem>
  </StackPanel>
</RadioButtonGroup>
```

**Form**

The `RadioButtonGroup` can also be used to just determine the state of which radio button should be active. Note, this only works if we named the radio buttons.

```jsx
const { RadioButtonGroup, RadioButton } = require('precise-ui');

<RadioButtonGroup defaultValue="second">
  <RadioButton name="first">First</RadioButton>
  <RadioButton name="second">Second</RadioButton>
  <RadioButton name="third">Third</RadioButton>
</RadioButtonGroup>
```

Finally, we can also use the controlled state of the radio button. In this form we only need a single point to control all radio buttons.

```jsx
const { RadioButtonGroup, RadioButton } = require('precise-ui');

<RadioButtonGroup value="second" onChange={e => console.log(e)}>
  <RadioButton name="first">First</RadioButton>
  <RadioButton name="second">Second</RadioButton>
  <RadioButton name="third">Third</RadioButton>
</RadioButtonGroup>
```


**Multiple Checkbox selection**

The `RadioButtonGroup` is supporting multiple selection, but only with `Checkboxes` as child elements.

```jsx
const { RadioButtonGroup, Checkbox } = require('precise-ui');

<RadioButtonGroup multiple defaultValue={['first', 'second']}  onChange={e => console.log(e)}>
  <Checkbox name="first">First</Checkbox>
  <Checkbox name="second">Second</Checkbox>
  <Checkbox name="third">Third</Checkbox>
</RadioButtonGroup>
```

Multiselection works inside `Form` as well, the same way as any other form element.

```jsx
const { RadioButtonGroup, Checkbox, Form } = require('precise-ui');

<Form defaultValue={{ roles: ['second'] }} onChange={e => console.log(e)}>
  <RadioButtonGroup name="roles" multiple>
    <Checkbox name="first">First</Checkbox>
    <Checkbox name="second">Second</Checkbox>
    <Checkbox name="third">Third</Checkbox>
  </RadioButtonGroup>
</Form>
```