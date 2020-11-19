import './transport-kvittering.less'

import { RadioPanelGruppe } from 'nav-frontend-skjema'
import { Element } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { Transportmiddel, Transportmidler } from '../../types'

interface Props {
    handleChange? : (transportmiddel : Transportmidler) => void
}

const TransportKvittering = ({ handleChange }: Props) => {
    const { typeKvittering, setTypeKvittering } = useAppStore()

    return (
        <RadioPanelGruppe
            key={Transportmiddel.SPØRSMÅLS_KEY}
            className="kvittering-element"
            name="transportmiddel"
            legend={<Element tag="span">Transportmiddel</Element>}
            radios={[
                {
                    label: Transportmiddel.TAXI,
                    value: Transportmiddel.TAXI,
                    id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.TAXI}`,
                },
                {
                    label: Transportmiddel.EGEN_BIL,
                    value: Transportmiddel.EGEN_BIL,
                    id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.EGEN_BIL}`,
                },
                {
                    label: Transportmiddel.KOLLEKTIVT,
                    value: Transportmiddel.KOLLEKTIVT,
                    id: `${Transportmiddel.SPØRSMÅLS_KEY}-${Transportmiddel.KOLLEKTIVT}`,
                },
            ]}
            checked={typeKvittering}
            onChange={(_, nyttTransportmiddel) => {
                if (handleChange) {
                    handleChange(nyttTransportmiddel as Transportmidler)
                }
                setTypeKvittering(nyttTransportmiddel)
            }}
        />
    )
}

export default TransportKvittering
