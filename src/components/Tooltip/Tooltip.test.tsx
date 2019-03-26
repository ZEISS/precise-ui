import * as React from 'react';
import * as enzyme from 'enzyme';
import { Tooltip } from './';
import { Button } from '../Button';

describe('<Tooltip />', () => {
  it('should render a tooltip with simple text content over the wrapped component', () => {
    const wrapper = enzyme.shallow(<Tooltip content={'Tooltip content'}>Wrapped element</Tooltip>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an open tooltip (controlled state)', () => {
    const wrapper = enzyme.shallow(
      <Tooltip open content={'Tooltip content'}>
        Wrapped element
      </Tooltip>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a tooltip with custom position (auto)', () => {
    const wrapper = enzyme.shallow(<Tooltip content={'Tooltip content'}>Wrapped element</Tooltip>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an open tooltip with custom position (top)', () => {
    const wrapper = enzyme.shallow(
      <Tooltip open position={'top'} content={'Tooltip content'}>
        Wrapped element
      </Tooltip>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an open tooltip with custom position (left)', () => {
    const wrapper = enzyme.shallow(
      <Tooltip open position={'left'} content={'Tooltip content'}>
        Wrapped element
      </Tooltip>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a tooltip over the complex component', () => {
    const wrapper = enzyme.shallow(
      <Tooltip open content={'Tooltip content'}>
        <Button>Button</Button>
      </Tooltip>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a tooltip over the complex content', () => {
    const wrapper = enzyme.shallow(
      <Tooltip
        content={
          <div style={{ width: '200px' }}>
            <h4 style={{ textAlign: 'center' }}>Header</h4>
            <span>Text content</span>
          </div>
        }>
        Wrapped element
      </Tooltip>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
