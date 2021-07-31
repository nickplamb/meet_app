Feature: Specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number
Given a user has visited the home page
When the user has not selected a specific number of events to view
Then the app should display 32 events

Scenario: User can change the number of events they want to see
Given a user may or may not have searched for a city
When a user selects a number of events
Then the number of events visible to the user changes to match the selected amount