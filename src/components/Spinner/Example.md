**Elementary**

A simple loading spinner in all different sizes.

```jsx
const { Spinner } = require('precise-ui');

<table>
  <tbody>
    <tr>
      <td width="80" align="center">XL</td>
      <td width="80" align="center">L</td>
      <td width="80" align="center">M</td>
      <td width="80" align="center">S</td>
      <td width="80" align="center">XS</td>
    </tr>
    <tr>
      <td><Spinner size="x-large" /></td>
      <td><Spinner size="large" /></td>
      <td><Spinner size="medium" /></td>
      <td><Spinner size="small" /></td>
      <td><Spinner size="x-small" /></td>
    </tr>
  </tbody>
</table>
```

Labels are supported as children, which align to the chosen size.

```jsx
const { Spinner } = require('precise-ui');

<table>
  <tbody>
    <tr>
      <td width="120" align="center">XL</td>
      <td width="120" align="center">L</td>
      <td width="120" align="center">M</td>
      <td width="120" align="center">S</td>
      <td width="120" align="center">XS</td>
    </tr>
    <tr>
      <td><Spinner size="x-large">Loading</Spinner></td>
      <td><Spinner size="large">Loading</Spinner></td>
      <td><Spinner size="medium">Loading</Spinner></td>
      <td><Spinner size="small">Loading</Spinner></td>
      <td><Spinner size="x-small">Loading</Spinner></td>
    </tr>
  </tbody>
</table>
```

By design, the loading spinner is always placed in the center of its occupied area.

```jsx
const { Spinner, Icon } = require('precise-ui');

<Spinner>
  Preparing with <Icon name="Favorite" color="red" /> ...
</Spinner>
```
