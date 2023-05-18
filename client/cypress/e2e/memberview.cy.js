import {beforeEach} from "mocha";

describe('home page', () => {
  beforeEach(() => {
    cy.visit('/')

  })

  it('the h1 contains the correct text', () => {
    cy.getByData("site-title")
        .should("exist")
        .contains('Übersicht Mitgliederverwaltung')
  })

})