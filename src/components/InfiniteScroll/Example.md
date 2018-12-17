The `InfiniteScroll` allows to show list of data and load more as user reaches the end of the list, either automatically, or by pressing 'Show More' button.

By default, new items are loaded automatically, when end of screen is reached and inside container provided by `InfiniteScroll`. User must provide `containerHeight` to set height of container prop, when `useWindow` prop is not set to true.

User can optionaly provide `edgeOffset` prop, to tell component to start loading new items `X` pixels before it reaches the end. By default `loadItems` function is called only when end reached.

```jsx
const { Button, ListItem } = require('precise-ui');
const getData = () => {
  return Array.apply(null, { length: 50 }).map((index) => (
    <ListItem key={Math.random()}> X: {Math.random()}, Y: {Math.random()} </ListItem>
  ));
}
initialState = {
  data: getData(),
};
const loadItems = (offset) => {
  setState({data: [...state.data, ...getData()]});
};

<InfiniteScroll loadItems={loadItems} data={state.data} containerHeight={600} hasMore button={({onClick})=><Button onClick={onClick}>more</Button>}/>
```

The `InfiniteScroll` component can load new items on pressing 'Show More' button instead of loading automatically, if `button` props is set to true or if user provides custom button with `loaderBtn` prop.

```jsx
const { ZeissletCard } = require('precise-ui');
const getData = () => {
    return Array.apply(null, { length: 10 }).map(() => ({ X: Math.random(), Y: Math.random() })).map((item)=> (
      <ZeissletCard
      key={item.X}
      disabled
      style={{ height: '400px' }}
      tag={`X:${item.X}     Y:${item.Y}`}
      theme={{
        tagColor: 'red',
        tagBackground: 'white',
      }}
      image="https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg"
      title="Anim commodo Lorem dolore esse esse ex magna."
      intro="Nulla mollit non commodo labore nisi deserunt laborum aute est et laborum."
      actionLabel="Service Ticket">
      Aliquip consectetur dolor ad sit non sunt minim elit elit veniam sit do incididunt. Anim laboris sit fugiat minim
      ipsum velit enim occaecat. Aliqua reprehenderit ad eiusmod elit consectetur id sit dolor aute laborum laborum irure
      laborum nostrud.
    </ZeissletCard>
  ));
}
initialState = {
  data: getData(),
};
const loadItems = (offset) => {
  setState({data: [...state.data, ...getData()]});
};

<InfiniteScroll loadItems={loadItems} hasMore data={state.data} containerHeight={600}/>
```

The `InfiniteScroll` can use window as its container, instead of container provided by the component. To enable it, set `useWindow` prop to true.
