**Elementary**

Example of the basic `Carousel` component usage. To specify children pages for a carousel use any kind of components.

```jsx
const { Carousel } = require('precise-ui');

<Carousel infinite>
  <div style={{ height: '150px', width: '100%', backgroundColor: '#f3a', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    First page
  </div>
  <div style={{ height: '200px', width: '90%', backgroundColor: '#43c', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    Second page
  </div>
  <div style={{ height: '150px', width: '450px', backgroundColor: '#1f2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    Third page
  </div>
</Carousel>
```

**Controlled Mode**

An example with controlled mode and page open by default. In this mode component behavior is controlled by code exclusively.

```jsx
const { Carousel } = require('precise-ui');

<Carousel selectedIndex={1}>
  <div>
    First page
  </div>
  <div>
    Second page
  </div>
  <div>
    Third page
  </div>
</Carousel>
```

**Presentation Options**

Example with arrows by using the `arrows` option. Furthermore, the `infinite` option removes the natural boundaries.

```jsx
const { Carousel } = require('precise-ui');

<Carousel arrows infinite>
  <div style={{ height: '150px', width: '100%', backgroundColor: '#f3a', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    First page
  </div>
  <div style={{ height: '200px', width: '90%', backgroundColor: '#43c', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    Second page
  </div>
  <div style={{ height: '150px', width: '450px', backgroundColor: '#1f2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    Third page
  </div>
</Carousel>
```
