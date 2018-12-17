Example of the basic `Swiper` component usage. To specify children pages for Swiper use any kind of components.

```jsx
const { Swiper } = require('precise-ui');

<Swiper infinite>
  <div style={{ height: '150px', width: '100%', backgroundColor: '#f3a', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    First page
  </div>
  <div style={{ height: '200px', width: '90%', backgroundColor: '#43c', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    Second page
  </div>
  <div style={{ height: '150px', width: '450px', backgroundColor: '#1f2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    Third page
  </div>
</Swiper>
```

An example with controlled mode and page open by default. In this mode component behavior is controlled by code exclusively.

```jsx
const { Swiper } = require('precise-ui');

<Swiper selectedIndex={1}>
  <div>
    First page
  </div>
  <div>
    Second page
  </div>
  <div>
    Third page
  </div>
</Swiper>
```

Example with arrows

```jsx
const { Swiper } = require('precise-ui');

<Swiper arrows infinite>
  <div style={{ height: '150px', width: '100%', backgroundColor: '#f3a', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    First page
  </div>
  <div style={{ height: '200px', width: '90%', backgroundColor: '#43c', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    Second page
  </div>
  <div style={{ height: '150px', width: '450px', backgroundColor: '#1f2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    Third page
  </div>
</Swiper>
```
