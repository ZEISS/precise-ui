import * as React from 'react';
import styled from '../../utils/styled';
import { FileImagePreview, StyledFileImagePreview, StyledFileItem, StyledFileList } from '../../quarks';
import { FormContextProps, withFormContext } from '../../hoc/withFormContext';
import { InputChangeEvent, InputProps } from '../../common';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import { showInputInfo } from '../../utils/input';

export type FileSelectChangeEvent = InputChangeEvent<Array<File>>;

export interface FileSelectOpenEvent {
  preventDefault(): void;
}

export interface FileSelectProps extends InputProps<Array<File>> {
  /**
   * Show preview instead of file list.
   */
  preview?: boolean;
  /**
   * Allow selecting multiple files.
   */
  multiple?: boolean;
  /**
   * The content of the fileselect.
   */
  children?: React.ReactNode;
  /**
   * Event fired when the file picker should be opened.
   */
  onOpen?(e: FileSelectOpenEvent): void;
}

export interface FileSelectState {
  value: Array<File>;
  error?: React.ReactChild;
  controlled: boolean;
  previews: Array<FileImagePreview>;
}

const FileInput = styled.input`
  display: none;
`;

const Remove = styled.div`
  cursor: pointer;
  line-height: 1;
`;

function getFiles(target: Array<File>, files: any = []) {
  target.push(...files);
  return target;
}

class FileSelectInt extends React.Component<FileSelectProps & FormContextProps, FileSelectState> {
  private fileInput: HTMLInputElement | null;

  constructor(props: FileSelectProps) {
    super(props);
    const value = props.value || props.defaultValue || [];
    this.state = {
      value,
      controlled: props.value !== undefined,
      previews: [],
      error: props.error,
    };
  }

  componentDidMount() {
    const { form } = this.props;
    const { controlled } = this.state;

    if (!controlled && form) {
      form.subscribe(this);
    }
  }

  componentWillUnmount() {
    const { form } = this.props;
    const { controlled } = this.state;

    if (!controlled && form) {
      form.unsubscribe(this);
    }
  }

  componentWillReceiveProps({ value = [], error }: FileSelectProps) {
    if (this.state.controlled && value && this.state.value !== value) {
      this.setState({
        value,
        previews: [],
      });
    }
    this.setState({ error });
  }

  private addFileEntries = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { multiple, form, name = '' } = this.props;
    const files = ev.target.files;

    if (!this.state.controlled) {
      if (form) {
        form.change({
          name,
          value: getFiles(multiple ? [...this.state.value] : [], files),
        });
      } else {
        this.setState(
          prevState => ({
            value: getFiles(multiple ? [...prevState.value] : [], files),
            previews: [],
          }),
          () => this.notifyChanges(this.state.value),
        );
      }
    } else {
      this.notifyChanges(getFiles(multiple ? [...this.state.value] : [], files));
    }
  };

  private removeFileEntry(f: File) {
    const { form, name = '' } = this.props;

    if (!this.state.controlled) {
      if (form) {
        form.change({
          name,
          value: this.state.value.filter(file => f !== file),
        });
      } else {
        this.setState(
          prevState => ({
            value: prevState.value.filter(file => f !== file),
            previews: prevState.previews.filter(preview => preview.file !== f),
          }),
          () => this.notifyChanges(this.state.value),
        );
      }
    } else {
      const files = this.state.value.filter(file => f !== file);
      this.notifyChanges(files);
    }
  }

  private notifyChanges(files: Array<File>) {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange({
        value: files,
      });
    }
  }

  private renderPreview(f: File) {
    const preview = this.state.previews.filter(preview => preview.file === f)[0];

    if (f.size > 1000000 || !f.type.match(/image/)) {
      return this.renderItem(f);
    }

    if (preview) {
      return (
        <StyledFileImagePreview src={preview.data}>
          <Remove onClick={() => this.removeFileEntry(f)}>
            <Icon name="RemoveCircle" size={1} />
          </Remove>
        </StyledFileImagePreview>
      );
    }

    const reader = new FileReader();
    reader.onload = (file => () => {
      const result = reader.result;
      typeof result === 'string' &&
        this.setState(prevState => ({
          previews: [
            ...prevState.previews,
            {
              file,
              data: result,
            },
          ],
        }));
    })(f);
    reader.readAsDataURL(f);

    return (
      <StyledFileImagePreview>
        <Spinner size="small" />
      </StyledFileImagePreview>
    );
  }

  private renderItem(f: File) {
    return (
      <StyledFileItem key={f.name} name={f.name}>
        <Remove onClick={() => this.removeFileEntry(f)}>
          <Icon name="RemoveCircle" size={1} />
        </Remove>
      </StyledFileItem>
    );
  }

  private setInputRef = (el: HTMLInputElement) => {
    this.fileInput = el;
  };

  private openFilePicker = () => {
    const { onOpen } = this.props;
    let open = true;

    if (typeof onOpen === 'function') {
      onOpen({
        preventDefault() {
          open = false;
        },
      });
    }

    if (open && this.fileInput) {
      this.fileInput.click();
    }
  };

  render() {
    const { children, disabled, multiple, info } = this.props;
    const { value, error } = this.state;

    return (
      <div>
        <Button onClick={this.openFilePicker} disabled={disabled} buttonStyle="secondary" type="button">
          {children}
        </Button>
        <FileInput ref={this.setInputRef} type="file" multiple={multiple} onChange={this.addFileEntries} value="" />
        {value && value.length > 0 && (
          <StyledFileList>
            {value.map(file => (this.props.preview ? this.renderPreview(file) : this.renderItem(file)))}
          </StyledFileList>
        )}
        {showInputInfo(error, info)}
      </div>
    );
  }
}

/**
 * A custom field for handling file selection.
 */
export const FileSelect = withFormContext(FileSelectInt);
FileSelect.displayName = 'FileSelect';
