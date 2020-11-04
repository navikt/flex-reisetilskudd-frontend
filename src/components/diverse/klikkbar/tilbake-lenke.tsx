import './klikkbar.less'

import { VenstreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

import { AktivtStegProps } from '../../../types'
import { pathTilSide } from '../../../utils/navigasjon'
import { tekst } from '../../../utils/tekster'
import Vis from '../vis'

function TilbakeLenke({ aktivtSteg }: AktivtStegProps): ReactElement {
    const history = useHistory()

    return (
        <div className="tilbake-lenke">
            <Vis hvis={aktivtSteg === 1}>
                <Lenke href="/">
                    <VenstreChevron />
                    <Normaltekst tag="span">
                        {tekst('klikkbar.tilbake-lenke.tekst.aktiv')}
                    </Normaltekst>
                </Lenke>
            </Vis>
            <Vis hvis={aktivtSteg > 1}>
                <Lenke href={pathTilSide((aktivtSteg - 1), history)}>
                    <VenstreChevron />
                    <Normaltekst tag="span">
                        {tekst('klikkbar.tilbake-lenke.tekst')}
                    </Normaltekst>
                </Lenke>
            </Vis>
        </div>
    )
}

export default TilbakeLenke
