**Managed Mode**

The password field is a special variant of the text field. It comes with a default suffix, but also allows custom prefix and suffix usage. All other props of the text field are still applicable.

```jsx
const { PasswordField } = require('precise-ui');

<PasswordField label="Password" />
```

**Controlled Mode**

Add some error text via the `error` prop (same can be done for any other input field).

```jsx
const { PasswordField } = require('precise-ui');

<PasswordField label="Password" error="Incorrect password" value="123456789"/>
```
