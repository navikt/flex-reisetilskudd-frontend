import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import CheckedMedTekst from '../common/checked-med-tekst/checked-med-tekst'
import Vis from '../vis'

const OppsummeringDagensTransportmiddel = () => {
    const {
        dagensTransportMiddelEgenBilChecked,
        dagensTransportMiddelSyklerChecked,
        dagensTransportMiddelGårChecked,
        dagensTransportMiddelKollektivChecked,
        månedligeUtgifterState,
        antallKilometerState,
    } = useAppStore()

    return (
        <div className="oppsummering-element oppsummering-dagens-transportmiddel">
            <Undertittel className="oppsummering-underoverskrift">Hvordan reiste du før sykmeldingen?</Undertittel>
            <Vis hvis={dagensTransportMiddelEgenBilChecked}>
                <CheckedMedTekst tekst={`Kjører egen bil, ${antallKilometerState} kilometer`} />
            </Vis>
            <Vis hvis={dagensTransportMiddelGårChecked}>
                <CheckedMedTekst tekst="Går" />
            </Vis>
            <Vis hvis={dagensTransportMiddelSyklerChecked}>
                <CheckedMedTekst tekst="Sykler" />
            </Vis>
            <Vis hvis={dagensTransportMiddelKollektivChecked}>
                <CheckedMedTekst tekst={`Reiser kollektivt med ${månedligeUtgifterState} kroner i månedlige utgifter`} />
            </Vis>
        </div>
    )
}

export default OppsummeringDagensTransportmiddel
