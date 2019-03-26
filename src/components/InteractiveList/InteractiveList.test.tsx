import * as React from 'react';
import { shallow } from 'enzyme';
import { InteractiveListItem, InteractiveListChangeEvent } from './InteractiveList.types.part';
import { InteractiveListInt } from './InteractiveListInt.part';
import { Icon } from '../Icon';
import { KeyCodes } from '../../utils/keyCodes';

describe('<InteractiveList', () => {
  it('selecting an item in a list', () => {
    let changed = false;
    let value = [];
    const changeHandler = (e: InteractiveListChangeEvent) => {
      changed = true;
      value = e.value;
    };
    const wrapper = shallow(<InteractiveListInt open data={['1', '2']} onChange={changeHandler} />);

    wrapper.setState({
      selected: 0,
    });

    wrapper.simulate('keyDown', {
      keyCode: KeyCodes.space,
      stopPropagation() {},
      preventDefault() {},
    });

    expect(changed).toBe(true);
    expect(value).toEqual([0]);
  });

  it('selecting multiple items in a multiple list', () => {
    let changed = false;
    let value = [];
    const changeHandler = (e: InteractiveListChangeEvent) => {
      changed = true;
      value = e.value;
    };
    const wrapper = shallow(<InteractiveListInt open data={['1', '2']} multiple onChange={changeHandler} />);
    wrapper.setState({
      selected: 0,
    });
    wrapper.simulate('keyDown', {
      keyCode: KeyCodes.space,
      stopPropagation() {},
      preventDefault() {},
    });
    wrapper.setState({
      selected: 1,
    });
    wrapper.simulate('keyDown', {
      keyCode: KeyCodes.enter,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(changed).toBe(true);
    expect(value).toEqual([0, 1]);
  });

  it('hovering an item in a list using keydown (down arrow)', () => {
    const wrapper = shallow(<InteractiveListInt open data={['1', '2']} />);
    wrapper.simulate('keyDown', {
      keyCode: KeyCodes.down,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.state('selected')).toBe(0);
  });

  it('hovering an item in a list using keydown (up arrow)', () => {
    const wrapper = shallow(<InteractiveListInt open data={['1', '2']} />);
    wrapper.simulate('keyDown', {
      keyCode: KeyCodes.up,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.state('selected')).toBe(1);
  });

  it('hovering an item in a list using keydown (jump to h)', () => {
    const wrapper = shallow(<InteractiveListInt open data={['Abc', 'Def', 'Gul', 'Huk', 'Muh', 'Zik', 'Foo']} />);
    wrapper.simulate('keyDown', {
      keyCode: 72,
      key: 'h',
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.state('selected')).toBe(3);
  });

  it('hovering an item in a list using keydown (end)', () => {
    const wrapper = shallow(<InteractiveListInt open data={['Abc', 'Def', 'Gul']} />);
    wrapper.simulate('keyDown', {
      keyCode: KeyCodes.end,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.state('selected')).toBe(2);
  });

  it('hovering an item in a list using keydown (home)', () => {
    const wrapper = shallow(<InteractiveListInt open data={['Abc', 'Def', 'Gul']} />);
    wrapper.simulate('keyDown', {
      keyCode: KeyCodes.home,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.state('selected')).toBe(0);
  });

  it('selecting an item using keydown (enter)', () => {
    const wrapper = shallow(<InteractiveListInt open data={['Abc', 'Def', 'Gul']} />);
    wrapper.setState({
      selected: 1,
    });
    wrapper.simulate('keyDown', {
      keyCode: KeyCodes.enter,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.state('value')).toEqual([1]);
  });

  it('should call onBlur handler after pressing escape', () => {
    const blurHandler = jest.fn();
    const wrapper = shallow(<InteractiveListInt open data={['Abc', 'Def', 'Gul']} onBlur={blurHandler} />);
    wrapper.simulate('keyDown', {
      keyCode: KeyCodes.escape,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(blurHandler.mock.calls.length).toBe(1);
  });

  it('hovering an item in a list skips headers and dividers using keydown (down arrow)', () => {
    const data: Array<string | InteractiveListItem> = [
      '1',
      { key: '2', type: 'divider' },
      { key: '3', content: 'Group', type: 'header' },
      { key: '4', content: 'Value', type: 'item' },
      { key: '5', type: 'divider' },
      '6',
      { key: '7', type: 'divider' },
    ];
    const wrapper = shallow(<InteractiveListInt open data={data} />);
    wrapper.setState({
      selected: 0,
    });
    wrapper.simulate('keyDown', {
      keyCode: KeyCodes.down,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.state('selected')).toBe(3);
  });

  it('hovering an item in a list skips headers and dividers using keydown (up arrow)', () => {
    const data: Array<string | InteractiveListItem> = [
      '1',
      { key: '2', type: 'divider' },
      { key: '3', content: 'Group', type: 'header' },
      { key: '4', content: 'Value', type: 'item' },
      { key: '5', type: 'divider' },
      '6',
      { key: '7', type: 'divider' },
    ];
    const wrapper = shallow(<InteractiveListInt open data={data} />);
    wrapper.setState({
      selected: 0,
    });
    wrapper.simulate('keyDown', {
      keyCode: KeyCodes.up,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.state('selected')).toBe(5);
  });

  describe('jumpTo', () => {
    const items = ['Value 1', 'Value 2', 'Value 3', 'Foo1', 'Value 5', 'Value 6', 'Value 7', 'Foo2'];

    it('should jump to first available item', () => {
      const wrapper = shallow(<InteractiveListInt data={items} open />);
      const instance = wrapper.instance() as any;
      instance.jumpTo('v');
      expect(wrapper.state().selected).toEqual(0);
    });

    it('should jump to 3rd element after pressing 3 times v', () => {
      const wrapper = shallow(<InteractiveListInt data={items} open />);
      const instance = wrapper.instance() as any;
      for (let i = 0; i < 3; i++) {
        instance.jumpTo('v');
      }
      expect(wrapper.state().selected).toEqual(2);
    });

    it('should jump to 1st element after pressing 7 times v', () => {
      const wrapper = shallow(<InteractiveListInt data={items} open />);
      const instance = wrapper.instance() as any;
      for (let i = 0; i < 7; i++) {
        instance.jumpTo('v');
      }
      expect(wrapper.state().selected).toEqual(0);
    });

    it('should jump to 4th element after f', () => {
      const wrapper = shallow(<InteractiveListInt data={items} open />);
      const instance = wrapper.instance() as any;
      instance.jumpTo('f');
      expect(wrapper.state().selected).toEqual(3);
    });

    it('should jump to 8th element after pressing key f 2 times', () => {
      const wrapper = shallow(<InteractiveListInt data={items} open />);
      const instance = wrapper.instance() as any;
      instance.jumpTo('f');
      instance.jumpTo('f');
      expect(wrapper.state().selected).toEqual(7);
    });

    it('should jump back to 4th element after pressing key f 3 times', () => {
      const wrapper = shallow(<InteractiveListInt data={items} open />);
      const instance = wrapper.instance() as any;
      instance.jumpTo('f');
      instance.jumpTo('f');
      instance.jumpTo('f');
      expect(wrapper.state().selected).toEqual(3);
    });

    describe('with dividers and headers', () => {
      const items = [
        { key: 'group1', content: <span>Group 1</span>, type: 'header' },
        {
          key: 'Value1',
          content: (
            <b>
              Value <i>one</i>
            </b>
          ),
          searchText: 'Value one',
        },
        { key: 'Value2', content: <span>Value 2</span> },
        { key: 'sep', type: 'divider' },
        { key: 'group2', content: <span>Group 2</span>, type: 'header' },
        {
          key: 'Value3',
          content: (
            <span>
              <Icon name="AddCircle" /> Apples
            </span>
          ),
          searchText: 'Apple',
        },
      ];

      it('should jump to first value after pressing `v` 3 times', () => {
        const wrapper = shallow(<InteractiveListInt open data={items} />);
        const instance = wrapper.instance() as any;
        for (let i = 0; i < 3; i++) {
          instance.jumpTo('v');
        }
        expect(wrapper.state().selected).toEqual(1);
      });
    });
  });
});
