//Entry point for the Personal AI Agent application

//import the express framework
const express = require('express');
//import body-parser to parse incoming JSON requests
const bodyParser = require('body-parser');
//import the authenication middleware
const authMiddleware = require('../middleware/authMiddleware');
//import the authentication logic
const {registerUser, loginUser} = require('./auth');

//create and instance of an Express application
const application = express();

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

//Example of a protected route that requires authentication
application.get('/protected', authMiddleware, (request, response) => {
    response.send(`Welcome ${request.user.username}, you are authenticated!`); //send a welcome message to the authenticated user
});

//Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

//Start the server and listen on the defined port
application.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); //logs the server URL when it starts
});