import './tilskudd-side.less'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Undertittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import TilbakeLenke from '../../components/diverse/klikkbar/tilbake-lenke'
import Vis from '../../components/diverse/vis'
import Steg from '../../components/steg/steg'
import SykmeldingInfo from '../../components/sykmelding/sykmelding-info'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule, Sykmelding } from '../../types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import Opplasting from '../opplasting/opplasting'
import Oppsummering from '../oppsummering/oppsummering'
import Transport from '../transport/transport'
import UtbetalingSide from '../utbetaling-til/utbetaling-side'

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
    const { reisetilskuddene, setValgtReisetilskudd, setValgtSykmelding, sykmeldinger } = useAppStore()
    const { stegnr, id } = useParams<RouteParams>()
    const idNum = Number(stegnr)

    useEffect(() => {
        setBodyClass('reisetilskudd-side')
    }, [])

    useEffect(() => {
        const funnetTilskudd = reisetilskuddene?.find((reisetilskudd) => reisetilskudd.id === id)
        setValgtReisetilskudd(funnetTilskudd)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ reisetilskuddene, id ])

    useEffect(() => {
        const sykmeldingId = reisetilskuddene.find(r => r.id === id)?.sykmeldingId
        const sykmelding = sykmeldinger.find((syk: Sykmelding) => syk.id === sykmeldingId)
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ id ])

    return (
        <>
            <Banner tittel={tekst('banner.sidetittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <TilbakeLenke aktivtSteg={idNum} />
                <Steg aktivtSteg={idNum} />

                <Ekspanderbartpanel className="sykmelding-panel" tittel={
                    <Undertittel>Opplysninger fra sykmeldingen</Undertittel>
                }>
                    <SykmeldingInfo />
                </Ekspanderbartpanel>

                <Vis hvis={idNum === 1}>
                    <UtbetalingSide />
                </Vis>

                <Vis hvis={idNum === 2}>
                    <Transport />
                </Vis>

                <Vis hvis={idNum === 3}>
                    <Opplasting />
                </Vis>

                <Vis hvis={idNum === 4}>
                    <Oppsummering />
                </Vis>
            </div>
        </>
    )
}

export default TilskuddSide
