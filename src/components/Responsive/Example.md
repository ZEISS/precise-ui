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
  <Responsive screenSize="medium">
    <p>This will render on medium screens.</p>
  </Responsive>
  <Responsive screenSize="large">
    <p>This will render on large screens 1.</p>
    <p>This will render on large screens 2.</p>
  </Responsive>
  <Responsive screenSize="xLarge">
    <p>This will render on xLarge screens.</p>
  </Responsive>
  <Responsive screenSize="max">
    <p>This will render on max screens.</p>
  </Responsive>
  <Responsive screenSize="medium" theme={{ breakpoints: { medium: 200, large: 500 } }}>
    <p>This will render on medium screens with custom breakpoints.</p>
  </Responsive>
  <Responsive screenSize="large" screenSizeCondition="from">
    <p>This will render on large screens and wider.</p>
  </Responsive>
  <Responsive screenSize="large" screenSizeCondition="upTo">
    <p>This will render on large screens and narrower.</p>
  </Responsive>
</>;
```

**Utility Functions**

Utils also exports `displayTo(ScreenSize | query), displayUpTo(ScreenSize), displayFrom(ScreenSize)` functions for styled components.

```jsx
const styled = require('styled-components').default;
const { displayTo, displayFrom, displayUpTo, ScreenSizeList } = require('precise-ui');

const StyledDivFromLarge = styled.div`
  ${displayFrom('large')`font-weight: bold;`};
`;

const StyledDivUpToMedium = styled.div`
  ${displayUpTo('medium')`font-weight: bold;`};
`;

const StyledDivMax = styled.div`
  ${displayTo('max')`font-weight: bold;`};
`;

const StyledDivXLarge = styled.div`
  ${displayTo('xLarge')`font-weight: bold;`};
`;

const StyledDivLarge = styled.div`
  ${displayTo('large')`font-weight: bold;`};
`;

const StyledDivMedium = styled.div`
  ${displayTo('medium')`font-weight: bold;`};
`;

const StyledDivSmall = styled.div`
  ${displayTo('small')`font-weight: bold;`};
`;

const StyledDivCustom = styled.div`
  ${displayTo('(min-width: 200px) and (max-width: 500px)')`font-weight: bold;`};
`;

<>
  <p>
     Available screen sizes: <code>{JSON.stringify(ScreenSizeList)}</code>.
  </p>
  
  <StyledDivFromLarge>It's bold on large screens and wider.</StyledDivFromLarge>
  <StyledDivUpToMedium>It's bold on medium screens and narrower.</StyledDivUpToMedium>
  <StyledDivMax>It's bold on max screens.</StyledDivMax>
  <StyledDivXLarge>It's bold on xLarge screens.</StyledDivXLarge>
  <StyledDivLarge>It's bold on large screens.</StyledDivLarge>
  <StyledDivMedium>It's bold on medium screens.</StyledDivMedium>
  <StyledDivSmall>It's bold on small screens.</StyledDivSmall>
  <StyledDivCustom>It's bold on screens between 200px and 500px.</StyledDivCustom>
</>;
```

In addition, utils exports `getWidthBreakpointsQuery({max, min})`.
The function `getWidthBreakpointsQuery` creates media query.

```jsx
const { getWidthBreakpointsQuery } = require('precise-ui');

<>
  <p>It's media query for screens between 200px and 500px: <b>{getWidthBreakpointsQuery({min: 200, max: 501})}</b></p>
</>;
```