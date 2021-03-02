import { avbrutt as avbruttReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Tester avbruttReisetilskudd', () => {
    const reisetilskudd = avbruttReisetilskudd

    before(() => {
        cy.visit('http://localhost:3000')
    })

    describe('Gjenåpning av reisetilskudd', () => {
        it('Finner avbrutt reisetilskudd', () => {
            cy.get('.tilskudd--tidligere').within(() => {
                cy.contains('Tidligere søknader')
                cy.get(`a[href*=${reisetilskudd.id}]`).click()
            })
            cy.url().should('include', `/soknaden/${reisetilskudd.id}/avbrutt`)
        })

        it('Avbrutt side har riktig innhold', () => {
            cy.get('.alertstripe--advarsel')
                .should('contain', 'Du valgte å ikke bruke søknaden')
                .and('contain', '13. mai 2020, kl 00:00')
            cy.contains('Du kan fortsatt bruke søknaden')
            cy.contains('Om du skulle ombestemme deg kan du fylle ut og sende inn søknaden på et senere tidspunkt. Husk at søknadsfristen er 3 måneder etter at den ble opprettet.')
        })

        it('Gjenåpner reisetilskudd', () => {
            cy.get('.gjenapne')
                .should('contain', 'BRUK SØKNADEN')
                .click()
            cy.url().should('include', `/soknaden/${reisetilskudd.id}/1`)
        })
    })

    describe('Avbryt reisetilskudd', () => {
        it('Åpne dialog, men angre', () => {
            cy.contains('Jeg ønsker ikke å bruke denne søknaden')
                .click()
            cy.contains('Er du sikker på at du ikke ønsker å bruke denne søknaden?')
            cy.contains('Angre')
                .click()
        })

        it('Åpne dialog og avbryt reisetilskudd', () => {
            cy.contains('Jeg ønsker ikke å bruke denne søknaden')
                .click()
            cy.contains('JA, JEG ER SIKKER')
                .click({ force: true })
            cy.url().should('include', `/soknaden/${reisetilskudd.id}/avbrutt`)
        })
    })
})
