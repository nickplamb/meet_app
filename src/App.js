import React, { Component } from 'react';

import './App.css';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';

class App extends Component {
  render() {
    return (
      <div className="App">
       <CitySearch />
       <EventList />
      </div>
    );
  }
}

export default App;
