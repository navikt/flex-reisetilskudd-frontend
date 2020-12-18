import './app.less'

import React from 'react'
import { Route, Switch, } from 'react-router-dom'

import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import BekreftSide from './pages/bekreftelse/bekreft-side'
import TilskuddListe from './pages/tilskuddliste/tilskudd-liste'
import TilskuddSide from './pages/tilskuddside/tilskudd-side'
import TilskuddStart from './pages/tilskuddstart/tilskudd-start'

export interface RouteParams {
    id: string;
    steg: string;
}

const App = () => {
    return (
        <StoreProvider>
            <DataFetcher>
                <Switch>
                    <Route exact={true} path="/" component={TilskuddListe} />
                    <Route path={'/soknadstart/:id/:steg'} component={TilskuddStart} />
                    <Route path={'/soknaden/:id/:steg'} component={TilskuddSide} />
                    <Route path={'/bekreftelse'} component={BekreftSide} />
                </Switch>
            </DataFetcher>
        </StoreProvider>
    )
}

export default App
