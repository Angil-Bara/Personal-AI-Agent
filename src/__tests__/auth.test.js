// src/__test__/auth.test.js

//Import the functions to be tested from the suth module
const {registerUser, loginUser} = require('../auth');

//Unit tests for registerUser
describe('User Registration', () => {
    // Clear users before each test
    beforeEach(() => {
        const {users} = require('../auth');
        users.length = 0;
    });

    test('should register a new user', () => {
        const result = registerUser('testuser', 'password123');
        expect(result).toEqual({message: 'User registered successfully'});
    });

    test('should throw error for existing user', () => {
        registerUser('testuser', 'password123');
        expect(() => registerUser('testuser', 'password123')).toThrow('User already exists');
    });
});

//Unit tests for loginUser
describe('User Login', () => {
    beforeEach(() => {
        const {users} = require('../auth');
        users.length = 0;
    });

    test('should log in a registered user', () => {
        registerUser('testuser', 'password123');
        const response = loginUser('testuser', 'password123');
        expect(response).toHaveProperty('auth', true);
        expect(response).toHaveProperty('token');
    });

    test('should throw an error for invalid password', () => {
        registerUser('testuser', 'password123');
        expect(() => loginUser('testuser', 'wrongpassword')).toThrow('Invalid password');
    });
});