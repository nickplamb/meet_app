import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from '@jest/globals';

import Event from '../components/Event';

import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  let EventWrapper;
  const event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={ event } />);
  });
  
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('event elements are listed out for a user', () => {
    });
    
    when('a user has not selected any events', () => {
      
    });
    
    then('the events details section is collapsed', () => {
      expect(EventWrapper.find('.more-details')).toHaveLength(0);
    });
  });
  
  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('a list of events are displayed for a user', () => {
      
    });

    when('a user presses the expand icon for an event', () => {
      EventWrapper.find('button.details-btn').simulate('click');
    });

    then('the event details should expand to be visible to the user', () => {
      expect(EventWrapper.find('.more-details')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('a user has expanded the details section for an event', () => {
      EventWrapper.setState({ showDetails: true });
    });
    
    when('a user presses the collapse icon for that event', () => {
      EventWrapper.find('button.details-btn').simulate('click', {});
    });
    
    then('the details section should collapse out of view to the user', () => {
      expect(EventWrapper.find('.more-details')).toHaveLength(0);
    });
  });

});