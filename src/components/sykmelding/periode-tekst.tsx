import { Normaltekst } from 'nav-frontend-typografi'
import React, { ReactElement } from 'react'

import { DatoFormat, formatertDato } from '../../utils/dato'
import { getLedetekst, tekst } from '../../utils/tekster'
import { CheckedIkon } from '../diverse/checked-ikon/checked-ikon'
import Vis from '../diverse/vis'

interface PeriodeTekstProps {
    fraDato: string,
    tilDato: string,
}

const PeriodeTekst = ({ fraDato, tilDato }: PeriodeTekstProps): ReactElement => (
    <>
        <Vis hvis={fraDato !== '' && tilDato !== ''}>
            <Normaltekst className="checkedblock">
                <CheckedIkon />
                {getLedetekst(tekst('dine_reisetilskudd.periode'), {
                    '%FRA%': formatertDato(fraDato, DatoFormat.NATURLIG_LANG),
                    '%TIL%': formatertDato(tilDato, DatoFormat.NATURLIG_LANG)
                })}
            </Normaltekst>
        </Vis>

        <Vis hvis={fraDato !== '' && tilDato === ''}>
            {formatertDato(new Date(fraDato), DatoFormat.NATURLIG_LANG)}
        </Vis>

        <Vis hvis={fraDato === '' && tilDato === ''}>
            {tekst('sykmelding.fant-ikke')}
        </Vis>
    </>
)

export default PeriodeTekst
