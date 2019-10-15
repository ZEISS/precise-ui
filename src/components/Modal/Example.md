**Elementary**

Passive modal example with optional label and mandatory title.

```jsx
const { Button, Modal, ModalBody, ModalHeader } = require('precise-ui');

class ModalConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleClick(e) {
    const { open } = this.state;
    this.setState({open: !open});
    e.preventDefault();
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button onClick={this.handleClick.bind(this)}>Open Modal</Button>
        <Modal open={open} onClose={this.handleClose.bind(this)}>
          <ModalHeader title="Consectetur nostrud nulla duis." label="Optional label"/>
          <ModalBody>
            Esse minim quis reprehenderit exercitation consectetur do culpa cillum. Tempor in laborum sit minim amet aliquip deserunt mollit commodo incididunt fugiat excepteur. Quis culpa incididunt laborum do Lorem cupidatat ad velit irure exercitation est amet. Officia reprehenderit tempor ut consectetur amet quis consequat culpa minim sint adipisicing aliquip incididunt. Ut laboris Lorem fugiat id anim do dolor ipsum.
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

<ModalConsumer />
```

The modal itself also can be easily expanded beyond the screen. It then automatically goes into scrolling.

```jsx
const { Button, Modal, ModalBody, ModalHeader } = require('precise-ui');

class ModalConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleClick(e) {
    const { open } = this.state;
    this.setState({open: !open});
    e.preventDefault();
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button onClick={this.handleClick.bind(this)}>Open Long Modal</Button>
        <Modal open={open} onClose={this.handleClose.bind(this)}>
          <ModalHeader title="Consectetur nostrud nulla duis." label="Optional label"/>
          <ModalBody>
            <p>Esse minim quis reprehenderit exercitation consectetur do culpa cillum. Tempor in laborum sit minim amet aliquip deserunt mollit commodo incididunt fugiat excepteur. Quis culpa incididunt laborum do Lorem cupidatat ad velit irure exercitation est amet. Officia reprehenderit tempor ut consectetur amet quis consequat culpa minim sint adipisicing aliquip incididunt. Ut laboris Lorem fugiat id anim do dolor ipsum.</p>

            <p>Esse minim quis reprehenderit exercitation consectetur do culpa cillum. Tempor in laborum sit minim amet aliquip deserunt mollit commodo incididunt fugiat excepteur. Quis culpa incididunt laborum do Lorem cupidatat ad velit irure exercitation est amet. Officia reprehenderit tempor ut consectetur amet quis consequat culpa minim sint adipisicing aliquip incididunt. Ut laboris Lorem fugiat id anim do dolor ipsum.</p>

            <p>Esse minim quis reprehenderit exercitation consectetur do culpa cillum. Tempor in laborum sit minim amet aliquip deserunt mollit commodo incididunt fugiat excepteur. Quis culpa incididunt laborum do Lorem cupidatat ad velit irure exercitation est amet. Officia reprehenderit tempor ut consectetur amet quis consequat culpa minim sint adipisicing aliquip incididunt. Ut laboris Lorem fugiat id anim do dolor ipsum.</p>

            <p>Esse minim quis reprehenderit exercitation consectetur do culpa cillum. Tempor in laborum sit minim amet aliquip deserunt mollit commodo incididunt fugiat excepteur. Quis culpa incididunt laborum do Lorem cupidatat ad velit irure exercitation est amet. Officia reprehenderit tempor ut consectetur amet quis consequat culpa minim sint adipisicing aliquip incididunt. Ut laboris Lorem fugiat id anim do dolor ipsum.</p>

            <p>Esse minim quis reprehenderit exercitation consectetur do culpa cillum. Tempor in laborum sit minim amet aliquip deserunt mollit commodo incididunt fugiat excepteur. Quis culpa incididunt laborum do Lorem cupidatat ad velit irure exercitation est amet. Officia reprehenderit tempor ut consectetur amet quis consequat culpa minim sint adipisicing aliquip incididunt. Ut laboris Lorem fugiat id anim do dolor ipsum.</p>

            <p>Esse minim quis reprehenderit exercitation consectetur do culpa cillum. Tempor in laborum sit minim amet aliquip deserunt mollit commodo incididunt fugiat excepteur. Quis culpa incididunt laborum do Lorem cupidatat ad velit irure exercitation est amet. Officia reprehenderit tempor ut consectetur amet quis consequat culpa minim sint adipisicing aliquip incididunt. Ut laboris Lorem fugiat id anim do dolor ipsum.</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

<ModalConsumer />
```

**Button Options**

A simple confirmation modal can also be displayed.

```jsx
const { Modal, ModalBody, ModalHeader, ModalFooter, Button } = require('precise-ui');

class ModalConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleClick(e) {
    const { open } = this.state;
    this.setState({open: !open});
    e.preventDefault();
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button onClick={this.handleClick.bind(this)}>Open Modal</Button>
        <Modal open={open} onClose={this.handleClose.bind(this)} maxWidth="800px">
          <ModalHeader title="Consectetur nostrud nulla duis." label="Optional label"/>
          <ModalBody>
            Esse minim quis reprehenderit exercitation consectetur do culpa cillum. Tempor in laborum sit minim amet aliquip deserunt mollit commodo incididunt fugiat excepteur. Quis culpa incididunt laborum do Lorem cupidatat ad velit irure exercitation est amet. Officia reprehenderit tempor ut consectetur amet quis consequat culpa minim sint adipisicing aliquip incididunt. Ut laboris Lorem fugiat id anim do dolor ipsum.
          </ModalBody>
          <ModalFooter>
            <Button>Cancel</Button>
            <Button>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

<ModalConsumer />
```

**Custom Display**

Modal with custom content for displaying, e.g., some tutorial screens.

```jsx
const { Modal, ModalBody, ModalHeader, ModalFooter, Swiper, Button, Icon } = require('precise-ui');

const CustomBulletsContainer = ({ children, ...rest }) => {
  const style = {
    position: 'absolute',
    left: 43,
    bottom: 18,
    display: 'flex',
    alignItems: 'center',
  }
  return <div {...rest} style={style}>{children}</div>;
};

const CustomBullet = ({ children, onClick, active, ...rest }) => {
  const style = {
    height: active ? '30px' : '0.75rem',
    width: active ? '30px' : '0.75rem',
    backgroundColor: active ? '#008bd0' : 'rgba(224,225,221,1)',
    borderRadius: '50%',
    display: 'inline-block',
    cursor: 'pointer',
    margin: '0.3125rem',
    display: 'flex',
    alignItems: 'center',
  }
  return <div style={style} onClick={onClick}>{active && <Icon name="ArrowForward" color="#fff" size={1.5} style={{margin: 'auto'}} />}</div>
}

const bodyStyle = {
  padding: '31px 48px 67px',
}

const headerStyle = {
  fontWeight: '300',
  margin: '0 0 17px',
  fontSize: '28px',
}

class ModalConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleClick(e) {
    const { open } = this.state;
    this.setState({open: !open});
    e.preventDefault();
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const { open } = this.state;
    return (
      <div style={{ position: 'relative' }}>
        <Button onClick={this.handleClick.bind(this)}>Open Modal</Button>
        <Modal open={open} onClose={this.handleClose.bind(this)} maxWidth="500px">
          <Swiper autoplay bulletsContainer={CustomBulletsContainer} bullet={CustomBullet} arrows>
            <div style={{ height: '246px', width: '500px', backgroundColor: '#f2f2f2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              First page
            </div>
            <div style={{ height: '246px', width: '500px', backgroundColor: '#f2f2f2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              Second page
            </div>
            <div style={{ height: '246px', width: '500px', backgroundColor: '#f2f2f2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              Third page
            </div>
          </Swiper>
          <div style={bodyStyle}>
            <h1 style={headerStyle}>Expand and view details</h1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </Modal>
      </div>
    );
  }
}

<ModalConsumer />
```

**Form**

The modal is compatible with the `Form` component.

```jsx
const { Button, TextField, Modal, ModalBody, ModalHeader, ModalFooter, Form } = require('precise-ui');

class ModalConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleClose = () => {
      this.setState({open: false});
    };
    this.handleClick = (e) => {
      const { open } = this.state;
      this.setState({open: !open});
      e.preventDefault();
    };
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <Button onClick={this.handleClick}>Open Modal</Button>
        <Form onSubmit={ev => alert(JSON.stringify(ev))}>
          <Modal open={open} onClose={this.handleClose}>
            <ModalHeader title="Consectetur nostrud nulla duis." label="Optional label"/>
            <ModalBody>
              <TextField name="a" label="A" />
              <br />
              <TextField name="b" label="B" />
            </ModalBody>
            <ModalFooter>
              <Button type="button" onClick={this.handleClose}>Cancel</Button>
              <Button type="submit">OK</Button>
            </ModalFooter>
          </Modal>
        </Form>
      </div>
    );
  }
}

<ModalConsumer />
```

**Prompting on before closing**

Modal with custom confirmation on close.

```jsx { "props": { "data-skip": true } }
const { Button, Modal, ModalBody, ModalHeader } = require('precise-ui');

class ModalConsumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleClick(e) {
    const { open } = this.state;
    this.setState({open: !open});
    e.preventDefault();
  }

  handleBeforeClose() {
  	return window.confirm('Are you sure? All unsaved data will be lost.');
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button onClick={this.handleClick.bind(this)}>Open Modal</Button>
        <Modal open={open} onClose={this.handleClose.bind(this)} onBeforeClose={this.handleBeforeClose.bind(this)}>
          <ModalHeader title="Consectetur nostrud nulla duis." label="Optional label"/>
          <ModalBody>
            Esse minim quis reprehenderit exercitation consectetur do culpa cillum. Tempor in laborum sit minim amet aliquip deserunt mollit commodo incididunt fugiat excepteur. Quis culpa incididunt laborum do Lorem cupidatat ad velit irure exercitation est amet. Officia reprehenderit tempor ut consectetur amet quis consequat culpa minim sint adipisicing aliquip incididunt. Ut laboris Lorem fugiat id anim do dolor ipsum.
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

<ModalConsumer />
```