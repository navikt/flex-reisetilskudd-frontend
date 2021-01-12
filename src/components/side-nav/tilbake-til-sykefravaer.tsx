import env from '../../utils/environment'
import { VenstreChevron } from 'nav-frontend-chevron'
import { tekst } from '../../utils/tekster'
import Lenke from 'nav-frontend-lenker'
import React from 'react'
import { Normaltekst } from 'nav-frontend-typografi'

const TilbakeTilSykefravaer = () => {

    return (
        <Lenke href={env.sykefravaerUrl} className="tilbake-til-sykefravaer">
            <VenstreChevron />
            <Normaltekst tag="span">{tekst('side_nav.tilbake.sykefravær')}</Normaltekst>
        </Lenke>
    )
}

export default TilbakeTilSykefravaer
