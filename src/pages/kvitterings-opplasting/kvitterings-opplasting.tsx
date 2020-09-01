import './kvitterings-opplasting.less'

import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Normaltekst, Systemtittel, } from 'nav-frontend-typografi'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import DragAndDrop from '../../components/filopplaster/drag-and-drop/drag-and-drop'
import FilopplasterModal from '../../components/filopplaster/filopplaster-modal/filopplaster-modal'
import OpplastedeFiler from '../../components/filopplaster/opplastede-filer'
import VidereKnapp from '../../components/knapper/videre-knapp'
import TotalBelop from '../../components/kvittering/totalt-belop/TotaltBelop'
import { hjelpetekstKvitteringopplasting } from '../../constants/hjelpetekster'
import { gåTilNesteSide } from '../../utils/navigasjon'

const KvitteringsOpplasting = () => {
    const { soknadssideID } = useParams<RouteParams>()
    const soknadssideIDTall = Number(soknadssideID)
    const history = useHistory()

    const handleVidereKlikk = () => {
        gåTilNesteSide(history, soknadssideIDTall)
    }
    return (
        <div className="last-opp-kvittering-wrapper">
            <Systemtittel className="last-opp-kvittering-overskrift">Last opp dine kvitteringer</Systemtittel>
            <div className="last-opp-kvittering-tekst">
                <Normaltekst id="kvitteringsopplastning-overskrift" aria-describedby="min-hjelpetekst-kvitteringsopplastning">Her kan du laste opp kvitteringer fra
                    reisetilskuddsperioden.</Normaltekst>
                <Hjelpetekst className="kvitteringsopplasting-hjelpetekst" id="min-hjelpetekst-kvitteringsopplastning" aria-describedby="kvitteringsopplastning-overskrift">
                    {hjelpetekstKvitteringopplasting.hjelpetekst}
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
                <VidereKnapp
                    aktivtSteg={soknadssideIDTall}
                    onClick={handleVidereKlikk}
                />
            </div>
        </div>
    )
}

export default KvitteringsOpplasting
