// src/security.js

//Import the crypto module for ecryption and decryption
const crypto = require('crypto');

//Define a constant for the encryption algorithm and key
const algorithm = 'aes-256-cbc'; // AES ecryption algorithm
const key = crypto.randomBytes(32); //Generate a random 32 byte key
const iv = crypto.randomBytes(16); //Generate a random init vector 

/**
 * Finction to encrypt data.
 * @param {string} data - The data to encrypt.
 * @returns {string} = The encrypted data in hex format.
 */
const encrypt = (data) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypt;
};

/**
 * Function to decrypt data.
 * @param {string} encryptedData - The encrypted data to decrypt.
 * @returns {string} - The decrypted data.
 */
const decrypt = (encryptedData) => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decypted = decipher.update(encryptedData, 'hex', 'utf8');
    decypted += decipher.final('utf8');
    return decrypted;
};

//Export both functions for use in other modules
module.exports = {encrypt, decrypt};