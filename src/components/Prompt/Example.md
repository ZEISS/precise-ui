`Prompt` component allows to show a dialog window if user is navigating away from a page. Usual use case for this is when user is about to leave the page with form that has changes without submitting it.

**Note:** For `Prompt` component to work, it needs to have `router` from react-router through context provider. If react-router context is not setup, `PromptBasic`, `PromptModal` or `usePrompt` can be used instead. Look at **Advanced** section.

**Important:** Message passed to the `Prompt` component will be shown during page transitions within the app. If the transition is happening outside of the app (moving to different url host, reloading the page), then browser's system dialog, with system message will be shown. This message cannot be customized.

**Default Mode**

By default, `Prompt` component will display browser's dialog window with custom message.

```jsx { "props": { "data-skip": true } }
const { Prompt } = require('precise-ui');

<Prompt message="Hey, are you sure you want to leave the page" />
```

**Custom Modal Mode**

`Prompt` component can also display custom component when navigation between pages inside application.


```jsx { "props": { "data-skip": true } }
const { Prompt } = require('precise-ui');

<Prompt message="Hey, are you sure you want to leave the page" modalOptions={{title: "Leaving page..."}}/>
```

**Using with Form**

As stated above, usual use case for using `Prompt` component is together `Form` component.

`Prompt` component is built-in in `Form` component, so the easiet way to use it with form is by providing `prompt` prop to `Form`. For details, refer to `Form` component examples


**Advanced**

Simple `Prompt` component uses `react-router`'s history object from context. However, of there is no context, then `history` can be passed in directly.

```jsx { "props": { "data-skip": true } }
const { PromptModal, Button, Checkbox} = require('precise-ui');

/* Simulation of the react-router's history object */
let cb;
const history = {
  location: {
    pathname: "/"
  },
  block: (loc) => {
    cb = loc;
    return () => {
      cb = undefined
    }
  },
  push: (path) => {
    alert('user pressed ok. at this pointed, he will be navigated to different page')
  }
}

const simulateNavigation = () => cb && cb({pathname: "/new"});
/* end */

class PromptExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: false,
    };
  }
  render() {
    const {enable} = this.state
    return (<>

    <Checkbox value={enable} onChange={()=>this.setState({enable: !enable})}>Enable prompt on page change</Checkbox>
    <br/>
    <ActionLink onClick={simulateNavigation}>Simulate navigation to differnt page</ActionLink>
    <PromptModal when={enable} history={history} message="Your Form contains unsaved data" modalOptions={{title: "Are you sure you want to leave", confirmText: "Leave", cancelText: "Stay", onConfirm: ()=>{console.log("user is navigating to different page")}, onCancel: ()=>{console.log("user decided to stay in the page")}}} /></>);
  }
}

<PromptExample/>
```

To create custom Modal (or any other functionality that ask before navigating to different page), `usePrompt` hook can be used. For details on how to use look at implementation of `PromptModal` component (`PromptModal.tsx`)
