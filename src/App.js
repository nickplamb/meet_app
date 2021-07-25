import React, { Component } from 'react';

import './App.css';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

import { mockData } from './mock-data';
import { extractLocations } from './api';

class App extends Component {
  render() {
    return (
      <div className="App">
       <CitySearch locations={ extractLocations(mockData) } />
       <NumberOfEvents />
       <EventList events={ mockData } />
      </div>
    );
  }
}

export default App;
