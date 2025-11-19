
// src/__tests__/emailProcessor.test.js

const {processEmailAndGenerateResponse} = require('../emailProcessor');

// Mock the response generator
jest.mock('../responseGenerator', () => ({
    generateResponse: jest.fn().mockResolvedValue('Generated response for your inquiry')
}));

// Mock the calendar manager
jest.mock('../calendarManager', () => ({
    createEvent: jest.fn().mockResolvedValue({ 
        id: 'event-123',
        summary: 'Scheduled Event'
    })
}));

describe('Email processing', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should generate a response from email content', async () => {
        const response = await processEmailAndGenerateResponse('Hello, I would like to schedule a meeting.');
        
        // The response comes from the mocked generateResponse, not from event summary
        expect(response).toBeDefined();
        expect(typeof response).toBe('string');
        expect(response).toBe('Generated response for your inquiry');
        
        // Verify that createEvent was called since email contains 'schedule'
        const {createEvent} = require('../calendarManager');
        expect(createEvent).toHaveBeenCalled();
    });

    test('should throw an error for invalid email content', async () => {
        const {generateResponse} = require('../responseGenerator');
        
        // Mock generateResponse to throw error for empty content
        generateResponse.mockRejectedValueOnce(new Error('Invalid input'));
        
        await expect(processEmailAndGenerateResponse('')).rejects.toThrow('Failed to process email and generate response');
    });

    test('should cache responses for duplicate emails', async () => {
        const emailContent = 'Same email content';
        
        const firstResponse = await processEmailAndGenerateResponse(emailContent);
        const secondResponse = await processEmailAndGenerateResponse(emailContent);
        
        expect(firstResponse).toBe(secondResponse);
        
        // generateResponse should only be called once due to caching
        const {generateResponse} = require('../responseGenerator');
        expect(generateResponse).toHaveBeenCalledTimes(1);
    });

    test('should create calendar event when email mentions scheduling', async () => {
        const emailContent = 'Can we schedule an event for next week?';
        
        await processEmailAndGenerateResponse(emailContent);
        
        const {createEvent} = require('../calendarManager');
        expect(createEvent).toHaveBeenCalledWith(
            expect.objectContaining({
                summary: 'Scheduled Event',
                start: expect.objectContaining({
                    timeZone: 'America/New_York'
                }),
                end: expect.objectContaining({
                    timeZone: 'America/New_York'
                })
            })
        );
    });

    test('should not create calendar event when email does not mention scheduling', async () => {
        const emailContent = 'Just a regular email without any scheduling keywords';
        
        await processEmailAndGenerateResponse(emailContent);
        
        const {createEvent} = require('../calendarManager');
        expect(createEvent).not.toHaveBeenCalled();
    });
});