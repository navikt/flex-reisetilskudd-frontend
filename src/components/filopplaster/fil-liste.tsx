import 'nav-frontend-tabell-style'
import './fil-liste.less'

import dayjs from 'dayjs'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useState } from 'react'
import useForceUpdate from 'use-force-update'

import { del } from '../../data/fetcher/fetcher'
import { useAppStore } from '../../data/stores/app-store'
import { Kvittering, Transportmiddel } from '../../types/types'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { formatterTall } from '../../utils/utils'
import Vis from '../diverse/vis'
import slettFilIkon from './slett-fil-ikon.svg'
import TotalBelop from '../total-belop/total-belop'
import NavFrontendChevron  from 'nav-frontend-chevron'

interface Props {
    fjernKnapp?: boolean
}

enum Sortering { // eslint-disable-line
    DatoMax = 'DatoMax', // eslint-disable-line
    DatoMin = 'DatoMin', // eslint-disable-line
    TransportMax = 'TransportMax', // eslint-disable-line
    TransportMin = 'TransportMin', // eslint-disable-line
    BelopMax = 'BelopMax', // eslint-disable-line
    BelopMin = 'BelopMin', // eslint-disable-line
}

const FilListe = ({ fjernKnapp }: Props) => {
    const { valgtReisetilskudd, setValgtReisetilskudd, setOpenModal, setKvitteringIndex } = useAppStore()
    const [ sortering, setSortering ] = useState<Sortering>(Sortering.DatoMax)
    let kvitteringer = valgtReisetilskudd?.kvitteringer || []
    const forceUpdate = useForceUpdate()

    const slettKvittering = (kvitto: Kvittering) => {
        del(`${env.backendUrl}/api/v1/kvittering/${kvitto.kvitteringId}`)
            .then(() => {
                kvitteringer = kvitteringer.filter((kvittering) =>
                    kvittering.kvitteringId !== kvitto.kvitteringId
                )
                valgtReisetilskudd!.kvitteringer = kvitteringer
                setValgtReisetilskudd(valgtReisetilskudd)

                forceUpdate()
            })
            .catch((error) => {
                logger.error('Feil under sletting av kvittering', error)
            })
    }

    const visKvittering = (idx: number) => {
        setOpenModal(true)
        setKvitteringIndex(idx)
    }

    const sorterteKvitteringer = () => {
        if (sortering === Sortering.DatoMax) {
            kvitteringer.sort((a, b) => (a.fom! > b.fom!) ? -1 : 1)
        } else if (sortering === Sortering.DatoMin) {
            kvitteringer.sort((a, b) => (a.fom! > b.fom!) ? 1 : -1)
        } else if (sortering === Sortering.TransportMax) {
            kvitteringer.sort((a, b) => (a.transportmiddel! > b.transportmiddel!) ? -1 : 1)
        } else if (sortering === Sortering.TransportMin) {
            kvitteringer.sort((a, b) => (a.transportmiddel! > b.transportmiddel!) ? 1 : -1)
        } else if (sortering === Sortering.BelopMax) {
            kvitteringer.sort((a, b) => (a.belop! > b.belop!) ? -1 : 1)
        } else if (sortering === Sortering.BelopMin) {
            kvitteringer.sort((a, b) => (a.belop! > b.belop!) ? 1 : -1)
        }
        return kvitteringer
    }

    return (
        <Vis hvis={valgtReisetilskudd!.kvitteringer.length > 0}>
            <Normaltekst tag="table" className="tabell tabell--stripet fil_liste">
                <Vis hvis={fjernKnapp}>
                    <thead>
                        <tr>
                            <th>
                                <div className="sortering__heading">
                                    <button onClick={() => setSortering(Sortering.DatoMax)} className="lenkeknapp" >
                                        Utlegg
                                    </button>
                                    <span className="sortering__chevron">
                                        <button onClick={() => setSortering(Sortering.DatoMax)} className="lenkeknapp" >
                                            <NavFrontendChevron type="opp" />
                                        </button>
                                        <button onClick={() => setSortering(Sortering.DatoMin)} className="lenkeknapp" >
                                            <NavFrontendChevron type="ned" />
                                        </button>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className="sortering__heading">
                                    <button onClick={() => setSortering(Sortering.TransportMin)} className="lenkeknapp" >
                                        Transport
                                    </button>
                                    <span className="sortering__chevron">
                                        <button onClick={() => setSortering(Sortering.TransportMax)} className="lenkeknapp" >
                                            <NavFrontendChevron type="opp" />
                                        </button>
                                        <button onClick={() => setSortering(Sortering.TransportMin)} className="lenkeknapp" >
                                            <NavFrontendChevron type="ned" />
                                        </button>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className="sortering__heading belop">
                                    <button onClick={() => setSortering(Sortering.BelopMax)} className="lenkeknapp" >
                                        Beløp
                                    </button>
                                </div>
                            </th>
                            <th />
                        </tr>
                    </thead>
                </Vis>
                <tbody>
                    {sorterteKvitteringer().map((kvittering: Kvittering, idx) => (
                        <tr key={idx}>
                            <td className="dato">
                                <button tabIndex={0} className="lenkeknapp" onClick={() => visKvittering(idx)}>
                                    {kvittering.fom ? dayjs(kvittering.fom).format('DD.MM.YYYY') : ''}
                                </button>
                            </td>
                            <td className="transport">
                                {Transportmiddel[kvittering.transportmiddel!]}
                            </td>
                            <td className="belop">
                                {formatterTall(kvittering.belop)} kr
                            </td>
                            <td>
                                <button className="lenkeknapp slett-knapp"
                                    onClick={() => slettKvittering(kvittering)} tabIndex={0}
                                >
                                    <img src={slettFilIkon} className="slett-img" alt="" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Normaltekst>

            <TotalBelop />
        </Vis>
    )
}

export default FilListe
