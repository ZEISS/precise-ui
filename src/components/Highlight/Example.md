**Elementary**

Standard usage of a Highlight component.

```jsx
const { Highlight } = require('precise-ui');

<Highlight text="Hello World!" highlight="World" />
```

**With exact match on case**

`IgnoreCase` prop can be used to specify with the search will be case sensitive. By default `ignoreCase` is `True`.

```jsx
const { Highlight } = require('precise-ui');

<Highlight text="Hello World! Searching for World!" highlight="World" ignoreCase={false} />
```

```jsx
const { Highlight } = require('precise-ui');

<Highlight text="Hello World! Searching for world!" highlight="world" ignoreCase={false} />
```

**Appearance Options**

Following example demonstrates theme usage for component style adjustments.

```jsx
const { Highlight } = require('precise-ui');

<Highlight text="Hello World!" highlight="World" theme={{highlightColor: '#f00'}} />
```

