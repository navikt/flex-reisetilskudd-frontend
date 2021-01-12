import { Normaltekst } from 'nav-frontend-typografi'
import React, { ReactElement } from 'react'

import { getLedetekst, tekst } from '../../utils/tekster'
import { CheckedIkon } from '../diverse/checked-ikon/checked-ikon'
import Vis from '../diverse/vis'
import dayjs from 'dayjs'

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
                    '%FRA%': dayjs(fraDato).format('D. MMMM YYYY'),
                    '%TIL%': dayjs(tilDato).format('D. MMMM YYYY')
                })}
            </Normaltekst>
        </Vis>

        <Vis hvis={fraDato !== '' && tilDato === ''}>
            {dayjs(new Date(fraDato)).format('D. MMMM YYYY')}
        </Vis>

        <Vis hvis={fraDato === '' && tilDato === ''}>
            {tekst('sykmelding.fant-ikke')}
        </Vis>
    </>
)

export default PeriodeTekst
