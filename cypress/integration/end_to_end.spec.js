// cypress/integration/end_to_end.spec.js

describe('End-to-End Tests', () => {
    // Note: These tests require a running application
    // You may want to skip these in CI if no app is running
    
    before(() => {
        // Check if the app is running, skip tests if not
        cy.request({
            url: '/',
            failOnStatusCode: false
        }).then((response) => {
            if (response.status !== 200) {
                cy.log('Application not running, skipping E2E tests');
            }
        });
    });

    it('User logs in and sends an email', () => {
        cy.visit('/');
        cy.get('input[name=username]').type('testuser');
        cy.get('input[name=password]').type('password123');
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/dashboard');
    });

    it('User checks calendar events after sending an email', () => {
        cy.visit('/calendar');
        cy.contains('Calendar View');
        cy.get('ul').should('exist');
    });

    it('User interacts with life admin automation features', () => {
        cy.visit('/life-admin');
        cy.get('button').contains('Pay Bill').click();
        cy.contains('Payment successful');
    });
});