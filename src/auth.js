// Import necessary libraries/modules for JWT authentication and password hashing
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {setCredentials} = require('./googleCalendarClient'); //import function to set Google Calendar Credentials

// In-memory user store (for demonstration purposes)
const users = [];

// Function to register a new user
function registerUser(username, password){
    //check if user already exists
    const existingUser = users.find(user => user.username === username);
    if(existingUser){
        throw new Error('User already exists'); //throw error if the user exists
    }
    //hash the password before storing
    const hashedPassword = bcrypt.hashSync(password, 8);//hash the password with a salt of 8 rounds
    //store the new user to the in-memory array
    users.push({username, password: hashedPassword});
    return {message: 'User registered successfully'};
};

// Function to log in a user
function loginUser(username, password){
    //find the user by their username
    const user = users.find(user => user.username === username);
    if(!user){
        throw new Error('User not found'); //throw error if user does not exist
    }
    //verify the password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if(!passwordIsValid){
        throw new Error('Invalid password'); //throw error if password is incorrect
    }
    //generate a JWT token for the user
    const token = jwt.sign({username: user.username}, 'sercret-key', {expiresIn: '1h'});//generate a token valid for 1 hour
    return {auth: true, token}; // return the token
};

// Function to authenticate and set Google Calendar credentials
const authenticateGoogleCalendar = (token) => {
    setCredentials(token); //set the OAuth2 credentials using the provided token
};

//Function to verify a JWT token
function verifyToken(token){
    try{
        const token = jwt.verify(token, 'secret-key'); //use the sam secret key to verify the token
        return token; //return the decoded token if valid
    }catch(error){
        throw new Error('Invalid token');//throw erroe if the token is invalid
    }
};

//Export the functions for use in other modules
module.exports = {
    registerUser,
    loginUser,
    verifyToken,
    authenticateGoogleCalendar
};