// src/calendarManager.js
 //Import the Google Calendar API client library
 const {google} = require('googleapis');

 //Initialize the calendar API client
 const calendar = google.calendar('v3');

 /**
  * Fuction to add an event and create a new calendar event.
  * @param {object} eventData - The data for the event to be created.
  * @returns {Promise<object>} - The created even data.
  */
 const createEvent = async (eventData) => {
    try{
        // Make a POST request to the Google Calendar API to create the event
        const response = await calendar.events.insert({
            calendarId: 'primary', // Use the primary calendar
            resource: eventData // Event data to be inserted
        });
        return response.data; // Return the created event data
    }catch (error){
        console.error('error creating event:', error); // Log any errors during event creation
        throw new Error('Failed to create event'); // Throw an error if creation fails
    }
 };

 /**
  * Function to retrieve upcoming events within a specified data range.
  * @param {string} startDate - The start date in ISO format.
  * @param {string} endDate - The end date in ISO format.
  * @returns {Promise<Array>} - An array of events.
  */
 const getEvents = async (startDate, endDate) => {
    try{
        //Make a GET request to the Google Calendar API to retrieve events
        const response = await calendar.events.list({
            calendarId: 'primary', //Use the promary calendar
            timeMin: startDate, //Start date for the event search
            timeMax: endDate, //End date for the event search
            singleEvents: true, //Get single events
            orderBy: 'startTime' //Order events by start time
        });
        return response.data.items; //Return the array of events
    }catch (error){
        console.error('Error retrieving events:', error); // Log any errors during event retrieval
        throw new Error('Failed to retrieve events'); // Throw an error if retrieval fails
    }
 }

 /**
  * Fucntion to delete an event by its ID.
  * @param {string} eventId - The ID of the event to delete.
  * @returns {Promise<void>} - Resolves when the event is deleted.
  */
 const deleteEvent = async (eventId) => {
    try{
        //Make a DELETE request to the Google Calendar API to delete the event
        await calendar.events.delete({
            caldendarId: 'primary', //Use the primary calendar
            eventId: eventId //ID of the event to delete
        });
    }catch (error){
        console.error('Error deleting event:', error); // Log any errors during event deletion
        throw new Error('Failed to delete event'); // Throw an error if deletion fails
    }
 }

 //Export the calendar fucntions for use in othe modules
 module.exports = {
    createEvent,
    getEvents,
    deleteEvent
 };