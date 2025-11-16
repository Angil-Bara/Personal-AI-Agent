//Step 1
//Entry point for the Personal AI Agent application

//import the express framework
const express = require('express');

//create and instance of an Express application
const application = express();

//Define a basic route to test the server
application.get('/', (request, response) => {
    response.send('Hello, I am Jarvis, your Personal AI Agent!'); //send a response when the root URL is accessed
});

//Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

//Start the server and listen on the defined port
application.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); //logs the server URL when it starts
});