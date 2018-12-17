import * as React from 'react';
import * as enzyme from 'enzyme';
import { RadioButton } from './';
import { RadioButtonGroupContextType, RadioButtonGroupNotifier } from '../../contexts';

function getRadioButtonWithContext(radioGroupCtx?: RadioButtonGroupContextType) {
  jest.doMock('../../contexts', () => ({
    RadioButtonGroupContext: {
      Consumer: props => props.children(radioGroupCtx),
    },
    FormContext: {
      Consumer: props => props.children(),
    },
  }));

  return require('./').RadioButton;
}

beforeEach(() => {
  jest.resetModules();
});

describe('<RadioButton />', () => {
  it('should render the disabled, uncontrolled RadioButton', () => {
    const wrapper = enzyme.shallow(<RadioButton disabled defaultValue />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the controlled RadioButton with a label', () => {
    const wrapper = enzyme.shallow(<RadioButton value>Value</RadioButton>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should subscribe for received context', () => {
    let subscribed = false;
    const radioGroupCtx = {
      subscribe(radio: RadioButtonGroupNotifier) {
        if (radio) {
          subscribed = true;
        }
      },
      unsubscribe() {},
      select() {},
    };
    const RadioButtonWithContext = getRadioButtonWithContext(radioGroupCtx);
    const wrapper = enzyme.mount(<RadioButtonWithContext>Value</RadioButtonWithContext>);
    expect(subscribed).toEqual(true);
  });

  it('should skip context subscribe in controlled mode (value set)', () => {
    let subscribed = false;
    const radioGroupCtx = {
      subscribe(radio: RadioButtonGroupNotifier) {
        subscribed = true;
      },
      unsubscribe() {},
      select() {},
    };
    const RadioButtonWithContext = getRadioButtonWithContext(radioGroupCtx);
    const wrapper = enzyme.mount(<RadioButtonWithContext value>Value</RadioButtonWithContext>);
    expect(subscribed).toEqual(false);
  });

  it('should unsubscribe from context when unmounted', () => {
    let unsubscribed = false;
    const radioGroupCtx = {
      unsubscribe(radio: RadioButtonGroupNotifier) {
        if (radio) {
          unsubscribed = true;
        }
      },
      subscribe() {},
      select() {},
    };
    const RadioButtonWithContext = getRadioButtonWithContext(radioGroupCtx);
    const wrapper = enzyme.mount(<RadioButtonWithContext>Value</RadioButtonWithContext>);
    wrapper.unmount();
    expect(unsubscribed).toEqual(true);
  });

  it('should skip unsubscribing from context when unmounted while in controlled mode (value set)', () => {
    let unsubscribed = false;
    const radioGroupCtx = {
      unsubscribe(radio: RadioButtonGroupNotifier) {
        unsubscribed = true;
      },
      subscribe() {},
      select() {},
    };
    const RadioButtonWithContext = getRadioButtonWithContext(radioGroupCtx);
    const wrapper = enzyme.mount(<RadioButtonWithContext value>Value</RadioButtonWithContext>);
    wrapper.unmount();
    expect(unsubscribed).toEqual(false);
  });

  it('should notify context when selected', () => {
    let selected = false;
    const radioGroupCtx = {
      select(radio: RadioButtonGroupNotifier) {
        if (radio) {
          selected = true;
        }
      },
      subscribe() {},
      unsubscribe() {},
    };
    const RadioButtonWithContext = getRadioButtonWithContext(radioGroupCtx);
    const wrapper = enzyme.mount(<RadioButtonWithContext name="radio">Value</RadioButtonWithContext>);
    wrapper
      .find({ name: 'radio' })
      .first()
      .simulate('click');
    expect(selected).toEqual(true);
  });

  it('should not notify context when trying to select disabled RadioButton', () => {
    let selected = false;
    const radioGroupCtx = {
      select(radio: RadioButtonGroupNotifier) {
        if (radio) {
          selected = true;
        }
      },
      subscribe() {},
      unsubscribe() {},
    };
    const RadioButtonWithContext = getRadioButtonWithContext(radioGroupCtx);
    const wrapper = enzyme.mount(
      <RadioButtonWithContext disabled name="radio">
        Value
      </RadioButtonWithContext>,
    );
    wrapper
      .find({ name: 'radio' })
      .first()
      .simulate('click');
    expect(selected).toEqual(false);
  });
});
