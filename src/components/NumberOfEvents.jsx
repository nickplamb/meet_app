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
      <div className="number-of-events">
        <label htmlFor="number-of-events__input" >Number of events:</label>
        <input 
          type="number"
          id="number-of-events__input"
          className="number-of-events__input" 
          onChange={ e => this.handleNumberChange(e) }
          value={ this.state.numberOfEvents }
        />
      </div>
    )
  }
}

export default NumberOfEvents;