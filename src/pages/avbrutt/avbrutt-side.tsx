import './avbrutt-side.less'

import React, { useEffect, useState } from 'react'

import Banner from '../../components/diverse/banner/banner'
import { tekst } from '../../utils/tekster'
import { getUrlTilSoknad, redirectTilLoginHvis401, setBodyClass } from '../../utils/utils'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import { Brodsmule, Reisetilskudd, ReisetilskuddStatus, Sykmelding } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import { useAppStore } from '../../data/stores/app-store'
import { useHistory, useParams } from 'react-router-dom'
import { RouteParams } from '../../app'
import dayjs from 'dayjs'
import { Knapp } from 'nav-frontend-knapper'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import SykmeldingPanel from '../../components/sykmelding/sykmelding-panel'
import TilbakeTilSykefravaer from '../../components/side-nav/tilbake-til-sykefravaer'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('tilskudd.liste.tittel'),
        sti: SEPARATOR,
        erKlikkbar: true
    }, {
        tittel: tekst('avbrutt.side.tittel'),
        sti: '/reisetilskudd',
        erKlikkbar: false
    }
]

const AvbruttSide = () => {
    const { reisetilskuddene, setReisetilskuddene, valgtReisetilskudd, setValgtReisetilskudd, setValgtSykmelding, sykmeldinger } = useAppStore()
    const { id } = useParams<RouteParams>()
    const [ gjenapner, setGjenapner ] = useState<boolean>(false)
    const history = useHistory()

    useEffect(() => {
        setBodyClass('avbrutt-side')
    }, [])

    useEffect(() => {
        const funnetTilskudd = reisetilskuddene?.find((reisetilskudd) => reisetilskudd.id === id)
        setValgtReisetilskudd(funnetTilskudd)

        const sykmelding = sykmeldinger.find((syk: Sykmelding) => syk.id === funnetTilskudd?.sykmeldingId)
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ reisetilskuddene, id ])

    const handleGjenapne = async() => {
        if(gjenapner) return
        setGjenapner(true)
        try {
            const res = await fetch(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/${valgtReisetilskudd!.id}/gjenapne`, {
                method: 'POST',
                credentials: 'include'
            })
            const status = res.status
            if (redirectTilLoginHvis401(res)) {
                return
            }
            else if (status === 200) {
                const nyReisetilskudd = { ...valgtReisetilskudd, status: ReisetilskuddStatus.SENDBAR, avbrutt: undefined } as Reisetilskudd
                setReisetilskuddene(reisetilskuddene.map(r => r.id === valgtReisetilskudd!.id ? nyReisetilskudd : r) as any)
                setValgtReisetilskudd(nyReisetilskudd)
                history.push(getUrlTilSoknad(nyReisetilskudd))
            } else {
                logger.error('Feil ved AVBYTING av reisetilskudd', res)
                // TODO: Sett opp feilmelding
            }
        } finally {
            setGjenapner(false)
        }
    }

    if (!valgtReisetilskudd) return null

    return (
        <>
            <Banner tittel={tekst('banner.sidetittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <AlertStripeAdvarsel>
                    <Undertittel>
                        {tekst('avbrutt.alertstripe')}
                    </Undertittel>
                    <Normaltekst>
                        {dayjs(valgtReisetilskudd.avbrutt).format('D. MMMM YYYY, kl HH:mm')}
                    </Normaltekst>
                </AlertStripeAdvarsel>

                <Element className="tekst">
                    {tekst('avbrutt.kan.gjenapne')}
                </Element>
                <Normaltekst className="tekst">
                    {tekst('avbrutt.kan.gjenapne.info')}
                </Normaltekst>

                <Knapp className="gjenapne" onClick={handleGjenapne}>
                    {tekst('avbrutt.gjenapne')}
                </Knapp>

                <SykmeldingPanel tittel={tekst('tilskudd.side.sykmeldinginfo')} />

                <TilbakeTilSykefravaer />
            </div>
        </>
    )
}

export default AvbruttSide
