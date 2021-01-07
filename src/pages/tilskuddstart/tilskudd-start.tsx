import React, { useEffect } from 'react'
import { Brodsmule, ReisetilskuddStatus, Sykmelding } from '../../types/types'
import { getLedetekst, tekst } from '../../utils/tekster'
import { SEPARATOR } from '../../utils/constants'
import { useAppStore } from '../../data/stores/app-store'
import { useParams, Link } from 'react-router-dom'
import { RouteParams } from '../../app'
import { setBodyClass } from '../../utils/utils'
import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import { Undertittel, Normaltekst } from 'nav-frontend-typografi'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import plaster from '../tilskuddside/plaster.svg'
import plasterHover from '../tilskuddside/plaster-hover.svg'
import SykmeldingInfo from '../../components/sykmelding/sykmelding-info'
import Veileder from './veileder'
import Mobil from './mobil'
import AlertStripe  from 'nav-frontend-alertstriper'
import HvemKanFaa from './hvem-kan-faa'
import Vis from '../../components/diverse/vis'
import dayjs from 'dayjs'
import AvbrytKnapp from '../../components/avbryt/avbryt-knapp'

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

    const alertstripeType = () => {
        if (valgtReisetilskudd.status === ReisetilskuddStatus.SENDBAR) {
            return 'suksess'
        } else {
            return 'info'
        }
    }

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

                <Ekspanderbartpanel className="sykmelding-panel" tittel={
                    <>
                        <img src={plaster} className="plaster" alt="" />
                        <img src={plasterHover} className="plaster--hover" alt="" />
                        <Undertittel className="sykmelding-panel__tittel">
                            {tekst('tilskudd.side.sykmeldinginfo')}
                        </Undertittel>
                    </>
                }>
                    <SykmeldingInfo />
                </Ekspanderbartpanel>

                <AlertStripe className="kan-sendes" type={alertstripeType()}>
                    <Vis hvis={valgtReisetilskudd.status === ReisetilskuddStatus.ÅPEN}>
                        <Undertittel>{getLedetekst(tekst('tilskudd.start.alertstripe.tittel'), {
                            '%DATO%': dayjs(valgtReisetilskudd.tom).add(1, 'day').format('DD. MMM YYYY')
                        })}</Undertittel>
                    </Vis>
                    <Normaltekst>{tekst('tilskudd.start.alertstripe.tekst.' + valgtReisetilskudd.status)}</Normaltekst>
                </AlertStripe>

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
