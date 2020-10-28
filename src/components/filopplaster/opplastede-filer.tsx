import './opplastede-filer.less'

import { Element } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { Kvittering } from '../../types/kvittering'
import Vis from '../vis'
import FilMedInfo from './fil-med-info/fil-med-info'

interface Props {
    fjernKnapp?: boolean;
}

const OpplastedeFiler = ({ fjernKnapp }: Props) => {
    const { kvitteringer } = useAppStore()

    return (
        <Vis hvis={kvitteringer.length > 0}>
            <table className="opplastede-filer">
                <Vis hvis={fjernKnapp}>
                    <thead>
                        <tr>
                            <Element tag="th">Kvittering</Element>
                            <Element tag="th">Beløp</Element>
                            <Element tag="th">Dato</Element>
                        </tr>
                    </thead>
                </Vis>
                <tbody>
                    {kvitteringer.map((fil: Kvittering) => (
                        <FilMedInfo fil={fil} fjernKnapp={fjernKnapp} key={fil.kvitteringId} />
                    ))}
                </tbody>
            </table>
        </Vis>
    )
}

export default OpplastedeFiler
