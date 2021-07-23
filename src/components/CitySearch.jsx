import React, { Component } from 'react'

export default class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
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

  render() {
    return (
      <div className="CitySearch">
        <input 
          type="text"
          className="city"
          value={ this.state.query }
          onChange={ this.handleInputChanged }
        />
        <ul className="suggestions" >
          {this.state.suggestions.map(suggestion => (
            <li key={suggestion}>{suggestion}</li>
          ))}
          <li key="all">
            <b>See all cities</b>
          </li>
        </ul>
  
      </div>
    );
  }
}