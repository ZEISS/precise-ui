**Elementary**

By default, the checkbox is displayed without any label.

```jsx
const { Checkbox } = require('precise-ui');

<Checkbox />
```

Checkbox with some arbitrary prop, e.g., `data-eid`, provided.

```jsx
const { Checkbox } = require('precise-ui');

<>
  <Checkbox data-eid="checkbox" />
</>
```

Inline List of checkboxes

```jsx
const { Checkbox } = require('precise-ui');

const itemStyle = {
  verticalAlign: 'middle',
  margin: '0 5px'
};

<>
  <Checkbox style={itemStyle}>First Item</Checkbox>
  <Checkbox style={itemStyle}>Second Item</Checkbox>
  <Checkbox style={itemStyle}>Third Item</Checkbox>
</>
```

**Controlled Mode**

Labels are just described by the checkbox's children. Setting the `value` prop (either to true or false) will switch to controlled mode.

```jsx
const { Checkbox } = require('precise-ui');

<Checkbox value>Controlled checkbox</Checkbox>
```

**Managed Mode**

If we want to supply a default value without switching into controlled mode we use the `defaultValue` prop. The checkbox will scale with the used font size.

```jsx
const { Checkbox } = require('precise-ui');

<Checkbox defaultValue style={{ fontSize: '2em' }}>Scaled checkbox</Checkbox>
```

**Decoration Options**

With very long labels the component just wraps as expected.

```jsx
const { Checkbox } = require('precise-ui');

<Checkbox>This is a really long text. This is a really long text. This is a really long text. This is a really long text. This is a really long text. This is a really long text. This is a really long text.</Checkbox>
```

We are not constraint by simple text for the label's content. Any component will be accepted.

```jsx
const { Checkbox } = require('precise-ui');

<Checkbox>
  <b>
    Label with nested component
  </b>
</Checkbox>
```

The `disabled` prop allows to disable the checkbox for further interaction.

```jsx
const { Checkbox } = require('precise-ui');

<>
  <Checkbox disabled>Disabled</Checkbox>
  <Checkbox value disabled>Selected Disabled</Checkbox>
</>
```

Finally, it is possible to annotate the component with an error message.

```jsx
const { Checkbox } = require('precise-ui');

<Checkbox error="You need to check this one">Required input (not controlled)</Checkbox>
```
