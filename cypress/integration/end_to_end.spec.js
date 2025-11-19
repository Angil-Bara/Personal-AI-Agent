// src/cypress/integration/end_to_end.spec.js

describe('End-to-End Tests', () => {
    it('User logs in and sends an email', () => {
        cy.visit('/'); //visit root URL
        cy.get('input[name=username]').type('testuser'); //Type username
        cy.get('input[name=password]').type('password123'); //Type password
        cy.get('button[type=submit').click(); // Submit log in form
        cy.contains('Email Dashboard'); //Check if redirected to dashboard
        cy.get('button').contains('Send Email').click(); // Simulate sending an email
        cy.contains('Email sent successfully'); // Check for success message
    });

    it('User checks calendar events after sending an email', () => {
        cy.visit('/calendar'); //Visit calendar view
        cy.contains('Calendar View'); //Check if on calendar view
        cy.get('ul').should('exist'); //ensure events are listed
    });

    it('User interacts with life admin automation features', () => {
        cy.visit('/lift-admin'); //vistit life admin panel
        cy.get('button').contains('Pay Bill').click(); // Simulate bill payment
        cy.contains('Payment successful'); //check for success message
    });
});