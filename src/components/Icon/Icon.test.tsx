import * as React from 'react';
import * as enzyme from 'enzyme';
import { Icon } from './';
import { registerIcons, registeredIcons } from './registerIcons';

describe('<Icon />', () => {
  it('should render an eye icon', () => {
    const wrapper = enzyme.mount(<Icon name="Visibility" />);
    expect(wrapper.find('i').length > 0).toBeTruthy();
  });

  it('should render nothing if wrong icon name', () => {
    const wrapper = enzyme.shallow(<Icon name="Foo" />);
    expect(wrapper.type()).toBeNull();
  });

  it('should render the eye icon in red', () => {
    const wrapper = enzyme.mount(<Icon name="Visibility" color="red" />).mount();
    expect(wrapper.find('svg').prop('style').fill).toBe('red');
  });
});

describe('registerIcons', () => {
  it('should store registered icons', () => {
    registerIcons({
      Foo: (
        <svg>
          <path d="M281.6 819.2c-42.347 0-76.8-34.451-76.8-76.8s34.453-76.8 76.8-76.8 76.8 34.451 76.8 76.8-34.453 76.8-76.8 76.8zM281.6 716.8c-14.115 0-25.6 11.485-25.6 25.6s11.485 25.6 25.6 25.6 25.6-11.485 25.6-25.6-11.485-25.6-25.6-25.6z" />
        </svg>
      ),
      Bar: (
        <svg>
          <path d="M281.6 819.2c-42.347 0-76.8-34.451-76.8-76.8s34.453-76.8 76.8-76.8 76.8 34.451 76.8 76.8-34.453 76.8-76.8 76.8zM281.6 716.8c-14.115 0-25.6 11.485-25.6 25.6s11.485 25.6 25.6 25.6 25.6-11.485 25.6-25.6-11.485-25.6-25.6-25.6z" />
        </svg>
      ),
    });
    expect(registeredIcons).toHaveProperty('Foo');
    expect(registeredIcons).toHaveProperty('Bar');
    expect(registeredIcons).not.toHaveProperty('Baz');
  });
});
