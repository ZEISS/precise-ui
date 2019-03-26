**Elementary**

The `InputInfo` is implicitly used in many components. By setting the `info` prop on any input component the given input is always displayed unless an error is also shown. Observe, the behavior on the next example (try entering / deleting some content):

```jsx
const { TextField, withValidation } = require('precise-ui');

const RequiredTextField = withValidation(({ value }) => !value && 'Input is required')(TextField);

<RequiredTextField info="Required Input" />
```
