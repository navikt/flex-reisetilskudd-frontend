import { Element,Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { getLedetekst, tekst } from '../../utils/tekster'
import { formatterTall } from '../../utils/utils'
import { CheckedIkon } from '../diverse/checked-ikon/checked-ikon'
import Vis from '../diverse/vis'

const DagensTransportmiddel = () => {
    const { valgtReisetilskudd } = useAppStore()

    return (
        <>
            <Element className="element-tittel">
                {tekst('oppsummering.dagens_transportmiddel.tittel')}
            </Element>
            <Vis hvis={valgtReisetilskudd!.offentlig && valgtReisetilskudd!.offentlig > 0}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {getLedetekst(tekst('oppsummering.kollektivt'), {
                        '%UTGIFTER%': formatterTall(valgtReisetilskudd!.offentlig)
                    })}
                </Normaltekst>
            </Vis>
            <Vis hvis={valgtReisetilskudd!.egenBil && valgtReisetilskudd!.egenBil > 0}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {getLedetekst(tekst('oppsummering.egenbil'), {
                        '%KILOMETER%': formatterTall(valgtReisetilskudd!.egenBil)
                    })}
                </Normaltekst>
            </Vis>
        </>
    )
}

export default DagensTransportmiddel
