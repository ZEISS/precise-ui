**Elementary**

The `Responsive` component is a simple component the gives us the ability to react to screen changes in a declarative way.

```jsx
const { Responsive } = require('precise-ui');

<>
  <Responsive
    render={(screenSize) => (
      <p>This is the screen size: <b>{screenSize}</b></p>
    )}
  />
  <Responsive screenSize="small">
    <p>This will render on small screens.</p>
  </Responsive>
  <Responsive screenSize="smallAndMedium">
    <p>This will render on small and medium screens.</p>
  </Responsive>
  <Responsive screenSize="medium">
    <p>This will render on medium screens.</p>
  </Responsive>
  <Responsive screenSize="mediumAndLarge">
    <p>This will render on medium and large screens.</p>
  </Responsive>
  <Responsive screenSize="large">
    <p>This will render on large screens 1.</p>
    <p>This will render on large screens 2.</p>
  </Responsive>
  <Responsive screenSize="medium" theme={{ breakpoints: { medium: 200, large: 500 } }}>
    <p>This will render on medium screens with custom breakpoints.</p>
  </Responsive>
</>;
```

**Utility Functions**

Utils also exports `displayTo[screenSize]` function for styled components. Where the screen size is `small | smallAndMedium | medium | mediumAndLarge | large`.

```jsx
const styled = require('styled-components').default;
const { displayTo } = require('precise-ui');

const StyledDiv1 = styled.div`
  ${displayTo('large')`font-weight: bold;`};
`;

const StyledDiv2 = styled.div`
  ${displayTo('mediumAndLarge')`font-weight: bold;`};
`;

const StyledDiv3 = styled.div`
  ${displayTo('medium')`font-weight: bold;`};
`;

const StyledDiv4 = styled.div`
  ${displayTo('smallAndMedium')`font-weight: bold;`};
`;

const StyledDiv5 = styled.div`
  ${displayTo('small')`font-weight: bold;`};
`;

const StyledDiv6 = styled.div`
  ${displayTo('(min-width: 200px) and (max-width: 500px)')`font-weight: bold;`};
`;

<>
  <StyledDiv1>It's bold on large screens.</StyledDiv1>
  <StyledDiv2>It's bold on medium and large screens.</StyledDiv2>
  <StyledDiv3>It's bold on medium screens.</StyledDiv3>
  <StyledDiv4>It's bold on small and medium screens.</StyledDiv4>
  <StyledDiv5>It's bold on small screens.</StyledDiv5>
  <StyledDiv6>It's bold on screens between 200px and 500px.</StyledDiv6>
</>;
```
