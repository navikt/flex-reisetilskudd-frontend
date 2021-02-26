import './kvittering.less'

import { Normaltekst, Systemtittel, } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import FilListe from '../../filopplaster/fil-liste'
import KvitteringModal from '../../filopplaster/kvittering-modal/kvittering-modal'
import PlussIkon from './pluss-ikon.svg'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const Kvittering = ({ sporsmal }: SpmProps) => {
    const { setOpenModal, setErBekreftet, setValgtKvittering } = useAppStore()

    useEffect(() => {
        setErBekreftet(true)
        // eslint-disable-next-line
    }, [])

    const aktiverModal = (event: any) => {
        event.preventDefault()
        setOpenModal(true)
        setValgtKvittering(null)
    }

    return (
        <div className="opplasting">
            <Systemtittel>
                {tekst('opplasting.tittel')}
            </Systemtittel>

            <div className="opplasting__tekst">
                <Normaltekst id="opplasting-overskrift" aria-describedby="opplasting-hjelpetekst">
                    {sporsmal.sporsmalstekst}
                </Normaltekst>
            </div>

            <button className="fler-vedlegg" onClick={aktiverModal}>
                <img className="pluss-ikon" src={PlussIkon} alt="" />
                <Normaltekst tag="span">{tekst('opplasting.legg-til')}</Normaltekst>
            </button>

            <KvitteringModal sporsmal={sporsmal} />

            <FilListe fjernKnapp />
        </div>
    )
}

export default Kvittering
