import "cypress-map"

describe('template spec', () => {
  context('', () => {
    it('should login and confirm the lowest price', () => {
      cy.visit('/')
      cy.get("[data-test='username']")
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Username')
        .type('standard_user')
      cy.get("[data-test='password']")
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Password')
        .type('secret_sauce')
      cy.get("[data-test='login-button']")
        .should('be.visible')
        .click()
      cy.location('pathname')
        .should('equal', '/inventory.html')
      cy.get('.inventory_item_price')
        .then(console.log) // old way to log, using the console
        .should("be.visible")
        .map("innerText") // newer way to map using cypress-map so it's chainable and retries
        .print()
        .mapInvoke("slice", 1) //remove the $
        .print()
        .map(Number) // map it as Number from string
        .apply(Cypress._.min) // use lodash to get the min value
        .print()
        .should("equal", 7.99)
    })
  })
})
