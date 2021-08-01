import React, { Component } from 'react';

import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    alertText: '',
  };

  handleNumberChange = e => {
    if (e.target.value === '') {
      // this.setState(prevValue => {
      //   return { numberOfEvents: prevValue };
      // });
      return;
    }
    const value = parseInt(e.target.value, 10);
    if (value < 1 || value > 50) {
      this.setState({
        alertText: 'Please pick a number between 1 and 50.',
      });
      return;
    }
    this.setState({
      numberOfEvents: value,
      alertText: '',
    });

    this.props.updateCount(value);
  }

  render() {
    return (
      <div className="numberOfEvents">
        <ErrorAlert text={ this.state.alertText } />
        <label htmlFor="numberOfEvents__input" >Number of events:</label>
        <input 
          type="number"
          id="numberOfEvents__input"
          className="numberOfEvents__input" 
          onChange={ e => this.handleNumberChange(e) }
          placeholder={ this.state.numberOfEvents }
          min="1"
          max="50"
        />
      </div>
    )
  }
}

export default NumberOfEvents;