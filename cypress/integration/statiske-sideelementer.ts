import mockReisetilskudd from '../../src/data/mock/data/reisetilskudd'

describe('Teste statiske sidelelementer i reisetilskuddsøknaden', () => {
    const url = `http://localhost:3000/soknaden/${mockReisetilskudd[0].reisetilskuddId}/1`

    before(() => {
        cy.visit(url)
    })

    it('Laster inn header og headerelementer', function() {
        cy.get('.sidebanner').should('be.visible')
        cy.get('.sidebanner__tittel').should('be.visible').and('have.text', 'Søknad om reisetilskudd')
        cy.get('.bannerikoner').should('be.visible')
    })

    it('tilbake-lenke eksisterer på siden', ()=> {
        cy.get('.tilbake-lenke').should('be.visible')
    })

    it('Laster inn stegindikator', function() {
        cy.get('.stegindikator').should('be.visible')
        cy.contains('Utbetaling av pengene')
        cy.contains('Dagens transportmiddel')
        cy.contains('Transportmiddel i reisetilskuddperioden')
        cy.contains('Oppsummering')
    })

    it('Laster inn sykemeldingpanel', ()=> {
        cy.get('.sykmelding-panel').should('be.visible').and('have.text', 'Opplysninger fra sykmeldingen').click()
    })
})
