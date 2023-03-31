/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Text Tests', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/');
    });

    it('should display text input', () => {
        cy.get('.App > :nth-child(1)').should('be.visible');
    });

    it('should display the text list', ()=> {
        cy.request('http://localhost:4000/texts').then((response) => {
            cy.get('ul')
              .children()
              .should('have.length', response.body.texts.length);
        });
    });

    it('should display error correctly', () => {
        cy.contains("Submit").click();

        cy.contains("Oops! Make sure you entered text");
        cy.contains("Clear").click();

        cy.contains("Oops! Make sure you entered text").should('not.exist');
        cy.contains("Clear").should('not.exist');
    });
})