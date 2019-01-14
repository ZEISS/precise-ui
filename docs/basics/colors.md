### Theme Colors

The following colors are available.

```jsx
const { colors, themes: { light }, clipboardCopy, notify, Notifications, invertColor, MetroInfoTile, StackPanel, StackPanelDirection } = require('precise-ui');
const themeColors = ['ui0', 'ui1', 'ui2', 'ui3', 'ui4', 'ui5', 'ui6', 'text0', 'text1', 'text2', 'text3', 'text4'];

const ColorTile = ({ colorName, color }) => typeof color === 'string' ? (
  <MetroInfoTile
    title={<span><span style={{ fontSize: '1.5em' }}>{colorName}</span><br/><span style={{ fontSize: '0.8em' }}>{color}</span></span>}
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
      }
    }}
  />
) : null;

<>
  <Notifications />
  <StackPanel wrap direction={StackPanelDirection.leftToRight}>
    {themeColors.map(colorName => (<ColorTile key={colorName} colorName={colorName} color={light[colorName]} />))}
  </StackPanel>
</>
```

### Named Colors

```jsx
const { colors, clipboardCopy, notify, Notifications, invertColor, MetroInfoTile, StackPanel, StackPanelDirection } = require('precise-ui');
const namedColors = Object.keys(colors.all);

const ColorTile = ({ colorName, color }) => typeof color === 'string' ? (
  <MetroInfoTile
    title={<span><span style={{ fontSize: '1.5em' }}>{colorName}</span><br/><span style={{ fontSize: '0.8em' }}>{color}</span></span>}
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
