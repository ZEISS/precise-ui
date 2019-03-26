import * as Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, render, mount } from 'enzyme';

// React 16 Enzyme adapter
configure({
  adapter: new Adapter(),
});

declare const global: any;

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.requestAnimationFrame = (cb: any) => setTimeout(cb, 0);

global.matchMedia = jest.fn(() => ({
  matches: true,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

jest.mock('memoize-one', () => ({ default: a => a }));
