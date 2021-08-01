import React, { Component } from 'react';

import './App.css';
import './nprogress.css';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import WelcomeScreen from './components/WelcomeScreen';
import { WarningAlert } from './components/Alert';

import { extractLocations, getEvents, checkToken, getAccessToken } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events:[],
      locations: [],
      numberOfEvents: 32,
      selectedLocation: 'all',
      showWelcomeScreen: undefined,
    };

  }

  async componentDidMount() {
    this.mounted = true;
    const { numberOfEvents } = this.state;

    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if((code || isTokenValid) && this.mounted) {
      getEvents().then(events => {
        if (this.mounted) {
          this.setState({ 
            events: events.slice(0, numberOfEvents), 
            locations: extractLocations(events) 
          });
        }
      });
    }
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
    if(this.state.showWelcomeScreen === undefined) return <div className="App" />

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
        <WelcomeScreen 
          showWelcomeScreen={ this.state.showWelcomeScreen } 
          getAccessToken={ () => getAccessToken() } 
        />
      </div>
    );
  }
}

export default App;