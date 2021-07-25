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

  handleItemClicked = suggestion => {
    this.setState({ query: suggestion });
    this.props.updateEvents(suggestion);
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