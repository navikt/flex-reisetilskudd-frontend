import { ArbeidsgiverInterface, RadioSporsmalProps } from '../../types/types'

export const ArbeidsOgVelferdsetaten: ArbeidsgiverInterface = {
    navn: 'Arbeids- og velferdsetaten',
    orgNr: '392392482849',
}

export const utbetalingSporsmal: RadioSporsmalProps = {
    id: 'utbetaling-sporsmal',
    tittel: 'Utbetaling til arbeidsgiver',
    name: 'UTBETALINGARBEIDSGIVER',
    spørsmålstekst: '',
    svaralternativer: [
        {
            id: 'utbetaling-meg',
            label: 'Meg',
            value: 'MEG',
        },
        {
            id: 'utbetaling-arbeidsgiver',
            label: ArbeidsOgVelferdsetaten.navn,
            value: 'ARBEIDSGIVER',
        },
    ],
}
