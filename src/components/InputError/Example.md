**withValidation Helper**

The `InputError` is implicitly used in many components. We can either explicitly make a validation and set the `error` prop on the respective input component, or use the `withValidation` higher-order component. This allows us to use the following shortcut:

```jsx
const { TextField, withValidation } = require('precise-ui');

const RequiredTextField = withValidation(({ value }) => !value && 'Input is required')(TextField);

<RequiredTextField />
```

Of course, validators may be chained. The following snippet displays an error for every state of the toggle. Note that initially the error is not shown (desired behavior).

```jsx
const { Toggle, withValidation } = require('precise-ui');

const MyToggle = withValidation(({ value }) => (!value && "You need to agree") || (value && "You agreed"))(Toggle);

<MyToggle>Agree</MyToggle>
```

All input components (e.g., the `Slider`) can be decorated with a validator.

```jsx
const { Slider, withValidation } = require('precise-ui');

const MySlider = withValidation(({ value }) => (value < 10 && "You need to have at least 10") || (value > 90 && "You need to have at most 90"))(Slider);

<MySlider minimum={0} maximum={100} defaultValue={50}>Agree</MySlider>
```

This way we can ensure that certain conditions are always met.

```jsx
const { DropdownField, withValidation } = require('precise-ui');

const TwoElementDropdown = withValidation(({ value }) => value.length !== 2 && 'You need to choose two')(DropdownField);

<TwoElementDropdown multiple data={[ 'iOS', 'Android', 'FireOS', 'Windows Phone', 'Firefox OS' ]} />
```

Enforcing some password rules.

```jsx
const { PasswordField, withValidation } = require('precise-ui');

const RuledPasswordField = withValidation(({ value }) => !/(?=.{6,})(?=.*?[A-Z]).*?[a-z].*/.test(value) && 'You need at least 6 characters, one upper case and a lower case.')(PasswordField);

<RuledPasswordField />
```
