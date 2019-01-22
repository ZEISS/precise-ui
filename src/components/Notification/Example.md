**Elementary**

The notification component can be used to just render a notification without much ceremony.

```jsx
const { Notification, NotificationType } = require('precise-ui');

<Notification title="Example" type="info">
  This is a notification.
</Notification>
```

The component can be rendered as a simple text without a title.

```jsx
const { Notification, NotificationType } = require('precise-ui');

<Notification type="info">
  Just a text.
</Notification>
```

**Notification Types**

The are several types of notifications: `none`, `info`, `success`, `error`, `warning` for different possible purposes:

```jsx
const { Notification, NotificationType } = require('precise-ui');

<div>
  <Notification title="None">
    Neutral notification.
  </Notification>

  <Notification title="Info" type="info">
    Shows information.
  </Notification>

  <Notification title="Success" type="success">
    Reports success.
  </Notification>

  <Notification title="Error" type="error">
    Reports failure.
  </Notification>

  <Notification title="Warning" type="warning">
    Displays warning.
  </Notification>
</div>
```

Also, `onClose` handler could be attached to every notification.

```jsx
<Notification type="warning" actionRenderer={() => <ActionLink onClick={() => alert('Action confirmed')}>Yes</ActionLink>} onClose={() => alert("Notification closed")}>
  Confirm action?
</Notification>
```

**Presentation Options**

A custom action renderer could be assigned to the notification.

```jsx
const { Notification, NotificationType, ActionLink, Button } = require('precise-ui');

<div>
  <Notification title="None" type="success" actionRenderer={() => <ActionLink onClick={() => alert('Clicked')}>Show alert</ActionLink>} >
    With ActionLink rendered.
  </Notification>

  <Notification title="Info" type="info" actionRenderer={() => <Button buttonStyle='secondary' onClick={() => console.log('Clicked again!')}>Log to console</Button>}>
    Or with a Button.
  </Notification>

  <Notification type="warning" actionRenderer={() => <ActionLink>Horizontal</ActionLink>}>
    Layout is changed to horizontal when there is no title.
  </Notification>

  <Notification type="error" actionRenderer={() => <ActionLink>Action label</ActionLink>}>
    Pretty long text goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
  </Notification>
</div>
```
