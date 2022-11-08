
var list = []
var products_name = []
var quantity = []

Cypress.Commands.add('login', (username, pw,positive) => { //login command
    cy.get('#username').clear().type(username) // clear and write user name in input
    cy.get('#password').clear().type(pw) //clear and write password in input
    cy.get('button[name="login"]').click() // click login button
    cy.wait(2000)
    if(positive == true){ // check if it shold be connect
        cy.get('.woocommerce-MyAccount-content').should('be.visible') // check if connect is successfuly
        console.log('you are login successfuly') // write to log 
    }
})

describe('Test', () => {
    it('get into Shop', () => {
        cy.visit('https://practice.automationbro.com') // go to web site
        cy.contains('My account').click()   //get into login
        cy.login("eli565600@icloud.com","a352147F!", true) //commands to login
        cy.contains('Shop').click()   //get into Shop

        cy.get('[class*="products columns-3"] li').each(($ele) => { // get all element products
            list.push($ele.text().trim())
        })  
    })
    
    it('select property and check cart', () => {
        let product
        let name_product
        for (let index = 0; index < 5; index++) {
            product = list[Math.floor(Math.random() * 9)].split('\t')
            if(product[0].includes('Sale')){
                name_product = product[1].slice(0,product[1].length-1)
            }else{
                name_product = product[0].slice(0,product[0].length-1)
            }
            cy.get('[aria-label="Add “'+name_product+'” to your cart"]').click()
            cy.wait(1000)
            let indexof = products_name.indexOf(name_product)
            if(indexof ==  -1){
                products_name.push(name_product)
                quantity.push(1)
            }else{ quantity[indexof]+=1 }

        }   

        cy.contains('View cart').click()   //get into cart
        cy.wait(3000)
        cy.get('.quantity > input').each(($el, index) => {
            cy.wrap($el).should('have.attr', 'value', quantity[index]) // check quantity of products
          })
        cy.get('.product-name > a').each(($el, index) => {
            cy.wrap($el).should('have.text', products_name[index]) //check name of products
          })
    })

})

