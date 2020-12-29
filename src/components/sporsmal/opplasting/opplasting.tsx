import './opplasting.less'

import { Knapp } from 'nav-frontend-knapper'
import { Normaltekst, Systemtittel, } from 'nav-frontend-typografi'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { useAppStore } from '../../../data/stores/app-store'
import { pathTilSide } from '../../../utils/navigasjon'
import { getLedetekst, tekst } from '../../../utils/tekster'
import FilListe from '../../filopplaster/fil-liste'
import KvitteringModal from '../../filopplaster/kvittering-modal/kvittering-modal'
import PlussIkon from './pluss-ikon.svg'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato'
import AvbrytKnapp from '../../avbryt/avbryt-knapp'

const Opplasting = () => {
    const { valgtReisetilskudd, setOpenModal, setKvitteringIndex } = useAppStore()
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
                {tekst('opplasting.tittel')}
            </Systemtittel>

            <div className="opplasting__tekst">
                <Normaltekst id="opplasting-overskrift" aria-describedby="opplasting-hjelpetekst">
                    {getLedetekst(tekst('opplasting.her-kan'), {
                        '%DATOER%': tilLesbarPeriodeMedArstall(valgtReisetilskudd!.fom, valgtReisetilskudd!.tom, 'og'),
                    })}
                </Normaltekst>
            </div>

            <button className="fler-vedlegg" onClick={aktiverModal}>
                <img className="pluss-ikon" src={PlussIkon} alt="" />
                <Normaltekst tag="span">{tekst('opplasting.legg-til')}</Normaltekst>
            </button>

            <KvitteringModal />

            <FilListe fjernKnapp />

            <div className="knapperad">
                <Knapp type="hoved" onClick={handleVidereKlikk}>
                    {tekst('klikkbar.videre-knapp.tekst')}
                </Knapp>
                <AvbrytKnapp />
            </div>
        </div>
    )
}

export default Opplasting
