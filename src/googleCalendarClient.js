// src/googleCalendarClient.js

//Import the necessary libraries for Google Calendar API
const {google} = require('googleapis');
const {OAuth2} = google.OAuth2;

//Create a new OAuth2 client instance with your credentials
const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID, //client ID from Google Developer Console
    process.env.GOOGLE_CLIENT_SECRET, //client secret from Google Developer Console
    'https://developers.google.com/oauthplayground' //redirect URL
);

/**
 * Function to set the OAuth2 credentials for the client.
 * @param {string} token - The OAuth2 access token.
 */
const setCredentials = (token) => {
    oauth2Client.setCredentials({token}); //Set the token to the OAuth2 client
};

/**
 * Function to get the OAuth2 client for making API requests.
 * @returns {OAuth2} - The configured OAuth2 client.
 */
const getClient = () => {
    return oauth2Client; //Return the configured OAuth2 client
};

//Export the functions for use in other modules
module.exports = {
    setCredentials,
    getClient
};
