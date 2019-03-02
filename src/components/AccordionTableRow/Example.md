**Elementary**

Renders single row for the `AccordionTable`.

```jsx
const { AccordionTable, AccordionTableRow, colors } = require('precise-ui');

const columns = {
  key: { header: 'Key', sortable: true },
  val: { header: 'Value', sortable: true },
};

const rowRenderer = ({ cells, handleClick, active }) => (
  <AccordionTableRow onClick={handleClick} active={active}>
    {cells}
  </AccordionTableRow>
);

function getData(num) {
  return Array.from(new Array(num), (el, ind) => ({
    key: `Key #${ind}`,
    val: ind,
  }));
}

function getContent({ index, data }) {
  return (
    <div>
      Details for row #<b>{index}</b>
    </div>
  );
}

<AccordionTable noHeader columns={columns} data={getData(1)} rowRenderer={rowRenderer} detailsRenderer={getContent} />;
```
