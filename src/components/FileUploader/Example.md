**Elementary**

`FileUploader` component can be added anywhere in your application and can be used together with `FileUploaderDetails` component.

The component sends events on file selection to start upload and receives events on success, error, and progress events. All these events are available via the `onChange` event. Moreover, it is possible to then be notified only about events from particular files.

```jsx
const { FileUploader } = require('precise-ui');

function onChange({ files }) {
  files.forEach(file => {
    if (file.state === 'new') {
      alert('New file added');
    } else if (file.state === 'completed') {
      alert('File completed!');
    }
  });
}

<FileUploader onChange={onChange}>
  Add Files
</FileUploader>
```

**Events**

`FileUploader` can accept custom event object in case of several instances of `FileUploaderDetails` were created. For more details see `FileUploaderDetails` component example.

```jsx
const { FileUploader, SimpleEventManager, FileUploaderDetails } = require('precise-ui');
const myEventManager = new SimpleEventManager();

<FileUploader events={myEventManager} multiple onChange={(e) => console.log(e)}>
  Add Files
</FileUploader>
```

**Global Upload State**

Even better, the `FileUploader` allows to be used decoupled from the React tree. By using an explicit `UploadData` instance we can make it happen. Compare the two versions.

```jsx
const { Button, FileUploader, UploadData } = require('precise-ui');

const customData = new UploadData();
customData.on('ready', () => console.log('All ready'));

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: false,
      second: false,
    };
  }

  render() {
    const { first, second } = this.state;
    return (
      <div>
        <h1>No Custom UploadData</h1>
        <div>
          <Button onClick={() => this.setState({ first: !first })}>Toggle</Button>
          {first && <FileUploader multiple>Add Files</FileUploader>}
        </div>
        <h1>With Custom UploadData</h1>
        <div>
          <Button onClick={() => this.setState({ second: !second })}>Toggle</Button>
          {second && <FileUploader multiple data={customData}>Add Files</FileUploader>}
        </div>
      </div>
    );
  }
}

<MyComponent />
```
