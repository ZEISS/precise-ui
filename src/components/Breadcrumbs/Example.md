**Elementary**

Straight forward `Breadcrumb` navigation bar.

```jsx
const { Breadcrumbs, Breadcrumb } = require('precise-ui');

<Breadcrumbs>
  <Breadcrumb title="Breadcrumb 1" to="/breadcrumb/1" />
  <Breadcrumb title="Breadcrumb 2" onClick={() => alert('Pressed Breadcrumb 2')} />
  <Breadcrumb title="Breadcrumb 3" href="#foo" />
</Breadcrumbs>
```

**Overflow**

Once a certain size (by default 5) is reached a part of the elements is collapsed.

```jsx
const { Breadcrumbs, Breadcrumb } = require('precise-ui');

<Breadcrumbs>
  <Breadcrumb title="Breadcrumb 1" to="/breadcrumb/1" />
  <Breadcrumb title="Breadcrumb 2" to="/2" />
  <Breadcrumb title="Breadcrumb 3" to="/3" />
  <Breadcrumb title="Breadcrumb 4" to="/4" />
  <Breadcrumb title="Breadcrumb 5" to="/5" />
  <Breadcrumb title="Breadcrumb 6" to="/6" />
  <Breadcrumb title="Breadcrumb 7" to="/7" />
</Breadcrumbs>
```

Alternatively, the maximum size can also be changed.

```jsx
const { Breadcrumbs, Breadcrumb } = require('precise-ui');

<Breadcrumbs size={3}>
  <Breadcrumb title="Breadcrumb 1" to="/breadcrumb/1" />
  <Breadcrumb title="Breadcrumb 2" to="/2" />
  <Breadcrumb title="Breadcrumb 3" to="/3" />
  <Breadcrumb title="Breadcrumb 4" to="/4" />
  <Breadcrumb title="Breadcrumb 5" to="/5" />
</Breadcrumbs>
```

Omitting typical link items will result in a standard text, e.g., for the last item.

```jsx
const { Breadcrumbs, Breadcrumb } = require('precise-ui');

<Breadcrumbs size={3}>
  <Breadcrumb title="Home" to="/home" />
  <Breadcrumb title="Previous" to="/previous" />
  <Breadcrumb title="Current" />
</Breadcrumbs>
```
