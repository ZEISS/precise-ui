import * as React from 'react';
import * as enzyme from 'enzyme';
import { InputError } from './';
import { TextField } from '../TextField';
import { withValidator } from '../../hoc/withValidator';

describe('<InputError />', () => {
  it('should render <InputError> that has an error message', () => {
    const wrapper = enzyme.shallow(<InputError>I am wrong</InputError>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render an <InputError> from jsx', () => {
    const wrapper = enzyme.shallow(<InputError />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render an <InputError> from direct API without any children', () => {
    const wrapper = enzyme.shallow(React.createElement(InputError));
    expect(wrapper).toMatchSnapshot();
  });

  it('should not be shown with the withValidator hoc if not changed', () => {
    const RequiredTextField = withValidator(TextField, ({ value }) => !value && 'Input is required');
    const wrapper = enzyme.mount(<RequiredTextField />);
    expect(wrapper.state('error')).toEqual(undefined);
  });

  it('should be shown with the withValidator hoc if changed', () => {
    const RequiredTextField = withValidator(TextField, ({ value }) => !value && 'Input is required');
    const wrapper = enzyme.mount(<RequiredTextField />);
    (wrapper.instance() as any).validate({
      value: '',
    });
    expect(wrapper.state('error')).not.toEqual('');
  });
});
