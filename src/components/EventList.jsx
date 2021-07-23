import React from 'react'

import Event from './Event'

export default function EventList({ events }) {
  return (
    <ul className="EventList">
      {events.map(event => 
        <li key={ event.id }>
          <Event event={ event } />
        </li>
      )}
    </ul>
  )
}