import * as React from 'react';
import * as enzyme from 'enzyme';
import { Modal } from './';

jest.useFakeTimers();

describe('<Modal />', () => {
  it('should render an empty <Modal> component', () => {
    const wrapper = enzyme.shallow(<Modal>Content</Modal>);
    expect(wrapper.text()).toBe('');
  });

  it('should trigger onClose callback when clicking close button', () => {
    const mockCallback = jest.fn();
    const wrapper = enzyme.mount(
      <Modal open onClose={mockCallback}>
        Content
      </Modal>,
    );
    wrapper.find('CloseButton').simulate('click');
    jest.runAllTimers();

    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
