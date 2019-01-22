**Elementary**

The `Tag` component is quite simple. It is just a little block that has a type and a content. By default the *primary* type is used.

```jsx
const { Tag } = require('precise-ui');

<Tag>my-awesome-tag</Tag>
```

Overall there are 8 different types of tags.

```jsx
const { Tag } = require('precise-ui');

<div>
  <Tag type="primary">Alpha</Tag> <Tag type="danger">Beta</Tag> <Tag type="info">Gamma</Tag> <Tag type="secondary">Example</Tag> <Tag type="success">TypeScript</Tag> <Tag type="warning">React</Tag> <Tag type="none">Angular</Tag> <Tag type="disabled">Vue</Tag>
</div>
```
