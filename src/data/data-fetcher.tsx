import Spinner from 'nav-frontend-spinner'
import React, { useEffect } from 'react'

import IngenData from '../pages/feil/ingen-data'
import { Kvittering } from '../types/kvittering'
import { Reisetilskudd } from '../types/reisetilskudd'
import env from '../utils/environment'
import { logger } from '../utils/logger'
import useFetch from './rest/use-fetch'
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setKvitteringer, setReisetilskuddene } = useAppStore()
    const kvitteringer = useFetch<Kvittering[]>()
    const reisetilskuddene = useFetch<Reisetilskudd[]>()

    useEffect(() => {
        if (isNotStarted(kvitteringer)) {
            kvitteringer.fetch(env.apiUrl + '/api/v1/kvitteringer', {
                credentials: 'include',
            }, (fetchState: FetchState<Kvittering[]>) => {
                if (hasData(fetchState)) {
                    setKvitteringer(fetchState.data)
                }
            })
        }
        if (isNotStarted(reisetilskuddene)) {
            reisetilskuddene.fetch(env.apiUrl + '/api/v1/reisetilskudd', {
                credentials: 'include',
            }, (fetchState: FetchState<Reisetilskudd[]>) => {
                if (hasData(fetchState)) {
                    setReisetilskuddene(fetchState.data)
                }
            })
        }
        // eslint-disable-next-line
    }, [reisetilskuddene]);

    if (hasAny401([ kvitteringer, reisetilskuddene ])) {
        window.location.href = hentLoginUrl()

    } else if (isAnyNotStartedOrPending([ kvitteringer, reisetilskuddene ])) {
        return <Spinner type={'XXL'} />

    } else if (hasAnyFailed([ kvitteringer, reisetilskuddene ])) {
        logger.error('Klarer ikke hente en av disse [ kvitteringer, reisetilskudd ]')
        return <IngenData />
    }

    return props.children
}


export const hentLoginUrl = () => {
    return `${env.loginServiceUrl}?redirect=${env.loginServiceRedirectUrl}`
}
