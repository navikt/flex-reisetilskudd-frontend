import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { getLedetekst, tekst } from '../../utils/tekster'
import { CheckedIkon } from '../diverse/checked-ikon/checked-ikon'
import Vis from '../diverse/vis'

const DagensTransportmiddel = () => {
    const { valgtReisetilskudd } = useAppStore()

    return (
        <>
            <Undertittel tag="h3">
                {tekst('oppsummering.dagens_transportmiddel.tittel')}
            </Undertittel>
            <Vis hvis={valgtReisetilskudd!.går}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {tekst('oppsummering.går')}
                </Normaltekst>
            </Vis>
            <Vis hvis={valgtReisetilskudd!.sykler}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {tekst('oppsummering.sykler')}
                </Normaltekst>
            </Vis>
            <Vis hvis={valgtReisetilskudd!.kollektivtransport && valgtReisetilskudd!.kollektivtransport > 0}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {getLedetekst(tekst('oppsummering.kollektivt'), {
                        '%UTGIFTER%': valgtReisetilskudd!.kollektivtransport!.toFixed(2)
                    })}
                </Normaltekst>
            </Vis>
            <Vis hvis={valgtReisetilskudd!.egenBil && valgtReisetilskudd!.egenBil > 0}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {getLedetekst(tekst('oppsummering.egenbil'), {
                        '%KILOMETER%': valgtReisetilskudd!.egenBil!.toFixed(2)
                    })}
                </Normaltekst>
            </Vis>
        </>
    )
}

export default DagensTransportmiddel
