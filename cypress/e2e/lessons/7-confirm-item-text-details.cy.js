// enables typescript checking in javascript files
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('item', () => {
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

  context('item details', () => {
    it('should verify item details', () => {
      // confirm there is an item in the inventory
      // with:
      //   name: "Sauce Labs Bike Light"
      //   description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night"
      //   price: $9.99
      // https://on.cypress.io/contains
      // https://on.cypress.io/within

      cy.contains(".inventory_item_name", "Sauce Labs Bike Light")
      cy.contains(".inventory_item_desc", "A red light isn't the desired state in testing but it sure helps when riding your bike at night")
      cy.contains(".inventory_item_price", "$9.99")
    })
  })
})
