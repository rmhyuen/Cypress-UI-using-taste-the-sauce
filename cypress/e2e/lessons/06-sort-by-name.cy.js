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
   * @param {"lohi" | "hilo" | "az" | "za"} order 
   */
  function sortByPriceOrName(order) {
    const orderValues = ["lohi", "hilo", "az", "za"]
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

  function getNames(){
    return cy
      .get(".inventory_item_name")
      .then(console.log)
      .map("innerText")
      .print("mapped names: %o")
  }

  context('sort by name', () => {
    it('should verify name in ascending order', () => {
      sortByPriceOrName("az")
      getNames().should((names) => { // one way to check sort order using lodash
          const sorted = Cypress._.orderBy(names, [], ['asc'])
          console.log
          expect(sorted, "sorted names").to.deep.equal(names)
          console.log(names)
        })
    })

    it('should verify name in descending order', () => {
      sortByPriceOrName("za")
      getNames().should((names) => { // one way to check sort order using lodash
          const sorted = Cypress._.orderBy(names, [], ['desc'])
          console.log
          expect(sorted, "sorted price").to.deep.equal(names)
          console.log(names)
        })
    })
  })
})
