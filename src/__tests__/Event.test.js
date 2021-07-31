import React from 'react';
import { shallow } from 'enzyme';
import { expect } from '@jest/globals';

import { mockData } from '../mock-data';

import { extractDateTime } from '../api';
import Event from '../components/Event';

describe('<Event /> component', () => {

  let EventWrapper;
  const event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={ event } />);
  });

  test('render event title block', () => {
    expect(EventWrapper.find('.event-title')).toHaveLength(1);
  });

  test('render event title text correctly', () => {
    expect(EventWrapper.find('.event-title').text()).toBe(event.summary);
  });

  test('render basic event information block', () => {
    expect(EventWrapper.find('.basic-details')).toHaveLength(1);
  });

  test('render basic information text correctly', () => {
    const eventDateTime = extractDateTime(event);
    const basicDetails = `${eventDateTime} @${event.summary} | ${event.location}`;
    
    expect(EventWrapper.find('.basic-details').text()).toBe(basicDetails);
  });

  test('render show details button', () => {
    expect(EventWrapper.find('button.details-btn')).toHaveLength(1);
  });

  test('show details button text should default to "Show Details" when toggled', () => {
    EventWrapper.setState({ showDetails: false });

    expect(EventWrapper.find('button.details-btn').text()).toBe('Show Details');
  });

  test('Change showDetails state to true when show details button is pressed', () => {
    EventWrapper.setState({ showDetails: false });
    EventWrapper.find('button.details-btn').simulate('click', {});

    expect(EventWrapper.state('showDetails')).toBe(true);
  });

  test('more details is hidden be defaults', () => {
    EventWrapper.setState({ showDetails: false });
    expect(EventWrapper.find('.more-details')).toHaveLength(0);
  });

  test('render more details when button is pressed and state changes', () => {
    EventWrapper.setState({ showDetails: false });
    EventWrapper.find('button.details-btn').simulate('click', {});

    expect(EventWrapper.find('.more-details')).toHaveLength(1);
  });

  test('show details button text should change to "Hide Details" when toggled', () => {
    EventWrapper.setState({ showDetails: true });

    expect(EventWrapper.find('button.details-btn').text()).toBe('Hide Details');
  });

  test('render a link element within more details', () => {
    EventWrapper.setState({ showDetails: true });
    
    expect(EventWrapper.find('a.event-link')).toHaveLength(1);
  });

  test('render the correct link within more details', () => {
    EventWrapper.setState({ showDetails: true });
    
    expect(EventWrapper.find('a.event-link').prop('href')).toBe(event.htmlLink);
  });

  test('render event description element', () => {
    EventWrapper.setState({ showDetails: true });

    expect(EventWrapper.find('p.event-description')).toHaveLength(1)
  });

  test('render the correct text within more details', () => {
    EventWrapper.setState({ showDetails: true });

    expect(EventWrapper.find('p.event-description').text()).toBe(event.description);
  });

  test('hide details when the hide details button is pressed ', () => {
    EventWrapper.setState({ showDetails: true });
    EventWrapper.find('button.details-btn').simulate('click', {});
    
    expect(EventWrapper.find('.more-details')).toHaveLength(0);
  });
});