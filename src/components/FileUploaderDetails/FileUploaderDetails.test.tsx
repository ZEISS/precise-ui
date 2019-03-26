import * as React from 'react';
import { shallow } from 'enzyme';
import { SimpleEventManager } from '../../utils/eventManager';
import { FileProgress, FileUploadActions, FileUploaderDetails } from './';
import { UploaderProgressBar } from './UploaderProgressBar.part';
import { UploaderProgressDetails } from './UploaderProgressDetails.part';
import { mergeData } from './helpers';

describe('<FileUploaderDetails />', () => {
  const events = new SimpleEventManager();
  const onUpload = jest.fn();
  const onCancel = jest.fn();
  const noop = () => {};
  const defaultWrapper = shallow(<FileUploaderDetails events={events} onUpload={onUpload} onCancel={onCancel} />);

  it('should call onUpload function on `Start Upload` event with selected files and show uploader bar', done => {
    events.emit(FileUploadActions.startUpload, {
      files: [
        { fileId: '1', name: 'file1.jpg', uploaderId: '1', file: {} },
        { fileId: '2', name: 'file2.jpg', uploaderId: '2', file: {} },
      ],
    });
    setTimeout(() => {
      expect(onUpload).toHaveBeenCalledTimes(1);
      expect(defaultWrapper.state('showUploader')).toEqual(true);
      done();
    }, 10);
  });

  it('should store file progress in component state', done => {
    expect(defaultWrapper.state('files').length).toEqual(0);
    events.emit(FileUploadActions.uploadProgress, {
      files: [
        { fileId: '1', name: 'file1.jpg', uploaderId: '1', progress: 12 },
        { fileId: '2', name: 'file2.jpg', uploaderId: '2', progress: 6 },
      ],
    });
    setTimeout(() => {
      expect(defaultWrapper.state('files').length).toEqual(2);
      done();
    }, 10);
  });

  it('should show progress bar with loading bar on updates', done => {
    events.emit(FileUploadActions.uploadProgress, {
      files: [
        { fileId: '1', name: 'file1.jpg', uploaderId: '1', progress: 12 },
        { fileId: '2', name: 'file2.jpg', uploaderId: '2', progress: 6 },
      ],
    });
    setTimeout(() => {
      expect(defaultWrapper.state('files').length).toEqual(2);
      expect(
        defaultWrapper
          .update()
          .find(UploaderProgressBar)
          .props().progressValue,
      ).toEqual(9);
      events.emit(FileUploadActions.uploadProgress, {
        files: [
          { fileId: '1', name: 'file1.jpg', uploaderId: '1', progress: 50 },
          { fileId: '2', name: 'file2.jpg', uploaderId: '2', progress: 30 },
        ],
      });
      setTimeout(() => {
        expect(
          defaultWrapper
            .update()
            .find(UploaderProgressBar)
            .props().progressValue,
        ).toEqual(40);
        done();
      }, 10);
    }, 10);
  });

  it('mergeData function should perform merge correctly', done => {
    const date = new Date();
    const files: Array<FileProgress> = [
      {
        fileId: '1',
        name: 'file1.jpg',
        uploaderId: '1',
        progress: 12,
        canceled: false,
        scanning: false,
        deleted: false,
        timestamp: date,
        data: {},
        type: 'image/jpeg',
      },
      {
        fileId: '2',
        name: 'file2.jpg',
        uploaderId: '1',
        progress: 6,
        canceled: false,
        deleted: false,
        scanning: false,
        timestamp: date,
        data: {},
        type: 'image/jpeg',
      },
      {
        fileId: '3',
        name: 'file3.jpg',
        uploaderId: '1',
        progress: 52,
        canceled: false,
        deleted: false,
        scanning: false,
        timestamp: date,
        data: {},
        type: 'image/jpeg',
      },
    ];

    const updatedFiles: Array<FileProgress> = [
      {
        fileId: '1',
        name: 'file1.jpg',
        uploaderId: '1',
        progress: 98,
        deleted: false,
        canceled: false,
        scanning: false,
        timestamp: date,
        data: {},
        type: 'image/jpeg',
      },
      {
        fileId: '2',
        name: 'file2.jpg',
        uploaderId: '1',
        progress: 26,
        deleted: false,
        canceled: false,
        scanning: false,
        timestamp: date,
        data: {},
        type: 'image/jpeg',
      },
    ];

    const result: Array<FileProgress> = [
      {
        fileId: '1',
        name: 'file1.jpg',
        uploaderId: '1',
        progress: 98,
        deleted: false,
        canceled: false,
        scanning: false,
        timestamp: date,
        data: {},
        type: 'image/jpeg',
      },
      {
        fileId: '2',
        name: 'file2.jpg',
        uploaderId: '1',
        progress: 26,
        deleted: false,
        canceled: false,
        scanning: false,
        timestamp: date,
        data: {},
        type: 'image/jpeg',
      },
      {
        fileId: '3',
        name: 'file3.jpg',
        uploaderId: '1',
        progress: 52,
        deleted: false,
        canceled: false,
        scanning: false,
        timestamp: date,
        data: {},
        type: 'image/jpeg',
      },
    ];
    expect(mergeData(updatedFiles, files)).toEqual(result);
    done();
  });

  it('should show table when view details has been clicked', done => {
    const files = [
      { fileId: '1', name: 'file1.jpg', uploaderId: '1', progress: 12 },
      { fileId: '2', name: 'file2.jpg', uploaderId: '2', progress: 6 },
    ];
    defaultWrapper.setState({ showDetails: false, files });
    expect(defaultWrapper.find(UploaderProgressBar).length).toBe(1);
    defaultWrapper.setState({ showDetails: true });
    expect(defaultWrapper.find(UploaderProgressBar).length).toBe(0);
    expect(defaultWrapper.find(UploaderProgressDetails).length).toBe(1);
    done();
  });
});
