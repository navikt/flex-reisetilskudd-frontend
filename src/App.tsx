import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import Soknaden from './pages/soknaden/soknaden';
import Utbetaling from './pages/utbetaling/utbetaling';
import DagensTransportmiddel from './pages/dagens-transportmiddel/dagens-transportmiddel';
import ReiseTilskuddPeriode from './pages/reisetilskudd-periode/reisetilskudd-periode';
import KvitteringSide from './pages/kvittering-side/kvittering-side';

function App() : ReactElement {
  return (
    <Router>
      <div>
        <Normaltekst>
          <nav>
            <ul>
              <li>
                <Link to="/">Hjem</Link>
              </li>
              <li>
                <Link to="/utbetaling">Utbetaling</Link>
              </li>
              <li>
                <Link to="/dagens-transportmiddel">Dagens transportmiddel</Link>
              </li>
              <li>
                <Link to="/reisetilskudd-periode">Reisetilskudd periode</Link>
              </li>
            </ul>
          </nav>

          {
        }

          <Switch>
            <Route path="/utbetaling">
              <Utbetaling />
            </Route>
            <Route path="/dagens-transportmiddel">
              <DagensTransportmiddel />
            </Route>
            <Route path="/reisetilskudd-periode">
              <ReiseTilskuddPeriode />
            </Route>
            <Route path="/">
              <Soknaden />
            </Route>
          </Switch>
        </Normaltekst>
        <KvitteringSide />
      </div>
    </Router>
  );
}

export default App;
