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
      <Router>
        <Switch>
          <Route path="/soknaden/:reisetilskuddID/:soknadssideID">
            <div className="app-main-content">
              <Header />
              <Soknaden />
            </div>
          </Route>
          <Route path="/kvittering">
            <div className="app-main-content">
              <Header />
              <BekreftelsesSide />
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
  );
}

export default App;
