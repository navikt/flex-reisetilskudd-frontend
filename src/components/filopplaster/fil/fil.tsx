import './fil.less'

import { AlertStripeFeil } from 'nav-frontend-alertstriper'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { customTruncet, formaterFilstørrelse } from '../../../utils/fil-utils'
import { tekst } from '../../../utils/tekster'
import vedlegg from './vedlegg.svg'

interface Props {
    fil: File | null;
    href?: string;
    className?: string;
}

const Fil = ({ fil }: Props) => {
    return (
        <>
            {fil
                ?
                <div key={fil!.name} className="modal-fil">
                    <img className="vedleggsikon" src={vedlegg} alt="" />
                    <Normaltekst tag="span" className="filnavn">
                        {customTruncet(fil!.name, 20)}
                    </Normaltekst>
                    <Normaltekst tag="span" className="filstr">
                        ({formaterFilstørrelse(fil!.size)})
                    </Normaltekst>
                </div>
                :
                <AlertStripeFeil key="" className="feilmelding-alert">
                    {tekst('fil.feilmelding')}
                </AlertStripeFeil>
            }
        </>
    )
}

export default Fil
