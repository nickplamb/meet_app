import React from 'react';
import { shallow } from 'enzyme';
import { describe } from '@jest/globals';

import EventList from '../components/EventList';
import Event from '../components/Event';

describe('<EventList /> component', () => {

  test('render the correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={ [{ id:1 }, { id:2 }, { id:3 }, { id:4 }] } />);
    expect(EventListWrapper.find(Event)).toHaveLength(4);
  });
});