import './transport-middel.less'

import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Knapp } from 'nav-frontend-knapper'
import { CheckboksPanel, Input, SkjemaGruppe } from 'nav-frontend-skjema'
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import useForceUpdate from 'use-force-update'

import { RouteParams } from '../../../app'
import { put } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import { Reisetilskudd } from '../../../types'
import env from '../../../utils/environment'
import { logger } from '../../../utils/logger'
import { getLedetekst, tekst } from '../../../utils/tekster'
import FeilOppsummering from '../feiloppsummering/feil-oppsummering'

interface TransportmiddelInterface {
    id: string
    går?: boolean
    sykler?: boolean
    egenBil?: number
    kollektivtransport?: number
}

enum Transport {
    GÅR = 'GÅR',
    SYKLER = 'SYKLER',
    KOLLEKTIVTRANSPORT = 'KOLLEKTIVTRANSPORT',
    EGEN_BIL = 'EGEN BIL',
}

const initTransport = (reiseTilskudd: Reisetilskudd) => {
    const valgte = []
    if (reiseTilskudd.går) valgte.push(Transport.GÅR)
    if (reiseTilskudd.sykler) valgte.push(Transport.SYKLER)
    if (reiseTilskudd.egenBil > 0) valgte.push(Transport.EGEN_BIL)
    if (reiseTilskudd.kollektivtransport > 0) valgte.push(Transport.KOLLEKTIVTRANSPORT)
    return new Set(valgte)
}

const TransportMiddel = () => {
    const { valgtReisetilskudd, setValgtReisetilskudd } = useAppStore()
    const [ valgtTransport, setValgtTransport ] = useState<Set<string>>(new Set())
    const kmRef = useRef<HTMLDivElement>(null)
    const utgRef = useRef<HTMLDivElement>(null)

    const { id, steg } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const history = useHistory()
    const methods = useForm({ reValidateMode: 'onSubmit' })
    const forceUpdate = useForceUpdate()

    useEffect(() => {
        const sett = initTransport(valgtReisetilskudd!)
        setValgtTransport(sett)
        if (valgtReisetilskudd!.egenBil > 0) {
            kmRef.current!.classList.add('aktiv')
            kmRef.current!.scrollIntoView({ behavior: 'smooth' })
        }
        if (valgtReisetilskudd!.kollektivtransport > 0) {
            utgRef.current!.classList.add('aktiv')
            utgRef.current!.scrollIntoView({ behavior: 'smooth' })
        }
        // eslint-disable-next-line
    }, [])

    const handleChange = (e: any) => {
        const check: HTMLInputElement = e.target

        if (check.value === Transport.GÅR) {
            valgtReisetilskudd!.går = !valgtReisetilskudd!.går
        } else if (check.value === Transport.SYKLER) {
            valgtReisetilskudd!.sykler = !valgtReisetilskudd!.sykler
        } else if (check.value === Transport.EGEN_BIL) {
            check.checked
                ? kmRef.current!.classList.add('aktiv')
                : kmRef.current!.classList.remove('aktiv')
        } else if (check.value === Transport.KOLLEKTIVTRANSPORT) {
            check.checked
                ? utgRef.current!.classList.add('aktiv')
                : utgRef.current!.classList.remove('aktiv')
        }
        setValgtReisetilskudd(valgtReisetilskudd)

        if (valgtTransport.has(check.value)) {
            valgtTransport.delete(check.value)
        } else {
            valgtTransport.add(check.value)
        }
        setValgtTransport(valgtTransport)

        forceUpdate()
    }

    const handleAmount = (e: any) => {
        const input: HTMLInputElement = e.target
        if (input.value === null || input.value === '' || isNaN(Number(input.value))) {
            methods.setError(input.name,
                {
                    type: 'skjema-feil', message: getLedetekst(tekst('transportmiddel.feil-mengde'),
                        { '%FELTNAVN%': input.name }
                    )
                }
            )
        }
        if (input.name === 'kilometer-bil') {
            valgtReisetilskudd!.egenBil = Number(input.value)
        } else if (input.name === 'utgifter-koll') {
            valgtReisetilskudd!.kollektivtransport = Number(input.value)
        }
        setValgtReisetilskudd(valgtReisetilskudd)
    }

    const onSubmit = () => {
        put<TransportmiddelInterface>(`${env.apiUrl}/api/v1/reisetilskudd/${id}`, {
            reisetilskuddId: id,
            går: valgtReisetilskudd!.går,
            sykler: valgtReisetilskudd!.sykler,
            egenBil: valgtReisetilskudd!.egenBil,
            kollektivtransport: valgtReisetilskudd!.kollektivtransport,
        }).then(() => {
            history.push('/soknaden/' + id + '/' + (stegNum + 1))
        }).catch((error) => {
            logger.error('Feil ved oppdatering av skjema', error)
        })
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="transportmiddel">

                <SkjemaGruppe className="inputPanelGruppe" legend={
                    <>
                        <Systemtittel>{tekst('sporsmal.transportmiddel.daglig')}</Systemtittel>
                        <div className="transportmiddel__tekst">
                            <Normaltekst id="transportmiddel-spørsmål" className="transportmiddel__sporsmal"
                                aria-describedby="min-hjelpetekst-kollektivtransport"
                            >
                                {tekst('sporsmal.transportmiddel.hvilke')}
                            </Normaltekst>
                            <Hjelpetekst className="transportmiddel__hjelpetekst"
                                id="min-hjelpetekst-kollektivtransport"
                                aria-describedby="transportmiddel-spørsmål"
                            >
                                {tekst('sporsmal.transportmiddel.hjelpetekst')}
                            </Hjelpetekst>
                        </div>
                        <Element>{tekst('sporsmal.transport.tittel')}</Element>
                    </>
                }>

                    <CheckboksPanel name="transportalternativer" onClick={handleChange}
                        label={Transport.GÅR} value={Transport.GÅR} id="gaa"
                        checked={valgtTransport.has(Transport.GÅR)}
                    />

                    <CheckboksPanel name="transportalternativer" onClick={handleChange}
                        label={Transport.SYKLER} value={Transport.SYKLER} id="skl"
                        checked={valgtTransport.has(Transport.SYKLER)}
                    />

                    <CheckboksPanel name="transportalternativer" onClick={handleChange}
                        label={Transport.EGEN_BIL} value={Transport.EGEN_BIL} id="bil"
                        checked={valgtTransport.has(Transport.EGEN_BIL)}
                    />

                    <div ref={kmRef} className="ekstrasporsmal">
                        <Input id="kilometer-bil" name="kilometer-bil" bredde="S" inputMode="numeric"
                            label={
                                <div className="transportmiddel__tekst">
                                    <Normaltekst id="egen-bil-spørsmål" className="transportmiddel__sporsmal"
                                        aria-describedby="min-hjelpetekst-kollektivtransport"
                                    >
                                        {tekst('sporsmal.egen-bil.hjelpetekst.tittel')}
                                    </Normaltekst>
                                    <Hjelpetekst className="transportmiddel__hjelpetekst-egen-bil">
                                        Roper på Rolf!
                                        {tekst('sporsmal.egen-bil.hjelpetekst')}
                                    </Hjelpetekst>
                                </div>
                            } onChange={handleAmount}
                            defaultValue={valgtReisetilskudd!.egenBil}
                        />
                    </div>

                    <CheckboksPanel name="transportalternativer" onClick={handleChange}
                        label={Transport.KOLLEKTIVTRANSPORT} value={Transport.KOLLEKTIVTRANSPORT} id="kol"
                        checked={valgtTransport.has(Transport.KOLLEKTIVTRANSPORT)}
                    />

                    <div ref={utgRef} className="ekstrasporsmal">
                        <Input id="utgifter-koll" name="utgifter-koll" bredde="S" inputMode="numeric"
                            label={
                                <div className="transportmiddel__tekst">
                                    <Normaltekst id="kollektiv-spørsmål" className="transportmiddel__sporsmal"
                                        aria-describedby="min-hjelpetekst-kollektivtransport"
                                    >
                                        {tekst('sporsmal.kollektiv.hjelpetekst.tittel')}
                                    </Normaltekst>
                                    <Hjelpetekst className="transportmiddel__hjelpetekst-kollektiv">
                                        {tekst('sporsmal.kollektiv.hjelpetekst')}
                                    </Hjelpetekst>
                                </div>
                            } onChange={handleAmount}
                            defaultValue={valgtReisetilskudd!.kollektivtransport}
                        />
                    </div>
                </SkjemaGruppe>

                <FeilOppsummering errors={methods.errors} />
                <div className="knapperad">
                    <Knapp type="hoved">
                        {tekst('klikkbar.videre-knapp.tekst')}
                    </Knapp>
                </div>
            </form>
        </FormProvider>
    )
}

export default TransportMiddel
