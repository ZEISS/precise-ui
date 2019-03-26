**Elementary**

The grid area provides a TypeScript friendly way of defining grid cell content. It fills the available cell space.

```jsx
const { Grid, GridArea } = require('precise-ui');

<div style={{ height: '200px' }}>
  <Grid rows={['100px', '1fr', '50px']} columns={['10em', '1fr']}>
    <GridArea column={0} row={0} colSpan={2} style={{ background: 'red' }}>Header</GridArea>
    <GridArea column={0} row={1} style={{ background: 'blue' }}>Menu</GridArea>
    <GridArea column={1} row={1} style={{ background: 'yellow' }}>Content</GridArea>
    <GridArea column={0} row={2} colSpan={2} style={{ background: 'red' }}>Footer</GridArea>
  </Grid>
</div>
```
