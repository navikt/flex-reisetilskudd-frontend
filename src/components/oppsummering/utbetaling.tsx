import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { ArbeidsgiverInterface } from '../../types/arbeidsgiver'
import { tekst } from '../../utils/tekster'
import CheckedMedTekst from '../checked-med-tekst/checked-med-tekst'
import { utbetalingSpørsmålVerdier } from '../sporsmal-svar/sporsmal-konstanter'
import Vis from '../vis'

const Utbetaling = () => {
    const { activeMegArbeidsgiver } = useAppStore()

    const getArbeidsgiver = () : ArbeidsgiverInterface => ({
        navn: 'Arbeids- og velferdsetaten',
        orgNr: '392392482849',
    })

    return (
        <div className="oppsummering-element oppsummering-utbetaling">
            <Undertittel className="oppsummering-underoverskrift">
                {tekst('oppsummering.utbetaling.tittel')}
            </Undertittel>
            <Vis hvis={activeMegArbeidsgiver === utbetalingSpørsmålVerdier.MEG}>
                <CheckedMedTekst tekst={tekst('oppsummering.utbetaling.undertittel')} />
            </Vis>
            <Vis hvis={activeMegArbeidsgiver === utbetalingSpørsmålVerdier.ARBEIDSGIVER}>
                <CheckedMedTekst tekst={`Pengene skal utbetales til ${getArbeidsgiver().navn} (org.nr. ${getArbeidsgiver().orgNr}).`} />
            </Vis>
        </div>
    )
}

export default Utbetaling
