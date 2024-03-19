import { password } from "../data/password";

describe('Osaspace', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)

    cy.session('login and set language', () => {
      // Login
      cy.visit('https://app.osaspace.it/')
      cy.get('#username').type('alessandro.falezza')
      cy.get('#password').type(password)
      cy.get('#kc-login').click()
      cy.wait(5000)

      // Set language
      cy.visit('https://app.osaspace.it/settings/user')
      cy.get('#account-setting-language').select('English (US)')
    })
  })


  it.skip('login passes', () => {
    cy.location().should((loc) => {
      expect(loc.pathname).contains('apps/files')
    })
  })

  describe('section files', () => {
    beforeEach(() => {
      cy.visit('https://app.osaspace.it/apps/files/')
    })
   
    it('contiene il menu di navigazione della sezione files', () => {
      cy.get('.app-navigation__list')
        .contains('All files')
        .should('exist')
      cy.get('.app-navigation__list')
        .contains('Recent')
        .should('exist')
      cy.get('.app-navigation__list')
        .contains('Favorites')
        .should('exist')
    })

    it('contiene la tabella dei files', () => {
      cy.get('table.files-filestable').should('exist')
      cy.get('table.files-filestable tbody tr').should('have.length.at.least', 1)
    })

  })

  describe('section calendar', () => {
    beforeEach(() => {
      cy.visit('https://app.osaspace.it/apps/calendar')
    })

    it("c'è un calendario", () => {
      cy.get('table').contains('Mon').should('exist')
      cy.get('table').contains('Tue').should('exist')
      cy.get('table').contains('Wed').should('exist')
      cy.get('table').contains('Thu').should('exist')
      cy.get('table').contains('Fri').should('exist')
      cy.get('table').contains('Sat').should('exist')
      cy.get('table').contains('Sun').should('exist')
    })
  })

})