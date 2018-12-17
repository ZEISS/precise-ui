The `StepIndicator` is a simple component to create a simple step indicator for multi-step forms or processes.

Simply put down some steps in the `steps` prop to tell the component what steps to render.

```jsx
const { StepIndicator } = require('precise-ui');

<StepIndicator steps={["1. First", "2. Second"]} />
```

The currently active step can be set using the `current` prop.

```jsx
const { StepIndicator } = require('precise-ui');

<StepIndicator steps={["1. First", "2. Second", "Third", "Fourth", "Fifth"]} current={1} />
```
