import './knapper.less'

import { Knapp } from 'nav-frontend-knapper'
import React from 'react'

import { AktivtStegProps } from '../../models/navigasjon'

const VidereKnapp = ({ onClick }: AktivtStegProps) => {
    function handleClick() {
        if (onClick) {
            onClick()
        }
    }

    return (
        <div className="videre-knapp">
            <Knapp type="hoved" onClick={() => handleClick()}>Gå videre</Knapp>
        </div>
    )
}

export default VidereKnapp
