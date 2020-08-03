describe('Tester reisetilskuddsøknaden', () => {
    
    const url:string = 'http://localhost:3000/soknaden/1'

    before(() => {
        cy.visit(url)
    })

    it('Inneholder content', function() {
        cy.get('.horisontal-radio').should('be.visible')
    })

    it('Laster tekst', function() {
        cy.get('.utbetaling-tittel').should('be.visible')
        cy.contains('Utbetaling til arbeidsgiver')
        cy.contains('Skal reisetilskuddet utbetales til deg eller til Arbeids- og velferdsetaten (org.nr. 392392482849)?')
    })

    describe('utfylling av side 1', ()=>{

        it('Tar tak i meg-knapp og clicker', function() {
            let megknapp = cy.get('.inputPanel').children().eq(1)
            megknapp.should('be.visible')
            megknapp.click()
        })
        
        it('finner videreknappen', function() {
            let videreknappen = cy.get('.videre-knapp')
            videreknappen.should('be.visible')
            videreknappen.click()
        })
    })

    describe('utfylling av side 2', ()=>{
    
        it('fyller ut går, egen bil, klikker på hjelpetekst, fylle rinn km', function() {
            cy.contains('Går').click()
            cy.contains('Sykler').click()
            cy.contains('Egen bil').click()
            cy.get('.månedlige-utgifter-input').should('be.visible')

            let hjelpetekst = cy.get('.transportmiddel-kilometer-hjelpetekst').should('be.visible')
            hjelpetekst.click()

            let kmInput = cy.get('#dagens-transportmiddel-kilometer-input').should('be.visible')
            kmInput.type('1337')
            kmInput.should('have.value', '1337')
            
            let kollektivtransport = cy.get('#dagens-transportmiddel-transportalternativer-kollektivt')
            kollektivtransport.should('be.visible')
            kollektivtransport.click()

            let kollektivUtgifter = cy.get('#dagens-transportmiddel-månedlige-utgifter-input')
            kollektivUtgifter.should('be.visible')
            kollektivUtgifter.type('900')
            kollektivUtgifter.should('have.value', '900')

            //cy.get('#dagens-transportmiddel-transportalternativer').should('be.visible')

            cy.get('.videre-knapp').click()
        })
    })

    describe('utfylling av side 3', ()=>{
    
        it('sjekker at siden inneholder elementer', function() {
            cy.contains('Last opp dine kvitteringer')
            cy.contains('Her kan du laste opp kvitteringer fra reisetilskuddsperioden.')
            cy.get('.last-opp-kvittering-tekst').should('be.visible')
            
            let hjelpetekst = cy.get('.hjelpetekst').should('be.visible')
            hjelpetekst.click()
            
            //cy.get('.månedlige-utgifter-input').should('be.visible')


            //cy.get('.videre-knapp').click()
        })
    })

})
