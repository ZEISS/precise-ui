**Elementary**

Standard usage of a `FileUploaderDetails` component.

```jsx
const { FileUploaderDetails, FileUploader, eventManagers, FileUploadActions } = require('precise-ui');

class FileUploaderDetailsExample extends React.Component {
  constructor(props) {
    super(props);
    this.files = {};
    this.eventManager = eventManagers[0];
    this.uploadStart = this.uploadStart.bind(this);
    this.cancelUpload = this.cancelUpload.bind(this);
    this.makeProgress = this.makeProgress.bind(this);
    this.onClose = this.onClose.bind(this);
    this.errorShown = false;
  }

  uploadStart({ files: startedFiles }) {
    startedFiles.forEach(file => {
      this.files[file.fileId] = file;
      this.makeProgress(file.fileId);
    });
  };

  cancelUpload({ files: canceledFiles }) {
    canceledFiles.forEach(file => {
      file.canceled = true;
      this.files[file.fileId] = file;
      this.eventManager.emit(FileUploadActions.uploadProgress, { files: [file] });
    });
  };

  makeProgress(id) {
    const file = this.files[id];

    if (file) {
      const uploaderId = file.uploaderId;
      const timeout = (Math.floor(Math.random() * 3) + 1) * 1000;
      const currentProgress = file.progress || 0;

      if (currentProgress < 100 && !file.canceled && !file.error) {
        file.progress = Math.min(currentProgress + (Math.floor(Math.random() * 10) + 11), 100);
        this.eventManager.emit(FileUploadActions.uploadProgress, { files: [file] });

        if (file.progress < 100) {
          setTimeout(() => this.makeProgress(id), timeout);
        } else {
          if (!this.errorShown) {
            this.errorShown = true;
            this.eventManager.emit(FileUploadActions.uploadFailure, { files: [{...file, error: 'upload_204'}] });
          } else {
            this.eventManager.emit(FileUploadActions.uploadSuccess, { files: [file] });
          }
        }
      }

      this.files[file.fileId] = file;
    }
  };

  translate(error) {
    switch(error) {
      case 'upload_204':
        return 'Localized message for error 204';
      default:
        return `No localization for ${error}`;
    }
  }

  onClose() {
    this.files = {};
  };

  render() {
    return (
      <div>
        <h1>First upload component</h1>
        <FileUploaderDetails
          events={this.eventManager}
          onUpload={this.uploadStart}
          onCancel={this.cancelUpload}
          onClose={this.onClose}
          translate={this.translate}
        />
        <FileUploader
          multiple
          onChange={(e) => console.log('Files updated in first component', e)}>
          Add File(s)
        </FileUploader>
        <h1>Second upload component</h1>
        <FileUploader
          multiple
          onChange={(e) => console.log('Files updated in second component', e)}>
          Add File(s)
        </FileUploader>
      </div>
    );
  }
}

<FileUploaderDetailsExample/>
```
