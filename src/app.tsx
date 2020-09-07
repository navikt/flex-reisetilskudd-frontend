import './app.less'

import React, { ReactElement } from 'react'
import { Route, Switch, } from 'react-router-dom'

import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import BekreftelsesSide from './pages/bekreftelses-side/bekreftelses-side'
import ReisetilskuddListe from './pages/reisetilskudd-liste/reisetilskudd-liste'
import ReisetilskuddSide from './pages/reisetilskudd-side/reisetilskudd-side'

export interface RouteParams {
    reisetilskuddID: string;
    soknadssideID: string;
}

function App(): ReactElement {
    return (
        <StoreProvider>
            <DataFetcher>
                <Switch>
                    <Route exact={true} path="/" component={ReisetilskuddListe} />
                    <Route path={'/soknaden/:reisetilskuddID/:soknadssideID'} component={ReisetilskuddSide} />
                    <Route path={'/bekreftelse'} component={BekreftelsesSide} />
                </Switch>
            </DataFetcher>
        </StoreProvider>
    )
}

export default App
