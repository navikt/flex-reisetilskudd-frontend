import './knapper.less'

import { Tilbakeknapp } from 'nav-frontend-ikonknapper'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

import { AktivtStegProps } from '../../models/navigasjon'
import { pathTilSide } from '../../utils/navigasjon'
import Vis from '../vis'

function TilbakeKnapp({ aktivtSteg }: AktivtStegProps): ReactElement {
    const history = useHistory()

    function goTo(idx: number) {
        history.push(pathTilSide(idx, history))
    }

    return (
        <div className="tilbake-knapp">
            <Vis hvis={aktivtSteg === 1}>
                {/* Hvis vi er på første side i vår søknad og skal gå et annet sted */}
                <Tilbakeknapp onClick={() => history.push('/')}>
                    Tilbake til Dine Reisetilskudd
                </Tilbakeknapp>
            </Vis>
            <Vis hvis={aktivtSteg > 1}>
                <Tilbakeknapp onClick={() => goTo(aktivtSteg - 1)}>Tilbake</Tilbakeknapp>
            </Vis>
        </div>
    )
}

export default TilbakeKnapp
