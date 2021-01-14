import { åpenReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Tester utfylling av kvittering', () => {
    const reisetilskudd = åpenReisetilskudd

    before(() => {
        cy.visit(`http://localhost:3000/syk/reisetilskudd/soknaden/${reisetilskudd.reisetilskuddId}/3`)
    })

    describe('Kvittering reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/3`)
        })

        it('Legger inn taxi kvittering', () => {
            cy.get('.fler-vedlegg').click()

            cy.contains('Legg til reise')

            cy.get('.nav-datovelger__kalenderknapp').click()
            cy.get('.DayPicker-Body').contains('13').click()

            cy.get('input[name=belop_input]').type('1234')

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

            cy.get('.dato').contains('fredag 13.05.2022')
            cy.get('.transport').contains('Taxi')
            cy.get('.belop').contains('1 234 kr')

            cy.get('.sumlinje').contains('1 utlegg på til sammen')
            cy.get('.sumlinje .belop').contains('1 234 kr')
        })

        it('Åpner og lukker modal', () => {
            cy.get('.fler-vedlegg').click()
            cy.get('.lagre-kvittering').contains('Tilbake').click()
        })

        it('Feilmeldinger når ingenting er valgt', () => {
            cy.get('.fler-vedlegg').click()
            cy.get('.lagre-kvittering').contains('Bekreft').click()

            cy.get('.skjemaelement__feilmelding').contains('Du må velge dato')
            cy.get('.skjemaelement__feilmelding').contains('Du må velge transportmiddel')
            cy.get('.skjemaelement__feilmelding').contains('Du må skrive inn beløp')
            cy.get('.skjemaelement__feilmelding').contains('Du må laste opp kvittering')
        })

        describe('Dato feilmeldinger', () => {
            it('Feil format', () => {
                cy.get('input[name=dato_input]').type('40.01.1700')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('.skjemaelement__feilmelding').contains('Datoen følger ikke formatet dd.mm.åååå')
            })

            it('Dato før fom', () => {
                cy.get('input[name=dato_input]').clear().type('10.05.2022')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('.skjemaelement__feilmelding').contains('Datoen kan ikke være før 2022-05-13')
            })

            it('Dato etter tom', () => {
                cy.get('input[name=dato_input]').clear().type('10.08.2022')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('.skjemaelement__feilmelding').contains('Datoen kan ikke være etter 2022-05-31')
            })

            it('Gyldig dato', () => {
                cy.get('input[name=dato_input]').should('have.class', 'skjemaelement__input--harFeil')
                cy.get('input[name=dato_input]').clear().type('15.05.2022')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('input[name=dato_input]').should('not.have.class', 'skjemaelement__input--harFeil')
            })
        })

        describe('Transportmiddel feilmeldinger', () => {
            it('Ugyldig valg', () => {
                cy.get('select[name=transportmiddel]').select('')
                cy.get('.skjemaelement__feilmelding').contains('Du må velge transportmiddel')
            })

            it('Velger egen bil', () => {
                cy.get('select[name=transportmiddel]').should('have.class', 'skjemaelement__input--harFeil')
                cy.get('select[name=transportmiddel]').select('EGEN_BIL')
                cy.get('select[name=transportmiddel]').should('not.have.class', 'skjemaelement__input--harFeil')
            })
        })

        describe('Beløp feilmeldinger', () => {
            it('Negative beløp', () => {
                cy.get('input[name=belop_input]').type('-100')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('.skjemaelement__feilmelding').contains('Beløp kan ikke være negativt')
            })

            it('Høyere beløp enn maks', () => {
                cy.get('input[name=belop_input]').clear().type('1000000000')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('.skjemaelement__feilmelding').contains('Beløp kan ikke være større enn 10 000')
            })

            it('Kan ikke skrive inn med 3 desimaler', () => {
                // Input feltet viser egen feilmelding
                cy.get('input[name=belop_input]').clear().type('100.253')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
            })

            it('Gyldig beløp med 2 desimaler', () => {
                cy.get('input[name=belop_input]').should('have.class', 'skjemaelement__input--harFeil')
                cy.get('input[name=belop_input]').clear().type('100.25')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('input[name=belop_input]').should('not.have.class', 'skjemaelement__input--harFeil')
            })

            it('Gyldig beløp uten desimaler', () => {
                cy.get('input[name=belop_input]').clear().type('99')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('input[name=belop_input]').should('not.have.class', 'skjemaelement__input--harFeil')
            })
        })

        describe('Kvittering feilmeldinger', () => {
            it('Legger inn gyldig kvittering', () => {
                cy.get('.filopplasteren input[type=file]').attachFile('icon.png')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
            })
        })

        describe('Fil liste', () => {
            it('Sum av kvitteringer stemmer', () => {
                cy.get('.fil_liste')

                cy.get('.sortering__heading').contains('Utlegg')
                cy.get('.sortering__heading').contains('Transport')
                cy.get('.sortering__heading').contains('Beløp')

                cy.get('.dato')
                    .should('contain', 'fredag 13.05.2022')
                    .and('contain', 'søndag 15.05.2022')

                cy.get('.transport')
                    .should('contain', 'Taxi')
                    .and('contain', 'Egen bil')

                cy.get('.belop').contains('99 kr')
                cy.get('.belop').contains('1 234 kr')

                cy.get('.sumlinje').contains('2 utlegg på til sammen')
                cy.get('.sumlinje .belop').contains('1 333 kr')
            })

            it('Sletter en kvittering', () => {
                cy.get('.belop')
                    .contains('1 234 kr')
                    .siblings()
                    .find('.slett-knapp')
                    .click()
                cy.get('.sumlinje').contains('1 utlegg på til sammen')
                cy.get('.sumlinje .belop').contains('99 kr')
            })
        })
    })

})
