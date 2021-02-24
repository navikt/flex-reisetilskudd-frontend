import { fremtidig as fremtidigReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Tester fremtidig Reisetilskudd', () => {

    before(() => {
        cy.visit('http://localhost:3000')
    })

    describe('Fremtidig reisetilskudd', () => {
        it('Har riktig tekst', () => {
            cy.get(`#${fremtidigReisetilskudd.id}`).should('contain', 'Aktiveres 13. mai 2029')
        })


        it('Går ingen steder ved click', () => {
            cy.get(`#${fremtidigReisetilskudd.id}`)
                .click()
            cy.url().should('equal', 'http://localhost:3000/')
        })
    })

})
