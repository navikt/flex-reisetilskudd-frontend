import mockReisetilskudd from '../../src/data/mock/reisetilskudd';

describe('Tester reisetilskuddsøknaden', () => {
    const url:string = `http://localhost:3000/soknaden/${mockReisetilskudd[0].reisetilskuddId}/1`

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

    it('Inneholder content', ()=> {
        cy.get('.horisontal-radio').should('be.visible')
    })

    it('Laster tekst', function() {
        cy.get('.utbetaling-tittel').should('be.visible')
        cy.contains('Utbetaling til arbeidsgiver')
        cy.contains('Skal reisetilskuddet utbetales til deg eller til Arbeids- og velferdsetaten (org.nr. 392392482849)?')
    })

    describe('Utfylling og validering av side 1', ()=>{

        it('Tar tak i meg-knapp og clicker', ()=> {
            cy.url().should('include', `/soknaden/${mockReisetilskudd[0].reisetilskuddId}/1`)
            let megknapp = cy.get('.inputPanel').children().eq(1)
            megknapp.should('be.visible')
            megknapp.click()
        })

        it('Tester at begge radiobuttons er clickable via id',()=>{
            cy.get('#utbetaling-arbeidsgiver').click({force:true}).should('be.checked')
            cy.get('#utbetaling-meg').click({force:true}).should('be.checked')
        })

        it('finner videreknappen', ()=> {
            let videreknappen = cy.get('.videre-knapp')
            videreknappen.should('be.visible')
            videreknappen.click()
        })
    })

    describe('Utfylling av side 2', ()=>{

        it('fyller ut går, egen bil, klikker på hjelpetekst, fylle rinn km', ()=> {
            cy.url().should('include', `/soknaden/${mockReisetilskudd[0].reisetilskuddId}/2`)
            cy.contains('Går').click({ force: true })
            cy.get('#transport-går').click( {force: true})
            cy.contains('Sykler').click({ force: true })
            cy.contains('Egen bil').click({ force: true })
            cy.get('#transport-kollektiv').click( {force: true})

            let hjelpetekst = cy.get('.transportmiddel-kilometer-hjelpetekst').should('be.visible')
            hjelpetekst.click()

            let kmInput = cy.get('#dagens-transportmiddel-kilometer-input').should('be.visible')
            kmInput.type('1337')
            kmInput.should('have.value', '1337')

            let kollektivtransport = cy.get('#dagens-transportmiddel-transportalternativer-kollektivt')
            kollektivtransport.should('be.visible')

            let kollektivUtgifter = cy.get('#dagens-transportmiddel-manedlige-utgifter-input')
            kollektivUtgifter.should('be.visible')
            kollektivUtgifter.type('900')
            kollektivUtgifter.should('have.value', '900')

            cy.get('#dagens-transportmiddel-transportalternativer').should('be.visible')
        })
    })

    describe('Checkboxvalidering side 2', ()=>{
        it('Sjekker at Checkboxene er checked',()=>{
            cy.get('#transport-går').click({force:true}).should('be.checked')
            cy.get('#transport-sykler').should('be.checked')
            cy.get('#transport-egen-bil').should('be.checked')
            cy.get('#transport-kollektiv').should('be.checked')

            cy.get('.videre-knapp').click()
        })
    })

    describe('Innholdsvalidering side 3', ()=>{

        it('sjekker at siden inneholder elementer', () =>{
            cy.url().should('include', `/soknaden/${mockReisetilskudd[0].reisetilskuddId}/3`)
            cy.contains('Last opp dine kvitteringer')
            cy.contains('Her kan du laste opp kvitteringer fra reisetilskuddsperioden.')
            cy.get('.last-opp-kvittering-tekst').should('be.visible')

            let hjelpetekst = cy.get('.hjelpetekst').should('be.visible')
            hjelpetekst.click()
            hjelpetekst.click()

            cy.get('.filopplasteren').should('be.visible')
        })

        it('Sjekker om oppsumeringssiden inneholder kvitteringer', () => {
            if(!(cy.get('.fil-med-info'))){
                cy.log("kvitteringsfiler med info er ikke displayet på siden")
                console.log("kvitteringsfiler med info er ikke displayet på siden")
            }else{
                const kvittering = cy.get('.fil-med-info')
                expect(kvittering).to.equal(kvittering.should('be.visible'))
                cy.get('.fil-med-info').should('be.visible')
                cy.get('.slett-knapp').should('be.visible')
                cy.log("kvitteringsfiler med info displayes")
                console.log("kvitteringsfiler med info displayes")
            }
            cy.get('.videre-knapp').click()
          })

    })

    describe('Innholdsvalidering side 4', ()=>{

        it('sjekker at oppsummeringssiden inneholder elementer', ()=> {
            cy.url().should('include', `/soknaden/${mockReisetilskudd[0].reisetilskuddId}/4`)
            cy.contains('Oppsummering av søknaden')
            cy.contains('Hvem skal pengene utbetales til?')
            cy.contains('Hvordan reiste du før sykmeldingen?')
            cy.contains('Opplastede kvitteringer')
            cy.contains('Totalt beløp:')

            if(!(cy.contains('Kvittering') && cy.contains('Beløp') && cy.contains('Dato'))){
                cy.log('Oppsummeringssiden inneholder ingen kvitteringsoverskrift og kanskje ingen kvitteringer')
                console.log('Oppsummeringssiden har ikke kvitteringsoverskrift og kanskje ingen kvitteringer!')

            }else{
                cy.contains('Kvittering')
                cy.contains('Beløp')
                cy.contains('Dato')
                cy.log("Kvitteringer displayes på oppsummeringssiden")
                console.log("Kvitteringer displayes på oppsummeringssiden")
            }

            cy.get('.send-knapp').click()
        })
    })


    describe('Kvitteringsside', ()=>{

        it('sjekker at bekreftelse/kvittering-siden inneholder elementer', ()=> {
            cy.url().should('include', `kvittering`)

            cy.get('.bekreftelsesside-page-wrapper').should('be.visible')
            cy.log('Content vises på siden')

            cy.get('.numberCircle').should('be.visible')

            cy.contains('Du har sendt inn søknaden')
            cy.contains('Søknaden blir behandlet')

            cy.contains('Les mer om reglene for reisetilskudd')
            cy.get('a[href*="www.nav.no"]').should('be.visible')

            cy.contains('sykepenger til selvstendig næringsdrivende og frilansere')

            cy.contains('Les om hva du må gjøre for å beholde sykepengene')

        })
    })

})
