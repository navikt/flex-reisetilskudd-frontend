import { apenReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Teste statiske sidelelementer i reisetilskuddsøknaden', () => {
    const reisetilskudd = apenReisetilskudd

    before(() => {
        cy.visit('http://localhost:3000')
    })

    it('Laster startside', () => {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader om reisetilskudd')
        cy.get(`.tilskudd__teasere a[href*=${reisetilskudd.reisetilskuddId}]`).click()
    })

    it('Laster inn header og headerelementer', function() {
        cy.get('.sidebanner').should('be.visible')
        cy.get('.sidebanner__tittel').should('be.visible').and('have.text', 'Søknad om reisetilskudd')
    })

    it('Laster inn veilederpanel', function() {
        cy.get('.veileder').should('be.visible')
        cy.get('.veileder .nav-veilederpanel__content h2').should('be.visible').and('have.text', 'Søknad om reisetilskudd')
    })

    it('Laster inn Hvem kan få reisetilskudd', function() {
        cy.get('.hvem-kan-faa').should('be.visible')
        cy.get('.hvem-kan-faa .ekspanderbartPanel__tittel').should('be.visible').and('have.text', 'Hvem kan få reisetilskudd?')
    })

    it('Laster inn veilederpanel spar-tid', function() {
        cy.get('.spar-tid').should('be.visible')
        cy.get('.spar-tid .nav-veilederpanel__content h2').should('be.visible').and('have.text', 'Spar tid ved å bruke mobilen')
    })

    it('Laster inn sykmelding-panel', function() {
        cy.get('.sykmelding-panel').should('be.visible')
        cy.get('.sykmelding-panel .sykmelding-panel__tittel').should('be.visible').and('have.text', 'Opplysninger fra sykmeldingen')
    })

    it('Laster inn alertstripe med kan-sendes-dato', function() {
        cy.get('.kan-sendes').should('be.visible')
        cy.get('.kan-sendes.alertstripe--suksess')
            .should('be.visible')
            .and('contain.text', 'Søknaden er klar til å sendes inn')
    })

    it('Laster inn knapperad, klikker og går til soknad-side', function() {
        cy.get('.knapp--hoved').should('be.visible').click()
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
