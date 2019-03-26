import * as React from 'react';
import * as enzyme from 'enzyme';
import { WindowPopup } from './';
import { CloseButton } from '../CloseButton';

describe('<WindowPopup />', () => {
  it('should render <WindowPopup> component', () => {
    const wrapper = enzyme.mount(<WindowPopup>Content</WindowPopup>);
    expect(wrapper.text()).toMatch('Content');
  });

  it('should behave correctly in non controlled mode', () => {
    const onCloseClick = jest.fn();
    const wrapper = enzyme.mount(<WindowPopup onClick={onCloseClick}>Content</WindowPopup>);
    wrapper.find(CloseButton).simulate('click');
    expect(onCloseClick).toBeCalled();
  });
});
