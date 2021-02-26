import './app.less'

import React from 'react'
import { Route, Switch, } from 'react-router-dom'

import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import BekreftSide from './pages/bekreftelse/bekreft-side'
import TilskuddListe from './pages/tilskuddliste/tilskudd-liste'
import TilskuddSide from './pages/tilskuddside/tilskudd-side'
import AvbruttSide from './pages/avbrutt/avbrutt-side'

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
                    <Route path={'/soknaden/:id/avbrutt'} component={AvbruttSide} />
                    <Route path={'/soknaden/:id/bekreftelse'} component={BekreftSide} />
                    <Route path={'/soknaden/:id/:steg'} component={TilskuddSide} />
                </Switch>
            </DataFetcher>
        </StoreProvider>
    )
}

export default App
