// src/emailProcessor.js

//Import necessary libraries for email processing
const nodemailer = require('nodemailer');//for sending emails via SMTP (Simple Mail Transfer Protocol)
const Imap = require('imap');//for receiving emails via IMAP (Internet Message Access Protocol)
const {promisify} = require('util');//to convert callback-based functions to promise-based ones
const {generateResponse} = require('./responseGenerator');//import the response generator module
const {createEvent} = require('./calendarManager');//import the calendar manager function for scheduling events
const {encrypt, decrypt} = require('./security')

//In-memory cache to store prossed email responses
const emailResponseCache = {}; //cache object to store responses

//Function to send an email
async function fetchEmails(emailConfig){
    return new Promise((resolve, reject) => {
        //create a new IMAP instance with the provided email configuration
        const imap = new Imap({
            user: emailConfig.user,
            password: emailConfig.password,
            host: emailConfig.imapHost,
            port: emailConfig.imapPort || 993,
            tls: emailConfig.tls 
        });

        //Function to open the inbox and emails
        const openInbox = (callback) => {
            imap.openBox('INBOX', true, callback); //open th inbox in read-only mode
        };

        //connect to the IMAP server
        imap.once('ready', () => {
            openInbox((error, box) => {
                if(error) return reject(error); //reject if there is an error opening the inbox
                //search for all emails in the inbox
                imap.search(['ALL'], (error, results) => {
                    if(error) return reject(error); //reject if there is an error in searching
                    if(!results) return resolve([]); //resolve with empty array if no emails found

                    //fetch the emails based on the search results
                    const fetch = imap.fetch(results, {bodies: ''});
                    const emails = [];

                    fetch.on('message', (msg) => {
                        msg.on('body', (stream) => {
                            let emailData = '';
                            stream.on('data', (chunk) =>{
                                emailData += chunk.toString(); //accumulate email body data
                            });
                            stream.on('end', () => {
                                emails.push(emailData); //push the complete email body to the emails array
                            });
                        });
                    });

                    fetch.on('end', () => {
                        imap.end(); //close the IMAP connection
                        resolve(emails); //resolve with the fetched emails
                    });

                    fetch.on('error', (error) => {
                        reject(error); //reject if there is an error during fetching
                    });
                });
            });
        });

        //handle IMAP connection errors
        imap.once('error', (error) => {
            reject(error); //reject if there is an IMAP connection error
        });

        //connect to the IMAP server
        imap.connect();
    });
};

//function to send an email
async function sendEmail(emailConfig, mailOptions){
    //create a transporter object using SMTP
    const transporter = nodemailer.createTransport({
        host: emailConfig.host,
        port: emailConfig.port || 587,
        secure: emailConfig.secure || false, //true for 465, false for other ports
        auth: {
            user: emailConfig.user,
            pass: emailConfig.password
        }
    });

    //send the email using the transporter
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) return reject(error); // reject if there is an error sending the email
            resolve(info); //resolve with the info object if emai is send successfully
        });
    });
};

/**
 * Function to process incoming emails and generate draft responses.
 * @param {string} emailContent - The contents of the email to respond to.
 * @returns {Promise<string>} - A promise that resolves to the generated response.
 */
const processEmailAndGenerateResponse = async (emailContent) => {
    //Check if the response for this email content is already cached
    if(emailResponseCache[emailContent]){
        console.log('Returning cached response'); //log cache hit
        return emailResponseCache[emailContent];
    }
    try{
        const response = await generateResponse(emailContent); //generate a response with the email content
        // Encrypt the response before returning it
        const encryptedResponse = encrypt(response);
        emailResponseCache[emailContent] = encryptedResponse;
        return encryptedResponse;

    }catch (error){
        console.error('Error processing email:', error); // Log any errors during email processing
        throw new Error('Failed to process email and generate response'); // Throw an error if processing fails
    }
}
//export the functions for use in other modules
module.exports = {
    fetchEmails,
    sendEmail,
    processEmailAndGenerateResponse
};