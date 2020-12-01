import mockReisetilskudd from '../../src/data/mock/data/reisetilskudd'

describe('Teste statiske sidelelementer i reisetilskuddsøknaden', () => {
    const url = `http://localhost:3000/soknaden/${mockReisetilskudd[0].reisetilskuddId}/1`

    before(() => {
        cy.visit(url)
    })

    it('Laster inn header og headerelementer', function() {
        cy.get('.sidebanner').should('be.visible')
        cy.get('.sidebanner__tittel').should('be.visible').and('have.text', 'Søknad om reisetilskudd')
    })

    it('Laster inn sidenavigasjon', function() {
        cy.get('.side_nav').should('be.visible')
        cy.contains('Utbetaling')
        cy.contains('Transport')
        cy.contains('Kvitteringer')
        cy.contains('Bekreft og send')
        cy.get('button .chevron--venstre').should('be.visible')
        cy.get('button .chevron--hoyre').should('be.visible')
    })

    it('Laster inn sykemeldingpanel', ()=> {
        cy.get('.sykmelding-panel').should('be.visible').and('have.text', 'Opplysninger fra sykmeldingen').click()
    })
})
