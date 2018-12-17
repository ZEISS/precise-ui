The spider component can be used to display and manipulate linear graphs.

```jsx
const { Spider } = require('precise-ui');

const nodes = [{
  id: '1',
  title: 'Acquire (ZEN)',
  head: 'Images',
  body: [
    'Metadata'
  ]
}, {
  id: '2',
  title: 'Process',
  head: 'In and out'
}, {
  id: '3',
  title: 'Report',
  head: 'Results',
  body: [
    'Metadata'
  ]
}];

<Spider nodes={nodes} nodeWidth={200} nodeSpacing={50} />
```

It allows connecting different parameters to each other and embedding complex elements instead of strings.

```jsx
const { Spider, Slider } = require('precise-ui');
const nodes = [{
  id: '1',
  title: 'Foo',
  head: 'Bar',
  body: [
    <Slider key="slider" />,
    'Second'
  ],
  connected: '6'
}, {
  id: '2',
  title: 'Baz',
  head: 'Input',
  body: [
    'First',
    'Second'
  ],
  connected: '4'
}, {
  id: '3',
  title: 'Baz',
  head: 'Input',
  body: [
    'First'
  ],
  connected: '5'
}, {
  id: '4',
  title: 'Baz',
  head: 'Input',
  body: [
    'First',
    'Second'
  ],
}, {
  id: '5',
  title: 'Baz',
  head: 'Input',
  body: [
    'First'
  ]
}, {
  id: '6',
  title: 'Qux',
  head: 'Hello'
}];

<Spider nodes={nodes} />
```

The complex objects may be embedded in any way.

```jsx
const { Spider, Slider, StackItem, StackPanel, TextField } = require('precise-ui');
const nodes = [{
  id: 'acquire',
  title: 'Acquire',
  head: <div style={{ textAlign: 'right' }}>Images</div>,
  body: <div style={{ textAlign: 'right' }}>Metadata</div>,
  connected: 'report'
}, {
  id: 'process',
  title: 'Process',
  head: (
    <StackPanel>
      <StackItem style={{ textAlign: 'left' }}>In</StackItem>
      <StackItem style={{ textAlign: 'right' }}>Out</StackItem>
    </StackPanel>
  ),
  body: (
    <div>
      <StackPanel direction="left">
        <StackItem style={{ textAlign: 'left', padding: '5px 5px 5px 0' }}>Threshold</StackItem>
        <StackItem><TextField /></StackItem>
      </StackPanel>
      <StackPanel direction="top">
        <StackItem style={{ textAlign: 'left', padding: '5px 5px 5px 0' }}>Slider Value</StackItem>
        <StackItem><Slider minimum={0} maximum={1} defaultValue={0.8} /></StackItem>
      </StackPanel>
    </div>
  )
}, {
  id: 'report',
  title: 'Report',
  head: <div style={{ textAlign: 'left' }}>Results</div>,
  body: <div style={{ textAlign: 'left' }}>Metadata</div>,
}];

<Spider nodes={nodes} />
```
