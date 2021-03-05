import './tilskudd-side.less'

import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import Vis from '../../components/diverse/vis'
import SoknadInfoUtvid from '../../components/oppsummering/soknad-info-utvid/soknad-info-utvid'
import SideNav from '../../components/side-nav/side-nav'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import SykmeldingPanel from '../../components/sykmelding/sykmelding-panel'
import { Sykmelding } from '../../types/sykmelding'
import SporsmalForm from '../../components/sporsmal/sporsmal-form/sporsmal-form'
import TilskuddStart from '../../components/tilskuddstart/tilskudd-start'
import Hovedpunkter from '../../components/oppsummering/hovedpunkter/hovedpunkter'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('tilskudd.liste.tittel'),
        sti: SEPARATOR,
        erKlikkbar: true
    }, {
        tittel: tekst('tilskudd.side.tittel'),
        sti: '/reisetilskudd',
        erKlikkbar: false
    }
]

const TilskuddSide = () => {
    const { valgtReisetilskudd, setValgtReisetilskudd, reisetilskuddene, sykmeldinger, setValgtSykmelding } = useAppStore()
    const { steg, id } = useParams<RouteParams>()
    const limitRef = useRef<HTMLDivElement>(null)
    const stegNo = Number(steg)
    const sisteside = valgtReisetilskudd?.sporsmal.length || 5

    useEffect(() => {
        setBodyClass('reisetilskudd-side')
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        limitRef.current && limitRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // eslint-disable-next-line
    }, [ steg ])

    useEffect(() => {
        const funnetTilskudd = reisetilskuddene?.find((reisetilskudd) => reisetilskudd.id === id)
        setValgtReisetilskudd(funnetTilskudd)

        const sykmelding = sykmeldinger.find((syk: Sykmelding) => syk.id === funnetTilskudd?.sykmeldingId)
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ reisetilskuddene, id ])

    if (!valgtReisetilskudd) return null

    return (
        <>
            <Banner tittel={tekst('banner.sidetittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div ref={limitRef} className="limit">
                <SideNav />

                <Vis hvis={stegNo > sisteside}>
                    <SoknadInfoUtvid />
                </Vis>

                <Vis hvis={stegNo === 1}>
                    <TilskuddStart />
                </Vis>

                <SykmeldingPanel apen={false} />

                <Vis hvis={stegNo <= sisteside}>
                    <SporsmalForm />
                </Vis>

                <Vis hvis={stegNo > sisteside}>
                    <Hovedpunkter />
                </Vis>
            </div>
        </>
    )
}

export default TilskuddSide
