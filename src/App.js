import React, { Component } from 'react';

import './App.css';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

import { mockData } from './mock-data';
import { extractLocations, getEvents } from './api';

class App extends Component {
  state = {
    events:[],
    locations: [],
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then(events => {
      if (this.mounted) {
        this.setState({ locations: extractLocations(events) })
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = location => {
    getEvents().then(events => {
      const locationEvents = (location === 'all') ? events: events.filter(event => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  }

  render() {
    return (
      <div className="App">
       <CitySearch locations={ this.state.locations } updateEvents={ this.updateEvents } />
       <NumberOfEvents />
       <EventList events={ this.state.events } />
      </div>
    );
  }
}

export default App;