**Elementary**

The search field is a special variant of an autocomplete text field. It comes with a default icon in form of a search icon, but also allows custom prefix and suffix usage. All other props of the `Autocomplete` component are still applicable, e.g., showing a list of suggestions or performing actions on them.

Furthermore, it provides an event `onSearch` that fires using a debounce. The debounce can be configured using `delay` prop, which is normally set to 200. The time is given in milliseconds.

```jsx
const { SearchField } = require('precise-ui');

<SearchField label="Search" onSearch={value => console.log(value)} />
```
