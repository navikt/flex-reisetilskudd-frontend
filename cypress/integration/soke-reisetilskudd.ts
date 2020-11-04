import mockReisetilskudd from '../../src/data/mock/data/reisetilskudd'

describe('Tester reisetilskuddsøknaden', () => {

    const url = `http://localhost:3000/soknaden/${mockReisetilskudd[0].id}/1`

    before(() => {
        cy.server()
        cy.route({
            method: 'GET',
            url: 'http://localhost:6969/reisetilskudd/reisetilskudd',
            response: mockReisetilskudd
        })
        cy.route({
            method: 'POST',
            url: 'http://localhost:6969/reisetilskudd/reisetilskudd',
            response: ''
        })
        cy.visit(url)
    })

    it('Inneholder content', () => {
        cy.get('.horisontal-radio').should('be.visible')
    })

    it('Laster tekst', function() {
        cy.get('.utbetaling-tittel').should('be.visible')
        cy.contains('Utbetaling til arbeidsgiver')
        cy.contains('Skal reisetilskuddet utbetales til deg eller til Arbeids- og velferdsetaten (org.nr. 392392482849)?')
    })

    describe('Utfylling og validering av side 1', () => {
        it('Tar tak i meg-knapp og clicker', () => {
            cy.url().should('include', `/soknaden/${mockReisetilskudd[0].id}/1`)
            cy.get('.inputPanel').children().eq(1).should('be.visible').click()
        })

        it('Tester at begge radiobuttons er clickable via id', () => {
            cy.get('#utbetaling-arbeidsgiver').click({ force: true }).should('be.checked')
            cy.get('#utbetaling-meg').click({ force: true }).should('be.checked')
        })

        it('finner videreknappen', () => {
            cy.get('.knapperad').should('be.visible').click()
        })
    })

    describe('Utfylling av side 2', () => {
        it('fyller ut går, egen bil, klikker på hjelpetekst, fyller inn km', () => {
            cy.url().should('include', `/soknaden/${mockReisetilskudd[0].id}/2`)

            cy.get('label[for=transport-går]').click({ force: true })
            cy.get('label[for=transport-sykler]').click({ force: true })

            cy.get('label[for=transport-egen-bil]').click({ force: true })
            cy.get('.transportmiddel-kilometer-hjelpetekst').should('be.visible').click()

            cy.get('#dagens-transportmiddel-kilometer-input').should('be.visible')
                .type('1337').should('have.value', '1337')

            cy.get('label[for=transport-kollektiv]').click({ force: true })
            cy.get('#dagens-transportmiddel-manedlige-utgifter-input').should('be.visible')
                .type('900').should('have.value', '900')

            cy.get('#dagens-transportmiddel-transportalternativer').should('be.visible')
        })
    })

    describe('Checkboxvalidering side 2', () => {
        it('Sjekker at Checkboxene er checked', () => {
            cy.get('#transport-går').should('be.checked')
            cy.get('#transport-sykler').should('be.checked')
            cy.get('#transport-egen-bil').should('be.checked')
            cy.get('#transport-kollektiv').should('be.checked')
            cy.get('.knapperad').click()
        })
    })

    describe('Innholdsvalidering side 3', () => {
        it('Sjekker at siden inneholder elementer', () => {
            cy.url().should('include', `/soknaden/${mockReisetilskudd[0].id}/3`)
            cy.contains('Last opp dine kvitteringer')
            cy.contains('Her kan du laste opp kvitteringer fra reisetilskuddsperioden.')
            cy.get('.last-opp-kvittering-tekst').should('be.visible')

            cy.get('.hjelpetekst').should('be.visible').click()
                .click()

            cy.get('.filopplasteren').should('be.visible')
        })

        it('Sjekker at oppsummeringssiden inneholder kvitteringer', () => {
            cy.get('.filopplasteren input[type=file]').attachFile('icon.png')

            cy.get('.datovelger .skjemaelement__input.form-control').focus()
            cy.get('.flatpickr-calendar').contains('10').click({ force: true })

            cy.get('#filopplaster-totalt-beløp-input').type('1000')
            cy.get('label[for="kvittering-transportmiddel-spørsmål-Egen bil"]').click()

            cy.get('.lagre-kvittering').click()

            cy.get('.knapperad').click()
        })
    })

    describe('Innholdsvalidering side 4', () => {
        it('sjekker at oppsummeringssiden inneholder elementer', () => {
            cy.url().should('include', `/soknaden/${mockReisetilskudd[0].id}/4`)
            cy.contains('Oppsummering av søknaden')
            cy.contains('Hvem skal pengene utbetales til?')
            cy.contains('Hvordan reiste du før sykmeldingen?')
            cy.contains('Opplastede kvitteringer')
            cy.contains('Totalt beløp:')

            if (!(cy.contains('Beløp') && cy.contains('Dato'))) {
                cy.log('Oppsummeringssiden inneholder ingen kvitteringsoverskrift og kanskje ingen kvitteringer')
            } else {
                cy.contains('Beløp')
                cy.contains('Dato')
                cy.log('Kvitteringer displayes på oppsummeringssiden')
            }

            cy.get('.send-knapp').click()
        })
    })

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
})
