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
import SykmeldingInfo from '../../components/sykmelding/sykmelding-info'
import plaster from '../tilskuddside/plaster.svg'
import plasterHover from '../tilskuddside/plaster-hover.svg'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'

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
        const funnetTilskudd = reisetilskuddene?.find((reisetilskudd) => reisetilskudd.reisetilskuddId === id)
        setValgtReisetilskudd(funnetTilskudd)

        const sykmelding = sykmeldinger.find((syk: Sykmelding) => syk.id === funnetTilskudd?.sykmeldingId)
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ reisetilskuddene, id ])

    const handleGjenapne = async() => {
        if(gjenapner) return
        setGjenapner(true)
        try {
            const res = await fetch(env.backendUrl + `/api/v1/reisetilskudd/${valgtReisetilskudd!.reisetilskuddId}/gjenapne`, {
                method: 'POST',
                credentials: 'include'
            })
            const status = res.status
            if (redirectTilLoginHvis401(res)) {
                return
            }
            else if (status === 200) {
                const nyReisetilskudd = { ...valgtReisetilskudd, status: ReisetilskuddStatus.ÅPEN, avbrutt: undefined } as Reisetilskudd
                setReisetilskuddene(reisetilskuddene.map(r => r.reisetilskuddId === valgtReisetilskudd!.reisetilskuddId ? nyReisetilskudd : r) as any)
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
            <Banner tittel={tekst('bekreftelses.sidetittel')} />
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

                <Ekspanderbartpanel className="sykmelding-panel" tittel={
                    <>
                        <img src={plaster} className="plaster" alt="" />
                        <img src={plasterHover} className="plaster--hover" alt="" />
                        <Undertittel className="sykmelding-panel__tittel">{tekst('tilskudd.side.sykmeldinginfo')}</Undertittel>
                    </>
                }>
                    <SykmeldingInfo />
                </Ekspanderbartpanel>
            </div>
        </>
    )
}

export default AvbruttSide
