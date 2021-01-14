import { sendbarReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Teste statiske sidelelementer i reisetilskuddsøknaden', () => {
    const reisetilskudd = sendbarReisetilskudd

    const reisetilskuddSporsmalSjekk = () => {
        it('Laster inn sidenavigasjon', () => {
            cy.get('.side_nav').should('be.visible')
            cy.contains('Utbetaling')
            cy.contains('Transport')
            cy.contains('Kvitteringer')
            cy.contains('Bekreft og send')
            cy.get('button .chevron--venstre').should('be.visible')
            cy.get('button .chevron--hoyre').should('be.visible')
        })

        it('Laster inn sykemeldingpanel', () => {
            cy.get('.sykmelding-panel').should('be.visible').and('have.text', 'Opplysninger fra sykmeldingen')
        })

        it('Knapperad', () => {
            cy.get('.knapperad').contains('Gå videre')
            cy.get('.knapperad').contains('Jeg ønsker ikke å bruke denne søknaden')
        })
    }

    before(() => {
        cy.visit('http://localhost:3000')
    })

    describe('Landingside og listevisning', () => {
        it('Laster startside', () => {
            cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader om reisetilskudd')
        })

        it('Nye søknader', () => {
            cy.get('.tilskudd__teasere .tilskudd--usendt')
                .contains('Nye søknader')
        })

        it('Om reisetilskudd', () => {
            cy.get('.tilskudd__teasere .om-reisetilskudd')
                .contains('Om reisetilskudd')
            cy.get('.lenke.om-reisetilskudd')
                .should('have.attr', 'href', 'https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykmelding-ulike-former/reisetilskudd')
        })

        it('Tidligere søknader', () => {
            cy.get('.tilskudd__teasere .tilskudd--sendt')
                .contains('Tidligere søknader')
            cy.get('.tilskudd__teasere .tilskudd--sendt .teasere__sortering')
                .contains('Sorter etter')
                .get('.selectContainer')
                .contains('Dato')
        })

        it('Velger et reisetilskudd', () => {
            cy.get(`.tilskudd__teasere a[href*=${reisetilskudd.reisetilskuddId}]`).click()
        })
    })

    describe('Soknadstart', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknadstart/${reisetilskudd.reisetilskuddId}/1`)
        })

        it('Laster inn header og headerelementer', () => {
            cy.get('.sidebanner').should('be.visible')
            cy.get('.sidebanner__tittel')
                .should('be.visible')
                .and('have.text', 'Søknad om reisetilskudd')
        })

        it('Laster inn veilederpanel', () => {
            cy.get('.veileder').should('be.visible')
            cy.get('.veileder .nav-veilederpanel__content h2').should('be.visible').and('have.text', 'Søknad om reisetilskudd')
        })

        it('Laster inn hvem kan få reisetilskudd', () => {
            cy.get('.hvem-kan-faa').should('be.visible')
            cy.get('.hvem-kan-faa .ekspanderbartPanel__tittel')
                .should('be.visible')
                .and('have.text', 'Hvem kan få reisetilskudd?')
                .click()

            cy.get('li').contains('Du er yrkesaktiv.')
            cy.get('li').contains('Du trenger midlertidig transport til og fra arbeidsstedet på grunn av helseplager.')
            cy.get('li').contains('Du har i utgangspunktet rett til sykepenger. Reisetilskuddet kommer da i stedet for sykepengene.')

            cy.get('.typo-element').contains('Hvor mye kan du få?')
            cy.get('.typo-normal').contains('Du kan maksimalt få det samme som du ville fått i sykepenger. Det vil si at det daglige reisetilskuddet ikke kan være høyere enn det du ellers ville fått i sykepenger den dagen. Dagsatsen er årslønnen din delt på 260. Årslønnen blir redusert til 6G hvis du tjener mer enn det.')

            cy.get('.typo-element').contains('Husk å søke før fristen')
            cy.get('.typo-normal').contains('Fristen for å søke om refusjon er 3 måneder etter at sykmeldingsperioden er over.')
        })

        it('Laster inn veilederpanel spar-tid', () => {
            cy.get('.spar-tid').should('be.visible')
            cy.get('.spar-tid .nav-veilederpanel__content h2').should('be.visible').and('have.text', 'Spar tid ved å bruke mobilen')
            cy.get('.spar-tid .nav-veilederpanel__content').contains('Om du gjennomfører søknaden på mobilen, kan du ta bilde av kvitteringen direkte når du laster opp kvitteringer for reiser.')
        })

        it('Laster inn sykmelding-panel', () => {
            cy.get('.sykmelding-panel').should('be.visible')
            cy.get('.sykmelding-panel .sykmelding-panel__tittel').should('be.visible').and('have.text', 'Opplysninger fra sykmeldingen')
        })

        it('Laster inn alertstripe med kan-sendes-dato', () => {
            cy.get('.kan-sendes').should('be.visible')
            cy.get('.kan-sendes.alertstripe--suksess')
                .should('be.visible')
                .and('contain.text', 'Søknaden er klar til å sendes inn')
        })

        it('Laster inn knapperad, klikker og går til soknad-side', () => {
            cy.get('.knapp--hoved').should('be.visible').click()
        })
    })

    describe('Reisetilskudd side 1', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/1`)
        })

        reisetilskuddSporsmalSjekk()

        it('Gå videre', () => {
            cy.get('.knapperad').contains('Gå videre').click()
        })
    })

    describe('Reisetilskudd side 2', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/2`)
        })

        reisetilskuddSporsmalSjekk()

        it('Gå videre', () => {
            cy.get('.knapperad').contains('Gå videre').click()
        })
    })

    describe('Reisetilskudd side 3', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/3`)
        })

        reisetilskuddSporsmalSjekk()

        it('Gå videre', () => {
            cy.get('.knapperad').contains('Gå videre').click()
        })
    })

    describe('Reisetilskudd side 4', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknaden/${reisetilskudd.reisetilskuddId}/4`)
        })

        it('Laster inn sidenavigasjon', () => {
            cy.get('.side_nav').should('be.visible')
            cy.contains('Utbetaling')
            cy.contains('Transport')
            cy.contains('Kvitteringer')
            cy.contains('Bekreft og send')
            cy.get('button .chevron--venstre').should('be.visible')
            cy.get('button .chevron--hoyre').should('be.visible')
        })

        it('Oppsummering av søknaden', () => {
            cy.get('.soknad-info-utvid').should('be.visible').and('have.text', 'Oppsummering av søknaden')
        })

        it('Laster inn sykemeldingpanel', () => {
            cy.get('.sykmelding-panel').should('be.visible').and('have.text', 'Opplysninger fra sykmeldingen')
        })

        it('Tekster', () => {
            cy.get('.typo-undertittel').contains('Bekreft og send søknaden')
            cy.get('.typo-normal').contains('Sjekk at du har fått med alle nødvendige opplysninger og kvitteringer. Når du sender søknaden, går den til NAV.')
            cy.get('.typo-element').contains('Hovedpunkter fra søknaden')
            cy.get('.punkter').should('exist')
            cy.get('.bekreftCheckboksPanel').contains('Jeg har lest informasjonen jeg har fått underveis i søknaden og bekrefter at opplysningene jeg har gitt er korrekte. Jeg bekrefter også at jeg har lest og forstått')
        })
    })
})
