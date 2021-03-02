import { apenReisetilskudd as åpenReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Tester åpen Reisetilskudd', () => {

    before(() => {
        cy.visit('http://localhost:3000')
    })

    describe('Åpen reisetilskudd', () => {
        it('Reisetilskudd teaser', () => {
            cy.get('.tilskudd--nye').within(() => {
                cy.contains('Nye søknader')
                cy.get(`a[href*=${åpenReisetilskudd.id}]`).click()
            })
        })


        it('Kan sendes inn alert', () => {
            cy.url().should('contain', `/syk/reisetilskudd/soknaden/${åpenReisetilskudd.id}/1`)
            cy.get('.kan-sendes.alertstripe--advarsel')
                .should('contain', 'Søknaden kan sendes 19. feb. 2021')
                .and('contain', 'Du kan begynne å fylle ut søknaden. Alle endringer lagres.')
        })

        it('Går videre', () => {
            cy.get('input[type=checkbox]').click({ force: true })
            cy.get('.knapperad').contains('Gå videre').click()

            cy.get('input[type=radio][value=NEI]').click({ force: true })
            cy.get('.knapperad').contains('Gå videre').click()

            cy.get('input[type=radio][value=NEI]').click({ force: true })
            cy.get('.knapperad').contains('Gå videre').click()

            cy.get('.knapperad').contains('Gå videre').click()

            cy.get('input[type=radio][value=NEI]').click({ force: true })
            cy.get('.knapperad').contains('Gå videre').click()
        })

        it('Send inn søknaden skal ikke være mulig', () => {
            cy.url().should('contain', `/syk/reisetilskudd/soknaden/${åpenReisetilskudd.id}/6`)
            cy.get('.kan-sendes.alertstripe--advarsel')
                .should('contain', 'Søknaden kan sendes 19. feb. 2021')
                .and('contain', 'Du kan begynne å fylle ut søknaden. Alle endringer lagres.')

            cy.get('.knapperad .knapp--hoved[type=submit]')
                .should('have.text', 'Send inn søknaden')
                .and('have.class', 'knapp--disabled')
                .and('have.attr', 'disabled', 'disabled')
                .click({ force: true })     // Force for å ignorere diasabled warning og sjekke at ingenting skjer

            cy.url().should('contain', `/syk/reisetilskudd/soknaden/${åpenReisetilskudd.id}/6`)
        })
    })

})
