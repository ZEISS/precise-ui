**Elementary**

Standard usage of a Image component. By default `Image` is fluid, occupying 100% of it's parent.

```jsx
const { Image } = require('precise-ui');

<Image src="/pexels-photo-248797.jpeg" alt="image" />
```

There is also a default error component, which is used if we do not provide a custom one.

```jsx
const { Image } = require('precise-ui');

<Image preload src="/pexels-photo-248797" alt="image" />
```

**Preloading**

Image component also has built in pre-loading functionality, and uses the `Spinner` component to indicate pre-loading state.

```jsx
const { Image } = require('precise-ui');

<Image preload src="/pexels-photo-248797.jpeg" alt="image" />
```

Image preloader could also be altered by providing alternative preloader prop.

```jsx
const { Image } = require('precise-ui');
const customPreloader = <div>Loading....</div>;

<Image preload preloader={customPreloader} src="/pexels-photo-248797.jpeg" alt="image" />
```

Same way as one can set custom preloader, can also alter the error component.

```jsx
const { Image } = require('precise-ui');
const error = <div style={{ color: '#00ff00' }}>Image failed to load....</div>;

<Image preload error={error} src="/pexels-photo-248797" alt="image" />
```
