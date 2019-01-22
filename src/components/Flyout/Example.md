**Elementary**

We can use the (default) auto placement to just show a simple flyout on its ideal position. The component supports two modes - managed and controlled. By default, the managed mode is selected.

```jsx
const { Flyout } = require('precise-ui');

<Flyout content={'Flyout content'}>
  Wrapped element
</Flyout>
```

**Controlled Mode**

Flyout different placements example in controlled mode. The controlled mode is triggered by explicitly setting the `open` prop.

```jsx
const { Tag, Flyout } = require('precise-ui');

<div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
  <Flyout open position={'right'} content="Right">
    <Tag type="primary">Element</Tag>
  </Flyout>

  <Flyout open position={'top'} content="Top">
    <Tag type="info">Element</Tag>
  </Flyout>

  <Flyout open position={'bottom'} content="Bottom">
    <Tag type="secondary">Element</Tag>
  </Flyout>

  <Flyout open position={'left'} content="Left">
    <Tag type="danger">Element</Tag>
  </Flyout>
</div>
```

In this example a combination of `Button` and `Flyout` is used.

```jsx
const { Flyout, Button } = require('precise-ui');

const positions = ['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'right-top', 'right-bottom', 'left-top', 'left-bottom'];

class RandomFlyout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.change = e => this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Flyout
          open={open}
          position={positions[Math.ceil(Math.random() * positions.length)]}
          content={
            <div style={{width: '120px', padding: '0.5em'}}>
              <h4 style={{textAlign: 'center'}}>Note</h4>
              <span>Flyout appears in random position</span>
            </div>
          }>
          <Button onClick={this.change}>
            {open ? 'Hide flyout' : 'Show flyout'}
          </Button>
        </Flyout>
      </div>
    );
  }
}

<RandomFlyout />
```

**Interactive List**

Example of `InteractiveList` component usage together with flyout.

```jsx
const { Flyout, Button, InteractiveList } = require('precise-ui');

const CustomWrapper = function (props) {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};

class ListFlyout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.change = e => this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Flyout open={open}
          content={
            <InteractiveList flyout customWrapper={CustomWrapper} data={['Option option 1', 'Option 2', 'Option 3']} open border />
          }
          position="right-top">
          <Button onClick={this.change}>
            Toggle options
          </Button>
        </Flyout>
      </div>
    );
  }

}

<ListFlyout />
```

Likewise the next example.

```jsx
const { Flyout, Button, Avatar, InteractiveList } = require('precise-ui');

const CustomWrapper = function (props) {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};

class ListFlyout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.change = e => this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Flyout open={open}
          content={
            <InteractiveList flyout customWrapper={CustomWrapper} data={['Option option 1', 'Option 2', 'Option 3']} open border />
          }
          position="right-top">
          <Avatar onClick={this.change} initials="R" description="Sample" size="x-small" />
        </Flyout>
      </div>
    );
  }

}

<ListFlyout />
```

**Playground**

A little playground for the various options.

```jsx
const { Flyout, RadioButton, StackPanel, StackItem } = require('precise-ui');

const positions = [
  'top',
  'right',
  'bottom',
  'left',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'right-top',
  'right-bottom',
  'left-top',
  'left-bottom',
];

class LongExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      position: 'left',
      contentSize: 'long',
      positionType: 'position',
    };
  }

  switch() {
    this.setState({
      open: !this.state.open,
    });
  }

  changeContentType(type) {
    this.setState({
      contentSize: type,
    });
  }

  changePositionType(positionType) {
    this.setState({
      positionType
    });
  }

  getShortContent() {
    return <div>Flyout</div>;
  }

  getMiddleContent() {
    return (
      <div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
      </div>
    );
  }

  getLongContent() {
    return (
      <div>
        {Array.from({ length: 100 }, (value, index) => (
          <div key={index} style={{ whiteSpace: 'nowrap', padding: '5px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Flyout
          open={open}
          position={this.state.positionType === 'position' ? this.state.position : undefined}
          defaultPosition={this.state.positionType === 'defaultPosition' ? this.state.position : undefined}
          content={
            this.state.contentSize === 'short'
              ? this.getShortContent()
              : this.state.contentSize === 'middle'
                ? this.getMiddleContent()
                : this.getLongContent()
          }>
          <Button onClick={() => this.switch()}>{open ? `Hide flyout` : 'Show flyout'}</Button>
        </Flyout>
        <StackPanel>
          <StackItem>
            Position:
            <div>
              {positions.map(position => (
                <div key={position}>
                  <RadioButton
                    value={this.state.position === position}
                    onChange={() => this.setState({ position })}>
                    {position}
                  </RadioButton>
                </div>
              ))}
            </div>
          </StackItem>
          <StackItem>
            Content length:
            {['short', 'middle', 'long'].map(size => (
              <div key={size}>
                <RadioButton
                  value={this.state.contentSize === size}
                  onChange={() => this.changeContentType(size)}>
                  {size}
                </RadioButton>
              </div>
            ))}
          </StackItem>
          <StackItem>
            Position type:
            {[{
              positionType: 'position',
              description: 'enforces defined position',
            }, {
              positionType: 'defaultPosition',
              description: 'flyout takes the position only if enough space',
            }].map(({positionType, description}) => (
              <div key={positionType}>
                <RadioButton
                  value={this.state.positionType === positionType}
                  onChange={() => this.changePositionType(positionType)}>
                  {positionType} ({description})
                </RadioButton>
              </div>
            ))}
          </StackItem>
        </StackPanel>
      </div>
    );
  }
}

<LongExample />;
```
