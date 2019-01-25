**Elementary**

The `SelectButton` provides a simple way to have a simple combination representing the intersection between `Button` and `Dropdown`.

```jsx
const { SelectButton } = require('precise-ui');

<SelectButton data={['First', 'Second', 'Third']} onChange={e => alert(e.value)} />
```

**Item Rendering**

Like other `data` displaying components this one allows us to specify how an item should be rendered. We only need to supply a list consisting of a `key` and `content` prop. The `key` must be unique, the `content` determines the item to display.

```jsx
const { styled, SelectButton } = require('precise-ui');

const Item = styled.div`
  padding: 0.5em;
`;

<SelectButton
  data={[
    {
      key: '0',
      content: <Item><b>Hi</b></Item>,
    },
    {
      key: '1',
      content: <Item><i>Ho</i></Item>,
    },
    {
      key: '2',
      content: <Item><span style={{ color: 'red' }}>Hello</span></Item>,
    },
  ]}
  defaultValue="Select one" />
```

Note: In `onChange` events (or the `value` / `defaultValue` prop only the `key` is relevant).
