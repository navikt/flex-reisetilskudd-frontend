import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { getLedetekst, tekst } from '../../utils/tekster'
import { CheckedIkon } from '../diverse/checked-ikon/checked-ikon'
import Vis from '../diverse/vis'
import { ArbeidsOgVelferdsetaten, utbetalingSporsmalVerdier } from '../sporsmal/sporsmal-konstanter'

const Utbetaling = () => {
    const { activeMegArbeidsgiver } = useAppStore()

    return (
        <>
            <Undertittel tag="h3">
                {tekst('oppsummering.utbetaling.tittel')}
            </Undertittel>
            <Vis hvis={activeMegArbeidsgiver === utbetalingSporsmalVerdier.MEG}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {tekst('oppsummering.utbetaling.undertittel')}
                </Normaltekst>
            </Vis>
            <Vis hvis={activeMegArbeidsgiver === utbetalingSporsmalVerdier.ARBEIDSGIVER}>
                <Normaltekst className="checkedblock">
                    <CheckedIkon />
                    {getLedetekst(tekst('oppsummering.utbetaling.til'), {
                        '%ARBEIDSGIVER_NAVN%': ArbeidsOgVelferdsetaten.navn,
                        '%ARBEIDSGIVER_ORGNR%': ArbeidsOgVelferdsetaten.orgNr
                    })}
                </Normaltekst>
            </Vis>
        </>
    )
}

export default Utbetaling
