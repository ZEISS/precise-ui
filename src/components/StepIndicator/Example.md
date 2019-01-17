The `StepIndicator` is a simple component to create a simple step indicator for multi-step forms or processes.

Simply put down some steps in the `steps` prop to tell the component what steps to render.

```jsx
const { StepIndicator } = require('precise-ui');

<StepIndicator steps={["1. First", "2. Second"]} current={0} />
```

The currently active step can be set using the `current` prop.

```jsx
const { StepIndicator } = require('precise-ui');

<StepIndicator steps={["1. First", "2. Second", "Third", "Fourth", "Fifth"]} current={1} />
```

We can change to vertical mode as well

```jsx
const { StepIndicator, StepIndicatorStep } = require('precise-ui');

<StepIndicator mode='vertical' current={1}>
  <StepIndicatorStep header="1. First">
  </StepIndicatorStep>
  <StepIndicatorStep header="2. Second">
  </StepIndicatorStep>
  <StepIndicatorStep header="3. Third">
  </StepIndicatorStep>
</StepIndicator>
```

We can also add `numbered` to a vertical step indicator to make our steps numbered

```jsx
const { StepIndicator, StepIndicatorStep } = require('precise-ui');

<StepIndicator mode='vertical' numbered current={1}>
  <StepIndicatorStep header="First">
  </StepIndicatorStep>
  <StepIndicatorStep header="Second">
  </StepIndicatorStep>
  <StepIndicatorStep header="Third">
  </StepIndicatorStep>
</StepIndicator>
```
