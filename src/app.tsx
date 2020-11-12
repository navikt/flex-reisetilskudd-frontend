import './app.less'

import React, { ReactElement } from 'react'
import { Route, Switch, } from 'react-router-dom'

import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import BekreftSide from './pages/bekreftelse/bekreft-side'
import TilskuddListe from './pages/reisetilskudd/tilskudd-liste'
import TilskuddSide from './pages/reisetilskudd/tilskudd-side'

export interface RouteParams {
    id: string;
    steg: string;
}

function App(): ReactElement {
    return (
        <StoreProvider>
            <DataFetcher>
                <Switch>
                    <Route exact={true} path="/" component={TilskuddListe} />
                    <Route path={'/soknaden/:id/:steg'} component={TilskuddSide} />
                    <Route path={'/bekreftelse'} component={BekreftSide} />
                </Switch>
            </DataFetcher>
        </StoreProvider>
    )
}

export default App
