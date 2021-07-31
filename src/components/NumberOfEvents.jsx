import React, { Component } from 'react'

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleNumberChange = e => {
    const value = parseInt(e.target.value, 10);
    this.setState({
      numberOfEvents: value,
    });

    this.props.updateCount(value);
  }

  render() {
    return (
      <div className="numberOfEvents">
        <label htmlFor="numberOfEvents__input" >Number of events:</label>
        <input 
          type="number"
          id="numberOfEvents__input"
          className="numberOfEvents__input" 
          onChange={ e => this.handleNumberChange(e) }
          value={ this.state.numberOfEvents }
        />
      </div>
    )
  }
}

export default NumberOfEvents;