import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Soknaden from './pages/soknaden/Soknaden';
import BekreftelsesSide from './pages/bekreftelsesside/BekreftelsesSide';
import StoreProvider from './data/stores/StoreProvider';
import Header from './components/header/Header';

function App() : ReactElement {
  return (
    <StoreProvider>
      <Header />
      <Router>
        <Switch>
          <Route path="/soknaden/:id">
            <Soknaden />
          </Route>
          <Route path="/kvittering">
            <BekreftelsesSide />
          </Route>
          <Route path="/bekreftelse">
            <BekreftelsesSide />
          </Route>
          <Route path="/">
            <Redirect to="/soknaden/1" />
          </Route>
        </Switch>
      </Router>
    </StoreProvider>
  );
}

export default App;
