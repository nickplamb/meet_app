import { mockData } from "./mock-data";

/**
 * 
 * @param {*} events:
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = events => {
  let extractLocations = events.map(event => event.location);
  let locations = [...new Set(extractLocations)];
  return locations;
};


/**
 * 
 * @param {*} event 
 * @returns eventDate Time
 * This function will take a single event from the google calaendar api and convert the start time to a human readable format.
 */
export const extractDateTime = event => {
  const dateTimeOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZoneName: 'long' };
  const eventDateTime = new Date(event.start.dateTime).toLocaleString([], dateTimeOptions);
  return eventDateTime;
};

export const getEvents = async () => {
  return mockData;
};