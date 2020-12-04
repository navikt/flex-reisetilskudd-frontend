import './opplasting.less'

import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Knapp } from 'nav-frontend-knapper'
import { Normaltekst, Systemtittel, } from 'nav-frontend-typografi'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { useAppStore } from '../../../data/stores/app-store'
import { pathTilSide } from '../../../utils/navigasjon'
import { tekst } from '../../../utils/tekster'
import FilListe from '../../filopplaster/fil-liste'
import TotalBelop from '../../total-belop/total-belop'
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
        setKvitteringIndex(-1)
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

            <div className="knapperad">
                <Knapp type="hoved" onClick={handleVidereKlikk}>
                    {tekst('klikkbar.videre-knapp.tekst')}
                </Knapp>
            </div>
        </div>
    )
}

export default Opplasting
