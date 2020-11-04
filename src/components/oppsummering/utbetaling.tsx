import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { ArbeidsgiverInterface } from '../../types'
import { tekst } from '../../utils/tekster'
import { CheckedIkon } from '../diverse/checked-ikon/checked-ikon'
import Vis from '../diverse/vis'
import { utbetalingSporsmalVerdier } from '../sporsmal-svar/sporsmal-konstanter'

const Utbetaling = () => {
    const { activeMegArbeidsgiver } = useAppStore()

    const getArbeidsgiver = () : ArbeidsgiverInterface => ({
        navn: 'Arbeids- og velferdsetaten',
        orgNr: '392392482849',
    })

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
                    {`Pengene skal utbetales til ${getArbeidsgiver().navn} (org.nr. ${getArbeidsgiver().orgNr}).`}
                </Normaltekst>
            </Vis>
        </>
    )
}

export default Utbetaling
