**Elementary**

Just presenting some data without any customization for headers. Since neither the columns nor the sorting is determined the component is in automatic mode where sorting is set intrinsically.

```jsx
const { Table } = require('precise-ui');
const data = [{
  name: 'A',
  age: 21,
}, {
  name: 'B',
  age: 12,
}, {
  name: 'C',
  age: 25,
}, {
  name: 'D',
  age: 15,
}];

<Table data={data} />
```

**Column Options**

Simple tabular view using a straight forward mapping of fields to headers.

```jsx
const { Table } = require('precise-ui');
const data = [{
  name: 'First Entry',
  age: 21,
}, {
  name: 'Second Entry',
  age: 22,
}];
const columns = {
  name: 'Name',
  age: 'Age',
};

<Table data={data} columns={columns} />
```

Shuffling the column order to change the appearance.

```jsx
const { Table } = require('precise-ui');
const data = [{
  name: 'First Entry',
  age: 21,
}, {
  name: 'Second Entry',
  age: 22,
}];
const columns = {
  age: 'Age',
  name: 'Name',
};

<Table data={data} columns={columns} />
```

We can also provide some summary in the optional footer of each column.

```jsx
const { Table } = require('precise-ui');
const data = [{
  name: 'First Entry',
  age: 21,
}, {
  name: 'Second Entry',
  age: 22,
}];
const columns = {
  age: 'Age',
  name: {
    header: 'Name',
    footer: '(2 entries)',
  },
};

<Table data={data} columns={columns} />
```

**Styling Options**

Condensed table with smaller spacings via the `condensed` option.

```jsx
const { Table } = require('precise-ui');
const data = [{
  name: 'First Entry',
  age: 21,
}, {
  name: 'Second Entry',
  age: 22,
}];
const columns = {
  name: 'Name',
  age: 'Age',
};

<Table data={data} columns={columns} condensed />
```

Borderless condensed table by also specifying the `borderless` option.

```jsx
const { Table } = require('precise-ui');
const data = [{
  name: 'First Entry',
  age: 21,
}, {
  name: 'Second Entry',
  age: 22,
}];
const columns = {
  name: 'Name',
  age: 'Age',
};

<Table data={data} columns={columns} condensed borderless />
```

Overriding the default renderer to display the custom objects.

```jsx
const { Table, Icon } = require('precise-ui');
const data = [{
  name: {
    first: 'First',
    last: 'Entry',
  },
  age: 21,
  action: {
    path: '/first'
  },
}, {
  name: {
    first: 'Second',
    last: 'Entry',
  },
  age: 16,
  action: {
    path: '/second'
  },
}, {
  name: {
    first: 'Third',
    last: 'Entry',
  },
  age: 18,
  action: {
    path: '/third'
  },
}, {
  name: {
    first: 'Last',
    last: 'Entry',
  },
  age: 25,
  action: {
    path: '/last'
  },
}];
const columns = {
  name: 'Name',
  age: 'Age',
  action: 'action',
};

function render(e) {
  const value = e.value;

  if (e.key.toLowerCase() === 'action') {
    return <a href="#" onClick={(e) => {alert(`navigate to ${value.path}`)}}><Icon name="FileDownload" size={1.5} /></a>
  }

  if (e.key.toLowerCase() !== 'name') {
    return value;
  }

  return (
    <div>
      <span>{value.first}</span>
      {' '}
      <strong>{value.last}</strong>
    </div>
  );
}

<Table
  data={data}
  columns={columns}
  indexed
  cellRenderer={render}
  sortBy="age" />
```

Overriding the default renderer to display the custom objects.

```jsx
const { Table, Link, Icon, distance } = require('precise-ui');
const data = [{
  name: 'First Entry',
  age: 21,
  actions: {
    downloadPath: '/download/first',
    deletePath: '/delete/first'
  },
}, {
  name: 'Second Entry',
  age: 16,
  actions: {
    downloadPath: '/download/second',
    deletePath: '/delete/second'
  },
}];
const columns = {
  name: 'Name',
  age: 'Age',
  actions: '',
};

const LinksContainerStyle = {
  textAlign: 'right',
}

const DeleteLinkStyle = {
  marginRight: distance.medium,
  fontWeight: 'normal',
}

const DownloadLinkStyle = {
  fontWeight: 'normal',
}

function render(e) {
  const value = e.value;

  if (e.key.toLowerCase() === 'actions') {
    return (
      <div style={LinksContainerStyle}>
        <ActionLink href="#" onClick={(e) => {alert(`navigate to ${value.deletePath}`)}} style={DeleteLinkStyle}>Delete</ActionLink>
        <ActionLink href="#" onClick={(e) => {alert(`navigate to ${value.downloadPath}`)}} style={DownloadLinkStyle}>Download</ActionLink>
      </div>
    );
  }

  return value;
}

<Table
  data={data}
  columns={columns}
  indexed
  mode="table"
  cellRenderer={render}
  sortBy="age" />
```

With a custom header renderer.

```jsx
const { Table, colors } = require('precise-ui');
const data = [{
  name: 'A',
  age: 21,
}, {
  name: 'B',
  age: 12,
}, {
  name: 'C',
  age: 25,
}, {
  name: 'D',
  age: 15,
}];

const renderHead = columns => (
  <thead style={{ background: colors.grey6, border: '2px solid black' }}>
    <tr>
      {Object.keys(columns).map(column => (
        <th key={column}>{column}</th>
      ))}
    </tr>
  </thead>
);

<Table data={data} headRenderer={renderHead} />;
```

**Dynamic Data and Sorting**

Using the `Table` component with dynamic data is also possible. Here we should add a custom function for deriving the row key.

```jsx
const { Table, Button } = require('precise-ui');

class DynamicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'v'.repeat(10).split('').map((m,i) => ({
        value: `${m}${i}`,
      })),
      columns: {
        value: "Value",
      },
    };
    this.removeRow = () => {
      const { data } = this.state;
      const row = ~~(Math.random() * data.length);
      const newData = data.filter((_, i) => i !== row);
      this.setState({
        data: newData,
      });
      console.log('Removed row', row, newData);
    };
  }

  render() {
    const { data, columns } = this.state;
    return (
      <div>
        <Table
          data={data}
          mode="table" />
        <Button onClick={this.removeRow}>Remove Random Row</Button>
      </div>
    );
  }
}

<DynamicTable />
```

Adding an optional index and no-data message. Sorting by age.

```jsx
const { Table } = require('precise-ui');
const data = [{
  name: 'First Entry',
  age: 21,
}, {
  name: 'Second Entry',
  age: 16,
}, {
  name: 'Third Entry',
  age: 18,
}, {
  name: 'Last Entry',
  age: 25,
}];
const columns = {
  name: 'Name',
  age: {
    header: 'Age',
  },
};

<Table
  data={data}
  columns={columns}
  indexed
  placeholder="No data available"
  sortBy="age" />
```

Displaying no data.

```jsx
const { Table } = require('precise-ui');
const data = [];
const columns = {
  name: 'Name',
  age: 'Age',
};

<Table
  data={data}
  columns={columns}
  indexed
  placeholder="No data available"
  sortBy="age" />
```

**Grouping**

Grouping works similar to sorting. If we sorting and grouping is done by the same key, then sorting has preference.

```jsx
const { Table } = require('precise-ui');
const data = [{
  name: 'A',
  age: 21,
},{
  name: 'A',
  age: 22,
},{
  name: 'A',
  age: 29,
},{
  name: 'A',
  age: 11,
}, {
  name: 'B',
  age: 12,
}, {
  name: 'C',
  age: 25,
}, {
  name: 'D',
  age: 15,
}];

<Table data={data} groupBy="name" />
```
