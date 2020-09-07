import './kvitterings-opplasting.less'

import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Normaltekst, Systemtittel, } from 'nav-frontend-typografi'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import DragAndDrop from '../../components/filopplaster/drag-and-drop/drag-and-drop'
import FilopplasterModal from '../../components/filopplaster/filopplaster-modal/filopplaster-modal'
import OpplastedeFiler from '../../components/filopplaster/opplastede-filer'
import VidereKnapp from '../../components/klikkbar/videre-knapp'
import TotalBelop from '../../components/kvittering/total-belop/total-belop'
import { gåTilNesteSide } from '../../utils/navigasjon'
import { tekst } from '../../utils/tekster'

const KvitteringsOpplasting = () => {
    const { soknadssideID } = useParams<RouteParams>()
    const soknadssideIDTall = Number(soknadssideID)
    const history = useHistory()

    const handleVidereKlikk = () => {
        gåTilNesteSide(history, soknadssideIDTall)
    }

    return (
        <div className="last-opp-kvittering-wrapper">
            <Systemtittel className="last-opp-kvittering-overskrift">
                {tekst('kvitterings.last-opp')}
            </Systemtittel>
            <div className="last-opp-kvittering-tekst">
                <Normaltekst id="kvitteringsopplastning-overskrift"
                    aria-describedby="min-hjelpetekst-kvitteringsopplastning"
                >
                    {tekst('kvitterings.her-kan')}
                </Normaltekst>
                <Hjelpetekst className="kvitteringsopplasting-hjelpetekst"
                    id="min-hjelpetekst-kvitteringsopplastning"
                    aria-describedby="kvitteringsopplastning-overskrift"
                >
                    {tekst('kvitterings.hjelpetekst')}
                </Hjelpetekst>
            </div>
            <div className="filopplaster-wrapper">
                <div className="filopplaster">
                    <FilopplasterModal />
                    <DragAndDrop />
                </div>
                <OpplastedeFiler fjernKnapp />
                <div className="kvitteringer-totalt-beløp">
                    <TotalBelop />
                </div>
                <VidereKnapp aktivtSteg={soknadssideIDTall} onClick={handleVidereKlikk} />
            </div>
        </div>
    )
}

export default KvitteringsOpplasting
