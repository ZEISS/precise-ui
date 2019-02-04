**Elementary**

Basic usage of TagBuilder component. When *Comma*, *Semicolon*, *Space* or *Enter* key is pressed, current text is added as a tag to TagBuilder. Tags could be removed by pressing on tag close button or by hitting *Backspace* or *Delete* key. Navigation between tags could be done via *Left*, *Right*, *Home*, *End* buttons.

```jsx
const { TagBuilder } = require('precise-ui');

<TagBuilder />
```

**Controlled Mode**

When the `value` prop set manually, component switches to controlled mode. In this mode the component is controlled via the parent only.

```jsx
const { TagBuilder } = require('precise-ui');

<TagBuilder value={['hello', 'world', '!']} />
```

TagBuilder can be used with `Form` component.

```jsx
const { TagBuilder, Form } = require('precise-ui');

<Form defaultValue={{tags: ['these', 'values', 'are', 'from', 'form']}}>
  <TagBuilder name="tags" />
</Form>
```

The component supports standard input events like `onChange`, `onFocus` and `onBlur` are supported. The following example illustrates `info` prop usage.

```jsx
const { TagBuilder } = require('precise-ui');

<TagBuilder
  info='Console used to display component events'
  onFocus={() => console.log(`Focused in`)}
  onBlur={() => console.log(`Focused out`)}
  onChange={({ value }) => console.log(`TagBuilder tags are ${value}`)}
/>
```

This component is configured to add tag only when *a* or *b* keys are down. Also, `error` property is set.

```jsx
const { TagBuilder } = require('precise-ui');

<TagBuilder
  shouldFinishTag={e => e.key === 'a' || e.key === 'b'}
  error='Tag is finished only when "a" or "b" keys are pressed'
/>
```

**Tag Presentation**

The following is an example of using of `defaultValue`. With `defaultValue` set component hold non-controlled mode. Additionally, this example demonstrates the usage of different colors via its `theme`.

```jsx
const { TagBuilder } = require('precise-ui');
const theme = { tagBackground: 'lightgreen', tagColor: 'blue', iconColor: 'red', iconBackground: 'yellow' };

<TagBuilder
  theme={theme}
  defaultValue={['this', 'is', 'default', 'value']}
/>
```

Here you can see a demo of custom tag building with help of `tagRenderer` method.

```jsx
const { TagBuilder, themes } = require('precise-ui');
const tagRenderer = e => (<Button type={e.index % 2 === 0 ? "primary" : "secondary"}>{e.item}</Button>);

<TagBuilder
  tagRenderer={tagRenderer}
/>
```

TagBuilder component is also capable of handling a large amount of tags.

```jsx
const { TagBuilder } = require('precise-ui');

<TagBuilder defaultValue={['Velit','irure','proident','occaecat','eu','excepteur','proident','dolor','ad','cillum','amet','consequat','in.','Reprehenderit','irure','officia','excepteur','et','laborum','proident','veniam','tempor.','Ad','quis','est','commodo','minim','sunt','incididunt','aute','amet','minim','incididunt','irure','cupidatat','officia','irure.','Dolor','adipisicing','occaecat','quis','ut','nulla','aliquip','esse']}/>
```
