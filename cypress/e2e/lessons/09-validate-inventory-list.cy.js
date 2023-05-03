// enables typescript checking in javascript files
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import inventory from "../../fixtures/inventory.json"

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
    cy.fixture("bike-light.json").as("item")
  })

  context('item details', () => {
    it('should verify each item from the inventory. v1', () => {
      // load the inventory JSON fixture file
      // https://on.cypress.io/fixture
      cy.fixture('inventory.json').then((items) => {
        // iterate over every data item
        items.forEach((item) => {
          cy.log(`checking 🎁 **${item.name}**`)
          // and confirm there is an item on the page
          // with the name, description, and price listed
          // https://on.cypress.io/contains
          // https://on.cypress.io/within
          // Note: check the properties in the inventory object
          cy.contains('.inventory_item', item.name).within(() => {
            cy.contains('.inventory_item_name', item.name)
            cy.contains('.inventory_item_desc', item.desc)
            cy.contains('.inventory_item_price', item.price)
          })
        })
      })
    })

    it('should verify each item from the inventory. v2', () => {
      inventory.forEach((item) => {
        cy.contains(".inventory_item", item.name).within(() => {
        cy.contains(".inventory_item_name", item.name)
        cy.contains(".inventory_item_desc", item.desc)
        cy.contains(".inventory_item_price", item.price)
        })
      })
    })
  })
})
