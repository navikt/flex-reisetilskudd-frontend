import './klikkbar.less'

import { Knapp } from 'nav-frontend-knapper'
import React from 'react'

import { AktivtStegProps } from '../../types/navigasjon'
import { tekst } from '../../utils/tekster'

const VidereKnapp = ({ onClick }: AktivtStegProps) => {
    return (
        <div className="knapperad">
            <Knapp type="hoved" onClick={() => onClick!()}>
                {tekst('klikkbar.videre-knapp.tekst')}
            </Knapp>
        </div>
    )
}

export default VidereKnapp
