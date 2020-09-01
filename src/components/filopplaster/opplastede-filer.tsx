import { Element } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { KvitteringInterface } from '../../models/kvittering'
import Vis from '../vis'
import FilMedInfo from './fil-med-info/fil-med-info'

interface Props {
    fjernKnapp?: boolean;
}

const OpplastedeFiler = ({ fjernKnapp }: Props) => {
    const { kvitteringer } = useAppStore()

    return (
        <div className="opplastede-filer">
            <Vis hvis={kvitteringer.length > 0}>
                <div className={` ${fjernKnapp ? 'kvitteringstitler' : 'kvitteringstitler-uten-slettknapp'}`}>
                    <Element className="kvittering-tittel">Kvittering</Element>
                    <Element className="belop-tittel">Beløp</Element>
                    <Element className="dato-tittel">Dato</Element>
                </div>
            </Vis>
            {kvitteringer.map((fil: KvitteringInterface, index: number) => (
                <div key={fil.kvitteringId}>
                    <FilMedInfo fil={fil} fjernKnapp={fjernKnapp} />
                    {index === kvitteringer.length - 1 ? '' : <hr />}
                </div>
            ))}
        </div>
    )
}

export default OpplastedeFiler
