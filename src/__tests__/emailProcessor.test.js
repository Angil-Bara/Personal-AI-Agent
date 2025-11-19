// src/__tests__/emailProcessor.test.js

//Import the functions to be tested from the emailProcessor module
const {processEmailAndGenerateResponse} = require('../emailProcessor');

//Unit tests for email processing
describe('Email processing', () => {\
    test('should generate a response from email content', async () => {
        const response = await processEmailAndGenerateResponse('Hello, I would like schedule a meeting.'); // Call the function
        expect(response).toMatch(/Scheduled Event/); // Expect the response to include scheduling information
    });

    test('should throw an error for invalid emai content', async () => {
        await expect(processEmailAndGenerateResponse('')).rejects.toThrow('Failed to process email and generate response'); // Expect error on empty content
    });
});