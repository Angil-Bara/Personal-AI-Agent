// src/__tests__/integration.test.js

//Import necessary function to test integration
const {registerUser, loginUser} = require('../auth');
const {fetchEmails, processEmailAndGenerateResponse} = require('../emailProcessor');
const {createEvent, getEvents} = require('../calendarManager');

describe('Integration Tests', () =>{
    test('should register a user and fetch emails', async () => {
        registerUser('testuser', 'password123');
        const loginResponse = loginUser('testuser', 'password123');
        expect(loginResponse).toHaveProperty('auth', true);

        const emails = await fetchEmails();
        expect(emails).toBeDefined();
    });

    test('should create an event after processing an email', async () => {
        const emailContent = 'Schedule a meeting for tomorrow'; // sample email content
        await processEmailAndGenerateResponse(emailContent);
        const events = await getEvents(new Date().toISOString(), new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()); // fetch events within 1 month
        expect(events).toHaveLength(1); //Expect one event to be created
    });
});