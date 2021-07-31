Feature: Show/hide an event's details

Scenario: An event element is collapsed by default
Given event elements are listed out for a user
When a user has not selected any events
Then the events details section is collapsed

Scenario: User can expand an event to see its details
Given a list of events are displayed for a user
When a user presses the expand icon for an event
Then the event details should expand to be visible to the user

Scenario: User can collapse an event to hide its details
Given a user has expanded the details section for an event
When a user presses the collapse icon for that event
Then the details section should collapse out of view to the user