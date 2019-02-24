**Elementary**

Using the `AccordionTable` component. The following example also demonstrates usage of custom `cellRenderer` which allows specifying custom cell content.

```jsx
const { AccordionTable } = require('precise-ui');

const style = { width: '200px', margin: '0 auto', textAlign: 'center' };

const cardRenderer = ({index, open, keys, item}) => <div style={{backgroundColor: 'green'}}>{index + ' ' + open + ' ' + keys.reduce((acc, item) => acc + item + ', ', '') + ' ' + item}</div>

function getContent({index, data}) {
  return (
    <div style={style}>
      Details for row #
      <b>{index}</b>
    </div>
  );
}

function cellRenderer({key, value}) {
  return key === 'tag' ? <Tag>{value}</Tag> : value;
}

<AccordionTable
  indexed
  data={[
    {tag: 'A', value: 'Alpha', team: 'Alpha team'},
    {tag: 'B', value: 'Bravo', team: 'Bravo team'},
    {tag: 'C', value: 'Charlie', team: 'Charlie team'},
    {tag: 'E', value: 'Echo', team: 'Echo team'},
  ]}
  cellRenderer={cellRenderer}
  detailsRenderer={getContent} />
```

**Pagination**

Using the `AccordionTable` component with paging for desktop machines. Here, we also want to use a different rendering at mobile - not using the standard pagination, but rather an infinite list.

```jsx
const { AccordionTable, Pagination, distance } = require('precise-ui');

initialState = {
  offset: 0,
  mode: undefined,
};

const style = {
  padding: `${distance.xlarge} ${distance.xlarge} ${distance.xxlarge}`,
};

const mobileStyle = {
  padding: `${distance.medium}`,
};

const columns={
  key: { header: 'Key', sortable: true },
  val: { header: 'Value', sortable: true }
};

function getContent() {
  return <div style={state.mode === 'table' ? style : mobileStyle}><h4>Content details</h4></div>
}

function getData(num) {
  return (
    Array.from(new Array(num), (el, ind) =>
      ({ key: `Key #${ind}`, val: ind}))
  );
}

function updateMode(e) {
  setState({mode: e.mode});
}

function renderBody(e) {
  return e.mode === 'table' ? renderTableBody(e) : renderCardBody(e);
};

function renderTableBody(e) {
  return (
    <Pagination host={e.table} size={5} {...e.props}>
      {e.rows}
    </Pagination>
  );
}

function renderCardBody(e) {
  return (
    <InfiniteScroll
      loadItems={(offset) => setState({offset})}
      host={e.table}
      hasMore={state.offset < e.rows.length}
      data={e.rows.slice(0, state.offset + 10)}
      containerHeight={500}
      button />
  );
};

<AccordionTable
  columns={columns}
  data={getData(24)}
  detailsRenderer={getContent}
  bodyRenderer={renderBody}
  openLabel="Expand"
  closeLabel="Collapse"
  onModeChange={updateMode}
  multiple />
```

**Controlled Mode**

Using the `AccordionTable` with custom `rowRenderer` in controlled mode.

```jsx
const { AccordionTable, AccordionTableRow, colors } = require('precise-ui');
const { default: styled } = require('styled-components');

const StyledAccordionTableRow = styled(AccordionTableRow)`
  td {
    background: ${colors.ui2};
  }
`;

const columns = {
  key: { header: 'Key', sortable: true },
  val: { header: 'Value', sortable: true },
};

const rowRenderer = ({ cells, handleClick, active }) => (
  <StyledAccordionTableRow onClick={handleClick} active={active}>
    {cells}
  </StyledAccordionTableRow>
);

function getData(num) {
  return Array.from(new Array(num), (el, ind) => ({
    key: `Key #${ind}`,
    val: (ind*451)
      .toString(36)
      .substring(7),
  }));
}

const data = getData(5);

function getContent({ index, data }) {
  return (
    <div>
      Details for row #<b>{index}</b>
    </div>
  );
}

class ControlledAccordionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  renderRow({ cells, active, index }) {
    return (
      <StyledAccordionTableRow onClick={() => this.setState({ selectedIndex: index })} active={active}>
        {cells}
      </StyledAccordionTableRow>
    );
  }

  render() {
    return (
      <AccordionTable
        columns={columns}
        data={data}
        rowRenderer={this.renderRow.bind(this)}
        detailsRenderer={getContent}
        selectedIndex={this.state.selectedIndex}
      />
    );
  }
}

<ControlledAccordionTable />
```

**Decoration Options**

Condensed `AccordionTable` with smaller spacings.

```jsx
const { AccordionTable } = require('precise-ui');

const style = { width: '200px', margin: '0 auto', textAlign: 'center' };

function getContent({index, data}) {
  return (
    <div style={style}>
      Details for row #
      <b>{index}</b>
    </div>
  );
}

<AccordionTable
  indexed
  data={[
    {tag: 'A', value: 'Alpha', team: 'Alpha team'},
    {tag: 'B', value: 'Bravo', team: 'Bravo team'},
  ]}
  detailsRenderer={getContent}
  condensed />
```

Borderless condensed `AccordionTable` with smaller spacings.

```jsx
const { AccordionTable } = require('precise-ui');
const style = { width: '200px', margin: '0 auto', textAlign: 'center' };

function getContent({index, data}) {
  return (
    <div style={style}>
      Details for row #
      <b>{index}</b>
    </div>
  );
}

<AccordionTable
  indexed
  data={[
    {tag: 'A', value: 'Alpha', team: 'Alpha team'},
    {tag: 'B', value: 'Bravo', team: 'Bravo team'},
  ]}
  detailsRenderer={getContent}
  condensed
  borderless />
```

**Grouping**

We can use the `groupBy` to introduce an additional level.

```jsx
const { AccordionTable } = require('precise-ui');
const style = { width: '200px', margin: '0 auto', textAlign: 'center' };

function getContent({index, data}) {
  return (
    <div style={style}>
      Details for row #
      <b>{index}</b>
    </div>
  );
}

<AccordionTable
  groupBy="tag"
  detailsRenderer={getContent}
  data={[
    {tag: 'A', value: 'Alpha1', team: 'Alpha team'},
    {tag: 'A', value: 'Alpha3', team: 'Alpha team'},
    {tag: 'B', value: 'Bravo2', team: 'Bravo team'},
    {tag: 'A', value: 'Alpha2', team: 'Alpha team'},
    {tag: 'B', value: 'Bravo3', team: 'Bravo team'},
    {tag: 'C', value: 'Charlie1', team: 'Charlie team'},
    {tag: 'E', value: 'Echo1', team: 'Echo team'},
    {tag: 'A', value: 'Alpha4', team: 'Alpha team'},
    {tag: 'B', value: 'Bravo1', team: 'Bravo team'},
    {tag: 'E', value: 'Echo2', team: 'Echo team'},
  ]} />
```

Custom rendering of the column headers can give us additional functionality combined with the `groupBy`.

```jsx
const { AccordionTable, RadioButton, TextField } = require('precise-ui');
const style = { width: '200px', margin: '0 auto', textAlign: 'center' };

function getContent({index, data}) {
  return (
    <div style={style}>
      Details for row #
      <b>{index}</b>
    </div>
  );
}

class GroupTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupBy: 'tag',
      groupNames: {},
    };
  }

  render() {
    const { groupBy, groupNames } = this.state;

    return (
      <AccordionTable
        groupBy={groupBy}
        groupRenderer={e => {
          const grp = groupNames[e.group];
          return (
            <TextField
              value={grp !== undefined ? grp : e.group}
              onChange={
                ({ value }) => this.setState({
                  groupNames: {
                    ...this.state.groupNames,
                    [e.group]: value,
                  },
                })
              } />
          );
        }}
        detailsRenderer={getContent}
        headerCellRenderer={e => {
          const cell = e.render(e);
          return e.column > 0 ? (
            <RadioButton
              value={groupBy === e.key}
              onChange={() => this.setState({ groupBy: e.key })}>
              {cell}
            </RadioButton>
          ) : cell;
        }}
        columns={{
          tag: {
            header: 'Tag',
            sortable: false,
          },
          value: {
            header: 'Value',
            sortable: true,
          },
          team: {
            header: 'Team',
            sortable: true,
          },
        }}
        data={[
          {tag: 'A', value: 'Alpha1', team: 'Alpha team'},
          {tag: 'A', value: 'Alpha3', team: 'Alpha team'},
          {tag: 'B', value: 'Bravo2', team: 'Bravo team'},
          {tag: 'A', value: 'Alpha2', team: 'Alpha team'},
          {tag: 'B', value: 'Bravo3', team: 'Bravo team'},
          {tag: 'C', value: 'Charlie1', team: 'Charlie team'},
          {tag: 'E', value: 'Echo1', team: 'Echo team'},
          {tag: 'A', value: 'Alpha4', team: 'Alpha team'},
          {tag: 'B', value: 'Bravo1', team: 'Bravo team'},
          {tag: 'E', value: 'Echo2', team: 'Echo team'},
        ]} />
    );
  }
}

<GroupTable />
```
