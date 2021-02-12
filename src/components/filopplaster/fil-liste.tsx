import 'nav-frontend-tabell-style'
import './fil-liste.less'

import dayjs from 'dayjs'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import useForceUpdate from 'use-force-update'

import { del } from '../../data/fetcher/fetcher'
import { useAppStore } from '../../data/stores/app-store'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { formatterTall } from '../../utils/utils'
import Vis from '../diverse/vis'
import slettFilIkon from './slett-fil-ikon.svg'
import NavFrontendChevron from 'nav-frontend-chevron'
import { getLedetekst, tekst } from '../../utils/tekster'
import Lenke from 'nav-frontend-lenker'
import { RSKvittering } from '../../types/rs-types/rs-kvittering'
import { TagTyper } from '../../types/enums'

interface Props {
    fjernKnapp?: boolean
}

enum Sortering {
    DatoMax = 'DatoMax',
    DatoMin = 'DatoMin',
    TransportMax = 'TransportMax',
    TransportMin = 'TransportMin',
    BelopMax = 'BelopMax',
    BelopMin = 'BelopMin',
}

const FilListe = ({ fjernKnapp }: Props) => {
    const { valgtReisetilskudd, setValgtReisetilskudd, setOpenModal, setKvitteringIndex } = useAppStore()
    const [ sortering, setSortering ] = useState<Sortering>(Sortering.DatoMax)
    const forceUpdate = useForceUpdate()

    let kvitteringer: RSKvittering[] = []
    valgtReisetilskudd?.sporsmal.forEach(spm => {
        const svar = spm.svarliste.svar
        if (spm.tag === TagTyper.KVITTERINGER && svar.length > 0) {
            kvitteringer = kvitteringer.concat(svar as RSKvittering[])
        }
    })

    const slettKvittering = (kvitto: RSKvittering) => {
        const id = valgtReisetilskudd?.id
        const path = '/flex-reisetilskudd-backend/api/v1/reisetilskudd/'
        del(`${env.flexGatewayRoot}${path}${id}/kvittering/${kvitto.id}`)
            .then(() => {
                kvitteringer = kvitteringer!.filter((kvittering) =>
                    kvittering.blobId !== kvitto.blobId
                )
                const spm = valgtReisetilskudd!.sporsmal.filter(spm => spm.tag === TagTyper.KVITTERINGER)[0]
                spm.svarliste.svar = kvitteringer
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
            kvitteringer.sort((a, b) => (a.datoForUtgift! > b.datoForUtgift!) ? -1 : 1)
        } else if (sortering === Sortering.DatoMin) {
            kvitteringer.sort((a, b) => (a.datoForUtgift! > b.datoForUtgift!) ? 1 : -1)
        } else if (sortering === Sortering.BelopMax) {
            kvitteringer.sort((a, b) => (a.belop! > b.belop!) ? -1 : 1)
        } else if (sortering === Sortering.BelopMin) {
            kvitteringer.sort((a, b) => (a.belop! > b.belop!) ? 1 : -1)
        }
        return kvitteringer
    }

    const totaltBeløp = (): number => (kvitteringer
        ? kvitteringer
            .filter((kvittering) => kvittering.belop)
            .map((kvittering) => kvittering.belop!)
            .reduce((a, b) => a + b, 0.0)
        : (0.0)) / 100

    return (
        <Vis hvis={kvitteringer.length > 0}>
            <Normaltekst tag="table" className="tabell tabell--stripet fil_liste">
                <Vis hvis={fjernKnapp}>
                    <thead>
                        <tr>
                            <th>
                                <div className="sortering__heading">
                                    <button onClick={() => setSortering(Sortering.DatoMax)} className="lenkeknapp">
                                        Utlegg
                                    </button>
                                    <span className="sortering__chevron">
                                        <button onClick={() => setSortering(Sortering.DatoMax)} className="lenkeknapp">
                                            <NavFrontendChevron type="opp" />
                                        </button>
                                        <button onClick={() => setSortering(Sortering.DatoMin)} className="lenkeknapp">
                                            <NavFrontendChevron type="ned" />
                                        </button>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className="sortering__heading">
                                    <button onClick={() => setSortering(Sortering.TransportMin)} className="lenkeknapp">
                                        Transport
                                    </button>
                                    <span className="sortering__chevron">
                                        <button onClick={() => setSortering(Sortering.TransportMax)}
                                            className="lenkeknapp">
                                            <NavFrontendChevron type="opp" />
                                        </button>
                                        <button onClick={() => setSortering(Sortering.TransportMin)}
                                            className="lenkeknapp">
                                            <NavFrontendChevron type="ned" />
                                        </button>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className="sortering__heading belop">
                                    <button onClick={() => setSortering(Sortering.BelopMax)} className="lenkeknapp">
                                        Beløp
                                    </button>
                                    <span className="sortering__chevron">
                                        <button onClick={() => setSortering(Sortering.BelopMax)} className="lenkeknapp">
                                            <NavFrontendChevron type="opp" />
                                        </button>
                                        <button onClick={() => setSortering(Sortering.BelopMin)} className="lenkeknapp">
                                            <NavFrontendChevron type="ned" />
                                        </button>
                                    </span>
                                </div>
                            </th>
                            <th />
                        </tr>
                    </thead>
                </Vis>
                <tbody>
                    {sorterteKvitteringer().map((kvittering: RSKvittering, idx) => (
                        <tr key={idx}>
                            <td className="dato">
                                <button tabIndex={0} className="lenkeknapp" onClick={() => visKvittering(idx)}>
                                    {kvittering.datoForUtgift
                                        ? dayjs(kvittering.datoForUtgift).format('dddd DD.MM.YYYY')
                                        : ''
                                    }
                                </button>
                            </td>
                            <td className="transport">
                                {kvittering.typeUtgift}
                            </td>
                            <td className="belop">
                                {formatterTall(kvittering.belop! / 100)} kr
                            </td>
                            <td>
                                <div className="juster">
                                    <button className="lenkeknapp slett-knapp"
                                        onClick={() => slettKvittering(kvittering)} tabIndex={0}
                                    >
                                        <img src={slettFilIkon} className="slett-img" alt="" />
                                    </button>
                                    <Vis hvis={env.isQ1 || env.isDev}>
                                        <Lenke target="_blank"
                                            href={`${env.flexGatewayRoot}/flex-bucket-uploader/kvittering/${kvittering.blobId}`}
                                        >
                                            se bilde
                                        </Lenke>
                                    </Vis>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tbody className="sumlinje">
                    <tr>
                        <td colSpan={2}>
                            <Undertittel tag="span">
                                {getLedetekst(tekst('fil_liste.utlegg.sum'), {
                                    '%ANTALL_BILAG%': kvitteringer.length
                                })}
                            </Undertittel>
                        </td>
                        <td className="belop">
                            <Undertittel tag="span">
                                {formatterTall(totaltBeløp())} kr
                            </Undertittel>
                        </td>
                        <td />
                    </tr>
                </tbody>
            </Normaltekst>
        </Vis>
    )
}

export default FilListe
