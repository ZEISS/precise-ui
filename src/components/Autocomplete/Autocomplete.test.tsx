import * as React from 'react';
import * as enzyme from 'enzyme';
import { Autocomplete } from './';

describe('<Autocomplete />', () => {
  it('should render <Autocomplete> component', () => {
    const wrapper = enzyme.shallow(<Autocomplete suggestions={['one', 'two', 'three']} defaultValue="five" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show suggestions list when focused', () => {
    const wrapper = enzyme.mount(<Autocomplete suggestions={['one', 'two', 'three']} defaultValue="five" />);
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
});
