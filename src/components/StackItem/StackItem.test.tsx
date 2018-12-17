import * as React from 'react';
import * as enzyme from 'enzyme';
import { StackItem } from './';

describe('<StackItem />', () => {
  it('should render the default StackItem', () => {
    const wrapper = enzyme.mount(<StackItem />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the StackItem with some content', () => {
    const wrapper = enzyme.mount(<StackItem>Item</StackItem>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the StackItem with height and width declaration', () => {
    const wrapper = enzyme.mount(
      <StackItem width="40%" height="15px">
        Content
      </StackItem>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the StackItem with width declaration', () => {
    const wrapper = enzyme.mount(<StackItem width="20px" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the StackItem with no filling', () => {
    const wrapper = enzyme.mount(<StackItem nofill />);
    expect(wrapper).toMatchSnapshot();
  });
});
