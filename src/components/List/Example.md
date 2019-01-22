**Elementary**

List component could be created using prebuilt `ListItem`.

```jsx
const { List, ListItem } = require('precise-ui');

<List>
  <ListItem>Cras justo odio</ListItem>
  <ListItem>In ad laboris officia velit proident duis duis.</ListItem>
  <ListItem>Cras justo odio</ListItem>
</List>
```

The `List` disappears with zero contained items. A single item is also presentable.

```jsx
const { List, ListItem } = require('precise-ui');

<List>
  <ListItem>Cras justo odio</ListItem>
</List>
```

**Presentation Options**

It is also possible to control the list child elements. For example, it's possible to set active list element, by passing the index that needs to be active, and the component will add `active` prop on the given item. Furthermore, the text color is changed accordingly.

```jsx
const { List, ListItem } = require('precise-ui');

<div>
  <style dangerouslySetInnerHTML={{__html: `
    .active { background: rgb(224, 224, 224) }
  `}} />
  <List activeItem={2} >
    <ListItem>Cras justo odio</ListItem>
    <ListItem>In ad laboris officia velit proident duis duis.</ListItem>
    <ListItem>Cras justo odio</ListItem>
    <ListItem>Fugiat aliquip elit et eiusmod tempor sit deserunt aute id aliquip ad nisi.</ListItem>
  </List>
</div>
```

Another specific property is disabling padding for child components. Passing this property would disable padding for all child items. Also this could be overwritten in child item. This property is relevant only in case if `ListItem` components used.

```jsx
const { List, ListItem } = require('precise-ui');

<List disablePadding>
  <ListItem>Cras justo odio</ListItem>
  <ListItem disablePadding={false}>In ad laboris officia velit proident duis duis.</ListItem>
  <ListItem>Cras justo odio</ListItem>
</List>
```

The content of list elements can be anything from text to components.

```jsx
const { List, ListItem, Button } = require('precise-ui');

<List borderless>
  <ListItem><Button href="#">Cras justo odio</Button></ListItem>
  <ListItem><Button href="#">In ad laboris officia velit proident duis duis.</Button></ListItem>
</List>
```

**Expanding Lists**

List can be also use together with `Expander`, for example, building menu navigation.

```jsx
const { Expander, List, ListItem, IconLink, styled, css, colors, transparentize } = require('precise-ui');

const StyledListItem = styled(ListItem)`
  cursor: pointer;
  display: flex;
  align-items: center;

`;

const ExpandedList = css`
  background: ${colors.whiterSmoke};
`;

const DefaultList = css`
  background: white;
`;

const StyledList = styled(List)`
  ${({ expanded }) => expanded ? ExpandedList : DefaultList};
`;

const listItems = [
  { key: 'first', icon: 'Label' },
  { key: 'second', icon: 'AccountBalance' },
  { key: 'third', icon: 'Widgets' },
  { key: 'fourth', icon: 'CheckCircle' },
];

const nestedItems = ['Accordion','AccordionCard','AccordionTab','AccordionTable','AccordionTableRow','ActionLink','Anchor','Autocomplete','Avatar','Badge','BodyText','Breadcrumbs','Button','Card','Checkbox'];

class App extends React.Component {
  constructor() {
    this.state = {};
  }
  changeActive(active) {
    this.setState({
      active,
    })
  }

  render() {
    const { active } = this.state;

    return (
      <>
        <StyledList>
          {listItems.map(({ key, icon }, index) => {
            return (
              key === 'third' ?
              <>
                <StyledListItem onClick={() => this.changeActive(index)}>
                  <IconLink icon={icon}>{key}</IconLink>
                </StyledListItem>
                <Expander expand={active === index} timeout={300}>
                  <StyledList expanded={active === index}>
                    {nestedItems.map((item, index) => (<StyledListItem active={index === 0}>{item}</StyledListItem>))}
                  </StyledList>
                </Expander>
              </>
              :
              <StyledListItem onClick={() => this.changeActive(index)}>
                <IconLink icon={icon}>{key}</IconLink>
              </StyledListItem>
            )
          })}
        </StyledList>
      </>
    );
  }
}

<App />
```
