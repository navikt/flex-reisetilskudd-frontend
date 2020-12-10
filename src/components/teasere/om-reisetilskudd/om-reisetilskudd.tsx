import './om-reisetilskudd.less'

import { HoyreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

const OmReisetilskudd = () => {
    return (
        <Lenke href={tekst('om-reisetilskudd.lenke.url')}
            target="_blank" rel="noreferrer noopener" className="om-reisetilskudd">
            <Undertittel tag="h3">
                {tekst('om-reisetilskudd.tittel')}
            </Undertittel>
            <HoyreChevron />
        </Lenke>
    )
}

export default OmReisetilskudd
