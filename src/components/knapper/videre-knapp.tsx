import './knapper.less'

import { Knapp } from 'nav-frontend-knapper'
import React from 'react'

import { AktivtStegProps } from '../../models/navigasjon'

const VidereKnapp = ({ onClick }: AktivtStegProps) => {
    return (
        <div className="videre-knapp">
            <Knapp type="hoved" onClick={() => onClick!()}>Gå videre</Knapp>
        </div>
    )
}

export default VidereKnapp
