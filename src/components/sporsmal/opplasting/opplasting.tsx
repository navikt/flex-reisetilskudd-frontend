import './opplasting.less'

import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Normaltekst, Systemtittel, } from 'nav-frontend-typografi'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { gåTilNesteSide } from '../../../utils/navigasjon'
import { tekst } from '../../../utils/tekster'
import VidereKnapp from '../../diverse/klikkbar/videre-knapp'
import DragAndDrop from '../../filopplaster/drag-and-drop/drag-and-drop'
import FilopplasterModal from '../../filopplaster/filopplaster-modal/filopplaster-modal'
import OpplastedeFiler from '../../filopplaster/opplastede-filer'
import TotalBelop from '../../kvittering/total-belop/total-belop'

const Opplasting = () => {
    const { steg } = useParams<RouteParams>()
    const soknadssideIDTall = Number(steg)
    const history = useHistory()

    const handleVidereKlikk = () => {
        gåTilNesteSide(history, soknadssideIDTall)
    }

    return (
        <div className="opplasting">
            <Systemtittel>
                {tekst('opplasting.last-opp')}
            </Systemtittel>
            <div className="opplasting__tekst">
                <Normaltekst id="opplasting-overskrift"
                    aria-describedby="opplasting-hjelpetekst"
                >
                    {tekst('opplasting.her-kan')}
                </Normaltekst>
                <Hjelpetekst className="opplasting__hjelpetekst"
                    id="opplasting-hjelpetekst"
                    aria-describedby="opplasting-overskrift"
                >
                    {tekst('opplasting.hjelpetekst')}
                </Hjelpetekst>
            </div>

            <FilopplasterModal />
            <DragAndDrop />

            <OpplastedeFiler fjernKnapp />
            <div className="kvitteringer-total">
                <TotalBelop />
            </div>
            <VidereKnapp aktivtSteg={soknadssideIDTall} onClick={handleVidereKlikk} />
        </div>
    )
}

export default Opplasting
