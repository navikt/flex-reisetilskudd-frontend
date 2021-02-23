import './sporsmal-form.less'

import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import FeilOppsummering from '../feiloppsummering/feil-oppsummering'
import { ReisetilskuddStatus, Sporsmal } from '../../../types/types'
import SporsmalSwitch from '../sporsmal-switch'
import { Knapp } from 'nav-frontend-knapper'
import { tekst } from '../../../utils/tekster'
import AvbrytKnapp from '../../avbryt/avbryt-knapp'
import { post } from '../../../data/fetcher/fetcher'
import env from '../../../utils/environment'
import { useAppStore } from '../../../data/stores/app-store'
import Vis from '../../diverse/vis'

export interface SpmProps {
    sporsmal: Sporsmal;
}

const SporsmalForm = () => {
    const { valgtReisetilskudd, reisetilskuddene, setReisetilskuddene, erBekreftet } = useAppStore()
    const [ fetchFeilmelding, setFetchFeilmelding ] = useState<string | null>(null)

    const { id, steg } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const history = useHistory()
    const spmIndex = stegNum - 1
    const sporsmal: Sporsmal = valgtReisetilskudd!.sporsmal[spmIndex]

    const methods = useForm(
        { reValidateMode: 'onSubmit' }
    )

    const lagreSoknad = async() => {
        // TODO: lagre søknaden
    }

    const gaaVidere = () => {
        history.push(`/soknaden/${id}/${stegNum + 1}`)
    }

    const sendSoknad = async() => {
        if (!valgtReisetilskudd) {
            return
        }
        if (valgtReisetilskudd.status !== ReisetilskuddStatus.SENDBAR) {
            return
        }

        post(
            `${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/${valgtReisetilskudd.id}/send`
        ).then(() => {
            valgtReisetilskudd.sendt = new Date()
            reisetilskuddene[reisetilskuddene.findIndex(reis => reis.id === valgtReisetilskudd.id)] = valgtReisetilskudd
            setReisetilskuddene(reisetilskuddene)
            history.push(`/soknaden/${valgtReisetilskudd.id}/${stegNum + 1}`)
        }).catch(() => {
            setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
        })

        gaaVidere()
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onSubmit = () => {
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="sporsmal__form">
                <SporsmalSwitch sporsmal={sporsmal} />
                <FeilOppsummering errors={methods.errors} />

                <div className="knapperad">
                    <Vis hvis={stegNum === 1}>
                        <Knapp type="hoved" onClick={gaaVidere} disabled={!erBekreftet}>
                            {tekst('hovedpunkter.videre-knapp.tekst')}
                        </Knapp>
                    </Vis>
                    <Vis hvis={stegNum > 1}>
                        <Knapp type="hoved" onClick={async() => await sendSoknad()} disabled={!erBekreftet}>
                            {tekst('hovedpunkter.videre-knapp.tekst')}
                        </Knapp>
                        <Knapp type="standard" onClick={async() => await lagreSoknad()}>
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
