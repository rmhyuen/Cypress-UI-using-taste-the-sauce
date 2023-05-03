// enables typescript checking in javascript files
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import item from "../../fixtures/bike-light.json"

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
    it('should verify item details. v1 using cy.fixture within the test', () => {
      cy.fixture("bike-light.json")
        .then((item) => {
          console.log(item)
          cy.contains(".inventory_item", item.name).within(() => {
            cy.contains(".inventory_item_name", item.name)
            cy.contains(".inventory_item_desc", item.description)
            cy.contains(".inventory_item_price", item.price)
          })
        })
    })

    it('should verify item details. v2 using alias in beforeEach, using function callback, and this', function () {
      cy.contains(".inventory_item", this.item.name).within(() => {
        cy.contains(".inventory_item_name", this.item.name)
        cy.contains(".inventory_item_desc", this.item.description)
        cy.contains(".inventory_item_price", this.item.price)
      })
    })

    it('should verify item details. v3 using import', () => {
      cy.contains(".inventory_item", item.name).within(() => {
        cy.contains(".inventory_item_name", item.name)
        cy.contains(".inventory_item_desc", item.description)
        cy.contains(".inventory_item_price", item.price)
      })
    })
  })
})
