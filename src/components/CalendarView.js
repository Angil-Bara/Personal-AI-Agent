// src/components/CalendarView.js

//Import necessary libraries and hooks from React
import React, {useEffect, useState} from 'react';
import {getEvent} from '../calendarManager'; //import function to get calendar events

const CalendarView = () => {
    //State to hold the list of events
    const {events, setEvents} = useState([]);
    const {loading, setLoading} = useState(true); //State to manage loading

    //Function to fech events
    const loadEvents = async () => {
        const startDate = new Date().toISOString(); //Current date
        const endDate = new Date(new Date().setMonth(new Date().getMonth() + 1).toISOString); // one month later
        try{
            const eventData = await getEvents(startDate, endDate); // fetch events in current month from calendarManager
            setEvents(eventData);//update state with fetched events
        }catch (error){
            console.error('Error fetching events:', error);// log any errors
        }finally{
            setLoading(false); // set loading to false after fetching
        }
    };

    //useEffect to load events on component mount
    useEffect(() => {
        loadEvents(); // call function to load events
    }, []); // empty dependency array to run only on mount

    //Render loading state or events
    return(
        <div>
            <h1>Calendar View</h1>
            {loading ? (<p>Loading events...</p>):( //display loading message
                <ul>
                    {events.map(event => {
                        <li key={event.id}>{event.title} - {event.data} at {event.time}</li> //display each event
                    })}
                </ul>
            )}
        </div>
    );
};

//Export the CalendarView component
export default CalendarView;