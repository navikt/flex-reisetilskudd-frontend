import './transport-middel.less'

import Hjelpetekst from 'nav-frontend-hjelpetekst'
import { Knapp } from 'nav-frontend-knapper'
import { CheckboksPanel, Input, SkjemaGruppe } from 'nav-frontend-skjema'
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { put } from '../../../data/fetcher/fetcher'
import env from '../../../utils/environment'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import FeilOppsummering from '../feiloppsummering/feil-oppsummering'

interface TransportmiddelInterface {
    id: string
    går?: boolean
    sykler?: boolean
    egenBil?: number
    kollektivtransport?: number
}

enum TransportVerdier {
    GÅR = 'GÅR',
    SYKLER = 'SYKLER',
    KOLLEKTIVTRANSPORT = 'KOLLEKTIVTRANSPORT',
    EGEN_BIL = 'EGEN BIL',
}

const TransportMiddel = () => {
    const [ valgtTransport, setValgtTransport ] = useState<Set<string>>(new Set())
    const [ kmBil, setKmBil ] = useState<number>(0)
    const [ krKoll, setKrKoll ] = useState<number>(0)
    const bilRef = useRef<HTMLDivElement>(null)
    const kollRef = useRef<HTMLDivElement>(null)
    const { id, steg } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const history = useHistory()
    const methods = useForm({ reValidateMode: 'onSubmit' })

    const onSubmit = () => {
        put<TransportmiddelInterface>(`${env.apiUrl}/api/v1/reisetilskudd/${id}`, {
            reisetilskuddId: id,
            går: valgtTransport!.has(TransportVerdier.GÅR),
            sykler: valgtTransport!.has(TransportVerdier.SYKLER),
            egenBil: kmBil,
            kollektivtransport: krKoll,
        }).then(() => {
            history.push('/soknaden/' + id + '/' + (stegNum + 1))
        }).catch((error) => {
            logger.error('Feil ved oppdatering av skjema', error)
        })
    }

    const handleChange = (e: any) => {
        const check: HTMLInputElement = e.target
        if (check.checked) {
            valgtTransport!.add(check.value)
        } else {
            valgtTransport!.delete(check.value)
        }
        setValgtTransport(valgtTransport)

        if (check.value === TransportVerdier.EGEN_BIL) {
            bilRef.current!.classList.toggle('aktiv')
        }
        if (check.value === TransportVerdier.KOLLEKTIVTRANSPORT) {
            kollRef.current!.classList.toggle('aktiv')
        }
        console.log('valgtTransport', valgtTransport) // eslint-disable-line
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
                        label={TransportVerdier.GÅR} value={TransportVerdier.GÅR}
                    />

                    <CheckboksPanel name="transportalternativer" onClick={handleChange}
                        label={TransportVerdier.SYKLER} value={TransportVerdier.SYKLER}
                    />

                    <CheckboksPanel name="transportalternativer" onClick={handleChange}
                        label={TransportVerdier.EGEN_BIL} value={TransportVerdier.EGEN_BIL}
                    />

                    <div ref={bilRef} className="ekstrasporsmal">
                        <Input name="kilometer-bil" bredde="S" inputMode="numeric" label={
                            <div className="transportmiddel__tekst">
                                <Normaltekst id="transportmiddel-spørsmål" className="transportmiddel__sporsmal"
                                    aria-describedby="min-hjelpetekst-kollektivtransport"
                                >
                                    {tekst('sporsmal.egen-bil.hjelpetekst.tittel')}
                                </Normaltekst>
                                <Hjelpetekst className="transportmiddel__hjelpetekst">
                                    Roper på Rolf!
                                    {tekst('sporsmal.egen-bil.hjelpetekst')}
                                </Hjelpetekst>
                            </div>
                        } onChange={e => setKmBil(Number(e.target.value))} />
                    </div>

                    <CheckboksPanel name="transportalternativer" onClick={handleChange}
                        label={TransportVerdier.KOLLEKTIVTRANSPORT} value={TransportVerdier.KOLLEKTIVTRANSPORT}
                    />

                    <div ref={kollRef} className="ekstrasporsmal">
                        <Input name="utgifter-koll" bredde="S" inputMode="numeric" label={
                            <div className="transportmiddel__tekst">
                                <Normaltekst id="transportmiddel-spørsmål" className="transportmiddel__sporsmal"
                                    aria-describedby="min-hjelpetekst-kollektivtransport"
                                >
                                    {tekst('sporsmal.kollektiv.hjelpetekst.tittel')}
                                </Normaltekst>
                                <Hjelpetekst className="transportmiddel__hjelpetekst">
                                    {tekst('sporsmal.kollektiv.hjelpetekst')}
                                </Hjelpetekst>
                            </div>
                        } onChange={e => setKrKoll(Number(e.target.value))} />
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
