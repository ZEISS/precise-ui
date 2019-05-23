import * as React from 'react';
import * as enzyme from 'enzyme';
import { Spinner } from './';

describe('<Spinner />', () => {
  it('should render the default spinner in medium without label', () => {
    const wrapper = enzyme.mount(<Spinner />);
    const label = wrapper.find('label');
    expect(label.length).toBe(0);
    expect(wrapper).toHaveStyleRule('visibility', 'visible');
  });

  it('should render the hidden spinner', () => {
    const wrapper = enzyme.mount(<Spinner hidden />);
    const label = wrapper.find('label');
    expect(label.length).toBe(0);
    expect(wrapper).toHaveStyleRule('visibility', 'hidden');
  });

  it('should render the spinner in extra large', () => {
    const wrapper = enzyme.mount(<Spinner size="x-large" />);
    expect(wrapper.text()).toBe('');
  });

  it('should render the spinner with a label', () => {
    const wrapper = enzyme.mount(<Spinner>Loading...</Spinner>);
    const label = wrapper.find('label');
    expect(wrapper.text()).toBe('Loading...');
    expect(label.length).toBe(1);
    expect(label.at(0)).toHaveStyleRule('font-size', '0.875rem');
  });

  it('should feature a smaller font-size for the tiny spinner', () => {
    const wrapper = enzyme.mount(<Spinner size="x-small">Loading...</Spinner>);
    const label = wrapper.find('label');
    expect(wrapper.text()).toBe('Loading...');
    expect(label.length).toBe(1);
    expect(label.at(0)).toHaveStyleRule('font-size', '0.75rem');
  });
});
