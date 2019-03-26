**Elementary**

A very simple 2x2 grid with some content. The placement is determined automatically.

```jsx
const { Grid } = require('precise-ui');

<Grid rows={2} columns={2}>
  <div>A</div>
  <div>B</div>
  <div>C</div>
  <div>D</div>
</Grid>
```

**Positioning**

We may place some of these on new positions, thus overriding the default placement. The component will look for remaining spots to do the placement.

```jsx
const { Grid } = require('precise-ui');

<Grid rows={2} columns={2}>
  <div column={1}>A</div>
  <div row={1}>B</div>
  <div>C</div>
  <div>D</div>
</Grid>
```

The same holds true once spanning comes into play. In the following example the cells (0, 1) and (1, 0) to (1, 1) are already taken. Thus the remaining content is placed in (0, 0), (0, 2) and (1, 2).

```jsx
const { Grid } = require('precise-ui');

<Grid rows={2} columns={3}>
  <div column={1}>A</div>
  <div row={1} colSpan={2}>B</div>
  <div>C</div>
  <div>D</div>
  <div>E</div>
</Grid>
```

The grid layout is not constraint to uniform grids - we can define the available space freely. Here we use some fixed units (pixels and ems) along the fractional unit (`fr`).

```jsx
const { Grid } = require('precise-ui');

<div style={{ height: '200px' }}>
  <Grid rows={['100px', '1fr', '50px']} columns={['10em', '1fr']}>
    <div column={0} row={0} colSpan={2}>Header</div>
    <div column={0} row={1}>Menu</div>
    <div column={1} row={1}>Content</div>
    <div column={0} row={2} colSpan={2}>Footer</div>
  </Grid>
</div>
```

**Layouts**

Grid layouts are great for general layouts. Consider the following structure with explicit row and column placement.

```jsx
const { Grid } = require('precise-ui');

<Grid rows={3} columns={3}>
  <div column={0} row={0} colSpan={3}>Header</div>
  <div column={0} row={1}>Menu</div>
  <div column={1} row={1} colSpan={2}>Content</div>
  <div column={0} row={2} colSpan={3}>Footer</div>
</Grid>
```

Grid layouts are great for general layouts. Consider the following structure with explicit row and column placement.

```jsx
const { Grid } = require('precise-ui');
const Cell = (props) => (
  <div style={{ background: '#ccc', padding: '5px', height: '100%', boxSizing: 'border-box' }}>
    {props.children}
  </div>
);

<Grid rows={3} columns={3} spacing="5px">
  <Cell>1</Cell>
  <Cell rowSpan={2}>2</Cell>
  <Cell colSpan={3}>3</Cell>
  <Cell>4</Cell>
  <Cell>5</Cell>
  <Cell>6</Cell>
</Grid>
```

The grid layout works also together with the responsive HOC. The responsive HOC always takes the size of the parent container and is thus more flexible than CSS media queries, which are bound to the viewport size.

```jsx
const { Grid, withResponsive } = require('precise-ui');

const ResponsiveGrid = withResponsive(({ width }) => (
  <Grid rows={width < 800 ? 2 : 1} columns={width >= 800 ? ['100px', '1fr'] : 1}>
    <div>Menu</div>
    <div>Content at {width}</div>
  </Grid>
));

<ResponsiveGrid />
```

The `Grid` component is also capable of rendering the unused cells. By providing the `showEmptyCells` property, the `Grid` will show unused cells and render the provided components.

The rendering for the empty / unused cell can be provided in three different ways:

- as an already computed JSX element,
- as a callback function (provided the row and column), or
- as a boolean (`true` renders the default unused cell, `false` does not render anything).

Let's see one possible way in action:

```jsx
const { Grid } = require('precise-ui');
const Cell = (props) => (
  <div style={{ background: '#ccc', padding: '5px', height: '100%', boxSizing: 'border-box' }}>
    {props.children}
  </div>
);

const defaultCell = (
  <div style={{ height: '100%', width: '100%', background: '#f1f1f1' }}/>
);

<Grid rows={5} columns={3} spacing="5px" showEmptyCells={defaultCell}>
  <Cell>1</Cell>
  <Cell rowSpan={2}>2</Cell>
  <Cell colSpan={3}>3</Cell>
  <Cell>4</Cell>
  <Cell>5</Cell>
  <Cell>6</Cell>
</Grid>
```
