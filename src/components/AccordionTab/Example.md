**Elementary**

Using the accordion tabs component with a single tab given in form of a `AccordionTab` element. The content is directly rendered, i.e., we could also have some more complex structure inside.

```jsx
const { Accordion, AccordionTab } = require('precise-ui');

<Accordion>
  <AccordionTab header="Title of the tab">
    <em>Content of the tab</em>
  </AccordionTab>
</Accordion>
```

The accordion tab header can also be a complex element. It is possible to pass in a `ReactChild` as header in order to provide custom header.

```jsx
const { Accordion, AccordionTab, colors } = require('precise-ui');

<Accordion>
  <AccordionTab header={<span style={{ color: colors.blue }}>Hello</span>}>
    Content of the tab
  </AccordionTab>
</Accordion>
```
