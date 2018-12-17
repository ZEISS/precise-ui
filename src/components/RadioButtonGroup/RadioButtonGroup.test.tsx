import * as React from 'react';
import * as enzyme from 'enzyme';
import { RadioButtonGroup } from './';
import { RadioButton } from '../RadioButton';
import { RadioButtonGroupContextType, RadioButtonGroupNotifier } from '../../contexts/RadioButtonGroupContext';

beforeEach(() => {
  jest.resetModules();
});

describe('<RadioButtonGroup />', () => {
  it('<RadioButtonGroup />', () => {});

  // Enzyme known bug when testing new React Context API. Details:
  // https://github.com/airbnb/enzyme/issues/1509
  // https://github.com/airbnb/enzyme/pull/1513
  // Uncomment when fixed

  // it('should render the default RadioButtonGroup', () => {
  //   const wrapper = enzyme.mount(<RadioButtonGroup />);
  //   expect(wrapper).toMatchSnapshot();
  // });

  // it('should render the RadioButtonGroup with three items', () => {
  //   const wrapper = enzyme.mount(
  //     <RadioButtonGroup>
  //       <RadioButton>First</RadioButton>
  //       <RadioButton>Second</RadioButton>
  //       <RadioButton>Third</RadioButton>
  //     </RadioButtonGroup>,
  //   );
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('should create context object and pass it to context provider', () => {
    const TestContextProvider = props => <div />;

    function getRadioButtonGroupWithContext() {
      jest.doMock('../../contexts/RadioButtonGroupContext', () => ({
        RadioButtonGroupContext: {
          Provider: props => <TestContextProvider {...props} />,
        },
      }));
      jest.doMock('../../hoc/withFormContext', () => ({
        withFormContext(Component: React.ComponentType) {
          return props => <Component {...props}>{props.children}</Component>;
        },
      }));

      return require('./').RadioButtonGroup;
    }

    const RadioButtonGroupWithContext = getRadioButtonGroupWithContext();
    const wrapper = enzyme.mount(<RadioButtonGroupWithContext />);
    expect(wrapper.find('TestContextProvider').prop('value')).toBeDefined();
  });
});
