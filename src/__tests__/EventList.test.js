import React from 'react';
import { shallow } from 'enzyme';
import { describe } from '@jest/globals';

import EventList from '../components/EventList';
import Event from '../components/Event';

import { mockData } from '../mock-data';

describe('<EventList /> component', () => {

  test('render the correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={ mockData } />);
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
  });
});