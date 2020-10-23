import './fil.less'

import { AlertStripeFeil } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import vedlegg from '../../../assets/vedlegg.svg'
import formaterFilstørrelse from '../../../utils/fil-utils'
import { tekst } from '../../../utils/tekster'

interface Props {
    fil: File | null;
    href?: string;
    className?: string;
}

function customTruncet(fullString: string, trimsize: number) {
    const separator = '...'
    if (fullString.length <= trimsize) {
        return fullString
    }
    return fullString.substr(0, trimsize) + separator + fullString.substr(-3)
}

const Fil = ({ fil }: Props) => (
    <>
        {fil
            ?
            <div key={fil.name} className="modal-fil">
                <img className="vedleggsikon" src={vedlegg} alt="Vedleggsikon" />
                <Lenke href="#" className="filnavn">{customTruncet(fil.name, 20)}</Lenke>
                <Normaltekst className="filstorrelse">
                    {formaterFilstørrelse(fil.size)}
                </Normaltekst>
            </div>
            :
            <AlertStripeFeil key="" className="feilmelding-alert">
                {tekst('fil.feilmelding')}
            </AlertStripeFeil>
        }
    </>
)

export default Fil
