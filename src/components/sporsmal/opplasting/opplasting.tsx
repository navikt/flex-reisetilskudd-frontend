import './opplasting.less'

import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Normaltekst, Systemtittel, } from 'nav-frontend-typografi'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { useAppStore } from '../../../data/stores/app-store'
import { gåTilNesteSide } from '../../../utils/navigasjon'
import { tekst } from '../../../utils/tekster'
import VidereKnapp from '../../diverse/klikkbar/videre-knapp'
import FilopplasterModal from '../../filopplaster/filopplaster-modal/filopplaster-modal'
import OpplastedeFiler from '../../filopplaster/opplastede-filer'
import TotalBelop from '../../kvittering/total-belop/total-belop'
import PlussIkon from './pluss-ikon.svg'

const Opplasting = () => {
    const { setOpenModal } = useAppStore()
    const { steg } = useParams<RouteParams>()
    const stegNr = Number(steg)
    const history = useHistory()

    const handleVidereKlikk = () => {
        gåTilNesteSide(history, stegNr)
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

            <button className="fler-vedlegg" onClick={() => setOpenModal(true)}>
                <img className="pluss-ikon" src={PlussIkon} alt="" />
                <Normaltekst tag="span">{tekst('opplasting.legg-til')}</Normaltekst>
            </button>

            <FilopplasterModal />
            <OpplastedeFiler fjernKnapp />

            <div className="kvitteringer-total">
                <TotalBelop />
            </div>
            <VidereKnapp aktivtSteg={stegNr} onClick={handleVidereKlikk} />
        </div>
    )
}

export default Opplasting
