import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { ArbeidsgiverInterface } from '../../models/arbeidsgiver'
import CheckedMedTekst from '../common/checked-med-tekst/checked-med-tekst'
import { utbetalingSpørsmålVerdier } from '../sporsmal/sporsmal-tekster'
import Vis from '../vis'

const OppsummeringUtbetaling = () => {
    const { activeMegArbeidsgiver } = useAppStore()

    const getArbeidsgiver = () : ArbeidsgiverInterface => ({
        navn: 'Arbeids- og velferdsetaten',
        orgNr: '392392482849',
    })

    return (
        <div className="oppsummering-element oppsummering-utbetaling">
            <Undertittel className="oppsummering-underoverskrift">Hvem skal pengene utbetales til?</Undertittel>
            <Vis hvis={activeMegArbeidsgiver === utbetalingSpørsmålVerdier.MEG}>
                <CheckedMedTekst tekst="Pengene skal utbetales til deg." />
            </Vis>
            <Vis hvis={activeMegArbeidsgiver === utbetalingSpørsmålVerdier.ARBEIDSGIVER}>
                <CheckedMedTekst tekst={`Pengene skal utbetales til ${getArbeidsgiver().navn} (org.nr. ${getArbeidsgiver().orgNr}).`} />
            </Vis>
        </div>
    )
}

export default OppsummeringUtbetaling
