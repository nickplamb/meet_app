import React, { Component } from 'react'

export default class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
  }

  handleInputChanged = e => {
    const value = e.target.value;
    const suggestions = this.props.locations.filter(location => {
      return location.toUpperCase().indexOf(value.toUpperCase())> -1;
    });
    this.setState({ 
      query: value,
      suggestions,
    });
  }

  handleItemClicked = suggestion => {
    this.setState({ 
      query: suggestion,
      showSuggestions: false,
    });

    this.props.updateEvents(suggestion, this.props.numberOfEvent);
  }

  render() {
    const { query, suggestions, showSuggestions } = this.state;
    
    return (
      <div className="CitySearch">
        <input 
          type="text"
          className="city"
          value={ query }
          onChange={ this.handleInputChanged }
          onFocus={ () => { this.setState( {showSuggestions: true }) } }
        />
        <ul className="suggestions" style={ showSuggestions ? {} : { display: 'none' } } >
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