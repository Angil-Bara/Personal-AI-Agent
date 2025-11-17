// src/App.js

//Import necessary modules and components
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EmailDashboard from './components/EmailDashboard';
import CalendarView from './components/CalendarView';
import LifeAdminPanel from './components/LifeAdminPanel';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Jarvis - Personal AI Agent</h1>
                <Switch>
                    <Route path="/" exact component={EmailDashboard} /> {/* Route for Email Dashboard */}
                    <Route path="/calendar" component={CalendarView} /> {/* Route for Calendar View */}
                    <Route path="/life-admin" component={LifeAdminPanel} /> {/* Route for Life Admin Panel */}
                </Switch>
            </div>
        </Router>
    );
};

export default App; //Export the App component