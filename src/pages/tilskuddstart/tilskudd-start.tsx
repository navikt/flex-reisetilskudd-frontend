import React, { useEffect } from 'react'
import { Brodsmule, Sykmelding } from '../../types/types'
import { tekst } from '../../utils/tekster'
import { SEPARATOR } from '../../utils/constants'
import { useAppStore } from '../../data/stores/app-store'
import { useParams, Link } from 'react-router-dom'
import { RouteParams } from '../../app'
import { setBodyClass } from '../../utils/utils'
import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import { Undertittel } from 'nav-frontend-typografi'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import SykmeldingInfo from '../../components/sykmelding/sykmelding-info'
import Veileder from './veileder'
import Mobil from './mobil'
import HvemKanFaa from './hvem-kan-faa'
import AvbrytKnapp from '../../components/avbryt/avbryt-knapp'
import KanSendesAlertStripe from '../../components/diverse/kan-sendes-alert-stripe'

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

const TilskuddStart = () => {
    const { reisetilskuddene, valgtReisetilskudd, setValgtReisetilskudd, setValgtSykmelding, sykmeldinger } = useAppStore()
    const { steg, id } = useParams<RouteParams>()

    useEffect(() => {
        setBodyClass('reisetilskudd-side')
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
                <Veileder />

                <Ekspanderbartpanel className="hvem-kan-faa" tittel={
                    <Undertittel>{tekst('tilskudd.start.hvem-kan-faa')}</Undertittel>
                }>
                    <HvemKanFaa />
                </Ekspanderbartpanel>

                <Mobil />

                <SykmeldingInfo />

                <KanSendesAlertStripe />

                <div className="knapperad">
                    <Link to={`/soknaden/${id}/${steg}`} className="knapp knapp--hoved">
                        {tekst('klikkbar.videre-knapp.tekst')}
                    </Link>
                    <AvbrytKnapp />
                </div>
            </div>
        </>
    )
}

export default TilskuddStart
