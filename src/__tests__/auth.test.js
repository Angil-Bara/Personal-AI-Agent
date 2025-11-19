// src/__test__/auth.test.js

//Import the functions to be tested from the suth module
const{registerUser, loginUser} = require('../auth');

//Unit tests for user registration
describe('User Registeration', () => {
    test('should register a new user', () => {
        const user = registerUser('testuser', 'password123'); // Attempt to register a user
        expect(user).toEqual({username: 'testuser'}); // Expect the returned user object to match
    });

    test('should throw error for existing user', () => {
        registerUser('testuser', 'password123'); // Register the user first
        expect(() => registerUser('testuser', 'password123').toThrow('User already exists')); // Expect error on duplicated registeration
    });
});

//Unit tests for user login
describe('User log in', () => {
    test('should log in a registered user', () => {
        registerUser('testuser', 'password123'); // Ensure that the user is registered
        const response = loginUser('testuser', 'password123'); // Log in the user
        expect(response).toHaveProperty('auth', true); // Expect a successful login
        expect(response).toHaveProperty('token'); // Expect a token to be returned
    });
    test('should throw an error for invalid password', () => {
        registerUser('testuser', 'password123'); // Resgister the user first
        expect(() => loginUser('testuser', 'password123').toThrow('Invalid password')); // Expect error on wrong password
    });
});