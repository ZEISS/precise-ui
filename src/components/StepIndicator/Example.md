**Elementary**

The `StepIndicator` is a simple component to create a simple step indicator for multi-step forms or processes.

Simply put down some steps in the `steps` prop to tell the component what steps to render.

```jsx
const { StepIndicator } = require('precise-ui');

<StepIndicator steps={['1. First', '2. Second']} />
```

**Current Step**

The currently active step can be set using the `current` prop. Furthermore, if we do not only want headers but also content we can use children with the `StepIndicatorStep` component instead.

```jsx
const { StepIndicator, StepIndicatorStep } = require('precise-ui');

<StepIndicator current={1}>
  <StepIndicatorStep header="1. First" />
  <StepIndicatorStep header="2. Second">
    Second step content.
  </StepIndicatorStep>
  <StepIndicatorStep header="Third">
    Third step content.
  </StepIndicatorStep>
  <StepIndicatorStep header="Fourth" />
  <StepIndicatorStep header="Fifth" />
</StepIndicator>
```

**Vertical Mode**

We can change to the vertical mode explicitly as well.

```jsx
const { StepIndicator, StepIndicatorStep } = require('precise-ui');

<StepIndicator mode="vertical" current={1}>
  <StepIndicatorStep header="1. First" />
  <StepIndicatorStep header="2. Second">
    Second step content.
  </StepIndicatorStep>
  <StepIndicatorStep header="3. Third">
    Third step content.
  </StepIndicatorStep>
</StepIndicator>
```

**Numbered Bullets**

We can also set `numbered` to a step indicator to make our steps numbered.

```jsx
const { StepIndicator, StepIndicatorStep } = require('precise-ui');

<StepIndicator mode="vertical" numbered current={1}>
  <StepIndicatorStep header="First">
    Content of the first step.<br/>
    Another row.
  </StepIndicatorStep>
  <StepIndicatorStep header="Second">
    Current step content.
  </StepIndicatorStep>
  <StepIndicatorStep header="Third" />
</StepIndicator>
```
