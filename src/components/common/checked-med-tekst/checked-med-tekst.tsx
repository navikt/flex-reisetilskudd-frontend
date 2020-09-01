import './checked-med-tekst.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { CheckedIkon } from '../../../assets/ikoner'

interface Props {
    tekst: string;
}

const CheckedMedTekst = ({ tekst }: Props) => (
    <Normaltekst className="checked-med-tekst">
        <CheckedIkon />
        {tekst}
    </Normaltekst>
)

export default CheckedMedTekst
