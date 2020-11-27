import './soknad-info-utvid.less'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Element, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import OpplastedeFiler from '../../filopplaster/opplastede-filer'
import TotalBelop from '../../kvittering/total-belop/total-belop'
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
            <OpplastedeFiler />
            <TotalBelop />
        </Ekspanderbartpanel>
    )
}

export default SoknadInfoUtvid
