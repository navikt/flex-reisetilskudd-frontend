import './sporsmal-form.less'

import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../../app'
import FeilOppsummering from '../feiloppsummering/feil-oppsummering'
import { ReisetilskuddStatus, Sporsmal } from '../../../types/types'
import SporsmalSwitch from '../sporsmal-switch'
import { Knapp } from 'nav-frontend-knapper'
import { tekst } from '../../../utils/tekster'
import AvbrytKnapp from '../../avbryt/avbryt-knapp'
import { post, put } from '../../../data/fetcher/fetcher'
import env from '../../../utils/environment'
import { getUrlTilSoknad } from '../../../utils/utils'
import { useAppStore } from '../../../data/stores/app-store'
import dayjs from 'dayjs'
import Vis from '../../diverse/vis'

export interface SpmProps {
    sporsmal: Sporsmal;
}

const SporsmalForm = () => {
    const { valgtReisetilskudd, reisetilskuddene, setReisetilskuddene } = useAppStore()
    const [ erBekreftet, setErBekreftet ] = useState<boolean>(false)
    const [ fetchFeilmelding, setFetchFeilmelding ] = useState<string | null>(null)

    const { id, steg } = useParams<RouteParams>()
    const stegNum = Number(steg)
    const history = useHistory()
    const spmIndex = stegNum - 1
    const sporsmal: any = valgtReisetilskudd!.sporsmal[spmIndex]

    const methods = useForm(
        { reValidateMode: 'onSubmit' }
    )

    useEffect(() => {
        // eslint-disable-next-line
    }, [ spmIndex ])

    const preSubmit = () => {
        methods.clearErrors('syfosoknad')
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
            valgtReisetilskudd.sendt = dayjs(new Date()).format('YYYY-MM-DD')
            valgtReisetilskudd.status = ReisetilskuddStatus.SENDT
            reisetilskuddene[reisetilskuddene.findIndex(reis => reis.id === valgtReisetilskudd.id)] = valgtReisetilskudd
            setReisetilskuddene(reisetilskuddene)
            history.push(getUrlTilSoknad(valgtReisetilskudd))
        }).catch(() => {
            setFetchFeilmelding('Det skjedde en feil i baksystemene, prøv igjen senere')
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onSubmit = () => {
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} onSubmitCapture={preSubmit} className="sporsmal__form">
                <SporsmalSwitch sporsmal={sporsmal} />
                <FeilOppsummering errors={methods.errors} />

                <div className="knapperad">
                    <Vis hvis={stegNum === 1}>
                        <Link to={`/soknaden/${id}/${stegNum + 1}`} className="knapp knapp--hoved">
                            {tekst('klikkbar.videre-knapp.tekst')}
                        </Link>
                    </Vis>
                    <Vis hvis={stegNum > 1}>
                        <Knapp type="hoved" onClick={async() => await sendSoknad()} disabled={!erBekreftet}>
                            {tekst('hovedpunkter.send-knapp.tekst')}
                        </Knapp>
                    </Vis>
                    <AvbrytKnapp />
                </div>
            </form>
        </FormProvider>
    )
}

export default SporsmalForm
