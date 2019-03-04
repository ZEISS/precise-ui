import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { showInputInfo } from '../../utils/input';
import { FileImagePreview, StyledFileImagePreview, StyledFileItem, StyledFileList } from '../../quarks';
import { FormContextProps, withFormContext } from '../../hoc/withFormContext';
import { Icon, IconName } from '../Icon';
import { InputChangeEvent, InputProps } from '../../common';
import { FileSelectOpenEvent } from '../FileSelect';
import { IconLink } from '../IconLink';
import { Spinner } from '../Spinner';
import { distance } from '../../distance';

export type DropzoneOpenEvent = FileSelectOpenEvent;
export type DropzoneChangeEvent = InputChangeEvent<Array<File>>;

export interface DropzoneProps extends InputProps<Array<File>> {
  /**
   * Show preview instead of file list.
   */
  preview?: boolean;
  /**
   * Allow adding multiple files.
   */
  multiple?: boolean;
  /**
   * Optionally chooses an icon to display.
   * @default "FileDownload"
   */
  icon?: IconName;
  /**
   * Event fired when the file picker should be opened.
   */
  onOpen?(e: DropzoneOpenEvent): void;
  /**
   * Message for dragging files to show on drop area.
   * @default "Drop files here to upload"
   */
  message?: string;
}

function getFiles(target: Array<File>, files: any = []) {
  target.push(...files);
  return target;
}

export interface DropzoneState {
  value: Array<File>;
  controlled: boolean;
  over: boolean;
  previews: Array<FileImagePreview>;
}

interface StyledDropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
  disabled?: boolean;
}

const StyledDropzone = styled.div<StyledDropzoneProps>(
  themed(
    ({ disabled, active, theme }) => css`
      width: 100%;
      height: 100%;
      min-height: 150px;
      margin: 0 auto;
      padding: ${distance.medium};
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: ${disabled ? theme.textDisabled : theme.text3};
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      background-color: ${disabled ? theme.ui3 : active ? theme.ui2 : theme.ui1};
      border: 1px ${disabled ? `solid ${theme.ui1}` : `dashed ${active ? theme.ui0 : theme.ui4}`};
      cursor: ${disabled ? 'no-drop' : 'pointer'};
      box-sizing: border-box;
    `,
  ),
);

const DropzoneLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  pointer-events: none;
`;

const StyledLabel = styled.span`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

interface StyledActionProps {
  active: boolean;
  disabled?: boolean;
}

const StyledAction = styled.div<StyledActionProps>`
  margin-top: ${distance.small};
  visibility: ${props => (props.active || props.disabled ? 'hidden' : 'visible')};
`;

const FileInput = styled.input`
  display: none;
`;

const Remove = styled.div`
  cursor: pointer;
  line-height: 1;
`;

class DropzoneInt extends React.Component<DropzoneProps & FormContextProps, DropzoneState> {
  private fileInput: HTMLInputElement | null;
  constructor(props: DropzoneProps) {
    super(props);
    const value = props.value || props.defaultValue || [];
    this.state = {
      over: false,
      controlled: props.value !== undefined,
      value,
      previews: [],
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

  componentWillReceiveProps(e: DropzoneProps) {
    const { controlled, value } = this.state;

    if (controlled && e.value && value !== e.value) {
      this.setState(() => ({
        value: e.value || [],
        previews: [],
      }));
    }
  }

  private addFileEntries = (files: Array<File>) => {
    const { multiple, form, name = '' } = this.props;

    if (!this.state.controlled) {
      if (form) {
        form.change({
          name,
          value: multiple ? [...this.state.value, ...files] : files,
        });
      } else {
        this.setState(
          prevState => ({
            value: multiple ? [...prevState.value, ...files] : files,
            previews: [],
          }),
          () => this.notifyChanges(this.state.value),
        );
      }
    } else {
      this.notifyChanges(multiple ? [...this.state.value, ...files] : files);
    }
  };

  private onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  private onDragEnter = () => {
    this.setState({ over: true });
  };

  private onDragLeave = () => {
    this.setState({ over: false });
  };

  private onOpenAction = () => {
    const { onOpen } = this.props;
    let open = true;

    if (typeof onOpen === 'function') {
      onOpen({
        preventDefault() {
          open = false;
        },
      });
    }

    return open;
  };

  private onDrop = (ev: React.DragEvent) => {
    ev.preventDefault();
    this.setState({ over: false });
    const acceptFiles = this.onOpenAction();

    if (!this.props.disabled && acceptFiles) {
      const droppedFiles = getFiles([], ev.dataTransfer.files);
      const files = this.props.multiple ? droppedFiles : [droppedFiles[0]];
      this.addFileEntries(files);
    }
  };

  private onClick = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = getFiles([], ev.target.files);

    if (files) {
      this.addFileEntries(files);
    }

    ev.preventDefault();
  };

  private setInputRef = (el: HTMLInputElement) => {
    this.fileInput = el;
  };

  private openFilePicker = () => {
    const open = this.onOpenAction();

    if (open && this.fileInput) {
      this.fileInput.click();
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

  private renderItem(f: File) {
    return (
      <StyledFileItem key={f.name} name={f.name}>
        <Remove onClick={() => this.removeFileEntry(f)}>
          <Icon name="RemoveCircle" size={1} />
        </Remove>
      </StyledFileItem>
    );
  }

  private renderPreview(f: File) {
    const preview = this.state.previews.filter(preview => preview.file === f)[0];

    if (f.size > 1000000 || !f.type.match(/image/)) {
      return this.renderItem(f);
    }

    if (preview) {
      return (
        <StyledFileImagePreview key={f.name} src={preview.data}>
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
      <StyledFileImagePreview key={f.name}>
        <Spinner size="small" />
      </StyledFileImagePreview>
    );
  }

  render() {
    const { value, over } = this.state;
    const {
      message = 'Drop files here to upload',
      multiple,
      error,
      info,
      icon = 'FileDownload',
      theme,
      value: _0,
      defaultValue: _1,
      disabled,
      onChange: _2,
      preview: _3,
      children,
      ...props
    } = this.props;

    return (
      <div {...props}>
        <StyledDropzone
          active={over}
          disabled={disabled}
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDragEnter={this.onDragEnter}
          onClick={this.openFilePicker}>
          <DropzoneLabel>
            <Icon name={icon} size={2} />
            <StyledLabel>
              {message}
              <FileInput
                disabled={disabled}
                ref={this.setInputRef}
                type="file"
                multiple={multiple}
                value=""
                onChange={this.onClick}
              />
              <StyledAction active={over} disabled={disabled}>
                <IconLink icon="Add">{children}</IconLink>
              </StyledAction>
            </StyledLabel>
          </DropzoneLabel>
        </StyledDropzone>
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

export const Dropzone = withFormContext(DropzoneInt);
Dropzone.displayName = 'Dropzone';
