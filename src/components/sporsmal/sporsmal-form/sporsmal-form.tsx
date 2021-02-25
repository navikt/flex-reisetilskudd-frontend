import './sporsmal-form.less'

import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import FeilOppsummering from '../feiloppsummering/feil-oppsummering'
import { Sporsmal } from '../../../types/types'
import SporsmalSwitch from '../sporsmal-switch'
import { Knapp } from 'nav-frontend-knapper'
import { tekst } from '../../../utils/tekster'
import AvbrytKnapp from '../../avbryt/avbryt-knapp'
import env from '../../../utils/environment'
import { useAppStore } from '../../../data/stores/app-store'
import Vis from '../../diverse/vis'
import { sporsmalToRS } from '../../../types/rs-types/rs-sporsmal'
import { RSOppdaterSporsmalResponse } from '../../../types/rs-types/rest-response/rs-oppdatersporsmalresponse'
import { redirectTilLoginHvis401 } from '../../../utils/utils'
import { logger } from '../../../utils/logger'
import { settSvar } from '../sett-svar'

export interface SpmProps {
    sporsmal: Sporsmal;
}

const SporsmalForm = () => {
    const { valgtReisetilskudd, setValgtReisetilskudd, reisetilskuddene, setReisetilskuddene, erBekreftet } = useAppStore()
    const [ poster, setPoster ] = useState<boolean>(false)
    const [ lagreOgLukk, setLagreOgLukk ] = useState<boolean>(false)

    const { steg } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const history = useHistory()
    const spmIndex = stegNum - 1
    const sporsmal: Sporsmal = valgtReisetilskudd!.sporsmal[spmIndex]
    let restFeilet = false

    const methods = useForm({ reValidateMode: 'onSubmit' })

    useEffect(() => {
        setLagreOgLukk(false)
        // eslint-disable-next-line
    }, [ spmIndex ])

    const lagreSoknad = async() => {
        if (poster) return
        setLagreOgLukk(true)
    }

    const sendSvarTilBackend = async() => {
        const res = await fetch(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/${valgtReisetilskudd!.id}/sporsmal/${sporsmal.id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(sporsmalToRS(sporsmal)),
            headers: { 'Content-Type': 'application/json' }
        })

        try {
            let data: any = {}
            try {
                data = await res.json()
                // eslint-disable-next-line no-empty
            } finally {

            }

            const httpCode = res.status
            if ([ 200, 201, 203, 206 ].includes(httpCode)) {
                const rsOppdaterSporsmalResponse: RSOppdaterSporsmalResponse = data

                const spm = rsOppdaterSporsmalResponse.oppdatertSporsmal
                valgtReisetilskudd!.sporsmal[spmIndex] = new Sporsmal(spm, null, true)

                reisetilskuddene[reisetilskuddene.findIndex(r => r.id === valgtReisetilskudd!.id)] = valgtReisetilskudd!
                setReisetilskuddene(reisetilskuddene)
                setValgtReisetilskudd(valgtReisetilskudd)
            } else {
                // TODO: Håndter andre feilmeldinger fra backend 400 osv
                if (redirectTilLoginHvis401(res)) {
                    return
                }
                logger.error(`Feil ved lagring av svar, uhåndtert http kode ${httpCode}`, res)
                restFeilet = true
            }
        } catch (e) {
            logger.error('Feil ved lagring av svar med exception', e)
            restFeilet = true
        }
    }

    const preSubmit = () => {   // TODO Fix flex-reisetilskudd-backend feilmeldinger
        methods.clearErrors('syfosoknad')
    }

    const onSubmit = async() => {
        if (poster) return
        setPoster(true)
        restFeilet = false
        try {
            settSvar(sporsmal, methods.getValues()) // TODO: Test at denne funker for alle spørsmål
            await sendSvarTilBackend()

            if (restFeilet) {
                methods.setError(
                    'syfosoknad',   // TODO:
                    { type: 'rest-feilet', message: 'Beklager, det oppstod en feil' }
                )
            } else {
                methods.clearErrors()
                methods.reset()
                if (lagreOgLukk) {
                    history.push('/')
                }
                else {
                    history.push(`/soknaden/${valgtReisetilskudd!.id}/${stegNum + 1}`)
                }
            }
        } finally {
            setPoster(false)
            setLagreOgLukk(false)
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}
                onSubmitCapture={preSubmit}
                className="sporsmal__form">

                <SporsmalSwitch sporsmal={sporsmal} />

                <FeilOppsummering errors={methods.errors} />

                <div className="knapperad">
                    <Vis hvis={stegNum === 1}>
                        <Knapp type="hoved" disabled={!erBekreftet}>
                            {tekst('hovedpunkter.videre-knapp.tekst')}
                        </Knapp>
                    </Vis>
                    <Vis hvis={stegNum > 1}>
                        <Knapp type="hoved" disabled={!erBekreftet}>
                            {tekst('hovedpunkter.videre-knapp.tekst')}
                        </Knapp>
                        <Knapp type="standard" onClick={lagreSoknad}>
                            {tekst('hovedpunkter.lagre-knapp.tekst')}
                        </Knapp>
                    </Vis>
                    <AvbrytKnapp />
                </div>
            </form>
        </FormProvider>
    )
}

export default SporsmalForm
