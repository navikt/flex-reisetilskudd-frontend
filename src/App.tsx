import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Soknaden from './pages/soknaden/soknaden';
import KvitteringSide from './pages/kvittering-side/kvittering-side';
import ReiseTilskuddPeriode from './pages/reisetilskudd-periode/reisetilskudd-periode';
import StoreProvider from './data/stores/StoreProvider';

function App() : ReactElement {
  return (
    <StoreProvider>
      <Router>
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
          <Route path="/">
            <Redirect to="/soknaden/1" />
          </Route>
        </Switch>
      </Router>
    </StoreProvider>
  );
}

export default App;
