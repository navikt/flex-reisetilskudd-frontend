import './soknad-info-utvid.less'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Element, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import FilListe from '../../filopplaster/fil-liste'
import Utbetaling from '../utbetaling'
import sjekkbokserHover from './sjekkbokser-hover.svg'
import sjekkbokser from './sjekkbokser.svg'

const SoknadInfoUtvid = () => {
    return (
        <Ekspanderbartpanel className="soknad-info-utvid" tittel={
            <>
                <img src={sjekkbokser} className="sjekkbokser" alt="" />
                <img src={sjekkbokserHover} className="sjekkbokser--hover" alt="" />
                <Undertittel className="soknad-info__tittel">{tekst('soknad-info-utvid.tittel')}</Undertittel>
            </>
        }>
            <Utbetaling />
            <Element className="element-tittel">
                {tekst('soknad-info-utvid.undertittel')}
            </Element>
            <FilListe />
        </Ekspanderbartpanel>
    )
}

export default SoknadInfoUtvid
