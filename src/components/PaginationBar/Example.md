**Elementary**

The `PaginationBar` component represents a visual pagination bar. It requires full implementation of the pagination functionality from the caller.

```jsx
const { PaginationBar } = require('precise-ui');

<PaginationBar
  selectedPage={1}
  size={10}
  items={17}
  availableSizes={[5, 10, 15]}
/>
```

The component must be controlled and uses 0-based indices for the currently selected page.
