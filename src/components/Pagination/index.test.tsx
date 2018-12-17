import * as React from 'react';
import * as enzyme from 'enzyme';
import { Pagination } from './';

describe('<Pagination />', () => {
  it('should render empty default <Pagination /> element', () => {
    const wrapper = enzyme.shallow(<Pagination />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to use an in-built host', () => {
    const wrapper = enzyme.mount(
      <Pagination host="ul">
        <li>First</li>
        <li>Second</li>
      </Pagination>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to use a custom host', () => {
    const wrapper = enzyme.mount(
      <Pagination
        host={({ children }) => (
          <ul>
            <li>My custom zero-th</li>
            {children}
          </ul>
        )}>
        <li>First</li>
        <li>Second</li>
      </Pagination>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should limit the number of children', () => {
    const wrapper = enzyme.mount(
      <Pagination size={5}>
        <div className="foo">First</div>
        <div className="foo">Second</div>
        <div className="foo">3</div>
        <div className="foo">4</div>
        <div className="foo">5</div>
        <div className="foo">6</div>
      </Pagination>,
    );
    expect(wrapper.find('.foo')).toHaveLength(5);
  });

  it('should respect the default value and the number of children', () => {
    const wrapper = enzyme.mount(
      <Pagination size={5} defaultValue={1}>
        <div className="foo">First</div>
        <div className="foo">Second</div>
        <div className="foo">3</div>
        <div className="foo">4</div>
        <div className="foo">5</div>
        <div className="foo">6</div>
        <div className="foo">7</div>
      </Pagination>,
    );
    expect(wrapper.find('.foo')).toHaveLength(2);
  });
});
