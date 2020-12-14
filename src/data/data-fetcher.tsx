import Spinner from 'nav-frontend-spinner'
import React, { useEffect } from 'react'

import IngenData from '../pages/feilsider/ingen-data'
import { Reisetilskudd, Sykmelding } from '../types/types'
import env from '../utils/environment'
import { logger } from '../utils/logger'
import { hentLoginUrl } from '../utils/utils'
import useFetch from './rest/use-fetch'
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils'
import { useAppStore } from './stores/app-store'
import { RSReisetilskudd } from '../types/rs-types/rsReisetilskudd'

export function DataFetcher(props: { children: any }) {
    const { setReisetilskuddene, setSykmeldinger } = useAppStore()
    const reisetilskuddene = useFetch<RSReisetilskudd[]>()
    const sykmeldinger = useFetch<Sykmelding[]>()

    useEffect(() => {
        if (isNotStarted(reisetilskuddene)) {
            reisetilskuddene.fetch(env.backendUrl + '/api/v1/reisetilskudd', {
                credentials: 'include',
            }, (fetchState: FetchState<RSReisetilskudd[]>) => {
                if (hasData(fetchState)) {
                    setReisetilskuddene(fetchState.data.map((rsReisetilskudd) => {
                        return new Reisetilskudd(rsReisetilskudd)
                    }))
                }
            })
        }
        if (isNotStarted(sykmeldinger)) {
            sykmeldinger.fetch(env.sykmeldingerBackendProxyRoot + '/api/v1/syforest/sykmeldinger', {
                credentials: 'include',
            }, (fetchState: FetchState<Sykmelding[]>) => {
                if (hasData(fetchState)) {
                    setSykmeldinger(fetchState.data)
                }
            })
        }
        // eslint-disable-next-line
    }, [reisetilskuddene]);

    if (hasAny401([ reisetilskuddene, sykmeldinger ])) {
        window.location.href = hentLoginUrl()

    } else if (isAnyNotStartedOrPending([ reisetilskuddene, sykmeldinger ])) {
        return <Spinner type={'XXL'} />

    } else if (hasAnyFailed([ reisetilskuddene, sykmeldinger ])) {
        logger.error('Klarer ikke hente en av disse [ reisetilskudd, sykmeldinger ]')
        return <IngenData />
    }

    return props.children
}
