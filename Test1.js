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
// use parametrize to add esaly in futre
const users = [{
        subtitle: 'user and pass incorrect',
        name: 'eli566',
        password: '121212',
        eValue: false,
    },
    {
        subtitle: 'user name and password empty',
        name: '{backspace}',
        password: '{backspace}',
        eValue: false,
    },
    {
        subtitle: 'connect success',
        name: 'eli565600@icloud.com',
        password: 'a352147F!',
        positive: true,
    }];

describe('Test', () => {
    it('go int login', () => {
        cy.visit('https://practice.automationbro.com') // go to web site
        cy.contains('My account').click()   //get into login
    })

    users.forEach(user_E => {
        it(user_E.subtitle, () => {
            cy.login(user_E.name,user_E.password,user_E.positive) //commands to login  
        })
    })
        
    it('log out', () => {
        cy.contains('Log out').click() //click to log out
        cy.wait(3000)
        cy.get('button[name="login"]').should('be.visible') // // check if logout is successfuly
    })
});
