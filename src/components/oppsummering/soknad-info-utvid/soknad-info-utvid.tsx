import './soknad-info-utvid.less'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Knapp } from 'nav-frontend-knapper'
import { Element, Undertittel } from 'nav-frontend-typografi'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { tekst } from '../../../utils/tekster'
import OpplastedeFiler from '../../filopplaster/opplastede-filer'
import TotalBelop from '../../kvittering/total-belop/total-belop'
import DagensTransportmiddel from '../dagens-transportmiddel'
import Utbetaling from '../utbetaling'

const SoknadInfoUtvid = () => {
    const history = useHistory()

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

            <div className="knapperad">
                <Knapp className="send-knapp" type="hoved" onClick={() => history.push('/bekreftelse')}>
                    {tekst('klikkbar.send-knapp.tekst')}
                </Knapp>
            </div>
        </Ekspanderbartpanel>
    )
}

export default SoknadInfoUtvid
