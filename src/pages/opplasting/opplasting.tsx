import './opplasting.less'

import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Normaltekst, Systemtittel, } from 'nav-frontend-typografi'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import VidereKnapp from '../../components/diverse/klikkbar/videre-knapp'
import DragAndDrop from '../../components/filopplaster/drag-and-drop/drag-and-drop'
import FilopplasterModal from '../../components/filopplaster/filopplaster-modal/filopplaster-modal'
import OpplastedeFiler from '../../components/filopplaster/opplastede-filer'
import TotalBelop from '../../components/kvittering/total-belop/total-belop'
import { gåTilNesteSide } from '../../utils/navigasjon'
import { tekst } from '../../utils/tekster'

const Opplasting = () => {
    const { steg } = useParams<RouteParams>()
    const soknadssideIDTall = Number(steg)
    const history = useHistory()

    const handleVidereKlikk = () => {
        gåTilNesteSide(history, soknadssideIDTall)
    }

    return (
        <div className="last-opp-kvittering-wrapper">
            <Systemtittel className="last-opp-kvittering-overskrift">
                {tekst('opplasting.last-opp')}
            </Systemtittel>
            <div className="last-opp-kvittering-tekst">
                <Normaltekst id="kvitteringsopplastning-overskrift"
                    aria-describedby="min-hjelpetekst-kvitteringsopplastning"
                >
                    {tekst('opplasting.her-kan')}
                </Normaltekst>
                <Hjelpetekst className="kvitteringsopplasting-hjelpetekst"
                    id="min-hjelpetekst-kvitteringsopplastning"
                    aria-describedby="kvitteringsopplastning-overskrift"
                >
                    {tekst('opplasting.hjelpetekst')}
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

export default Opplasting
