### Theme Colors

The following colors are available. Feel free to change them.

```jsx
const {
  colors,
  clipboardCopy,
  notify,
  themes,
  Notifications,
  Table,
  TextField,
  Flyout,
  serializeColor,
} = require('precise-ui');

const isUi = m => /^ui[0-9]+$/.test(m);
const isText = m => /^text[0-9]+$/.test(m);
const isSupport = m => /^support[A-Z][a-z]+/.test(m);

const ColorTile = ({ color }) => (
  <MetroInfoTile
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
        size: '64px',
      }
    }}
  />
);

const columns = {
  color: {
    header: 'Preview',
    width: '80px'
  },
  name: {
    header: 'Name',
  },
  value: {
    header: 'Value',
  },
};

class ThemeColorChanger extends React.Component {
  constructor(props) {
    super(props);
    const { theme } = window.context;
    this.state = {
      modal: undefined,
      theme,
      names: Object.keys(theme).filter(m => isUi(m) || isText(m) || isSupport(m)),
    };
    this.changeColor = (name, value) => {
      const rgba = typeof value === 'string' ? value : serializeColor(value);
      const newTheme = {
        ...theme,
        [name]: rgba,
      };
      window.setContext({
        theme: newTheme,
      })
      this.setState({
        theme: newTheme,
      });
    };
    this.renderCell = e => {
      const name = e.data.name;

      switch (e.key) {
        case 'color':
          return <ColorTile color={e.value} />;
        case 'value':
          const handler = ({ value }) => this.changeColor(name, value);
          return (
            <Flyout open={this.state.modal === name} position="bottom" content={
              <div style={{ width: '200px' }}>
                <ColorPicker value={e.value} onChange={handler} />
              </div>
              }>
              <TextField
                value={e.value}
                onChange={handler}
                onFocus={() => this.setState({ modal: name })}
                onBlur={() => this.setState({ modal: undefined })} />
            </Flyout>
          );
        default:
          return e.value;
      }
    };
  }

  render() {
    const { names, theme } = this.state;
    const colors = names.map(name => ({
      color: theme[name],
      name,
      value: theme[name],
    }));

    return <Table data={colors} columns={columns} cellRenderer={this.renderCell} />;
  }
}

<>
  <Notifications />
  <ThemeColorChanger />
</>
```
