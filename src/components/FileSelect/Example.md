**Elementary**

The file select component let's you add an file select button with file list capabilities. In addition to that you have features like multiple select and previews for certain file types.

```jsx
import { FileSelect } from 'precise-ui';

<FileSelect onChange={(ev) => alert(ev.files)}>Add file</FileSelect>
```

**Decoration Options**

There are several options just like for any other input field.

```jsx
import { FileSelect } from 'precise-ui';

<FileSelect disabled onChange={(ev) => alert(ev.files)}>Add file</FileSelect>
```

You can select multiple files:

```jsx
import { FileSelect } from 'precise-ui';

<FileSelect multiple>Add files</FileSelect>
```

or display previews for certain file types. For now only images are supported:

```jsx
import { FileSelect } from 'precise-ui';

<FileSelect preview>Add file</FileSelect>
```

Again with multiple support.

```jsx
import { FileSelect } from 'precise-ui';

<FileSelect preview multiple>Add files</FileSelect>
```
