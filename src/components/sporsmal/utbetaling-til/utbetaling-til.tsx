import { Knapp } from 'nav-frontend-knapper'
import { RadioPanelGruppe } from 'nav-frontend-skjema'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { put } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { tekst } from '../../../utils/tekster'
import FeilOppsummering from '../../sporsmal/feiloppsummering/feil-oppsummering'
import { ArbeidsOgVelferdsetaten } from '../sporsmal-konstanter'
import AvbrytKnapp from '../../avbryt/avbryt-knapp'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import Vis from '../../diverse/vis'

interface UtbetalingInterface {
    reisetilskuddId: string
    utbetalingTilArbeidsgiver?: boolean
}

const UtbetalingTil = () => {
    const { valgtReisetilskudd, setValgtReisetilskudd } = useAppStore()
    const [ utbetalTil, setUtbetalTil ] = useState<string>('')
    const [ fetchFeilmelding, setFetchFeilmelding ] = useState<string | null>(null)
    const { steg, id } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const history = useHistory()
    const methods = useForm({ reValidateMode: 'onSubmit' })

    useEffect(() => {
        const til = valgtReisetilskudd && valgtReisetilskudd!.arbeidsgiverNavn !== ''
            ? tekst('sporsmal.utbetaling.verdi.ARBEIDSGIVER')
            : tekst('sporsmal.utbetaling.verdi.MEG')
        setUtbetalTil(til)
        // eslint-disable-next-line
    }, [ valgtReisetilskudd ])

    const handleChange = (e: any) => {
        const valg = e.target.value
        setUtbetalTil(valg)
        if (valg !== 'MEG') {
            valgtReisetilskudd!.arbeidsgiverOrgnummer = ArbeidsOgVelferdsetaten.orgNr
            valgtReisetilskudd!.arbeidsgiverNavn = ArbeidsOgVelferdsetaten.navn
        } else {
            valgtReisetilskudd!.arbeidsgiverOrgnummer = ''
            valgtReisetilskudd!.arbeidsgiverNavn = ''
        }
        setValgtReisetilskudd(valgtReisetilskudd)
    }

    const onSubmit = () => {
        if (utbetalTil === '') {
            methods.setError(
                'UTBETALINGARBEIDSGIVER',
                { type: 'skjema-feil', message: tekst('utbetaling.feil-alternativ') }
            )
        } else {
            put<UtbetalingInterface>(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/${id}`, {
                reisetilskuddId: id,
                utbetalingTilArbeidsgiver: utbetalTil === tekst('sporsmal.utbetaling.verdi.ARBEIDSGIVER'),
            }).then(() => {
                history.push('/soknaden/' + id + '/' + (stegNum + 1))
            }).catch(() => {
                setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
            })
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="horisontal-radio">
                <RadioPanelGruppe
                    name="utbetaling-sporsmal"
                    legend={<Systemtittel>{tekst('sporsmal.utbetaling.tittel')}</Systemtittel>}
                    description={tekst('sporsmal.utbetaling.tekst')}
                    radios={[
                        { id: 'utbetaling-arbeidsgiver', label: 'Ja', value: 'ARBEIDSGIVER' },
                        { id: 'utbetaling-meg', label: 'Nei', value: 'MEG' },
                    ]}
                    checked={utbetalTil}
                    onChange={handleChange}
                />

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

export default UtbetalingTil
