import React, { ReactElement } from 'react'

import { DatoFormat, formatertDato } from '../../utils/dato'
import { getLedetekst, tekst } from '../../utils/tekster'
import CheckedMedTekst from '../checked-med-tekst/checked-med-tekst'
import Vis from '../vis'

interface PeriodeTekstProps {
    fraDato: string,
    tilDato: string,
}

const PeriodeTekst = ({ fraDato, tilDato }: PeriodeTekstProps): ReactElement => (
    <span className="sykmelding-periode-tekst">
        <Vis hvis={fraDato !== '' && tilDato !== ''}>
            <CheckedMedTekst
                tekst={getLedetekst(tekst('dine_reisetilskudd.periode'), {
                    '%FRA%': formatertDato(fraDato, DatoFormat.NATURLIG_LANG),
                    '%TIL%': formatertDato(tilDato, DatoFormat.NATURLIG_LANG)
                })}
            />
        </Vis>

        <Vis hvis={fraDato !== '' && tilDato === ''}>
            {formatertDato(new Date(fraDato), DatoFormat.NATURLIG_LANG)}
        </Vis>

        <Vis hvis={fraDato === '' && tilDato === ''}>
            {tekst('sykmelding.fant-ikke')}
        </Vis>
    </span>
)

export default PeriodeTekst
