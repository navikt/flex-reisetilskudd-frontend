import './opplasting.less'

import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Normaltekst, Systemtittel, } from 'nav-frontend-typografi'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { useAppStore } from '../../../data/stores/app-store'
import { pathTilSide } from '../../../utils/navigasjon'
import { tekst } from '../../../utils/tekster'
import VidereKnapp from '../../diverse/klikkbar/videre-knapp'
import FilListe from '../../filopplaster/fil-liste'
import TotalBelop from '../../kvittering/total-belop/total-belop'
import PlussIkon from './pluss-ikon.svg'

const Opplasting = () => {
    const { setOpenModal, setKvitteringIndex } = useAppStore()
    const { steg } = useParams<RouteParams>()
    const stegNr = Number(steg)
    const history = useHistory()

    const handleVidereKlikk = () => {
        if (stegNr + 1 <= 4 && stegNr + 1 > 1) {
            history.push(pathTilSide(stegNr + 1, history))
        }
    }

    const aktiverModal = () => {
        setOpenModal(true)
        setKvitteringIndex(0)
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

            <button className="fler-vedlegg" onClick={aktiverModal}>
                <img className="pluss-ikon" src={PlussIkon} alt="" />
                <Normaltekst tag="span">{tekst('opplasting.legg-til')}</Normaltekst>
            </button>

            <FilListe fjernKnapp />

            <div className="kvitteringer-total">
                <TotalBelop />
            </div>

            <VidereKnapp aktivtSteg={stegNr} onClick={handleVidereKlikk} />
        </div>
    )
}

export default Opplasting
