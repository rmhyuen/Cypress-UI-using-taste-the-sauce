import "cypress-map"

describe('sorting', () => {
  context('', () => {
    it('should login and verify high to low price order', () => {
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
      cy.get("[data-test='product_sort_container']")
        .should("be.visible")
        .select("hilo")
      cy.get(".inventory_item_price")
        .then(console.log)
        .map("innerText")
        .print("mapped prices: %o")
        .mapInvoke("slice", 1)
        .print("prices without dollar sign: %o")
        .map(Number)
        .print("prices converted to Number: %o")
        .should((prices) => { // one way to check sort order using lodash
          const sorted = Cypress._.orderBy(prices, [], ['desc'])
          console.log
          expect(sorted, "sorted price").to.deep.equal(prices)
          console.log(prices)
        })
    })
  })
})
