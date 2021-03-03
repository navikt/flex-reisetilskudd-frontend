import React, { useEffect } from 'react'
import { tekst, getLedetekst } from '../../utils/tekster'
import { useAppStore } from '../../data/stores/app-store'
import { useParams } from 'react-router-dom'
import { RouteParams } from '../../app'
import { setBodyClass } from '../../utils/utils'
import { Undertittel, Element, Normaltekst } from 'nav-frontend-typografi'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import Veileder from './veileder'
import Mobil from './mobil'
import HvemKanFaa from './hvem-kan-faa'
import { Sykmelding } from '../../types/sykmelding'
import dayjs from 'dayjs'
import Alertstripe from 'nav-frontend-alertstriper'

const TilskuddStart = () => {
    const { reisetilskuddene, valgtReisetilskudd, setValgtReisetilskudd, setValgtSykmelding, sykmeldinger } = useAppStore()
    const { id } = useParams<RouteParams>()

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
            <Veileder />
            <Alertstripe className="kan-sendes" type="info">
                <Element>{getLedetekst(tekst('tilskudd.start.alertstripe.tittel'), {
                    '%DATO%': dayjs(valgtReisetilskudd.tom).add(1, 'day').format('DD. MMM')
                })}</Element>
                <Normaltekst>{tekst('tilskudd.start.alertstripe.tekst.forsiden')}</Normaltekst>
            </Alertstripe>

            <Ekspanderbartpanel className="hvem-kan-faa" tittel={
                <Undertittel>{tekst('tilskudd.start.hvem-kan-faa')}</Undertittel>
            }>
                <HvemKanFaa />
            </Ekspanderbartpanel>

            <Mobil />
        </>
    )
}

export default TilskuddStart
