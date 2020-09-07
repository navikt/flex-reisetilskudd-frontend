import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { getLedetekst, tekst } from '../../utils/tekster'
import CheckedMedTekst from '../checked-med-tekst/checked-med-tekst'
import Vis from '../vis'

const DagensTransportmiddel = () => {
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
            <Undertittel className="oppsummering-underoverskrift">
                {tekst('oppsummering.dagens_transportmiddel.tittel')}
            </Undertittel>
            <Vis hvis={dagensTransportMiddelEgenBilChecked}>
                <CheckedMedTekst tekst={getLedetekst(tekst('oppsummering.egenbil'), {
                    '%KILOMETER%': antallKilometerState
                })} />
            </Vis>
            <Vis hvis={dagensTransportMiddelGårChecked}>
                <CheckedMedTekst tekst={tekst('oppsummering.går')} />
            </Vis>
            <Vis hvis={dagensTransportMiddelSyklerChecked}>
                <CheckedMedTekst tekst={tekst('oppsummering.sykler')} />
            </Vis>
            <Vis hvis={dagensTransportMiddelKollektivChecked}>
                <CheckedMedTekst tekst={getLedetekst(tekst('oppsummering.kollektivt'), {
                    '%UTGIFTER%': månedligeUtgifterState
                })} />
            </Vis>
        </div>
    )
}

export default DagensTransportmiddel
