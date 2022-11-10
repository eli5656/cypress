// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, pw,positive) => { //login command
    cy.get('#username').clear().type(username) // clear and write user name in input
    cy.get('#password').clear().type(pw) //clear and write password in input
    cy.get('button[name="login"]').click() // click login button
    cy.wait(5000)
    if(positive == true){ // check if it shold be connect
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('be.visible') // check if connect is successfuly
        console.log('you are login successfuly') // write to log 
    }
})