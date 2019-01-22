**Elementary**

The following example shows some of the possible variations of the indicator knob.

```jsx
const { IndicatorKnob } = require('precise-ui');
const style = { position: 'relative', height: '30px' };

<table width="100%">
  <tbody>
    <tr>
      <td width="50%">
        Standard
      </td>
      <td width="50%" style={style}>
        <IndicatorKnob />
      </td>
    </tr>
    <tr>
      <td>
        Colored
      </td>
      <td style={style}>
        <IndicatorKnob color="red" />
      </td>
    </tr>
    <tr>
      <td>
        Shifted
      </td>
      <td style={style}>
        <IndicatorKnob x={0} />
      </td>
    </tr>
    <tr>
      <td>
        Active
      </td>
      <td style={style}>
        <IndicatorKnob active />
      </td>
    </tr>
    <tr>
      <td>
        Disabled
      </td>
      <td style={style}>
        <IndicatorKnob disabled />
      </td>
    </tr>
  </tbody>
</table>
```

The indicator knob is just a simple styled block that contains some styling options.
