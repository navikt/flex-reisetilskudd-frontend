import './bekreftelses-side.less'

import React, { useEffect } from 'react'

import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import { Brodsmule } from '../../types/brodsmule'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import ListeTekster from './liste-tekster'
import VeienVidere from './veien-videre'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('reisetilskudd_liste.tittel'),
        sti: SEPARATOR,
        erKlikkbar: true
    }, {
        tittel: tekst('bekreftelses.sidetittel'),
        sti: '/reisetilskudd',
        erKlikkbar: false
    }
]

const BekreftelsesSide = () => {

    useEffect(() => {
        setBodyClass('bekreftelses-side')
    }, [])

    return (
        <>
            <Banner />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <ListeTekster />
                <VeienVidere />
            </div>
        </>
    )
}

export default BekreftelsesSide
