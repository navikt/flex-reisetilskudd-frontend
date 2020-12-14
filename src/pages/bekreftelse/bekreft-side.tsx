import './bekreft-side.less'

import React, { useEffect } from 'react'

import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import ListeTekster from './liste-tekster'
import VeienVidere from './veien-videre'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('tilskudd.liste.tittel'),
        sti: SEPARATOR,
        erKlikkbar: true
    }, {
        tittel: tekst('bekreft.sidetittel'),
        sti: '/reisetilskudd',
        erKlikkbar: false
    }
]

const BekreftSide = () => {

    useEffect(() => {
        setBodyClass('bekreftelses-side')
    }, [])

    return (
        <>
            <Banner tittel={tekst('bekreftelses.sidetittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <ListeTekster />
                <VeienVidere />
            </div>
        </>
    )
}

export default BekreftSide
