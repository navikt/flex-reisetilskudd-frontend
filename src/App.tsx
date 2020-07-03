<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import './App.css';
import React from 'react';
>>>>>>> 67e3ca15018eec7267b61e67dd546593d8153d96
import logo from './logo.svg';
import env from './utils/environment';

<<<<<<< HEAD
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
=======
const App: React.FunctionComponent = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit
        <code>src/App.tsx</code>
        and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        {env.reisepengerUrl}
      </a>
    </header>
  </div>
);
>>>>>>> 67e3ca15018eec7267b61e67dd546593d8153d96

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
