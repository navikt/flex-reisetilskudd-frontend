import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import env from './utils/environment';

function App() {
  const [meldinger, setMeldinger] = useState([]);
  
  const getMeldinger = () => {
      fetch(env.apiUrl + "reisetilskudd", { credentials: 'include' })
          .then((response) => response.json())
          .then((json) => setMeldinger(json))
          .catch(err => console.error(err))
  }

  useEffect(() => {
    getMeldinger();
  }, []);  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>
          <h3> Meldinger fra backend: </h3>
          { 
            meldinger.map((melding : any) => {
              return Melding(melding.sykmeldingId, melding.fnr)
            })
          }
        </div>
      </header>
    </div>
  );
}

function Melding(sykmeldingId : string, fnr: string) {
  return (
    <div>
      <ul> 
        <li> { sykmeldingId } </li>
        <li> { fnr } </li>
      </ul>
    </div>
  )
}

export default App;
