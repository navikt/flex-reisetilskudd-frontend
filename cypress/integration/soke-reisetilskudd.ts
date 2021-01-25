import { sendbarReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Tester reisetilskuddsøknaden', () => {

    const reisetilskudd = sendbarReisetilskudd

    before(() => {
        cy.visit('http://localhost:3000')
    })

    it('Laster startside', () => {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader om reisetilskudd')
        cy.get(`.tilskudd__teasere a[href*=${reisetilskudd.reisetilskuddId}]`).click()
    })

    describe('Soknadstart', () => {
        it('Opplysninger fra sykmeldingen', () => {
            cy.get('.sykmelding-panel')
                .should('be.visible')
                .and('contain', 'Opplysninger fra sykmeldingen')

            cy.get('.sykmelding-perioder')
                .should('contain', 'Periode')
                .and('contain', '1. – 7. januar 2021 • 7 dager')
                .and('contain', 'Reisetilskudd')

            cy.get('.sykmelding-panel')
                .should('contain', 'Arbeidsgiver')
                .and('contain', 'LOMMEN BARNEHAVE')
                .and('contain', 'Dato sykmeldingen ble skrevet')
                .and('contain', '1. januar 2021')
                .and('contain', 'Hva passer best for deg?')
                .and('contain', 'Jeg er ansatt')
        })

        it('Sykmeldingen kan minimeres', () => {
            cy.get('.sykmelding-panel .lenkerad')
                .contains('Lukk')
                .click()

            cy.get('.sykmelding-panel')
                .should('not.contain', 'Dato sykmeldingen ble skrevet')

            cy.get('.sykmelding-panel')
                .click()

            cy.get('.sykmelding-panel')
                .should('contain', 'Dato sykmeldingen ble skrevet')
        })

        it('Finner videreknappen', () => {
            cy.get('.knapperad .knapp--hoved').should('be.visible').click()
        })
    })

    describe('Reisetilskudd side 1', () => {
        it('Inneholder content', () => {
            cy.get('.horisontal-radio').should('be.visible')
        })

        it('Laster tekst', () => {
            cy.get('.skjemagruppe__legend .typo-systemtittel').should('be.visible')
            cy.contains('Utbetaling')
            cy.contains('Skal reisetilskuddet utbetales til arbeidsgiveren din?')
        })

        it('Tar tak i meg-knapp og clicker', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/1`)
            cy.get('.inputPanel').children().eq(1).should('be.visible').click()
        })

        it('Tester at begge radiobuttons er clickable via id', () => {
            cy.get('#utbetaling-arbeidsgiver').click({ force: true }).should('be.checked')
            cy.get('#utbetaling-meg').click({ force: true }).should('be.checked')
        })

        it('Finner videreknappen', () => {
            cy.get('.knapperad .knapp--hoved').should('be.visible').click()
        })
    })

    describe('Reisetilskudd side 2', () => {
        it('Fyller ut går, egen bil, klikker på hjelpetekst, fyller inn km', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/2`)

            cy.get('label[for=transport-ja]').click({ force: true })
            cy.get('label[for=OFFENTLIG]').click({ force: true })

            cy.get('#utgifter-koll').should('be.visible')
                .type('900').should('have.value', '0900')

            cy.get('label[for=EGEN_BIL]').click({ force: true })
            cy.get('#kilometer-bil').should('be.visible')
                .type('1337', { force: true }).should('have.value', '01337')

            cy.get('.knapperad .knapp--hoved').click({ force: true })
        })
    })

    describe('Reisetilskudd side 3', () => {

        it('Sjekker at siden inneholder elementer', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/3`)
            cy.contains('Kvitteringer for reise')
            cy.contains('Last opp kvitteringer for reise til og fra arbeidsplassen mellom')
            cy.get('.fler-vedlegg').should('be.visible').click()
        })

        it('Sjekker at utlegg-modalen inneholder opplastingform', () => {
            cy.contains('Legg til reise')

            cy.get('.nav-datovelger__kalenderknapp').click()
            cy.get('.DayPicker-Body').contains('13').click()

            cy.get('input[name=belop_input]').type('1000')

            cy.get('select[name=transportmiddel]').select('TAXI')

            cy.get('.filopplasteren input[type=file]').attachFile('icon.png')

            cy.get('.lagre-kvittering')
                .contains('Bekreft')
                .click()
        })

        it('Fil list oppdateres med kvittering', () => {
            cy.get('.fil_liste')

            cy.get('.sortering__heading').contains('Utlegg')
            cy.get('.sortering__heading').contains('Transport')
            cy.get('.sortering__heading').contains('Beløp')

            cy.get('.dato').contains('onsdag 13.05.2020')
            cy.get('.transport').contains('Taxi')
            cy.get('.belop').contains('1 000 kr')

            cy.get('.sumlinje').contains('1 utlegg på til sammen')
            cy.get('.sumlinje .belop').contains('1 000 kr')

            cy.get('.knapperad').contains('Gå videre').click()
        })
    })

    describe('Reisetilskudd side 4', () => {
        // TODO: Er dette siste versjon av oppsummering?
        it('Oppsummering av søknaden', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/4`)
            cy.get('.soknad-info-utvid').click()
            cy.contains('Oppsummering av søknaden')
            cy.contains('Hvem skal pengene utbetales til?')
            cy.contains('Hvordan reiste du før sykmeldingen?')
            cy.contains('Opplastede kvitteringer')
        })

        it('Reisetilskudd tekster', () => {
            cy.get('.typo-undertittel').contains('Bekreft og send søknaden')
            cy.get('.typo-normal').contains('Sjekk at du har fått med alle nødvendige opplysninger og kvitteringer. Når du sender søknaden, går den til NAV. POSTEN NORGE får samtidig en kopi.')

            cy.get('.typo-element').contains('Hovedpunkter fra søknaden')
            cy.contains('Du søker om reisetilskudd mellom 13. og 19. mai 2020')
            cy.contains('Du har krysset av for at arbeidsgiveren din betaler utgiftene. Reisetilskuddet fra NAV går derfor til arbeidsgiveren din.')

            cy.get('.bekreftCheckboksPanel').contains('Jeg har lest informasjonen jeg har fått underveis i søknaden og bekrefter at opplysningene jeg har gitt er korrekte. Jeg bekrefter også at jeg har lest og forstått')
            cy.get('.bekreftCheckboksPanel input').click()

            cy.get('.knapperad').contains('Send inn søknaden').click()
        })
    })

    describe('Bekreftelsesside', () => {
        it('Sjekker at bekreftelsessiden inneholder elementer', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/bekreftelse`)

            cy.get('.alertstripe--suksess').contains('Søknaden ble sendt til NAV')
            cy.get('.alertstripe--suksess').contains('Sendt: ')

            cy.get('.soknad-info-utvid')

            cy.get('.typo-undertittel').contains('Du får brev fra oss')
            cy.get('.typo-normal').contains('Når vi har behandlet søknaden din, får du svaret i Digipost. Har du reservert deg mot digital post, får du et brev på papir.')

            cy.get('.sykmelding-panel')
                .should('be.visible')
                .and('have.text', 'Opplysninger fra sykmeldingen')
        })
    })
})
