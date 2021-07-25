import React from 'react';
import { shallow } from 'enzyme';
import { beforeAll, expect } from '@jest/globals';

import App from '../App';
import EventList from '../components/EventList';
import CitySearch from '../components/CitySearch';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<App /> component', () => {

  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  })

  test('render event list component', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents component', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});