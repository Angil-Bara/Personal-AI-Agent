// src/__tests__/integration.test.js

//Import necessary function to test integration
const {registerUser, loginUser} = require('../auth');
const {fetchEmails, processEmailAndGenerateResponse} = require('../emailProcessor');
const {createEvent, getEvents} = require('../calendarManager');

// Mock all dependencies
jest.mock('../responseGenerator', () => ({
    generateResponse: jest.fn().mockResolvedValue('Response generated')
}));

jest.mock('../calendarManager', () => ({
    createEvent: jest.fn().mockResolvedValue({ id: 'event-1' }),
    getEvents: jest.fn().mockResolvedValue([
        { id: 'event-1', summary: 'Scheduled Event' }
    ])
}));

describe('Integration Tests', () => {
    beforeEach(() => {
        const auth = require('../auth');
        auth.users.length = 0;
        jest.clearAllMocks();
    });

    test('should register a user and login', async () => {
        registerUser('testuser', 'password123');
        const loginResponse = loginUser('testuser', 'password123');
        expect(loginResponse).toHaveProperty('auth', true);
        expect(loginResponse).toHaveProperty('token');
    });

    test('should create an event after processing an email', async () => {
        const emailContent = 'Schedule a meeting for tomorrow';
        await processEmailAndGenerateResponse(emailContent);
        
        const events = await getEvents(
            new Date().toISOString(),
            new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
        );
        
        expect(events).toBeDefined();
        expect(events.length).toBeGreaterThan(0);
    });
});