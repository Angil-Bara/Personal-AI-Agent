// src/responseGenerator.js

//Import necessary libraries for Natural Language Processing (NLP)
const {pipeline} = require('transformers'); //import the Hugging Face Transformers library

//Initialize the text generation model using Hugging Face's pipeline
const textGenerator = pipeline('text-generation', 'gpt2'); // Using the GPT-2 model for generating responses

/**
 * Function to analyze the incoming email content and generate a response.
 * @param {string} emailContent - The content of the incomeing email.
 * @return {Promise<string>} - A promise that resolves to the generated response.
 */
const generateResponse = async (emailContent) => {
    try{
        // Use the text generator to create a response based on the email content
        const generated = await textGenerator(emailContent, {max_length: 100}); // Generate a response with a max length of 100 tokens
        return generated[0].generated_text; // Return the generated text from the response
    }catch (error){
        console.error('Error generating response:', error); // Log any errors that occur during respose generation
        throw new Error('Failed to generate response'); // Throw an error if generation fails
    }
};

// Export the generateResponse function for use in other modules
module.exports = {generateResponse};