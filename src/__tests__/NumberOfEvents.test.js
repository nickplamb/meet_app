import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents numberOfEvents={32} updateCount={() => {}} />);
  });

  test('render input for number of events', () => {
    expect(NumberOfEventsWrapper.find('input.number-of-events__input')).toHaveLength(1);
  });

  test('input should be of type number', () => {
    expect(NumberOfEventsWrapper.find('input.number-of-events__input').prop('type')).toBe('number');
  });

  test('number in state should default to 32', () => {
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
  });

  test('change state to number inputed into input', () => {
    const eventObject = { target: { value: 12 } };
    NumberOfEventsWrapper.find('.number-of-events__input').simulate('change', eventObject);

    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(12);
  });

});