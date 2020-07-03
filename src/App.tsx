import React, { useState, useEffect, ReactElement } from 'react';
import Lenkepanel from 'nav-frontend-lenkepanel';
import env from './utils/environment';

import Tabell from './components/Tabell';

function MeldingBoks(sykmeldingId : string, fnr: string) {
  return (
    <div>
      <ul>
        <li>
          {' '}
          { sykmeldingId }
          {' '}
        </li>
        <li>
          {' '}
          { fnr }
          {' '}
        </li>
      </ul>
    </div>
  );
}

type Melding = { sykmeldingId: string, fnr: string };

function App() : ReactElement {
  const [meldinger, setMeldinger] = useState([]);

  const getMeldinger = () => {
    fetch(`${env.apiUrl}reisetilskudd`, { credentials: 'include' })
      .then((response) => response.json())
      .then((json) => setMeldinger(json));
  };

  useEffect(() => {
    getMeldinger();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3> Meldinger fra backend: </h3>
          {
            meldinger.map((melding : Melding) => MeldingBoks(melding.sykmeldingId, melding.fnr))
          }
        </div>
        <Lenkepanel href="#" border tittelProps="innholdstittel">
          Lenketekst
        </Lenkepanel>
        <Tabell />

      </header>
    </div>
  );
}

export default App;
