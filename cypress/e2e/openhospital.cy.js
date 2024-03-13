/// <reference types="cypress" />

describe('Openhospital - patient section', () => {

  it('Should be reachable', () => {
    cy.viewport('macbook-15');
    cy.visit('http://localhost:3000');
    cy.location('pathname').should('contain', 'login');
    cy.contains('Login').should('exist');
  })

  it('Should login', () => {
      cy.viewport('macbook-15');
      cy.visit('http://localhost:3000');
      cy.get('#username').type('admin');
      cy.get('#password').type('admin');
      cy.contains('Login').click();
      cy.contains('Benvenuto John Doe').should('exist');
  });

  describe('Patient section', () => {

    beforeEach(() => {
      cy.viewport('macbook-15');
      cy.visit('http://localhost:3000');
      cy.get('#username').type('admin');
      cy.get('#password').type('admin');
      cy.contains('Login').click();
      cy.get('.appHeader__nav_items').contains('Pazienti').click();
    })

    it('can add a new patient', () => {
      cy.get('button').contains('Nuovo Paziente').click();
      cy.get('#firstName').type('Mario');
      cy.get('#secondName').type('Rossi');
      cy.get('#sex').next().click();
      cy.contains('Maschio').click();
      cy.get('#atype').next().click();
      cy.contains('in anni').click();
      cy.get('#age').clear().type('20');
      cy.contains('Invia').click();
      cy.contains('Paziente creato').should('exist');
    });

    describe('Search patients', () => {
      it('can search by id', () => {
        cy.get('button').contains('Cerca pazienti').click();
        cy.get('#id').type('4');
        cy.get('button').contains('Cerca').click();
        cy.get('.searchPatient__results_count').should('contain', '1');
        cy.get('.patientSearchItem__profile__content__name').should('contain', 'Antonio Carlos Jobim');
      });

      it('can search by name', () => {
        cy.get('button').contains('Cerca pazienti').click();
        cy.get('#firstName').type('Mario');
        cy.get('button').contains('Cerca').click();
        cy.contains('Antonio Carlos Jobim').should('have.length.at.least', 1);
      });

      it('should require at leash the patient id', () => {
        cy.get('button').contains('Cerca pazienti').click();
        cy.get('button').contains('Cerca').click();
        cy.get('#id-helper-text').should('be.visible').and('contain', 'required');
      });
    });
  });
});