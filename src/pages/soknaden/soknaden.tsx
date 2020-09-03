import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Brodsmuler from '../../components/brodsmoler/brodsmuler'
import useReisetilskuddTilGlobalState from '../../components/dine-reisetilskudd/useReisetilskuddTilGlobalState'
import TilbakeKnapp from '../../components/knapper/tilbake-knapp'
import SykmeldingPanel from '../../components/sykmelding-opplysninger/sykmelding-panel'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import DagensTransportmiddel from '../dagens-transportmiddel/dagens-transportmiddel'
import KvitteringsOpplasting from '../kvitterings-opplasting/kvitterings-opplasting'
import Oppsummering from '../oppsummering/oppsummering'
import Utbetaling from '../utbetaling/utbetaling'

const Soknaden = () => {
    const { aktivtReisetilskuddId, setAktivtReisetilskuddId, reisetilskuddene } = useAppStore()
    const setReisetilskuddTilGlobalState = useReisetilskuddTilGlobalState()

    const history = useHistory()
    const { soknadssideID, reisetilskuddID } = useParams<RouteParams>()
    const idNum = Number(soknadssideID)

    useEffect(() => {
        if (aktivtReisetilskuddId !== reisetilskuddID) {
            // hentReisetilskudd(setReisetilskuddene)
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
        <div className="app-page sporsmal-wrapper">
            <TilbakeKnapp aktivtSteg={idNum} />
            <Brodsmuler aktivtSteg={idNum} />
            <SykmeldingPanel />
            <Vis hvis={idNum === 1}>
                <Utbetaling />
            </Vis>
            <Vis hvis={idNum === 2}>
                <DagensTransportmiddel />
            </Vis>
            <Vis hvis={idNum === 3}>
                <KvitteringsOpplasting />
            </Vis>
            <Vis hvis={idNum === 4}>
                <Oppsummering />
            </Vis>
        </div>
    )
}

export default Soknaden
