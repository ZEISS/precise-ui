import * as React from 'react';
import * as enzyme from 'enzyme';
import { Spider } from './';

describe('<Spider />', () => {
  it('should render <Spider>', () => {
    const wrapper = enzyme.shallow(<Spider />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show two simple nodes in the <Spider>', () => {
    const nodes = [
      {
        title: 'Some title',
        head: 'Some head',
      },
      {
        title: 'Other title',
        head: 'Other head',
      },
    ];
    const wrapper = enzyme.shallow(<Spider nodes={nodes} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show two connected nodes in the <Spider>', () => {
    const nodes = [
      {
        title: 'Some title',
        head: 'Some head',
        connected: 'other',
      },
      {
        id: 'other',
        title: 'Other title',
        head: 'Other head',
      },
    ];
    const wrapper = enzyme.shallow(<Spider nodes={nodes} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show two child nodes in the <Spider>', () => {
    const nodes = [
      {
        title: <b>Foo</b>,
        head: 'Some head',
      },
      {
        title: <b>Bar</b>,
        head: (
          <h2>
            My <u>head</u>
          </h2>
        ),
      },
    ];
    const wrapper = enzyme.shallow(<Spider nodes={nodes} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show three simple nodes using custom spacing in the <Spider>', () => {
    const nodes = [
      {
        title: 'Some title',
        head: 'Some head',
      },
      {
        title: 'Other title',
        head: 'Other head',
      },
      {
        title: 'Last title',
        head: 'Last head',
      },
    ];
    const wrapper = enzyme.shallow(<Spider nodes={nodes} nodeSpacing={20} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show three simple nodes using node width in the <Spider>', () => {
    const nodes = [
      {
        title: 'Some title',
        head: 'Some head',
      },
      {
        title: 'Other title',
        head: 'Other head',
      },
      {
        title: 'Last title',
        head: 'Last head',
      },
    ];
    const wrapper = enzyme.shallow(<Spider nodes={nodes} nodeWidth={200} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show five connected nodes in the <Spider>', () => {
    const nodes = [
      {
        id: '1',
        title: 'First',
        head: 'The head',
        connected: '5',
      },
      {
        id: '2',
        title: 'Second',
        head: 'The head',
        connected: '4',
      },
      {
        id: '3',
        title: 'Third',
        head: 'The head',
        connected: '4',
      },
      {
        id: '4',
        title: 'Fourth',
        head: 'The head',
      },
      {
        id: '5',
        title: 'Fifth',
        head: 'The head',
      },
    ];
    const wrapper = enzyme.shallow(<Spider nodes={nodes} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show two connected nodes with body in the <Spider>', () => {
    const nodes = [
      {
        title: 'Some title',
        head: 'Some head',
        body: <div>Foo</div>,
        connected: 'other',
      },
      {
        id: 'other',
        title: 'Other title',
        body: 'bar',
        head: 'Other head',
      },
    ];
    const wrapper = enzyme.shallow(<Spider nodes={nodes} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show a node with body elements in the <Spider>', () => {
    const nodes = [
      {
        title: 'Some title',
        head: 'Some head',
        body: [<div key="foo">Foo</div>, 'Hello', <span key="final">Final</span>],
      },
    ];
    const wrapper = enzyme.shallow(<Spider nodes={nodes} />);
    expect(wrapper).toMatchSnapshot();
  });
});
