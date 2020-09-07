import Spinner from 'nav-frontend-spinner'
import React, { useEffect } from 'react'

import IngenData from '../pages/feilsider/ingen-data'
import { Reisetilskudd } from '../types/reisetilskudd'
import env from '../utils/environment'
import { logger } from '../utils/logger'
import useFetch from './rest/use-fetch'
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setReisetilskuddene } = useAppStore()
    const reisetilskuddene = useFetch<Reisetilskudd[]>()

    useEffect(() => {
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

    if (hasAny401([ reisetilskuddene ])) {
        window.location.href = hentLoginUrl()

    } else if (isAnyNotStartedOrPending([ reisetilskuddene ])) {
        return <Spinner type={'XXL'} />

    } else if (hasAnyFailed([ reisetilskuddene ])) {
        logger.error('Klarer ikke hente en av disse [ kvitteringer, reisetilskudd ]')
        return <IngenData />
    }

    return props.children
}


export const hentLoginUrl = () => {
    return `${env.loginServiceUrl}?redirect=${env.loginServiceRedirectUrl}`
}
