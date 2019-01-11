import * as React from 'react';
import { mount } from 'enzyme';
import { withResponsiveMode, ModeProviderProps } from './withResponsiveMode';
import { RefProps } from './withResponsive';

type Modes = 'table' | 'card';
const Test: React.SFC<ModeProviderProps<Modes> & RefProps> = ({ innerRef }) => <div ref={innerRef} />;

describe('withResponsiveMode', () => {
  const TestWithMode = withResponsiveMode(width => (width > 500 ? 'table' : 'card'))(Test);

  it('renders component with correct mode', () => {
    global.innerWidth = 501;
    const wrapper = mount(<TestWithMode />);
    expect(
      wrapper
        .find(Test)
        .first()
        .prop('mode'),
    ).toEqual('table');

    global.innerWidth = 499;
    const wrapper = mount(<TestWithMode />);
    expect(
      wrapper
        .find(Test)
        .first()
        .prop('mode'),
    ).toEqual('card');
  });

  it('takes mode from props when component in the controlled mode', () => {
    global.innerWidth = 501;
    const wrapper = mount(<TestWithMode mode="card" />);
    expect(
      wrapper
        .find(Test)
        .first()
        .prop('mode'),
    ).toEqual('card');
  });

  it('fires callback when mode is changed', () => {
    const mockCallback = jest.fn();
    window.innerWidth = 499;
    const wrapper = mount(<TestWithMode onModeChange={mockCallback} />);
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 501,
      height: 120,
    }));
    window.dispatchEvent(new Event('resize'));
    expect(mockCallback.mock.calls.length).toEqual(2);
  });
});
