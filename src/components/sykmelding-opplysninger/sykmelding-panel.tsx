import './sykmelding-opplysninger.less'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Undertittel } from 'nav-frontend-typografi'
import React, { ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import { Sykmelding } from '../../types/sykmelding'
import SykmeldingOpplysninger from './sykmelding-opplysninger'

const SykmeldingPanel = (): ReactElement => {
    const { sykmeldinger, setValgtSykmelding, reisetilskuddene } = useAppStore()
    const { reisetilskuddID } = useParams<RouteParams>()

    useEffect(() => {
        // TODO: Bytt ut med valgtReisetilskudd
        const sykmeldingId = reisetilskuddene.find(r => r.reisetilskuddId === reisetilskuddID)?.sykmeldingId
        const sykmelding = sykmeldinger.find((syk: Sykmelding) => syk.id === sykmeldingId)
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ reisetilskuddID ])

    return (
        <div className="sykmelding-panel-wrapper">
            <Ekspanderbartpanel className="sykmelding-innhold" tittel={
                <Undertittel>Opplysninger fra sykmeldingen</Undertittel>
            }>
                <hr className="sykmelding-linje" />
                <SykmeldingOpplysninger />
            </Ekspanderbartpanel>
        </div>
    )
}

export default SykmeldingPanel
