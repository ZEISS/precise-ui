The file select component let's you add an file select button with file list capabilities. In addition to that you have features like multiple select and previews for certain file types.

```jsx
const { FileSelect } = require('precise-ui');

<FileSelect onChange={(ev) => alert(ev.files)}>Add file</FileSelect>
```

Disabled:

```jsx
const { FileSelect } = require('precise-ui');

<FileSelect disabled onChange={(ev) => alert(ev.files)}>Add file</FileSelect>
```

You can select muliple files:

```jsx
const { FileSelect } = require('precise-ui');

<FileSelect multiple>Add files</FileSelect>
```

or display previews for certain file types. For now only images are supported:

```jsx
const { FileSelect } = require('precise-ui');

<FileSelect preview>Add file</FileSelect>
```

Again with multiple support.

```jsx
const { FileSelect } = require('precise-ui');

<FileSelect preview multiple>Add files</FileSelect>
```
