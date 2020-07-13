/* eslint-disable no-console */
import React, { useState, useEffect, ReactElement } from 'react';
import Lenkepanel from 'nav-frontend-lenkepanel';
import { Undertittel } from 'nav-frontend-typografi';
import env from './utils/environment';
import Filopplaster from './components/filopplaster/Filopplaster';
import Brodsmuler from './components/Brodsmuler';
import { sideHjelpeteksterID } from './constants/sideIDKonstanter';

import Tabell from './components/Tabell';
import RadioPG from './components/Sporsmal';

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

const getBrødsmuleHjelpetekst = () => sideHjelpeteksterID.DAGENS_TRANSPORTMIDDEL;

type Melding = { sykmeldingId: string, fnr: string };

function App() : ReactElement {
  const [meldinger, setMeldinger] = useState([]);

  const getMeldinger = () => {
    fetch(`${env.apiUrl}reisetilskudd`, { credentials: 'include' })
      .then((response) => {
        if (response.status === 401) {
          if (env.loginServiceUrl) {
            window.location.replace(`${env.loginServiceUrl}/?redirect=${window.location.href}`);
          }
        }
        return response.json();
      })
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
        <Brodsmuler aktivtSteg={getBrødsmuleHjelpetekst()} />

        <Lenkepanel href="#" border tittelProps="innholdstittel">
          Lenketekst
        </Lenkepanel>
        <Tabell />
        <Undertittel>
          Utbetaling
        </Undertittel>
        <RadioPG />
        <Filopplaster
          tillatteFiltyper={['image/png', 'image/jpeg']}
          maxFilstørrelse={1024 * 1024}
        />

      </header>
    </div>
  );
}

export default App;
