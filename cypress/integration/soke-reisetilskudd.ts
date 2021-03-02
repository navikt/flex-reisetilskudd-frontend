import { sendbarReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Tester reisetilskuddsøknaden', () => {

    const reisetilskudd = sendbarReisetilskudd

    before(() => {
        cy.visit('http://localhost:3000')
    })

    it('Laster startside', () => {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader om reisetilskudd')
        cy.get(`.tilskudd__teasere a[href*=${reisetilskudd.id}]`).click()
        cy.url().should('include', `/soknaden/${reisetilskudd.id}/1`)
    })

    describe('Vi stoler på deg', () => {
        it('Opplysninger fra sykmeldingen', () => {
            cy.get('.sykmelding-panel')
                .should('be.visible')
                .and('contain', 'Opplysninger fra sykmeldingen')
                .click()

            cy.get('.sykmelding-perioder')
                .should('contain', 'Periode')
                .and('contain', '1. – 18. februar 2021 • 18 dager')
                .and('contain', 'Reisetilskudd')

            cy.get('.sykmelding-panel')
                .should('contain', 'Arbeidsgiver')
                .and('contain', 'LOMMEN BARNEHAVE')
                .and('contain', 'Dato sykmeldingen ble skrevet')
                .and('contain', '1. februar 2021')
                .and('contain', 'Hva passer best for deg?')
                .and('contain', 'Jeg er ansatt')
        })

        it('Sykmeldingen kan minimeres', () => {
            cy.get('.sykmelding-panel .lenkerad')
                .contains('Lukk')
                .click()

            cy.get('.sykmelding-panel')
                .should('not.contain', 'Dato sykmeldingen ble skrevet')
        })

        it('Må huke av checkbox før neste steg', () => {
            cy.get('.knapperad .knapp--hoved').should('be.visible').click({ force: true })
            cy.url().should('include', `/soknaden/${reisetilskudd.id}/1`)

            cy.get('input[type=checkbox]').click({ force: true })
            cy.get('.knapperad').contains('Gå videre').click()
        })
    })

    describe('Før du fikk sykmelding', () => {
        it('Laster tekst', () => {
            cy.get('.skjema__legend').within(() => {
                cy.get('.typo-undertittel').should('have.text', 'Før du fikk sykmelding')
                cy.get('.typo-element').should('have.text', 'Brukte du bil eller offentlig transport til og fra jobben?')
                cy.get('.utvidbar.intern').contains('Hva regnes som offentlig transport?').click()
                cy.get('.utvidbar__innhold .typo-normal').contains('Eksempler på offentlig transport: Buss, tog, t-bane, bysykkel, el-sparkesykkel.')
            })
        })

        it('Kan ikke gå videre før spørsmål er besvart', () => {
            cy.get('.knapperad').contains('Gå videre').should('have.attr', 'disabled')
            cy.get('input[type=radio][value=NEI]').click({ force: true })
            cy.get('.knapperad').contains('Gå videre').should('not.have.attr', 'disabled')
        })

        it('Svarer på underspørsmål', () => {
            cy.get('input[type=radio][value=JA]').click({ force: true })
            cy.get('.knapperad').contains('Gå videre').should('have.attr', 'disabled')

            cy.get('.skjemaelement__label').contains('Bil').click({ force: true })
            cy.get('.knapperad').contains('Gå videre').should('have.attr', 'disabled')

            cy.get('.undersporsmal').contains('Hvor mange km er kjøreturen mellom hjemmet ditt og jobben?')
            cy.get('input[type=number]').type('25.1')

            cy.get('.knapperad').contains('Gå videre').click({ force: true })
        })
    })

    describe('Reise med bil', () => {
        it('Laster tekst', () => {
            cy.get('.skjema__legend').within(() => {
                cy.get('.typo-undertittel').should('have.text', 'Reise med bil')
                cy.get('.typo-element').should('have.text', 'Reiste du med egen bil, leiebil eller en kollega til jobben fra 1. februar - 18. mars 2021?')
            })
        })

        it('Fyller ut reise med bil', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.id}/3`)
            cy.get('.knapperad').contains('Gå videre').should('have.attr', 'disabled')

            cy.get('input[type=radio][value=JA]').click({ force: true })
            cy.get('.knapperad').contains('Gå videre').should('have.attr', 'disabled')

            cy.get('.undersporsmal .typo-element').should('have.text', 'Hvilke dager reiste du med bil?')
            cy.get('.skjema__dager').within(() => {
                cy.get('.kalenderdag.foran').contains('31')
                cy.get('.kalenderdag.etter').contains('19')

                cy.get('.kalenderdag label').contains('05').click({ force: true })
                cy.get('.kalenderdag label').contains('11').click({ force: true })
                cy.get('.kalenderdag label').contains('12').click({ force: true })
                cy.get('.kalenderdag label').contains('13').click({ force: true })
                cy.get('.kalenderdag label').contains('19').click({ force: true })

                cy.get('.kalenderdag label').contains('12').click({ force: true })

                cy.get('.kalenderdag input:checked + label').should('have.text', '05111319')
            })

            cy.get('.knapperad .knapp--hoved').click({ force: true })
        })
    })

    describe('Kvitteringer', () => {
        it('Går videre', () => {
            cy.get('.knapperad').contains('Gå videre').click()
        })
    })

    describe('Utbetaling', () => {
        it('Laster tekst', () => {
            cy.get('.skjema__legend').within(() => {
                cy.get('.typo-undertittel').should('have.text', 'Utbetaling')
                cy.get('.typo-element').should('have.text', 'Legger arbeidsgiveren din ut for reisene?')
            })
        })

        it('Svarer nei', () => {
            cy.get('.knapperad').contains('Gå videre').should('have.attr', 'disabled')
            cy.get('input[type=radio][value=NEI]').click({ force: true })
        })

        it('Går videre', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.id}/5`)
            cy.get('.knapperad').contains('Gå videre').click()
        })
    })

    describe('Reisetilskudd side 4', () => {
        // TODO: Er dette siste versjon av oppsummering?
        xit('Oppsummering av søknaden', () => {
            cy.get('.soknad-info-utvid').click()
            cy.contains('Oppsummering av søknaden')
            cy.contains('Hvem skal pengene utbetales til?')
            cy.contains('Hvordan reiste du før sykmeldingen?')
            cy.contains('Opplastede kvitteringer')
        })

        xit('Reisetilskudd tekster', () => {
            cy.get('.typo-undertittel').contains('Bekreft og send søknaden')
            cy.get('.typo-normal').contains('Sjekk at du har fått med alle nødvendige opplysninger og kvitteringer. Når du sender søknaden, går den til NAV. POSTEN NORGE får samtidig en kopi.')

            cy.get('.typo-element').contains('Hovedpunkter fra søknaden')
            cy.contains('Du søker om reisetilskudd mellom 13. og 19. mai 2020')
            cy.contains('Du har krysset av for at arbeidsgiveren din betaler utgiftene. Reisetilskuddet fra NAV går derfor til arbeidsgiveren din.')

            cy.get('.bekreftCheckboksPanel').contains('Jeg har lest informasjonen jeg har fått underveis i søknaden og bekrefter at opplysningene jeg har gitt er korrekte. Jeg bekrefter også at jeg har lest og forstått')
            cy.get('.bekreftCheckboksPanel input').click()
        })

        it('Send inn søknaden', () => {
            cy.get('.knapperad').contains('Send inn søknaden').click()
        })
    })

    describe('Bekreftelsesside', () => {
        it('Sjekker at bekreftelsessiden inneholder elementer', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.id}/bekreftelse`)

            cy.get('.alertstripe--suksess').contains('Søknaden ble sendt til NAV')

            cy.get('.typo-undertittel').contains('NAV behandler søknaden')
            cy.get('.typo-normal').contains('Saksbehandlingstiden kan variere noe.')

            cy.get('.soknad-info-utvid')

            cy.get('.sykmelding-panel')
                .should('be.visible')
                .and('have.text', 'Opplysninger fra sykmeldingen')
        })
    })
})
