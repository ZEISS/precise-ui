**Elementary**

In order to use Notifications only one `<Notifications />` component has to be placed inside you application. The `<Notifications />` container can be used to set the common properties, which can be later overwritten by specific notifications.

```jsx
const { Notifications } = require('precise-ui');

<Notifications />
```

**Notify Helper**

In order to display notification, notify function needs to be used providing the content of the notification and optionally other options. When not type option provided, default option type will be used.

```jsx
const { notify, Button } = require('precise-ui');

<Button onClick={() => notify({
  content: 'Labore et in ullamco minim reprehenderit anim veniam qui laboris anim Lorem consequat mollit.'
})}>
  Notify
</Button>
```

Like already mentioned, default notifications container behavior can be overwritten by every single notification:

```jsx
const { notify, Button } = require('precise-ui');

<div>
  <Button onClick={() => notify.error({ content: 'Laborum deserunt ad ipsum exercitation.', options: { position: 'bottom-left' }})}>
    Error notification
  </Button>
  <Button onClick={() => notify.success({ content: 'Elit ex culpa elit laborum anim.', options: { position: 'bottom-left' }})}>
    Success notification
  </Button>
</div>
```

**Presentation Options**

Notifications can have a custom action renderer:

```jsx
const { notify, Button, ActionLink } = require('precise-ui');

<div>
  <Button onClick={() => notify.info({ content: 'Backing up finished.', options: { actionRenderer:() => <ActionLink onClick={() => alert('Ok pressed')}>Ok</ActionLink>, position: 'bottom-left' }})}>
    With ActionLink
  </Button>
  <Button onClick={() => notify.warning({ content: 'Format C:\\. Are you sure?', options: { actionRenderer:() => <Button onClick={() => alert('Confirmed')} style={{margin: '5px 0'}}>Confirm</Button>, position: 'bottom-left' }})}>
    With Button
  </Button>
</div>
```

...or custom content:

```jsx
const { notify, Button, Headline, Tag } = require('precise-ui');

<Button onClick={() => notify.info({ content:
  <div>
    <Headline level={5} size='small'>Selected configuration confirmed:</Headline>
    <div>
      <Tag type="primary">Alpha</Tag> <Tag type="danger">Beta</Tag> <Tag type="info">Gamma</Tag> <Tag type="secondary">Charline</Tag> <Tag type="success">Echo</Tag> <Tag type="warning">Foxtrot</Tag> <Tag type="none">Golf</Tag> <Tag type="disabled">Hotel</Tag>
    </div>
  </div>,
  options: { position: 'bottom-left' }})}>
  Custom content
</Button>
```

**Multiple Notifications**

Example of various notifications in sequence.

```jsx
const { notify, Button } = require('precise-ui');

const notifications = [
  () => notify({ content: <div>Veniam velit ad fugiat voluptate. Proident do sit reprehenderit officia tempor aliquip ut elit sint laboris reprehenderit irure.</div>, options: { title: 'Notification title', autoClose: 5000 } }),
  () => notify.info({ content: <div>Toast<br/>Adipisicing commodo cupidatat culpa esse aliqua pariatur do eu nisi anim commodo.</div>, options: { position: 'bottom-left', autoClose: 5000 } }),
  () => notify.error({ content: <div>Toast<br/>Adipisicing commodo cupidatat culpa esse aliqua pariatur do eu nisi anim commodo.</div>, options: { position: 'bottom-left', autoClose: 5000 } }),
  () => notify.warning({ content: <div>Toast<br/>Adipisicing commodo cupidatat culpa esse aliqua pariatur do eu nisi anim commodo.</div>, options: { position: 'bottom-left', autoClose: 5000 } }),
  () => notify.success({ content: <div>Toast<br/>Adipisicing commodo cupidatat culpa esse aliqua pariatur do eu nisi anim commodo.</div>, options: { position: 'bottom-left', autoClose: 5000 } }),
  () => notify.success({ content: 'Success notification 1', options: { position: 'top-right', autoClose: 5000 } }),
  () => notify.success({ content: 'Success notification 2', options: { position: 'top-right', autoClose: 5000 } }),
  () => notify({ content: 'Success notification 3', options: { position: 'top-right', autoClose: 5000, type: 'success' } }),
  () => notify.success({ content: 'Success notification 4', options: { position: 'top-right', autoClose: 5000 } }),
  () => notify.success({ content: 'Success notification 5', options: { position: 'top-right', autoClose: 5000 } }),
];

<Button onClick={() => notifications.map((notification, index) => { setTimeout( () => notification(), index * 1000 ); })}>
  Sequence notifications
</Button>
```

There is a possibility of heaving multiple instances of `Notifications` container, and triggering notifications in specific container(s).

For this example one needs to create a custom `SimpleEventManager` instance which implements `EventManager` and pass it as a prop to the new `Notifications` container. After that, in order to show notifications in this newly created container, `events` property, with a value of custom `SimpleEventManager`, needs to be set when calling notify function.

```jsx
const { Notifications, notify, Button, SimpleEventManager } = require('precise-ui');

const myEventManager = new SimpleEventManager();

<>
  <Notifications events={myEventManager} />
  <Button onClick={() => notify({
    content: 'Labore et in ullamco minim reprehenderit anim veniam qui laboris anim Lorem consequat mollit.', options: { events: myEventManager }
  })}>
    Notify
  </Button>
</>
