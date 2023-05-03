// enables typescript checking in javascript files
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import "cypress-map"

describe('sorting', () => {
  beforeEach(() => {
    //login
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
  })

  /**
   * Sorts items by price
   * @param {"lohi" | "hilo"} order 
   */
  function sortByPrice(order) {
    const orderValues = ["lohi", "hilo"]
    expect(orderValues).to.include(order)
    cy.log(`**Sort by price: ${order}**`)
    cy.get("[data-test='product_sort_container']")
        .should("be.visible")
        .select(order)
  }

  function getPrices(){
    return cy
      .get(".inventory_item_price")
      .then(console.log)
      .map("innerText")
      .print("mapped prices: %o")
      .mapInvoke("slice", 1)
      .print("prices without dollar sign: %o")
      .map(Number)
      .print("prices converted to Number: %o")
  }

  context('', () => {
    it('should verify high to low price order', () => {
      sortByPrice("hilo")
      getPrices().should((prices) => { // one way to check sort order using lodash
          const sorted = Cypress._.orderBy(prices, [], ['desc'])
          console.log
          expect(sorted, "sorted price").to.deep.equal(prices)
          console.log(prices)
        })
    })
  })
})
