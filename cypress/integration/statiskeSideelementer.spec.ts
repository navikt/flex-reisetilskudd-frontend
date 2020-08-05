import mockReisetilskudd from '../../src/data/mock/reisetilskudd';

describe('Teste statiske sidelelementer i reisetilskuddsøknaden', () => {
      const url:string = `http://localhost:3000/soknaden/${mockReisetilskudd[0].reisetilskuddId}/1`

    before(() => {
        cy.visit(url)
    })

    it('Laster inn header og headerelementer', function() {
        cy.get('.header').should('be.visible')
        cy.get('.søknadstittel').should('be.visible').and('have.text', 'Søknad om reisetilskudd')
        cy.get('.header-icons').should('be.visible')
    })

    it('tilbake-knapp eksisterer på siden', ()=> {
        let tilbakeKnapp = cy.get('.tilbake-knapp')
        tilbakeKnapp.should('be.visible')
    })

    it('Laster inn stegindikator', function() {
        let stegindikator = cy.get('.stegindikator')
        stegindikator.should('be.visible')
        cy.contains('Utbetaling av pengene')
        cy.contains('Dagens transportmiddel')
        cy.contains('Transportmiddel i reisetilskuddperioden')
        cy.contains('Oppsummering')
    })

    it('Laster inn sykemeldingpanel', ()=> {
        let panel = cy.get('.sykmelding-panel-wrapper')
        panel.should('be.visible').and('have.text', 'Opplysninger fra sykmeldingen')
        panel.click()
    })
})
