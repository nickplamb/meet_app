import React, { Component } from 'react';

import { InfoAlert } from './Alert';

export default class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: false,
    infoText: '',
  }

  handleInputChanged = e => {
    const value = e.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter(location => {
      return location.toUpperCase().indexOf(value.toUpperCase())> -1;
    });
    if(suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'We can not find the city you are looking for. Please try another city.',
      });
    } else {
      this.setState({ 
        query: value,
        suggestions,
        infoText: ''
      });
    }
  };

  handleItemClicked = suggestion => {
    this.setState({ 
      query: suggestion,
      showSuggestions: false,
      infoText: '',
    });

    this.props.updateEvents(suggestion, this.props.numberOfEvents);
  }

  render() {
    const { query, suggestions, showSuggestions } = this.state;
    
    return (
      <div className="CitySearch">
        <InfoAlert text={ this.state.infoText } />
        <label htmlFor="city-search__input">Select a City:</label>
        <input 
          type="text"
          className="city"
          id="city-search__input"
          value={ query }
          onChange={ this.handleInputChanged }
          // onFocus={ () => this.setState({ showSuggestions: true }) }
        />
        <ul 
          className="suggestions" 
          style={ showSuggestions ? {} : { display: 'none' } } 
        >
          {suggestions.map(suggestion => (
            <li 
              key={ suggestion }
              onClick={ () => this.handleItemClicked(suggestion) }
            >{ suggestion }</li>
          ))}
          <li 
            key="all"
            onClick={ () => this.handleItemClicked('all') }
          >
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}