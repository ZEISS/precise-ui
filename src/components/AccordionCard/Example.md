**Elementary**

Using the `AccordionCard` component. Renders card which is expandable by clicking action button.

```jsx
const { AccordionCard } = require('precise-ui');

<AccordionCard header="Title">
  <div style={{ padding: '10px' }}>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
    type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
    Lorem Ipsum.
  </div>
</AccordionCard>;
```

**Controlled Mode**

`AccordionCard` in controlled mode with custom action renderer.

```jsx
const { AccordionCard, StackPanel, StackItem, ActionLink } = require('precise-ui');

class AccordionCardInt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  renderHeader() {
    return (
      <StackPanel>
        <StackItem>Some Title</StackItem>
        <StackItem style={{ textAlign: 'right' }}>
          <ActionLink onClick={() => this.setState({ opened: !this.state.opened })}>
            {this.state.opened ? 'close' : 'open'}
          </ActionLink>
        </StackItem>
      </StackPanel>
    );
  }
  render() {
    return (
      <AccordionCard header={this.renderHeader()} renderAction={() => null} opened={this.state.opened}>
        <div style={{ padding: '10px' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </div>
      </AccordionCard>
    );
  }
}

<AccordionCardInt />;
```
