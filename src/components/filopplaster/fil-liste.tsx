import 'nav-frontend-tabell-style'
import './fil-liste.less'

import dayjs from 'dayjs'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'
import useForceUpdate from 'use-force-update'

import { del } from '../../data/fetcher/fetcher'
import { useAppStore } from '../../data/stores/app-store'
import { Kvittering } from '../../types'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { nf_des } from '../../utils/utils'
import Vis from '../diverse/vis'
import slettFilIkon from './slett-fil-ikon.svg'

interface Props {
    fjernKnapp?: boolean
}

const FilListe = ({ fjernKnapp }: Props) => {
    const { valgtReisetilskudd, setValgtReisetilskudd, setOpenModal, setKvitteringIndex } = useAppStore()
    let kvitteringer = valgtReisetilskudd!.kvitteringer
    const forceUpdate = useForceUpdate()

    const slettKvittering = (kvitto: Kvittering) => {
        kvitteringer = kvitteringer.filter(
            (kvittering) => kvittering.kvitteringId !== kvitto.kvitteringId,
        )
        valgtReisetilskudd!.kvitteringer = kvitteringer
        setValgtReisetilskudd(valgtReisetilskudd)

        del(`${env.backendUrl}/api/v1/kvittering/${kvitto.kvitteringId}`).catch((error) => {
            logger.error('Feil under sletting av kvittering', error)
        })

        forceUpdate()
    }

    const visKvittering = (idx: number) => {
        console.log('idx', idx) // eslint-disable-line
        setOpenModal(true)
        setKvitteringIndex(idx)
    }

    const sorter = (feltnavn: string) => {
        switch (feltnavn) {
            case 'navn':
                kvitteringer.sort((a: Kvittering, b: Kvittering) => (a.navn! > b.navn!) ? 1 : -1)
                break
            case 'transportmiddel':
                kvitteringer.sort((a: Kvittering, b: Kvittering) => (a.transportmiddel! > b.transportmiddel!) ? 1 : -1)
                break
            case 'belop':
                kvitteringer.sort((a: Kvittering, b: Kvittering) => (a.belop! > b.belop!) ? 1 : -1)
                break
        }
        forceUpdate()
    }

    return (
        <Vis hvis={valgtReisetilskudd!.kvitteringer.length > 0}>
            <Normaltekst tag="table" className="tabell tabell--stripet fil_liste">
                <Vis hvis={fjernKnapp}>
                    <thead>
                        <tr>
                            <Element tag="th">
                                <button className="lenkeknapp" onClick={() => sorter('navn')}>
                                Utlegg
                                </button>
                            </Element>
                            <Element tag="th">
                                <button className="lenkeknapp" onClick={() => sorter('transportmiddel')}>
                                Transport
                                </button>
                            </Element>
                            <Element tag="th" className="belop">
                                <button className="lenkeknapp" onClick={() => sorter('belop')}>
                                Beløp
                                </button>
                            </Element>
                            <th />
                        </tr>
                    </thead>
                </Vis>
                <tbody>
                    {valgtReisetilskudd!.kvitteringer.map((fil: Kvittering, idx) => (
                        <tr key={idx}>
                            <td className="dato">
                                <button tabIndex={0} className="lenkeknapp" onClick={() => visKvittering(idx)}>
                                    {fil.fom ? dayjs(fil.fom).format('DD.MM.YYYY') : ''}
                                </button>
                            </td>
                            <td className="transport">
                                {fil.transportmiddel}
                            </td>
                            <td className="belop">
                                {nf_des.format(fil.belop!)} kr
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
    )
}

export default FilListe
