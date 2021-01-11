import './bekreft-side.less'

import React, { useEffect } from 'react'

import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import { Brodsmule, Sykmelding } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import ListeTekster from './liste-tekster'
import VeienVidere from './veien-videre'
import { useAppStore } from '../../data/stores/app-store'
import { useParams } from 'react-router-dom'
import { RouteParams } from '../../app'

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
    const { reisetilskuddene, setValgtReisetilskudd, setValgtSykmelding, sykmeldinger } = useAppStore()
    const { id } = useParams<RouteParams>()

    useEffect(() => {
        setBodyClass('bekreftelses-side')
    }, [])

    useEffect(() => {
        const funnetTilskudd = reisetilskuddene?.find((reisetilskudd) => reisetilskudd.id === id)
        setValgtReisetilskudd(funnetTilskudd)

        const sykmelding = sykmeldinger.find((syk: Sykmelding) => syk.id === funnetTilskudd?.sykmeldingId)
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ reisetilskuddene, id ])

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
