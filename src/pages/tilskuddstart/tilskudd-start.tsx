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
import { Systemtittel, Undertittel, Element, Normaltekst } from 'nav-frontend-typografi'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import plaster from '../tilskuddside/plaster.svg'
import plasterHover from '../tilskuddside/plaster-hover.svg'
import SykmeldingInfo from '../../components/sykmelding/sykmelding-info'
import Veileder from './veileder'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato'
import Mobil from './mobil'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'

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
    const idNum = Number(steg)

    useEffect(() => {
        setBodyClass('reisetilskudd-side')
    }, [])

    useEffect(() => {
        const funnetTilskudd = reisetilskuddene?.find((reisetilskudd) => reisetilskudd.reisetilskuddId === id)
        console.log('funnetTilskudd', funnetTilskudd); // eslint-disable-line
        setValgtReisetilskudd(funnetTilskudd)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ reisetilskuddene, id ])

    useEffect(() => {
        const sykmeldingId = reisetilskuddene.find(r => r.reisetilskuddId === id)?.sykmeldingId
        const sykmelding = sykmeldinger.find((syk: Sykmelding) => syk.id === sykmeldingId)
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ id ])

    if (!valgtReisetilskudd) return null

    return (
        <>
            <Banner tittel={tekst('banner.sidetittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <Veileder>
                    <Systemtittel>{tekst('dine.tilskudd.tittel')}</Systemtittel>
                    <Element>{tekst('dine.tilskudd.gjelder')}</Element>
                    <Normaltekst>
                        {tilLesbarPeriodeMedArstall(valgtReisetilskudd.fom, valgtReisetilskudd.tom)}
                    </Normaltekst>
                </Veileder>

                <Ekspanderbartpanel className="hvem-kan" tittel={
                    <Undertittel>{tekst('tilskudd.start.hvem-kan')}</Undertittel>
                }>
                    <>
                        <Normaltekst tag="ul">
                            <li>{tekst('tilskudd.start.du-er')}</li>
                            <li>{tekst('tilskudd.start.du-trenger')}</li>
                            <li>{tekst('tilskudd.start.du-har')}</li>
                        </Normaltekst>

                        <Element>{tekst('tilskudd.start.hvor-mye')}</Element>
                        <Normaltekst>
                            {tekst('tilskudd.start.du-kan')}
                            <Link to="">{tekst('tilskudd.start.les-mer.lenke')}</Link>.
                        </Normaltekst>
                        <Element>{tekst('tilskudd.start.husk')}</Element>
                        <Normaltekst>{tekst('tilskudd.start.fristen-for')}</Normaltekst>
                    </>
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

                <AlertStripeAdvarsel>
                    <Undertittel>{tekst('tilskudd.start.alertstripe.tittel')}</Undertittel>
                    <Normaltekst>{tekst('tilskudd.start.alertstripe.tekst')}</Normaltekst>
                </AlertStripeAdvarsel>

                <div className="knapperad">
                    <Link to={`/soknaden/${id}/${steg}`} className="knapp knapp--hoved">
                        {tekst('klikkbar.videre-knapp.tekst')}
                    </Link>
                    <Normaltekst tag="button" className="lenkeknapp">
                        {tekst('tilskudd.start.ikke-bruk')}
                    </Normaltekst>
                </div>
            </div>
        </>
    )
}

export default TilskuddStart
