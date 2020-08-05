import { utbetalingSpørsmålVerdier } from '../../src/components/sporsmal/sporsmalTekster';

interface ReisetilskuddInterface {
    fnr?: string,
    fom?: string,
    tom?: string,
  
    utbetalingTilArbeidsgiver?: string,
  
    går?: boolean,
    sykler?: boolean,
    kollektivtransport?: number,
    egenBil?: number,
  
    orgNavn?: string,
    orgNummer?: string,
    reisetilskuddId?: string,
    sykmeldingId?: string,
  }
describe('Teste statiske sidelelementer i reisetilskuddsøknaden', () => {
    
    const mockReisetilskudd : ReisetilskuddInterface[] = [
        {
          fnr: '01010112345',
          fom: '2020-08-03',
          tom: '2020-08-03',
      
          orgNavn: 'Mock Arbeid AS',
          orgNummer: '123123123',
      
          utbetalingTilArbeidsgiver: utbetalingSpørsmålVerdier.MEG,
      
          går: true,
          sykler: true,
          kollektivtransport: 42,
          egenBil: 0,
      
          reisetilskuddId: '28fa10b8-c9af-4a7a-a0b2-90caed65ab4c',
          sykmeldingId: '72ea12dd-eabc-49ed-910f-5ecd50e7dd5c',
        },
        {
          fnr: '01010112345',
          fom: '2020-05-13',
          orgNavn: 'Mock Vaskeri Vaskerelven',
          orgNummer: '9237419',
      
          utbetalingTilArbeidsgiver: utbetalingSpørsmålVerdier.ARBEIDSGIVER,
      
          går: true,
          sykler: false,
          kollektivtransport: 0,
          egenBil: 13,
      
          reisetilskuddId: '28fas0b8-c9af-4a7a-a0b2-90caed65ab4c',
          sykmeldingId: '72ea1sdd-eabc-49ed-910f-5ecd50e7dd5c',
        },
      ];

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
