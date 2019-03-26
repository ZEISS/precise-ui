**Elementary**

Some basic `ContentSwitch` usage example.

```jsx
const { ContentSwitch, TabPage } = require('precise-ui');

<ContentSwitch>
  <TabPage header="First">
    First content.
  </TabPage>
  <TabPage header="Second">
    Second content.
  </TabPage>
  <TabPage header="Third">
    Third content.
  </TabPage>
  <TabPage header="Last">
    Final content.
  </TabPage>
</ContentSwitch>
```

The `ContentSwitch` component is also responsive. As show in the example below, switch buttons which are overflowing the available space, are moved into the Flyout.

```jsx
const { ContentSwitch, TabPage } = require('precise-ui');

const pages = [];

for (var i = 0; i < 20; i++) {
    pages.push(
      <TabPage header={`Item ${i}`} key={i}>
        Content of the page {i}
      </TabPage>
    );
}

<ContentSwitch>{pages}</ContentSwitch>
```

**Vertical Mode**

The content switch can be also used in vertical orientation.

```jsx
const { ContentSwitch, TabPage } = require('precise-ui');

<ContentSwitch orientation="vertical">
  <TabPage header="First">
    First content.
  </TabPage>
  <TabPage header="Second">
    Second content.
  </TabPage>
  <TabPage header="Third">
    Third content.
  </TabPage>
  <TabPage header="Last">
    Final content.
  </TabPage>
</ContentSwitch>
```
