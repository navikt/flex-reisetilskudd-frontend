import './transport-middel.less'

import { Knapp } from 'nav-frontend-knapper'
import { Checkbox, CheckboxGruppe, Input, RadioPanelGruppe } from 'nav-frontend-skjema'
import { Normaltekst, Systemtittel, Element } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { put } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { getLedetekst, tekst } from '../../../utils/tekster'
import FeilOppsummering from '../feiloppsummering/feil-oppsummering'
import AvbrytKnapp from '../../avbryt/avbryt-knapp'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import Vis from '../../diverse/vis'

interface TransportmiddelInterface {
    id: string
    går?: boolean
    sykler?: boolean
    egenBil?: number
    kollektivtransport?: number
}

const TransportMiddel = () => {
    const { valgtReisetilskudd, setValgtReisetilskudd } = useAppStore()
    const [ jaNei, setJaNei ] = useState<string>('NEI')
    const [ offentlig, setOffentlig ] = useState<boolean>(valgtReisetilskudd!.offentlig > 0)
    const [ egenBil, setEgenBil ] = useState<boolean>(valgtReisetilskudd!.egenBil > 0)
    const [ fetchFeilmelding, setFetchFeilmelding ] = useState<string | null>(null)

    const ekstraRef = useRef<HTMLDivElement>(null)
    const bilRef = useRef<HTMLDivElement>(null)
    const offRef = useRef<HTMLDivElement>(null)

    const { id, steg } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const history = useHistory()
    const methods = useForm({ reValidateMode: 'onSubmit' })

    useEffect(() => {
        if (valgtReisetilskudd!.offentlig > 0) {
            setJaNei('JA')
            ekstraRef.current!.classList.add('aktiv')
            offRef.current!.classList.add('aktiv')
        }

        if (valgtReisetilskudd!.egenBil > 0) {
            setJaNei('JA')
            ekstraRef.current!.classList.add('aktiv')
            bilRef.current!.classList.add('aktiv')
        }

        // eslint-disable-next-line
    }, [])

    const handleJaNei = (e: any) => {
        const radio: HTMLInputElement = e.target
        setJaNei(radio.value)

        if (radio.value === 'JA') {
            ekstraRef.current!.classList.add('aktiv')
        } else {
            ekstraRef.current!.classList.remove('aktiv')
            offRef.current!.classList.remove('aktiv')
            bilRef.current!.classList.remove('aktiv')
            setOffentlig(false)
            setEgenBil(false)
            valgtReisetilskudd!.offentlig = 0
            valgtReisetilskudd!.egenBil = 0
            setValgtReisetilskudd(valgtReisetilskudd)
        }
    }

    const handleOffentlig = (e: any) => {
        const check: HTMLInputElement = e.target
        if (check.checked) {
            offRef.current!.classList.add('aktiv')
        } else {
            offRef.current!.classList.remove('aktiv')
            valgtReisetilskudd!.offentlig = 0
            valgtReisetilskudd!.egenBil = 0
            setValgtReisetilskudd(valgtReisetilskudd)
        }
    }

    const handleEgenBil = (e: any) => {
        const check: HTMLInputElement = e.target
        if (check.checked) {
            bilRef.current!.classList.add('aktiv')
        } else {
            bilRef.current!.classList.remove('aktiv')
            valgtReisetilskudd!.offentlig = 0
            valgtReisetilskudd!.egenBil = 0
            setValgtReisetilskudd(valgtReisetilskudd)
        }
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
        } else {
            methods.clearErrors(input.name)
        }

        if (input.name === 'kilometer-bil') {
            valgtReisetilskudd!.egenBil = Number(input.value)
        } else if (input.name === 'utgifter-koll') {
            valgtReisetilskudd!.offentlig = Number(input.value)
        }
        setValgtReisetilskudd(valgtReisetilskudd)
    }

    const onSubmit = () => {
        put<TransportmiddelInterface>(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/${id}`, {
            id: id,
            egenBil: valgtReisetilskudd!.egenBil,
            offentlig: valgtReisetilskudd!.offentlig,
        }).then(() => {
            document.querySelector('.sidebanner')!.scrollIntoView({ behavior: 'smooth', block: 'start' })
            history.push('/soknaden/' + id + '/' + (stegNum + 1))
        }).catch(() => {
            setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
        })
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="transportmiddel horisontal-radio">

                <RadioPanelGruppe
                    name="transport-sporsmal"
                    legend={<Systemtittel>{tekst('sporsmal.transport.tittel')}</Systemtittel>}
                    description={
                        <>
                            <Normaltekst>{tekst('sporsmal.transport.hvilke')}</Normaltekst>
                            <Ekspanderbartpanel apen={false} border={false} tittel={
                                <Normaltekst>{tekst('sporsmal.transport.offentlig')}</Normaltekst>
                            }>
                                <Normaltekst>Offentlig transport regnes som buss, tog, bysykkel og el-sparkesykkel.</Normaltekst>
                            </Ekspanderbartpanel>
                        </>
                    }
                    radios={[
                        { id: 'transport-ja', label: 'Ja', value: 'JA' },
                        { id: 'transport-nei', label: 'Nei', value: 'NEI' },
                    ]}
                    checked={jaNei}
                    onChange={handleJaNei}
                />

                <div ref={ekstraRef} className="ekstrasporsmal">
                    <Element className="ekstrasporsmal__tittel">Hva slags type transport bruker du?</Element>
                    <CheckboxGruppe>
                        <Checkbox id="OFFENTLIG" label="Offentlig transport" defaultChecked={offentlig}
                            onChange={handleOffentlig}
                        />
                    </CheckboxGruppe>
                    <div ref={offRef} className="offentlig">
                        <Input id="utgifter-koll" name="utgifter-koll" bredde="XS" inputMode="numeric"
                            label={
                                <Normaltekst id="kollektiv-spørsmål">
                                    {tekst('sporsmal.kollektiv.hjelpetekst.tittel')}
                                </Normaltekst>
                            } onBlur={handleAmount}
                            defaultValue={valgtReisetilskudd!.offentlig}
                        />
                    </div>

                    <CheckboxGruppe>
                        <Checkbox id="EGEN_BIL" label="Egen bil" defaultChecked={egenBil}
                            onChange={handleEgenBil}
                        />
                    </CheckboxGruppe>
                    <div ref={bilRef} className="egen_bil">
                        <Input id="kilometer-bil" name="kilometer-bil" bredde="S" inputMode="numeric"
                            label={
                                <Normaltekst id="egen-bil-spørsmål">
                                    {tekst('sporsmal.egen-bil.hjelpetekst.tittel')}
                                </Normaltekst>
                            } onBlur={handleAmount}
                            defaultValue={valgtReisetilskudd!.egenBil}
                        />
                    </div>
                </div>

                <FeilOppsummering errors={methods.errors} />
                <Vis hvis={fetchFeilmelding}>
                    <AlertStripeAdvarsel>
                        <Normaltekst>{fetchFeilmelding}</Normaltekst>
                    </AlertStripeAdvarsel>
                </Vis>
                <div className="knapperad">
                    <Knapp type="hoved">
                        {tekst('klikkbar.videre-knapp.tekst')}
                    </Knapp>
                    <AvbrytKnapp />
                </div>
            </form>
        </FormProvider>
    )
}

export default TransportMiddel
