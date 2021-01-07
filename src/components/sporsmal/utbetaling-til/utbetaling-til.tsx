import { Knapp } from 'nav-frontend-knapper'
import { RadioPanelGruppe } from 'nav-frontend-skjema'
import { Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import { put } from '../../../data/fetcher/fetcher'
import { useAppStore } from '../../../data/stores/app-store'
import env from '../../../utils/environment'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import FeilOppsummering from '../../sporsmal/feiloppsummering/feil-oppsummering'
import { ArbeidsOgVelferdsetaten } from '../sporsmal-konstanter'
import AvbrytKnapp from '../../avbryt/avbryt-knapp'

interface UtbetalingInterface {
    reisetilskuddId: string
    utbetalingTilArbeidsgiver?: boolean
}

const UtbetalingTil = () => {
    const { valgtReisetilskudd, setValgtReisetilskudd } = useAppStore()
    const [ utbetalTil, setUtbetalTil ] = useState<string>('')
    const { steg, id } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const history = useHistory()
    const methods = useForm({ reValidateMode: 'onSubmit' })

    useEffect(() => {
        const til = valgtReisetilskudd && valgtReisetilskudd!.orgNavn !== ''
            ? tekst('sporsmal.utbetaling.verdi.ARBEIDSGIVER')
            : tekst('sporsmal.utbetaling.verdi.MEG')
        setUtbetalTil(til)
        // eslint-disable-next-line
    }, [ valgtReisetilskudd ])

    const handleChange = (e: any) => {
        const valg = e.target.value
        setUtbetalTil(valg)
        if (valg !== 'MEG') {
            valgtReisetilskudd!.orgNummer = ArbeidsOgVelferdsetaten.orgNr
            valgtReisetilskudd!.orgNavn = ArbeidsOgVelferdsetaten.navn
        } else {
            valgtReisetilskudd!.orgNummer = ''
            valgtReisetilskudd!.orgNavn = ''
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
            put<UtbetalingInterface>(`${env.backendUrl}/api/v1/reisetilskudd/${id}`, {
                reisetilskuddId: id,
                utbetalingTilArbeidsgiver: utbetalTil === tekst('sporsmal.utbetaling.verdi.ARBEIDSGIVER'),
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
