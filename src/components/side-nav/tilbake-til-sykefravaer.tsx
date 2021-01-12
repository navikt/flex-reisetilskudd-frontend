import env from '../../utils/environment'
import { VenstreChevron } from 'nav-frontend-chevron'
import { tekst } from '../../utils/tekster'
import Lenke from 'nav-frontend-lenker'
import React from 'react'

const TilbakeTilSykefravaer = () => {

    return (
        <div className="tilbake-til-sykefravaer">
            <Lenke href={env.sykefravaerUrl}>
                <VenstreChevron />
                {tekst('side_nav.tilbake.sykefravær')}
            </Lenke>
        </div>
    )
}

export default TilbakeTilSykefravaer
