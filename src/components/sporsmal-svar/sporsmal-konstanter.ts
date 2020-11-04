import { arbeidsgiverNavnPlaceHolder, arbeidsgiverOrgNrPlaceHolder } from '../../pages/utbetaling-til/constants'
import { Transportmiddel } from '../../types'
import { CheckboxProps, InputProps, RadioSporsmalProps, } from '../../types'

export const utbetalingSporsmalVerdier = {
    NAME: 'UTBETALINGARBEIDSGIVER',
    MEG: 'MEG',
    ARBEIDSGIVER: 'ARBEIDSGIVER',
}

export const utbetalingSporsmal: RadioSporsmalProps = {
    tittel: 'Utbetaling til arbeidsgiver',
    name: utbetalingSporsmalVerdier.NAME,
    spørsmålstekst: `Skal reisetilskuddet utbetales til deg eller til ${arbeidsgiverNavnPlaceHolder} (org.nr. ${arbeidsgiverOrgNrPlaceHolder})?`,
    svaralternativer: [
        {
            label: 'Meg',
            value: utbetalingSporsmalVerdier.MEG,
            id: 'utbetaling-meg',
        },
        {
            label: `${arbeidsgiverNavnPlaceHolder}`,
            value: utbetalingSporsmalVerdier.ARBEIDSGIVER,
            id: 'utbetaling-arbeidsgiver',
        },
    ],
    id: 'utbetaling-sporsmal',
}

export const transportalternativerVerdier = {
    GÅR: 'GÅR',
    SYKLER: 'SYKLER',
    KOLLEKTIVTRANSPORT: 'KOLLEKTIVTRANSPORT',
    EGEN_BIL: 'EGEN BIL',
}

export const transportalternativer: CheckboxProps = {
    tittel: 'Velg transportmiddel',
    svaralternativer: [
        {
            label: 'Går',
            value: transportalternativerVerdier.GÅR,
            id: 'transport-går',
        },
        {
            label: 'Sykler',
            value: transportalternativerVerdier.SYKLER,
            id: 'transport-sykler',
        },
        {
            label: 'Egen bil',
            value: transportalternativerVerdier.EGEN_BIL,
            id: 'transport-egen-bil',
        },
    ],
    id: 'dagens-transportmiddel-transportalternativer',
}

export const transportalternativerKollektivt: CheckboxProps = {
    tittel: '',
    svaralternativer: [
        {
            label: 'Kollektivtransport',
            value: transportalternativerVerdier.KOLLEKTIVTRANSPORT,
            id: 'transport-kollektiv',
        },
    ],
    id: 'dagens-transportmiddel-transportalternativer-kollektivt',
}

export const antallKilometerSpørsmål: InputProps = {
    tittel: 'Antall kilometer fra bosted til arbeid',
    inputMode: 'numeric',
    bredde: 'S',
    id: 'dagens-transportmiddel-kilometer-input',
}

export const månedligeUtgifterSpørsmål: InputProps = {
    tittel: 'Månedlige utgifter til offentlig transport',
    inputMode: 'numeric',
    bredde: 'S',
    id: 'dagens-transportmiddel-manedlige-utgifter-input',
}

export const kvitteringTotaltBeløpSpørsmål: InputProps = {
    tittel: 'Totalt beløp',
    inputMode: 'numeric',
    feil: 'Beløpet er ugyldig',
    bredde: 'fullbredde',
    id: 'filopplaster-totalt-beløp-input',
}

export const kvitteringDatoSpørsmål = {
    id: 'filopplaster-dato-input',
}

export const kvitteringTransportmiddelSpørsmål = {
    id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.TAXI}`,
}
