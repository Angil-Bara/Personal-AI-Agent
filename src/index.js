//Entry point for the Personal AI Agent application

//import the express framework
const express = require('express');
//import body-parser to parse incoming JSON requests
const bodyParser = require('body-parser');
//import the authenication middleware
const authMiddleware = require('../middleware/authMiddleware');
//import the authentication logic
const {registerUser, loginUser} = require('./auth');
//import the database connection function
const {queryDatabase} = require('./database');
//import email processing functions
const {fetchEmails, sendEmail, processEmailAndGenerateResponse} = require('./emailProcessor'); //modified import to include response processing
//import React and ReactDOM for rendering the UI
const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./App');

//import dotenv for private information
const dotenv = require('dotenv');
dotenv.config();


//create and instance of an Express application
const application = express();
//Middleware to parse JSON request bodies
application.use(bodyParser.json());
//Initialize the database connection
queryDatabase();

//fetch emails on startup (example usage)
application.get('/fetch-emails', async (request, response) => {
    const emailConfig = { // you can add more configurations if you use more than 1 email
        user: process.env.IMAP_USER, //get user email from request body or environment variables
        password: process.env.IMAP_PASS, //get user password from request body or environment variables
        host: process.env.IMAP_HOST, //Replace with actual IMAP host
        port: process.env.IMAP_PORT //default IMAP port is 993
    };
    try{
        const emails = await fetchEmails(emailConfig); //fetch emails using the provided configurations
        response.status(200).send(emails); //send the fetched emails as a response
    }catch(error){
        response.status(500).send({message: error.message}); //send a 500 response if there is an error fetching emails
    }
});

//Define a basic route to test the server
application.get('/', (request, response) => {
    response.send('Hello, I am Jarvis, your Personal AI Agent!'); //send a response when the root URL is accessed
});

//Route to register a new user
application.post('/register', bodyParser.json(), (request, response) => {
    const {username, password} = request.body; //extract username and password from the request body
    try{
        const user = registerUser(username, password); //call the registerUse function
        response.status(201).send(user); //send a 201 response with the user data
    }catch(error){
        response.status(400).send({message: error.message}); //send a 400 response if there is an error in registration
    }
});
//Route to user login
application.post('/login', bodyParser.json(), (request, response) => {
    const {username, password} = request.body; //extract username and password from the request body
    try{
        const {auth, token} = loginUser(username, password); //call the loginUser function
        response.status(200).send({auth, token}); //send a 200 response with the auth status and token
    }catch(error){
        response.status(401).send({message: error.message}); //send a 401 response if there is an error in login
    }
});

//Example of a protected route that requires authentication
application.get('/protected', authMiddleware, (request, response) => {
    response.send(`Welcome ${request.user.username}, you are authenticated!`); //send a welcome message to the authenticated user
});

//Route to generating email responses
application.post('/generate-response', authMiddleware, async (request, response) => {
    const {emailContent} = request.body; //extract email content from the request body
    try{
        const responseText = await processEmailAndGenerateResponse(emailContent); //generate response using email processing module
        response.status(200).send({responseText}); //send the generated response text
    }catch (error){
        response.status(500).send({message: 'Error generating response: ' + error.message}); //handle errors gracefully
    }
});

//Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

//Start the server and listen on the defined port
application.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); //logs the server URL when it starts
});

//Render the React application
//Render the App component in the root div in index.html
ReactDOM.render(<App/>, document.getElementById('root')) 