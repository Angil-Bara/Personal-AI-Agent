// src/__tests__/calendarManager.test.js

//Import functions to test from calendarManager
const {createEvent, getEvents} = require('../calendarManager');

// Mocking Google Calendar API calls for testing
jest.mock('googlapis', () => ({
    google: {
        calendar: jest.fn().mockReturnValue({
            events: {
                list: jest.fn(),
                insert: jest.fn()  
            }
        })
    }
}));

//Unit tests for calendarManager
describe('Calendar Manager', () => {
    test('should create a calendar event', async () => {
        const eventData = {
            summary: 'Test Event',
            start: {dateTime: '2025-11-18T9:19:00Z'},
            end: {dateIme: '2025-11-18T10:19:00Z'}
        } // sample data
        const response = await createEvent(eventData); // Call creatEvent
        expect(response).toBeDefined(); // Expect a response to be returned
    });

    test('should retrieve events', async () => {
        const startDate = new Date().toISOString(); // Current date
        const endDate = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(); // one month later
        const response = await getEvents(startDate, endDate); // call getEvent
        expect(response).toBeDefined(); // Expect a response to be returned
    });
});