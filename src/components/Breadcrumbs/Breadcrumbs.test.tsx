import * as React from 'react';
import * as enzyme from 'enzyme';
import { Breadcrumbs } from './';
import { Breadcrumb } from '../Breadcrumb';

describe('<Breadcrumbs />', () => {
  it('should render an basic <Breadcrumbs> component', () => {
    const wrapper = enzyme.shallow(
      <Breadcrumbs>
        <Breadcrumb title="Title" />
      </Breadcrumbs>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Breadcrumbs> component with several children', () => {
    const wrapper = enzyme.mount(
      <Breadcrumbs>
        <Breadcrumb title="First" />
        <Breadcrumb title="Second" />
        <Breadcrumb title="Third" />
        <Breadcrumb title="Last" />
      </Breadcrumbs>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Breadcrumbs> component with several children and size() set', () => {
    const wrapper = enzyme.shallow(
      <Breadcrumbs size={3}>
        <Breadcrumb title="First" to="/1" />
        <Breadcrumb title="Second" to="/2" />
        <Breadcrumb title="Third" to="/3" />
        <Breadcrumb title="Fourth" to="/4" />
        <Breadcrumb title="Fifth" to="/5" />
      </Breadcrumbs>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
