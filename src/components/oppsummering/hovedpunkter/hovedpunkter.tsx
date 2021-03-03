import './hovedpunkter.less'

import dayjs from 'dayjs'
import { Knapp } from 'nav-frontend-knapper'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppStore } from '../../../data/stores/app-store'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../diverse/vis'
import env from '../../../utils/environment'
import {
    formatterTall,
    getUrlTilSoknad,
    redirectTilLoginHvis401,
} from '../../../utils/utils'
import AvbrytKnapp from '../../avbryt/avbryt-knapp'
import Alertstripe, { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import { TagTyper } from '../../../types/enums'
import { logger } from '../../../utils/logger'
import { Kvittering } from '../../../types/types'
import parser from 'html-react-parser'

const Hovedpunkter = () => {
    const { valgtReisetilskudd, reisetilskuddene, setReisetilskuddene } = useAppStore()
    const [ erBekreftet, setErBekreftet ] = useState<boolean>(false)
    const [ fetchFeilmelding, setFetchFeilmelding ] = useState<string | null>(null)
    const [ bilag, setBilag ] = useState<Kvittering[]>([])
    const [ utbetalTil, setUtbetalTil ] = useState<string>('')
    const history = useHistory()

    const fom = dayjs(valgtReisetilskudd?.fom)
    const tom = dayjs(valgtReisetilskudd?.tom)
    const sameYear = fom.year() === tom.year()

    useEffect(() => {
        setErBekreftet(valgtReisetilskudd?.status === 'SENDBAR')

        const kvitteringer: Kvittering[] = []
        valgtReisetilskudd?.sporsmal.forEach(spm => {
            const svar = spm.svarliste.svar
            if (spm.tag === TagTyper.UTBETALING && spm.svarliste.svar[0].verdi === 'JA') {
                setUtbetalTil('Arbeidsgiver')
            }
            if (spm.tag === TagTyper.KVITTERINGER && svar.length > 0) {
                svar.forEach(sv => {
                    kvitteringer.push(sv.kvittering!)
                })
            }
        })
        setBilag(kvitteringer)
    }, [ valgtReisetilskudd ])

    const sendSoknad = async() => {
        if (!valgtReisetilskudd) {
            return
        }
        if (valgtReisetilskudd.status !== 'SENDBAR') {
            return
        }

        if (valgtReisetilskudd.status !== 'SENDBAR') {
            logger.warn(`Prøvde å sende reisetilskudd ${valgtReisetilskudd.id} men status er ${valgtReisetilskudd.status}`)
            return
        }

        const res = await fetch(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/${valgtReisetilskudd.id}/send`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        try {
            const httpCode = res.status
            if (redirectTilLoginHvis401(res)) {
                return
            } else if ([ 200, 201, 203, 206 ].includes(httpCode)) {
                valgtReisetilskudd.sendt = new Date()
                valgtReisetilskudd.status = 'SENDT'
                reisetilskuddene[reisetilskuddene.findIndex(reis => reis.id === valgtReisetilskudd.id)] = valgtReisetilskudd
                setReisetilskuddene(reisetilskuddene)

                history.push(getUrlTilSoknad(valgtReisetilskudd))
            } else {
                setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
            }
        } catch (e) {
            setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
        }
    }

    if (!valgtReisetilskudd) return null

    return (
        <section className="hovedpunkter">
            <Undertittel className="avsnitt" tag="h2">{tekst('hovedpunkter.tittel.bekreft')}</Undertittel>
            <Normaltekst>{parser(tekst('hovedpunkter.ingress'))}</Normaltekst>

            <Element className="avsnitt" tag="h3">{tekst('hovedpunkter.tittel')}</Element>
            <Normaltekst tag="ul" className="punkter">
                <li>
                    {parser(getLedetekst(tekst('hovedpunkter.fra_til'), {
                        '%FRA%': sameYear ? fom.format('DD. MMM') : fom.format('DD. MMM YYYY'),
                        '%TIL%': tom.format('DD. MMM YYYY')
                    }))}
                </li>

                <Vis hvis={utbetalTil === 'Arbeidsgiver'}>
                    <li>{parser(tekst('hovedpunkter.arbeidsgiver_betaler-ikke'))}</li>
                </Vis>

                <Vis hvis={bilag.length > 0}>
                    <li>
                        {parser(getLedetekst(tekst('hovedpunkter.kvitteringer'), {
                            '%ANTALL%': bilag.length,
                            '%SUM%': formatterTall(bilag.reduce((acc, b) => acc + b.belop!, 0)/100)
                        }))}
                    </li>
                </Vis>
            </Normaltekst>

            <Vis hvis={valgtReisetilskudd?.status === 'ÅPEN' || valgtReisetilskudd?.status === 'PÅBEGYNT'}>
                <Alertstripe className="kan-sendes" type="info">
                    <Element>{getLedetekst(tekst('tilskudd.start.alertstripe.tittel'), {
                        '%DATO%': dayjs(valgtReisetilskudd.tom).add(1, 'day').format('DD. MMM')
                    })}</Element>
                    <Normaltekst>{tekst('tilskudd.start.alertstripe.tekst')}</Normaltekst>
                </Alertstripe>
            </Vis>

            <Vis hvis={fetchFeilmelding}>
                <AlertStripeAdvarsel>
                    <Normaltekst>{fetchFeilmelding}</Normaltekst>
                </AlertStripeAdvarsel>
            </Vis>

            <div className="knapperad">
                <Knapp type="hoved" onClick={async() => await sendSoknad()} disabled={!erBekreftet}>
                    {tekst('hovedpunkter.send-knapp.tekst')}
                </Knapp>
                <AvbrytKnapp />
            </div>
        </section>
    )
}

export default Hovedpunkter
