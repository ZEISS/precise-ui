import * as React from 'react';
import { shallow } from 'enzyme';
import { Notifications, notify } from './';
import { SimpleEventManager } from '../../utils/eventManager';

describe('<Notification />', () => {
  const defaultWrapper = shallow(<Notifications />);

  it('should display all notifications inside one `Notifications` container', done => {
    notify({ content: 'notification 1' });
    notify({ content: 'notification 2' });
    notify({ content: 'notification 3' });
    setTimeout(() => {
      expect(defaultWrapper.state('notifications').length).toEqual(3);
      done();
    }, 10);
  });

  it('should display notifications inside newly created container', done => {
    const myEventManager = new SimpleEventManager();
    const notificationsContainer = shallow(<Notifications events={myEventManager} />);
    notify({ content: 'notification 3', options: { events: myEventManager } });
    notify({ content: 'notification 3', options: { events: myEventManager } });
    notify({ content: 'notification 3', options: { events: myEventManager } });
    notify({ content: 'notification 3' });

    setTimeout(() => {
      expect(defaultWrapper.state('notifications').length).toEqual(4);
      expect(notificationsContainer.state('notifications').length).toEqual(3);
      done();
    }, 10);
  });
});
