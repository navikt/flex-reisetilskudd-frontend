import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'

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
            <Router>
                <Switch>
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

            </Router>
        </StoreProvider>
    )
}

export default App
