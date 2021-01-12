import './bekreft-side.less'

import React, { useEffect } from 'react'

import Banner from '../../components/diverse/banner/banner'
import Brodsmuler from '../../components/diverse/brodsmuler/brodsmuler'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { getLedetekst, tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import AlertStripe from 'nav-frontend-alertstriper'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import dayjs from 'dayjs'
import SoknadInfoUtvid from '../../components/oppsummering/soknad-info-utvid/soknad-info-utvid'
import { useAppStore } from '../../data/stores/app-store'
import SykmeldingPanel from '../../components/sykmelding/sykmelding-panel'

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
    const { valgtReisetilskudd } = useAppStore()

    useEffect(() => {
        setBodyClass('bekreftelses-side')
    }, [])

    return (
        <>
            <Banner tittel={tekst('bekreft.sidetittel')} />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <AlertStripe type="suksess">
                    <Undertittel>
                        {tekst('bekreft.sendt-til')}
                    </Undertittel>
                    {getLedetekst(tekst('bekreft.sendt-kl'), {
                        '%TID%': dayjs(valgtReisetilskudd!.sendt).format('DD. MMMM YYYY kl HH:mm')
                    })}
                </AlertStripe>

                <SoknadInfoUtvid />

                <section className="brevinfo">
                    <Undertittel>{tekst('bekreft.brevinfo.tittel')}</Undertittel>
                    <Normaltekst>{tekst('bekreft.brevinfo.tekst')}</Normaltekst>
                </section>

                <SykmeldingPanel tittel={tekst('tilskudd.side.sykmeldinginfo')} />
            </div>
        </>
    )
}

export default BekreftSide
