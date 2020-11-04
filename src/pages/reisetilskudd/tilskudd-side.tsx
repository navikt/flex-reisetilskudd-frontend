import './tilskudd-side.less'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Undertittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import useReisetilskuddTilGlobalState from '../../components/dine-reisetilskudd/useReisetilskuddTilGlobalState'
import TilbakeLenke from '../../components/klikkbar/tilbake-lenke'
import Steg from '../../components/steg/steg'
import SykmeldingOpplysninger from '../../components/sykmelding-opplysninger/sykmelding-opplysninger'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/brodsmule'
import { Sykmelding } from '../../types/sykmelding'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import Opplasting from '../opplasting/opplasting'
import Oppsummering from '../oppsummering/oppsummering'
import Transport from '../transport/transport'
import UtbetalingSide from '../utbetaling/utbetaling-side'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('reisetilskudd_liste.tittel'),
        sti: SEPARATOR,
        erKlikkbar: true
    }, {
        tittel: tekst('reisetilskudd.side.tittel'),
        sti: '/reisetilskudd',
        erKlikkbar: false
    }
]

const TilskuddSide = () => {
    const { aktivtReisetilskuddId, setAktivtReisetilskuddId,
        reisetilskuddene, setValgtSykmelding, sykmeldinger } = useAppStore()
    const setReisetilskuddTilGlobalState = useReisetilskuddTilGlobalState()

    const history = useHistory()
    const { soknadssideID, reisetilskuddID } = useParams<RouteParams>()
    const idNum = Number(soknadssideID)

    useEffect(() => {
        setBodyClass('reisetilskudd-side')
    }, [])

    useEffect(() => {
        if (aktivtReisetilskuddId !== reisetilskuddID) {
            setAktivtReisetilskuddId(reisetilskuddID)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ aktivtReisetilskuddId, reisetilskuddID ])

    useEffect(() => {
        const eksisterendeReisetilskudd = reisetilskuddene?.find(
            (reisetilskudd) => reisetilskudd.reisetilskuddId === reisetilskuddID
        )
        if (eksisterendeReisetilskudd) {
            setAktivtReisetilskuddId(reisetilskuddID)
            setReisetilskuddTilGlobalState(eksisterendeReisetilskudd)
        } else if (reisetilskuddene !== undefined) {
            history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ reisetilskuddene, reisetilskuddID ])

    useEffect(() => {
        // TODO: Bytt ut med valgtReisetilskudd
        const sykmeldingId = reisetilskuddene.find(r => r.reisetilskuddId === reisetilskuddID)?.sykmeldingId
        const sykmelding = sykmeldinger.find((syk: Sykmelding) => syk.id === sykmeldingId)
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ reisetilskuddID ])

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
                    <SykmeldingOpplysninger />
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
