import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { beforeAll, expect } from '@jest/globals';

import Event from '../components/Event';
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';

import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    let AppWrapper;
    given('a user has visited the home page', async () => {
      AppWrapper = await mount(<App />);
    });

    when('the user has not selected a specific number of events to view', () => {

    });

    then('the app should display 32 events', () => {
      // Mock data only holds 2 events
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given('a user may or may not have searched for a city', async () => {
      AppWrapper = await mount(<App />);
    });

    when('a user selects a number of events', () => {
      AppWrapper.find(NumberOfEvents).find('#numberOfEvents__input').simulate('change', { target: { value: 1 } });
    });

    then('the number of events visible to the user changes to match the selected amount', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(1);
    });
  });

});