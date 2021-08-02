import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import './App.css';
import './nprogress.css';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import WelcomeScreen from './components/WelcomeScreen';
import EventGenre from './components/EventGenre';
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

    // const accessToken = localStorage.getItem('access_token');
    // const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    // const searchParams = new URLSearchParams(window.location.search);
    // const code = searchParams.get('code');
    // this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    // if((code || isTokenValid) && this.mounted) {
      getEvents().then(events => {
        if (this.mounted) {
          this.setState({ 
            events: events.slice(0, numberOfEvents), 
            locations: extractLocations(events) 
          });
        }
      });
    // }
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map(location => {
      const number = events.filter(event => event.location === location).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  }

  render() {
    const { locations, numberOfEvents, events, showWelcomeScreen } = this.state;
    // if(this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        <h1>Meet App</h1>
        <CitySearch 
          locations={ locations } 
          updateEvents={ this.updateEvents } 
          numberOfEvents={ numberOfEvents }
        />
        <NumberOfEvents 
          numberOfEvents={ numberOfEvents } 
          updateCount={ this.updateCount } 
        />
        { !navigator.onLine ? <WarningAlert text="You are currently offline. The data shown may not be current." /> : ''}
        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
          <EventGenre events={ events } />
          <ResponsiveContainer height={ 400 }>
            <ScatterChart 
              width={ 800 } 
              height={ 400 }
              margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="City" />
              <YAxis type="number" dataKey="number" name="Number of Events" allowDecimals={ false } />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={ this.getData() } fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={ events } />
        <WelcomeScreen 
          showWelcomeScreen={ showWelcomeScreen } 
          getAccessToken={ () => getAccessToken() } 
        />
      </div>
    );
  }
}

export default App;