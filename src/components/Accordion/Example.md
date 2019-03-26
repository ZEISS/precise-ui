**Elementary**

Using the `AccordionTab` components used to specify children tabs.

```jsx
const { Accordion, AccordionTab } = require('precise-ui');

<Accordion>
  <AccordionTab header="One">
    First tab
  </AccordionTab>
  <AccordionTab header="Two">
    Second tab
  </AccordionTab>
  <AccordionTab header="Three">
    Third tab
  </AccordionTab>
</Accordion>
```

An example with multiple expansions.

```jsx
const { Accordion, AccordionTab } = require('precise-ui');

<Accordion multiple>
    <AccordionTab header="One">
        First tab
    </AccordionTab>
    <AccordionTab header="Two">
        Second tab
    </AccordionTab>
    <AccordionTab header="Three">
        Third tab
    </AccordionTab>
</Accordion>
```

**Appareance Options**

Following example demonstrates theme usage for component style adjustments.

```jsx
const { Accordion, AccordionTab } = require('precise-ui');

<Accordion theme={{ accordionPadding: '1em 0', accordionContentPadding: '1em', accordionLine: '1px dashed grey' }}>
  <AccordionTab header="M header">
    Mike tab
  </AccordionTab>
  <AccordionTab header="N header">
    November tab
  </AccordionTab>
  <AccordionTab header="O header">
    Oscar tab
  </AccordionTab>
</Accordion>
```

**Controlled Mode**

An example with controlled mode and tab open by default. In this mode component behavior is controlled by code exclusively.

```jsx
const { Accordion, AccordionTab } = require('precise-ui');

<Accordion selectedIndex={1}>
    <AccordionTab header="One">
        First tab
    </AccordionTab>
    <AccordionTab header="Two">
        Second tab
    </AccordionTab>
    <AccordionTab header="Three">
        Third tab
    </AccordionTab>
</Accordion>
```

**Managed Mode**

You can also set a first state for the `Accordion` without moving it to the controlled mode.

```jsx
const { Accordion, AccordionTab } = require('precise-ui');

<Accordion defaultSelectedIndex={0}>
    <AccordionTab header="One">
        First tab
    </AccordionTab>
    <AccordionTab header="Two">
        Second tab
    </AccordionTab>
    <AccordionTab header="Three">
        Third tab
    </AccordionTab>
</Accordion>
```
