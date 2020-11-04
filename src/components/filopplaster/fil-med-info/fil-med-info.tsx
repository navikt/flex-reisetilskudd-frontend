import './fil-med-info.less'

import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import vedlegg from '../../../assets/vedlegg.svg'
import { del } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import { Kvittering } from '../../../types'
import { DatoFormat, formatertDato } from '../../../utils/dato'
import env from '../../../utils/environment'
import { customTruncet,formaterFilstørrelse } from '../../../utils/fil-utils'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import slettFilIkon from './slett-fil-ikon.svg'

interface Props {
    fil: Kvittering;
    fjernKnapp?: boolean;
}

const FilMedInfo = ({ fil, fjernKnapp }: Props) => {
    const { kvitteringer, setKvitteringer } = useAppStore()

    const slettKvittering = (kvitteringSomSkalSlettes: Kvittering) => {
        setKvitteringer(kvitteringer.filter(
            (kvittering) => kvittering.kvitteringId !== kvitteringSomSkalSlettes.kvitteringId,
        ))
        del(`${env.apiUrl}/api/v1/kvittering/${fil.kvitteringId}`).catch((error) => {
            logger.error('Feil under sletting av kvittering', error)
        }
        )
    }

    const håndterKlikk = () => {
        if (slettKvittering) {
            slettKvittering(fil)
        }
    }

    return (
        <tr className={` ${fjernKnapp ? 'fil-med-info' : 'fil-med-info-uten-slettknapp'}`}>
            <td className="kvittering">
                <img className="vedleggsikon" src={vedlegg} alt="" />
                <Normaltekst tag="span" className="filnavn">
                    {customTruncet(fil.navn, 20)}
                </Normaltekst>
                <Normaltekst tag="span" className="filstr">
                    ({formaterFilstørrelse(fil.storrelse)})
                </Normaltekst>
            </td>
            <Normaltekst tag="td" className="belop">
                <Element tag="span">{tekst('fil_med_info.belop')}:</Element>
                {fil.belop} kr
            </Normaltekst>
            <Normaltekst tag="td" className="dato">
                <Element tag="span">{tekst('fil_med_info.dato')}:</Element>
                {fil.fom ? formatertDato(fil.fom, DatoFormat.NATURLIG_LANG) : ''}
            </Normaltekst>
            <Vis hvis={fjernKnapp}>
                <td>
                    <button className="slett-knapp knapp knapp--fare knapp--mini" onClick={håndterKlikk}>
                        <img src={slettFilIkon} className="slett-img" alt="" />
                        <span>{tekst('fil_med_info.fjern')}</span>
                    </button>
                </td>
            </Vis>
        </tr>
    )
}

export default FilMedInfo
