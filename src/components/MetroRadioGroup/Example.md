**Elementary**

The radio group allows using fancy radio tiles for selections. Essentially, it is a `RadioButtonGroup` with a different styling.

```jsx
import { MetroRadioTile, MetroRadioGroup } from 'precise-ui';

<MetroRadioGroup>
  <MetroRadioTile title="A" name="a" />
  <MetroRadioTile title="B" name="b" defaultValue={true} />
  <MetroRadioTile title="C" name="c" />
</MetroRadioGroup>
```
