import React, { ReactElement } from 'react'

import { DatoFormat, formatertDato } from '../../utils/dato'
import CheckedMedTekst from '../common/checked-med-tekst/checked-med-tekst'
import Vis from '../vis'

interface PeriodeTekstProps {
    fraDato: string,
    tilDato: string,
}

const PeriodeTekst = ({ fraDato, tilDato }: PeriodeTekstProps): ReactElement => (
    <span className="sykmelding-periode-tekst">
        <Vis hvis={fraDato !== '' && tilDato !== ''}>
            <CheckedMedTekst
                tekst={`${formatertDato(new Date(fraDato), DatoFormat.NATURLIG_LANG)} til ${formatertDato(new Date(tilDato), DatoFormat.NATURLIG_LANG)}`}
            />
        </Vis>

        <Vis hvis={fraDato !== '' && tilDato === ''}>
            {formatertDato(new Date(fraDato), DatoFormat.NATURLIG_LANG)}
        </Vis>

        <Vis hvis={fraDato === '' && tilDato === ''}>
            Kunne dessverre ikke finne perioden
        </Vis>
    </span>
)

export default PeriodeTekst
