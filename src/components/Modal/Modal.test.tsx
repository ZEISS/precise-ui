import * as React from 'react';
import * as enzyme from 'enzyme';
import { Modal } from './';

jest.useFakeTimers();
const flushPromises = () => new Promise(setImmediate);

describe('<Modal />', () => {
  it('should render an empty <Modal> component', () => {
    const wrapper = enzyme.shallow(<Modal>Content</Modal>);
    expect(wrapper.text()).toBe('');
  });

  it('should trigger onClose callback when clicking close button', async () => {
    const mockCallback = jest.fn();
    const wrapper = enzyme.mount(
      <Modal open onClose={mockCallback}>
        Content
      </Modal>,
    );
    wrapper.find('CloseButton').simulate('click');
    await flushPromises();
    jest.runAllTimers();
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('should trigger onBeforeClose callback when clicking close button', () => {
    const closeMockCallback = () => {};
    const beforeCloseMockCallback = jest.fn();
    const wrapper = enzyme.mount(
      <Modal open onClose={closeMockCallback} onBeforeClose={beforeCloseMockCallback}>
        Content
      </Modal>,
    );
    wrapper.find('CloseButton').simulate('click');
    jest.runAllTimers();

    expect(beforeCloseMockCallback.mock.calls.length).toBe(1);
  });

  it('should trigger onClose callback if onBeforeClose returns true', async () => {
    const closeMockCallback = jest.fn();
    const beforeCloseMockCallback = jest.fn(() => true);
    const wrapper = enzyme.mount(
      <Modal open onClose={closeMockCallback} onBeforeClose={beforeCloseMockCallback}>
        Content
      </Modal>,
    );
    wrapper.find('CloseButton').simulate('click');
    await flushPromises();
    jest.runAllTimers();
    expect(closeMockCallback.mock.calls.length).toBe(1);
  });

  it('should not trigger onClose callback if onBeforeClose returns false', async () => {
    const closeMockCallback = jest.fn();
    const beforeCloseMockCallback = jest.fn(() => false);
    const wrapper = enzyme.mount(
      <Modal open onClose={closeMockCallback} onBeforeClose={beforeCloseMockCallback}>
        Content
      </Modal>,
    );
    wrapper.find('CloseButton').simulate('click');
    await flushPromises();
    jest.runAllTimers();
    expect(closeMockCallback.mock.calls.length).toBe(0);
  });

  it('should trigger onClose callback if onBeforeClose returns Promise<true>', async () => {
    const closeMockCallback = jest.fn();
    const beforeCloseMockCallback = () => Promise.resolve(true);
    const wrapper = enzyme.mount(
      <Modal open onClose={closeMockCallback} onBeforeClose={beforeCloseMockCallback}>
        Content
      </Modal>,
    );
    wrapper.find('CloseButton').simulate('click');
    await flushPromises();
    jest.runAllTimers();
    expect(closeMockCallback.mock.calls.length).toBe(1);
  });

  it('should not trigger onClose callback if onBeforeClose returns Promise<false>', async () => {
    const closeMockCallback = jest.fn();
    const beforeCloseMockCallback = () => Promise.resolve(false);
    const wrapper = enzyme.mount(
      <Modal open onClose={closeMockCallback} onBeforeClose={beforeCloseMockCallback}>
        Content
      </Modal>,
    );
    wrapper.find('CloseButton').simulate('click');
    await flushPromises();
    jest.runAllTimers();
    expect(closeMockCallback.mock.calls.length).toBe(0);
  });
});
