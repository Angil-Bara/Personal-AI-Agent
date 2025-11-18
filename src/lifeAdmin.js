// src/lifeAdmin.js

//Import necessary libraries for API requests
const axios = require('axios'); // for making HTTP requests
const {pool} = require('./database'); // import the database connection pool
const {sendEmail} = require('./emailProcessor'); // import the function to send emails
import dotenv from 'dotenv'; // for keeping your tokens/API_KEY private

dotenv.config();

/**
 * Life Administration Module
 * This module automates life admin tasks such as paying bills, and managing subscriptions.
 */

/**
 * Function to pay a bill using the payment API.
 * @param {Object} orderDetails - The details required to process the payment.
 * @returns {Promise<Object>} - A response from the payment API.
 */
const payBill = async (orderDetails) => {
    try{
        // Make a POST request to the payment API (e.g., Stripe, Paypal)
        const response = await axios.post(
            process.env.PAYMENT_API_URL,
            orderDetails,
            {
                headers:{Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`}        
            }
        );
        return response.data; // Return the response from the payment provider
    }catch (error){
        console.error('Error processing payment:', error); // Log any errors that occur during payment processing
        throw new Error('Payment failed'); // Throw and error if payment fails
    }
};

/**
 * Function to manage subscriptions, including fetching and updating subscription status.
 * @param {string} subscriptionId - The ID of the subscription to manage.
 * @returns {Promise<Object>} - The subscription details/status.
 */
const manageSubscription = async (subscriptionId) => {
    try{
        // Make a GET request to the subscription API to fetch subscription details
        const result = await pool.query('SELECT * FROM subscriptions WHERE id = $1', [subscriptionId]);
        if(result.rows.length === 0){
            throw new Error('Subscription not found'); // Throw error if subscription does not exist
        }
        return result.rows[0]; // Return the subscription details
    }catch (error){
        console.error('Error managing subscription:', error); // Log any errors during subscription management
        throw new Error('Failed to manage subscription'); // Throw an error if management fails
    }
};

/**
 * Function to notify user about upcoming bills/subscription renewals via email.
 * @param {string} email - The email address of the user to notify.
 * @param {string} message - The message to send in the notification email.
 */
const notifyUser = async (email, message) => {
    try{
        await sendEmail({
            to: email, // Recipient's email address
            subject: 'Notification from Jarvis', // Subject of the email
            text: message // Body of the email
        });
    }catch (error){
        console.error('Error sending notification:', error); // Log any errors during notification sending
        throw new Error('Notification failed'); // Throw an error if notification fails
    }
};

//Export the functions for use in othe modules
module.exports = {
    payBill,
    notifyUser,
    manageSubscription
};