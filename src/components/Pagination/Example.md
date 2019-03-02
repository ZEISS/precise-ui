**Elementary**

Using the `Pagination` component on some arbitrary children.

```jsx
const { Pagination } = require('precise-ui');

<Pagination size={2}>
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
  <div>Fourth</div>
  <div>Fifth</div>
</Pagination>
```

**Pagination Host**

The `host` prop can be used to define the rendering in greater detail.

```jsx
const { Pagination } = require('precise-ui');

<Pagination size={5} host="ul">
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
  <li>Fourth</li>
  <li>Fifth</li>
  <li>Sixth</li>
  <li>Seventh</li>
</Pagination>
```

**Pagination Size**

The following example shows that changing the number of elements (e.g., by filtering) still caps the page.

```jsx
const { SearchField, Pagination } = require('precise-ui');

class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 10,
    };
  }
  render() {
    const { size } = this.state;
    const elements = [];

    for (let i = 0; i < size; i++) {
      elements.push(<li key={i}>{i}</li>);
    }

    return (
      <>
        <SearchField defaultValue={size} onSearch={e => this.setState({ size: +e.query || 0 })} />
        <Pagination size={5} host="ul">
          {elements}
        </Pagination>
      </>
    );
  }
}

<Foo />
```

When providing the size property as an array, additional `items per page` pagination control will appear with the option to choose one of the provided sizes.

```jsx
const { Pagination } = require('precise-ui');
const data = Array.apply(null, { length: 250 }).map((a, i) => <div key={i}>Item {i}</div>);

<Pagination size={[20, 50, 100]} host="ul">
  {data}
</Pagination>
```

**Combining with Table**

The combination of table component and pagination is particularly promising, especially in the scenario of many rows.

```jsx
const { Pagination, Table } = require('precise-ui');
const data = Array.apply(null, { length: 250 }).map((v, i) => ({ X: i, Y: i }));
const paginate = ({ table, rows, props }) => <Pagination host={table} size={20} {...props}>{rows}</Pagination>;

<Table data={data} indexed bodyRenderer={paginate} />
```

Likewise, the combination works, e.g., with other components like an `InfiniteList`.
