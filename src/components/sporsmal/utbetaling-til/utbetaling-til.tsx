import { Knapp } from 'nav-frontend-knapper'
import { RadioPanelGruppe } from 'nav-frontend-skjema'
import { Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { put } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { logger } from '../../../utils/logger'
import { getLedetekst, tekst } from '../../../utils/tekster'
import FeilOppsummering from '../../sporsmal/feiloppsummering/feil-oppsummering'
import { ArbeidsOgVelferdsetaten, utbetalingSporsmal, utbetalingSporsmalVerdier } from '../sporsmal-konstanter'

const UtbetalingTil = () => {
    const { valgtReisetilskudd, setValgtReisetilskudd } = useAppStore()
    const [ utbetalTil, setUtbetalTil ] = useState<string>(
        valgtReisetilskudd && valgtReisetilskudd!.orgNavn !== ''
            ? utbetalingSporsmalVerdier.ARBEIDSGIVER
            : utbetalingSporsmalVerdier.MEG
    )
    const { steg, id } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const history = useHistory()
    const methods = useForm({ reValidateMode: 'onSubmit' })

    const handleChange = (e: any) => {
        const valg = e.target.value
        setUtbetalTil(valg)
        if (valg !== 'MEG') {
            valgtReisetilskudd!.orgNummer = ArbeidsOgVelferdsetaten.orgNr
            valgtReisetilskudd!.orgNavn = ArbeidsOgVelferdsetaten.navn
            setValgtReisetilskudd(valgtReisetilskudd)
        }
    }

    interface UtbetalingInterface {
        reisetilskuddId: string
        utbetalingTilArbeidsgiver?: boolean
    }

    const onSubmit = () => {
        if (utbetalTil === '') {
            methods.setError(
                utbetalingSporsmal.name,
                { type: 'skjema-feil', message: tekst('utbetaling.feil-alternativ') }
            )
        } else {
            put<UtbetalingInterface>(`${env.apiUrl}/api/v1/reisetilskudd/${id}`, {
                reisetilskuddId: id,
                utbetalingTilArbeidsgiver: utbetalTil === utbetalingSporsmalVerdier.ARBEIDSGIVER,
            }).then(() => {
                history.push('/soknaden/' + id + '/' + (stegNum + 1))
            }).catch((error) => {
                logger.error('Feil ved oppdatering av skjema', error)
            })
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="horisontal-radio">

                <RadioPanelGruppe
                    name={utbetalingSporsmal.name}
                    legend={<Systemtittel>{utbetalingSporsmal.tittel}</Systemtittel>}
                    description={getLedetekst(tekst('sporsmal.utbetaling.tekst'), {
                        '%ARBEIDSGIVER_NAVN%': ArbeidsOgVelferdsetaten.navn,
                        '%ARBEIDSGIVER_ORGNR%': ArbeidsOgVelferdsetaten.orgNr
                    })}
                    radios={utbetalingSporsmal.svaralternativer}
                    checked={utbetalTil}
                    onChange={handleChange}
                />

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

export default UtbetalingTil
