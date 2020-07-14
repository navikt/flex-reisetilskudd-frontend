import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Soknaden from './pages/soknaden/soknaden';
import KvitteringSide from './pages/kvittering-side/kvittering-side';
import ReisetilskuddPeriodeSide from './pages/reisetilskudd-periode/reisetilskudd-periode';

function App() : ReactElement {
  return (
    <Router>
      <Switch>
        <Route path="/soknaden/:id">
          <Soknaden />
        </Route>
        <Route path="/perioder">
          <ReisetilskuddPeriodeSide />
        </Route>
        <Route path="/kvittering">
          <KvitteringSide />
        </Route>
        <Route path="/">
          <Redirect to="/soknaden/1" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
