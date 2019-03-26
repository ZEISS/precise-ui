**Elementary**

Simple tab control.

```jsx
const { Tabs, TabPage } = require('precise-ui');

<Tabs>
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
</Tabs>
```

Simple tab control starting at a different tab.

```jsx
const { Tabs, TabPage } = require('precise-ui');

<Tabs defaultIndex={2}>
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
</Tabs>
```

Using the tab control to not present the last tab. This is possible since the Tabs component has two states:

* controlled
* managed (not controlled)

The latter is automatically active if no value for `selectedIndex` was  (initially) passed. It cannot be changed during the lifetime. If we want to start with a different tab than the first one, we should then use the `defaultIndex` prop. In controlled mode we are therefore required to use the `onTabChange` callback. This way we can react to data changes and apply them to the underlying model.

**Controlled Mode**

Let's see the controlled mode in action.

```jsx
const { Tabs, TabPage } = require('precise-ui');

class MyTabComponent extends React.Component {
  constructor() {
    this.state = {
      index: 0
    };
    this.changeTab = (e) => {
      if (e.selectedIndex < 3) {
        this.setState({
          index: e.selectedIndex
        });
      }
    };
  }

  render() {
    return (
      <Tabs
        selectedIndex={this.state.index}
        onTabChange={this.changeTab}>
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
      </Tabs>
    );
  }
}

<MyTabComponent />
```

The previous example always updates the model with exception of changing the selected index to the last tab. As this is not performed we won't be able to look into the last tab. This could be used to disable a tab or do other things which are necessary from the perspective of some business logic. Don't forget to add the visual hint in the header.
