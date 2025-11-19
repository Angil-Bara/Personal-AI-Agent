// src/__mocks__/@xenova/transformers.js
// Create this file to mock the transformers library

const pipeline = jest.fn(() => {
    return jest.fn().mockResolvedValue([
        {
            generated_text: 'Mocked AI response'
        }
    ]);
});

module.exports = {
    pipeline
};