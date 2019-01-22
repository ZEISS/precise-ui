**Elementary**

The `PageHead` component is a simple composed component that gives us a combination consisting of breadcrumbs, a title, and an optional help button. All correctly aligned and styled.

```jsx
const { PageHead } = require('precise-ui');

<PageHead title="Sample Page" />
```

**Using Breadcrumbs**

With breadcrumbs the situation is looking a little bit better. A little help icon can be integrated as well.

```jsx
const { PageHead } = require('precise-ui');
const breadcrumbs = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Away',
    to: '/away',
  }
];

<PageHead title="Sample Page" breadcrumbs={breadcrumbs} help="More infos" onHelp={() => alert('Hi there')} />
```
