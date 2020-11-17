import { ArbeidsgiverInterface, Transportmiddel } from '../../types'
import { InputProps, RadioSporsmalProps, } from '../../types'

export const utbetalingSporsmalVerdier = {
    NAME: 'UTBETALINGARBEIDSGIVER',
    MEG: 'MEG',
    ARBEIDSGIVER: 'ARBEIDSGIVER',
}

export const ArbeidsOgVelferdsetaten: ArbeidsgiverInterface = {
    navn: 'Arbeids- og velferdsetaten',
    orgNr: '392392482849',
}

export const utbetalingSporsmal: RadioSporsmalProps = {
    id: 'utbetaling-sporsmal',
    tittel: 'Utbetaling til arbeidsgiver',
    name: utbetalingSporsmalVerdier.NAME,
    spørsmålstekst: '',
    svaralternativer: [
        {
            id: 'utbetaling-meg',
            label: 'Meg',
            value: utbetalingSporsmalVerdier.MEG,
        },
        {
            id: 'utbetaling-arbeidsgiver',
            label: ArbeidsOgVelferdsetaten.navn,
            value: utbetalingSporsmalVerdier.ARBEIDSGIVER,
        },
    ],
}

export const kvitteringTotaltBeløpSpørsmål: InputProps = {
    id: 'filopplaster-totalt-beløp-input',
    tittel: 'Totalt beløp',
    inputMode: 'numeric',
    feil: 'Beløpet er ugyldig',
    bredde: 'fullbredde',
}

export const kvitteringDatoSpørsmål = {
    id: 'filopplaster-dato-input',
}

export const kvitteringTransportmiddelSpørsmål = {
    id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.TAXI}`,
}
