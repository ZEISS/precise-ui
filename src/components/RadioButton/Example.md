**Elementary**

By default, the radio button is displayed without any label. Radio button could be selected, but can't be deselected, opposite to checkbox.

```jsx
import { RadioButton } from 'precise-ui';

<RadioButton />
```

**Controlled Mode**

Labels are just described by the radio button's children. Setting the `value` prop (either to true or false) will switch to controlled mode.

```jsx
import { RadioButton } from 'precise-ui';

<RadioButton value>Controlled radio button</RadioButton>
```

The radio button also works With long labels. Here, we wrap naturally and align to start of the label.

```jsx
import { RadioButton } from 'precise-ui';

<RadioButton>This is a really long text. This is a really long text. This is a really long text. This is a really long text. This is a really long text. This is a really long text. This is a really long text.</RadioButton>
```

To supply a default value without switching into controlled mode `defaultValue` property is used. The radio button will scale with the used font size.

```jsx
import { RadioButton } from 'precise-ui';

<RadioButton defaultValue style={{ fontSize: '2em' }}>Scaled radio button</RadioButton>
```

**Decoration Options**

It is possible to use any kind of component inside of the radio button to create complex labels.

```jsx
import { RadioButton } from 'precise-ui';

<RadioButton>
  <b style={{color: 'deepskyblue'}}>
    Label with nested component
  </b>
</RadioButton>
```

The `disabled` prop is used to disable radio button for further interaction.

```jsx
import { RadioButton } from 'precise-ui';

<RadioButton disabled>Disabled</RadioButton>
```

Component suppors error message annotation.

```jsx
import { RadioButton } from 'precise-ui';

<RadioButton error="You need to check this one">Required input (not controlled)</RadioButton>
```
