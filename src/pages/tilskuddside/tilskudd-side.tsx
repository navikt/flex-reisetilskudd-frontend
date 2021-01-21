import './tilskudd-side.less'

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import Vis from '../../components/diverse/vis'
import Hovedpunkter from '../../components/oppsummering/hovedpunkter/hovedpunkter'
import SoknadInfoUtvid from '../../components/oppsummering/soknad-info-utvid/soknad-info-utvid'
import SideNav from '../../components/side-nav/side-nav'
import Opplasting from '../../components/sporsmal/opplasting/opplasting'
import TransportMiddel from '../../components/sporsmal/transport/transport-middel'
import UtbetalingTil from '../../components/sporsmal/utbetaling-til/utbetaling-til'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import SykmeldingPanel from '../../components/sykmelding/sykmelding-panel'
import { Sykmelding } from '../../types/sykmelding'

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
    const idNum = Number(steg)

    useEffect(() => {
        setBodyClass('reisetilskudd-side')
        // eslint-disable-next-line
    }, [])

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

            <div className="limit">
                <SideNav />

                <Vis hvis={idNum === 4}>
                    <SoknadInfoUtvid />
                </Vis>

                <SykmeldingPanel tittel={tekst('tilskudd.side.sykmeldinginfo')} />

                <Vis hvis={idNum === 1}>
                    <UtbetalingTil />
                </Vis>

                <Vis hvis={idNum === 2}>
                    <TransportMiddel />
                </Vis>

                <Vis hvis={idNum === 3}>
                    <Opplasting />
                </Vis>

                <Vis hvis={idNum === 4}>
                    <Hovedpunkter />
                </Vis>
            </div>
        </>
    )
}

export default TilskuddSide
