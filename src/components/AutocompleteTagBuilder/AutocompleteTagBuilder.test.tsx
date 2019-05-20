import * as React from 'react';
import * as enzyme from 'enzyme';
import { AutocompleteTagBuilder } from './index';
import { InteractiveList } from '../InteractiveList';
import { KeyCodes } from '../../utils/keyCodes';
import 'jest-styled-components';

describe('<AutocompleteTagBuilder />', () => {
  it('should render <AutocompleteTagBuilder> component', () => {
    const wrapper = enzyme.shallow(
      <AutocompleteTagBuilder suggestions={['one', 'two', 'three']} defaultValue={['five']} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should show suggestions list when focused', () => {
    const wrapper = enzyme.mount(
      <AutocompleteTagBuilder suggestions={['one', 'two', 'three']} defaultValue={['five']} />,
    );
    // tslint:disable-next-line:no-string-literal
    global['cancelAnimationFrame'] = jest.fn();
    wrapper
      .find('div')
      .at(0)
      .prop('onFocus')({} as React.FocusEvent);
    expect(wrapper.update().find('li')).toHaveLength(3);

    // tslint:disable-next-line:no-string-literal
    delete global['cancelAnimationFrame'];
  });

  it('should maintain input focus after suggestion is selected', () => {
    const wrapper = enzyme.mount(
      <AutocompleteTagBuilder suggestions={['one', 'two', 'three']} defaultValue={['five']} />,
    );
    // tslint:disable-next-line:no-string-literal
    global['cancelAnimationFrame'] = jest.fn();
    wrapper
      .find('div')
      .at(0)
      .prop('onFocus')({} as React.FocusEvent);
    const suggestions = wrapper.update().find(InteractiveList);
    suggestions.simulate('keyDown', {
      keyCode: KeyCodes.down,
      stopPropagation() {},
      preventDefault() {},
    });
    suggestions.simulate('keyDown', {
      keyCode: KeyCodes.enter,
      stopPropagation() {},
      preventDefault() {},
    });

    expect(wrapper.find('input').getDOMNode()).toBe(document.activeElement);

    // tslint:disable-next-line:no-string-literal
    delete global['cancelAnimationFrame'];
  });
});
