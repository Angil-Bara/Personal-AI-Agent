// src/components/EmailDashboard.js

//Import necessary libraries and hooks from React
import React, {useState, useEffect} from 'react';
import {fetchEmails} from '../emailProcessor'; //import the email fetching function

const EmailDashboard = () => {
    //State to hold the list of emails
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true); //state to manage loading status

    //Function to fetch emails
    const loadEmails = async () => {
        try{
            const emailData = await fetchEmails(); //fetch emails using the emailProcessor module
            setEmails(emailData); //update the state with fetched emails
        }catch (error){
            console.error('Error fetching emails:', error); //log any errors during email fetching
        }finally{
            setLoading(false); //set loading to false after fetching is done
        }
    };

    //useEffect to load emails on component mount
    useEffect(() => {
        loadEmails(); //call the loadEmails function
    }, []); //empty dependency array to run only once on mount

    //Render the email dashboard
    return(
        <div>
            <h1>Email Dashboard</h1>
            {loading ? 
            (<p>Loading emails...</p>):
            (<ul>
                {emails.map(email => (<li key={email.id}>
                    {email.subject} - {email.timestamp} 
                    </li>
                    //display each email
                ))}
            </ul>)}
        </div>
    );
};

//export the Emaildashboard component
export default EmailDashboard;