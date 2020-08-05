import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Soknaden from './pages/soknaden/Soknaden';
import BekreftelsesSide from './pages/bekreftelsesside/BekreftelsesSide';
import StoreProvider from './data/stores/StoreProvider';
import Header from './components/header/Header';
import DineReisetilskudd from './pages/dineReisetilskudd/DineReisetilskudd';

function App() : ReactElement {
  return (
    <StoreProvider>
      <div className="app-main-content">
        <Router>
          <Switch>
            <Route path="/soknaden/:reisetilskuddID/:soknadssideID">
              <Header />
              <Soknaden />
            </Route>
            <Route path="/kvittering">
              <Header />
              <BekreftelsesSide />
            </Route>
            <Route path="/bekreftelse">
              <BekreftelsesSide />
            </Route>
            <Route path="/">
              <DineReisetilskudd />
            </Route>
          </Switch>
        </Router>
      </div>
    </StoreProvider>
  );
}

export default App;
