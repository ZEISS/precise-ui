**Elementary**

Using the tabs component with a single tab given in form of a `TabPage` element. The content is directly rendered, i.e., we could also have some more complex structure inside.

```jsx
import { Tabs, TabPage } from 'precise-ui';

<Tabs>
  <TabPage header="Title of the tab">
    Content of the tab
  </TabPage>
</Tabs>
```

The tab header can also be a complex element. Since the tab page itself also gives us the option to pass in an ReactChild as header, we can use this to provide more styling to some header.

```jsx
import { Tabs, TabPage, colors } from 'precise-ui';

const header = <span style={{ color: colors.indigo }}>Hello</span>;

<Tabs>
  <TabPage header={header}>
    Content of the tab
  </TabPage>
</Tabs>
```
