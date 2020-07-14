import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import Soknaden from './pages/soknaden/soknaden';
import KvitteringSide from './pages/kvittering-side/kvittering-side';
import ReiseTilskuddPeriode from './pages/reisetilskudd-periode/reisetilskudd-periode';

function App() : ReactElement {
  return (
    <Router>
      <Normaltekst>
        <Switch>
          <Route path="/soknaden/:id">
            <Soknaden />
          </Route>
          <Route path="/perioder">
            <ReiseTilskuddPeriode />
          </Route>
          <Route path="/kvittering">
            <KvitteringSide />
          </Route>
        </Switch>
      </Normaltekst>
    </Router>
  );
}

export default App;
