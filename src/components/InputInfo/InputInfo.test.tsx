import * as React from 'react';
import * as enzyme from 'enzyme';
import { InputInfo } from './';
import { TextField } from '../TextField';
import { withValidation } from '../../hoc/withValidation';

describe('<InputInfo />', () => {
  it('should render <InputInfo> that has an error message', () => {
    const wrapper = enzyme.shallow(<InputInfo>I am wrong</InputInfo>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render an <InputInfo> from jsx', () => {
    const wrapper = enzyme.shallow(<InputInfo />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render an <InputInfo> from direct API without any children', () => {
    const wrapper = enzyme.shallow(React.createElement(InputInfo));
    expect(wrapper).toMatchSnapshot();
  });

  it('should be shown with the withValidation hoc if not changed', () => {
    const RequiredTextField = withValidation(({ value }) => !value && 'Input is required')(TextField);
    const wrapper = enzyme.mount(<RequiredTextField info="Required input" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not be shown with the withValidation hoc if changed', () => {
    const RequiredTextField = withValidation(({ value }) => !value && 'Input is required')(TextField);
    const wrapper = enzyme.mount(<RequiredTextField info="Required input" />);
    (wrapper.instance() as any).validate({
      value: '',
    });
    expect(wrapper).toMatchSnapshot();
  });
});
