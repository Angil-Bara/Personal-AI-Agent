
// src/__tests__/emailProcessor.test.js

const {processEmailAndGenerateResponse} = require('../emailProcessor');
const {generateResponse} = require('../responseGenerator');
const {createEvent} = require('../calendarManager');


// Mock @xenova/transformers FIRST with inline implementation
jest.mock('@xenova/transformers', () => ({
    pipeline: jest.fn(() => 
        jest.fn().mockResolvedValue([{
            generated_text: 'Mocked AI response'
        }])
    )
}));

// Mock the dependencies
jest.mock('../responseGenerator', () => ({
    generateResponse: jest.fn()
}));

jest.mock('../calendarManager', () => ({
    createEvent: jest.fn()
}));

const {processEmailAndGenerateResponse} = require('../emailProcessor');
const {generateResponse} = require('../responseGenerator');
const {createEvent} = require('../calendarManager');

describe('Email processing', () => {
    beforeEach(() => {
        // Only clear mock call history, don't reset modules
        jest.clearAllMocks();
        
        // Set up mock implementations
        generateResponse.mockResolvedValue('Generated response for your inquiry');
        createEvent.mockResolvedValue({ 
            id: 'event-123',
            summary: 'Scheduled Event'
        });
        
        // Clear the email cache manually by requiring and accessing it
        const emailProcessor = require('../emailProcessor');
        // Clear cache if accessible (it's not exported, so we just re-mock)
    });

    test('should generate a response from email content', async () => {
        const response = await processEmailAndGenerateResponse('Hello, I would like to schedule a meeting.');
        
        expect(response).toBeDefined();
        expect(typeof response).toBe('string');
        expect(response).toBe('Generated response for your inquiry');
        
        // Verify that generateResponse was called with the email content
        expect(generateResponse).toHaveBeenCalledWith('Hello, I would like to schedule a meeting.');
        
        // Verify that createEvent was called since email contains 'schedule'
        expect(createEvent).toHaveBeenCalled();
    });

    test('should throw an error for invalid email content', async () => {
        // Mock generateResponse to throw error for this test
        generateResponse.mockRejectedValueOnce(new Error('Invalid input'));
        
        await expect(processEmailAndGenerateResponse('test'))
            .rejects
            .toThrow('Failed to process email and generate response');
    });

    test('should cache responses for duplicate emails', async () => {
        const emailContent = 'Unique email for caching test';
        
        const firstResponse = await processEmailAndGenerateResponse(emailContent);
        const secondResponse = await processEmailAndGenerateResponse(emailContent);
        
        expect(firstResponse).toBe(secondResponse);
        
        // generateResponse should only be called once due to caching
        expect(generateResponse).toHaveBeenCalledTimes(1);
    });

    test('should create calendar event when email mentions scheduling', async () => {
        const emailContent = 'Can we schedule an event for next week?';
        
        await processEmailAndGenerateResponse(emailContent);
        
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
        
        expect(createEvent).not.toHaveBeenCalled();
    });
});