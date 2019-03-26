**Elementary**

The navigation bar can be used in layouts as follows:

```jsx
const { NavBar } = require('precise-ui');

const navItems = [
  {
    id: '1',
    content: <a href="#">First</a>,
  },
  {
    id: '2',
    content: <a href="#">Second</a>,
  },
  {
    id: '3',
    content: <a href="#">Third</a>,
  },
];

<NavBar items={navItems} logo="precise-logo.svg" mode="hamburger" />
```

Ideally, it leaves some freedom for creativity while taking away some of the management. In order to be fully useful a proper navigation items array needs to be supplied.

**Hamburger Mode**

The `hamburger` mode is a light variant of the menu. The other one is called `full`, as it should usually be shown on full screen desktop pages. In this mode we have `pin` and `lead` entries. The former being on the right side, the latter on the left side next to the menu.

```jsx
const { NavBar, Icon } = require('precise-ui');

const navItems = [
  {
    id: '1',
    content: <Icon name="Apps" onClick={() => alert('Lead clicked')} />,
    display: 'lead',
  },
  {
    id: '2',
    content: <Icon name="Notifications" onClick={() => alert('Notifications clicked')} />,
    display: 'pin',
  },
  {
    id: '3',
    content: <Icon name="Public" onClick={() => alert('Language clicked')} />,
    display: 'pin',
  },
  {
    id: '4',
    content: <Icon name="Person" onClick={() => alert('Person clicked')} />,
    display: 'pin',
  },
];

<NavBar items={navItems} logo="precise-logo.svg" mode="full" />
```
