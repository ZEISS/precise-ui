import * as React from 'react';
import * as enzyme from 'enzyme';
import { Grid } from './';
import { GridArea } from '../GridArea';

describe('<Grid />', () => {
  it('should render a 1x1 grid by default', () => {
    const wrapper = enzyme.mount(<Grid />);
    expect(wrapper.state('layout').rows.length).toBe(1);
    expect(wrapper.state('layout').columns.length).toBe(1);
  });

  it('should render a 2x3 grid if set', () => {
    const wrapper = enzyme.mount(<Grid rows={2} columns={3} />);
    expect(wrapper.state('layout').rows.length).toBe(2);
    expect(wrapper.state('layout').columns.length).toBe(3);
  });

  it('should render a <Grid> component with two columns', () => {
    const wrapper = enzyme.shallow(
      <Grid rows={1} columns={['1fr', '1fr']}>
        <div>First</div>
        <div>Second</div>
      </Grid>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Grid> component with custom spacing', () => {
    const wrapper = enzyme.shallow(
      <Grid columns={1} rows={['1fr', '1fr']} spacing="5px">
        <div>First</div>
        <div>Second</div>
      </Grid>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should distribute cells correctly with explicit and implicit placement', () => {
    const wrapper = enzyme.shallow(
      <Grid columns={5} rows={5}>
        <GridArea rowSpan={5}>First</GridArea>
        <GridArea>Second</GridArea>
        <GridArea colSpan={4}>Third</GridArea>
        <GridArea rowSpan={3}>Fourth</GridArea>
        <GridArea>Fifth</GridArea>
        <GridArea colSpan={2}>Sixth</GridArea>
        <GridArea>Seventh</GridArea>
        <GridArea column={2} row={4} />
        <GridArea rowSpan={3}>9</GridArea>
      </Grid>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should populate grid with unused cells when showEmptyCells property provided', () => {
    const wrapper = enzyme.shallow(
      <Grid rows={5} columns={3} spacing="5px" showEmptyCells>
        <GridArea>1</GridArea>
        <GridArea rowSpan={2}>2</GridArea>
        <GridArea colSpan={3}>3</GridArea>
        <GridArea>4</GridArea>
        <GridArea>5</GridArea>
        <GridArea>6</GridArea>
      </Grid>,
    );
    expect(wrapper.childAt(0).children().length).toEqual(15);
  });
});
