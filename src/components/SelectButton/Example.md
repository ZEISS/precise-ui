**Elementary**

The `SelectButton` provides a simple way to have a simple combination representing the intersection between `Button` and `Dropdown`.

```jsx
const { SelectButton } = require('precise-ui');

<SelectButton data={['First', 'Second', 'Third']} onChange={e => alert(e.value)} />
```
