import { åpenReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Tester åpen Reisetilskudd', () => {

    before(() => {
        cy.visit('http://localhost:3000')
    })

    describe('Åpen reisetilskudd', () => {
        it('Reisetilskudd teaser', () => {
            cy.get('.tilskudd--usendt')
                .contains('Klar til utfylling')
                .should('have.attr', 'href', `/syk/reisetilskudd/soknadstart/${åpenReisetilskudd.reisetilskuddId}/1`)
                .click()
        })


        it('Kan sendes inn alert', () => {
            cy.url().should('contain', `/syk/reisetilskudd/soknadstart/${åpenReisetilskudd.reisetilskuddId}/1`)
            cy.get('.kan-sendes.alertstripe--advarsel')
                .should('contain', 'Søknaden kan sendes 01. juni 2022')
                .and('contain', 'Du kan begynne å fylle ut søknaden. Alle endringer lagres.')
        })

        it('Går videre', () => {
            cy.get('.knapperad').contains('Gå videre').click()
            cy.get('.knapperad').contains('Gå videre').click()
            cy.get('.knapperad').contains('Gå videre').click()
            cy.get('.knapperad').contains('Gå videre').click()
        })

        it('Send inn søknaden skal ikke være mulig', () => {
            cy.url().should('contain', `/syk/reisetilskudd/soknaden/${åpenReisetilskudd.reisetilskuddId}/4`)
            cy.get('.kan-sendes.alertstripe--advarsel')
                .should('contain', 'Søknaden kan sendes 01. juni 2022')
                .and('contain', 'Du kan begynne å fylle ut søknaden. Alle endringer lagres.')

            cy.get('.knapperad .knapp--hoved[type=submit]')
                .should('have.text', 'Send inn søknaden')
                .and('have.class', 'knapp--disabled')
                .and('have.attr', 'disabled', 'disabled')
                .click({ force: true })     // Force for å ignorere diasabled warning og sjekke at ingenting skjer

            cy.url().should('contain', `/syk/reisetilskudd/soknaden/${åpenReisetilskudd.reisetilskuddId}/4`)
        })
    })

})
