import './app.less'

import React, { ReactElement } from 'react'
import { Route, Switch, } from 'react-router-dom'

import Header from './components/header/header'
import StoreProvider from './data/stores/store-provider'
import BekreftelsesSide from './pages/bekreftelses-side/bekreftelses-side'
import DineReisetilskudd from './pages/dine-reisetilskudd/dine-reisetilskudd'
import Soknaden from './pages/soknaden/soknaden'

export interface RouteParams {
    reisetilskuddID: string;
    soknadssideID: string;
}

function App(): ReactElement {
    return (
        <StoreProvider>
            <Switch>
                {/*
                <Route exact={true} path="/" component={DineReisetilskudd} />
                <Route path={'/soknaden/:reisetilskuddID/:soknadssideID'} component={Soknaden} />
                <Route path={'/bekreftelse'} component={BekreftelsesSide} />
                */}

                <Route path="/soknaden/:reisetilskuddID/:soknadssideID">
                    <div className="app-main-content">
                        <Header />
                        <Soknaden />
                    </div>
                </Route>
                <Route path="/bekreftelse">
                    <div className="app-main-content grey">
                        <BekreftelsesSide />
                    </div>
                </Route>
                <Route path="/">
                    <div className="app-main-content grey">
                        <DineReisetilskudd />
                    </div>
                </Route>
            </Switch>
        </StoreProvider>
    )
}

export default App
