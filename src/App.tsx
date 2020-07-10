import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import Soknaden from './pages/soknaden/soknaden';
import Utbetaling from './pages/utbetaling/utbetaling';
import DagensTransportmiddel from './pages/dagens-transportmiddel/dagens-transportmiddel';
import ReiseTilskuddPeriode from './pages/reisetilskudd-periode/reisetilskudd-periode';

function App() : ReactElement {
  return (
    <Router>
      <div>
        <Normaltekst>
          <Switch>
            <Route path="/1">
              <Utbetaling />
            </Route>
            <Route path="/2">
              <DagensTransportmiddel />
            </Route>
            <Route path="/3">
              <ReiseTilskuddPeriode />
            </Route>
            <Route path="/">
              <Soknaden />
            </Route>
          </Switch>
        </Normaltekst>
      </div>
    </Router>
  );
}

export default App;
