# Test Scenarios

## **Feature 1:** FILTER EVENTS BY CITY

### *Scenario 1:* WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES

* Given user hasn’t searched for any city
* When the user opens the app
* Then the user should see a list of all upcoming events

### *SCENARIO 2:* USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY

* Given the main page is open
* When user starts typing in the city textbox
* Then the user should see a list of cities (suggestions) that match what they’ve typed

### *SCENARIO 3:* USER CAN SELECT A CITY FROM THE SUGGESTED LIST

* Given the user was typing “Berlin” in the city textbox And the list of suggested cities is showing
* When the user selects a city (e.g., “Berlin, Germany”) from the list
* Then their city should be changed to that city (i.e., “Berlin, Germany”) And the user should receive a list of upcoming events in that city

## **FEATURE 2:** SHOW/HIDE AN EVENT'S DETAILS

### *Scenario 1:* An event element is collapsed by default

* Given event elements are listed out for a user
* When a user has not selected any events
* Then the events details section is collapsed

### *Scenario 2:* User can expand an event to see its details

* Given a list of events are displayed for a user
* When a user presses the expand icon for an event
* Then the event details should expand to be visible to the user

### *Scenario 3:* User can collapse an event to hide its details

* Given a user has expanded the details section for an event
* When a user presses the collapse icon for that event
* Then the details section should collapse out of view to the user

## **FEATURE 3:** SPECIFY NUMBER OF EVENTS

### *Scenario 1:* When user hasn’t specified a number, 32 is the default number

* Given a user has visited the home page
* When the user has not selected a specific number of events to view
* Then the app should display 32 events

### *Scenario 2:* User can change the number of events they want to see

* Given a user may or may not have searched for a city
* When a user selects a number of events from a dropdown
* Then the number of events visible to the user changes to match the selected amount

## **FEATURE 4:** USE THE APP WHEN OFFLINE

### *Scenario 1:* Show cached data when there’s no internet connection

* Given a user is not connected to the internet
* When a user views the home page
* Then data cached by the app from before internet was disconnected should be shown to the user

### *Scenario 2:* Show error when user changes the settings (city, time range)

* Given a user is not connected to the internet
* When a user tries to change the search settings
* Then an appropriate error message should be displayed to the user

## **FEATURE 5:** DATA VISUALIZATION

### *Scenario 1:* Show a chart with the number of upcoming events in each city

* Given a user has not selected a city
* When a user navigates to the home page
* Then a chart showing the number of events in several cities should be displayed
