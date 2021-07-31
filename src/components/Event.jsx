import React, { Component } from 'react';

import { extractDateTime } from '../api';

export default class Event extends Component {
  state = {
    showDetails: false,
  }

  handleDetailsToggle = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  }

  render() {
    const { event } = this.props;
    const { showDetails } = this.state;
    
    const eventDateTime = extractDateTime(event);
    const basicDetails = `${eventDateTime} @${event.summary} | ${event.location}`;
    
    return (
      <div className="event">
        <h3 className="event-title">
          { event.summary }
        </h3>
        <div className="basic-details">
          { basicDetails }
        </div>
        { 
          showDetails && 
          <div className="more-details">
            <p><b>About event:</b></p>
            <a className="event-link" href={ event.htmlLink }>See details on Google Calendar</a>
            <p className="event-description">{ event.description }</p>
          </div>
        }
        <button 
          className="details-btn"
          onClick={() => this.handleDetailsToggle()}
        >
          { showDetails ? 'Hide Details' : 'Show Details' }
        </button>
      </div>
    )
  }
}