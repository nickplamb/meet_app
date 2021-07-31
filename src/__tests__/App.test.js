import React from 'react';
import { shallow, mount } from 'enzyme';
import { beforeAll, afterAll, expect } from '@jest/globals';

import App from '../App';
import EventList from '../components/EventList';
import Event from '../components/Event';
import CitySearch from '../components/CitySearch';
import NumberOfEvents from '../components/NumberOfEvents';

import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {

  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

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

describe('<App /> integration', () => {

  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');

    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');

    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching city selected by user and set App state', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    const numberOfEvents = AppWrapper.state('numberOfEvents');
    
    expect(AppWrapper.state('events')).toEqual(eventsToShow.slice(0, numberOfEvents));
    expect(AppWrapper.state('selectedLocation')).toEqual(selectedCity);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    const numberOfEvents = AppWrapper.state('numberOfEvents');

    expect(AppWrapper.state('events')).toEqual(allEvents.slice(0, numberOfEvents));
    AppWrapper.unmount();
  });

  test('App passes "numberOfEvents" state as a prop to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');

    expect(AppNumberOfEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(AppNumberOfEventsState);
    AppWrapper.unmount();
  });

  test('NumberOfEvents receives numberOfEvents and displays as default value in input', () => {
    const AppWrapper = mount(<App />);
    const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');

    expect(AppWrapper.find(NumberOfEvents).find('#number-of-events__input').prop('value')).toEqual(AppNumberOfEventsState);
    AppWrapper.unmount();
  });

  test('change App state when NumberOfEvents input is changed', async () => {
    const AppWrapper = mount(<App />);
    const eventObject = { target: { value: 17 } };
    await AppWrapper.find(NumberOfEvents).find('#number-of-events__input').simulate('change', eventObject);

    expect(AppWrapper.state('numberOfEvents')).toEqual(17);
    AppWrapper.unmount();
  });

  test('App state has number of events selected in NumberOfEvents', async () => {
    const AppWrapper = mount(<App />);
    const eventObject = { target: { value: 17 } };
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    NumberOfEventsWrapper.find('.number-of-events__input').simulate('change', eventObject)
    const eventsNumber = NumberOfEventsWrapper.state('numberOfEvents');
    const allEvents = await getEvents();
    const numberOfEventsToShow = allEvents.slice(0, eventsNumber).length;

    expect(AppWrapper.state('events').length).toEqual(numberOfEventsToShow);
    AppWrapper.unmount();
  });
});