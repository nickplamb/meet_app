import React from 'react';
import { shallow } from 'enzyme';
import { expect } from '@jest/globals';

import App from '../App';
import EventList from '../components/EventList'
import CitySearch from '../components/CitySearch'

describe('<App /> component', () => {

  test('render event list component', () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
});