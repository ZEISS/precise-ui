import * as React from 'react';
import * as enzyme from 'enzyme';
import { Label } from './';

describe('<Label />', () => {
  it('should render <Label> without content', () => {
    const wrapper = enzyme.shallow(<Label />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Label> with content', () => {
    const wrapper = enzyme.shallow(<Label>Test</Label>);
    expect(wrapper).toMatchSnapshot();
  });
});
