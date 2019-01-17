### Theme Colors

The following generic colors are available.

```jsx
const { colors, clipboardCopy, notify, Notifications, invertColor, MetroInfoTile, StackPanel, StackPanelDirection } = require('precise-ui');
const namedColors = Object.keys(colors.all);

const ColorTile = ({ colorName, color }) => typeof color === 'string' ? (
  <MetroInfoTile
    title={<span><span style={{ fontSize: '1.3em' }}>{colorName}</span><br/><span style={{ fontSize: '0.8em' }}>{color}</span></span>}
    onClick={() => {
      clipboardCopy(color);
      notify({
        content: `Copied ${color} to clipboard!`,
        options: {
          autoClose: 1000,
          position: 'top-right',
          title: 'Done',
          type: 'info',
        },
      });
    }}
    theme={{
      metroInfoTile: {
        background: color,
        textColor: invertColor(color, true),
        size: '132px',
      }
    }}
  />
) : null;

<>
  <Notifications />
  <StackPanel wrap direction={StackPanelDirection.leftToRight}>
    {namedColors.map(colorName => (<ColorTile key={colorName} colorName={colorName} color={colors[colorName]} />))}
  </StackPanel>
</>
```
