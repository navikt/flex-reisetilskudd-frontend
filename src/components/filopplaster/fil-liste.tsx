import './fil-liste.less'

import dayjs from 'dayjs'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { del } from '../../data/fetcher/fetcher'
import { useAppStore } from '../../data/stores/app-store'
import { Kvittering } from '../../types'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import Vis from '../diverse/vis'
import KvitteringModal from './kvittering-modal/kvittering-modal'
import slettFilIkon from './slett-fil-ikon.svg'

interface Props {
    fjernKnapp?: boolean
}

const FilListe = ({ fjernKnapp }: Props) => {
    const { valgtReisetilskudd, setValgtReisetilskudd, setOpenModal } = useAppStore()
    let kvitteringer = valgtReisetilskudd!.kvitteringer

    const slettKvittering = (kvitto: Kvittering) => {
        kvitteringer = kvitteringer.filter(
            (kvittering) => kvittering.kvitteringId !== kvitto.kvitteringId,
        )
        valgtReisetilskudd!.kvitteringer = kvitteringer
        setValgtReisetilskudd(valgtReisetilskudd)

        del(`${env.apiUrl}/api/v1/kvittering/${kvitto.kvitteringId}`).catch((error) => {
            logger.error('Feil under sletting av kvittering', error)
        })
    }

    return (
        <>
            <KvitteringModal />

            <Vis hvis={valgtReisetilskudd!.kvitteringer.length > 0}>
                <Normaltekst tag="table" className="fil_liste">
                    <Vis hvis={fjernKnapp}>
                        <thead>
                            <tr>
                                <Element tag="th">Utlegg</Element>
                                <Element tag="th">Transport</Element>
                                <Element tag="th">Beløp</Element>
                            </tr>
                        </thead>
                    </Vis>
                    <tbody>
                        {valgtReisetilskudd!.kvitteringer.map((fil: Kvittering, idx) => (
                            <tr key={idx}>
                                <td className="dato">
                                    <strong>{tekst('fil_liste.dato')}:</strong>
                                    <button tabIndex={0} className="lenkeknapp" onClick={() => setOpenModal(true)}>
                                        {fil.fom ? dayjs(fil.fom).format('DD.MM.YYYY') : ''}
                                    </button>
                                </td>
                                <td className="transport">
                                    {fil.transportmiddel}
                                </td>
                                <td className="belop">
                                    <strong>{tekst('fil_liste.belop')}:</strong>
                                    {fil.belop} kr
                                </td>
                                <td>
                                    <button className="lenkeknapp slett-knapp"
                                        onClick={() => slettKvittering(fil)} tabIndex={0}
                                    >
                                        <img src={slettFilIkon} className="slett-img" alt="" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Normaltekst>
            </Vis>
        </>
    )
}

export default FilListe
