import './bekreft-side.less'

import React, { useEffect } from 'react'

import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import { Brodsmule, Sykmelding } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import { useAppStore } from '../../data/stores/app-store'
import { useParams } from 'react-router-dom'
import { RouteParams } from '../../app'
import SoknadInfoUtvid from '../../components/oppsummering/soknad-info-utvid/soknad-info-utvid'
import SykmeldingInfo from '../../components/sykmelding/sykmelding-info'
import { AlertStripeSuksess } from 'nav-frontend-alertstriper'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import dayjs from 'dayjs'

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
    const { reisetilskuddene, valgtReisetilskudd, setValgtReisetilskudd, setValgtSykmelding, sykmeldinger } = useAppStore()
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

    if (!valgtReisetilskudd) return null

    return (
        <>
            <Banner tittel={tekst('banner.sidetittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <AlertStripeSuksess className="vellykket-sending">
                    <Undertittel>
                        {tekst('bekreft.sendt')}
                    </Undertittel>
                    <Normaltekst>
                        {dayjs(valgtReisetilskudd.sendt).format('D. MMMM YYYY, kl HH:mm')}
                    </Normaltekst>
                </AlertStripeSuksess>
                <SoknadInfoUtvid />

                <Undertittel className="brev-tittel">
                    {tekst('bekreft.brev')}
                </Undertittel>
                <Normaltekst>
                    {tekst('bekreft.brev.info')}
                </Normaltekst>

                <SykmeldingInfo />
            </div>
        </>
    )
}

export default BekreftSide
