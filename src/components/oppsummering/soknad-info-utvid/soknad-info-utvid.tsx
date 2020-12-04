import './soknad-info-utvid.less'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Element, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import FilListe from '../../filopplaster/fil-liste'
import TotalBelop from '../../total-belop/total-belop'
import DagensTransportmiddel from '../dagens-transportmiddel'
import Utbetaling from '../utbetaling'

const SoknadInfoUtvid = () => {
    return (
        <Ekspanderbartpanel className="soknad-info-utvid" tittel={
            <Undertittel>{tekst('soknad-info-utvid.tittel')}</Undertittel>
        }>
            <Utbetaling />
            <DagensTransportmiddel />
            <Element className="element-tittel">
                {tekst('soknad-info-utvid.undertittel')}
            </Element>
            <FilListe />
            <TotalBelop />
        </Ekspanderbartpanel>
    )
}

export default SoknadInfoUtvid
