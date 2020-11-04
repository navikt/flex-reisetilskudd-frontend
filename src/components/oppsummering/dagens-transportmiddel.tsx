import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { getLedetekst, tekst } from '../../utils/tekster'
import { CheckedIkon } from '../checked-ikon/checked-ikon'
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
        <>
            <Undertittel tag="h3">
                {tekst('oppsummering.dagens_transportmiddel.tittel')}
            </Undertittel>
            <Vis hvis={dagensTransportMiddelEgenBilChecked}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {getLedetekst(tekst('oppsummering.egenbil'), {
                        '%KILOMETER%': antallKilometerState
                    })}
                </Normaltekst>
            </Vis>
            <Vis hvis={dagensTransportMiddelGårChecked}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {tekst('oppsummering.går')}
                </Normaltekst>
            </Vis>
            <Vis hvis={dagensTransportMiddelSyklerChecked}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {tekst('oppsummering.sykler')}
                </Normaltekst>
            </Vis>
            <Vis hvis={dagensTransportMiddelKollektivChecked}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {getLedetekst(tekst('oppsummering.kollektivt'), {
                        '%UTGIFTER%': månedligeUtgifterState
                    })}
                </Normaltekst>
            </Vis>
        </>
    )
}

export default DagensTransportmiddel
