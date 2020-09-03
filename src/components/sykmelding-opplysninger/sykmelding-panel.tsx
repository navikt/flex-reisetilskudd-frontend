import './sykmelding-opplysninger.less'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Undertittel } from 'nav-frontend-typografi'
import React, { ReactElement, useEffect } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { fåSykmeldingIDFraAktivtReisetilskuddID, hentSykmeldinger } from './hentSykmeldinger'
import SykmeldingOpplysninger from './sykmelding-opplysninger'

const SykmeldingPanel = (): ReactElement => {
    const { setOpplysningerSykmeldinger, sykmeldingID, setSykmeldingID, aktivtReisetilskuddId } = useAppStore()

    useEffect(() => {
        if (sykmeldingID) {
            hentSykmeldinger(setOpplysningerSykmeldinger, sykmeldingID)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ setOpplysningerSykmeldinger, sykmeldingID ])

    useEffect(() => {
        if (aktivtReisetilskuddId) {
            fåSykmeldingIDFraAktivtReisetilskuddID(aktivtReisetilskuddId, setSykmeldingID)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ aktivtReisetilskuddId ])

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
