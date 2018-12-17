Simplest example of `Headline` component will render the default h3 tag.

```jsx
const { Headline } = require('precise-ui');

<Headline>h3 headline</Headline>
```

Component is supporting levels from 1-5, setting the `level` property will set the corresponding html tag:

```jsx
const { Headline } = require('precise-ui');

<Headline level={2}>h2 headline</Headline>
```

Headlines are available in 2 different sizes, small and medium, which could be used, for ex. in responsive layouts:

```jsx
const { Headline }= require('precise-ui');

<div>
  <Headline level={1}>h1 headline</Headline>
  <Headline level={2}>h2 headline</Headline>
  <Headline level={3}>h3 headline</Headline>
  <Headline level={4}>h4 headline</Headline>
  <Headline level={5}>h5 headline</Headline>

  <hr/>

  <Headline size="small" level={1}>h1 headline</Headline>
  <Headline size="small" level={2}>h2 headline</Headline>
  <Headline size="small" level={3}>h3 headline</Headline>
  <Headline size="small" level={4}>h4 headline</Headline>
  <Headline size="small" level={5}>h5 headline</Headline>
</div>
```

You can also style them via text styles:

```jsx
const { Headline, TextStyles } = require('precise-ui');

<div>
  <Headline textStyle={TextStyles.giga}>h1 headline</Headline>
  <Headline textStyle={TextStyles.mega}>h2 headline</Headline>
  <Headline textStyle={TextStyles.alpha}>h3 headline</Headline>
  <Headline textStyle={TextStyles.beta}>h4 headline</Headline>
  <Headline textStyle={TextStyles.gamma}>h5 headline</Headline>
</div>
```

Headline could also be used as subheader by passing subheader flag.

```jsx
const { Headline } = require('precise-ui');

<div>
  <Headline>Adipisicing dolore ut sit dolor.</Headline>
  <Headline level={4} subheader>Commodo nulla officia</Headline>
</div>
```
