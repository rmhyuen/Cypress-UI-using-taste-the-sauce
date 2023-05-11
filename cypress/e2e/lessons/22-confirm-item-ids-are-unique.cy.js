// enables typescript checking in javascript files
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from './17-login.page'

describe('Products', () => {
  // create a small type on the fly using jsdoc comment
  // just to help type check help us
  /** @type {{username: string, password: string}} */
  const user = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('have unique ids', () => {
    // get all inventory items, there should be more than 3
    // https://on.cypress.io/get
    // https://on.cypress.io/should
    cy.get(".inventory_item")
      .should("have.length.greaterThan", 3)
      //convert the jquery command yielded by cy.get to an array
      .invoke("toArray") //will yield an array of html dom elements
      //here's one way to create a map
      //.then(elements => elements.map(el => el.getAttribute("data-itemid")))
      //instead, invoke "map"
      .invoke("map", (el) => el.getAttribute("data-itemid"))
      .then(console.log)
      .should(ids => {
        const unique = Cypress._.uniq(ids)
        expect(unique, "unique ids").to.deep.equal(ids)
      })
    //
    // from each element, get the attribute "data-itemid"
    // and confirm the ids are unique
    // https://on.cypress.io/invoke
    // https://glebbahmutov.com/cypress-examples
  })
})