//src/components/LifeAdminPanel.js

//Import necessary libraries and hooks from React
import React from 'react';
import {payBill, manageSubscription} from '../lifeAdmin'; //import functions for life admin tasks

const LifeAdminPanel = () => {
    //Function to handle bill payment
    const handlePayBill = async () => {
        const paymentDetails = {/*payment Details */}; // You define payment details
        try{
            const response = await payBill(paymentDetails); //call payBill function
            alert(`Payment successful: ${response}`); // Notify user of success
        }catch (error){
            console.error('Error paying bill:', error); // log any errors
            alert('Payment failed'); //Notify user of failure
        }
    };

    //Function to hande subscription management
    const handleManageSubscription = async (subscriptionId) => {
        try{
            const subscription = await manageSubscription(subscriptionId); // Call manageSubscription function
            alert(`Subscription details: ${JSON.stringify(subscription)}`); // Show subscription detatils
        }catch (error){
            console.error('Error managing subscription:', error); // log any errors
            alert('Failed to manage subscription'); // Notify the user of failure
        }
    };

    //Render the life admin panel
    return(
        <div>
            <h1>Life Admin Panel</h1>
            <button onClick={handlePayBill}>Pay Bill</button> {/*Button to pay bill*/}
            <button onClick={handleManageSubscription}>Manage Subscription</button> {/*Button to mangae subscription*/}
        </div>
    );
};

//Export the LifeAdminPanel component
export default LifeAdminPanel;