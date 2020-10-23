import './fil-med-info.less'

import { Knapp } from 'nav-frontend-knapper'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import vedlegg from '../../../assets/vedlegg.svg'
import { del } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import { Kvittering } from '../../../types/kvittering'
import { DatoFormat, formatertDato } from '../../../utils/dato'
import env from '../../../utils/environment'
import formaterFilstørrelse from '../../../utils/fil-utils'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import SlettFilIkon from './slett-fil-ikon.svg'

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
        del<string>(`${env.apiUrl}/api/v1/kvittering/${fil.kvitteringId}`)
            .catch((error) => logger.error('Feil under sletting av kvittering', error))
    }

    const håndterKlikk = () => {
        if (slettKvittering) {
            slettKvittering(fil)
        }
    }

    return (
        <tr className={` ${fjernKnapp ? 'fil-med-info' : 'fil-med-info-uten-slettknapp'}`}>
            <td className="kvittering">
                <img className="vedleggsikon" src={vedlegg} alt="Vedleggsikon" />
                <button className="lenke filnavn">
                    {fil.navn}
                </button>
            </td>
            <Normaltekst tag="td" className="filstorrelse">
                {formaterFilstørrelse(fil.storrelse)}
            </Normaltekst>
            <Normaltekst tag="td" className="belop">
                {fil.belop + ' kr'}
            </Normaltekst>
            <Normaltekst tag="td" className="dato">
                {fil.fom ? formatertDato(fil.fom, DatoFormat.NATURLIG_LANG) : ''}
            </Normaltekst>
            <Vis hvis={fjernKnapp}>
                <td>
                    <Knapp className="slett-knapp" onClick={håndterKlikk}>
                        <img src={SlettFilIkon} alt="" />
                        <span>{tekst('fil_med_info.fjern')}</span>
                    </Knapp>
                </td>
            </Vis>
            <Element tag="td" className="mobil-belop">{tekst('fil_med_info.belop')}:</Element>
            <Element tag="td" className="mobil-dato">{tekst('fil_med_info.dato')}:</Element>
        </tr>
    )
}

export default FilMedInfo
