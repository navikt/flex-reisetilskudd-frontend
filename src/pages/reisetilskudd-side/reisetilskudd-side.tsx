import './reisetilskudd-side.less'

import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import useReisetilskuddTilGlobalState from '../../components/dine-reisetilskudd/useReisetilskuddTilGlobalState'
import TilbakeLenke from '../../components/klikkbar/tilbake-lenke'
import Steg from '../../components/steg/steg'
import SykmeldingPanel from '../../components/sykmelding-opplysninger/sykmelding-panel'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/brodsmule'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import DagensTransportmiddel from '../dagens-transportmiddel/dagens-transportmiddel'
import KvitteringsOpplasting from '../kvitterings-opplasting/kvitterings-opplasting'
import OppsummeringSide from '../oppsummering-side/oppsummering-side'
import UtbetalingSide from '../utbetaling-side/utbetaling-side'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('reisetilskudd_liste.tittel'),
        sti: SEPARATOR,
        erKlikkbar: true
    }, {
        tittel: tekst('reisetilskudd.sidetittel'),
        sti: '/reisetilskudd',
        erKlikkbar: false
    }
]

const ReisetilskuddSide = () => {
    const { aktivtReisetilskuddId, setAktivtReisetilskuddId, reisetilskuddene } = useAppStore()
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

    return (
        <>
            <Banner />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <TilbakeLenke aktivtSteg={idNum} />
                <Steg aktivtSteg={idNum} />
                <SykmeldingPanel />
                <Vis hvis={idNum === 1}>
                    <UtbetalingSide />
                </Vis>
                <Vis hvis={idNum === 2}>
                    <DagensTransportmiddel />
                </Vis>
                <Vis hvis={idNum === 3}>
                    <KvitteringsOpplasting />
                </Vis>
                <Vis hvis={idNum === 4}>
                    <OppsummeringSide />
                </Vis>
            </div>
        </>
    )
}

export default ReisetilskuddSide
