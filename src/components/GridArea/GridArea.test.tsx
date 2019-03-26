import * as React from 'react';
import * as enzyme from 'enzyme';
import { GridArea } from './';

describe('<GridArea />', () => {
  it('should render an empty <GridArea> component', () => {
    const wrapper = enzyme.shallow(<GridArea />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <GridArea> component with children', () => {
    const wrapper = enzyme.shallow(
      <GridArea>
        <div>Test1</div>
        <div>Test2</div>
      </GridArea>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <GridArea> component with column and row span', () => {
    const wrapper = enzyme.shallow(<GridArea colSpan={2} rowSpan={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <GridArea> component with column and row span', () => {
    const wrapper = enzyme.shallow(<GridArea colSpan={2} rowSpan={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <GridArea> component with column and row index', () => {
    const wrapper = enzyme.shallow(<GridArea column={2} row={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <GridArea> component with column index and row span including children', () => {
    const wrapper = enzyme.shallow(
      <GridArea column={2} colSpan={3}>
        Test
      </GridArea>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
