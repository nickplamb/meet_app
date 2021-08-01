import React, { Component } from 'react';

import './App.css';
import './nprogress.css';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { WarningAlert } from './components/Alert';

import { extractLocations, getEvents } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events:[],
      locations: [],
      numberOfEvents: 32,
      selectedLocation: 'all',
    };

  }

  componentDidMount() {
    this.mounted = true;
    const { numberOfEvents } = this.state;
    getEvents().then(events => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(0, numberOfEvents), 
          locations: extractLocations(events) 
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, numberOfEvents) => {
    getEvents().then(events => {
      const locationEvents = (location === 'all') ? events : events.filter(event => event.location === location);
      this.setState({
        selectedLocation: location,
        events: locationEvents.slice(0, numberOfEvents),
        numberOfEvents: numberOfEvents,
      });
    });
  }

  updateCount = newCount => {
    const { selectedLocation } = this.state;
    this.updateEvents(selectedLocation, newCount);
  }

  render() {
    return (
      <div className="App">
        <h1>Meet App</h1>
        <CitySearch 
          locations={ this.state.locations } 
          updateEvents={ this.updateEvents } 
          numberOfEvents={ this.state.numberOfEvents }
        />
        <NumberOfEvents 
          numberOfEvents={ this.state.numberOfEvents } 
          updateCount={ this.updateCount } 
        />
        { !navigator.onLine ? <WarningAlert text="You are currently offline. The data shown may not be current." /> : ''}
        <EventList events={ this.state.events } />
      </div>
    );
  }
}

export default App;