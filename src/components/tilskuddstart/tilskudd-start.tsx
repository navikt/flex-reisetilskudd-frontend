import React, { useEffect } from 'react'
import { tekst } from '../../utils/tekster'
import { useAppStore } from '../../data/stores/app-store'
import { useParams } from 'react-router-dom'
import { RouteParams } from '../../app'
import { setBodyClass } from '../../utils/utils'
import { Undertittel } from 'nav-frontend-typografi'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import Veileder from './veileder'
import Mobil from './mobil'
import HvemKanFaa from './hvem-kan-faa'
import KanSendesAlertstripe from '../diverse/kan-sendes-alertstripe'
import { Sykmelding } from '../../types/sykmelding'

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
            <KanSendesAlertstripe />

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
