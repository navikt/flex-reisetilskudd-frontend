import { apenReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Tester reisetilskuddsøknaden', () => {

    const reisetilskudd = apenReisetilskudd

    before(() => {
        cy.visit('http://localhost:3000')
    })

    it('Laster startside', () => {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader om reisetilskudd')
        cy.get(`.tilskudd__teasere a[href*=${reisetilskudd.reisetilskuddId}]`).click()
    })

    describe('Utfylling og validering av startsiden', () => {
        it('finner videreknappen', () => {
            cy.get('.knapperad .knapp--hoved').should('be.visible').click()
        })
    })

    describe('Utfylling og validering av side 1', () => {
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

        it('finner videreknappen', () => {
            cy.get('.knapperad .knapp--hoved').should('be.visible').click()
        })
    })

    describe('Utfylling av side 2', () => {
        it('fyller ut går, egen bil, klikker på hjelpetekst, fyller inn km', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/2`)

            cy.get('label[for=gaa]').click({ force: true })
            cy.get('label[for=skl]').click({ force: true })
            cy.get('label[for=bil]').click({ force: true })
            cy.get('#kilometer-bil').should('be.visible')
                .type('1337').should('have.value', '01337')

            cy.get('label[for=kol]').click({ force: true })
            cy.get('#utgifter-koll').should('be.visible')
                .type('900', { force: true }).should('have.value', '0900')

            cy.get('form.transportmiddel .checkboksPanel').should('be.visible')
        })
    })

    describe('Checkboxvalidering side 2', () => {
        it('Sjekker at Checkboxene er checked', () => {
            cy.get('#gaa').should('be.checked')
            cy.get('#skl').should('be.checked')
            cy.get('#bil').should('be.checked')
            cy.get('#kol').should('be.checked')
            cy.get('.knapperad .knapp--hoved').click({ force: true })
        })
    })

    describe('Innholdsvalidering side 3', () => {

        it('Sjekker at siden inneholder elementer', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/3`)
            cy.contains('Kvitteringer for reise')
            cy.contains('Last opp kvitteringer for reise til og fra arbeidsplassen mellom')
            cy.get('.fler-vedlegg').should('be.visible').click()
        })

        it('Sjekker at utlegg-modalen inneholder opplastingform', () => {
            cy.contains('Kvitteringer for reise')

            cy.get('.nav-datovelger__kalenderknapp').click()
            cy.get('.DayPicker-Body').contains('10').click({ force: true })

            /*
                        cy.get('input[name=belop_input]').type('1000')
                        cy.get('select[name=transportmiddel]').select('Taxi')

                        cy.get('.filopplasteren input[type=file]').attachFile('icon.png')
                        cy.get('.knapperad .knapp--hoved').click({ force: true })
            */
        })
    })

    /*
        describe('Innholdsvalidering side 4', () => {
            it('sjekker at oppsummeringssiden inneholder elementer', () => {
                cy.url().should('include', `/soknaden/${mockReisetilskudd[0].reisetilskuddId}/4`)
                cy.get('.soknad-info-utvid').click()
                cy.contains('Oppsummering av søknaden')
                cy.contains('Hvem skal pengene utbetales til?')
                cy.contains('Hvordan reiste du før sykmeldingen?')
                cy.contains('Opplastede kvitteringer')
                cy.contains('Totalt beløp:')

            })
        })
    */

    /*
        describe('Bekreftelsesside', () => {
            it('sjekker at bekreftelsessiden inneholder elementer', () => {
                cy.url().should('include', 'bekreftelse')

                cy.get('.liste__bakgrunn').should('be.visible')
                cy.get('.sirkel__tall').should('be.visible')

                cy.contains('Du har sendt inn søknaden')
                cy.contains('Søknaden blir behandlet')

                cy.contains('Les mer om reglene for reisetilskudd')
                cy.get('a[href*="www.nav.no"]').should('be.visible')

                cy.contains('sykepenger til selvstendig næringsdrivende og frilansere')
                cy.contains('Les om hva du må gjøre for å beholde sykepengene')
            })
        })
    */
})
