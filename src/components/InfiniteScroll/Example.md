**Elementary**

The `InfiniteScroll` allows to show list of data and load more as user reaches the end of the list, either automatically, or by pressing 'Show More' button.

By default, new items are loaded automatically, when end of screen is reached and inside container provided by `InfiniteScroll`. User must provide `containerHeight` to set height of container prop, when `useWindow` prop is not set to true.

User can optionaly provide `edgeOffset` prop, to tell component to start loading new items `X` pixels before it reaches the end. By default `loadItems` function is called only when end reached.

```jsx
const { InfiniteScroll, Button, ListItem } = require('precise-ui');

function getData() {
  return Array.apply(null, { length: 50 }).map((index) => (
    <ListItem key={Math.random()}> X: {Math.random()}, Y: {Math.random()} </ListItem>
  ));
}

function loadItems(offset) {
  setState({data: [...state.data, ...getData()]});
}

const initialState = {
  data: getData(),
};

<InfiniteScroll
  loadItems={loadItems}
  data={state.data}
  containerHeight={600}
  hasMore
  button={({ onClick }) => <Button onClick={onClick}>more</Button>} />
```
