import 'nav-frontend-tabell-style'
import './fil-liste.less'

import dayjs from 'dayjs'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import env from '../../utils/environment'
import { formatterTall } from '../../utils/utils'
import Vis from '../diverse/vis'
import slettFilIkon from './slett-fil-ikon.svg'
import NavFrontendChevron from 'nav-frontend-chevron'
import { getLedetekst, tekst } from '../../utils/tekster'
import { TagTyper } from '../../types/enums'
import { hentSvar } from '../sporsmal/hent-svar'
import { Kvittering, UtgiftTyper } from '../../types/types'
import { del } from '../../data/fetcher/fetcher'
import { logger } from '../../utils/logger'
import useForceUpdate from 'use-force-update'

interface Props {
    fjernKnapp?: boolean,
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
    const { valgtReisetilskudd, setValgtReisetilskudd, setOpenModal, setValgtKvittering } = useAppStore()
    const [ sortering, setSortering ] = useState<Sortering>(Sortering.DatoMax)
    const forceUpdate = useForceUpdate()

    let kvitteringer: Kvittering[] = []
    const sporsmal = valgtReisetilskudd?.sporsmal.find(spm => spm.tag === TagTyper.KVITTERINGER)
    if (sporsmal) {
        kvitteringer = hentSvar(sporsmal)
    }

    const slettKvittering = (kvitto: Kvittering) => {
        const path = '/flex-reisetilskudd-backend/api/v1/reisetilskudd/'
        const id = valgtReisetilskudd?.id
        const idx = sporsmal!.svarliste.svar.findIndex((svar => svar?.kvittering?.blobId === kvitto.blobId))!
        const svar = sporsmal?.svarliste.svar.find((svar => svar?.kvittering?.blobId === kvitto.blobId ))

        del(`${env.flexGatewayRoot}${path}${id}/sporsmal/${sporsmal?.id}/svar/${svar?.id}`)
            .then(() => {
                sporsmal?.svarliste.svar.splice(idx, 1)
                valgtReisetilskudd!.sporsmal[valgtReisetilskudd!.sporsmal.findIndex(spm => spm.id === sporsmal?.id)] = sporsmal!
                setValgtReisetilskudd(valgtReisetilskudd)
                forceUpdate()
            })
            .catch((error) => {
                logger.error('Feil under sletting av kvittering', error)
            })
    }

    const visKvittering = (kvittering: Kvittering) => {
        setOpenModal(true)
        setValgtKvittering(kvittering)
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
                                    <button onClick={() => setSortering(Sortering.DatoMax)} className="lenkeknapp" type="button">
                                        Dato
                                    </button>
                                    <span className="sortering__chevron">
                                        <button onClick={() => setSortering(Sortering.DatoMax)} className="lenkeknapp" type="button">
                                            <NavFrontendChevron type="opp" />
                                        </button>
                                        <button onClick={() => setSortering(Sortering.DatoMin)} className="lenkeknapp" type="button">
                                            <NavFrontendChevron type="ned" />
                                        </button>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className="sortering__heading">
                                    <button onClick={() => setSortering(Sortering.TransportMin)} className="lenkeknapp" type="button">
                                        Utgift
                                    </button>
                                    <span className="sortering__chevron">
                                        <button onClick={() => setSortering(Sortering.TransportMax)}
                                            type="button"
                                            className="lenkeknapp">
                                            <NavFrontendChevron type="opp" />
                                        </button>
                                        <button onClick={() => setSortering(Sortering.TransportMin)}
                                            type="button"
                                            className="lenkeknapp">
                                            <NavFrontendChevron type="ned" />
                                        </button>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className="sortering__heading belop">
                                    <button onClick={() => setSortering(Sortering.BelopMax)} className="lenkeknapp" type="button">
                                        Beløp
                                    </button>
                                    <span className="sortering__chevron">
                                        <button onClick={() => setSortering(Sortering.BelopMax)} className="lenkeknapp" type="button">
                                            <NavFrontendChevron type="opp" />
                                        </button>
                                        <button onClick={() => setSortering(Sortering.BelopMin)} className="lenkeknapp" type="button">
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
                    {sorterteKvitteringer().map((kvittering: Kvittering, idx) => (
                        <tr key={idx}>
                            <td className="dato">
                                <button type="button" tabIndex={0} className="lenkeknapp" onClick={() => visKvittering(kvittering)}>
                                    {kvittering.datoForUtgift
                                        ? dayjs(kvittering.datoForUtgift).format('dddd DD.MM.YYYY')
                                        : ''
                                    }
                                </button>
                            </td>
                            <td className="transport">
                                {UtgiftTyper[kvittering.typeUtgift]}
                            </td>
                            <td className="belop">
                                {formatterTall(kvittering.belop! / 100)} kr
                            </td>
                            <td>
                                <div className="juster">
                                    <button className="lenkeknapp slett-knapp"
                                        type="button"
                                        onClick={() => slettKvittering(kvittering)} tabIndex={0}
                                    >
                                        <img src={slettFilIkon} className="slett-img" alt="" />
                                    </button>
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
